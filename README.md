# Infra Core — Website

Production marketing site for **Infra Core**, a B2B IT‑solutions / office‑equipment reseller.
Built with **Next.js (App Router) + TypeScript**, Georgian‑first (KA) with an English (EN) toggle.
Design inspired by [noventiq.ge](https://noventiq.ge) — clean navy + accent‑blue enterprise look.

> All on‑page content is faithful to what the client provided. Phone, the contact‑form key, and
> the Telegram/WhatsApp links are **placeholders** — see [Before going live](#before-going-live).

---

## Stack

- **Next.js 14 (App Router)** + **React 18** + **TypeScript**
- **Static export** (`output: "export"`) — deploys to **GitHub Pages** *and* **Vercel** with no server
- `next/font` self‑hosts **Noto Sans Georgian** (no render‑blocking font request)
- Custom CSS design system in `app/globals.css` (no UI framework)
- Contact form via **Web3Forms** (no backend needed)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Project structure

```
app/
  layout.tsx        # <html>, metadata (SEO/OG/Twitter), JSON‑LD, fonts, viewport
  page.tsx          # the whole UI (client component): sections, nav, form, reveal, i18n toggle
  globals.css       # design tokens + all component styles
  sitemap.ts        # generates /sitemap.xml
  robots.ts         # generates /robots.txt
lib/
  dictionaries.ts   # ALL copy, typed, in KA + EN
public/
  assets/og/og-cover.png        # social share image (1200×630)
  assets/icons/*                # app icons
  site.webmanifest
.github/workflows/deploy.yml     # build + deploy to GitHub Pages on push
```

## Editing content

All text lives in **`lib/dictionaries.ts`** as a typed `ka` / `en` pair. Edit both languages there;
the `Dict` type guarantees nothing is missed. No HTML editing required.

## Language

Georgian is the default; the top‑right `ქარ / EN` toggle swaps all copy and persists the choice in
`localStorage`. The Georgian content is server‑rendered into the static HTML (good for SEO).

---

## Deploy

### Vercel (recommended for production)
1. [vercel.com/new](https://vercel.com/new) → import `Teopile/Infra-core` → **Deploy** (Next.js auto‑detected).
2. Add env vars (below) in **Project → Settings → Environment Variables**.
3. Point a custom domain in **Settings → Domains**; add the Cloudflare DNS record it shows
   (`CNAME → cname.vercel-dns.com`, proxy **DNS only** so Vercel issues SSL).

### GitHub Pages (automatic, free)
`.github/workflows/deploy.yml` builds the static export with `DEPLOY_TARGET=pages`
(serves under `/Infra-core`) and deploys on every push to `main`.
Set the form key as a repo **secret** `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, and the others as repo
**variables** (Settings → Secrets and variables → Actions). Pages must be set to **Source: GitHub Actions**.

---

## Environment variables

Copy `.env.example` → `.env.local` (and set the same in Vercel / GitHub):

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact‑form key — free at [web3forms.com](https://web3forms.com). Until set, the form shows an "email us" message and does not send. |
| `NEXT_PUBLIC_TELEGRAM_URL` | Floating Telegram button target (e.g. `https://t.me/yourhandle`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Floating WhatsApp number (digits only) |
| `NEXT_PUBLIC_PHONE_DISPLAY` / `NEXT_PUBLIC_PHONE_TEL` | Phone shown / dialed |

> **Form upgrade path:** the form currently posts to Web3Forms client‑side (works on static hosting).
> Once on Vercel you can add a server route (`app/api/contact/route.ts`) that forwards to a **Telegram
> bot** + email using server‑only secrets — remove `output: "export"` from `next.config.mjs` to enable it.

---

## Before going live

| Placeholder | Set via |
|---|---|
| 📞 Phone (`+995 5XX XX XX XX`) | `NEXT_PUBLIC_PHONE_*` env vars |
| 📨 Contact form | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` |
| ✈️/💬 Telegram + WhatsApp | `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| 🔗 canonical/OG domain | `SITE_URL` in `app/layout.tsx` + URLs in `app/sitemap.ts` / `app/robots.ts` |

**Content/legal notes:** brand band shows only client‑named brands (Beelink, Jabra); keep vendor wording
as "we supply / official warranty" and only add an "authorized partner" badge for brands with a real
agreement. Add the real legal entity (name + VAT/ID) and a Privacy Policy before launch.

## Accessibility & SEO

Skip link, visible dual‑contrast focus rings, labelled inputs + `aria-invalid`, mobile‑nav focus trap +
`inert`, `prefers-reduced-motion` respected; per‑request metadata, JSON‑LD `LocalBusiness`, generated
sitemap/robots, optimized self‑hosted font.
