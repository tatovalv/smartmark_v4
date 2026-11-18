import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, adminConfigured, createSessionToken, credentialsMatch, sessionCookieOptions } from "@/lib/admin-session"

const attempts = new Map<string, number[]>()
const LIMIT = 8
const WINDOW_MS = 10 * 60 * 1000

function limited(ip: string) {
  const now = Date.now()
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= LIMIT) {
    attempts.set(ip, recent)
    return true
  }
  recent.push(now)
  attempts.set(ip, recent)
  return false
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (limited(ip)) return NextResponse.json({ error: "rate" }, { status: 429 })
  if (!adminConfigured()) return NextResponse.json({ error: "config" }, { status: 500 })

  const body = await request.json().catch(() => null)
  const user = typeof body?.user === "string" ? body.user.trim() : ""
  const password = typeof body?.password === "string" ? body.password : ""
  if (!credentialsMatch(user, password)) return NextResponse.json({ error: "invalid" }, { status: 401 })

  const token = await createSessionToken()
  if (!token) return NextResponse.json({ error: "config" }, { status: 500 })
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions())
  return response
}
