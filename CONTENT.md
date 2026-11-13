# Editing the SmartMark Consultores site

The public site is one page in two languages.

- Spanish: `/` (default)
- English: `/en`

Both pages are generated on the server from the same components. Do not put sentences in the React files. Change the copy in the JSON files, keep the same keys in both, and rebuild.

## Copy

| What you want to change | Spanish | English |
| --- | --- | --- |
| Page title and meta description | `content/es.json` → `meta` | `content/en.json` → `meta` |
| Header links and “Agendar conversación” / “Book a call” | `nav` | `nav` |
| Hero, including the trust line | `hero` | `hero` |
| Opening statement | `statement` | `statement` |
| Who we work with, and what changes | `audience`, `outcomes` | `audience`, `outcomes` |
| What we see | `problem` | `problem` |
| How we think about the work | `approach` | `approach` |
| Five services, the “Includes” label, and quote buttons | `services` | `services` |
| Talks band | `services.talks` | `services.talks` |
| How we work | `how` | `how` |
| Why SmartMark | `why` | `why` |
| Use cases | `cases` | `cases` |
| FAQ | `faq` | `faq` |
| Contact heading and location line | `contact` | `contact` |
| Form labels, placeholders, dropdowns, errors | `form` | `form` |
| WhatsApp button label and pre-filled message | `whatsapp` | `whatsapp` |
| Footer sentence and copyright | `footer` | `footer` |
| English-browser banner on the Spanish page | `banner` | `banner` (same wording; the banner is English on purpose) |

Service ids (`workshop`, `assessment`, `automation`, `prompts`, `advisory`, `talks`) and country codes (`CR`, `MX`, `OTHER`, …) must stay identical in both files. The build fails if a key exists in only one language or if one of those ids changes on only one side.

Anchor links are the same in both languages: `#servicios`, `#como-trabajamos`, `#por-que`, `#contacto`.

## Values that are not sentences

Edit `lib/site.ts`:

- `EMAIL` — address shown on the page and used for the mailto link. Current value: `info@smartmarkconsultores.com`
- `WHATSAPP_NUMBER` — digits only, with country code (example: `50688888888`). Leave it empty until you have the number. The floating button and the WhatsApp row stay hidden until this is set. The pre-filled message still comes from `whatsapp.message`.
- `LINKEDIN_URL` — confirm this is the real company page before publishing.
- `SITE_URL` — used for canonical URLs, hreflang, sitemap, and structured data.

The contact form posts to `/api/contact` and sends a hidden `idioma` field (`es` or `en`). Delivery uses the existing Resend setup:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL` (falls back to the inbox already configured in `app/api/contact/route.ts`)

## Brand

Colors live as CSS variables in `app/globals.css`: primary `#10b981`, secondary `#064e3b`, accent `#22d3ee`, text `#0a0a0a`, background `#ffffff`. The logo green `#60E886` is only inside the logo file.

Logo files:

- `public/logo.png` — original
- `public/logo-mark.png` — header logo (dark wordmark, transparent background)
- `public/favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`

Regenerate the derived files with `node scripts/generate-brand-assets.mjs` after replacing `public/logo.png`.
