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
            <span className="text-emerald-400 text-sm font-medium">Nuestro único servicio</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Automatización de Procesos de Negocio</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Nos especializamos en una sola cosa: automatizar cualquier proceso de tu negocio que involucre una
            computadora o software.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mb-20">
          <CleanCard className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Un solo servicio, infinitas posibilidades</h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                No ofrecemos múltiples servicios porque creemos en la especialización. Somos expertos en automatización
                de procesos, y eso significa que podemos automatizar{" "}
                <span className="text-emerald-400 font-semibold">cualquier cosa</span> que hagas en una computadora.
              </p>
            </div>
          </CleanCard>
        </div>

        {/* Examples Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ejemplos de procesos que automatizamos</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Estos son solo algunos ejemplos. Si lo haces en una computadora, lo podemos automatizar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Emails automáticos",
                description: "Respuestas, seguimientos y notificaciones sin intervención manual",
                color: "blue",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Procesamiento de documentos",
                description: "Facturas, contratos, reportes generados y enviados automáticamente",
                color: "green",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Atención al cliente",
                description: "Respuestas instantáneas por WhatsApp, chat o redes sociales",
                color: "purple",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Gestión de citas",
                description: "Agendamiento, recordatorios y confirmaciones automáticas",
                color: "pink",
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: "Entrada de datos",
                description: "Captura y organización de información sin errores humanos",
                color: "blue",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Reportes y análisis",
                description: "Dashboards actualizados en tiempo real con tus datos",
                color: "green",
              },
            ].map((example, index) => (
              <CleanCard key={index} color={example.color as any}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <FeatureIcon icon={example.icon} color={example.color} size="sm" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{example.title}</h3>
                  <p className="text-gray-400 text-sm">{example.description}</p>
                </div>
              </CleanCard>
            ))}
          </div>

          {/* Callout */}
          <CleanCard className="bg-emerald-500/5 border-emerald-500/20">
            <div className="text-center">
              <p className="text-lg text-emerald-400 font-semibold mb-2">
                Estos son solo ejemplos - automatizamos miles de procesos diferentes
              </p>
              <p className="text-gray-400">
                Si tu proceso no está aquí, no te preocupes. Si lo haces en una computadora, lo podemos automatizar.
              </p>
            </div>
          </CleanCard>
        </div>

        {/* Tools We Work With */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Trabajamos con cualquier herramienta</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            No importa qué software uses, podemos conectarlo y automatizarlo
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <Mail className="w-5 h-5" />, name: "Email (Gmail, Outlook, etc.)" },
              { icon: <MessageSquare className="w-5 h-5" />, name: "WhatsApp Business" },
              { icon: <FileText className="w-5 h-5" />, name: "Excel y Google Sheets" },
              { icon: <Database className="w-5 h-5" />, name: "Bases de datos" },
              { icon: <Globe className="w-5 h-5" />, name: "Sitios web y formularios" },
              { icon: <ShoppingCart className="w-5 h-5" />, name: "E-commerce" },
              { icon: <Users className="w-5 h-5" />, name: "CRM y ERP" },
              { icon: <Repeat className="w-5 h-5" />, name: "APIs y sistemas personalizados" },
            ].map((tool, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-emerald-400">{tool.icon}</div>
                <span className="text-sm text-gray-300">{tool.name}</span>
              </div>
            ))}
          </div>

          <CleanCard className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
            <div className="text-center">
              <p className="text-xl font-semibold mb-2">Si lo haces en una computadora, lo podemos automatizar</p>
              <p className="text-gray-400">
                No importa si usas software especializado, herramientas personalizadas o sistemas legacy. Encontramos la
                forma de automatizarlo.
              </p>
            </div>
          </CleanCard>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Analizamos tu proceso",
                description:
                  "Entendemos exactamente qué haces, cuánto tiempo toma y dónde están los cuellos de botella",
                color: "green",
              },
              {
                step: "2",
                title: "Diseñamos la automatización",
                description: "Creamos un flujo automatizado que replica (y mejora) tu proceso actual",
                color: "purple",
              },
              {
                step: "3",
                title: "Implementamos y optimizamos",
                description: "Ponemos todo en marcha y ajustamos hasta que funcione perfectamente",
                color: "blue",
              },
            ].map((step, index) => (
              <CleanCard key={index} color={step.color as any}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-white/10">
                    <span className="text-3xl font-bold text-emerald-400">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </CleanCard>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Qué ganas con la automatización</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Ahorra tiempo valioso",
                description: "Recupera horas cada semana que puedes dedicar a hacer crecer tu negocio",
                stat: "Hasta 20 horas/semana",
              },
              {
                title: "Reduce costos operativos",
                description: "Menos errores, menos trabajo manual, más eficiencia en cada proceso",
                stat: "30-50% menos costos",
              },
              {
                title: "Escala sin contratar",
                description: "Crece tu negocio sin necesidad de aumentar tu equipo proporcionalmente",
                stat: "10x más capacidad",
              },
              {
                title: "Elimina errores humanos",
                description: "Los procesos automatizados son consistentes y precisos cada vez",
                stat: "99.9% precisión",
              },
            ].map((benefit, index) => (
              <CleanCard key={index} className="bg-gradient-to-br from-white/5 to-transparent">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                    <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-full">
                      {benefit.stat}
                    </span>
                  </div>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </CleanCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <CleanCard className="text-center bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-blue-500/10 border-emerald-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para automatizar tu negocio?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Cuéntanos qué procesos te quitan más tiempo y te mostraremos cómo automatizarlos
          </p>
          <button onClick={() => handleNavigation("/contact")}>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-6">
              Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </button>
        </CleanCard>
      </section>
    </main>
  )
}
