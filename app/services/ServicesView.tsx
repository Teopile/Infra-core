"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { servicePageByIndex } from "@/lib/serviceCatalog";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SERVICE_ICONS } from "@/components/icons";
import { displayText } from "@/lib/georgian";
import { nn } from "@/lib/format";

export function ServicesView() {
  const { t, lang } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        title={t.services.title}
        lead={t.services.lead}
        trail={[{ label: t.nav.services }]}
      />

      <section className="section">
        <div className="container">
          <div className="svc">
            {t.services.items.map((it, i) => {
              const slug = servicePageByIndex[i];
              const inner = (
                <>
                  <span className="svc__ico">{SERVICE_ICONS[i]}</span>
                  <h2 className="svc__title">{it.t}</h2>
                  <p className="svc__text">{it.d}</p>
                </>
              );
              return slug ? (
                <Link href={`/services/${slug}`} className="svc__row reveal" key={it.t}>{inner}</Link>
              ) : (
                <div className="svc__row reveal" key={it.t}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--panel" aria-labelledby="proc-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="proc-title" className="tb__title display">{displayText(lang, t.process.title)}</h2>
            <span className="tb__meta">{nn(t.process.steps.length)}</span>
          </div>
          <div className="steps">
            {t.process.steps.map((it, i) => (
              <div className="step reveal" key={it.t}>
                <span className="step__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step__t">{it.t}</h3>
                <p className="step__d">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
