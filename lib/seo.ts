import type { Metadata } from "next"
import { getDictionary, homePath, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"

export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale)
  const path = homePath(locale)
  const url = new URL(path, SITE_URL).toString()

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: url,
      languages: {
        es: new URL("/", SITE_URL).toString(),
        en: new URL("/en", SITE_URL).toString(),
        "x-default": new URL("/", SITE_URL).toString(),
      },
    },
    openGraph: {
      type: "website",
      url,
      title: dict.meta.title,
      description: dict.meta.description,
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
      title: dict.meta.title,
      description: dict.meta.description,
    },
  }
}
