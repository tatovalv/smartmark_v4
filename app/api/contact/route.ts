import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { getDictionary, isLocale, serviceOptions, type Locale } from "@/lib/i18n"
import { addInquiry } from "@/lib/inquiries"

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }
    return map[char]
  })
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

const MIN_FILL_MS = 3000
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

// In-memory and per server instance: enough for this volume, but it resets on
// redeploys and is not shared between instances. Move to a shared store
// (Redis, DynamoDB) if spam grows.
const submissions = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (submissions.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    submissions.set(ip, recent)
    return true
  }
  recent.push(now)
  submissions.set(ip, recent)
  if (submissions.size > 5000) {
    for (const [key, times] of submissions) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) submissions.delete(key)
    }
  }
  return false
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

export async function POST(request: NextRequest) {
  try {
    if (rateLimited(clientIp(request))) {
      return NextResponse.json({ error: "rate" }, { status: 429 })
    }

    const body = await request.json()

    // Honeypot filled or form sent faster than a person can type: answer as if
    // it worked so bots don't learn to adapt, but send nothing.
    const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0
    if (clean(body.website, 200) || elapsed < MIN_FILL_MS) {
      return NextResponse.json({ ok: true })
    }

    const idioma = clean(body.idioma, 2)
    if (!isLocale(idioma)) {
      return NextResponse.json({ error: "missing" }, { status: 400 })
    }

    const locale: Locale = idioma
    const dict = getDictionary(locale)
    const name = clean(body.name, 120)
    const company = clean(body.company, 160)
    const email = clean(body.email, 160)
    const phone = clean(body.phone, 40)
    const contactMethod = clean(body.contactMethod, 12)
    const country = clean(body.country, 12)
    const service = clean(body.service, 40)
    const message = clean(body.message, 5000)

    const countryLabel = dict.form.countries.find((item) => item.value === country)?.label
    const serviceLabel = serviceOptions(dict).find((item) => item.value === service)?.label
    const methodLabel = dict.form.contactMethods.find((item) => item.value === contactMethod)?.label
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const phoneOk = contactMethod === "email" || Boolean(phone)

    if (!name || !company || !email || !methodLabel || !phoneOk || !countryLabel || !serviceLabel || !message || !emailOk) {
      return NextResponse.json({ error: email && !emailOk ? "email" : "missing" }, { status: 400 })
    }

    let stored = false
    try {
      await addInquiry({
        locale,
        name,
        company,
        email,
        phone,
        contactMethod: methodLabel,
        country: countryLabel,
        service: serviceLabel,
        message,
      })
      stored = true
    } catch (error) {
      console.error("Could not store the inquiry:", error)
    }

    const apiKey = process.env.RESEND_API_KEY
    let emailed = false
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set; the inquiry was stored without sending email")
    } else {
    const resend = new Resend(apiKey)
    // onboarding@resend.dev is Resend's test sender and usually lands in spam.
    // In production, set RESEND_FROM_EMAIL to an address on smartmarkconsultores.com
    // after verifying the domain in Resend.
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const toEmail = process.env.RESEND_TO_EMAIL || "info@smartmarkconsultores.com"
    const safe = {
      name: escapeHtml(name),
      company: escapeHtml(company),
      email: escapeHtml(email),
      phone: escapeHtml(phone || "—"),
      method: escapeHtml(methodLabel),
      country: escapeHtml(countryLabel),
      service: escapeHtml(serviceLabel),
      message: escapeHtml(message).replace(/\n/g, "<br>"),
      idioma: escapeHtml(locale),
    }

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Contacto (${locale}) — ${serviceLabel} — ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <h2 style="color: #064e3b;">Nuevo contacto desde el sitio</h2>
          <p><strong>Idioma:</strong> ${safe.idioma}</p>
          <p><strong>Nombre:</strong> ${safe.name}</p>
          <p><strong>Empresa:</strong> ${safe.company}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Teléfono:</strong> ${safe.phone}</p>
          <p><strong>Prefiere contacto por:</strong> ${safe.method}</p>
          <p><strong>País:</strong> ${safe.country}</p>
          <p><strong>Servicio:</strong> ${safe.service}</p>
          <p><strong>Mensaje:</strong><br>${safe.message}</p>
        </div>
      `,
      text: [
        "Nuevo contacto desde el sitio",
        `Idioma: ${locale}`,
        `Nombre: ${name}`,
        `Empresa: ${company}`,
        `Email: ${email}`,
        `Teléfono: ${phone || "—"}`,
        `Prefiere contacto por: ${methodLabel}`,
        `País: ${countryLabel}`,
        `Servicio: ${serviceLabel}`,
        "",
        message,
      ].join("\n"),
    })

    if (result.error) console.error("Resend API error:", result.error)
    else emailed = true
    }

    if (!stored && !emailed) return NextResponse.json({ error: "send" }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "send" }, { status: 500 })
  }
}
