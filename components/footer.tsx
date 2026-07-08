"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <footer className="relative border-t border-white/[0.06] mt-8">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.03] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <button onClick={() => handleNavigation("/")} className="inline-block mb-5">
              <Image src="/logo.png" alt="SmartMark Consultores" width={180} height={64} className="h-10 w-auto opacity-90" />
            </button>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">{t("footer.description")}</p>
          </div>

          <div className="md:col-span-3">
            <p className="section-label mb-4">{t("footer.quickLinks")}</p>
            <ul className="space-y-2">
              {[
                { label: t("nav.home"), path: "/" },
                { label: t("nav.services"), path: "/services" },
                { label: t("nav.about"), path: "/about" },
                { label: t("nav.contact"), path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="section-label mb-4">{t("footer.contact")}</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <Mail size={16} className="text-emerald-500/80 flex-shrink-0" />
                <span>info@smartmarkconsultores.com</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-500 text-sm">
                <MapPin size={16} className="text-emerald-500/80 flex-shrink-0" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} SmartMark Consultores. {t("footer.rights")}
          </p>
          <p className="text-zinc-700 text-xs font-mono">IA · Automatización · Consultoría</p>
        </div>
      </div>
    </footer>
  )
}
