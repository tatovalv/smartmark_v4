import { CaseBoard } from "@/components/site/case-board"
import { ContactForm } from "@/components/site/contact-form"
import { Header } from "@/components/site/header"
import { LanguageSwitcher } from "@/components/site/language-switcher"
import { WhatsAppButton } from "@/components/site/whatsapp-button"
import { homePath, serviceOptions, type Dictionary, type Locale } from "@/lib/i18n"
import { EMAIL, LINKEDIN_URL, SITE_URL, whatsappHref } from "@/lib/site"

export default function Landing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = homePath(locale)
  const options = serviceOptions(dict)
  const whatsapp = whatsappHref(dict.whatsapp.message)
  const year = new Date().getFullYear()
  const links = [
    { href: "#servicios", label: dict.nav.services },
    { href: "#casos", label: dict.nav.cases },
    { href: "#como-trabajamos", label: dict.nav.how },
    { href: "#por-que", label: dict.nav.why },
    { href: "#contacto", label: dict.nav.contact },
  ]

  return (
    <>
      <a className="skip-link" href="#contenido">
        {dict.a11y.skip}
      </a>
      <Header
        locale={locale}
        logoAlt={dict.logoAlt}
        homeHref={home}
        links={links}
        cta={dict.nav.cta}
        labels={dict.a11y}
        banner={locale === "es" ? dict.banner : null}
      />
      <main id="contenido">
        <section className="hero">
          <div className="hero-constellation">
            <KnowledgeField />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="display">{dict.hero.title}</h1>
            <p className="lede">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contacto" className="btn btn-primary">
                {dict.hero.primary}
              </a>
              <a href="#servicios" className="btn btn-ghost">
                {dict.hero.secondary}
              </a>
            </div>
          </div>
          <ol className="hero-notes" aria-label={dict.hero.stageLabel}>
            {dict.hero.trust.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="statement" aria-label={dict.statement}>
          <p className="shell">{dict.statement}</p>
        </section>

        <section className="section" aria-labelledby="audiencia-title">
          <div className="shell map-grid">
            <div>
              <h2 id="audiencia-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.audience.title}
              </h2>
              <p className="lede">{dict.audience.lead}</p>
              <ul className="rail">
                {dict.audience.items.map((item) => (
                  <li key={item}>
                    <i aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{dict.outcomes.title}</h2>
              <p className="lede">{dict.outcomes.lead}</p>
              <div className="stair">
                {dict.outcomes.items.map((item, index) => (
                  <article key={item.title} className={index % 2 === 0 ? "stair-ink" : "stair-paper"}>
                    <p className="index">{String(index + 1).padStart(2, "0")}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="problema-title">
          <div className="shell">
            <div className="max-w-3xl">
              <h2 id="problema-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.problem.title}
              </h2>
              <p className="lede">{dict.problem.lead}</p>
            </div>
            <div className="diagnosis">
              {dict.problem.items.map((item, index) => (
                <article key={item.title}>
                  <p className="giant" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="casos" className="cases-band" aria-labelledby="casos-title">
          <div className="shell">
            <h2 id="casos-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.cases.title}
            </h2>
            <p className="lede">{dict.cases.lead}</p>
            <CaseBoard cases={dict.cases} />
          </div>
        </section>

        <section className="blueprint" aria-labelledby="criterio-title">
          <div className="shell">
            <div className="max-w-3xl">
              <h2 id="criterio-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.approach.title}
              </h2>
              <p className="lede">{dict.approach.lead}</p>
            </div>
            <div className="blueprint-grid">
              {dict.approach.items.map((item, index) => (
                <article key={item.title}>
                  <p className="index">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="section" aria-labelledby="servicios-title">
          <div className="shell">
            <div className="max-w-3xl">
              <h2 id="servicios-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.services.title}
              </h2>
              <p className="lede">{dict.services.intro}</p>
            </div>
            <div className="sheet-list">
              {dict.services.items.map((item, index) => (
                <article key={item.id} className="sheet">
                  <p className="sheet-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{item.title}</h3>
                  <p className="sheet-text">{item.text}</p>
                  <p className="sheet-label">{dict.services.includes}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <article className="sheet sheet-talks">
              <h3>{dict.services.talks.title}</h3>
              <p className="sheet-text">{dict.services.talks.text}</p>
            </article>
            <div className="services-cta">
              <div>
                <h3>{dict.services.ctaTitle}</h3>
                <p>{dict.services.ctaText}</p>
              </div>
              <a href="#contacto" className="btn services-cta-btn">
                {dict.services.quote}
              </a>
            </div>
          </div>
        </section>

        <section id="como-trabajamos" className="section" aria-labelledby="como-title">
          <div className="shell">
            <h2 id="como-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.how.title}
            </h2>
            <ol className="spine">
              {dict.how.steps.map((step, index) => (
                <li key={step.title}>
                  <p className="index">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{step.title}</h3>
                  <p className="spine-lead">{step.text}</p>
                  <p className="spine-detail">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="por-que" className="section" aria-labelledby="porque-title">
          <div className="shell">
            <h2 id="porque-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.why.title}
            </h2>
            <p className="lede">{dict.why.lead}</p>
            <div className="why-band">
              {dict.why.items.map((item, index) => (
                <article key={item.title}>
                  <p className="index">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="faq-title">
          <div className="shell">
          <div className="max-w-3xl">
            <h2 id="faq-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.faq.title}
            </h2>
            <div className="mt-8 divide-y divide-brand-line border-y border-brand-line">
              {dict.faq.items.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 py-4 text-lg font-semibold leading-snug">
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="mt-1 text-brand-secondary transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-4 leading-relaxed text-brand-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
          </div>
        </section>

        <section id="contacto" className="section" aria-labelledby="contacto-title">
          <div className="shell">
            <h2 id="contacto-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.contact.title}
            </h2>
            <p className="lede">{dict.contact.text}</p>
            <div className="contact-stage">
              <div className="contact-sheet">
                <ContactForm locale={locale} copy={dict.form} services={options} />
              </div>
              <aside className="contact-note">
              <ul className="space-y-5">
                <li>
                  <p className="text-sm font-semibold text-brand-secondary">{dict.contact.emailLabel}</p>
                  <a className="mt-1 inline-block break-all font-medium underline-offset-4 hover:underline" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </li>
                {whatsapp ? (
                  <li>
                    <p className="text-sm font-semibold text-brand-secondary">{dict.contact.whatsappLabel}</p>
                    <a className="mt-1 inline-block font-medium underline-offset-4 hover:underline" href={whatsapp} target="_blank" rel="noopener noreferrer">
                      {dict.whatsapp.label}
                    </a>
                  </li>
                ) : null}
                <li>
                  <p className="text-sm font-semibold text-brand-secondary">{dict.contact.linkedinLabel}</p>
                  <a className="mt-1 inline-block font-medium underline-offset-4 hover:underline" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                    {dict.logoAlt}
                  </a>
                </li>
              </ul>
              <p className="contact-where">{dict.contact.location}</p>
            </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-secondary text-white">
        <div className="shell grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_auto] md:items-start">
          <div>
            <a href={home} className="inline-block rounded-md bg-white px-3 py-2" aria-label={dict.logoAlt}>
              <img src="/logo-mark.png" alt="" width={160} height={69} className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-md leading-relaxed text-white/90">{dict.footer.blurb}</p>
          </div>
          <div className="flex flex-col gap-4">
            <nav aria-label={dict.footer.linksLabel} className="flex flex-col gap-2">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="hover:underline">
                  {link.label}
                </a>
              ))}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {dict.contact.linkedinLabel}
              </a>
            </nav>
            <LanguageSwitcher locale={locale} label={dict.a11y.lang} tone="dark" />
          </div>
        </div>
        <div className="border-t border-white/15">
          <p className="shell py-5 text-sm text-white/80">
            {dict.footer.rights.replace("{year}", String(year))}
          </p>
        </div>
      </footer>

      {whatsapp ? <WhatsAppButton href={whatsapp} label={dict.whatsapp.label} /> : null}
      <JsonLd locale={locale} dict={dict} />
    </>
  )
}

function KnowledgeField() {
  const center = { x: 430, y: 340 }
  const nodes = [
    [230, 70],
    [560, 50],
    [740, 190],
    [710, 450],
    [500, 620],
    [210, 590],
    [70, 380],
    [130, 170],
    [350, 180],
    [610, 300],
    [300, 470],
  ]
  const bridges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 0],
    [8, 9],
    [9, 10],
    [10, 8],
  ]

  return (
    <svg className="field-svg" viewBox="0 0 820 700" fill="none" aria-hidden="true">
      {nodes.map(([x, y], index) => (
        <line key={`ray-${index}`} className="field-line" x1={center.x} y1={center.y} x2={x} y2={y} />
      ))}
      {bridges.map(([from, to], index) => (
        <line
          key={`bridge-${index}`}
          className={index % 2 === 0 ? "field-line field-line-accent" : "field-line"}
          x1={nodes[from][0]}
          y1={nodes[from][1]}
          x2={nodes[to][0]}
          y2={nodes[to][1]}
        />
      ))}
      {nodes.map(([x, y], index) => (
        <circle key={`node-${index}`} className="field-node" cx={x} cy={y} r={index % 3 === 0 ? 9 : 5.5} />
      ))}
      <g className="field-core" transform={`translate(${center.x} ${center.y})`}>
        <circle r="36" />
        <rect x="-16" y="-8" width="6.5" height="22" rx="3.2" />
        <rect x="-3.2" y="-18" width="6.5" height="34" rx="3.2" />
        <rect x="10" y="-13" width="6.5" height="27" rx="3.2" />
      </g>
    </svg>
  )
}

function JsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SmartMark Consultores",
    url: new URL(homePath(locale), SITE_URL).toString(),
    image: `${SITE_URL}/logo.png`,
    description: dict.meta.description,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "San José",
      addressCountry: "CR",
    },
    areaServed: "Latin America",
    availableLanguage: ["Spanish", "English"],
    sameAs: [LINKEDIN_URL],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
