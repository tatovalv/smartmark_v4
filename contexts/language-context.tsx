"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
  // Navbar
  "nav.home": {
    es: "Inicio",
    en: "Home",
  },
  "nav.services": {
    es: "Servicios",
    en: "Services",
  },
  "nav.about": {
    es: "Nosotros",
    en: "About",
  },
  "nav.contact": {
    es: "Contacto",
    en: "Contact",
  },
  "nav.getStarted": {
    es: "Consulta gratis",
    en: "Free consultation",
  },

  // Hero Section
  "hero.badge": {
    es: "Consultoría en transformación digital e IA",
    en: "Digital Transformation & AI Consulting",
  },
  "hero.title.line1": {
    es: "Impulsamos la",
    en: "We drive your",
  },
  "hero.title.line2": {
    es: "transformación",
    en: "digital",
  },
  "hero.title.line3": {
    es: "con IA",
    en: "with AI",
  },
  "hero.description": {
    es: "SmartMark Consultores acompaña a empresas en su evolución tecnológica: estrategia, capacitación, automatización e implementación de soluciones con inteligencia artificial.",
    en: "SmartMark Consultores guides companies through their technology evolution: strategy, training, automation, and AI solution implementation.",
  },
  "hero.button.explore": {
    es: "Conocer nuestros servicios",
    en: "Explore Our Services",
  },
  "hero.button.about": {
    es: "Sobre Nosotros",
    en: "About Us",
  },

  // Services Section
  "services.badge": {
    es: "Nuestros servicios",
    en: "Our Services",
  },
  "services.title": {
    es: "Consultoría que genera resultados",
    en: "Consulting that delivers results",
  },
  "services.description": {
    es: "Te ayudamos a modernizar tu empresa con IA, automatización y capacitación.",
    en: "We help you modernize your company with AI, automation, and training.",
  },
  "services.value.title": {
    es: "Consultoría integral, resultados concretos",
    en: "Comprehensive Consulting, Concrete Results",
  },
  "services.value.description": {
    es: "Combinamos visión estratégica con ejecución técnica. No solo recomendamos: diagnosticamos, diseñamos, implementamos y capacitamos a tu equipo para que los cambios perduren.",
    en: "We combine strategic vision with technical execution. We don't just recommend — we assess, design, implement, and train your team so changes last.",
  },
  "services.examples.title": {
    es: "Servicios",
    en: "Services",
  },
  "services.examples.description": {
    es: "Servicios diseñados para empresas que quieren modernizar sus operaciones y aprovechar la inteligencia artificial.",
    en: "Services designed for companies looking to modernize operations and leverage artificial intelligence.",
  },
  "services.example.digital.title": {
    es: "Transformación digital",
    en: "Digital Transformation",
  },
  "services.example.digital.description": {
    es: "Plan para modernizar tu empresa: sistemas, procesos y cultura digital.",
    en: "Plan to modernize your company: systems, processes, and digital culture.",
  },
  "services.example.training.title": {
    es: "Capacitaciones sobre IA",
    en: "AI Training",
  },
  "services.example.training.description": {
    es: "Talleres para que tu equipo use IA con confianza.",
    en: "Workshops so your team uses AI confidently.",
  },
  "services.example.automation.title": {
    es: "Automatización de procesos",
    en: "Process Automation",
  },
  "services.example.automation.description": {
    es: "Tareas repetitivas automatizadas. Ahorra tiempo y reduce errores.",
    en: "Automated repetitive tasks. Save time and reduce errors.",
  },
  "services.example.strategy.title": {
    es: "Diagnóstico y estrategia",
    en: "Assessment & Strategy",
  },
  "services.example.strategy.description": {
    es: "Evaluamos tu empresa y definimos prioridades claras.",
    en: "We assess your company and define clear priorities.",
  },
  "services.example.implementation.title": {
    es: "Implementación de soluciones IA",
    en: "AI Solution Implementation",
  },
  "services.example.implementation.description": {
    es: "Chatbots, análisis de datos y asistentes inteligentes.",
    en: "Chatbots, data analytics, and smart assistants.",
  },
  "services.example.support.title": {
    es: "Acompañamiento continuo",
    en: "Ongoing Support",
  },
  "services.example.support.description": {
    es: "Soporte y evolución después de implementar.",
    en: "Support and evolution after implementation.",
  },
  "services.callout.title": {
    es: "¿No encuentras lo que buscas?",
    en: "Can't find what you're looking for?",
  },
  "services.callout.description": {
    es: "Cada empresa es diferente. Cuéntanos tu reto y diseñamos una propuesta de consultoría a la medida.",
    en: "Every company is different. Tell us your challenge and we'll design a tailored consulting proposal.",
  },
  "services.tools.title": {
    es: "Tecnologías con las que trabajamos",
    en: "Technologies We Work With",
  },
  "services.tools.description": {
    es: "Integramos y optimizamos las herramientas que ya usas con soluciones modernas de IA",
    en: "We integrate and optimize the tools you already use with modern AI solutions",
  },
  "services.tool.email": {
    es: "Email (Gmail, Outlook, etc.)",
    en: "Email (Gmail, Outlook, etc.)",
  },
  "services.tool.whatsapp": {
    es: "WhatsApp Business",
    en: "WhatsApp Business",
  },
  "services.tool.excel": {
    es: "Excel y Google Sheets",
    en: "Excel and Google Sheets",
  },
  "services.tool.databases": {
    es: "Bases de datos",
    en: "Databases",
  },
  "services.tool.websites": {
    es: "Sitios web y formularios",
    en: "Websites and forms",
  },
  "services.tool.ecommerce": {
    es: "E-commerce",
    en: "E-commerce",
  },
  "services.tool.crm": {
    es: "CRM y ERP",
    en: "CRM and ERP",
  },
  "services.tool.apis": {
    es: "APIs y sistemas personalizados",
    en: "APIs and custom systems",
  },
  "services.tools.final.title": {
    es: "Tecnología al servicio de tu negocio",
    en: "Technology at the service of your business",
  },
  "services.tools.final.description": {
    es: "Trabajamos con las herramientas que ya usas y las integramos con soluciones modernas de IA y automatización.",
    en: "We work with the tools you already use and integrate them with modern AI and automation solutions.",
  },
  "services.howItWorks.title": {
    es: "¿Cómo funciona?",
    en: "How does it work?",
  },
  "services.howItWorks.step1.title": {
    es: "Platicamos",
    en: "We talk",
  },
  "services.howItWorks.step1.description": {
    es: "30 minutos gratis para entender tu negocio.",
    en: "Free 30 minutes to understand your business.",
  },
  "services.howItWorks.step2.title": {
    es: "Te proponemos",
    en: "We propose",
  },
  "services.howItWorks.step2.description": {
    es: "Plan con servicios, tiempos y costos claros.",
    en: "Plan with clear services, timelines, and costs.",
  },
  "services.howItWorks.step3.title": {
    es: "Lo hacemos",
    en: "We do it",
  },
  "services.howItWorks.step3.description": {
    es: "Implementamos y capacitamos a tu equipo.",
    en: "We implement and train your team.",
  },
  "services.benefits.title": {
    es: "Qué ganas con nuestra consultoría",
    en: "What You Gain With Our Consulting",
  },
  "services.benefit.time.title": {
    es: "Decisiones informadas",
    en: "Informed Decisions",
  },
  "services.benefit.time.description": {
    es: "Estrategia clara basada en diagnóstico real, no en suposiciones ni modas tecnológicas",
    en: "Clear strategy based on real assessment, not assumptions or tech trends",
  },
  "services.benefit.time.stat": {
    es: "Enfoque claro",
    en: "Clear focus",
  },
  "services.benefit.cost.title": {
    es: "Inversión inteligente",
    en: "Smart Investment",
  },
  "services.benefit.cost.description": {
    es: "Priorizamos lo que genera mayor impacto con el menor riesgo para tu operación",
    en: "We prioritize what generates the greatest impact with the lowest risk to your operations",
  },
  "services.benefit.cost.stat": {
    es: "ROI medible",
    en: "Measurable ROI",
  },
  "services.benefit.scale.title": {
    es: "Equipo capacitado",
    en: "Trained Team",
  },
  "services.benefit.scale.description": {
    es: "Tu gente aprende a usar la tecnología, no depende de nosotros para siempre",
    en: "Your people learn to use technology, they don't depend on us forever",
  },
  "services.benefit.scale.stat": {
    es: "Autonomía",
    en: "Autonomy",
  },
  "services.benefit.accuracy.title": {
    es: "Cambio que perdura",
    en: "Lasting Change",
  },
  "services.benefit.accuracy.description": {
    es: "Implementamos con acompañamiento para que las mejoras se integren a tu cultura organizacional",
    en: "We implement with ongoing support so improvements integrate into your organizational culture",
  },
  "services.benefit.accuracy.stat": {
    es: "Sostenible",
    en: "Sustainable",
  },
  "services.cta.title": {
    es: "¿Empezamos?",
    en: "Shall we start?",
  },
  "services.cta.description": {
    es: "Agenda tu consulta gratuita. Sin compromiso.",
    en: "Book your free consultation. No commitment.",
  },
  "services.cta.button": {
    es: "Agendar consulta gratis",
    en: "Book free consultation",
  },

  // About Page
  "about.badge": {
    es: "Consultoría tecnológica",
    en: "Technology Consulting",
  },
  "about.hero.title.line1": {
    es: "Tu socio en",
    en: "Your partner in",
  },
  "about.hero.title.line2": {
    es: "transformación digital",
    en: "digital transformation",
  },
  "about.hero.description": {
    es: "Consultoría en IA, automatización y capacitación para empresas que quieren crecer con tecnología.",
    en: "AI, automation, and training consulting for companies that want to grow with technology.",
  },
  "about.why.badge": {
    es: "Por qué existimos",
    en: "Why We Exist",
  },
  "about.why.title": {
    es: "Las empresas necesitan un socio, no solo un proveedor",
    en: "Companies need a partner, not just a vendor",
  },
  "about.why.description1": {
    es: "La transformación digital no es comprar software. Es cambiar la forma en que opera tu empresa: procesos más eficientes, equipos capacitados y decisiones basadas en datos. Muchas organizaciones saben que deben evolucionar, pero no saben por dónde empezar.",
    en: "Digital transformation isn't buying software. It's changing how your company operates: more efficient processes, trained teams, and data-driven decisions. Many organizations know they need to evolve, but don't know where to start.",
  },
  "about.why.description2": {
    es: "Existimos para ser ese guía: entender tu negocio, diseñar la estrategia correcta y acompañarte en la ejecución hasta que veas resultados reales.",
    en: "We exist to be that guide: understand your business, design the right strategy, and support you through execution until you see real results.",
  },
  "about.belief.badge": {
    es: "Nuestra creencia",
    en: "Our Belief",
  },
  "about.belief.title": {
    es: "La tecnología debe servir al negocio",
    en: "Technology Should Serve the Business",
  },
  "about.belief.description1": {
    es: "La IA y la automatización no son fines en sí mismos. Son herramientas para que tu empresa sea más competitiva, ágil y rentable. Nuestra consultoría se enfoca en generar valor medible, no en implementar tecnología por moda.",
    en: "AI and automation aren't ends in themselves. They're tools to make your company more competitive, agile, and profitable. Our consulting focuses on generating measurable value, not implementing trendy technology.",
  },
  "about.belief.description2": {
    es: "Creemos que cualquier empresa, sin importar su tamaño, puede aprovechar estas herramientas con la estrategia y el acompañamiento correctos.",
    en: "We believe any company, regardless of size, can leverage these tools with the right strategy and support.",
  },
  "about.help.badge": {
    es: "Cómo ayudamos",
    en: "How We Help",
  },
  "about.help.title": {
    es: "Consultoría de principio a fin",
    en: "End-to-End Consulting",
  },
  "about.help.description1": {
    es: "No te entregamos un documento y desaparecemos. Diagnosticamos, estrategizamos, implementamos, capacitamos y acompañamos. Somos tu socio en la transformación digital.",
    en: "We don't hand you a document and disappear. We assess, strategize, implement, train, and support. We're your partner in digital transformation.",
  },
  "about.help.description2": {
    es: "Desde PyMEs hasta empresas medianas, adaptamos nuestros servicios de consultoría a la realidad, presupuesto y urgencias de cada cliente.",
    en: "From SMEs to mid-size companies, we adapt our consulting services to each client's reality, budget, and priorities.",
  },
  "about.help.feature1.title": {
    es: "Diagnóstico honesto",
    en: "Honest Assessment",
  },
  "about.help.feature1.description": {
    es: "Te decimos qué necesitas realmente, no lo que es más fácil de vender.",
    en: "We tell you what you really need, not what's easiest to sell.",
  },
  "about.help.feature2.title": {
    es: "Ejecución práctica",
    en: "Practical Execution",
  },
  "about.help.feature2.description": {
    es: "No solo planeamos: implementamos soluciones que funcionan en el día a día de tu operación.",
    en: "We don't just plan — we implement solutions that work in your daily operations.",
  },
  "about.help.feature3.title": {
    es: "Capacitación incluida",
    en: "Training Included",
  },
  "about.help.feature3.description": {
    es: "Tu equipo aprende a usar las nuevas herramientas y procesos. La autonomía es parte del servicio.",
    en: "Your team learns to use new tools and processes. Autonomy is part of the service.",
  },
  "about.who.badge": {
    es: "Quiénes somos",
    en: "Who We Are",
  },
  "about.who.title": {
    es: "Smartmark Consultores",
    en: "Smartmark Consultores",
  },
  "about.who.description": {
    es: "Somos una firma de consultoría tecnológica especializada en transformación digital, capacitación en IA y automatización de procesos. Combinamos experiencia en negocios con conocimiento técnico para generar resultados concretos.",
    en: "We're a technology consulting firm specialized in digital transformation, AI training, and process automation. We combine business experience with technical knowledge to deliver concrete results.",
  },
  "about.who.quote": {
    es: "Nuestra misión es que cada empresa que trabaje con nosotros termine más fuerte, más eficiente y más preparada para el futuro.",
    en: "Our mission is for every company that works with us to end up stronger, more efficient, and better prepared for the future.",
  },
  "about.cta.title": {
    es: "¿Hablamos?",
    en: "Shall we talk?",
  },
  "about.cta.description": {
    es: "Consulta gratuita de 30 minutos. Sin compromiso.",
    en: "Free 30-minute consultation. No commitment.",
  },
  "about.cta.button": {
    es: "Agendar consulta gratis",
    en: "Book free consultation",
  },

  // Contact Page
  "contact.badge": {
    es: "Contacto",
    en: "Contact",
  },
  "contact.page.title": {
    es: "Cuéntanos tu reto",
    en: "Tell us your challenge",
  },
  "contact.page.description": {
    es: "Te respondemos en menos de 24 horas con una propuesta clara.",
    en: "We'll respond within 24 hours with a clear proposal.",
  },
  "contact.form.title": {
    es: "Envíanos un mensaje",
    en: "Send Us a Message",
  },
  "contact.form.name": {
    es: "Nombre",
    en: "Name",
  },
  "contact.form.name.placeholder": {
    es: "Tu nombre completo",
    en: "Your full name",
  },
  "contact.form.email": {
    es: "Email",
    en: "Email",
  },
  "contact.form.email.placeholder": {
    es: "tu@email.com",
    en: "your@email.com",
  },
  "contact.form.subject": {
    es: "Asunto",
    en: "Subject",
  },
  "contact.form.subject.placeholder": {
    es: "¿En qué podemos ayudarte?",
    en: "How can we help you?",
  },
  "contact.form.message": {
    es: "Mensaje",
    en: "Message",
  },
  "contact.form.message.placeholder": {
    es: "Cuéntanos sobre tu proyecto o pregunta...",
    en: "Tell us about your project or question...",
  },
  "contact.form.button": {
    es: "Enviar mensaje",
    en: "Send Message",
  },
  "contact.info.title": {
    es: "Información de Contacto",
    en: "Contact Information",
  },
  "contact.info.email": {
    es: "Email",
    en: "Email",
  },
  "contact.info.phone": {
    es: "Teléfono",
    en: "Phone",
  },
  "contact.info.office": {
    es: "Oficina",
    en: "Office",
  },
  "contact.hours.title": {
    es: "Horario de Atención",
    en: "Business Hours",
  },
  "contact.hours.weekdays": {
    es: "Lunes - Viernes",
    en: "Monday - Friday",
  },
  "contact.hours.saturday": {
    es: "Sábado",
    en: "Saturday",
  },
  "contact.hours.sunday": {
    es: "Domingo",
    en: "Sunday",
  },
  "contact.hours.closed": {
    es: "Cerrado",
    en: "Closed",
  },
  "contact.response.title": {
    es: "Respuesta Rápida",
    en: "Quick Response",
  },
  "contact.response.description": {
    es: "Respondemos en menos de 24 horas. Estamos listos para ayudarte con tu transformación digital.",
    en: "We respond in less than 24 hours. We're ready to help you with your digital transformation.",
  },

  // Footer
  "footer.description": {
    es: "Consultoría en transformación digital, capacitación en IA y automatización de procesos para empresas que quieren crecer con tecnología.",
    en: "Digital transformation consulting, AI training, and process automation for companies that want to grow with technology.",
  },
  "footer.quickLinks": {
    es: "Enlaces rápidos",
    en: "Quick links",
  },
  "footer.contact": {
    es: "Contacto",
    en: "Contact",
  },
  "footer.rights": {
    es: "Todos los derechos reservados.",
    en: "All rights reserved.",
  },

  // Home (Landing)
  "home.badge": {
    es: "Consultoría tecnológica",
    en: "Technology Consulting",
  },
  "home.hero.line1": {
    es: "Moderniza tu empresa",
    en: "Modernize your company",
  },
  "home.hero.line3": {
    es: "con IA",
    en: "with AI",
  },
  "home.hero.desc1": {
    es: "Transformación digital, capacitaciones en IA y automatización. Te guiamos paso a paso.",
    en: "Digital transformation, AI training, and automation. We guide you step by step.",
  },
  "home.cta.primary": {
    es: "Agenda una consulta gratis",
    en: "Book a free consultation",
  },
  "home.cta.secondary": {
    es: "Ver servicios",
    en: "View services",
  },
  "home.banner1.title": {
    es: "¿No sabes por dónde empezar?",
    en: "Don't know where to start?",
  },
  "home.banner1.desc": {
    es: "En 30 minutos te explicamos qué necesita tu empresa. Sin compromiso.",
    en: "In 30 minutes we'll explain what your company needs. No commitment.",
  },
  "home.processes.title": {
    es: "¿Qué hacemos?",
    en: "What do we do?",
  },
  "home.processes.subtitle": {
    es: "Seis servicios para llevar tu empresa al siguiente nivel",
    en: "Six services to take your company to the next level",
  },
  "home.processes.callout": {
    es: "Cada proyecto es único — diseñamos la consultoría a la medida de tu negocio",
    en: "Every project is unique — we design consulting tailored to your business",
  },
  // Services cards
  "home.proc1.title": { es: "Transformación digital", en: "Digital Transformation" },
  "home.proc1.desc": {
    es: "Plan claro para modernizar sistemas, procesos y cultura de tu empresa.",
    en: "Clear plan to modernize your company's systems, processes, and culture.",
  },

  "home.proc2.title": { es: "Capacitaciones en IA", en: "AI Training" },
  "home.proc2.desc": {
    es: "Tu equipo aprende a usar IA en el día a día. Talleres prácticos.",
    en: "Your team learns to use AI daily. Hands-on workshops.",
  },

  "home.proc3.title": { es: "Automatización", en: "Automation" },
  "home.proc3.desc": {
    es: "Tareas repetitivas que se hacen solas. Menos errores, más tiempo.",
    en: "Repetitive tasks that run themselves. Fewer errors, more time.",
  },

  "home.proc4.title": { es: "Diagnóstico y estrategia", en: "Assessment & Strategy" },
  "home.proc4.desc": {
    es: "Evaluamos tu empresa y definimos qué hacer primero y con qué presupuesto.",
    en: "We assess your company and define what to do first and with what budget.",
  },

  "home.proc5.title": { es: "Soluciones con IA", en: "AI Solutions" },
  "home.proc5.desc": {
    es: "Chatbots, análisis de datos y asistentes inteligentes para tu negocio.",
    en: "Chatbots, data analytics, and smart assistants for your business.",
  },

  "home.proc6.title": { es: "Acompañamiento", en: "Ongoing Support" },
  "home.proc6.desc": {
    es: "Soporte después de implementar. Tu socio tecnológico a largo plazo.",
    en: "Support after implementation. Your long-term technology partner.",
  },

  "home.benefits.title": { es: "¿Por qué trabajar con nosotros?", en: "Why work with us?" },
  "home.benefit.time": { es: "Sabes qué hacer y cuándo", en: "You know what to do and when" },
  "home.benefit.time.desc": { es: "Plan claro, sin adivinar.", en: "Clear plan, no guessing." },
  "home.benefit.cost": { es: "Inviertes bien", en: "You invest wisely" },
  "home.benefit.cost.desc": { es: "Priorizamos lo que más impacto genera.", en: "We prioritize what generates the most impact." },
  "home.benefit.grow": { es: "Tu equipo aprende", en: "Your team learns" },
  "home.benefit.grow.desc": { es: "Capacitación incluida en cada proyecto.", en: "Training included in every project." },

  "home.how.title": { es: "¿Cómo funciona?", en: "How does it work?" },
  "home.how.subtitle": { es: "Tres pasos. Simple.", en: "Three steps. Simple." },
  "home.how.step1.title": { es: "Platicamos", en: "We talk" },
  "home.how.step1.desc": { es: "30 minutos para entender tu negocio. Gratis y sin compromiso.", en: "30 minutes to understand your business. Free, no commitment." },
  "home.how.step2.title": { es: "Te proponemos", en: "We propose" },
  "home.how.step2.desc": { es: "Plan con servicios, tiempos y costos claros.", en: "Plan with clear services, timelines, and costs." },
  "home.how.step3.title": { es: "Lo hacemos", en: "We do it" },
  "home.how.step3.desc": { es: "Implementamos, capacitamos y te acompañamos.", en: "We implement, train, and support you." },

  "home.final.title1": { es: "¿Listo para empezar?", en: "Ready to start?" },
  "home.final.title2": { es: "Hablemos.", en: "Let's talk." },
  "home.final.desc1": { es: "Consulta gratuita de 30 minutos. Cuéntanos tu reto.", en: "Free 30-minute consultation. Tell us your challenge." },
  "home.final.cta": { es: "Agendar consulta gratis", en: "Book free consultation" },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[key as keyof typeof translations]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
