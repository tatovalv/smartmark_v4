"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { track } from "@/lib/analytics"
import type { Dictionary, Locale } from "@/lib/i18n"
import { EMAIL } from "@/lib/site"

type FormCopy = Dictionary["form"]
type Option = { value: string; label: string }
type Status = "idle" | "sending" | "success" | "error"
type Errors = Partial<Record<"name" | "company" | "email" | "phone" | "contactMethod" | "country" | "service" | "message", string>>

const empty = {
  name: "",
  company: "",
  email: "",
  phone: "",
  contactMethod: "",
  country: "",
  service: "",
  message: "",
}

export function ContactForm({
  locale,
  copy,
  services,
  privacyHref,
}: {
  locale: Locale
  copy: FormCopy
  services: Option[]
  privacyHref: string
}) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [website, setWebsite] = useState("")
  const loadedAt = useRef(0)

  useEffect(() => {
    loadedAt.current = Date.now()
  }, [])

  const selectService = useCallback((selected: string) => {
    setValues((current) => ({ ...current, service: selected }))
    setErrors((current) => ({ ...current, service: undefined }))
  }, [])

  function update(field: keyof typeof empty, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status === "error") setStatus("idle")
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Errors = {}
    if (!values.name.trim()) next.name = copy.required
    if (!values.company.trim()) next.company = copy.required
    if (!values.email.trim()) next.email = copy.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = copy.emailInvalid
    if (!values.contactMethod) next.contactMethod = copy.required
    else if (values.contactMethod !== "email" && !values.phone.trim()) next.phone = copy.phoneNeeded
    if (!values.country) next.country = copy.required
    if (!values.service) next.service = copy.required
    if (!values.message.trim()) next.message = copy.required
    setErrors(next)

    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus("sending")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          company: values.company.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          contactMethod: values.contactMethod,
          country: values.country,
          service: values.service,
          message: values.message.trim(),
          idioma: locale,
          website,
          elapsed: loadedAt.current ? Date.now() - loadedAt.current : 0,
        }),
      })
      if (!response.ok) {
        setStatus("error")
        return
      }
      setValues(empty)
      track("generate_lead")
      setStatus("success")
      document.getElementById("form-success")?.focus()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        id="form-success"
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-brand-surface p-6 text-base leading-relaxed outline-none"
      >
        {copy.success}
      </div>
    )
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="idioma" value={locale} />
      <Suspense fallback={null}>
        <ServiceFromUrl locale={locale} services={services} onSelect={selectService} />
      </Suspense>
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <p className="text-sm text-brand-muted">{copy.requiredNote}</p>

      {status === "error" ? (
        <p role="alert" className="rounded-2xl bg-brand-surface px-4 py-3 text-sm font-medium text-brand-secondary">
          {copy.error}{" "}
          <a className="underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
      ) : null}

      <Field id="name" label={copy.name} required error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder={copy.namePlaceholder}
          value={values.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={(event) => update("name", event.target.value)}
        />
      </Field>
      <Field id="company" label={copy.company} required error={errors.company}>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder={copy.companyPlaceholder}
          value={values.company}
          aria-invalid={errors.company ? true : undefined}
          aria-describedby={errors.company ? "company-error" : undefined}
          onChange={(event) => update("company", event.target.value)}
        />
      </Field>
      <Field id="email" label={copy.email} required error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={copy.emailPlaceholder}
          value={values.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(event) => update("email", event.target.value)}
        />
      </Field>
      <Field id="phone" label={copy.phone} error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={copy.phonePlaceholder}
          value={values.phone}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          onChange={(event) => update("phone", event.target.value)}
        />
      </Field>
      <Field id="contactMethod" label={copy.contactMethod} required error={errors.contactMethod}>
        <select
          id="contactMethod"
          name="contactMethod"
          value={values.contactMethod}
          aria-invalid={errors.contactMethod ? true : undefined}
          aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}
          onChange={(event) => {
            update("contactMethod", event.target.value)
            setErrors((current) => ({ ...current, phone: undefined }))
          }}
        >
          <option value="">{copy.contactMethodPlaceholder}</option>
          {copy.contactMethods.map((method) => (
            <option key={method.value} value={method.value}>
              {method.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="country" label={copy.country} required error={errors.country}>
        <select
          id="country"
          name="country"
          autoComplete="country"
          value={values.country}
          aria-invalid={errors.country ? true : undefined}
          aria-describedby={errors.country ? "country-error" : undefined}
          onChange={(event) => update("country", event.target.value)}
        >
          <option value="">{copy.countryPlaceholder}</option>
          {copy.countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="service" label={copy.service} required error={errors.service}>
        <select
          id="service"
          name="service"
          value={values.service}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? "service-error" : undefined}
          onChange={(event) => update("service", event.target.value)}
        >
          <option value="">{copy.servicePlaceholder}</option>
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="message" label={copy.message} required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={copy.messagePlaceholder}
          value={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? copy.sending : copy.submit}
      </button>
      <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
        {copy.privacyBefore}{" "}
        <a href={privacyHref} className="font-medium text-brand-secondary underline underline-offset-4">
          {copy.privacyLink}
        </a>
        .
      </p>
    </form>
  )
}

function ServiceFromUrl({
  locale,
  services,
  onSelect,
}: {
  locale: Locale
  services: Option[]
  onSelect: (value: string) => void
}) {
  const selected = useSearchParams().get(locale === "en" ? "service" : "servicio")

  useEffect(() => {
    if (selected && services.some((service) => service.value === selected)) onSelect(selected)
  }, [selected, services, onSelect])

  return null
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        {required ? (
          <abbr className="ml-1 text-brand-secondary no-underline" title={label}>
            *
          </abbr>
        ) : null}
      </span>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-brand-secondary" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  )
}
