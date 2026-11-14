"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { Dictionary } from "@/lib/i18n"

type Cases = Dictionary["cases"]

export function CaseBoard({ cases }: { cases: Cases }) {
  const [open, setOpen] = useState<number | null>(null)
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const item = open === null ? null : cases.items[open]

  useEffect(() => {
    const openFromHash = () => {
      const index = cases.items.findIndex((entry) => `#${entry.id}` === window.location.hash)
      if (index >= 0) setOpen(index)
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [cases.items])

  useEffect(() => {
    if (open === null) return
    const previous = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    dialog?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null)
        return
      }
      if (event.key !== "Tab" || !dialog) return
      const items = [...dialog.querySelectorAll<HTMLElement>("button, a, [href], input, select, textarea")]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
      previous?.focus()
    }
  }, [open])

  return (
    <>
      <div className="case-grid">
        {cases.items.map((entry, index) => (
          <article key={entry.id} id={entry.id} className="case-card">
            <p className="index">{String(index + 1).padStart(2, "0")}</p>
            <h2>{entry.title}</h2>
            <p>{entry.text}</p>
            <button type="button" className="case-open" onClick={() => setOpen(index)}>
              {cases.open}
            </button>
          </article>
        ))}
      </div>

      {item ? (
        <div className="case-layer">
          <button type="button" className="case-backdrop" aria-label={cases.close} onClick={() => setOpen(null)} />
          <div
            ref={dialogRef}
            className="case-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
          >
            <div className="case-dialog-head">
              <p className="index">{String((open ?? 0) + 1).padStart(2, "0")}</p>
              <button type="button" className="case-close" onClick={() => setOpen(null)}>
                {cases.close}
              </button>
            </div>
            <h3 id={titleId}>{item.title}</h3>
            <p className="case-situation">{item.situation}</p>
            <p className="sheet-label">{cases.builtLabel}</p>
            <ul>
              {item.builds.map((build) => (
                <li key={build}>{build}</li>
              ))}
            </ul>
            <div className="case-keeps">
              <p className="sheet-label">{cases.keepsLabel}</p>
              <p>{item.keeps}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
