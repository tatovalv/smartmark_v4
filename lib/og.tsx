import { ImageResponse } from "next/og"
import { getDictionary, type Locale } from "@/lib/i18n"
import type { SitePage } from "@/lib/routes"

export const ogSize = { width: 1200, height: 630 }

const TAGLINE: Record<Locale, string> = {
  es: "IA y automatización para empresas",
  en: "AI & automation for companies",
}

export function ogAlt(locale: Locale, page: SitePage) {
  return getDictionary(locale).meta.pages[page].title
}

export async function renderOg(locale: Locale, page: SitePage, origin: string) {
  const title = ogAlt(locale, page)
  const font = await fetch(new URL("/fonts/Geist-SemiBold.ttf", origin)).then((response) => response.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#064e3b",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        <img src={`${origin}/logo-og.png`} width={480} height={209} style={{ objectFit: "contain", objectPosition: "left" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, lineHeight: 1.3, color: "#60E886" }}>
            {TAGLINE[locale]}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Geist", data: font, style: "normal", weight: 600 }],
    },
  )
}
