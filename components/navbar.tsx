"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`)

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "pt-3 px-3 sm:px-4" : "pt-0 px-0"}`}>
      <div className={`max-w-7xl mx-auto transition-all duration-500 ${scrolled ? "nav-pill px-4 sm:px-6" : ""}`}>
        <div
          className={`flex justify-between items-center transition-all duration-500 ${
            scrolled ? "h-20" : "h-28 sm:h-32"
          }`}
        >
          <Link href="/" className="flex items-center group" onClick={() => window.scrollTo(0, 0)}>
            <Image
              src="/logo.png"
              alt="SmartMark Consultores"
              width={280}
              height={100}
              className={`w-auto transition-all duration-500 group-hover:opacity-90 ${
                scrolled ? "h-16 sm:h-20" : "h-20 sm:h-24 md:h-28"
              }`}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="ml-1 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-500 hover:text-white border border-white/5 hover:border-white/15 transition-colors"
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            <Button
              onClick={() => handleNavigation("/contact")}
              className="ml-3 btn-glow text-sm px-5 py-2 h-auto rounded-xl"
            >
              {t("nav.getStarted")}
            </Button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-500 border border-white/5"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-white/5 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 border-t border-white/5 pt-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                  isActive(link.path)
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-zinc-300 hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2 px-1">
              <Button onClick={() => handleNavigation("/contact")} className="w-full btn-glow rounded-xl">
                {t("nav.getStarted")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
