"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { PRODUCT_ICON_BY_SLUG, icoCheck } from "@/components/icons";
import { getCategory, productCategories } from "@/lib/catalog";
import type { ProductSlug } from "@/components/icons";

export function ProductDetailView({ slug }: { slug: ProductSlug }) {
  const { t, lang } = useLang();
  useReveal();

  const cat = getCategory(slug);
  if (!cat) return null;

  const item = t.products.items[cat.index];
  const bullets = cat.bullets[lang];
  const related = productCategories.filter((c) => c.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={t.products.eyebrow}
        title={item.t}
        lead={item.d}
        trail={[
          { label: t.nav.products, href: "/products" },
          { label: item.t },
        ]}
      />

      <section className="section">
        <div className="container detail">
          <div className="detail__main reveal">
            <span className="detail__ico">{PRODUCT_ICON_BY_SLUG[cat.slug]}</span>
            <h2 className="detail__h">{t.pages.included}</h2>
            <ul className="ticks">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="ticks__ico" aria-hidden="true">{icoCheck}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="detail__aside reveal">
            <h2 className="detail__h">{t.services.eyebrow}</h2>
            <ul className="ticks">
              {t.services.items.slice(0, 3).map((s) => (
                <li key={s.t}>
                  <span className="ticks__ico" aria-hidden="true">{icoCheck}</span>
                  <span>{s.t}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn--primary btn--lg detail__cta">{t.pages.cta.button}</Link>
          </aside>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="related-title">
        <div className="container">
          <div className="sec-head reveal">
            <h2 id="related-title" className="sec-title">{t.pages.related}</h2>
          </div>
          <div className="pgrid">
            {related.map((c) => {
              const ri = t.products.items[c.index];
              return (
                <Link href={`/products/${c.slug}`} className="pcard reveal" key={c.slug}>
                  <span className="pcard__ico">{PRODUCT_ICON_BY_SLUG[c.slug]}</span>
                  <h3 className="pcard__title">{ri.t}</h3>
                  <p className="pcard__text">{ri.d}</p>
                  <span className="pcard__more">{t.products.more} <em aria-hidden="true">→</em></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
