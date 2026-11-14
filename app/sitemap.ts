import type { MetadataRoute } from "next"
import { pagePath, SITE_PAGES, type SitePage } from "@/lib/routes"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const pages: SitePage[] = ["home", ...Object.values(SITE_PAGES)]

  return pages.flatMap((page) => {
    const es = new URL(pagePath("es", page), SITE_URL).toString()
    const en = new URL(pagePath("en", page), SITE_URL).toString()
    const languages = { es, en, "x-default": es }
    return [
      {
        url: es,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: page === "home" ? 1 : 0.8,
        alternates: { languages },
      },
      {
        url: en,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: page === "home" ? 0.9 : 0.7,
        alternates: { languages },
      },
    ]
  })
}
