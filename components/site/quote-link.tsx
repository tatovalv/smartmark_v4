"use client"

import type { ReactNode } from "react"

export function QuoteLink({
  serviceId,
  className,
  children,
}: {
  serviceId: string
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={`?servicio=${serviceId}#contacto`}
      data-service={serviceId}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        const url = new URL(window.location.href)
        url.searchParams.set("servicio", serviceId)
        url.hash = "contacto"
        window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`)
        window.dispatchEvent(new HashChangeEvent("hashchange"))
        window.dispatchEvent(new CustomEvent("sm:select-service", { detail: serviceId }))
        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
      }}
    >
      {children}
    </a>
  )
}
