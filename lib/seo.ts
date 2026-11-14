import type { Metadata } from "next"
import { getDictionary, type Dictionary, type Locale } from "@/lib/i18n"
import { pagePath, type SitePage } from "@/lib/routes"
import { SITE_URL } from "@/lib/site"

function pageCopy(dict: Dictionary, page: SitePage) {
  if (page === "services") return { title: dict.services.title, description: dict.services.intro }
  if (page === "cases") return { title: dict.cases.title, description: dict.cases.lead }
  if (page === "how") {
    return { title: dict.how.title, description: dict.how.steps.map((step) => step.text).join(" ") }
  }
  if (page === "why") return { title: dict.why.title, description: dict.why.lead }
  if (page === "contact") return { title: dict.contact.title, description: dict.contact.text }
  return { title: dict.meta.title, description: dict.meta.description }
}

export function buildMetadata(locale: Locale, page: SitePage = "home"): Metadata {
  const dict = getDictionary(locale)
  const path = pagePath(locale, page)
  const url = new URL(path, SITE_URL).toString()
  const copy = pageCopy(dict, page)
  const title = page === "home" ? copy.title : `${copy.title} | SmartMark Consultores`

  return {
    title,
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
      title,
      description: copy.description,
      siteName: "SmartMark Consultores",
      locale: locale === "en" ? "en_US" : "es_419",
      alternateLocale: locale === "en" ? ["es_419"] : ["en_US"],
      images: [
        {
          url: "/logo-mark.png",
          alt: dict.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description: copy.description,
    },
  }
}
