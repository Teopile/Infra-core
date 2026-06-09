"use client";

import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { icoMail, icoPhone, icoPin } from "@/components/icons";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export function ContactView() {
  const { t } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lead={t.contact.lead}
        trail={[{ label: t.nav.contact }]}
      />

      <section className="section section--dark" id="contact">
        <div className="container contact">
          <div className="contact__intro reveal">
            <ul className="contact__list">
              <li>{icoPhone}<a href={PHONE_HREF}>{PHONE_DISPLAY}</a></li>
              <li>{icoMail}<a href={EMAIL_HREF}>{EMAIL}</a></li>
              <li>{icoPin}<span>{t.contact.city}</span></li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
