"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import GlowingButton from "./glowing-button"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-xl border-b border-emerald-500/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 sm:h-28">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group" onClick={() => window.scrollTo(0, 0)}>
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="SmartMark Consultores"
                  width={250}
                  height={90}
                  className="h-24 sm:h-28 md:h-32 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 relative group ${
                  isActive(link.path)
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></span>
                )}
              </button>
            ))}

            {/* Language Toggle - Modern pill design */}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 transition-all duration-200 flex items-center gap-2"
              aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              <span className="text-xs font-semibold text-gray-400">{language === "es" ? "ES" : "EN"}</span>
              <span className="text-xs text-emerald-400">→</span>
              <span className="text-xs font-semibold text-emerald-400">{language === "es" ? "EN" : "ES"}</span>
            </button>

            <GlowingButton onClick={() => handleNavigation("/contact")} className="ml-2">
              {t("nav.getStarted")}
            </GlowingButton>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 sm:space-x-3">
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 transition-all duration-200 flex items-center gap-1.5"
              aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              <span className="text-xs font-semibold text-gray-400">{language.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 focus:outline-none hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-emerald-500/10 absolute w-full">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base transition-all ${
                  isActive(link.path)
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2">
              <Button onClick={() => handleNavigation("/contact")} className="w-full bg-emerald-500 hover:bg-emerald-600 text-sm sm:text-base">
                {t("nav.getStarted")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
