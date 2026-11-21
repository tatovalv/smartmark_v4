"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { track } from "@/lib/analytics"
import { pagePath, type SitePage } from "@/lib/routes"
import { EnglishBanner } from "@/components/site/english-banner"
import { LanguageSwitcher } from "@/components/site/language-switcher"

type LinkItem = { href: string; label: string }
type Booking = { href: string; target?: string; rel?: string }

export function Header({
  locale,
  logoAlt,
  homeHref,
  links,
  cta,
  ctaShort,
  booking,
  labels,
  page,
  banner,
}: {
  locale: Locale
  logoAlt: string
  homeHref: string
  links: LinkItem[]
  cta: string
  ctaShort: string
  booking: Booking
  labels: { nav: string; lang: string; openMenu: string; closeMenu: string }
  page: SitePage
  banner: { message: string; action: string; dismiss: string } | null
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const first = panelRef.current?.querySelector<HTMLElement>("a, button")
    first?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-white/95 backdrop-blur">
      <div className="h-1 bg-brand-primary" />
      {banner ? <EnglishBanner {...banner} englishHref={pagePath("en", page)} /> : null}
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
        <a href={homeHref} className="shrink-0 rounded-md" aria-label={logoAlt}>
          <img src="/logo-mark.png" alt="" width={188} height={81} className="h-9 w-auto sm:h-12" />
        </a>

        <nav aria-label={labels.nav} className="ml-6 hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.href === pagePath(locale, page) ? "page" : undefined}
              className="text-sm font-medium text-brand-text hover:text-brand-secondary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <LanguageSwitcher locale={locale} label={labels.lang} page={page} />
          <a {...booking} className="btn btn-primary" onClick={() => track("cta_click")}>
            {cta}
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3 lg:hidden">
          <LanguageSwitcher locale={locale} label={labels.lang} page={page} />
          <a {...booking} className="btn btn-primary btn-sm" onClick={() => track("cta_click")}>
            {ctaShort}
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-line"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" ref={panelRef} className="border-t border-brand-line bg-white lg:hidden">
          <nav aria-label={labels.nav} className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={link.href === pagePath(locale, page) ? "page" : undefined}
                className="rounded-xl px-3 py-3 text-base font-medium hover:bg-brand-surface"
                onClick={close}
              >
                {link.label}
              </a>
            ))}
            <a
              {...booking}
              className="btn btn-primary mt-3 w-full"
              onClick={() => {
                track("cta_click")
                close()
              }}
            >
              {cta}
            </a>
            <div className="mt-4 border-t border-brand-line pt-4">
              <LanguageSwitcher locale={locale} label={labels.lang} page={page} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
