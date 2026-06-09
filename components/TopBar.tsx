"use client";

import { useLang } from "./LanguageProvider";
import { icoMail, icoPin } from "./icons";
import { EMAIL, EMAIL_HREF } from "@/lib/site";

/** Slim light utility bar: location + email on the left, language switch on the right. */
export function TopBar() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__contacts">
          <span className="topbar__note">{icoPin}{t.footer.built}</span>
          <a href={EMAIL_HREF} className="topbar__link">{icoMail}{EMAIL}</a>
        </div>
        <div className="topbar__right">
          <div className="langswitch" role="group" aria-label="Language / ენა">
            <button type="button" className={`langswitch__btn${lang === "ka" ? " is-active" : ""}`} aria-pressed={lang === "ka"} lang="ka" onClick={() => setLang("ka")}>ქარ</button>
            <button type="button" className={`langswitch__btn${lang === "en" ? " is-active" : ""}`} aria-pressed={lang === "en"} lang="en" onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
