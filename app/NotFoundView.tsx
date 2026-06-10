"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { displayText } from "@/lib/georgian";

export function NotFoundView() {
  const { t, lang } = useLang();
  const nf = t.pages.notFound;
  return (
    <section className="section nf">
      <div className="container nf__inner">
        <span className="nf__code" aria-hidden="true">{nf.code}</span>
        <h1 className="nf__title display">{displayText(lang, nf.title)}</h1>
        <p className="nf__text">{nf.text}</p>
        <Link href="/" className="btn btn--primary btn--lg">{nf.cta}</Link>
      </div>
    </section>
  );
}
