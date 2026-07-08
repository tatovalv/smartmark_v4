"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, GraduationCap, Repeat, Search, Brain, Handshake } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SectionHeader from "@/components/section-header"
import CtaBanner from "@/components/cta-banner"

export default function ServicesPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  const consultingServices = [
    { icon: Globe, titleKey: "services.example.digital.title", descriptionKey: "services.example.digital.description" },
    { icon: GraduationCap, titleKey: "services.example.training.title", descriptionKey: "services.example.training.description" },
    { icon: Repeat, titleKey: "services.example.automation.title", descriptionKey: "services.example.automation.description" },
    { icon: Search, titleKey: "services.example.strategy.title", descriptionKey: "services.example.strategy.description" },
    { icon: Brain, titleKey: "services.example.implementation.title", descriptionKey: "services.example.implementation.description" },
    { icon: Handshake, titleKey: "services.example.support.title", descriptionKey: "services.example.support.description" },
  ]

  const steps = [
    { step: "01", titleKey: "services.howItWorks.step1.title", descriptionKey: "services.howItWorks.step1.description" },
    { step: "02", titleKey: "services.howItWorks.step2.title", descriptionKey: "services.howItWorks.step2.description" },
    { step: "03", titleKey: "services.howItWorks.step3.title", descriptionKey: "services.howItWorks.step3.description" },
  ]

  return (
    <main className="relative text-white pt-36 sm:pt-44">
      <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <p className="section-label justify-center mb-6">{t("services.badge")}</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
          <span className="gradient-text-accent">{t("services.title")}</span>
        </h1>
        <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">{t("services.description")}</p>
        <Button onClick={() => handleNavigation("/contact")} size="lg" className="btn-glow rounded-xl px-8 py-6 h-auto">
          {t("services.cta.button")}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <SectionHeader label="Servicios" title={t("services.examples.title")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {consultingServices.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="glow-card p-6 md:p-7 group">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-tight">{t(service.titleKey)}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{t(service.descriptionKey)}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <SectionHeader label="Proceso" title={t("services.howItWorks.title")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.step} className="glow-card p-8">
              <span className="text-xs font-mono text-emerald-400 mb-4 block">{step.step}</span>
              <h3 className="text-lg font-semibold mb-2">{t(step.titleKey)}</h3>
              <p className="text-zinc-500 text-sm">{t(step.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto pb-32">
        <CtaBanner
          title={t("services.cta.title")}
          description={t("services.cta.description")}
          buttonText={t("services.cta.button")}
          onClick={() => handleNavigation("/contact")}
          variant="inverse"
        />
      </section>
    </main>
  )
}
