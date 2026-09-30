# Manvi International Courier — Codebase Context

## Project Overview

This is the **Manvi International Courier** public-facing marketing and operations website. It is a **Next.js 16** app (App Router) built with **React 19**, **TypeScript**, and **Tailwind CSS v4**.

The site serves as the primary customer touchpoint for an international courier company based in New Delhi, India, shipping to the USA, UK, Canada, Europe, Australia, and other destinations worldwide.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| UI Library | React 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) |
| Icons | `lucide-react` v1.16 |
| Fonts | Geist Sans, Geist Mono, League Spartan (Google Fonts via `next/font`) |
| Analytics | Google Tag Manager + Google Analytics 4 |
| Excel export | `exceljs`, `file-saver`, `xlsx` |
| Markdown | `react-markdown` |
| Carousel | `react-slick` + `slick-carousel` |

---

## Commands

```bash
npm run dev      # Start local dev server (Next.js on port 3000)
npm run build    # Build production bundle
npm run start    # Serve production build
npm run lint     # Run ESLint
npx tsc --noEmit # TypeScript type check without emitting files
```

> **Note:** There is a separate backend Node/Express server at `d:\projects github\M5C\manvi-node-server` that runs on port `5000`. API calls from the frontend are proxied via Next.js rewrites: `/api/:path*` -> `http://localhost:5000/:path*`.

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout — fonts, metadata, GTM/GA scripts, JSON-LD schema
│   ├── page.tsx                # Home page (/)
│   ├── globals.css             # Global CSS (Tailwind base + custom utilities)
│   ├── about/                  # /about
│   ├── admin/                  # Admin dashboard (protected)
│   │   └── (dashboard)/        # Grouped admin routes
│   ├── api/track/              # Internal Next.js API route for shipment tracking
│   ├── blog/                   # /blog + article data (data.ts)
│   ├── business-campaign/      # /business-campaign
│   ├── campaign/               # /campaign
│   ├── career/                 # /career — job listings + ApplyModal + SpeculativeApplyModal
│   ├── contact/                # /contact
│   ├── faq/                    # /faq
│   ├── mandatory-policy/       # /mandatory-policy — KYC/aviation/legal compliance page
│   ├── pickup-availability/    # /pickup-availability
│   ├── privacy-policy/         # /privacy-policy
│   ├── quote/                  # /quote
│   ├── refund-policy/          # /refund-policy
│   ├── services/               # /services
│   ├── shipping-policy/        # /shipping-policy
│   ├── terms-and-conditions/   # /terms-and-conditions
│   ├── track/                  # /track — shipment tracking UI
│   ├── zipcode/                # /zipcode — serviceability checker + zipCodeData.js
│   ├── robots.ts               # Robots.txt generation
│   └── sitemap.ts              # Sitemap generation
│
├── components/                 # Shared React components
│   ├── Header.tsx              # Sticky top nav with mobile menu
│   ├── Footer.tsx              # Footer with address, socials, links
│   ├── Hero.tsx                # Home hero section
│   ├── AboutUs.tsx             # About section
│   ├── GetQuote.tsx            # Quote form component
│   ├── PolicySidebar.tsx       # Reusable sticky sidebar for policy pages (TOC + contact widget)
│   ├── ManviChatBot.tsx        # In-page AI chatbot widget
│   ├── ManviWhatsApp.tsx       # Floating WhatsApp button
│   ├── CampaignPage.tsx        # Full campaign landing page
│   ├── BusinessCampaignPage.tsx
│   ├── ScrollReveal.tsx        # Scroll-triggered animation wrapper
│   └── ...
│
├── context/
│   └── LanguageContext.tsx     # Global i18n state — supported languages: en, hi, pa, fr, es
│
└── lib/                        # Utility helpers
```

---

## Key Patterns & Conventions

### Styling
- **Tailwind CSS v4** is used throughout. Import is `@import "tailwindcss"` in `globals.css`.
- Brand colours are defined as CSS variables in `:root` and exposed to Tailwind via `@theme inline`:
  - **Primary orange:** `#f27a1a` (`--primary-orange`, `var(--color-brand-orange)`)
  - **Dark navy:** `#0d1527` (`--dark-navy`, `var(--color-brand-navy)`)
  - **Soft gray background:** `#f8fafc` (`--soft-gray`)
