<p align="center">
  <img src="public/brand/lockups/stacked-colour-on-dark.png" alt="ElevatED Learning Partners" width="180" />
</p>

<h1 align="center">ElevatED Learning Partners</h1>

<p align="center">
  <strong>Purposeful learning. Measurable progress.</strong>
</p>

<p align="center">
  The marketing site for ElevatED Learning Partners, LLC — a women-led learning and development partnership helping schools, universities, and organizations design curricula, strengthen instruction, and put thoughtful technology to work.
</p>

<p align="center">
  <a href="https://elevatedlearningpartners.com/">elevatedlearningpartners.com</a>
  ·
  <a href="mailto:team@elevatedlearningpartners.com">team@elevatedlearningpartners.com</a>
</p>

---

## Welcome

This repository powers the public ElevatED presence: offerings, innovation products, selected portfolio work, founder stories, and a Calendly-backed discovery-call flow.

The visual system is intentional and on-brand:

| Token | Role | Mist (light) | Noir (dark) |
| --- | --- | --- | --- |
| Forest | Primary ground / ink | `#0d261d` | deep charcoal surfaces |
| Gold | Accent / CTAs | `#c9a04e` | `#d2aa5c` |
| Sage / mint | Secondary accents | soft greens | lifted greens |
| Cream / paper | Reading surfaces | `#f4f3eb` / `#f4faf6` | inverted paper |

Typography: **Newsreader** for display headlines, **Manrope** for UI and body.

Themes: **Mist** (light) and **Noir** (dark), toggled in the header and persisted locally.

---

## Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- Single stylesheet: `src/styles.css` (design tokens at the top)
- Content modules: `src/data/*`
- Static deploy via DigitalOcean App Platform (`.do/app.yaml`)

---

## Setup

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript project references check |
| `npm test` | Unit smoke tests (Vitest) |

---

## Project map

```
src/
  App.tsx                 # Page composition
  components/             # BrandLockup, CalendlyButton, PersonCard, ProjectModal…
  data/                   # Contact, portfolio, offerings, innovations, site copy
  hooks/                  # Reveal + soft hash scroll
  lib/                    # Calendly loader, theme helpers
  styles.css              # All visual tokens and layout
public/
  brand/                  # Logos, hero, platform, credentials, OG image
  portfolio/              # Project covers and slides
  team/                   # Founder portraits
```

---

## Contact & booking

- Email: `team@elevatedlearningpartners.com`
- Discovery calls: Calendly popup + inline embed (loaded after the page finishes so first paint stays fast)
- WhatsApp helpers live in `src/data/contact.ts`

---

## Production build

```bash
npm run build
npm run preview
```

Output lands in `dist/` and is ready for any static host.

### DigitalOcean App Platform

Cheapest option: App Platform **static site free tier**. Spec: `.do/app.yaml`.

```bash
doctl auth init --access-token YOUR_TOKEN
doctl apps create --spec .do/app.yaml
```

- Build: `npm ci && npm run build`
- Output directory: `dist`
- Deploy on push to `main`

---

## Brand notes for contributors

1. Prefer CSS variables from `:root` — avoid new one-off hex values.
2. Keep Calendly brand query colours in sync with `CALENDLY_BRAND` in `src/data/contact.ts`.
3. Portfolio and team media belong under `public/`; large demos that should not ship stay in `_assets-hold/` (gitignored).
4. Preserve Mist / Noir contrast when adding surfaces.

---

<p align="center">
  <sub>© ElevatED Learning Partners, LLC · Built with care · Powered by DP Tech</sub>
</p>
