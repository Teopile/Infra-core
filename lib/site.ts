// Centralized contact / integration constants, driven by public env vars so
// they can be set in Vercel without code changes. Placeholders are used until
// the real values (phone, Telegram, WhatsApp, Web3Forms key) are provided.

export const WEB3_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
export const TG_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/";
export const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "995500000000";
export const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+995 5XX XX XX XX";
export const PHONE_TEL = process.env.NEXT_PUBLIC_PHONE_TEL || "+995500000000";
export const EMAIL = "info@infracore-consulting.com";

export const WA_URL = `https://wa.me/${WA_NUMBER}`;
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
