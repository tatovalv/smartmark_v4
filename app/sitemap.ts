import type { MetadataRoute } from "next"
import { PAGE_UPDATED, pagePath, SITE_PAGE_IDS, type SitePage } from "@/lib/routes"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: SitePage[] = ["home", ...SITE_PAGE_IDS]

  return pages.flatMap((page) => {
    const es = new URL(pagePath("es", page), SITE_URL).toString()
    const en = new URL(pagePath("en", page), SITE_URL).toString()
    const languages = { es, en, "x-default": es }
    const lastModified = new Date(`${PAGE_UPDATED[page]}T00:00:00.000Z`)
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
