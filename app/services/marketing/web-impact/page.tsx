"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, MessageSquare, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function WebImpactPage() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex flex-col items-center mb-8">
            <div className="w-full max-w-[200px] h-16 relative mb-6">
              <Image src="/logos/logo-webimpact.png" alt="Web Impact Logo" fill className="object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-yellow-400">
              {t("webimpact.plan.title")}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl text-center">{t("webimpact.plan.description")}</p>
          </div>
        </div>

        {/* Proceso de Servicio */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-yellow-400">{t("webimpact.plan.how.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: t("webimpact.plan.step.request"),
                description: t("webimpact.plan.step.request.description"),
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: t("webimpact.plan.step.questionnaire"),
                description: t("webimpact.plan.step.questionnaire.description"),
              },
              {
                icon: <ArrowRight className="w-8 h-8" />,
                title: t("webimpact.plan.step.consultation"),
                description: t("webimpact.plan.step.consultation.description"),
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: t("webimpact.plan.step.delivery"),
                description: t("webimpact.plan.step.delivery.description"),
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <div className="text-black">{step.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-yellow-400">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Web Impact Benefits */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-yellow-400">{t("webimpact.benefits.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: t("webimpact.plan.benefits.seo.title"),
                description: t("webimpact.plan.benefits.seo.description"),
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 19C4.58172 19 1 15.4183 1 11C1 6.58172 4.58172 3 9 3C13.4183 3 17 6.58172 17 11C17 12.5 16.5 14 15.5 15L23 23L19 19H9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 7V11L12 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: t("webimpact.plan.benefits.content.title"),
                description: t("webimpact.plan.benefits.content.description"),
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: t("webimpact.plan.benefits.conversion.title"),
                description: t("webimpact.plan.benefits.conversion.description"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center">
                    <div className="text-black">{item.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-yellow-400">{item.title}</h3>
                <p className="text-gray-400 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lo que incluye el plan */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-yellow-400">{t("webimpact.plan.includes.title")}</h2>
          <div className="bg-black p-8 rounded-2xl border border-yellow-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  {t("webimpact.plan.includes.analysis.title")}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.analysis.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.analysis.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.analysis.item3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.analysis.item4")}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">{t("webimpact.plan.includes.action.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.action.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.action.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.action.item3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("webimpact.plan.includes.action.item4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-yellow-900/30 to-black p-8 rounded-2xl border border-yellow-500/20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">{t("webimpact.plan.cta.title")}</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{t("webimpact.plan.cta.description")}</p>
          <button onClick={() => handleNavigation("/contact")}>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              {t("marketing.plans.request")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </button>
        </div>
      </section>
    </main>
  )
}
