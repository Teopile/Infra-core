"use client";

import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SERVICE_ICONS } from "@/components/icons";

export function ServicesView() {
  const { t } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        lead={t.services.lead}
        trail={[{ label: t.nav.services }]}
      />

      <section className="section">
        <div className="container">
          <div className="sgrid">
            {t.services.items.map((it, i) => (
              <div className="scard reveal" key={it.t}>
                <span className="scard__ico">{SERVICE_ICONS[i]}</span>
                <div>
                  <h2 className="scard__title">{it.t}</h2>
                  <p className="scard__text">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="proc-title">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t.process.eyebrow}</span>
            <h2 id="proc-title" className="sec-title">{t.process.title}</h2>
          </div>
          <div className="steps">
            {t.process.steps.map((it, i) => (
              <div className="step reveal" key={it.t}>
                <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
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
