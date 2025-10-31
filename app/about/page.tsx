"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Heart, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import CleanCard from "@/components/clean-card"

export default function AboutPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2">
              <span className="text-emerald-400 font-medium">{t("about.badge")}</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            {t("about.hero.title.line1")}{" "}
            <span className="text-emerald-400">{t("about.hero.title.line2")}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto text-balance">
            {t("about.hero.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div className="order-2 md:order-1">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/business-owner-frustrated-with-repetitive-manual-t.jpg"
                alt="Personas trabajando en tareas repetitivas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-medium">{t("about.why.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              {t("about.why.title")}
            </h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              {t("about.why.description1")}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("about.why.description2")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{t("about.belief.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">{t("about.belief.title")}</h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              {t("about.belief.description1")}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              {t("about.belief.description2")}
            </p>
          </div>
          <div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/small-business-owner-using-modern-technology-and-a.jpg"
                alt="Tecnología moderna de automatización"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div className="order-2 md:order-1">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/diverse-business-owners-working-in-different-indus.jpg"
                alt="Diversos negocios trabajando juntos"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">{t("about.help.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">{t("about.help.title")}</h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              {t("about.help.description1")}
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {t("about.help.description2")}
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold mb-1">{t("about.help.feature1.title")}</p>
                  <p className="text-gray-400 text-sm">
                    {t("about.help.feature1.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold mb-1">{t("about.help.feature2.title")}</p>
                  <p className="text-gray-400 text-sm">
                    {t("about.help.feature2.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold mb-1">{t("about.help.feature3.title")}</p>
                  <p className="text-gray-400 text-sm">
                    {t("about.help.feature3.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CleanCard className="mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium">{t("about.who.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("about.who.title")}</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {t("about.who.description")}
            </p>
            <div className="flex justify-center mb-8">
              <div className="bg-zinc-900 rounded-xl p-8 inline-block">
                <Image src="/logo.png" alt="SmartMark Consultores" width={300} height={100} className="w-auto h-auto" />
              </div>
            </div>
            <p className="text-gray-400 italic">
              "{t("about.who.quote")}"
            </p>
          </div>
        </CleanCard>

        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">{t("about.cta.title")}</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("about.cta.description")}
          </p>
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-6"
            onClick={() => handleNavigation("/contact")}
          >
            {t("about.cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  )
}
