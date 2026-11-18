import { generatedAdminEnv } from "@/lib/admin-env.generated"

export const ADMIN_COOKIE = "sm_admin"
const SESSION_MS = 12 * 60 * 60 * 1000

function adminEnvironment() {
  return {
    user: process.env.ADMIN_USER || generatedAdminEnv.user,
    password: process.env.ADMIN_PASSWORD || generatedAdminEnv.password,
    secret: process.env.ADMIN_SESSION_SECRET || generatedAdminEnv.secret,
  }
}

type SessionPayload = { user: string; exp: number }

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  return bytes
}

function equalText(left: string, right: string) {
  const length = Math.max(left.length, right.length)
  let mismatch = left.length === right.length ? 0 : 1
  for (let index = 0; index < length; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0)
  }
  return mismatch === 0
}

async function sign(payload: string) {
  const secret = adminEnvironment().secret
  if (!secret) return null
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
  return bytesToBase64Url(new Uint8Array(signature))
}

export function adminConfigured() {
  const env = adminEnvironment()
  return Boolean(env.user && env.password && env.secret)
}

export function credentialsMatch(user: string, password: string) {
  const env = adminEnvironment()
  return equalText(user, env.user) && equalText(password, env.password)
}

export async function createSessionToken() {
  const user = adminEnvironment().user
  if (!user) return null
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ user, exp: Date.now() + SESSION_MS } satisfies SessionPayload)))
  const signature = await sign(payload)
  if (!signature) return null
  return `${payload}.${signature}`
}

export async function readSession(token: string | undefined) {
  if (!token) return null
  const [payload, signature] = token.split(".")
  if (!payload || !signature) return null
  const expected = await sign(payload)
  if (!expected || !equalText(signature, expected)) return null
  try {
    const data = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as SessionPayload
    if (!data || data.user !== adminEnvironment().user || typeof data.exp !== "number" || data.exp < Date.now()) return null
    return { user: data.user }
  } catch {
    return null
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MS / 1000,
  }
}
