"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Repeat,
  Zap,
  CheckCircle2,
  Mail,
  FileText,
  MessageSquare,
  Calendar,
  ShoppingCart,
  BarChart3,
  Database,
  Users,
  Clock,
  DollarSign,
} from "lucide-react"

export default function ServiciosPage() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Repeat className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Nuestro único servicio</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-balance leading-tight">
            <span className="block bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Automatización de procesos
            </span>
            <span className="block text-white">para tu negocio</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Nos especializamos en una sola cosa: automatizar cualquier proceso digital de tu negocio.
          </p>
        </div>
      </section>

      {/* Main value proposition */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center">
            <Zap className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Un solo servicio, infinitas posibilidades
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              No ofrecemos múltiples servicios. Nos enfocamos exclusivamente en automatizar procesos de negocio. Cada
              empresa es diferente, pero todas tienen procesos que se repiten. Nuestra especialidad es entender
              exactamente cómo funciona tu negocio y automatizar esos procesos, sin importar qué tan específicos o
              complejos sean.
            </p>
          </div>
        </div>
      </section>

      {/* Examples section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ejemplos de automatizaciones</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Estos son algunos de los procesos más comunes que automatizamos, pero no son los únicos.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-emerald-500/30">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">
                Automatizamos miles de procesos diferentes - estos son solo ejemplos
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Gestión de pedidos",
                description:
                  "Desde que llega el pedido hasta la entrega: confirmaciones, facturas, inventario, envío y seguimiento.",
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Atención al cliente",
                description:
                  "Respuestas automáticas, seguimiento de casos, escalamiento inteligente. En WhatsApp, email o redes.",
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Procesamiento de documentos",
                description:
                  "Facturas, contratos, órdenes de compra. Extracción de datos, registro y archivo automático.",
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Gestión de emails",
                description:
                  "Clasificación, respuestas automáticas, seguimientos, recordatorios y notificaciones inteligentes.",
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Coordinación de citas",
                description: "Agendamiento automático, confirmaciones, recordatorios y reprogramaciones sin llamadas.",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Reportes y análisis",
                description:
                  "Generación automática de reportes de ventas, inventario, finanzas o cualquier métrica que necesites.",
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Sincronización de datos",
                description:
                  "Mantén tus sistemas actualizados automáticamente. CRM, ERP, hojas de cálculo, bases de datos.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Gestión de recursos humanos",
                description:
                  "Onboarding, solicitudes de vacaciones, evaluaciones, nómina y comunicación con empleados.",
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Procesos financieros",
                description:
                  "Conciliaciones bancarias, seguimiento de pagos, recordatorios de cobro y reportes financieros.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-emerald-500/30"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Unlimited possibilities section */}
          <div className="glass rounded-3xl p-12 border border-emerald-500/20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                ¿No ves tu proceso aquí? No hay problema
              </h3>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Si tu proceso involucra alguna de estas herramientas o sistemas, podemos automatizarlo:
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {[
                "Correo electrónico",
                "WhatsApp Business",
                "Excel / Google Sheets",
                "Bases de datos",
                "CRM (cualquiera)",
                "ERP (cualquiera)",
                "Sistemas de pago",
                "Redes sociales",
                "Calendarios",
                "Almacenamiento en la nube",
                "Sistemas de facturación",
                "Plataformas de e-commerce",
                "Herramientas de marketing",
                "Software de contabilidad",
                "Sistemas de inventario",
                "Plataformas de logística",
                "Aplicaciones personalizadas",
                "APIs de terceros",
                "Formularios web",
                "Y muchos más...",
              ].map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-emerald-500/10 hover:border-emerald-500/30 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-white font-medium">{tool}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-block glass rounded-2xl p-8 mb-8">
                <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Si lo haces en una computadora,
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                    lo podemos automatizar
                  </span>
                </p>
                <p className="text-lg text-gray-400">
                  No importa qué tan específico o único sea tu proceso. Nos especializamos en entender tu negocio y
                  crear automatizaciones personalizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we work section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Cómo trabajamos</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Un proceso simple y transparente, sin importar qué tan complejo sea tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Entendemos tu proceso",
                description:
                  "En una llamada, nos explicas qué haces actualmente. No necesitas saber de tecnología, solo cuéntanos tu día a día.",
              },
              {
                number: "2",
                title: "Diseñamos la solución",
                description:
                  "Creamos un plan específico para tu negocio. Te mostramos exactamente qué se automatizará y cómo funcionará.",
              },
              {
                number: "3",
                title: "Implementamos",
                description:
                  "Construimos e instalamos la automatización. Nos integramos con tus sistemas actuales sin interrumpir tu operación.",
              },
              {
                number: "4",
                title: "Capacitamos y damos soporte",
                description:
                  "Entrenamos a tu equipo y te acompañamos. Siempre estamos disponibles para ajustes y mejoras.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-emerald-500/5 absolute -top-8 left-0">{step.number}</div>
                <div className="relative glass rounded-2xl p-8 h-full">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xl mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Beneficios reales</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Resultados medibles que impactan directamente tu operación y rentabilidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-12 h-12" />,
                stat: "70-90%",
                title: "Reducción de tiempo",
                description:
                  "En tareas repetitivas. Tu equipo se enfoca en lo que realmente importa: hacer crecer el negocio.",
              },
              {
                icon: <DollarSign className="w-12 h-12" />,
                stat: "50-80%",
                title: "Reducción de costos",
                description: "Menos errores, menos reprocesos, menos tiempo perdido. Más eficiencia en cada proceso.",
              },
              {
                icon: <Zap className="w-12 h-12" />,
                stat: "24/7",
                title: "Operación continua",
                description:
                  "Tus procesos funcionan todo el tiempo, sin descansos, sin errores, sin supervisión constante.",
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

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-balance">
            ¿Listo para automatizar
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              tus procesos?
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Agenda una llamada gratuita de 30 minutos. Cuéntanos qué procesos quieres automatizar y te explicamos cómo
            podemos ayudarte.
          </p>

          <Button
            onClick={() => handleNavigation("/contact")}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold transition-all hover:scale-105"
          >
            Agendar llamada gratuita
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </main>
  )
}
