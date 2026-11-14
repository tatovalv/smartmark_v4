import type { ReactNode } from "react"
import { TrackedLink } from "@/components/site/tracked-link"
import type { Locale } from "@/lib/i18n"
import { pagePath } from "@/lib/routes"

export function QuoteLink({
  locale,
  serviceId,
  className,
  children,
}: {
  locale: Locale
  serviceId: string
  className?: string
  children: ReactNode
}) {
  const param = locale === "en" ? "service" : "servicio"

  return (
    <TrackedLink
      href={`${pagePath(locale, "contact")}?${param}=${encodeURIComponent(serviceId)}`}
      data-service={serviceId}
      className={className}
      event="cta_click"
    >
      {children}
    </TrackedLink>
  )
}
