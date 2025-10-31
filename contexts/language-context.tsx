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
    es: "Comenzar",
    en: "Get Started",
  },

  // Hero Section
  "hero.badge": {
    es: "Automatización IA de Última Generación",
    en: "Next-Gen AI Automation",
  },
  "hero.title.line1": {
    es: "Automatiza Tu",
    en: "Automate Your",
  },
  "hero.title.line2": {
    es: "Negocio Con",
    en: "Business With",
  },
  "hero.title.line3": {
    es: "IA Avanzada",
    en: "Advanced AI",
  },
  "hero.description": {
    es: "SmartMark transforma las operaciones empresariales con automatización de IA de vanguardia. Optimizamos procesos, reducimos costos y aumentamos la productividad con soluciones inteligentes que se adaptan a tu negocio.",
    en: "SmartMark transforms business operations with cutting-edge AI automation. We optimize processes, reduce costs, and increase productivity with intelligent solutions that adapt to your business.",
  },
  "hero.button.explore": {
    es: "Explorar Automatización IA",
    en: "Explore AI Automation",
  },
  "hero.button.about": {
    es: "Sobre Nosotros",
    en: "About Us",
  },

  // Services Section
  "services.badge": {
    es: "Nuestro único servicio",
    en: "Our Only Service",
  },
  "services.title": {
    es: "Automatización de Procesos de Negocio",
    en: "Business Process Automation",
  },
  "services.description": {
    es: "Nos especializamos en una sola cosa: automatizar cualquier proceso de tu negocio que involucre una computadora o software.",
    en: "We specialize in one thing: automating any business process that involves a computer or software.",
  },
  "services.value.title": {
    es: "Un solo servicio, infinitas posibilidades",
    en: "One Service, Infinite Possibilities",
  },
  "services.value.description": {
    es: "No ofrecemos múltiples servicios porque creemos en la especialización. Somos expertos en automatización de procesos, y eso significa que podemos automatizar cualquier cosa que hagas en una computadora.",
    en: "We don't offer multiple services because we believe in specialization. We're experts in process automation, and that means we can automate anything you do on a computer.",
  },
  "services.examples.title": {
    es: "Ejemplos de procesos que automatizamos",
    en: "Examples of Processes We Automate",
  },
  "services.examples.description": {
    es: "Estos son solo algunos ejemplos. Si lo haces en una computadora, lo podemos automatizar.",
    en: "These are just a few examples. If you do it on a computer, we can automate it.",
  },
  "services.example.emails.title": {
    es: "Emails automáticos",
    en: "Automatic Emails",
  },
  "services.example.emails.description": {
    es: "Respuestas, seguimientos y notificaciones sin intervención manual",
    en: "Responses, follow-ups, and notifications without manual intervention",
  },
  "services.example.documents.title": {
    es: "Procesamiento de documentos",
    en: "Document Processing",
  },
  "services.example.documents.description": {
    es: "Facturas, contratos, reportes generados y enviados automáticamente",
    en: "Invoices, contracts, reports generated and sent automatically",
  },
  "services.example.customerService.title": {
    es: "Atención al cliente",
    en: "Customer Service",
  },
  "services.example.customerService.description": {
    es: "Respuestas instantáneas por WhatsApp, chat o redes sociales",
    en: "Instant responses via WhatsApp, chat, or social media",
  },
  "services.example.appointments.title": {
    es: "Gestión de citas",
    en: "Appointment Management",
  },
  "services.example.appointments.description": {
    es: "Agendamiento, recordatorios y confirmaciones automáticas",
    en: "Scheduling, reminders, and automatic confirmations",
  },
  "services.example.dataEntry.title": {
    es: "Entrada de datos",
    en: "Data Entry",
  },
  "services.example.dataEntry.description": {
    es: "Captura y organización de información sin errores humanos",
    en: "Capture and organize information without human errors",
  },
  "services.example.reports.title": {
    es: "Reportes y análisis",
    en: "Reports and Analysis",
  },
  "services.example.reports.description": {
    es: "Dashboards actualizados en tiempo real con tus datos",
    en: "Dashboards updated in real-time with your data",
  },
  "services.callout.title": {
    es: "Estos son solo ejemplos - automatizamos miles de procesos diferentes",
    en: "These are just examples - we automate thousands of different processes",
  },
  "services.callout.description": {
    es: "Si tu proceso no está aquí, no te preocupes. Si lo haces en una computadora, lo podemos automatizar.",
    en: "If your process isn't here, don't worry. If you do it on a computer, we can automate it.",
  },
  "services.tools.title": {
    es: "Trabajamos con cualquier herramienta",
    en: "We Work With Any Tool",
  },
  "services.tools.description": {
    es: "No importa qué software uses, podemos conectarlo y automatizarlo",
    en: "No matter what software you use, we can connect and automate it",
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
    es: "Si lo haces en una computadora, lo podemos automatizar",
    en: "If you do it on a computer, we can automate it",
  },
  "services.tools.final.description": {
    es: "No importa si usas software especializado, herramientas personalizadas o sistemas legacy. Encontramos la forma de automatizarlo.",
    en: "It doesn't matter if you use specialized software, custom tools, or legacy systems. We find a way to automate it.",
  },
  "services.howItWorks.title": {
    es: "Cómo funciona",
    en: "How It Works",
  },
  "services.howItWorks.step1.title": {
    es: "Analizamos tu proceso",
    en: "We Analyze Your Process",
  },
  "services.howItWorks.step1.description": {
    es: "Entendemos exactamente qué haces, cuánto tiempo toma y dónde están los cuellos de botella",
    en: "We understand exactly what you do, how long it takes, and where the bottlenecks are",
  },
  "services.howItWorks.step2.title": {
    es: "Diseñamos la automatización",
    en: "We Design the Automation",
  },
  "services.howItWorks.step2.description": {
    es: "Creamos un flujo automatizado que replica (y mejora) tu proceso actual",
    en: "We create an automated flow that replicates (and improves) your current process",
  },
  "services.howItWorks.step3.title": {
    es: "Implementamos y optimizamos",
    en: "We Implement and Optimize",
  },
  "services.howItWorks.step3.description": {
    es: "Ponemos todo en marcha y ajustamos hasta que funcione perfectamente",
    en: "We get everything running and adjust until it works perfectly",
  },
  "services.benefits.title": {
    es: "Qué ganas con la automatización",
    en: "What You Gain With Automation",
  },
  "services.benefit.time.title": {
    es: "Ahorra tiempo valioso",
    en: "Save Valuable Time",
  },
  "services.benefit.time.description": {
    es: "Recupera horas cada semana que puedes dedicar a hacer crecer tu negocio",
    en: "Recover hours each week that you can dedicate to growing your business",
  },
  "services.benefit.time.stat": {
    es: "Hasta 20 horas/semana",
    en: "Up to 20 hours/week",
  },
  "services.benefit.cost.title": {
    es: "Reduce costos operativos",
    en: "Reduce Operating Costs",
  },
  "services.benefit.cost.description": {
    es: "Menos errores, menos trabajo manual, más eficiencia en cada proceso",
    en: "Fewer errors, less manual work, more efficiency in every process",
  },
  "services.benefit.cost.stat": {
    es: "30-50% menos costos",
    en: "30-50% less costs",
  },
  "services.benefit.scale.title": {
    es: "Escala sin contratar",
    en: "Scale Without Hiring",
  },
  "services.benefit.scale.description": {
    es: "Crece tu negocio sin necesidad de aumentar tu equipo proporcionalmente",
    en: "Grow your business without needing to increase your team proportionally",
  },
  "services.benefit.scale.stat": {
    es: "10x más capacidad",
    en: "10x more capacity",
  },
  "services.benefit.accuracy.title": {
    es: "Elimina errores humanos",
    en: "Eliminate Human Errors",
  },
  "services.benefit.accuracy.description": {
    es: "Los procesos automatizados son consistentes y precisos cada vez",
    en: "Automated processes are consistent and accurate every time",
  },
  "services.benefit.accuracy.stat": {
    es: "99.9% precisión",
    en: "99.9% accuracy",
  },
  "services.cta.title": {
    es: "¿Listo para automatizar tu negocio?",
    en: "Ready to Automate Your Business?",
  },
  "services.cta.description": {
    es: "Cuéntanos qué procesos te quitan más tiempo y te mostraremos cómo automatizarlos",
    en: "Tell us which processes take up most of your time and we'll show you how to automate them",
  },
  "services.cta.button": {
    es: "Comenzar ahora",
    en: "Start Now",
  },

  // About Page
  "about.badge": {
    es: "Nuestra Historia",
    en: "Our Story",
  },
  "about.hero.title.line1": {
    es: "Creemos en hacer la vida",
    en: "We Believe in Making Life",
  },
  "about.hero.title.line2": {
    es: "más fácil",
    en: "Easier",
  },
  "about.hero.description": {
    es: "Somos una agencia de automatización que cree que el futuro es ahora, y estamos aquí para ayudar a nuestros clientes a alcanzarlo",
    en: "We're an automation agency that believes the future is now, and we're here to help our clients reach it",
  },
  "about.why.badge": {
    es: "Por qué existimos",
    en: "Why We Exist",
  },
  "about.why.title": {
    es: "Vimos personas perdiendo tiempo en tareas repetitivas",
    en: "We Saw People Wasting Time on Repetitive Tasks",
  },
  "about.why.description1": {
    es: "Cada día, miles de personas dedican horas a tareas manuales que una computadora podría hacer en segundos. Copiar datos, enviar emails, procesar facturas... trabajo que roba tiempo valioso que podrían usar para crecer su negocio.",
    en: "Every day, thousands of people spend hours on manual tasks that a computer could do in seconds. Copying data, sending emails, processing invoices... work that steals valuable time they could use to grow their business.",
  },
  "about.why.description2": {
    es: "Decidimos que tenía que haber una mejor manera. Una forma de liberar a las personas de lo repetitivo para que puedan enfocarse en lo que realmente importa.",
    en: "We decided there had to be a better way. A way to free people from repetition so they can focus on what really matters.",
  },
  "about.belief.badge": {
    es: "Nuestra creencia",
    en: "Our Belief",
  },
  "about.belief.title": {
    es: "El futuro es ahora",
    en: "The Future Is Now",
  },
  "about.belief.description1": {
    es: "La tecnología para automatizar procesos ya existe. No es algo del futuro lejano - está aquí, disponible, lista para usar. La inteligencia artificial y la automatización no son ciencia ficción, son herramientas reales que pueden transformar tu negocio hoy.",
    en: "The technology to automate processes already exists. It's not something from the distant future - it's here, available, ready to use. Artificial intelligence and automation aren't science fiction, they're real tools that can transform your business today.",
  },
  "about.belief.description2": {
    es: "Creemos que cada negocio, sin importar su tamaño, merece acceso a estas herramientas. El futuro no es algo que esperamos - es algo que construimos juntos, un proceso automatizado a la vez.",
    en: "We believe every business, regardless of size, deserves access to these tools. The future isn't something we wait for - it's something we build together, one automated process at a time.",
  },
  "about.help.badge": {
    es: "Cómo ayudamos",
    en: "How We Help",
  },
  "about.help.title": {
    es: "Estamos aquí para nuestros clientes",
    en: "We're Here for Our Clients",
  },
  "about.help.description1": {
    es: "No vendemos software complicado. No te dejamos solo con un manual de 200 páginas. Somos tu socio en automatización - entendemos tu negocio, identificamos qué se puede automatizar, y lo hacemos realidad.",
    en: "We don't sell complicated software. We don't leave you alone with a 200-page manual. We're your automation partner - we understand your business, identify what can be automated, and make it happen.",
  },
  "about.help.description2": {
    es: "Desde el restaurante local hasta la empresa multinacional, cada cliente tiene procesos únicos. Nuestra misión es entender esos procesos y crear automatizaciones que realmente funcionen para ti.",
    en: "From the local restaurant to the multinational company, each client has unique processes. Our mission is to understand those processes and create automations that really work for you.",
  },
  "about.help.feature1.title": {
    es: "Entendemos tu negocio",
    en: "We Understand Your Business",
  },
  "about.help.feature1.description": {
    es: "Cada negocio es diferente. Tomamos tiempo para conocer tus procesos únicos.",
    en: "Every business is different. We take time to understand your unique processes.",
  },
  "about.help.feature2.title": {
    es: "Automatizamos lo que importa",
    en: "We Automate What Matters",
  },
  "about.help.feature2.description": {
    es: "No automatizamos por automatizar. Nos enfocamos en lo que realmente te ahorra tiempo y dinero.",
    en: "We don't automate for the sake of automating. We focus on what really saves you time and money.",
  },
  "about.help.feature3.title": {
    es: "Te acompañamos siempre",
    en: "We're Always With You",
  },
  "about.help.feature3.description": {
    es: "Desde la implementación hasta el soporte continuo, estamos contigo en cada paso.",
    en: "From implementation to ongoing support, we're with you every step of the way.",
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
    es: "Somos una agencia de automatización especializada en hacer la vida más fácil a través de la tecnología. Combinamos experiencia en negocios con conocimiento técnico para crear soluciones de automatización que realmente funcionan.",
    en: "We're an automation agency specialized in making life easier through technology. We combine business experience with technical knowledge to create automation solutions that really work.",
  },
  "about.who.quote": {
    es: "Creemos que cada hora que ahorras en tareas repetitivas es una hora que puedes invertir en hacer crecer tu negocio y vivir mejor.",
    en: "We believe every hour you save on repetitive tasks is an hour you can invest in growing your business and living better.",
  },
  "about.cta.title": {
    es: "¿Listo para hacer tu vida más fácil?",
    en: "Ready to Make Your Life Easier?",
  },
  "about.cta.description": {
    es: "Conversemos sobre cómo podemos automatizar tus procesos y darte más tiempo para lo que realmente importa",
    en: "Let's talk about how we can automate your processes and give you more time for what really matters",
  },
  "about.cta.button": {
    es: "Comencemos a automatizar",
    en: "Let's Start Automating",
  },

  // Contact Page
  "contact.badge": {
    es: "Comencemos a automatizar",
    en: "Let's Start Automating",
  },
  "contact.page.title": {
    es: "Hablemos sobre tu proyecto",
    en: "Let's Talk About Your Project",
  },
  "contact.page.description": {
    es: "Cuéntanos qué procesos quieres automatizar y te explicamos cómo podemos ayudarte",
    en: "Tell us what processes you want to automate and we'll explain how we can help you",
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
    es: "Respondemos en menos de 24 horas. Estamos listos para ayudarte a automatizar tu negocio.",
    en: "We respond in less than 24 hours. We're ready to help you automate your business.",
  },

  // Footer
  "footer.description": {
    es: "Automatizamos procesos con IA para que tu negocio ahorre tiempo, reduzca errores y escale sin complicaciones.",
    en: "We automate processes with AI so your business saves time, reduces errors and scales without friction.",
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
    es: "Automatización de procesos",
    en: "Process Automation",
  },
  "home.hero.line1": {
    es: "Automatizamos",
    en: "We automate",
  },
  "home.hero.line2": {
    es: "los procesos",
    en: "the processes",
  },
  "home.hero.line3": {
    es: "tu negocio",
    en: "your business",
  },
  "home.hero.desc1": {
    es: "Hacemos que las tareas repetitivas de tu empresa se hagan solas.",
    en: "We make your company’s repetitive tasks run on their own.",
  },
  "home.hero.desc2": {
    es: "Ahorra tiempo, reduce errores y enfócate en hacer crecer tu negocio.",
    en: "Save time, reduce errors, and focus on growing your business.",
  },
  "home.cta.primary": {
    es: "Quiero automatizar mi negocio",
    en: "I want to automate my business",
  },
  "home.processes.title": {
    es: "Procesos que automatizamos",
    en: "Processes we automate",
  },
  "home.processes.subtitle": {
    es: "Estos son algunos ejemplos de procesos que automatizamos frecuentemente",
    en: "These are some examples of processes we frequently automate",
  },
  "home.processes.callout": {
    es: "Estos son solo ejemplos - automatizamos miles de procesos diferentes",
    en: "These are just examples — we automate thousands of different processes",
  },
  // Processes cards
  "home.proc1.title": { es: "Gestión de pedidos y ventas", en: "Order and sales management" },
  "home.proc1.desc": {
    es: "Desde que un cliente hace un pedido hasta que se entrega: todo automático. Confirmaciones, facturas, seguimiento de inventario y notificaciones.",
    en: "From the moment a customer orders to delivery — all automated. Confirmations, invoices, inventory tracking and notifications.",
  },
  "home.proc1.process": { es: "Pedido → Factura → Inventario → Envío → Seguimiento", en: "Order → Invoice → Inventory → Shipping → Tracking" },

  "home.proc2.title": { es: "Atención al cliente automatizada", en: "Automated customer support" },
  "home.proc2.desc": {
    es: "Responde preguntas frecuentes, agenda citas, da seguimiento a solicitudes y escala casos complejos a tu equipo. Funciona 24/7 en WhatsApp, email y redes.",
    en: "Answer FAQs, schedule appointments, follow up on requests and escalate complex cases to your team. Works 24/7 on WhatsApp, email and social.",
  },
  "home.proc2.process": { es: "Consulta → Respuesta → Seguimiento → Resolución", en: "Inquiry → Response → Follow-up → Resolution" },

  "home.proc3.title": { es: "Procesamiento de facturas", en: "Invoice processing" },
  "home.proc3.desc": {
    es: "Recibe facturas por email, extrae la información, la registra en tu sistema, programa pagos y archiva todo automáticamente. Sin errores de captura.",
    en: "Receive invoices by email, extract data, register it in your system, schedule payments and archive everything automatically. No capture errors.",
  },
  "home.proc3.process": { es: "Recepción → Extracción → Registro → Pago → Archivo", en: "Receive → Extract → Record → Pay → Archive" },

  "home.proc4.title": { es: "Gestión de cotizaciones", en: "Quotation management" },
  "home.proc4.desc": {
    es: "Recibe solicitudes de cotización, genera propuestas personalizadas, envía seguimientos automáticos y notifica cuando hay respuesta del cliente.",
    en: "Receive quote requests, generate personalized proposals, send automatic follow-ups and notify when the client responds.",
  },
  "home.proc4.process": { es: "Solicitud → Cotización → Envío → Seguimiento → Cierre", en: "Request → Quotation → Send → Follow-up → Close" },

  "home.proc5.title": { es: "Coordinación de citas y reuniones", en: "Appointment and meeting coordination" },
  "home.proc5.desc": {
    es: "Los clientes agendan directamente en tu calendario, reciben confirmaciones y recordatorios automáticos. Reprogramaciones sin llamadas ni emails.",
    en: "Clients book directly on your calendar, receive confirmations and automatic reminders. Rescheduling without calls or emails.",
  },
  "home.proc5.process": { es: "Solicitud → Agenda → Confirmación → Recordatorio", en: "Request → Calendar → Confirmation → Reminder" },

  "home.proc6.title": { es: "Reportes y análisis diarios", en: "Daily reports and analytics" },
  "home.proc6.desc": {
    es: "Genera reportes automáticos de ventas, inventario, finanzas o cualquier métrica. Los recibes cada mañana sin tener que buscar la información.",
    en: "Generate automatic reports on sales, inventory, finance or any metric. Receive them every morning without hunting for data.",
  },
  "home.proc6.process": { es: "Recopilación → Análisis → Reporte → Distribución", en: "Collect → Analyze → Report → Distribute" },

  // Benefits
  "home.benefits.title": { es: "¿Qué ganas?", en: "What do you gain?" },
  "home.benefits.subtitle": { es: "Resultados reales que impactan directamente tu negocio", en: "Real results that directly impact your business" },
  "home.benefit.time": { es: "Ahorra tiempo", en: "Save time" },
  "home.benefit.time.desc": { es: "Menos tiempo en tareas repetitivas. Más tiempo para hacer crecer tu negocio.", en: "Less time on repetitive tasks. More time to grow your business." },
  "home.benefit.cost": { es: "Reduce costos", en: "Reduce costs" },
  "home.benefit.cost.desc": { es: "Menos errores, menos reprocesos, menos personal dedicado a tareas manuales.", en: "Fewer errors, fewer reworks, less staff dedicated to manual tasks." },
  "home.benefit.grow": { es: "Crece más rápido", en: "Grow faster" },
  "home.benefit.grow.desc": { es: "Procesa más pedidos, atiende más clientes, sin aumentar tu equipo.", en: "Process more orders, serve more customers, without increasing your team." },
  "home.benefit.upto": { es: "Hasta", en: "Up to" },

  // Workflow block
  "home.workflow.before": { es: "Antes", en: "Before" },
  "home.workflow.steps": {
    es: "Recibir email|Copiar datos|Abrir Excel|Llenar formulario|Enviar respuesta",
    en: "Receive email|Copy data|Open Excel|Fill form|Send response",
  },
  "home.workflow.automate": { es: "Automatizamos", en: "We automate" },
  "home.workflow.after": { es: "Después", en: "After" },
  "home.workflow.system": { es: "Sistema automatizado", en: "Automated system" },
  "home.workflow.auto": { es: "Todo se procesa automáticamente sin intervención humana", en: "Everything is processed automatically without human intervention" },
  "home.workflow.time": { es: "5 minutos", en: "5 minutes" },
  "home.workflow.fullAuto": { es: "Completamente automático", en: "Fully automatic" },

  // How it works
  "home.how.title": { es: "¿Cómo funciona?", en: "How does it work?" },
  "home.how.subtitle": { es: "Es más simple de lo que piensas", en: "It's simpler than you think" },
  "home.how.step1.title": { es: "Nos cuentas qué haces", en: "You tell us what you do" },
  "home.how.step1.desc": { es: "En una llamada de 30 minutos, nos explicas las tareas que se repiten en tu negocio. No necesitas saber de tecnología.", en: "In a 30-minute call, you explain the repetitive tasks in your business. No tech knowledge needed." },
  "home.how.step2.title": { es: "Diseñamos la automatización", en: "We design the automation" },
  "home.how.step2.desc": { es: "Creamos un plan específico para tu negocio. Te mostramos exactamente qué se va a automatizar y cómo.", en: "We create a plan tailored to your business and show exactly what and how will be automated." },
  "home.how.step3.title": { es: "Lo implementamos", en: "We implement it" },
  "home.how.step3.desc": { es: "Instalamos todo y capacitamos a tu equipo. En pocas semanas, tus procesos están funcionando solos.", en: "We set everything up and train your team. In a few weeks your processes run on their own." },

  // Understanding section
  "home.understand.title": { es: "Cómo entendemos tu negocio", en: "How we understand your business" },
  "home.understand.subtitle": { es: "Nuestra experiencia trabajando con cientos de empresas nos ha enseñado algo fundamental", en: "Our experience working with hundreds of companies has taught us something fundamental" },
  "home.story1.title": { es: "Todos los negocios son diferentes", en: "Every business is different" },
  "home.story1.desc": { es: "Pero todos tienen algo en común: tareas que se repiten una y otra vez. Pedidos, facturas, emails, reportes, seguimientos. Cada negocio las hace de forma diferente, pero todas pueden automatizarse.", en: "But they all share something: tasks that repeat over and over. Orders, invoices, emails, reports, follow-ups. Each business does them differently, but all can be automated." },
  "home.story2.title": { es: "El tiempo es tu recurso más valioso", en: "Time is your most valuable resource" },
  "home.story2.desc": { es: "Cada hora que tú o tu equipo pasan copiando datos, respondiendo los mismos emails o generando reportes manualmente, es tiempo que no están usando para crecer, atender mejor a los clientes o innovar.", en: "Every hour you or your team spend copying data, replying to the same emails or generating manual reports is time not spent growing, serving customers better, or innovating." },
  "home.story3.title": { es: "La automatización no es solo para grandes empresas", en: "Automation isn't just for big companies" },
  "home.story3.desc": { es: "Antes requería equipos técnicos grandes y presupuestos millonarios. Hoy, con IA y herramientas modernas, cualquier negocio puede automatizar sus procesos. Nosotros lo hacemos accesible y simple.", en: "It used to require big tech teams and huge budgets. Today, with AI and modern tools, any business can automate its processes. We make it accessible and simple." },

  // Business types
  "home.types.title": { es: "Para cualquier tipo de negocio", en: "For any kind of business" },
  "home.types.subtitle": { es: "Desde el negocio más pequeño hasta la empresa más grande", en: "From the smallest business to the largest enterprise" },
  "home.types.items": { es: "Restaurantes|Tiendas|Consultorios|Inmobiliarias|Talleres|Distribuidoras|Agencias|Manufactura", en: "Restaurants|Shops|Clinics|Real estate|Workshops|Distributors|Agencies|Manufacturing" },

  // Final CTA
  "home.final.title1": { es: "Empieza a automatizar", en: "Start automating" },
  "home.final.title2": { es: "hoy mismo", en: "today" },
  "home.final.desc1": { es: "Agenda una llamada gratuita de 30 minutos. Sin compromiso.", en: "Book a free 30-minute call. No commitment." },
  "home.final.desc2": { es: "Te explicamos cómo podemos ayudarte.", en: "We'll explain how we can help you." },
  "home.final.cta": { es: "Agendar llamada gratuita", en: "Book a free call" },
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
