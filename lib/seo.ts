import type { Metadata } from "next"
import { getDictionary, type Locale } from "@/lib/i18n"
import { pagePath, type SitePage } from "@/lib/routes"
import { SITE_URL } from "@/lib/site"

export function buildMetadata(locale: Locale, page: SitePage = "home"): Metadata {
  const dict = getDictionary(locale)
  const copy = dict.meta.pages[page]
  const path = pagePath(locale, page)
  const url = new URL(path, SITE_URL).toString()
  const image = {
    url: `/og/${locale}/${page}`,
    width: 1200,
    height: 630,
    alt: copy.title,
  }

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: {
        es: new URL(pagePath("es", page), SITE_URL).toString(),
        en: new URL(pagePath("en", page), SITE_URL).toString(),
        "x-default": new URL(pagePath("es", page), SITE_URL).toString(),
      },
    },
    openGraph: {
      type: "website",
      url,
      title: copy.title,
      description: copy.description,
      siteName: "SmartMark Consultores",
      locale: locale === "en" ? "en_US" : "es_419",
      alternateLocale: locale === "en" ? ["es_419"] : ["en_US"],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [image],
    },
  }
}
