"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function NotFound() {
  const { t } = useLang();
  const nf = t.pages.notFound;
  return (
    <section className="section notfound">
      <div className="container notfound__inner">
        <span className="notfound__code" aria-hidden="true">{nf.code}</span>
        <h1 className="notfound__title">{nf.title}</h1>
        <p className="notfound__text">{nf.text}</p>
        <Link href="/" className="btn btn--primary btn--lg">{nf.cta}</Link>
      </div>
    </section>
  );
}
