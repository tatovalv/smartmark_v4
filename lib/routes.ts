import type { Locale } from "@/lib/i18n"

export const SITE_PAGES = {
  services: { es: "servicios", en: "services" },
  cases: { es: "casos-de-uso", en: "use-cases" },
  how: { es: "como-trabajamos", en: "how-we-work" },
  why: { es: "por-que-smartmark", en: "why-smartmark" },
  contact: { es: "contacto", en: "contact" },
} as const

export type SitePageId = keyof typeof SITE_PAGES
export type SitePage = "home" | SitePageId

export const SITE_PAGE_IDS = Object.keys(SITE_PAGES) as SitePageId[]

/** Fixed dates so each deploy does not look like a content change to Google. */
export const PAGE_UPDATED: Record<SitePage, string> = {
  home: "2026-11-14",
  services: "2026-11-14",
  cases: "2026-11-14",
  how: "2026-11-14",
  why: "2026-11-14",
  contact: "2026-11-14",
}

export function pageFromSlug(locale: Locale, slug: string): SitePageId | null {
  for (const page of SITE_PAGE_IDS) {
    if (SITE_PAGES[page][locale] === slug) return page
  }
  return null
}

export function isLocaleSlug(locale: Locale, value: string) {
  return pageFromSlug(locale, value) !== null
}

export function pagePath(locale: Locale, page: SitePage) {
  if (page === "home") return locale === "en" ? "/en" : "/"
  const slug = SITE_PAGES[page][locale]
  return locale === "en" ? `/en/${slug}` : `/${slug}`
}

export function alternatePath(pathname: string, target: Locale) {
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/")
  const source: Locale = isEnglish ? "en" : "es"
  const bare = (isEnglish ? pathname.replace(/^\/en(?=\/|$)/, "") : pathname).replace(/\/$/, "") || "/"
  if (bare === "/") return pagePath(target, "home")
  const page = pageFromSlug(source, bare.slice(1))
  return pagePath(target, page ?? "home")
}
