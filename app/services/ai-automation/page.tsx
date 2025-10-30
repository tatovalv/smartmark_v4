"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import FeatureIcon from "@/components/feature-icon"
import CleanCard from "@/components/clean-card"

export default function AIAutomationPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  // Translations for benefits
  const benefits = [
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
      title: language === "es" ? "Mayor Eficiencia" : "Greater Efficiency",
      description:
        language === "es"
          ? "Automatiza tareas y flujos de trabajo repetitivos para liberar el tiempo de tu equipo para actividades más estratégicas."
          : "Automate repetitive tasks and workflows to free up your team's time for more strategic activities.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 8V21H3V8M1 3H23V8H1V3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: language === "es" ? "Insights Basados en Datos" : "Data-Driven Insights",
      description:
        language === "es"
          ? "Aprovecha la IA para analizar grandes conjuntos de datos y extraer información procesable para una mejor toma de decisiones."
          : "Leverage AI to analyze large datasets and extract actionable insights for better decision-making.",
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
      title: language === "es" ? "Crecimiento Escalable" : "Scalable Growth",
      description:
        language === "es"
          ? "Escala tus operaciones eficientemente con sistemas de IA que crecen con las necesidades de tu negocio."
          : "Scale your operations efficiently with AI systems that grow with your business needs.",
    },
  ]

  // Translations for services
  const services = [
    {
      title: language === "es" ? "Desarrollo de Flujos de Trabajo IA Personalizados" : "Custom AI Workflow Development",
      description:
        language === "es"
          ? "Diseñamos e implementamos flujos de trabajo de IA personalizados adaptados a las necesidades específicas de tu negocio. Nuestro equipo analiza tus procesos actuales, identifica oportunidades de automatización y desarrolla soluciones impulsadas por IA que optimizan las operaciones."
          : "We design and implement custom AI workflows tailored to your business's specific needs. Our team analyzes your current processes, identifies automation opportunities, and develops AI-driven solutions that optimize operations.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 3L8 7M16 3L16 7M7 11L17 11M7 15L13 15M3 7C3 5.89543 3.89543 5 5 5L19 5C20.1046 5 21 5.89543 21 7L21 19C21 20.1046 20.1046 21 19 21L5 21C3.89543 21 3 20.1046 3 19L3 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: language === "es" ? "Automatización y Optimización de Procesos" : "Process Automation and Optimization",
      description:
        language === "es"
          ? "Transforma procesos manuales y que consumen tiempo en flujos de trabajo eficientes y automatizados. Te ayudamos a identificar cuellos de botella, implementar automatización impulsada por IA y optimizar continuamente para máxima eficiencia."
          : "Transform time-consuming manual processes into efficient, automated workflows. We help you identify bottlenecks, implement AI-driven automation, and continuously optimize for maximum efficiency.",
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
    },
    {
      title: language === "es" ? "Integración de IA con Sistemas Existentes" : "AI Integration with Existing Systems",
      description:
        language === "es"
          ? "Integra perfectamente capacidades de IA con tus sistemas y software empresariales existentes. Nuestras soluciones funcionan con tu stack tecnológico actual para mejorar la funcionalidad sin interrumpir las operaciones."
          : "Seamlessly integrate AI capabilities with your existing business systems and software. Our solutions work with your current technology stack to enhance functionality without disrupting operations.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 8V21H3V8M1 3H23V8H1V3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="mb-4">
            <FeatureIcon
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V16M8 12H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              color="green"
              size="lg"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "es" ? "Automatización con IA" : "AI Automation"}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            {language === "es"
              ? "Revoluciona las operaciones de tu negocio con nuestras soluciones de automatización con IA de vanguardia. Te ayudamos a identificar, implementar y optimizar flujos de trabajo impulsados por IA que ahorran tiempo, reducen costos y aumentan la productividad."
              : "Revolutionize your business operations with our cutting-edge AI automation solutions. We help you identify, implement, and optimize AI-driven workflows that save time, reduce costs, and increase productivity."}
          </p>
        </div>

        {/* AI Automation Benefits */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            {language === "es" ? "¿Por qué elegir Automatización con IA?" : "Why Choose AI Automation?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((item, index) => (
              <CleanCard key={index}>
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-4">
                    <FeatureIcon icon={item.icon} color="green" size="sm" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-400 text-center">{item.description}</p>
                </div>
              </CleanCard>
            ))}
          </div>
        </div>

        {/* AI Services */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            {language === "es" ? "Nuestros Servicios de Automatización con IA" : "Our AI Automation Services"}
          </h2>
          <div className="space-y-8">
            {services.map((service, index) => (
              <CleanCard key={index} className="bg-black">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/6 flex justify-center">
                    <FeatureIcon icon={service.icon} color="green" size="md" />
                  </div>
                  <div className="md:w-5/6">
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </div>
              </CleanCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <CleanCard className="text-center bg-black">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === "es"
              ? "¿Listo para Transformar tu Negocio con IA?"
              : "Ready to Transform Your Business with AI?"}
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {language === "es"
              ? "Contáctanos hoy para discutir cómo nuestras soluciones de automatización con IA pueden ayudar a tu negocio a prosperar en la era digital."
              : "Contact us today to discuss how our AI automation solutions can help your business thrive in the digital age."}
          </p>
          <button onClick={() => handleNavigation("/contact")}>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              {language === "es" ? "Comenzar" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </button>
        </CleanCard>
      </section>
    </main>
  )
}
