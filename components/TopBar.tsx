"use client";

import { useLang } from "./LanguageProvider";
import { icoMail, icoPhone, icoWa } from "./icons";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, WA_CONFIGURED, waHref } from "@/lib/site";

/**
 * Coal utility strip, sticky above the header. Contacts are mono
 * (Latin/digits); the locale note is body-voice; language switch right.
 */
export function TopBar() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__contacts">
          <a href={PHONE_HREF} className="topbar__link">{icoPhone}{PHONE_DISPLAY}</a>
          {WA_CONFIGURED ? (
            <a href={waHref(lang)} className="topbar__link" target="_blank" rel="noopener" aria-label={t.floats.wa}>{icoWa}WhatsApp</a>
          ) : null}
          <a href={EMAIL_HREF} className="topbar__link">{icoMail}{EMAIL}</a>
          <span className="topbar__note">{t.footer.built}</span>
        </div>
        <div className="langswitch" role="group" aria-label="Language / ენა">
          <button type="button" className={`langswitch__btn${lang === "ka" ? " is-active" : ""}`} aria-pressed={lang === "ka"} lang="ka" onClick={() => setLang("ka")}>KA</button>
          <button type="button" className={`langswitch__btn${lang === "en" ? " is-active" : ""}`} aria-pressed={lang === "en"} lang="en" onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </div>
  );
}
