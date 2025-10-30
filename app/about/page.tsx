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
              <span className="text-emerald-400 font-medium">Nuestra Historia</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Creemos en hacer la vida <span className="text-emerald-400">más fácil</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto text-balance">
            Somos una agencia de automatización que cree que el futuro es ahora, y estamos aquí para ayudar a nuestros
            clientes a alcanzarlo
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
              <span className="text-red-400 font-medium">Por qué existimos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Vimos personas perdiendo tiempo en tareas repetitivas
            </h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              Cada día, miles de personas dedican horas a tareas manuales que una computadora podría hacer en segundos.
              Copiar datos, enviar emails, procesar facturas... trabajo que roba tiempo valioso que podrían usar para
              crecer su negocio.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Decidimos que tenía que haber una mejor manera. Una forma de liberar a las personas de lo repetitivo para
              que puedan enfocarse en lo que realmente importa.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Nuestra creencia</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">El futuro es ahora</h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              La tecnología para automatizar procesos ya existe. No es algo del futuro lejano - está aquí, disponible,
              lista para usar. La inteligencia artificial y la automatización no son ciencia ficción, son herramientas
              reales que pueden transformar tu negocio hoy.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Creemos que cada negocio, sin importar su tamaño, merece acceso a estas herramientas. El futuro no es algo
              que esperamos - es algo que construimos juntos, un proceso automatizado a la vez.
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
              <span className="text-purple-400 font-medium">Cómo ayudamos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Estamos aquí para nuestros clientes</h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              No vendemos software complicado. No te dejamos solo con un manual de 200 páginas. Somos tu socio en
              automatización - entendemos tu negocio, identificamos qué se puede automatizar, y lo hacemos realidad.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Desde el restaurante local hasta la empresa multinacional, cada cliente tiene procesos únicos. Nuestra
              misión es entender esos procesos y crear automatizaciones que realmente funcionen para ti.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Entendemos tu negocio</p>
                  <p className="text-gray-400 text-sm">
                    Cada negocio es diferente. Tomamos tiempo para conocer tus procesos únicos.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Automatizamos lo que importa</p>
                  <p className="text-gray-400 text-sm">
                    No automatizamos por automatizar. Nos enfocamos en lo que realmente te ahorra tiempo y dinero.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ArrowRight className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold mb-1">Te acompañamos siempre</p>
                  <p className="text-gray-400 text-sm">
                    Desde la implementación hasta el soporte continuo, estamos contigo en cada paso.
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
              <span className="text-blue-400 font-medium">Quiénes somos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Smartmark Consultores</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Somos una agencia de automatización especializada en hacer la vida más fácil a través de la tecnología.
              Combinamos experiencia en negocios con conocimiento técnico para crear soluciones de automatización que
              realmente funcionan.
            </p>
            <div className="flex justify-center mb-8">
              <div className="bg-zinc-900 rounded-xl p-8 inline-block">
                <Image src="/logo.png" alt="SmartMark Consultores" width={300} height={100} className="w-auto h-auto" />
              </div>
            </div>
            <p className="text-gray-400 italic">
              "Creemos que cada hora que ahorras en tareas repetitivas es una hora que puedes invertir en hacer crecer
              tu negocio y vivir mejor."
            </p>
          </div>
        </CleanCard>

        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">¿Listo para hacer tu vida más fácil?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Conversemos sobre cómo podemos automatizar tus procesos y darte más tiempo para lo que realmente importa
          </p>
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-6"
            onClick={() => handleNavigation("/contact")}
          >
            Comencemos a automatizar <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  )
}
