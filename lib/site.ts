export const SITE_URL = "https://smartmarkconsultores.com"
export const EMAIL = "info@smartmarkconsultores.com"

/** Confirm this is the company page before publishing. */
export const LINKEDIN_URL = "https://www.linkedin.com/company/smartmark-consultores"

/**
 * WhatsApp number in international format, digits only.
 * Example for Costa Rica: "50688888888".
 * Non-digits are ignored, so the placeholder keeps the button hidden until
 * the real number replaces it.
 */
export const WHATSAPP_NUMBER = "[NUMERO_WHATSAPP]"

export function whatsappHref(message: string): string | null {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "")
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
