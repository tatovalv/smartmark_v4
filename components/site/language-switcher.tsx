"use client"

import { useEffect, useState, type MouseEvent } from "react"
import type { Locale } from "@/lib/i18n"
import { pagePath, type SitePage } from "@/lib/routes"
import { rememberLocale } from "@/components/site/locale-storage"

export function LanguageSwitcher({
  locale,
  label,
  page,
  tone = "light",
}: {
  locale: Locale
  label: string
  page: SitePage
  tone?: "light" | "dark"
}) {
  const [search, setSearch] = useState("")

  useEffect(() => {
    const read = () => setSearch(window.location.search)
    read()
    window.addEventListener("popstate", read)
    return () => window.removeEventListener("popstate", read)
  }, [])

  const go = (target: Locale) => (event: MouseEvent<HTMLAnchorElement>) => {
    rememberLocale(target)
    const next = `${pagePath(target, page)}${window.location.search}`
    event.currentTarget.href = next
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    window.location.assign(next)
  }

  const esHref = `${pagePath("es", page)}${search}`
  const enHref = `${pagePath("en", page)}${search}`

  const itemClass = (active: boolean) => {
    if (tone === "dark") {
      return active
        ? "text-white underline decoration-2 underline-offset-4"
        : "text-white/80 hover:text-white"
    }
    return active
      ? "text-brand-secondary underline decoration-2 underline-offset-4"
      : "text-brand-muted hover:text-brand-secondary"
  }

  return (
    <nav aria-label={label} className="flex items-center gap-2 text-sm font-semibold">
      <a
        href={esHref}
        hrefLang="es"
        lang="es"
        aria-current={locale === "es" ? "page" : undefined}
        className={itemClass(locale === "es")}
        onClick={go("es")}
      >
        ES
      </a>
      <span aria-hidden="true" className={tone === "dark" ? "text-white/50" : "text-brand-line"}>
        |
      </span>
      <a
        href={enHref}
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
        className={itemClass(locale === "en")}
        onClick={go("en")}
      >
        EN
      </a>
    </nav>
  )
}
