"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import type { Dictionary, Locale } from "@/lib/i18n"
import { EMAIL } from "@/lib/site"

type FormCopy = Dictionary["form"]
type Option = { value: string; label: string }
type Status = "idle" | "sending" | "success" | "error"
type Errors = Partial<Record<"name" | "company" | "role" | "email" | "country" | "service" | "message", string>>

const empty = {
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  country: "",
  service: "",
  message: "",
}

export function ContactForm({
  locale,
  copy,
  services,
}: {
  locale: Locale
  copy: FormCopy
  services: Option[]
}) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")

  useEffect(() => {
    const apply = () => {
      const selected = new URLSearchParams(window.location.search).get("servicio")
      if (selected && services.some((service) => service.value === selected)) {
        setValues((current) => ({ ...current, service: selected }))
        setErrors((current) => ({ ...current, service: undefined }))
      }
    }
    apply()
    const onSelect = (event: Event) => {
      const selected = (event as CustomEvent<string>).detail
      if (!services.some((service) => service.value === selected)) return
      setValues((current) => ({ ...current, service: selected }))
      setErrors((current) => ({ ...current, service: undefined }))
    }
    window.addEventListener("sm:select-service", onSelect)
    window.addEventListener("popstate", apply)
    return () => {
      window.removeEventListener("sm:select-service", onSelect)
      window.removeEventListener("popstate", apply)
    }
  }, [services])

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
    if (!values.role.trim()) next.role = copy.required
    if (!values.email.trim()) next.email = copy.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = copy.emailInvalid
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
          role: values.role.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          country: values.country,
          service: values.service,
          message: values.message.trim(),
          idioma: locale,
        }),
      })
      if (!response.ok) {
        setStatus("error")
        return
      }
      setValues(empty)
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
      <Field id="role" label={copy.role} required error={errors.role}>
        <input
          id="role"
          name="role"
          autoComplete="organization-title"
          placeholder={copy.rolePlaceholder}
          value={values.role}
          aria-invalid={errors.role ? true : undefined}
          aria-describedby={errors.role ? "role-error" : undefined}
          onChange={(event) => update("role", event.target.value)}
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
      <Field id="phone" label={copy.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={copy.phonePlaceholder}
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
        />
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
    </form>
  )
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
