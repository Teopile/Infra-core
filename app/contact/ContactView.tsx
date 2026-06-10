"use client";

import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { TRUST_ICONS, icoFb, icoMail, icoPhone, icoPin, icoWa } from "@/components/icons";
import { EMAIL, EMAIL_HREF, FB_CONFIGURED, FB_MSG_URL, PHONE_DISPLAY, PHONE_HREF, WA_CONFIGURED, waHref } from "@/lib/site";

export function ContactView() {
  const { t, lang } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        title={t.contact.title}
        lead={t.contact.lead}
        trail={[{ label: t.nav.contact }]}
      />

      <section className="section" id="contact">
        <div className="container contact">
          <div className="reveal">
            <ul className="contact__list">
              <li>{icoPhone}<a href={PHONE_HREF} className="mono">{PHONE_DISPLAY}</a></li>
              <li>{icoMail}<a href={EMAIL_HREF} className="mono">{EMAIL}</a></li>
              <li>{icoPin}<span>{t.contact.city}</span></li>
            </ul>
            {WA_CONFIGURED || FB_CONFIGURED ? (
              <div className="channels">
                {WA_CONFIGURED ? (
                  <a className="btn btn--outline" href={waHref(lang)} target="_blank" rel="noopener">
                    {icoWa}{t.contact.instantWa}
                  </a>
                ) : null}
                {FB_CONFIGURED ? (
                  <a className="btn btn--outline" href={FB_MSG_URL} target="_blank" rel="noopener">
                    {icoFb}{t.contact.instantFb}
                  </a>
                ) : null}
              </div>
            ) : null}
            <ul className="contact__facts">
              {t.hero.trust.map((label, i) => (
                <li key={label}>
                  <span className="ico" aria-hidden="true">{TRUST_ICONS[i]}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <div className="regmarks">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
