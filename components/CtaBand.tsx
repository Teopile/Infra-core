"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { displayText } from "@/lib/georgian";

/** Closing call-to-action: paper band between heavy ink rules. */
export function CtaBand() {
  const { t, lang } = useLang();
  return (
    <section className="ctaband" aria-labelledby="cta-title">
      <div className="container ctaband__inner reveal">
        <div>
          <h2 id="cta-title" className="ctaband__title display">{displayText(lang, t.pages.cta.title)}</h2>
          <p className="ctaband__text">{t.pages.cta.text}</p>
        </div>
        <Link href="/contact" className="btn btn--primary btn--lg">{t.pages.cta.button}</Link>
      </div>
    </section>
  );
}
