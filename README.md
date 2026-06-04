# Infra Core — Website

Georgian-first (KA) marketing site for **Infra Core**, a B2B IT-solutions / office-equipment reseller.
Design inspired by [noventiq.ge](https://noventiq.ge): clean enterprise look, navy + accent-blue,
dark product-card grid, dark footer. Built as a **dependency-free static site** (HTML + CSS + vanilla JS) —
no build step, hosts anywhere.

> Status: **prototype / v1** to show stakeholders. Phone, email and a few claims are **placeholders** —
> see [Before going live](#before-going-live).

---

## Run locally

It's a static site, so just open `index.html` — or serve it (recommended, so the fonts/form behave like production):

```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080

# …or Node
npx serve .
```

## File structure

```
.
├── index.html            # the whole landing page (Georgian default, EN via toggle)
├── assets/
│   ├── css/styles.css    # design tokens + all components
│   └── js/
│       ├── i18n.js       # KA/EN dictionary + language toggle
│       └── main.js       # nav, scroll reveal, form submit
└── README.md
```

## Sections

Top bar (phone/email + KA/EN switch) → sticky header → **Hero** → What-we-do → **Products grid**
(Computers/Mini-PC, Monitors, Networking, Printers, Jabra headsets, Software) → **Services**
(warranty, delivery & deployment, support, IT infrastructure) → **Why us** (warranty/SLA promises) →
**Brands** → **How we work** (3 steps) → **Contact / quote form** → dark footer + floating Telegram/WhatsApp.

---

## Bilingual content (KA / EN)

- Georgian is the **default** and lives directly in `index.html`.
- English translations live in `assets/js/i18n.js` (`EN` object), keyed by each element's `data-i18n` attribute.
- The toggle (top-right `ქარ / EN`) swaps text and remembers the choice in `localStorage`.

**To edit copy:** change the Georgian in `index.html` *and* the matching key's English in `i18n.js`.
To add a new translatable element, give it `data-i18n="some_key"` and add `some_key` to the `EN` object.

---

## Wiring the contact form

The form (name, company, phone, email, sector, message, consent) uses **[Web3Forms](https://web3forms.com)** —
free, no backend, unlimited submissions. Until it's configured, the form shows a friendly "not configured yet"
message and does **not** send.

### 1) Get an access key
1. Go to **web3forms.com**, enter the destination email (e.g. `info@infracore-consulting.com`), get an **Access Key**.
2. In `index.html`, replace the placeholder:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```
   with your real key. That's it — submissions now arrive by **email**.

### 2) Add a Telegram notification (recommended — instant, on every phone)
This is the "notify us on a phone" channel. Two ways:

- **Easiest:** in the Web3Forms dashboard, add the **Telegram** integration and connect your bot/chat.
- **Manual bot:**
  1. In Telegram, message **@BotFather** → `/newbot` → copy the **bot token**.
  2. Add the bot to your team group, then open
     `https://api.telegram.org/bot<TOKEN>/getUpdates` to find the group's **chat_id**.
  3. Route the form to it via the Web3Forms webhook + **Make.com** (free tier), or a tiny serverless function
     calling `https://api.telegram.org/bot<TOKEN>/sendMessage`.

> **Note on "Facebook":** pushing form leads *into* a Facebook/Messenger inbox is unreliable (Meta's 24-hour
> messaging window + 2025–26 API limits). Use the **Messenger chat button** for visitors, and **Telegram + email**
> for the actual lead delivery. WhatsApp click-to-chat is wired on the floating button.

### 3) Spam & consent (already in place)
- **Honeypot** (`botcheck`) hidden field — drops bots automatically.
- **Consent checkbox** is required before submit. If you collect data, publish a short **Privacy Policy** and
  link it from the consent text (Georgian data-protection law tracks GDPR — confirm wording with counsel).
- Add **Cloudflare Turnstile / hCaptcha** in the Web3Forms dashboard if spam appears.

---

## Deploy (free)

Any static host works. Drag-and-drop the folder to **Netlify**, import to **Vercel**, or use **Cloudflare Pages**
/ **GitHub Pages**. No build command, output dir = project root.

---

## Before going live (replace placeholders)

| Placeholder | Where | Replace with |
|---|---|---|
| `+995 500 00 00 00` | `index.html` (top bar, contact, footer) | real phone |
| `YOUR_WEB3FORMS_ACCESS_KEY` | `index.html` form | real Web3Forms key |
| `https://t.me/` | floating Telegram button | real Telegram link |
| `https://wa.me/995500000000` | floating WhatsApp button | real WhatsApp number |
| `ორშ–პარ 10:00–19:00` | top bar / footer | real business hours |
| SLA numbers (4h / 2 days) | `index.html` + `i18n.js` (`pr2_*`, `pr3_*`) | confirmed real SLAs |
| Brands list | `index.html` `#vendors` | only brands you actually supply |
| `why_note` ("years of experience") | `index.html` + `i18n.js` | real team background |

**Legal/trust notes (from the research):**
- Keep vendor wording as **"we supply / official warranty"**. Only show an **"authorized partner"** badge for a brand
  you hold a current agreement with.
- Do **not** print "Microsoft Gold" or "Cisco Gold/Premier" — those tiers are retired (Microsoft → Solutions Partner;
  Cisco → Cisco 360). The current list avoids badges by design.
- Add real legal identity (company name + VAT/ID), a physical address + map, and a Privacy Policy page before launch.

---

## Accessibility & quality

- WCAG-minded: skip link, visible focus rings, labelled inputs, `aria` on icon buttons, `prefers-reduced-motion` respected.
- Responsive at 375 / 768 / 1024 / 1440 px.
- No external JS/CSS dependencies (only Google Fonts: Noto Sans Georgian).

## Next steps (phase 2)

Sub-pages (per product category + per service), a real **Our Work** page once deployments exist,
optional cart/installment checkout, blog for SEO. Can be ported into Astro/Next.js later if a CMS is wanted.
