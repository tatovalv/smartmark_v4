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
        ? "Consultoría en transformación digital, capacitación en IA y automatización de procesos para empresas que quieren crecer con tecnología."
        : language === "en"
          ? "Digital transformation consulting, AI training, and process automation for companies that want to grow with technology."
          : "Consultoria em transformação digital, capacitação em IA e automação de processos para empresas que querem crescer com tecnologia.",
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
    name: language === "es" ? "Consultoría en transformación digital e IA" : "Digital Transformation & AI Consulting",
    provider: {
      "@type": "Organization",
      name: "SmartMark Consultores",
    },
    description:
      language === "es"
        ? "Servicios de consultoría: transformación digital, capacitaciones en IA, automatización de procesos, diagnóstico estratégico e implementación de soluciones."
        : language === "en"
          ? "Consulting services: digital transformation, AI training, process automation, strategic assessment, and solution implementation."
          : "Serviços de consultoria: transformação digital, capacitações em IA, automação de processos, diagnóstico estratégico e implementação de soluções.",
    serviceType: "Technology Consulting",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  )
}
