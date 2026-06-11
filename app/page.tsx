"use client";

import Link from "next/link";
import heroImage from "@/assets/hero/commerce-workspace@2x.webp";
import { useLang } from "@/components/LanguageProvider";
import { useReveal } from "@/components/useReveal";
import { CtaBand } from "@/components/CtaBand";
import {
  SERVICE_ICONS,
  WHAT_ICONS,
  WHY_ICONS,
  TRUST_ICONS,
  icoCheck,
} from "@/components/icons";
import { productCategories, suppliedBrands } from "@/lib/catalog";
import { CATEGORY_IMAGE } from "@/lib/categoryImages";
import { displayText } from "@/lib/georgian";
import { nn } from "@/lib/format";

export default function Home() {
  const { t, lang } = useLang();
  useReveal();
  const dsp = (s: string) => displayText(lang, s);

  /* Both languages phrase the title as "everything … — delivered, set up,
     supported"; the promise after the dash carries the accent. */
  const [titleLead, titleAccent] = t.hero.title.split(" — ");

  return (
    <>
      {/* HERO — coal manifest */}
      <section className="hero">
        <div className="container hero__inner">
          {/* Above-the-fold: never reveal-gated — the h1 is the LCP element
              and must paint before any JS arrives. */}
          <div>
            <p className="hero__intro">{t.hero.eyebrow}</p>
            <h1 className="hero__title display">
              {titleAccent ? (
                <>
                  {dsp(titleLead)} — <span className="hero__title-accent">{dsp(titleAccent)}</span>
                </>
              ) : (
                dsp(t.hero.title)
              )}
            </h1>
            <p className="hero__sub">{t.hero.sub}</p>
            <div className="hero__cta">
              <Link href="/contact" className="btn btn--primary btn--lg">{t.hero.cta1}</Link>
              <Link href="/products" className="btn btn--outline-light btn--lg">{t.hero.cta2}</Link>
            </div>
            <ul className="hero__facts">
              {t.hero.trust.map((label, i) => (
                <li key={label}>
                  <span className="ico" aria-hidden="true">{TRUST_ICONS[i]}</span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero__media regmarks">
            <img src={heroImage.src} width={heroImage.width} height={heroImage.height} alt="" loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </div>
        <div className="container">
          <div className="manifest regmarks">
            <div className="manifest__label">{t.herocard.label}</div>
            <div className="manifest__rows">
              {t.herocard.rows.map((row) => (
                <span className="manifest__row" key={row}>
                  <span className="ico" aria-hidden="true">{icoCheck}</span>
                  <span>{row}</span>
                </span>
              ))}
            </div>
            <strong className="manifest__result">{t.herocard.turnkey}</strong>
          </div>
        </div>
      </section>

      {/* WHAT WE DO — ruled value strip */}
      <section className="section" id="what" aria-labelledby="what-title">
        <div className="container">
          <h2 id="what-title" className="sr-only">{t.what.srTitle}</h2>
          <div className="vstrip">
            {t.what.items.map((it, i) => (
              <div className="vstrip__item reveal" key={it.t}>
                <span className="vstrip__ico">{WHAT_ICONS[i]}</span>
                <h3 className="vstrip__title">{it.t}</h3>
                <p className="vstrip__text">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="section" id="products" aria-labelledby="prod-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="prod-title" className="tb__title display">{dsp(t.products.title)}</h2>
            <Link href="/products" className="tb__link">
              <span className="mono">{nn(productCategories.length)}</span>
              {t.hero.cta2} <em aria-hidden="true">→</em>
            </Link>
          </div>
          <p className="tb-lead reveal">{t.products.lead}</p>
          <div className="cgrid">
            {productCategories.map((cat) => {
              const item = t.products.items[cat.index];
              return (
                <Link href={`/products/${cat.slug}`} className="ccard reveal" key={cat.slug}>
                  <span className="ccard__media">
                    <img src={CATEGORY_IMAGE[cat.slug].src} width={CATEGORY_IMAGE[cat.slug].width} height={CATEGORY_IMAGE[cat.slug].height} alt="" loading="lazy" decoding="async" />
                  </span>
                  <div className="ccard__body">
                    <h3 className="ccard__title">{item.t}</h3>
                    <span className="ccard__arrow" aria-hidden="true">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES — ruled rows */}
      <section className="section section--panel" id="services" aria-labelledby="serv-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="serv-title" className="tb__title display">{dsp(t.services.title)}</h2>
            <span className="tb__meta">{nn(t.services.items.length)}</span>
          </div>
          <p className="tb-lead reveal">{t.services.lead}</p>
          <div className="svc">
            {t.services.items.map((it, i) => (
              <Link href="/services" className="svc__row reveal" key={it.t}>
                <span className="svc__ico">{SERVICE_ICONS[i]}</span>
                <h3 className="svc__title">{it.t}</h3>
                <p className="svc__text">{it.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — ruled columns */}
      <section className="section" id="why" aria-labelledby="why-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="why-title" className="tb__title display">{dsp(t.why.title)}</h2>
            <span className="tb__meta">{nn(t.why.items.length)}</span>
          </div>
          <div className="why3">
            {t.why.items.map((it, i) => (
              <div className="why3__item reveal" key={it.t}>
                <span className="why3__ico">{WHY_ICONS[i]}</span>
                <h3 className="why3__title">{it.t}</h3>
                <p className="why3__text">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENDORS — brand cards (no count: list is growing) */}
      <section className="section section--panel" id="vendors" aria-labelledby="ven-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="ven-title" className="tb__title display">{dsp(t.vendors.title)}</h2>
            <Link href="/brands" className="tb__link">
              {t.nav.vendors} <em aria-hidden="true">→</em>
            </Link>
          </div>
          <div className="brandgrid reveal">
            {suppliedBrands.map((b) => (
              <Link href={`/products/${b.slug}`} className="brandcard brandcard--sm" key={b.name}>
                <img className="brandcard__img" src={CATEGORY_IMAGE[b.slug].src} width={CATEGORY_IMAGE[b.slug].width} height={CATEGORY_IMAGE[b.slug].height} alt="" loading="lazy" decoding="async" />
                <div className="brandcard__body">
                  <h3 className="brandcard__name">{b.name}</h3>
                  <span className="brandcard__more">{t.products.more} <em aria-hidden="true">→</em></span>
                </div>
              </Link>
            ))}
          </div>
          <p className="vendors__note reveal">{t.vendors.note}</p>
        </div>
      </section>

      {/* PROCESS — real three-step sequence */}
      <section className="section" id="process" aria-labelledby="proc-title">
        <div className="container">
          <div className="tb reveal">
            <h2 id="proc-title" className="tb__title display">{dsp(t.process.title)}</h2>
            <span className="tb__meta">{nn(t.process.steps.length)}</span>
          </div>
          <div className="steps">
            {t.process.steps.map((it, i) => (
              <div className="step reveal" key={it.t}>
                <span className="step__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
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
