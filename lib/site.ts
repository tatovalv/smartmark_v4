export const SITE_URL = "https://smartmarkconsultores.com"
export const EMAIL = "info@smartmarkconsultores.com"

/** Confirm this is the company page before publishing. */
export const LINKEDIN_URL = "https://www.linkedin.com/company/smartmark-consultores"

/**
 * WhatsApp number in international format, digits only.
 * Example for Costa Rica: "50688888888".
 * Leave empty until the number is ready — the button stays hidden.
 */
export const WHATSAPP_NUMBER = ""

export function whatsappHref(message: string): string | null {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "")
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
