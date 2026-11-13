import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { getDictionary, isLocale, serviceOptions, type Locale } from "@/lib/i18n"

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const idioma = clean(body.idioma, 2)
    if (!isLocale(idioma)) {
      return NextResponse.json({ error: "missing" }, { status: 400 })
    }

    const locale: Locale = idioma
    const dict = getDictionary(locale)
    const name = clean(body.name, 120)
    const company = clean(body.company, 160)
    const role = clean(body.role, 120)
    const email = clean(body.email, 160)
    const phone = clean(body.phone, 40)
    const country = clean(body.country, 12)
    const service = clean(body.service, 40)
    const message = clean(body.message, 5000)

    const countryLabel = dict.form.countries.find((item) => item.value === country)?.label
    const serviceLabel = serviceOptions(dict).find((item) => item.value === service)?.label
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!name || !company || !role || !email || !countryLabel || !serviceLabel || !message || !emailOk) {
      return NextResponse.json({ error: email && !emailOk ? "email" : "missing" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json({ error: "config" }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const toEmail = process.env.RESEND_TO_EMAIL || "jc@smartmarkconsultores.com"
    const safe = {
      name: escapeHtml(name),
      company: escapeHtml(company),
      role: escapeHtml(role),
      email: escapeHtml(email),
      phone: escapeHtml(phone || "—"),
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
          <p><strong>Cargo:</strong> ${safe.role}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Teléfono:</strong> ${safe.phone}</p>
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
        `Cargo: ${role}`,
        `Email: ${email}`,
        `Teléfono: ${phone || "—"}`,
        `País: ${countryLabel}`,
        `Servicio: ${serviceLabel}`,
        "",
        message,
      ].join("\n"),
    })

    if (result.error) {
      console.error("Resend API error:", result.error)
      return NextResponse.json({ error: "send" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "send" }, { status: 500 })
  }
}
