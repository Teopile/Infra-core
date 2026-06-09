"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { useLang } from "./LanguageProvider";

const MOBILE_BREAKPOINT = 1120;

/** Sticky site header with responsive nav drawer, scrim, focus management. */
export function SiteHeader() {
  const { t } = useLang();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { href: "/products", label: t.nav.products },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.why },
    { href: "/brands", label: t.nav.vendors },
    { href: "/about#process", label: t.nav.process },
    { href: "/contact", label: t.nav.contact },
  ];

  /* Sticky header shadow on scroll. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the drawer whenever the route changes. */
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  /* Body lock + inert offscreen drawer + Escape to close. */
  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      if (navOpen) nav.removeAttribute("inert");
      else if (window.innerWidth <= MOBILE_BREAKPOINT) nav.setAttribute("inert", "");
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

  /* Keep inert state correct across breakpoints. */
  useEffect(() => {
    const onResize = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.innerWidth > MOBILE_BREAKPOINT) {
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
  const isActive = (href: string) => {
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}`} id="header">
        <div className="container header__inner">
          <Brand />
          <nav className={`nav${navOpen ? " is-open" : ""}`} id="nav" aria-label="Main navigation" ref={navRef}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={closeNav}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header__actions">
            <Link href="/contact" className="btn btn--primary btn--sm header__cta">{t.nav.quote}</Link>
            <button type="button" className="navtoggle" ref={toggleRef} aria-label="Menu" aria-expanded={navOpen} aria-controls="nav" onClick={() => setNavOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-scrim${navOpen ? " is-open" : ""}`} onClick={closeNav} aria-hidden="true" />
    </>
  );
}
