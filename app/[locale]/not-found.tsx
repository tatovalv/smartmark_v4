import type { Metadata } from "next"
import { headers } from "next/headers"
import { getDictionary, homePath, isLocale, type Locale } from "@/lib/i18n"

export const metadata: Metadata = {
  robots: { index: false },
}

export default function NotFound() {
  const headerLocale = headers().get("x-locale")
  const locale: Locale = isLocale(headerLocale || "") ? (headerLocale as Locale) : "es"
  const dict = getDictionary(locale)

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-4 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{dict.notFound.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-brand-muted">{dict.notFound.text}</p>
      <a href={homePath(locale)} className="btn btn-primary mt-8 w-fit">
        {dict.notFound.home}
      </a>
    </main>
  )
}