- Policy-page hero sections use `bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#334155]`.
- Prefer inline Tailwind classes over ad-hoc CSS. Custom global utilities go in `globals.css`.

### Internationalisation (i18n)
- All user-facing strings on pages that support multiple languages (e.g. contact, career, track) live inside the page file itself as a `translations` object keyed by `Language` (`en | hi | pa | fr | es`).
- The `LanguageContext` (`src/context/LanguageContext.tsx`) is a massive 2800+ line file holding translations for shared/footer strings. Prefer adding page-level translations directly in the page file unless the string is needed across multiple pages.
- The active language is read via `useLanguage()` hook from `LanguageContext`.

### Policy Pages
All policy pages share the same layout structure:
1. Dark hero section with page title, description, and a metadata badge row (Legal Name + Website).
2. `<main>` using a 12-column grid: `PolicySidebar` (4 cols) + article content (8 cols).
3. `PolicySidebar` accepts `items` (TOC entries), optional `supportWidget`, and auto-highlights the active section on scroll.
4. **Effective Date has been removed** from all policy headers — do not add it back.

### Address
The canonical company address is:
```
C1034, A 2ND FLOOR, HARIJAN BASTI, PALAM EXTN, PART-1 RAMPHAL CHOWK, NEW DELHI, INDIA, 110045
```
This appears in: `Footer.tsx`, `contact/page.tsx`, `shipping-policy/page.tsx`, `refund-policy/page.tsx`, `mandatory-policy/page.tsx`, and the JSON-LD schema in `layout.tsx`.

### API / Backend Proxy
- `next.config.ts` rewrites `/api/*` to the Node.js backend at `NEXT_PUBLIC_API_URL` (default: `http://localhost:5000`).
- The only internal Next.js API route is `/api/track` (for shipment tracking).
- All other data fetching (quotes, jobs, newsletter, admin) goes through the proxied `/api/` path to the external backend.

### Admin Section
- Located at `src/app/admin/(dashboard)/`.
- Contains sub-pages: jobs, settings, newsletter, service-mapping.
- Uses `exceljs`/`xlsx` for spreadsheet export functionality.

### TypeScript
- `tsconfig.json` uses path alias `@/` -> `src/`.
- `ignoreBuildErrors: true` is set in `next.config.ts` — type errors will not break the build, but always run `npx tsc --noEmit` to verify type safety before committing.

### Performance
- `optimizeCss: true` (via `critters` for critical CSS inlining).
- `optimizePackageImports: ["lucide-react"]` for tree-shaking.
- Google fonts loaded with `display: "swap"` and `preload: true`.
- GTM/GA scripts use `strategy="lazyOnload"`.

---

## Company Information

| Field | Value |
|---|---|
| Company Name | Manvi International Courier |
| Website | manvicourier.com |
| Phone | +91 7070506070 |
| Email | info@manvicourier.com |
| Address | C1034, A 2ND FLOOR, HARIJAN BASTI, PALAM EXTN, PART-1 RAMPHAL CHOWK, NEW DELHI, INDIA, 110045 |
| Business Hours | Mon–Sat, 10:00–21:00 IST |
| Supported Languages | English, Hindi, Punjabi, French, Spanish |
| Destinations | USA, UK, Canada, Europe, Australia, and more |

---

## Do Not

- Do **not** add an "Effective Date" badge to any policy page header.
- Do **not** use the old address (`C-699, Palam Extension, Sector 7, Dwarka, New Delhi, 110077` or `Shiksha Bharti / Agroha` references) — they are outdated.
- Do **not** change `ignoreBuildErrors` in `next.config.ts` — always check types manually.
- Do **not** install TailwindCSS v3 utilities or use `@apply` with v3 syntax — this project uses Tailwind v4.
