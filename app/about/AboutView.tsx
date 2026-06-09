"use client";

import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { WHAT_ICONS, WHY_ICONS } from "@/components/icons";

export function AboutView() {
  const { t } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        eyebrow={t.why.eyebrow}
        title={t.why.title}
        lead={t.pages.aboutLead}
        trail={[{ label: t.nav.why }]}
      />

      {/* WHAT WE DO */}
      <section className="section section--tight" aria-labelledby="what-title">
        <div className="container">
          <h2 id="what-title" className="sr-only">{t.what.srTitle}</h2>
          <div className="vprops">
            {t.what.items.map((it, i) => (
              <div className="vprop reveal" key={it.t}>
                <span className="vprop__ico">{WHAT_ICONS[i]}</span>
                <h3 className="vprop__title">{it.t}</h3>
                <p className="vprop__text">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section--accent" aria-labelledby="why-title">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow eyebrow--light">{t.why.eyebrow}</span>
            <h2 id="why-title" className="sec-title sec-title--light">{t.why.title}</h2>
          </div>
          <div className="promises">
            {t.why.items.map((it, i) => (
              <div className="promise reveal" key={it.t}>
                <span className="promise__ico">{WHY_ICONS[i]}</span>
                <h3 className="promise__t">{it.t}</h3>
                <p className="promise__d">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section section--soft" id="process" aria-labelledby="proc-title">
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
