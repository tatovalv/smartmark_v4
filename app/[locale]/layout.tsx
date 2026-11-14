import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { SITE_URL } from "@/lib/site"
import "../globals.css"

const gaId = process.env.NEXT_PUBLIC_GA_ID
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION

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
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
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
      <body className={`${GeistSans.className} antialiased`}>
        {children}
        {gaId && /^G-[A-Z0-9]+$/.test(gaId) ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
