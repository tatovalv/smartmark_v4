"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const router = useRouter()
  const { t } = useLanguage()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <button onClick={() => handleNavigation("/")} className="inline-block mb-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <Image
                  src="/logo.png"
                  alt="SmartMark Consultores"
                  width={200}
                  height={70}
                  className="h-10 sm:h-12 w-auto relative z-10"
                />
              </div>
            </button>
            <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-white">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              {[
                { label: t("nav.home"), path: "/" },
                { label: t("nav.services"), path: "/services" },
                { label: t("nav.about"), path: "/about" },
                { label: t("nav.contact"), path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm sm:text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-white">{t("footer.contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                <span>info@smartmark.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm sm:text-base">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} SmartMark Consultores. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
