"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, MessageSquare, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function OnPointPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  // Traducciones para los tipos de activaciones
  const activations = [
    {
      name: language === "es" ? "Eventos Corporativos" : "Corporate Events",
      description:
        language === "es"
          ? "Recibe un plan detallado para eventos corporativos memorables que reflejan los valores de tu marca y crean conexiones significativas con clientes, socios y empleados."
          : "Receive a detailed plan for memorable corporate events that reflect your brand values and create meaningful connections with customers, partners, and employees.",
      features:
        language === "es"
          ? [
              "Ideas creativas para lanzamientos de productos",
              "Conceptos para conferencias y seminarios interactivos",
              "Estrategias para eventos de networking efectivos",
              "Guías para celebraciones corporativas personalizadas",
            ]
          : [
              "Creative ideas for product launches",
              "Concepts for interactive conferences and seminars",
              "Strategies for effective networking events",
              "Guides for customized corporate celebrations",
            ],
    },
    {
      name: language === "es" ? "Activaciones en Punto de Venta" : "Point of Sale Activations",
      description:
        language === "es"
          ? "Obtén estrategias para crear experiencias inmersivas en puntos de venta que capturan la atención, generan interacción y aumentan las conversiones."
          : "Get strategies to create immersive experiences at points of sale that capture attention, generate interaction, and increase conversions.",
      features:
        language === "es"
          ? [
              "Ideas para demostraciones interactivas de productos",
              "Conceptos para experiencias sensoriales de marca",
              "Estrategias para promociones exclusivas en tienda",
              "Tácticas de sampling estratégico efectivo",
            ]
          : [
              "Ideas for interactive product demonstrations",
              "Concepts for sensory brand experiences",
              "Strategies for exclusive in-store promotions",
              "Effective strategic sampling tactics",
            ],
    },
    {
      name: language === "es" ? "Experiencias Pop-Up" : "Pop-Up Experiences",
      description:
        language === "es"
          ? "Recibe planes para desarrollar tiendas y experiencias pop-up innovadoras que generan expectación, crean buzz y ofrecen a los consumidores una forma única de interactuar con tu marca."
          : "Receive plans to develop innovative pop-up stores and experiences that generate anticipation, create buzz, and offer consumers a unique way to interact with your brand.",
      features:
        language === "es"
          ? [
              "Conceptos para tiendas conceptuales temporales",
              "Ideas para instalaciones artísticas de marca",
              "Estrategias para experiencias inmersivas temáticas",
              "Tácticas para colaboraciones exclusivas",
            ]
          : [
              "Concepts for temporary concept stores",
              "Ideas for brand artistic installations",
              "Strategies for thematic immersive experiences",
              "Tactics for exclusive collaborations",
            ],
    },
    {
      name: language === "es" ? "Activaciones de Guerrilla" : "Guerrilla Activations",
      description:
        language === "es"
          ? "Obtén ideas para campañas de marketing de guerrilla creativas y de alto impacto que sorprenden, entretienen y generan conversación en torno a tu marca."
          : "Get ideas for creative and high-impact guerrilla marketing campaigns that surprise, entertain, and generate conversation around your brand.",
      features:
        language === "es"
          ? [
              "Conceptos para intervenciones urbanas estratégicas",
              "Ideas para instalaciones interactivas en espacios públicos",
              "Estrategias para flash mobs y performances",
              "Tácticas para crear experiencias inesperadas de marca",
            ]
          : [
              "Concepts for strategic urban interventions",
              "Ideas for interactive installations in public spaces",
              "Strategies for flash mobs and performances",
              "Tactics to create unexpected brand experiences",
            ],
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex flex-col items-center mb-8">
            <div className="w-full max-w-[200px] h-16 relative mb-6">
              <Image src="/logos/logo-onpoint.png" alt="OnPoint Logo" fill className="object-contain" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-purple-400">
              {t("onpoint.plan.title")}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl text-center">{t("onpoint.plan.description")}</p>
          </div>
        </div>

        {/* Proceso de Servicio */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400">{t("onpoint.plan.how.title")}</h2>
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
                className="bg-zinc-900 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <div className="text-white">{step.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-purple-400">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OnPoint Benefits */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400">{t("onpoint.benefits.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.4 15C19.1277 15.8031 18.9397 16.1945 18.6889 16.4715C18.4292 16.7623 18.2001 16.9098 17.9261 17.0572C17.6621 17.1992 17.3492 17.2866 16.7235 17.4615L15.5 17.7692L16.7235 18.0769C17.3492 18.2518 17.6621 18.3392 17.9261 18.4812C18.2001 18.6286 18.4292 18.7761 18.6889 19.0669C18.9397 19.3439 19.1277 19.7353 19.4 20.5385L19.7077 21.7615L20.0154 20.5385C20.2877 19.7353 20.4757 19.3439 20.7265 19.0669C20.9862 18.7761 21.2153 18.6286 21.4893 18.4812C21.7533 18.3392 22.0662 18.2518 22.6919 18.0769L23.9154 17.7692L22.6919 17.4615C22.0662 17.2866 21.7533 17.1992 21.4893 17.0572C21.2153 16.9098 20.9862 16.7623 20.7265 16.4715C20.4757 16.1945 20.2877 15.8031 20.0154 15L19.7077 13.7769L19.4 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
                title: t("onpoint.plan.benefits.experiences.title"),
                description: t("onpoint.plan.benefits.experiences.description"),
              },
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
                title: t("onpoint.plan.benefits.interaction.title"),
                description: t("onpoint.plan.benefits.interaction.description"),
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
                title: t("onpoint.plan.benefits.measurement.title"),
                description: t("onpoint.plan.benefits.measurement.description"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center">
                    <div className="text-white">{item.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-purple-400">{item.title}</h3>
                <p className="text-gray-400 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Activaciones */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400">{t("onpoint.plan.activations.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activations.map((activation, index) => (
              <div
                key={index}
                className="bg-black p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">{activation.name}</h3>
                <p className="text-gray-400 mb-6">{activation.description}</p>
                <ul className="space-y-2">
                  {activation.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-1 text-purple-400">
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
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400">{t("onpoint.plan.includes.title")}</h2>
          <div className="bg-black p-8 rounded-2xl border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-400">{t("onpoint.plan.includes.analysis.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.analysis.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.analysis.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.analysis.item3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.analysis.item4")}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-400">{t("onpoint.plan.includes.action.title")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.action.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.action.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.action.item3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-purple-400">
                      <ArrowRight size={16} />
                    </div>
                    <span className="text-gray-300">{t("onpoint.plan.includes.action.item4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/30 to-black p-8 rounded-2xl border border-purple-500/20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-400">{t("onpoint.plan.cta.title")}</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{t("onpoint.plan.cta.description")}</p>
          <button onClick={() => handleNavigation("/contact")}>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              {t("marketing.plans.request")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </button>
        </div>
      </section>
    </main>
  )
}
