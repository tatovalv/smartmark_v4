# Editing the SmartMark Consultores site

The public site is a bilingual Next.js app (App Router). Spanish has no prefix. English lives under `/en`.

| Page | Spanish | English |
| --- | --- | --- |
| Home | `/` | `/en` |
| Services | `/servicios` | `/en/services` |
| Use cases | `/casos-de-uso` | `/en/use-cases` |
| How we work | `/como-trabajamos` | `/en/how-we-work` |
| Why SmartMark | `/por-que-smartmark` | `/en/why-smartmark` |
| Contact | `/contacto` | `/en/contact` |
| Privacy | `/privacidad` | `/en/privacy` |

Privacy is in the footer and the sitemap (low priority). It is not in the main menu. The 404 page is `noindex`.

Both languages are generated on the server from the same components. Do not put sentences in the React files. Change the copy in the JSON files, keep the same keys in both, and rebuild. `lib/i18n.ts` fails the build if a key exists in only one language, if a meta title is over 60 characters, or if a meta description is over 155.

## Copy

| What you want to change | Spanish | English |
| --- | --- | --- |
| Page title and meta description | `content/es.json` → `meta.pages` | `content/en.json` → `meta.pages` |
| Header links and “Agendar conversación” / “Book a call” | `nav` | `nav` |
| Hero, including the eyebrow and the trust line | `hero` | `hero` |
| Three pillars and the closing line | `position` | `position` |
| The results we aim for | `outcomes` | `outcomes` |
| Why AI still isn't paying off | `problem` | `problem` |
| How we think about the work | `approach` | `approach` |
| Six services, audience, outcome, format, and quote buttons | `services` | `services` |
| Questions at the bottom of the services page | `services.faq` | `services.faq` |
| Talks band | `services.talks` | `services.talks` |
| How we work, including how we protect information | `how` | `how` |
| Why SmartMark, including the four stats | `why` | `why` |
| Use cases. Each card links to one service and to the workshop | `cases` | `cases` |
| Home FAQ | `faq` | `faq` |
| Contact heading | `contact` | `contact` |
| Form labels, placeholders, dropdowns, errors, and the privacy notice | `form` | `form` |
| Privacy policy. Fill every `[PLACEHOLDER]` before publishing | `privacy` | `privacy` |
| WhatsApp button label and pre-filled message | `whatsapp` | `whatsapp` |
| Footer sentence, privacy link, and copyright | `footer` | `footer` |
| Closing band on each page | `finalCta` | `finalCta` |
| English-browser banner on the Spanish page | `banner` | `banner` (same wording; the banner is English on purpose) |

Service ids (`workshop`, `assessment`, `automation`, `prompts`, `advisory`, `talks`) and country codes (`CR`, `MX`, `OTHER`, …) must stay identical in both files.

Case cards point at a service anchor on the services page (`#automation`, `#prompts`, or `#assessment`) and a second link points at `#workshop`.

The privacy policy has a source comment, “Revisar con un abogado antes de publicar.” The analytics section of that page is rendered only when `NEXT_PUBLIC_GA_ID` is a Google Analytics id (`G-…`).

## Values that are not sentences

Edit `lib/site.ts`:

- `EMAIL` — address shown on the page, in the privacy policy, and used for the mailto link. Current value: `info@smartmarkconsultores.com`
- `WHATSAPP_NUMBER` — replace `[NUMERO_WHATSAPP]` with the number, digits only and with country code (example: `50688888888`). While the placeholder is there, the floating button, the WhatsApp row, and the WhatsApp button in the final CTA stay hidden. The pre-filled message still comes from `whatsapp.message`.
- `BOOKING_URL` — optional. Leave it empty and every “Agendar” / “Book a call” button goes to the contact page. Set a Calendly or Microsoft Bookings URL and those buttons open it in a new tab.
- `LINKEDIN_URL` — confirm this is the real company page before publishing.
- `SITE_URL` — used for canonical URLs, hreflang, sitemap, and structured data.

`PAGE_UPDATED` in `lib/routes.ts` is the `lastmod` date in the sitemap. Change it only when that page’s content changes.

The contact form posts to `/api/contact` and sends a hidden `idioma` field (`es` or `en`). Delivery uses Resend. Set these environment variables in AWS Amplify (and in `.env.local` to test locally):

- `RESEND_API_KEY` — required. Without it, the form shows the error message.
- `RESEND_FROM_EMAIL` — an address on `smartmarkconsultores.com` (for example `web@smartmarkconsultores.com`), after verifying the domain in Resend. If it is missing, the API sends from `onboarding@resend.dev`, which is only for testing and usually lands in spam.
- `RESEND_TO_EMAIL` — the inbox that receives the leads. Falls back to `info@smartmarkconsultores.com`.
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 id (`G-…`). When it is set, the site loads Analytics and the privacy policy shows the analytics section.
- `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console verification token. When it is set, the layout adds the matching meta tag.
- `ADMIN_USER`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` — required for the admin panel at `/admin`. Set all three in `.env.local` and in Amplify. The session secret is a long random string used to sign the login cookie. Do not commit these values.

Contact submissions are stored in `data/inquiries.json` (not committed) and shown in the admin panel, where each one can be marked unread, read, or replied. The form still succeeds when `RESEND_API_KEY` is missing: the message is kept in the panel and no email is sent. When the key is set, the email goes out through Resend as well. On AWS Amplify the server disk is temporary, so that file does not survive a new deploy; a database is needed before relying on the panel in production.

Spam protection in `app/api/contact/route.ts`: a hidden `website` field (honeypot), a 3-second minimum between loading the form and sending it, and a limit of 5 submissions per IP every 10 minutes. The limit is kept in memory, so it resets on each deploy; move it to a shared store if spam grows. Blocked submissions get a normal success response but no email is sent.

The form preselects the service from `?servicio=<id>` (Spanish) or `?service=<id>` (English). The ids are the ones in `services.items[].id` and `services.talks.id`.

## Brand

Colors live as CSS variables in `app/globals.css`: primary `#10b981`, secondary `#064e3b`, accent `#22d3ee`, text `#0a0a0a`, background `#ffffff`. The logo green `#60E886` is only inside the logo file.

Logo files:

- `public/logo.png` — original
- `public/logo-mark.png` — header logo (dark wordmark, transparent background)
- `public/favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`

Regenerate the derived files with `node scripts/generate-brand-assets.mjs` after replacing `public/logo.png`.
