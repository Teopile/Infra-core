"use client";

import { useLang } from "./LanguageProvider";
import { icoMail, icoPhone } from "./icons";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

/** Slim dark utility bar: phone + email on the left, language switch on the right. */
export function TopBar() {
  const { lang, setLang } = useLang();
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__contacts">
          <a href={PHONE_HREF} className="topbar__link">{icoPhone}{PHONE_DISPLAY}</a>
          <a href={EMAIL_HREF} className="topbar__link">{icoMail}{EMAIL}</a>
        </div>
        <div className="topbar__right">
          <div className="langswitch" role="group" aria-label="Language / ენა">
            <button type="button" className={`langswitch__btn${lang === "ka" ? " is-active" : ""}`} aria-pressed={lang === "ka"} lang="ka" onClick={() => setLang("ka")}>ქარ</button>
            <span className="langswitch__sep" aria-hidden="true">/</span>
            <button type="button" className={`langswitch__btn${lang === "en" ? " is-active" : ""}`} aria-pressed={lang === "en"} lang="en" onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
