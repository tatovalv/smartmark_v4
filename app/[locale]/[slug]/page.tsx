import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Landing from "@/components/site/landing"
import { getDictionary, isLocale } from "@/lib/i18n"
import { isSiteSlug, SITE_PAGES, SITE_SLUGS } from "@/lib/routes"
import { buildMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return (["es", "en"] as const).flatMap((locale) => SITE_SLUGS.map((slug) => ({ locale, slug })))
}

export const dynamicParams = false

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale) || !isSiteSlug(params.slug)) return {}
  return buildMetadata(params.locale, SITE_PAGES[params.slug])
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale) || !isSiteSlug(params.slug)) notFound()
  return <Landing locale={params.locale} dict={getDictionary(params.locale)} page={SITE_PAGES[params.slug]} />
}
