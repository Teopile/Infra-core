"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { getCategory, suppliedBrands } from "@/lib/catalog";
import { CATEGORY_IMAGE } from "@/lib/categoryImages";

export function BrandsView() {
  const { t } = useLang();
  useReveal();

  return (
    <>
      <PageHero
        title={t.vendors.title}
        lead={t.pages.brandsLead}
        trail={[{ label: t.nav.vendors }]}
      />

      <section className="section">
        <div className="container">
          <div className="brandgrid">
            {suppliedBrands.map((b) => {
              const cat = getCategory(b.slug);
              const item = cat ? t.products.items[cat.index] : undefined;
              return (
                <Link href={`/products/${b.slug}`} className="brandcard reveal" key={b.name}>
                  <img className="brandcard__img" src={CATEGORY_IMAGE[b.slug].src} width={CATEGORY_IMAGE[b.slug].width} height={CATEGORY_IMAGE[b.slug].height} alt="" loading="lazy" decoding="async" />
                  <div className="brandcard__body">
                    <h2 className="brandcard__name">{b.name}</h2>
                    {item ? <span className="brandcard__text">{item.d}</span> : null}
                    <span className="brandcard__more">{t.products.more} <em aria-hidden="true">→</em></span>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="vendors__note reveal">{t.vendors.note}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
