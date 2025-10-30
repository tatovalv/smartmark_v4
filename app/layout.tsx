import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import SeoSchema from "@/components/seo-schema"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SmartMark Consultores - Automatización IA Avanzada | Advanced AI Automation",
  description:
    "Especialistas en automatización IA que transforman operaciones empresariales. Optimizamos procesos, reducimos costos y aumentamos productividad con soluciones inteligentes. AI automation specialists transforming business operations.",
  keywords:
    "Automatización IA, Inteligencia Artificial, AI Automation, Procesos Automatizados, Flujos de Trabajo IA, Optimización Empresarial, Machine Learning, Análisis Predictivo, Business Process Automation, Intelligent Automation",
  authors: [{ name: "SmartMark Consultores" }],
  creator: "SmartMark Consultores",
  publisher: "SmartMark Consultores",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US", "pt_BR"],
    url: "https://smartmarkconsultores.com",
    siteName: "SmartMark Consultores",
    title: "SmartMark Consultores - Automatización IA Avanzada",
    description:
      "Especialistas en automatización IA que transforman operaciones empresariales. Optimizamos procesos, reducimos costos y aumentamos productividad con soluciones inteligentes.",
    images: [
      {
        url: "https://smartmarkconsultores.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SmartMark Consultores - Automatización IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartMark Consultores - Automatización IA Avanzada",
    description:
      "Especialistas en automatización IA que transforman operaciones empresariales. Optimizamos procesos, reducimos costos y aumentamos productividad.",
    images: ["https://smartmarkconsultores.com/twitter-image.jpg"],
    creator: "@smartmarkia",
  },
  alternates: {
    canonical: "https://smartmarkconsultores.com",
    languages: {
      "es-ES": "https://smartmarkconsultores.com",
      "en-US": "https://smartmarkconsultores.com/en",
      "pt-BR": "https://smartmarkconsultores.com/pt",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
            <SeoSchema />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
