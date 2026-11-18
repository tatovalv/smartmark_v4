import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Landing from "@/components/site/landing"
import { getDictionary, isLocale, type Locale } from "@/lib/i18n"
import { pageFromSlug, SITE_PAGE_IDS, SITE_PAGES, type SitePage } from "@/lib/routes"
import { buildMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return (["es", "en"] as const).flatMap((locale) => [
    { locale, slug: [] as string[] },
    ...SITE_PAGE_IDS.map((page) => ({ locale, slug: [SITE_PAGES[page][locale]] })),
  ])
}

export const dynamicParams = true

function resolvePage(locale: string, slug: string[] | undefined): SitePage | null {
  if (!isLocale(locale)) return null
  const parts = slug ?? []
  if (parts.length === 0) return "home"
  if (parts.length > 1) return null
  return pageFromSlug(locale, parts[0])
}

export function generateMetadata({ params }: { params: { locale: string; slug?: string[] } }): Metadata {
  const page = resolvePage(params.locale, params.slug)
  if (!page || !isLocale(params.locale)) return {}
  return buildMetadata(params.locale, page)
}

export default function Page({ params }: { params: { locale: string; slug?: string[] } }) {
  if (!isLocale(params.locale)) notFound()
  const page = resolvePage(params.locale as Locale, params.slug)
  if (!page) notFound()
  return <Landing locale={params.locale} dict={getDictionary(params.locale)} page={page} />
}
