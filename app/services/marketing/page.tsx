"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import FeatureIcon from "@/components/feature-icon"

export default function MarketingPage() {
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
          <div className="mb-4">
            <FeatureIcon
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              color="purple"
              size="lg"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Planes de Marketing con IA</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Recibe planes de marketing estratégicos personalizados, generados por IA y refinados por expertos, listos
            para que los implementes en tu negocio y maximices tus resultados.
          </p>
        </div>

        {/* Cómo funcionan nuestros planes */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400">Cómo Funcionan Nuestros Planes</h2>
          <div className="bg-zinc-900 p-8 rounded-xl border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-purple-400">1. Solicitud</h3>
                <p className="text-gray-400">
                  Completa un breve formulario inicial para solicitar el plan que necesitas.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M9 17L15 17M9 12L15 12M9 7L15 7M5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-purple-400">2. Cuestionario</h3>
                <p className="text-gray-400">
                  Recibe un cuestionario personalizado para entender tus necesidades específicas.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-purple-400">3. Consulta</h3>
                <p className="text-gray-400">
                  Resolvemos cualquier duda adicional para asegurar que entendemos tus objetivos.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-purple-400">4. Entrega</h3>
                <p className="text-gray-400">
                  Recibe tu plan de marketing completo, listo para que lo implementes en tu negocio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Services */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400">Nuestros Planes de Marketing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-yellow-500/20 bg-black h-full flex flex-col">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/logos/logo-webimpact.png"
                  alt="Web Impact Logo"
                  width={200}
                  height={100}
                  className="h-16 w-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-yellow-400">Plan de Marketing Digital</h3>
              <p className="text-gray-400 mb-6 flex-grow text-center">
                Recibe un plan estratégico de marketing digital personalizado para mejorar tu presencia online, atraer
                tráfico y convertir visitantes en clientes.
              </p>
              <div className="flex justify-center">
                <button onClick={() => handleNavigation("/services/marketing/web-impact")}>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Ver Detalles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-red-500/20 bg-black h-full flex flex-col">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/logos/logo-socialboost.png"
                  alt="Social Boost Logo"
                  width={200}
                  height={100}
                  className="h-16 w-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-red-400">Plan de Redes Sociales</h3>
              <p className="text-gray-400 mb-6 flex-grow text-center">
                Obtén un plan estratégico de redes sociales personalizado para construir reconocimiento de marca,
                fomentar comunidad y generar interacción significativa.
              </p>
              <div className="flex justify-center">
                <button onClick={() => handleNavigation("/services/marketing/social-boost")}>
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    Ver Detalles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-purple-500/20 bg-black h-full flex flex-col">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/logos/logo-onpoint.png"
                  alt="OnPoint Logo"
                  width={200}
                  height={100}
                  className="h-16 w-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-purple-400">Plan de Marketing BTL</h3>
              <p className="text-gray-400 mb-6 flex-grow text-center">
                Recibe un plan estratégico de marketing below-the-line personalizado para crear experiencias memorables
                de marca y fomentar la interacción directa con el consumidor.
              </p>
              <div className="flex justify-center">
                <button onClick={() => handleNavigation("/services/marketing/onpoint")}>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    Ver Detalles <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios de nuestros planes */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400">Beneficios de Nuestros Planes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
              <div className="flex justify-center mb-6">
                <FeatureIcon
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 10.9104 4.16968 9.91153 4.45962 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V12L14 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  color="purple"
                  size="md"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Personalización Avanzada</h3>
              <p className="text-gray-400 mb-4">
                Cada plan está completamente personalizado para tu negocio, industria, audiencia y objetivos
                específicos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-purple-400">
                    <ArrowRight size={16} />
                  </div>
                  <span>Análisis detallado de tu negocio y competencia</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-purple-400">
                    <ArrowRight size={16} />
                  </div>
                  <span>Estrategias adaptadas a tu presupuesto y recursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-purple-400">
                    <ArrowRight size={16} />
                  </div>
                  <span>Recomendaciones específicas para tu industria</span>
                </li>
              </ul>
            </div>
            <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
              <div className="flex justify-center mb-6">
                <FeatureIcon
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 17L15 17M9 12L15 12M9 7L15 7M5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  color="pink"
                  size="md"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Listo para Implementar</h3>
              <p className="text-gray-400 mb-4">
                Recibes un plan completo y detallado con todos los pasos necesarios para implementarlo por tu cuenta.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-purple-400">
                    <ArrowRight size={16} />
                  </div>
                  <span>Guías paso a paso para cada acción</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-purple-400">
                    <ArrowRight size={16} />
                  </div>
                  <span>Plantillas y ejemplos listos para usar</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-purple-400">
                    <ArrowRight size={16} />
                  </div>
                  <span>Métricas de éxito y métodos de seguimiento</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/30 to-black p-8 rounded-2xl border border-purple-500/20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-400">
            ¿Listo para elevar tu estrategia de marketing?
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Solicita hoy tu plan de marketing personalizado y recibe una estrategia completa que podrás implementar para
            transformar tu negocio.
          </p>
          <button onClick={() => handleNavigation("/contact")}>
            <Button className="bg-purple-500 hover:bg-purple-600">
              Solicitar Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </button>
        </div>
      </section>
    </main>
  )
}
