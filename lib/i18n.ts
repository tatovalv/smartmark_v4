import en from "@/content/en.json"
import es from "@/content/es.json"

export type Locale = "es" | "en"
export type Dictionary = typeof es

const dictionaries: Record<Locale, Dictionary> = {
  es,
  en: en as Dictionary,
}

function leaves(value: unknown, prefix: string): string[] {
  if (typeof value === "string") {
    if (value.trim() === "") {
      throw new Error(`Empty translation for "${prefix}"`)
    }
    return [prefix]
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leaves(item, `${prefix}[${index}]`))
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => leaves(child, prefix ? `${prefix}.${key}` : key))
  }

  throw new Error(`Invalid translation at "${prefix || "root"}"`)
}

function assertSameList(label: string, left: string[], right: string[]) {
  if (left.join("|") !== right.join("|")) {
    throw new Error(
      `Translation mismatch for ${label}.\nSpanish: ${left.join(", ")}\nEnglish: ${right.join(", ")}`,
    )
  }
}

function assertParity() {
  const spanishKeys = leaves(es, "").sort()
  const englishKeys = leaves(en, "").sort()
  const missingInEnglish = spanishKeys.filter((key) => !englishKeys.includes(key))
  const missingInSpanish = englishKeys.filter((key) => !spanishKeys.includes(key))

  if (missingInEnglish.length || missingInSpanish.length) {
    throw new Error(
      `Translation key mismatch.\nMissing in en.json: ${missingInEnglish.join(", ") || "none"}\nMissing in es.json: ${missingInSpanish.join(", ") || "none"}`,
    )
  }

  assertSameList(
    "service ids",
    [...es.services.items.map((item) => item.id), es.services.talks.id],
    [...en.services.items.map((item) => item.id), en.services.talks.id],
  )
  assertSameList(
    "country codes",
    es.form.countries.map((country) => country.value),
    en.form.countries.map((country) => country.value),
  )
  assertMetaLength("es", es.meta.pages)
  assertMetaLength("en", en.meta.pages)
}

const META_LIMITS = { title: 60, description: 155 } as const

function assertMetaLength(locale: string, pages: Dictionary["meta"]["pages"]) {
  for (const [page, copy] of Object.entries(pages)) {
    if (copy.title.length > META_LIMITS.title) {
      throw new Error(
        `meta.pages.${page}.title in ${locale}.json is ${copy.title.length} characters (max ${META_LIMITS.title})`,
      )
    }
    if (copy.description.length > META_LIMITS.description) {
      throw new Error(
        `meta.pages.${page}.description in ${locale}.json is ${copy.description.length} characters (max ${META_LIMITS.description})`,
      )
    }
  }
}

let checked = false

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en"
}

export function getDictionary(locale: Locale): Dictionary {
  if (!checked) {
    assertParity()
    checked = true
  }

  return dictionaries[locale]
}

export function serviceOptions(dict: Dictionary) {
  return [
    ...dict.services.items.map((item) => ({ value: item.id, label: item.title })),
    { value: dict.services.talks.id, label: dict.services.talks.title },
  ]
}

export function homePath(locale: Locale) {
  return locale === "en" ? "/en" : "/"
}
