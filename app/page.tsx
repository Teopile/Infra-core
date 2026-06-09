"use client";

import Link from "next/link";
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
import { productCategories } from "@/lib/catalog";

export default function Home() {
  const { t } = useLang();
  useReveal();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__media" aria-hidden="true" style={{ backgroundImage: `url(${heroImage.src})` }} />
        <div className="hero__shade" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__content reveal">
            <span className="eyebrow eyebrow--light">{t.hero.eyebrow}</span>
            <h1 className="hero__title">{t.hero.title}</h1>
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

      {/* PRODUCTS */}
      <section className="section section--catalog" id="products" aria-labelledby="prod-title">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t.products.eyebrow}</span>
            <h2 id="prod-title" className="sec-title">{t.products.title}</h2>
            <p className="sec-lead">{t.products.lead}</p>
          </div>
          <div className="pgrid">
            {productCategories.map((cat) => {
              const item = t.products.items[cat.index];
              return (
                <Link href={`/products/${cat.slug}`} className="pcard reveal" key={cat.slug}>
                  <span className="pcard__ico">{PRODUCT_ICON_BY_SLUG[cat.slug]}</span>
                  <h3 className="pcard__title">{item.t}</h3>
                  <p className="pcard__text">{item.d}</p>
                  <span className="pcard__more">{t.products.more} <em aria-hidden="true">→</em></span>
                </Link>
              );
            })}
          </div>
          <div className="sec-cta reveal">
            <Link href="/products" className="btn btn--primary btn--lg">{t.hero.cta2}</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services" aria-labelledby="serv-title">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t.services.eyebrow}</span>
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
            <span className="eyebrow eyebrow--light">{t.why.eyebrow}</span>
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
          <div className="sec-head reveal">
            <span className="eyebrow">{t.vendors.eyebrow}</span>
            <h2 id="ven-title" className="sec-title">{t.vendors.title}</h2>
          </div>
          <div className="vendors reveal" role="list" lang="en">
            {t.vendors.brands.map((b) => (
              <span className="vendor" role="listitem" key={b}>{b}</span>
            ))}
          </div>
          <p className="vendors__note reveal">{t.vendors.note}</p>
          <div className="sec-cta reveal">
            <Link href="/brands" className="btn btn--ghost btn--lg btn--ghost-ink">{t.nav.vendors}</Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section--soft" id="process" aria-labelledby="proc-title">
        <div className="container">
          <div className="sec-head reveal">
            <span className="eyebrow">{t.process.eyebrow}</span>
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
