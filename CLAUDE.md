# Infra Core — project guide

Bilingual (Georgian default / English) marketing + quote-generation site for
Infra Core, a B2B IT supplier in Georgia. Next.js 14 App Router, static
export, no backend; the quote form posts to Web3Forms.

## Hard rules

- **Content is contractually fixed.** Every user-facing string lives in
  `lib/dictionaries.ts` (ka + en). Never invent, reword, or add claims,
  products, prices, or partners. UI chrome labels (aria-labels) may be
  bilingual ternaries in components.
- **Design contract:** `DESIGN.md` ("Industrial Requisition"). Tokens and
  component grammar live in `app/globals.css`. Orange `--accent` is for
  marks/rules only; text-bearing orange is `--accent-text` (AA on white).
  Mono (`.mono`, IBM Plex Mono) is Latin/digits only — never Georgian.
  Display tier (`.display`) renders Mtavruli capitals in Georgian.
- **Static export constraints:** `output: "export"`, `trailingSlash: true`,
  images unoptimized. GitHub Pages build sets `DEPLOY_TARGET=pages` and
  serves under `/Infra-core` — path-based assets in metadata must use the
  `BP` prefix (see `app/layout.tsx`); static imports are basePath-safe.

## Architecture

- `lib/dictionaries.ts` — all copy, both languages (source of truth).
- `lib/catalog.ts` — category slugs, faithful detail bullets, suppliedBrands.
- `lib/categoryImages.ts` — static imports of `public/assets/categories/*.webp`.
- `lib/site.ts` — contact constants from `NEXT_PUBLIC_*` env vars, with
  `TG_CONFIGURED`/`WA_CONFIGURED` flags (UI hides unconfigured floats).
- `components/LanguageProvider.tsx` — lang state, localStorage persistence,
  per-route document-title map (must mirror layout's `%s — Infra Core`
  template), `html[lang]`/`data-lang` sync. Language-scoped font stacks key
  off `data-lang`.
- `components/useReveal.ts` — scroll reveal; hidden state gated behind
  `html.js-reveal` (no-JS users see everything); re-binds on lang change
  because translated keys remount nodes.
- `components/SiteHeader.tsx` — drawer with inert-based focus containment;
  `currentState()` returns `page`/`true` for exact/section matches.
- Views are client components under `app/**`; `page.tsx` files are server
  components exporting per-page metadata (title/description/canonical/og
  with trailing slashes).
- 404: `app/not-found.tsx` (server, noindex metadata) renders
  `app/NotFoundView.tsx`.

## Env vars (set in Vercel; placeholders render until then)

`NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_PHONE_TEL`,
`NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`,
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.

## Workflow

- Build: `npm run build` (out/). QA: serve `out/` locally and run the
  Playwright pass in both languages at 320–1920px before shipping.
- Deploy: `npx vercel deploy --prod` — **git push does NOT deploy**.
  Production domain: `infra-core-one.vercel.app` (infracoregeorgia.com is
  parked intentionally).
- Conventional commits; commit/push only when asked.
- Acceptance gate for visual changes: side-by-side ka/en screenshots —
  the two languages are typographically different designs.
