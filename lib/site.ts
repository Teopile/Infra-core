// Centralized contact / integration constants, driven by public env vars so
// they can be set in Vercel without code changes. Placeholders are used until
// the real values (phone, Telegram, WhatsApp, Web3Forms key) are provided.

import type { Lang } from "./dictionaries";

export const WEB3_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
export const TG_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/";
export const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "995500000000";
export const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+995 5XX XX XX XX";
export const PHONE_TEL = process.env.NEXT_PUBLIC_PHONE_TEL || "+995500000000";
export const EMAIL = "info@infracore-consulting.com";

export const WA_URL = `https://wa.me/${WA_NUMBER}`;

/* Social channels — render-nothing-until-configured, like WA/TG. FB uses a
   page slug so both the page link and the m.me messaging link derive from
   one value. */
export const FB_PAGE = process.env.NEXT_PUBLIC_FACEBOOK_PAGE || "";
export const FB_CONFIGURED = Boolean(FB_PAGE);
export const FB_URL = `https://facebook.com/${FB_PAGE}`;
export const FB_MSG_URL = `https://m.me/${FB_PAGE}`;
export const LI_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";
export const LI_CONFIGURED = Boolean(LI_URL);

/* Locale-matched WhatsApp deep link with the stakeholder-approved prefill. */
const WA_PREFILL: Record<Lang, string> = {
  ka: "გამარჯობა, თქვენი საიტიდან გწერთ — ",
  en: "Hello, I'm writing from your website — ",
};

export const waHref = (lang: Lang): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_PREFILL[lang])}`;
export const PHONE_HREF = `tel:${PHONE_TEL}`;
export const EMAIL_HREF = `mailto:${EMAIL}`;

/* True only when the real value is configured; UI hides dead placeholder
   buttons (e.g. a Telegram link that points at bare t.me) until then. */
export const TG_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_TELEGRAM_URL);
export const WA_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

/* Share image for per-page openGraph blocks. Next replaces a parent's
   openGraph wholesale when a page defines its own, so pages must restate
   the image. DEPLOY_TARGET is build-time-only (server metadata path). */
const BP = process.env.DEPLOY_TARGET === "pages" ? "/Infra-core" : "";
export const OG_IMAGE = `${BP}/assets/og/og-cover.png`;
