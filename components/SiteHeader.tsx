"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./Brand";
import { useLang } from "./LanguageProvider";
import { icoMail, icoPhone } from "./icons";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

const MOBILE_BREAKPOINT = 1180;

/** Sticky paper header on its ink rule, with the drawer + focus containment. */
export function SiteHeader() {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { href: "/products", label: t.nav.products },
    { href: "/services", label: t.nav.services },
    { href: "/about", label: t.nav.why },
    { href: "/brands", label: t.nav.vendors },
    { href: "/contact", label: t.nav.contact },
  ];

  /* Close the drawer whenever the route changes. */
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  /* Body lock + inert offscreen drawer + Escape to close. While open, the
     page regions behind the scrim go inert (focus containment). */
  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      if (navOpen) nav.removeAttribute("inert");
      else if (window.innerWidth <= MOBILE_BREAKPOINT) nav.setAttribute("inert", "");
    }
    const pageRegions = [
      document.getElementById("main"),
      document.querySelector("footer"),
      document.querySelector(".topbar"),
      document.querySelector(".floats"),
      document.querySelector(".quotebar"),
    ];
    pageRegions.forEach((el) => {
      if (!el) return;
      if (navOpen) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
    document.body.classList.toggle("nav-open", navOpen);
    /* Move focus into the drawer so Tab continues through its links
       instead of exiting the page (the toggle sits after the nav in DOM). */
    if (navOpen) nav?.querySelector("a")?.focus();
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

  /* Exact match -> current page; prefix match -> current section. */
  const currentState = (href: string): "page" | "true" | undefined => {
    const path = pathname.replace(/\/$/, "") || "/";
    const target = href.replace(/\/$/, "") || "/";
    if (path === target) return "page";
    if (target !== "/" && path.startsWith(`${target}/`)) return "true";
    return undefined;
  };

  return (
    <>
      <header className="header" id="header">
        <div className="container header__inner">
          <Brand />
          <nav className={`nav${navOpen ? " is-open" : ""}`} id="nav" aria-label={lang === "ka" ? "მთავარი ნავიგაცია" : "Main navigation"} ref={navRef}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                aria-current={currentState(item.href)}
                onClick={closeNav}
              >
                {item.label}
              </Link>
            ))}
            {/* Visible only when the topbar contacts are hidden (<=640px),
                so the phone never disappears from any viewport. */}
            <a href={PHONE_HREF} className="nav__contact mono">{icoPhone}{PHONE_DISPLAY}</a>
            <a href={EMAIL_HREF} className="nav__contact mono">{icoMail}{EMAIL}</a>
          </nav>
          <div className="header__actions">
            <Link href="/contact" className="btn btn--primary btn--sm header__cta">{t.nav.quote}</Link>
            <button type="button" className="navtoggle" ref={toggleRef} aria-label={lang === "ka" ? "მენიუ" : "Menu"} aria-expanded={navOpen} aria-controls="nav" onClick={() => setNavOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`nav-scrim${navOpen ? " is-open" : ""}`} onClick={closeNav} aria-hidden="true" />
    </>
  );
}
