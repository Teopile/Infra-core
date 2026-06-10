"use client";

import Link from "next/link";
import { preload } from "react-dom";
import heroImage from "@/public/assets/hero/commerce-workspace@2x.webp";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { CtaBand } from "@/components/CtaBand";
import {
  PRODUCT_ICON_BY_SLUG,
  SERVICE_ICONS,
  WHAT_ICONS,
  WHY_ICONS,
  TRUST_ICONS,
  icoCheck,
} from "@/components/icons";
import { productCategories, suppliedBrands } from "@/lib/catalog";
import { CATEGORY_IMAGE } from "@/lib/categoryImages";

export default function Home() {
  const { t } = useLang();
  useReveal();

  /* The hero photo is the LCP but loads via a CSS background; preload gets
     the request started while the document is still parsing. */
  preload(heroImage.src, { as: "image", fetchPriority: "high" });

  /* Both languages phrase the title as "everything … — delivered, set up,
     supported"; the part after the dash is the promise, so it gets the
     accent color (same move the reference uses on its promo banners). */
  const [titleLead, titleAccent] = t.hero.title.split(" — ");

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__media" aria-hidden="true" style={{ backgroundImage: `url(${heroImage.src})` }} />
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__content reveal">
            <span className="hero__kicker">{t.hero.eyebrow}</span>
            <h1 className="hero__title">
              {titleAccent ? (
                <>
                  {titleLead} — <span className="hero__title-accent">{titleAccent}</span>
                </>
              ) : (
                t.hero.title
              )}
            </h1>
            <p className="hero__sub">{t.hero.sub}</p>
            <div className="hero__cta">
              <Link href="/contact" className="btn btn--primary btn--lg">{t.hero.cta1}</Link>
              <Link href="/products" className="btn btn--ghost btn--lg">{t.hero.cta2}</Link>
            </div>
            <ul className="hero__trust">
              {t.hero.trust.map((label, i) => (
                <li key={label}>
                  <span className="ico" aria-hidden="true" style={{ display: "inline-flex", width: 19, height: 19 }}>{TRUST_ICONS[i]}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container hero__dock reveal">
          <div className="commerce-strip">
            <div className="commerce-strip__head">
              <span className="commerce-strip__dot" aria-hidden="true" />
              <span>{t.herocard.label}</span>
            </div>
            <div className="commerce-strip__items">
              {t.herocard.rows.map((row) => (
                <span className="commerce-strip__item" key={row}>
                  <span className="commerce-strip__ico" aria-hidden="true">{icoCheck}</span>
                  <span>{row}</span>
                </span>
              ))}
            </div>
            <strong className="commerce-strip__result">{t.herocard.turnkey}</strong>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section--tight" id="what" aria-labelledby="what-title">
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

      {/* PRODUCT CATALOG */}
      <section className="section section--catalog" id="products" aria-labelledby="prod-title">
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <h2 id="prod-title" className="sec-title">{t.products.title}</h2>
              <p className="sec-lead">{t.products.lead}</p>
            </div>
            <Link href="/products" className="sec-head__link">
              {t.hero.cta2} <em aria-hidden="true">→</em>
            </Link>
          </div>
          <div className="tilegrid">
            {productCategories.map((cat) => {
              const item = t.products.items[cat.index];
              return (
                <Link href={`/products/${cat.slug}`} className="tile reveal" key={cat.slug}>
                  <img className="tile__img" src={CATEGORY_IMAGE[cat.slug].src} alt="" loading="lazy" decoding="async" />
                  <div className="tile__body">
                    <span className="tile__badge" aria-hidden="true">{PRODUCT_ICON_BY_SLUG[cat.slug]}</span>
                    <h3 className="tile__title">{item.t}</h3>
                    <span className="tile__more">{t.products.more} <em aria-hidden="true">→</em></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--soft" id="services" aria-labelledby="serv-title">
        <div className="container">
          <div className="sec-head reveal">
            <h2 id="serv-title" className="sec-title">{t.services.title}</h2>
            <p className="sec-lead">{t.services.lead}</p>
          </div>
          <div className="sgrid">
            {t.services.items.map((it, i) => (
              <Link href="/services" className="scard scard--link reveal" key={it.t}>
                <span className="scard__ico">{SERVICE_ICONS[i]}</span>
                <div>
                  <h3 className="scard__title">{it.t}</h3>
                  <p className="scard__text">{it.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section--accent" id="why" aria-labelledby="why-title">
        <div className="container">
          <div className="sec-head reveal">
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

      {/* VENDORS */}
      <section className="section" id="vendors" aria-labelledby="ven-title">
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <h2 id="ven-title" className="sec-title">{t.vendors.title}</h2>
            </div>
            <Link href="/brands" className="sec-head__link">
              {t.nav.vendors} <em aria-hidden="true">→</em>
            </Link>
          </div>
          <div className="brandgrid reveal">
            {suppliedBrands.map((b) => (
              <Link href={`/products/${b.slug}`} className="brandcard brandcard--sm" key={b.name}>
                <img className="brandcard__img" src={CATEGORY_IMAGE[b.slug].src} alt="" loading="lazy" decoding="async" />
                <div className="brandcard__body">
                  <h3 className="brandcard__name" lang="en">{b.name}</h3>
                  <span className="brandcard__more">{t.products.more} <em aria-hidden="true">→</em></span>
                </div>
              </Link>
            ))}
          </div>
          <p className="vendors__note reveal">{t.vendors.note}</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section--soft" id="process" aria-labelledby="proc-title">
        <div className="container">
          <div className="sec-head reveal">
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
