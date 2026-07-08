"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  GraduationCap,
  Repeat,
  Search,
  Brain,
  Handshake,
  Sparkles,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SectionHeader from "@/components/section-header"
import CtaBanner from "@/components/cta-banner"

export default function Home() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  const services = [
    { icon: Globe, titleKey: "home.proc1.title", descKey: "home.proc1.desc", accent: "from-emerald-500/20 to-transparent" },
    { icon: GraduationCap, titleKey: "home.proc2.title", descKey: "home.proc2.desc", accent: "from-cyan-500/20 to-transparent" },
    { icon: Repeat, titleKey: "home.proc3.title", descKey: "home.proc3.desc", accent: "from-emerald-500/20 to-transparent" },
    { icon: Search, titleKey: "home.proc4.title", descKey: "home.proc4.desc", accent: "from-cyan-500/15 to-transparent" },
    { icon: Brain, titleKey: "home.proc5.title", descKey: "home.proc5.desc", accent: "from-emerald-500/20 to-transparent", wide: true },
    { icon: Handshake, titleKey: "home.proc6.title", descKey: "home.proc6.desc", accent: "from-cyan-500/15 to-transparent", wide: true },
  ]

  const steps = [
    { number: "01", titleKey: "home.how.step1.title", descKey: "home.how.step1.desc" },
    { number: "02", titleKey: "home.how.step2.title", descKey: "home.how.step2.desc" },
    { number: "03", titleKey: "home.how.step3.title", descKey: "home.how.step3.desc" },
  ]

  const benefits = [
    { titleKey: "home.benefit.time", descKey: "home.benefit.time.desc" },
    { titleKey: "home.benefit.cost", descKey: "home.benefit.cost.desc" },
    { titleKey: "home.benefit.grow", descKey: "home.benefit.grow.desc" },
  ]

  return (
    <main className="relative text-white">
      {/* Hero */}
      <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-24 min-h-[90vh]">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-emerald-400/90">
              {t("home.badge")}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-[1.05] tracking-tight">
            <span className="text-white">{t("home.hero.line1")}</span>
            <br />
            <span className="gradient-text-accent animate-gradient-shift">{t("home.hero.line3")}</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
            {t("home.hero.desc1")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleNavigation("/contact")}
              size="lg"
              className="btn-glow text-base px-8 py-6 rounded-xl h-auto"
            >
              {t("home.cta.primary")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => handleNavigation("/services")}
              size="lg"
              variant="outline"
              className="btn-ghost text-base px-8 py-6 rounded-xl h-auto"
            >
              {t("home.cta.secondary")}
            </Button>
          </div>
        </div>
      </section>

      {/* Services bento grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label={t("home.badge")}
            title={t("home.processes.title")}
            description={t("home.processes.subtitle")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className={`glow-card p-6 md:p-7 group ${service.wide ? "lg:col-span-1" : ""}`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white tracking-tight">
                      {t(service.titleKey)}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{t(service.descKey)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <CtaBanner
            title={t("home.banner1.title")}
            description={t("home.banner1.desc")}
            buttonText={t("home.cta.primary")}
            onClick={() => handleNavigation("/contact")}
            variant="inverse"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Proceso" title={t("home.how.title")} description={t("home.how.subtitle")} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="glow-card p-8 relative overflow-hidden">
                <span className="absolute top-4 right-6 text-6xl font-bold text-white/[0.03] select-none">
                  {step.number}
                </span>
                <div className="relative">
                  <span className="text-xs font-mono text-emerald-400 mb-4 block">{step.number}</span>
                  <h3 className="text-xl font-semibold mb-3 tracking-tight">{t(step.titleKey)}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{t(step.descKey)}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 w-4 h-px bg-gradient-to-r from-emerald-500/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="Ventajas" title={t("home.benefits.title")} />
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="glow-card flex items-start gap-4 p-5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{t(benefit.titleKey)}</h3>
                  <p className="text-zinc-500 text-sm">{t(benefit.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-4xl mx-auto">
          <CtaBanner
            title={`${t("home.final.title1")} ${t("home.final.title2")}`}
            description={t("home.final.desc1")}
            buttonText={t("home.final.cta")}
            onClick={() => handleNavigation("/contact")}
          />
        </div>
      </section>
    </main>
  )
}
