"use client";

import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { WHAT_ICONS } from "@/components/icons";
import { displayText } from "@/lib/georgian";
import { nn } from "@/lib/format";

export function AboutView() {
  const { t, lang } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        title={t.why.title}
        lead={t.pages.aboutLead}
        trail={[{ label: t.nav.why }]}
      />

      {/* What we do — ruled value strip */}
      <section className="section" aria-labelledby="what-title">
        <div className="container">
          <h2 id="what-title" className="sr-only">{t.what.srTitle}</h2>
          <div className="vstrip">
            {t.what.items.map((it, i) => (
              <div className="vstrip__item reveal" key={it.t}>
                <span className="vstrip__ico">{WHAT_ICONS[i]}</span>
                <h3 className="vstrip__title">{it.t}</h3>
                <p className="vstrip__text">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The why-us trio lives on the home page; repeating it here would
          duplicate the first what-item verbatim on one screen. */}

      {/* Process — real sequence */}
      <section className="section section--panel" id="process" aria-labelledby="proc-title">
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
