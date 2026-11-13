"use client"

import { useEffect, useState, type MouseEvent } from "react"
import type { Locale } from "@/lib/i18n"
import { rememberLocale } from "@/components/site/locale-storage"

function hrefFor(target: Locale) {
  const { hash, search } = window.location
  const base = target === "en" ? "/en" : "/"
  return `${base}${search}${hash}`
}

export function LanguageSwitcher({
  locale,
  label,
  tone = "light",
}: {
  locale: Locale
  label: string
  tone?: "light" | "dark"
}) {
  const [suffix, setSuffix] = useState("")

  useEffect(() => {
    const read = () => setSuffix(`${window.location.search}${window.location.hash}`)
    read()
    window.addEventListener("hashchange", read)
    window.addEventListener("popstate", read)
    return () => {
      window.removeEventListener("hashchange", read)
      window.removeEventListener("popstate", read)
    }
  }, [])

  const go = (target: Locale) => (event: MouseEvent<HTMLAnchorElement>) => {
    rememberLocale(target)
    const next = hrefFor(target)
    event.currentTarget.href = next
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    window.location.assign(next)
  }

  const esHref = `/${suffix}`
  const enHref = `/en${suffix}`

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
