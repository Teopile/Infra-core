"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { dictionaries, type Lang } from "@/lib/dictionaries";
import heroImage from "@/public/assets/hero/commerce-workspace@2x.webp";

const WEB3_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
const TG_URL = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/";
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "995500000000";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+995 5XX XX XX XX";
const PHONE_TEL = process.env.NEXT_PUBLIC_PHONE_TEL || "+995500000000";
const EMAIL = "info@infracore-consulting.com";

/* ---------- Inline icon set (line icons, 24x24) ---------- */
const svg = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);
const icoMonitor = svg(<><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></>);
const icoMonitorAcc = svg(<><rect x="2.5" y="4" width="19" height="12" rx="1.5" /><path d="M8 20h8M12 16v4M7 9h6" /></>);
const icoNetwork = svg(<><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 17h.01M11 17h.01M12 14V8a4 4 0 0 1 4-4M12 8a4 4 0 0 0-4-4" /></>);
const icoPrinter = svg(<path d="M7 9V4h10v5M7 18H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M7 14h10v6H7z" />);
const icoHeadset = svg(<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM20 13h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1zM17 19a3 3 0 0 1-3 3h-2" />);
const icoSoftware = svg(<path d="M4 5h16v11H4zM2 20h20M9.5 9.5l2 2 3-3" />);
const icoShieldCheck = svg(<><path d="M12 3l8 4v5c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V7l8-4z" /><path d="m9 12 2 2 4-4" /></>);
const icoTruck = svg(<path d="M3 13h11V6H3zM14 9h3l3 3v4h-6zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />);
const icoSupport = svg(<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13h2v6H5a1 1 0 0 1-1-1zM20 13h-2v6h1a1 1 0 0 0 1-1z" />);
const icoServer = svg(<><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01" /></>);
const icoCheck = svg(<path d="M20 7 9 18l-5-5" />);
const icoBolt = svg(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />);
const icoBox = svg(<path d="M21 8 12 3 3 8l9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />);
const icoTag = svg(<><path d="M20 12 12 4H5a1 1 0 0 0-1 1v7l8 8 8-8z" /><circle cx="8.5" cy="8.5" r="1.3" /></>);
const icoCheckCircle = svg(<><circle cx="12" cy="12" r="9" /><path d="m8.4 12 2.3 2.3 4.9-4.8" /></>);
const icoPhone = (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2z" /></svg>
);
const icoMail = (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.4l8 5 8-5V7H4z" /></svg>
);
const icoPin = (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>
);

const PRODUCT_ICONS = [icoMonitor, icoMonitorAcc, icoNetwork, icoPrinter, icoHeadset, icoSoftware];
const SERVICE_ICONS = [icoShieldCheck, icoTruck, icoSupport, icoServer];
const WHAT_ICONS = [icoMonitor, icoShieldCheck, icoCheck, icoBolt];
const WHY_ICONS = [icoBox, icoTag, icoCheckCircle];
const TRUST_ICONS = [icoShieldCheck, icoTruck, icoTag];

export default function Home() {
  const [lang, setLang] = useState<Lang>("ka");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<{ text: string; kind: "" | "ok" | "err" }>({ text: "", kind: "" });
  const [sending, setSending] = useState(false);

  const t = dictionaries[lang];

  /* Load saved language */
  useEffect(() => {
    try {
      if (localStorage.getItem("infracore-lang") === "en") setLang("en");
    } catch {}
  }, []);

  /* Sync <html lang>, title, persistence */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.title = dictionaries[lang].meta.title;
    try {
      localStorage.setItem("infracore-lang", lang);
    } catch {}
  }, [lang]);

  /* Sticky header shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  /* Mobile nav: body lock + inert + escape */
  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      if (navOpen) nav.removeAttribute("inert");
      else if (window.innerWidth <= 1024) nav.setAttribute("inert", "");
    }
    document.body.classList.toggle("nav-open", navOpen);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navOpen) {
        setNavOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  /* Keep nav inert state correct on resize */
  useEffect(() => {
    const onResize = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.innerWidth > 1024) {
        setNavOpen(false);
        nav.removeAttribute("inert");
      } else if (!navOpen) {
        nav.setAttribute("inert", "");
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    form.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    });

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const mark = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedby", "formStatus");
        (el as HTMLElement).focus();
      }
    };

    if (!String(data.name || "").trim()) {
      setStatus({ text: t.form.required, kind: "err" });
      mark("f-name");
      return;
    }
    if (!String(data.phone || "").trim()) {
      setStatus({ text: t.form.required, kind: "err" });
      mark("f-phone");
      return;
    }
    if (data.consent !== "yes") {
      setStatus({ text: t.form.consentErr, kind: "err" });
      mark("f-consent");
      return;
    }
    if (!WEB3_KEY) {
      setStatus({ text: t.form.notConfigured, kind: "err" });
      return;
    }

    setSending(true);
    setStatus({ text: t.form.sending, kind: "" });
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3_KEY,
        subject: "New request / ახალი მოთხოვნა — Infra Core",
        from_name: "Infra Core Website",
        ...data,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res && res.success) {
          setStatus({ text: t.form.ok, kind: "ok" });
          form.reset();
        } else {
          setStatus({ text: t.form.err, kind: "err" });
        }
      })
      .catch(() => setStatus({ text: t.form.err, kind: "err" }))
      .finally(() => setSending(false));
  };

  const Brand = ({ light }: { light?: boolean }) => (
    <a href="#top" className={`brand${light ? " brand--light" : ""}`} aria-label="Infra Core">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <path d="M16 4l10.4 6v12L16 28 5.6 22V10L16 4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="16" cy="14.5" r="3" fill="currentColor" />
        </svg>
      </span>
      <span className="brand__text">
        Infra<span className="brand__accent">Core</span>
      </span>
    </a>
  );

  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__contacts">
            <a href={`tel:${PHONE_TEL}`} className="topbar__link">{icoPhone}{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`} className="topbar__link">{icoMail}{EMAIL}</a>
          </div>
          <div className="topbar__right">
            <div className="langswitch" role="group" aria-label="Language / ენა">
              <button type="button" className={`langswitch__btn${lang === "ka" ? " is-active" : ""}`} aria-pressed={lang === "ka"} lang="ka" onClick={() => setLang("ka")}>ქარ</button>
              <span className="langswitch__sep" aria-hidden="true">/</span>
              <button type="button" className={`langswitch__btn${lang === "en" ? " is-active" : ""}`} aria-pressed={lang === "en"} lang="en" onClick={() => setLang("en")}>EN</button>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`header${scrolled ? " is-scrolled" : ""}`} id="header">
        <div className="container header__inner">
          <Brand />
          <nav className={`nav${navOpen ? " is-open" : ""}`} id="nav" aria-label="Main navigation" ref={navRef}>
            <a href="#products" className="nav__link" onClick={closeNav}>{t.nav.products}</a>
            <a href="#services" className="nav__link" onClick={closeNav}>{t.nav.services}</a>
            <a href="#why" className="nav__link" onClick={closeNav}>{t.nav.why}</a>
            <a href="#vendors" className="nav__link" onClick={closeNav}>{t.nav.vendors}</a>
            <a href="#process" className="nav__link" onClick={closeNav}>{t.nav.process}</a>
            <a href="#contact" className="nav__link" onClick={closeNav}>{t.nav.contact}</a>
          </nav>
          <div className="header__actions">
            <a href="#contact" className="btn btn--primary btn--sm header__cta">{t.nav.quote}</a>
            <button type="button" className="navtoggle" ref={toggleRef} aria-label="Menu" aria-expanded={navOpen} aria-controls="nav" onClick={() => setNavOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-scrim${navOpen ? " is-open" : ""}`} onClick={closeNav} aria-hidden="true" />

      <main id="main" tabIndex={-1}>
        <span id="top" />

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
                <a href="#contact" className="btn btn--primary btn--lg">{t.hero.cta1}</a>
                <a href="#products" className="btn btn--ghost btn--lg">{t.hero.cta2}</a>
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
              {t.products.items.map((it, i) => (
                <a href="#contact" className="pcard reveal" key={it.t}>
                  <span className="pcard__ico">{PRODUCT_ICONS[i]}</span>
                  <h3 className="pcard__title">{it.t}</h3>
                  <p className="pcard__text">{it.d}</p>
                  <span className="pcard__more">{t.products.more} <em aria-hidden="true">→</em></span>
                </a>
              ))}
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
                <div className="scard reveal" key={it.t}>
                  <span className="scard__ico">{SERVICE_ICONS[i]}</span>
                  <div>
                    <h3 className="scard__title">{it.t}</h3>
                    <p className="scard__text">{it.d}</p>
                  </div>
                </div>
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

        {/* CONTACT */}
        <section className="section section--dark" id="contact" aria-labelledby="con-title">
          <div className="container contact">
            <div className="contact__intro reveal">
              <span className="eyebrow eyebrow--light">{t.contact.eyebrow}</span>
              <h2 id="con-title" className="sec-title sec-title--light">{t.contact.title}</h2>
              <p className="sec-lead sec-lead--light">{t.contact.lead}</p>
              <ul className="contact__list">
                <li>{icoPhone}<a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
                <li>{icoMail}<a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li>{icoPin}<span>{t.contact.city}</span></li>
              </ul>
            </div>

            <form className="qform reveal" id="quoteForm" ref={formRef} onSubmit={onSubmit} noValidate>
              <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="qform__row">
                <div className="field">
                  <label htmlFor="f-name">{t.form.name}</label>
                  <input id="f-name" name="name" type="text" required aria-required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="f-company">{t.form.company}</label>
                  <input id="f-company" name="company" type="text" autoComplete="organization" />
                </div>
              </div>
              <div className="qform__row">
                <div className="field">
                  <label htmlFor="f-phone">{t.form.phone}</label>
                  <input id="f-phone" name="phone" type="tel" required aria-required autoComplete="tel" inputMode="tel" placeholder="+995 5XX XX XX XX" />
                </div>
                <div className="field">
                  <label htmlFor="f-email">{t.form.email}</label>
                  <input id="f-email" name="email" type="email" autoComplete="email" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-sector">{t.form.sector}</label>
                <input id="f-sector" name="sector" type="text" placeholder={t.form.sectorPh} />
              </div>
              <div className="field">
                <label htmlFor="f-message">{t.form.message}</label>
                <textarea id="f-message" name="message" rows={4} placeholder={t.form.messagePh} />
              </div>
              <label className="consent">
                <input type="checkbox" id="f-consent" name="consent" value="yes" required aria-required />
                <span>{t.form.consent}</span>
              </label>
              <button type="submit" className="btn btn--primary btn--lg qform__submit" disabled={sending}>{t.form.submit}</button>
              <p className={`qform__status${status.kind ? ` is-${status.kind}` : ""}`} id="formStatus" role="alert" aria-live="assertive">{status.text}</p>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__bg" aria-hidden="true" />
        <div className="container footer__inner">
          <div className="footer__col footer__brandcol">
            <Brand light />
            <p className="footer__tag">{t.footer.tag}</p>
          </div>
          <div className="footer__col">
            <h4>{t.footer.products}</h4>
            {t.footer.productLinks.map((l) => (
              <a href="#products" key={l}>{l}</a>
            ))}
          </div>
          <div className="footer__col">
            <h4>{t.footer.services}</h4>
            {t.footer.serviceLinks.map((l) => (
              <a href="#services" key={l}>{l}</a>
            ))}
          </div>
          <div className="footer__col">
            <h4>{t.footer.contact}</h4>
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span className="footer__muted">{t.contact.city}</span>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="container footer__bottominner">
            <span>© 2026 Infra Core. <span>{t.footer.rights}</span></span>
            <span className="footer__muted">{t.footer.built}</span>
          </div>
        </div>
      </footer>

      {/* FLOATING CONTACT */}
      <div className="floats" aria-label="Quick contact">
        <a className="float float--tg" href={TG_URL} target="_blank" rel="noopener" aria-label={t.floats.tg}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.6 13.2 1.8 11.7c-1-.3-1-1 .2-1.5L20.6 3c.9-.3 1.6.2 1.3 1.3z" /></svg>
        </a>
        <a className="float float--wa" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener" aria-label={t.floats.wa}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.5 0 .1 0 .5-.1.9z" /></svg>
        </a>
      </div>
    </>
  );
}
