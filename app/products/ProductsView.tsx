"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { PRODUCT_ICON_BY_SLUG } from "@/components/icons";
import { productCategories } from "@/lib/catalog";

export function ProductsView() {
  const { t } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        eyebrow={t.products.eyebrow}
        title={t.products.title}
        lead={t.products.lead}
        trail={[{ label: t.nav.products }]}
      />
      <section className="section">
        <div className="container">
          <div className="pgrid">
            {productCategories.map((cat) => {
              const item = t.products.items[cat.index];
              return (
                <Link href={`/products/${cat.slug}`} className="pcard reveal" key={cat.slug}>
                  <span className="pcard__ico">{PRODUCT_ICON_BY_SLUG[cat.slug]}</span>
                  <h2 className="pcard__title">{item.t}</h2>
                  <p className="pcard__text">{item.d}</p>
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
