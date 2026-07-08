"use client"

import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import SectionHeader from "@/components/section-header"
import CtaBanner from "@/components/cta-banner"

export default function AboutPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  const values = [
    {
      badge: t("about.why.badge"),
      title: t("about.why.title"),
      desc1: t("about.why.description1"),
      desc2: t("about.why.description2"),
    },
    {
      badge: t("about.belief.badge"),
      title: t("about.belief.title"),
      desc1: t("about.belief.description1"),
      desc2: t("about.belief.description2"),
    },
  ]

  const features = [
    { title: t("about.help.feature1.title"), desc: t("about.help.feature1.description") },
    { title: t("about.help.feature2.title"), desc: t("about.help.feature2.description") },
    { title: t("about.help.feature3.title"), desc: t("about.help.feature3.description") },
  ]

  return (
    <main className="relative text-white pt-36 sm:pt-44">
      <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <p className="section-label justify-center mb-6">{t("about.badge")}</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
          {t("about.hero.title.line1")}{" "}
          <span className="gradient-text-accent">{t("about.hero.title.line2")}</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">{t("about.hero.description")}</p>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-4">
        {values.map((block, index) => (
          <div key={index} className="glow-card p-8 md:p-10">
            <p className="section-label mb-4">{block.badge}</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{block.title}</h2>
            <p className="text-zinc-400 leading-relaxed mb-3">{block.desc1}</p>
            <p className="text-zinc-500 leading-relaxed text-sm">{block.desc2}</p>
          </div>
        ))}
      </section>

      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <SectionHeader
          label={t("about.help.badge")}
          title={t("about.help.title")}
          description={t("about.help.description1")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="glow-card p-6">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="glow-card p-10 md:p-12 text-center">
          <p className="section-label justify-center mb-4">{t("about.who.badge")}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("about.who.title")}</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">{t("about.who.description")}</p>
          <p className="text-zinc-500 italic text-sm">&ldquo;{t("about.who.quote")}&rdquo;</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto pb-32">
        <CtaBanner
          title={t("about.cta.title")}
          description={t("about.cta.description")}
          buttonText={t("about.cta.button")}
          onClick={() => handleNavigation("/contact")}
        />
      </section>
    </main>
  )
}
