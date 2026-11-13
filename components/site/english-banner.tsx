"use client"

import { useEffect, useState, type MouseEvent } from "react"
import { X } from "lucide-react"
import { BANNER_KEY, LOCALE_KEY, readStorage, rememberLocale } from "@/components/site/locale-storage"

export function EnglishBanner({
  message,
  action,
  dismiss,
}: {
  message: string
  action: string
  dismiss: string
}) {
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState("")

  useEffect(() => {
    setHash(window.location.hash)
    const language = (navigator.language || "").toLowerCase()
    if (!language.startsWith("en")) return
    if (readStorage(LOCALE_KEY) || readStorage(BANNER_KEY)) return
    setOpen(true)
  }, [])

  if (!open) return null

  return (
    <div className="bg-brand-secondary text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2.5 text-sm sm:px-6">
        <p>
          {message}{" "}
          <a
            href={hash ? `/en${hash}` : "/en"}
            hrefLang="en"
            className="font-semibold underline underline-offset-4"
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              rememberLocale("en")
              const next = `/en${window.location.search}${window.location.hash}`
              event.currentTarget.href = next
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
              event.preventDefault()
              window.location.assign(next)
            }}
          >
            {action}
          </a>
        </p>
        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-white/10"
          aria-label={dismiss}
          onClick={() => {
            try {
              localStorage.setItem(BANNER_KEY, "1")
            } catch {
              /* ignore */
            }
            setOpen(false)
          }}
        >
          <X aria-hidden="true" size={16} />
        </button>
      </div>
    </div>
  )
}
