import { ContactForm } from "@/components/site/contact-form"
import { Header } from "@/components/site/header"
import { StructuredData } from "@/components/site/json-ld"
import { LanguageSwitcher } from "@/components/site/language-switcher"
import { QuoteLink } from "@/components/site/quote-link"
import { TrackedLink } from "@/components/site/tracked-link"
import { WhatsAppButton } from "@/components/site/whatsapp-button"
import { homePath, serviceOptions, type Dictionary, type Locale } from "@/lib/i18n"
import { pagePath, type SitePage } from "@/lib/routes"
import { EMAIL, LINKEDIN_URL, whatsappHref } from "@/lib/site"

export default function Landing({
  locale,
  dict,
  page,
}: {
  locale: Locale
  dict: Dictionary
  page: SitePage
}) {
  const home = homePath(locale)
  const contactHref = pagePath(locale, "contact")
  const options = serviceOptions(dict)
  const whatsapp = whatsappHref(dict.whatsapp.message)
  const year = new Date().getFullYear()
  const links = [
    { href: pagePath(locale, "services"), label: dict.nav.services },
    { href: pagePath(locale, "cases"), label: dict.nav.cases },
    { href: pagePath(locale, "how"), label: dict.nav.how },
    { href: pagePath(locale, "why"), label: dict.nav.why },
    { href: contactHref, label: dict.nav.contact },
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
        ctaHref={contactHref}
        labels={dict.a11y}
        page={page}
        banner={locale === "es" ? dict.banner : null}
      />
      <main id="contenido">
        {page === "home" ? (
        <>
        <section className="hero">
          <div className="hero-constellation">
            <KnowledgeField />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="display">
              {dict.hero.title.split(/(?<=\.)\s+/).map((sentence) => (
                <span key={sentence} className="block">
                  {sentence}
                </span>
              ))}
            </h1>
            <p className="lede">{dict.hero.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink href={contactHref} className="btn btn-primary" event="cta_click">
                {dict.hero.primary}
              </TrackedLink>
              <a href={pagePath(locale, "services")} className="btn btn-ghost">
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

        <section className="position-banner" aria-labelledby="posicion-title">
          <div className="shell">
            <h2 id="posicion-title">{dict.position.title}</h2>
            <ul className="position-pillars">
              {dict.position.pillars.map((pillar) => (
                <li key={pillar.label}>
                  <p className="position-label">{pillar.label}</p>
                  <p className="position-text">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="statement" aria-label={dict.statement}>
          <p className="shell">{dict.statement}</p>
        </section>

        <section className="section" aria-labelledby="resultados-title">
          <div className="shell map-grid">
            <div>
              <h2 id="resultados-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.outcomes.title}
              </h2>
              <p className="lede">{dict.outcomes.lead}</p>
            </div>
            <div>
              <div className="stair stair-solo">
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

        <section className="section bg-white" aria-labelledby="adelanto-servicios-title">
          <div className="shell">
            <div className="max-w-3xl">
              <h2 id="adelanto-servicios-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.services.preview.title}
              </h2>
              <p className="lede">{dict.services.preview.lead}</p>
            </div>
            <ul className="preview-grid">
              {dict.services.items.map((item, index) => (
                <li key={item.id}>
                  <a href={`${pagePath(locale, "services")}#${item.id}`} className="preview-card">
                    <p className="index">{String(index + 1).padStart(2, "0")}</p>
                    <h3>{item.title}</h3>
                    <p>{item.short}</p>
                  </a>
                </li>
              ))}
            </ul>
            <a href={pagePath(locale, "services")} className="preview-link">
              {dict.services.preview.link}
            </a>
          </div>
        </section>
        </>
        ) : null}

        {page === "cases" ? (
        <section id="casos" className="cases-band" aria-labelledby="casos-title">
          <div className="shell">
            <h1 id="casos-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.cases.title}
            </h1>
            <p className="lede">{dict.cases.lead}</p>
            <nav className="case-index" aria-label={dict.cases.indexLabel}>
              <ul className="chip-row">
                {dict.cases.items.map((item) => (
                  <li key={item.slug}>
                    <a href={`#${item.slug}`} className="chip">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="case-list">
              {dict.cases.items.map((item, index) => {
                const service = dict.services.items.find((entry) => entry.id === item.service)
                return (
                  <article key={item.slug} id={item.slug} className="case-card">
                    <div>
                      <p className="sheet-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2>{item.title}</h2>
                      <p className="case-summary">{item.text}</p>
                    </div>
                    <div>
                      <p className="case-situation">{item.situation}</p>
                      <p className="sheet-label">{dict.cases.builtLabel}</p>
                      <ul>
                        {item.builds.map((build) => (
                          <li key={build}>{build}</li>
                        ))}
                      </ul>
                      <div className="case-keeps">
                        <p className="sheet-label">{dict.cases.keepsLabel}</p>
                        <p>{item.keeps}</p>
                      </div>
                      {service ? (
                        <a href={`${pagePath(locale, "services")}#${service.id}`} className="preview-link">
                          {dict.cases.implementLabel} {service.title} →
                        </a>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
        ) : null}

        {page === "home" ? (
        <>
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

        <section className="section" aria-labelledby="adelanto-casos-title">
          <div className="shell">
            <h2 id="adelanto-casos-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.cases.preview.title}
            </h2>
            <ul className="chip-row">
              {dict.cases.items.map((item) => (
                <li key={item.slug}>
                  <a href={`${pagePath(locale, "cases")}#${item.slug}`} className="chip">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            <a href={pagePath(locale, "cases")} className="preview-link">
              {dict.cases.preview.link}
            </a>
          </div>
        </section>
        </>
        ) : null}

        {page === "services" ? (
        <section id="servicios" className="section" aria-labelledby="servicios-title">
          <div className="shell">
            <div className="max-w-3xl">
              <h1 id="servicios-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {dict.services.title}
              </h1>
              <p className="lede">{dict.services.intro}</p>
            </div>
            <div className="sheet-list">
              {dict.services.items.map((item, index) => (
                <article key={item.id} id={item.id} className="sheet">
                  <p className="sheet-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2>{item.title}</h2>
                  <p className="sheet-text">{item.text}</p>
                  <p className="sheet-audience">
                    <span>{dict.services.audienceLabel}</span> {item.audience}
                  </p>
                  <p className="sheet-label">{dict.services.includes}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="sheet-actions">
                    <QuoteLink locale={locale} serviceId={item.id} className="btn btn-primary">
                      {dict.services.quote}
                    </QuoteLink>
                    {item.id === "automation" ? (
                      <a href={pagePath(locale, "cases")} className="preview-link">
                        {dict.services.casesLink}
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
            <article id={dict.services.talks.id} className="sheet sheet-talks">
              <h2>{dict.services.talks.title}</h2>
              <p className="sheet-text">{dict.services.talks.text}</p>
              <div className="sheet-actions">
                <QuoteLink locale={locale} serviceId={dict.services.talks.id} className="btn btn-primary">
                  {dict.services.talks.button}
                </QuoteLink>
              </div>
            </article>
          </div>
        </section>
        ) : null}

        {page === "how" ? (
        <section id="como-trabajamos" className="section" aria-labelledby="como-title">
          <div className="shell">
            <h1 id="como-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.how.title}
            </h1>
            <p className="lede">{dict.how.lead}</p>
            <ol className="spine">
              {dict.how.steps.map((step, index) => (
                <li key={step.title}>
                  <p className="index">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{step.title}</h2>
                  <p className="spine-lead">{step.text}</p>
                  <p className="spine-detail">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        ) : null}

        {page === "why" ? (
        <section id="por-que" className="section" aria-labelledby="porque-title">
          <div className="shell">
            <h1 id="porque-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.why.title}
            </h1>
            <p className="lede">{dict.why.lead}</p>
            <div className="why-band">
              {dict.why.items.map((item, index) => (
                <article key={item.title}>
                  <p className="index">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        ) : null}

        {page === "home" ? (
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
        ) : null}

        {page === "contact" ? (
        <section id="contacto" className="section" aria-labelledby="contacto-title">
          <div className="shell">
            <h1 id="contacto-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.contact.title}
            </h1>
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
                    <TrackedLink className="mt-1 inline-block font-medium underline-offset-4 hover:underline" href={whatsapp} target="_blank" rel="noopener noreferrer" event="whatsapp_click">
                      {dict.whatsapp.label}
                    </TrackedLink>
                  </li>
                ) : null}
                <li>
                  <p className="text-sm font-semibold text-brand-secondary">{dict.contact.linkedinLabel}</p>
                  <a className="mt-1 inline-block font-medium underline-offset-4 hover:underline" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                    {dict.logoAlt}
                  </a>
                </li>
              </ul>
            </aside>
            </div>
          </div>
        </section>
        ) : null}

        <section className={page === "home" ? "final-cta-band is-full bg-white" : "final-cta-band"} aria-labelledby="cta-final-title">
          <div className="shell">
            <div className="final-cta">
              <div>
                <h2 id="cta-final-title">{dict.finalCta[page].title}</h2>
                <p>{dict.finalCta[page].text}</p>
              </div>
              <div className="final-cta-actions">
                {page === "contact" ? (
                  <a href={pagePath(locale, "services")} className="btn final-cta-btn">
                    {dict.finalCta[page].button}
                  </a>
                ) : (
                  <TrackedLink href={contactHref} className="btn final-cta-btn" event="cta_click">
                    {dict.finalCta[page].button}
                  </TrackedLink>
                )}
                {page === "home" && whatsapp ? (
                  <TrackedLink href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn final-cta-ghost" event="whatsapp_click">
                    {dict.whatsapp.label}
                  </TrackedLink>
                ) : null}
              </div>
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
            <LanguageSwitcher locale={locale} label={dict.a11y.lang} page={page} tone="dark" />
          </div>
        </div>
        <div className="border-t border-white/15">
          <p className="shell py-5 text-sm text-white/80">
            {dict.footer.rights.replace("{year}", String(year))}
          </p>
        </div>
      </footer>

      {whatsapp ? <WhatsAppButton href={whatsapp} label={dict.whatsapp.label} /> : null}
      <StructuredData locale={locale} dict={dict} page={page} />
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
