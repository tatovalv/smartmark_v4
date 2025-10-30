"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, DollarSign, TrendingUp, CheckCircle2, Users, Repeat, Zap, ArrowDown, Utensils, Store, Stethoscope, Building2, Wrench, Package, Megaphone, Factory } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section - Visual workflow */}
      <section className="relative min-h-[110vh] md:min-h-[120vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-12 md:pb-16">
        {/* Animated grid background */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Repeat className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">{t("home.badge")}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight">
              <span className="block text-white">{t("home.hero.line1")}</span>
              <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                 {t("home.hero.line3")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("home.hero.desc1")}
              <br />
              {t("home.hero.desc2")}
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="glass rounded-3xl p-8 md:p-12">
              {/* Workflow visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Before - Manual */}
                <div className="relative">
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-medium">
                      {t("home.workflow.before")}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {t("home.workflow.steps")
                      .split("|")
                      .map(
                      (step, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-red-500/20"
                        >
                          <Users className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{step}</span>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-red-400 font-semibold">2-3 horas diarias</p>
                    <p className="text-xs text-gray-500">Trabajo manual</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <ArrowRight className="w-12 h-12 text-emerald-400" />
                    <div className="text-center">
                      <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-emerald-400">{t("home.workflow.automate")}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile arrow */}
                <div className="md:hidden flex justify-center py-4">
                  <div className="flex flex-col items-center gap-2">
                    <ArrowDown className="w-8 h-8 text-emerald-400" />
                    <div className="flex items-center gap-2">
                      <Zap className="w-6 h-6 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">Automatizamos</p>
                    </div>
                  </div>
                </div>

                {/* After - Automated */}
                <div className="relative">
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                      {t("home.workflow.after")}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30">
                      <Repeat className="w-8 h-8 text-emerald-400 mb-3 mx-auto" />
                      <p className="text-center text-white font-semibold mb-2">{t("home.workflow.system")}</p>
                      <p className="text-xs text-center text-gray-400">{t("home.workflow.auto")}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-emerald-400 font-semibold">{t("home.workflow.time")}</p>
                    <p className="text-xs text-gray-500">{t("home.workflow.fullAuto")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => handleNavigation("/contact")}
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold transition-all hover:scale-105"
            >
              {t("home.cta.primary")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                {t("home.processes.title")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              {t("home.processes.subtitle")}
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-emerald-500/30">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">{t("home.processes.callout")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                image: "/person-manually-entering-data-into-spreadsheet.jpg",
                title: t("home.proc1.title"),
                description: t("home.proc1.desc"),
                process: t("home.proc1.process"),
              },
              {
                image: "/customer-service-chat-messages-on-phone.jpg",
                title: t("home.proc2.title"),
                description: t("home.proc2.desc"),
                process: t("home.proc2.process"),
              },
              {
                image: "/business-documents-and-invoices-being-processed.jpg",
                title: t("home.proc3.title"),
                description: t("home.proc3.desc"),
                process: t("home.proc3.process"),
              },
              {
                image: "/email-inbox-with-automated-responses.jpg",
                title: t("home.proc4.title"),
                description: t("home.proc4.desc"),
                process: t("home.proc4.process"),
              },
              {
                image: "/calendar-with-appointments-and-reminders.jpg",
                title: t("home.proc5.title"),
                description: t("home.proc5.desc"),
                process: t("home.proc5.process"),
              },
              {
                image: "/business-analytics-dashboard.png",
                title: t("home.proc6.title"),
                description: t("home.proc6.desc"),
                process: t("home.proc6.process"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{item.description}</p>

                  {/* Process flow */}
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/5 p-3 rounded-lg">
                    <Repeat className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.process}</span>
                  </div>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl border border-emerald-500/0 group-hover:border-emerald-500/50 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("home.benefits.title")}</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t("home.benefits.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-12 h-12" />,
                title: t("home.benefit.time"),
                stat: `${t("home.benefit.upto")} 80%`,
                description: t("home.benefit.time.desc"),
              },
              {
                icon: <DollarSign className="w-12 h-12" />,
                title: t("home.benefit.cost"),
                stat: `${t("home.benefit.upto")} 60%`,
                description: t("home.benefit.cost.desc"),
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: t("home.benefit.grow"),
                stat: "3x",
                description: t("home.benefit.grow.desc"),
              },
            ].map((benefit, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 mb-6">
                  {benefit.icon}
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-4">
                  {benefit.stat}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("home.how.title")}</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t("home.how.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                number: "1",
                title: t("home.how.step1.title"),
                description: t("home.how.step1.desc"),
                icon: <Users className="w-12 h-12" />,
              },
              {
                number: "2",
                title: t("home.how.step2.title"),
                description: t("home.how.step2.desc"),
                icon: <CheckCircle2 className="w-12 h-12" />,
              },
              {
                number: "3",
                title: t("home.how.step3.title"),
                description: t("home.how.step3.desc"),
                icon: <Repeat className="w-12 h-12" />,
              },
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Number background */}
                <div className="text-9xl font-bold text-emerald-500/5 absolute top-0 left-1/2 -translate-x-1/2 -z-10">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glass text-emerald-400 mb-6">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("home.understand.title")}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t("home.understand.subtitle")}</p>
          </div>

          {/* Visual story timeline */}
          <div className="space-y-16">
            {/* Story 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="glass rounded-2xl p-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-emerald-400">1</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{t("home.story1.title")}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{t("home.story1.desc")}</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative h-80 rounded-2xl overflow-hidden glass">
                  <Image
                    src="/diverse-business-owners-working-in-different-indus.jpg"
                    alt="Diferentes tipos de negocios"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="relative h-80 rounded-2xl overflow-hidden glass">
                  <Image
                    src="/business-owner-frustrated-with-repetitive-manual-t.jpg"
                    alt="Tareas repetitivas"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-2">
                <div className="glass rounded-2xl p-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-emerald-400">2</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{t("home.story2.title")}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{t("home.story2.desc")}</p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="glass rounded-2xl p-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-emerald-400">3</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white">{t("home.story3.title")}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{t("home.story3.desc")}</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative h-80 rounded-2xl overflow-hidden glass">
                  <Image
                    src="/small-business-owner-using-modern-technology-and-a.jpg"
                    alt="Automatización accesible"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Final message */}
            <div className="glass rounded-3xl p-12 text-center">
              <Zap className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t("about.cta.title")}</h3>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">{t("about.cta.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business types section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("home.types.title")}</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t("home.types.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {(() => {
              const items = t("home.types.items").split("|")
              const icons = [Utensils, Store, Stethoscope, Building2, Wrench, Package, Megaphone, Factory]
              return items.map((business, index) => {
                const Icon = icons[index] || CheckCircle2
                return (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <span className="text-lg font-medium text-white">{business}</span>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      </section>

      {/* Final CTA section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-balance">
            {t("home.final.title1")}
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              {t("home.final.title2")}
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("home.final.desc1")}
            <br />
            {t("home.final.desc2")}
          </p>

          <Button
            onClick={() => handleNavigation("/contact")}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold transition-all hover:scale-105"
          >
            {t("home.final.cta")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </main>
  )
}
