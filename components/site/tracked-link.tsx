"use client"

import type { AnchorHTMLAttributes, MouseEvent } from "react"
import { track, type AnalyticsEvent } from "@/lib/analytics"

export function TrackedLink({
  event,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: AnalyticsEvent }) {
  const handleClick = (click: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(click)
    track(event)
  }

  return <a {...props} onClick={handleClick} />
}
