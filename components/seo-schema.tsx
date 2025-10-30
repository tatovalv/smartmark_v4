"use client"

import { useLanguage } from "@/contexts/language-context"

export default function SeoSchema() {
  const { language } = useLanguage()

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SmartMark Consultores",
    url: "https://smartmarkconsultores.com",
    logo: "https://smartmarkconsultores.com/logo.png",
    description:
      language === "es"
        ? "Especialistas en automatización IA que transforman operaciones empresariales con soluciones inteligentes de vanguardia."
        : language === "en"
          ? "AI automation specialists who transform business operations with cutting-edge intelligent solutions."
          : "Especialistas em automação IA que transformam operações empresariais com soluções inteligentes de ponta.",
    sameAs: [
      "https://facebook.com/smartmarkconsultores",
      "https://twitter.com/smartmarkia",
      "https://linkedin.com/company/smartmark-consultores",
      "https://instagram.com/smartmarkconsultores",
    ],
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: language === "es" ? "Automatización con IA" : "AI Automation",
    provider: {
      "@type": "Organization",
      name: "SmartMark Consultores",
    },
    description:
      language === "es"
        ? "Soluciones de automatización impulsadas por IA avanzada para optimizar procesos empresariales, reducir costos y aumentar la productividad."
        : language === "en"
          ? "Advanced AI-powered automation solutions to optimize business processes, reduce costs, and increase productivity."
          : "Soluções de automação impulsionadas por IA avançada para otimizar processos empresariais, reduzir custos e aumentar a produtividade.",
    serviceType: "AI Automation",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  )
}
