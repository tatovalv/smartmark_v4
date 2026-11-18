import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, readSession } from "@/lib/admin-session"
import { INQUIRY_STATUSES, listInquiries, updateInquiryStatus, type InquiryStatus } from "@/lib/inquiries"

async function authorized() {
  return readSession(cookies().get(ADMIN_COOKIE)?.value)
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "auth" }, { status: 401 })
  return NextResponse.json({ items: await listInquiries() })
}

export async function PATCH(request: NextRequest) {
  if (!(await authorized())) return NextResponse.json({ error: "auth" }, { status: 401 })
  const body = await request.json().catch(() => null)
  const id = typeof body?.id === "string" ? body.id : ""
  const status = body?.status as InquiryStatus
  if (!id || !INQUIRY_STATUSES.includes(status)) return NextResponse.json({ error: "invalid" }, { status: 400 })
  const inquiry = await updateInquiryStatus(id, status)
  if (!inquiry) return NextResponse.json({ error: "missing" }, { status: 404 })
  return NextResponse.json({ item: inquiry })
}
