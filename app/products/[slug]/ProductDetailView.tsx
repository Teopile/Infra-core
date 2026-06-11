"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { icoCheck } from "@/components/icons";
import { getCategory, productCategories } from "@/lib/catalog";
import { CATEGORY_IMAGE } from "@/lib/categoryImages";
import { displayText } from "@/lib/georgian";
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
        title={item.t}
        lead={item.d}
        trail={[
          { label: t.nav.products, href: "/products" },
          { label: item.t },
        ]}
      />

      <section className="section">
        <div className="container detail">
          <div className="reveal">
            <figure className="dphoto regmarks">
              <img src={CATEGORY_IMAGE[slug].src} width={CATEGORY_IMAGE[slug].width} height={CATEGORY_IMAGE[slug].height} alt="" loading="eager" fetchPriority="high" decoding="async" />
            </figure>
            <h2 className="detail__h">{t.pages.included}</h2>
            <ul className="ticklist">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="ticklist__ico" aria-hidden="true">{icoCheck}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {cat.brands && cat.brands.length > 0 ? (
              <>
                <h2 className="detail__h detail__h--brands">{t.nav.vendors}</h2>
                <ul className="brandrow" lang="en">
                  {cat.brands.map((b) => (
                    <li key={b} className="mono">{b}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="detail__aside reveal">
            <h2 className="detail__h">{t.nav.services}</h2>
            <ul className="ticklist">
              {t.services.items.slice(0, 3).map((s) => (
                <li key={s.t}>
                  <span className="ticklist__ico" aria-hidden="true">{icoCheck}</span>
                  <span>{s.t}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn--primary btn--lg detail__cta">{t.pages.cta.button}</Link>
          </aside>
        </div>
      </section>

      <section className="section section--panel" aria-labelledby="related-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="related-title" className="tb__title display">{displayText(lang, t.pages.related)}</h2>
          </div>
          <div className="cgrid">
            {related.map((c) => {
              const ri = t.products.items[c.index];
              return (
                <Link href={`/products/${c.slug}`} className="ccard reveal" key={c.slug}>
                  <span className="ccard__media">
                    <img src={CATEGORY_IMAGE[c.slug].src} width={CATEGORY_IMAGE[c.slug].width} height={CATEGORY_IMAGE[c.slug].height} alt="" loading="lazy" decoding="async" />
                  </span>
                  <div className="ccard__body">
                    <h3 className="ccard__title">{ri.t}</h3>
                    <span className="ccard__arrow" aria-hidden="true">→</span>
                  </div>
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
