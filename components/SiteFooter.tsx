"use client";

import Link from "next/link";
import { Brand } from "./Brand";
import { useLang } from "./LanguageProvider";
import { icoFb, icoLi } from "./icons";
import { EMAIL, EMAIL_HREF, FB_CONFIGURED, FB_URL, LI_CONFIGURED, LI_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

// Footer product links are index-aligned with dictionaries footer.productLinks.
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
      <div className="container footer__inner">
        <div className="footer__col footer__brandcol">
          <Brand light />
          <p className="footer__tag">{t.footer.tag}</p>
          {FB_CONFIGURED || LI_CONFIGURED ? (
            <div className="footer__social">
              {FB_CONFIGURED ? (
                <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">{icoFb}</a>
              ) : null}
              {LI_CONFIGURED ? (
                <a href={LI_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{icoLi}</a>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="footer__col">
          <h2>{t.footer.products}</h2>
          {t.footer.productLinks.map((label, i) => (
            <Link href={PRODUCT_LINK_HREFS[i] ?? "/products"} key={label}>{label}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h2>{t.footer.services}</h2>
          {t.footer.serviceLinks.map((label) => (
            <Link href="/services" key={label}>{label}</Link>
          ))}
        </div>
        <div className="footer__col">
          <h2>{t.footer.contact}</h2>
          <a href={PHONE_HREF} className="mono">{PHONE_DISPLAY}</a>
          <a href={EMAIL_HREF} className="mono">{EMAIL}</a>
          <span className="footer__muted">{t.contact.city}</span>
          <Link href="/privacy">{t.footer.privacy}</Link>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottominner">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Infra Core. <span>{t.footer.rights}</span></span>
          <span className="footer__muted">{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
