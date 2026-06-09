"use client";

import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";

export function PrivacyView() {
  const { t } = useLang();
  useReveal();
  const p = t.pages.privacy;

  return (
    <>
      <PageHero
        title={p.title}
        lead={p.intro}
        trail={[{ label: t.footer.privacy }]}
      />

      <section className="section">
        <div className="container">
          <div className="prose reveal">
            <p className="prose__p">{p.updated}</p>
            {p.sections.map((s) => (
              <div key={s.h}>
                <h2 className="prose__h">{s.h}</h2>
                <p className="prose__p">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
