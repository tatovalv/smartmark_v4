import type { Dictionary, Locale } from "@/lib/i18n"
import { pagePath, type SitePage } from "@/lib/routes"
import { EMAIL, LINKEDIN_URL, SITE_URL } from "@/lib/site"

const AREAS = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "República Dominicana",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Haití",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "Uruguay",
  "Venezuela",
]

const KNOWS_ABOUT = [
  "Inteligencia artificial",
  "Automatización de procesos",
  "Agentes de IA",
  "Ingeniería de prompts",
  "Capacitación en IA",
]

function absolute(locale: Locale, page: SitePage) {
  return new URL(pagePath(locale, page), SITE_URL).toString()
}

function organizationJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "SmartMark Consultores",
    url: absolute(locale, "home"),
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description: dict.meta.pages.home.description,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San José",
      addressCountry: "CR",
    },
    areaServed: AREAS.map((name) => ({ "@type": "Country", name })),
    contactPoint: {
      "@type": "ContactPoint",
      email: EMAIL,
      contactType: "sales",
      availableLanguage: ["Spanish", "English"],
    },
    knowsAbout: KNOWS_ABOUT,
    availableLanguage: ["Spanish", "English"],
    sameAs: [LINKEDIN_URL],
  }
}

function websiteJsonLd(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: absolute(locale, "home"),
    name: "SmartMark Consultores",
    inLanguage: locale === "en" ? "en" : "es",
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export function breadcrumbJsonLd(locale: Locale, page: Exclude<SitePage, "home">, dict: Dictionary) {
  const name = {
    services: dict.nav.services,
    cases: dict.nav.cases,
    how: dict.nav.how,
    why: dict.nav.why,
    contact: dict.nav.contact,
  }[page]

  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.breadcrumb.home,
        item: absolute(locale, "home"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: absolute(locale, page),
      },
    ],
  }
}

export function StructuredData({ locale, dict, page }: { locale: Locale; dict: Dictionary; page: SitePage }) {
  const graph = [
    organizationJsonLd(locale, dict),
    websiteJsonLd(locale),
    ...(page === "home" ? [] : [breadcrumbJsonLd(locale, page, dict)]),
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  )
}
