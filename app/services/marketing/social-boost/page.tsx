"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, MessageSquare, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SocialBoostPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  // Traducciones para las plataformas
  const platforms = [
    {
      name: language === "es" ? "Instagram" : "Instagram",
      description:
        language === "es"
          ? "Estrategias visuales impactantes para capturar la atención y generar engagement. Incluye recomendaciones para feed, Stories, Reels y hashtags optimizados."
          : "Impactful visual strategies to capture attention and generate engagement. Includes recommendations for feed, Stories, Reels, and optimized hashtags.",
      features:
        language === "es"
          ? [
              "Guía de estética visual y filtros recomendados",
              "Estrategias de hashtags personalizadas",
              "Ideas para Stories y Reels de alto impacto",
              "Tácticas para aumentar seguidores orgánicamente",
            ]
          : [
              "Visual aesthetic guide and recommended filters",
              "Customized hashtag strategies",
              "Ideas for high-impact Stories and Reels",
              "Tactics to increase followers organically",
            ],
    },
    {
      name: language === "es" ? "Facebook" : "Facebook",
      description:
        language === "es"
          ? "Estrategias completas para Facebook que incluyen contenido orgánico y recomendaciones para publicidad pagada, optimizadas para maximizar el alcance y engagement."
          : "Comprehensive Facebook strategies that include organic content and recommendations for paid advertising, optimized to maximize reach and engagement.",
      features:
        language === "es"
          ? [
              "Plan de contenido para publicaciones orgánicas",
              "Estructura recomendada para campañas publicitarias",
              "Estrategias para grupos y comunidades",
              "Tácticas para aumentar la interacción",
            ]
          : [
              "Content plan for organic posts",
              "Recommended structure for advertising campaigns",
              "Strategies for groups and communities",
              "Tactics to increase interaction",
            ],
    },
    {
      name: language === "es" ? "LinkedIn" : "LinkedIn",
      description:
        language === "es"
          ? "Estrategias para posicionar a tu empresa como líder de pensamiento en LinkedIn con contenido profesional que resuena con audiencias B2B."
          : "Strategies to position your company as a thought leader on LinkedIn with professional content that resonates with B2B audiences.",
      features:
        language === "es"
          ? [
              "Plan de contenido profesional de alto valor",
              "Estrategias de networking B2B",
              "Guía de optimización de perfiles corporativos",
              "Tácticas para generación de leads",
            ]
          : [
              "High-value professional content plan",
              "B2B networking strategies",
              "Corporate profile optimization guide",
              "Lead generation tactics",
            ],
    },
    {
      name: language === "es" ? "TikTok" : "TikTok",
      description:
        language === "es"
          ? "Estrategias para crear contenido viral y auténtico para TikTok que conecta con audiencias más jóvenes, aprovechando tendencias emergentes."
          : "Strategies to create viral and authentic content for TikTok that connects with younger audiences, leveraging emerging trends.",
      features:
        language === "es"
          ? [
              "Ideas de contenido adaptadas a tendencias",
              "Guía para hashtag challenges",
              "Recomendaciones para colaboraciones con creadores",
              "Tácticas para aumentar seguidores rápidamente",
            ]
          : [
              "Content ideas adapted to trends",
              "Guide for hashtag challenges",
              "Recommendations for creator collaborations",
              "Tactics to quickly increase followers",
            ],
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex flex-col items-center mb-8">
            <div className="w-full max-w-[200px] h-16 relative mb-6">
              <Image src="/logos/logo-socialboost.png" alt="Social Boost Logo" fill className="object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-red-400">
              {t("socialboost.plan.title")}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl text-center">{t("socialboost.plan.description")}</p>
          </div>
        </div>

        {/* Proceso de Servicio */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400">{t("socialboost.plan.how.title")}</h2>
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
                className="bg-zinc-900 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <div className="text-white">{step.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-red-400">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Boost Benefits */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400">{t("socialboost.benefits.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: t("socialboost.plan.benefits.content.title"),
                description: t("socialboost.plan.benefits.content.description"),
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: t("socialboost.plan.benefits.calendar.title"),
                description: t("socialboost.plan.benefits.calendar.description"),
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
                title: t("socialboost.plan.benefits.growth.title"),
                description: t("socialboost.plan.benefits.growth.description"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center">
                    <div className="text-white">{item.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-red-400">{item.title}</h3>
                <p className="text-gray-400 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plataformas */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400">{t("socialboost.platforms.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-black p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-400">{platform.name}</h3>
                <p className="text-gray-400 mb-6">{platform.description}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-1 text-red-400">
                        <ArrowRight size={16} />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Lo que incluye el plan */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400">{t("socialboost.plan.includes.title")}</h2>
          <div className="bg-black p-8 rounded-2xl border border-red-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-400">{t("socialboost.plan.includes.analysis.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.analysis.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.analysis.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.analysis.item3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.analysis.item4")}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-400">{t("socialboost.plan.includes.action.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.action.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.action.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.action.item3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("socialboost.plan.includes.action.item4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-red-900/30 to-black p-8 rounded-2xl border border-red-500/20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-400">{t("socialboost.plan.cta.title")}</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{t("socialboost.plan.cta.description")}</p>
          <button onClick={() => handleNavigation("/contact")}>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              {t("marketing.plans.request")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </button>
        </div>
      </section>
    </main>
  )
}
