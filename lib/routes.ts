import type { Locale } from "@/lib/i18n"

export const SITE_PAGES = {
  servicios: "services",
  casos: "cases",
  "como-trabajamos": "how",
  "por-que": "why",
  contacto: "contact",
} as const

export type SiteSlug = keyof typeof SITE_PAGES
export type SitePage = "home" | (typeof SITE_PAGES)[SiteSlug]

export const SITE_SLUGS = Object.keys(SITE_PAGES) as SiteSlug[]

export function isSiteSlug(value: string): value is SiteSlug {
  return Object.prototype.hasOwnProperty.call(SITE_PAGES, value)
}

export function pagePath(locale: Locale, page: SitePage) {
  if (page === "home") return locale === "en" ? "/en" : "/"
  const slug = SITE_SLUGS.find((item) => SITE_PAGES[item] === page)
  if (!slug) return locale === "en" ? "/en" : "/"
  return locale === "en" ? `/en/${slug}` : `/${slug}`
}

export function alternatePath(pathname: string, target: Locale) {
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/"
  if (target === "en") return bare === "/" ? "/en" : `/en${bare}`
  return bare
}
