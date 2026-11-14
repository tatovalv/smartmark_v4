import { isLocale } from "@/lib/i18n"
import { renderOg } from "@/lib/og"
import { SITE_PAGE_IDS, type SitePage } from "@/lib/routes"

export const runtime = "edge"

function isPage(value: string): value is SitePage {
  return value === "home" || (SITE_PAGE_IDS as readonly string[]).includes(value)
}

export function GET(request: Request, { params }: { params: { locale: string; page: string } }) {
  if (!isLocale(params.locale) || !isPage(params.page)) {
    return new Response("Not found", { status: 404 })
  }
  return renderOg(params.locale, params.page, new URL(request.url).origin)
}
