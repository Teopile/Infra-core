"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { PRODUCT_ICON_BY_SLUG } from "@/components/icons";
import { productCategories } from "@/lib/catalog";
import { CATEGORY_IMAGE } from "@/lib/categoryImages";

export function ProductsView() {
  const { t } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        title={t.products.title}
        lead={t.products.lead}
        trail={[{ label: t.nav.products }]}
      />
      <section className="section">
        <div className="container">
          <div className="tilegrid">
            {productCategories.map((cat) => {
              const item = t.products.items[cat.index];
              return (
                <Link href={`/products/${cat.slug}`} className="tile reveal" key={cat.slug}>
                  <img className="tile__img" src={CATEGORY_IMAGE[cat.slug].src} alt="" loading="lazy" decoding="async" />
                  <div className="tile__body">
                    <span className="tile__badge" aria-hidden="true">{PRODUCT_ICON_BY_SLUG[cat.slug]}</span>
                    <h2 className="tile__title">{item.t}</h2>
                    <span className="tile__more">{t.products.more} <em aria-hidden="true">→</em></span>
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
