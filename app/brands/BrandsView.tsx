"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { getCategory } from "@/lib/catalog";
import { CATEGORY_IMAGE } from "@/lib/categoryImages";
import type { ProductSlug } from "@/components/icons";

// Each supplied brand maps to the product category it belongs to, so the
// description shown is the real category text (no invented brand copy).
const BRANDS: { name: string; slug: ProductSlug }[] = [
  { name: "Beelink", slug: "computers" },
  { name: "Jabra", slug: "headsets" },
];

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
            {BRANDS.map((b) => {
              const cat = getCategory(b.slug);
              const item = cat ? t.products.items[cat.index] : undefined;
              return (
                <Link href={`/products/${b.slug}`} className="brandcard reveal" key={b.name}>
                  <img className="brandcard__img" src={CATEGORY_IMAGE[b.slug].src} alt="" loading="lazy" decoding="async" />
                  <span className="brandcard__body">
                    <span className="brandcard__name" lang="en">{b.name}</span>
                    {item ? <span className="brandcard__text">{item.d}</span> : null}
                    <span className="brandcard__more">{t.products.more} <em aria-hidden="true">→</em></span>
                  </span>
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
