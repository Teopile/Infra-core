"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

/** Reusable "request a quote" call-to-action band, links to the contact page. */
export function CtaBand() {
  const { t } = useLang();
  return (
    <section className="section section--dark cta-band">
      <div className="container cta-band__inner reveal">
        <div>
          <h2 className="sec-title sec-title--light">{t.pages.cta.title}</h2>
          <p className="sec-lead sec-lead--light">{t.pages.cta.text}</p>
        </div>
        <Link href="/contact" className="btn btn--inverse btn--lg">{t.pages.cta.button}</Link>
      </div>
    </section>
  );
}
