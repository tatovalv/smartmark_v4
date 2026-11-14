import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isLocaleSlug } from "@/lib/routes"

function spanishSlug(pathname: string) {
  const slug = pathname.replace(/\/$/, "").slice(1)
  if (!slug || slug.includes("/")) return null
  return isLocaleSlug("es", slug) ? slug : null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/es" || pathname === "/es/") {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url, 308)
  }

  if (pathname.startsWith("/es/")) {
    const slug = pathname.slice(4).replace(/\/$/, "")
    if (isLocaleSlug("es", slug)) {
      const url = request.nextUrl.clone()
      url.pathname = `/${slug}`
      return NextResponse.redirect(url, 308)
    }
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/es"
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-locale", "es")
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  const slug = spanishSlug(pathname)
  if (slug) {
    const url = request.nextUrl.clone()
    url.pathname = `/es/${slug}`
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-locale", "es")
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es")
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
