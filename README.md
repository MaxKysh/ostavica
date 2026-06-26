# Ostavica — landing

Static, multilingual (RU / SR / EN) one-page site for **Ostavica** mini self-storage
in Podbara, Novi Sad. Built with [Astro](https://astro.build) — no UI kit, no heavy
frameworks. Mobile-first, optimized images, ready to deploy to Vercel.

## Run locally

```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:4321
```

Other scripts:

```bash
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

## Languages / routing

- `ru` (default) → `/`
- `en` → `/en/`
- `sr` → `/sr/`

The language switcher (header + footer) keeps the current section anchor when you
switch, sets `<html lang>` and emits `hreflang` tags. Default language follows the
browser locale via Astro's built-in i18n.

**All copy lives in `src/i18n/{ru,sr,en}.json`** — these three files are the single
source of truth. The key structure is identical across all three. To change wording,
edit the matching key in all three files. Components read them via `useTranslations(lang)`
(`src/i18n/ui.js`).

## Where to change things

| What | Where |
| --- | --- |
| **Prices & size labels** | `sizes.cards[].price` / `sizes.cards[].size` **and** `reserve.form.sizeOptions[]` in each `src/i18n/*.json` (keep all three languages in sync) |
| **Form lead endpoint** | set `PUBLIC_LEAD_ENDPOINT` in `.env` (see below) |
| **Form fields / options** | `reserve.form` in `src/i18n/*.json` |
| **Production domain** (canonical / hreflang) | `SITE` in `astro.config.mjs` |
| **Images** | `src/images/` — referenced by filename in the section components |
| **Logo** | `src/images/logo-mark.png` (transparent, brand-green). Generated from the original `logo.jpg`; to regenerate after a logo change, recreate a transparent PNG from the source |
| **Colors / type / spacing** | tokens at the top of `src/styles/global.css` |
| **Founder photo** | `src/images/person.jpg` (swap the file, keep the name) |

### Reservation form endpoint

The form posts JSON to `PUBLIC_LEAD_ENDPOINT`. Set it in a `.env` file
(copy from `.env.example`):

```bash
# .env
PUBLIC_LEAD_ENDPOINT=https://formspree.io/f/your-id
```

- **If set:** leads are `POST`ed as JSON (works with Formspree or any webhook).
- **If empty:** the form still validates and shows the success message, and logs the
  lead to the browser console (`[Ostavica] Lead …`) — handy for local testing.
  See the `TODO` in `src/components/Reserve.astro`.

UTM parameters (`utm_source/medium/campaign/term/content`) and the referrer are read
from the URL and sent as hidden fields for channel attribution. A honeypot field
filters basic bots.

## Still TODO before launch

- [ ] Replace the placeholder OG image: add `public/og-default.png` (1200×630) — ideally
      one per language (see the `ogImage` TODO in `src/layouts/Layout.astro`).
- [ ] Set the real domain in `astro.config.mjs` (`SITE`).
- [ ] Set `PUBLIC_LEAD_ENDPOINT` in the Vercel project env vars.
- [ ] Replace the `[Имя] / [Ime] / [Name]` placeholder in `about.text` with the real name.

## Deploy (later)

Push to a Git host and import into Vercel. Framework preset: **Astro** (zero config).
Add `PUBLIC_LEAD_ENDPOINT` as an environment variable in the Vercel dashboard.

## Tech notes

- **Images:** `astro:assets` (`<Image>`) → automatic WebP + `srcset`, explicit
  dimensions (no layout shift), lazy-loaded below the fold. Quality ~75.
- **Fonts:** Bricolage Grotesque (headings) + Inter (body), self-hosted via
  `@fontsource` — no external requests.
- **JS:** vanilla, no libraries — language switcher, burger menu, FAQ accordion,
  size-card → form prefill, sticky header, and `IntersectionObserver` reveals.
  All animations respect `prefers-reduced-motion`.
