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
| The results we aim for | `outcomes` | `outcomes` |
| What we see | `problem` | `problem` |
| How we think about the work | `approach` | `approach` |
| Five services, the “Includes” label, and quote buttons | `services` | `services` |
| Talks band | `services.talks` | `services.talks` |
| How we work | `how` | `how` |
| Why SmartMark | `why` | `why` |
| Use cases, including the longer explanation inside each dialog | `cases` | `cases` |
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
- `WHATSAPP_NUMBER` — replace `[NUMERO_WHATSAPP]` with the number, digits only and with country code (example: `50688888888`). While the placeholder is there, the floating button, the WhatsApp row and the WhatsApp button in the final CTA stay hidden. The pre-filled message still comes from `whatsapp.message`.
- `LINKEDIN_URL` — confirm this is the real company page before publishing.
- `SITE_URL` — used for canonical URLs, hreflang, sitemap, and structured data.

The contact form posts to `/api/contact` and sends a hidden `idioma` field (`es` or `en`). Delivery uses Resend. Set these environment variables in AWS Amplify (and in `.env.local` to test locally):

- `RESEND_API_KEY` — required. Without it, the form shows the error message.
- `RESEND_FROM_EMAIL` — an address on `smartmarkconsultores.com` (for example `web@smartmarkconsultores.com`), after verifying the domain in Resend. If it is missing, the API sends from `onboarding@resend.dev`, which is only for testing and usually lands in spam.
- `RESEND_TO_EMAIL` — the inbox that receives the leads. Falls back to `info@smartmarkconsultores.com`.

Spam protection in `app/api/contact/route.ts`: a hidden `website` field (honeypot), a 3-second minimum between loading the form and sending it, and a limit of 5 submissions per IP every 10 minutes. The limit is kept in memory, so it resets on each deploy; move it to a shared store if spam grows. Blocked submissions get a normal success response but no email is sent.

The form preselects the service from `?servicio=<id>` (Spanish) or `?service=<id>` (English). The ids are the ones in `services.items[].id` and `services.talks.id`.

## Brand

Colors live as CSS variables in `app/globals.css`: primary `#10b981`, secondary `#064e3b`, accent `#22d3ee`, text `#0a0a0a`, background `#ffffff`. The logo green `#60E886` is only inside the logo file.

Logo files:

- `public/logo.png` — original
- `public/logo-mark.png` — header logo (dark wordmark, transparent background)
- `public/favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`

Regenerate the derived files with `node scripts/generate-brand-assets.mjs` after replacing `public/logo.png`.
