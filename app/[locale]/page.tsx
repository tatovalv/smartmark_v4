import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Landing from "@/components/site/landing"
import { getDictionary, isLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {}
  return buildMetadata(params.locale)
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  return <Landing locale={params.locale} dict={getDictionary(params.locale)} />
}
