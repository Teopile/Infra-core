"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
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
          <div className="cgrid">
            {productCategories.map((cat, i) => {
              const item = t.products.items[cat.index];
              return (
                <Link href={`/products/${cat.slug}`} className="ccard reveal" key={cat.slug}>
                  <span className="ccard__media">
                    <img
                      src={CATEGORY_IMAGE[cat.slug].src}
                      alt=""
                      loading={i < 3 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : undefined}
                      decoding="async"
                    />
                  </span>
                  <div className="ccard__body">
                    <h2 className="ccard__title">{item.t}</h2>
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
