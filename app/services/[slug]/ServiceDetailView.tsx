"use client";

import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { icoCheck } from "@/components/icons";
import { displayText } from "@/lib/georgian";
import { nn } from "@/lib/format";
import { getServicePage } from "@/lib/serviceCatalog";
import type { ServiceSlug } from "@/lib/serviceCatalog";

export function ServiceDetailView({ slug }: { slug: ServiceSlug }) {
  const { t, lang } = useLang();
  useReveal();

  const svc = getServicePage(slug);
  if (!svc) return null;

  const title = t.services.items[svc.index].t;

  return (
    <>
      <PageHero
        title={title}
        lead={svc.lead[lang]}
        trail={[
          { label: t.nav.services, href: "/services" },
          { label: title },
        ]}
      />

      {/* Scope — confirmed facts only (unverified claims were cut) */}
      <section className="section">
        <div className="container">
          <h2 className="detail__h reveal">{t.pages.included}</h2>
          <ul className="ticklist reveal" style={{ maxWidth: "760px" }}>
            {svc.scope[lang].map((item) => (
              <li key={item}>
                <span className="ticklist__ico" aria-hidden="true">{icoCheck}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The shared three-step process anchors every service */}
      <section className="section section--panel" aria-labelledby="svc-proc-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="svc-proc-title" className="tb__title display">{displayText(lang, t.process.title)}</h2>
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
