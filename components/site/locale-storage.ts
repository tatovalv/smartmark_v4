export const LOCALE_KEY = "smartmark-locale"
export const BANNER_KEY = "smartmark-en-banner-dismissed"

export function rememberLocale(locale: "es" | "en") {
  try {
    localStorage.setItem(LOCALE_KEY, locale)
  } catch {
    /* Storage can be blocked. The explicit URL choice still works. */
  }
}

export function readStorage(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
