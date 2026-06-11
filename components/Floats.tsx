"use client";

import { useLang } from "./LanguageProvider";
import { TG_CONFIGURED, TG_URL, WA_CONFIGURED, waHref } from "@/lib/site";

/**
 * Fixed Telegram + WhatsApp quick-contact buttons (hidden on small screens
 * via CSS). Each button renders only once its real destination is configured
 * through the env vars — placeholder links would be dead ends.
 */
export function Floats() {
  const { t, lang } = useLang();
  if (!TG_CONFIGURED && !WA_CONFIGURED) return null;
  return (
    <div className="floats" aria-label={lang === "ka" ? "სწრაფი კონტაქტი" : "Quick contact"}>
      {TG_CONFIGURED ? (
        <a className="float float--tg" href={TG_URL} target="_blank" rel="noopener noreferrer" aria-label={t.floats.tg}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.6 13.2 1.8 11.7c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3z" /></svg>
        </a>
      ) : null}
      {WA_CONFIGURED ? (
        <a className="float float--wa" href={waHref(lang)} target="_blank" rel="noopener noreferrer" aria-label={t.floats.wa}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.5 0 .1 0 .5-.1.9z" /></svg>
        </a>
      ) : null}
    </div>
  );
}
