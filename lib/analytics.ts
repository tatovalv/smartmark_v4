export type AnalyticsEvent = "generate_lead" | "whatsapp_click" | "cta_click"

type Gtag = (...args: unknown[]) => void

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id) return
  const gtag = (window as Window & { gtag?: Gtag }).gtag
  gtag?.("event", event)
}
