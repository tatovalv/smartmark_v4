import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { SITE_URL } from "@/lib/site"
import "../globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "SmartMark Consultores",
  authors: [{ name: "SmartMark Consultores" }],
  creator: "SmartMark Consultores",
  publisher: "SmartMark Consultores",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }]
}

export const dynamicParams = false

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const lang = params.locale === "en" ? "en" : "es"
  return (
    <html lang={lang}>
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  )
}
