"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Mail,
  FileText,
  MessageSquare,
  Calendar,
  Database,
  BarChart3,
  Globe,
  ShoppingCart,
  Users,
  Repeat,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import FeatureIcon from "@/components/feature-icon"
import CleanCard from "@/components/clean-card"

export default function ServicesPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-emerald-400 text-sm font-medium">{t("services.badge")}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("services.title")}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("services.description")}
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mb-20">
          <CleanCard className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("services.value.title")}</h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                {t("services.value.description")}
              </p>
            </div>
          </CleanCard>
        </div>

        {/* Examples Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{t("services.examples.title")}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {t("services.examples.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                titleKey: "services.example.emails.title",
                descriptionKey: "services.example.emails.description",
                color: "blue",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                titleKey: "services.example.documents.title",
                descriptionKey: "services.example.documents.description",
                color: "green",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                titleKey: "services.example.customerService.title",
                descriptionKey: "services.example.customerService.description",
                color: "purple",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                titleKey: "services.example.appointments.title",
                descriptionKey: "services.example.appointments.description",
                color: "pink",
              },
              {
                icon: <Database className="w-6 h-6" />,
                titleKey: "services.example.dataEntry.title",
                descriptionKey: "services.example.dataEntry.description",
                color: "blue",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                titleKey: "services.example.reports.title",
                descriptionKey: "services.example.reports.description",
                color: "green",
              },
            ].map((example, index) => (
              <CleanCard key={index} color={example.color as any}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <FeatureIcon icon={example.icon} color={example.color} size="sm" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{t(example.titleKey)}</h3>
                  <p className="text-gray-400 text-sm">{t(example.descriptionKey)}</p>
                </div>
              </CleanCard>
            ))}
          </div>

          {/* Callout */}
          <CleanCard className="bg-emerald-500/5 border-emerald-500/20">
            <div className="text-center">
              <p className="text-lg text-emerald-400 font-semibold mb-2">
                {t("services.callout.title")}
              </p>
              <p className="text-gray-400">
                {t("services.callout.description")}
              </p>
            </div>
          </CleanCard>
        </div>

        {/* Tools We Work With */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{t("services.tools.title")}</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {t("services.tools.description")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <Mail className="w-5 h-5" />, nameKey: "services.tool.email" },
              { icon: <MessageSquare className="w-5 h-5" />, nameKey: "services.tool.whatsapp" },
              { icon: <FileText className="w-5 h-5" />, nameKey: "services.tool.excel" },
              { icon: <Database className="w-5 h-5" />, nameKey: "services.tool.databases" },
              { icon: <Globe className="w-5 h-5" />, nameKey: "services.tool.websites" },
              { icon: <ShoppingCart className="w-5 h-5" />, nameKey: "services.tool.ecommerce" },
              { icon: <Users className="w-5 h-5" />, nameKey: "services.tool.crm" },
              { icon: <Repeat className="w-5 h-5" />, nameKey: "services.tool.apis" },
            ].map((tool, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-emerald-400">{tool.icon}</div>
                <span className="text-sm text-gray-300">{t(tool.nameKey)}</span>
              </div>
            ))}
          </div>

          <CleanCard className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
            <div className="text-center">
              <p className="text-xl font-semibold mb-2">{t("services.tools.final.title")}</p>
              <p className="text-gray-400">
                {t("services.tools.final.description")}
              </p>
            </div>
          </CleanCard>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("services.howItWorks.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                titleKey: "services.howItWorks.step1.title",
                descriptionKey: "services.howItWorks.step1.description",
                color: "green",
              },
              {
                step: "2",
                titleKey: "services.howItWorks.step2.title",
                descriptionKey: "services.howItWorks.step2.description",
                color: "purple",
              },
              {
                step: "3",
                titleKey: "services.howItWorks.step3.title",
                descriptionKey: "services.howItWorks.step3.description",
                color: "blue",
              },
            ].map((step, index) => (
              <CleanCard key={index} color={step.color as any}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-white/10">
                    <span className="text-3xl font-bold text-emerald-400">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                  <p className="text-gray-400">{t(step.descriptionKey)}</p>
                </div>
              </CleanCard>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("services.benefits.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                titleKey: "services.benefit.time.title",
                descriptionKey: "services.benefit.time.description",
                statKey: "services.benefit.time.stat",
              },
              {
                titleKey: "services.benefit.cost.title",
                descriptionKey: "services.benefit.cost.description",
                statKey: "services.benefit.cost.stat",
              },
              {
                titleKey: "services.benefit.scale.title",
                descriptionKey: "services.benefit.scale.description",
                statKey: "services.benefit.scale.stat",
              },
              {
                titleKey: "services.benefit.accuracy.title",
                descriptionKey: "services.benefit.accuracy.description",
                statKey: "services.benefit.accuracy.stat",
              },
            ].map((benefit, index) => (
              <CleanCard key={index} className="bg-gradient-to-br from-white/5 to-transparent">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{t(benefit.titleKey)}</h3>
                    <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-full">
                      {t(benefit.statKey)}
                    </span>
                  </div>
                  <p className="text-gray-400">{t(benefit.descriptionKey)}</p>
                </div>
              </CleanCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <CleanCard className="text-center bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-blue-500/10 border-emerald-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.cta.title")}</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t("services.cta.description")}
          </p>
          <button onClick={() => handleNavigation("/contact")}>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-6">
              {t("services.cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </button>
        </CleanCard>
      </section>
    </main>
  )
}
