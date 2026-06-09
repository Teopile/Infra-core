"use client";

import Link from "next/link";
import { Brand } from "./Brand";
import { useLang } from "./LanguageProvider";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

// Footer product links are index-aligned with dictionaries footer.productLinks:
// [Computers & Mini PC, Networking, Printers, Software & licensing].
const PRODUCT_LINK_HREFS = [
  "/products/computers",
  "/products/networking",
  "/products/printers",
  "/products/software",
];

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer__bg" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__col footer__brandcol">
          <Brand light />
          <p className="footer__tag">{t.footer.tag}</p>
        </div>
        <div className="footer__col">
          <h4>{t.footer.products}</h4>
          {t.footer.productLinks.map((label, i) => (
            <Link href={PRODUCT_LINK_HREFS[i] ?? "/products"} key={label}>{label}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h4>{t.footer.services}</h4>
          {t.footer.serviceLinks.map((label) => (
            <Link href="/services" key={label}>{label}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h4>{t.footer.contact}</h4>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <a href={EMAIL_HREF}>{EMAIL}</a>
          <span className="footer__muted">{t.contact.city}</span>
          <Link href="/privacy">{t.footer.privacy}</Link>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottominner">
          <span>© 2026 Infra Core. <span>{t.footer.rights}</span></span>
          <span className="footer__muted">{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
