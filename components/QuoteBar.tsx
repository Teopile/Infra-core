"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { icoPhone, icoWa } from "./icons";
import { PHONE_DISPLAY, PHONE_HREF, WA_CONFIGURED, waHref } from "@/lib/site";

/**
 * Mobile-only sticky conversion bar (<=640px via CSS): the quote request
 * stays reachable at every scroll depth, with tap-to-call and (once the
 * number is configured) tap-to-WhatsApp beside it.
 */
export function QuoteBar() {
  const { t, lang } = useLang();
  return (
    <div className="quotebar">
      <Link href="/contact" className="quotebar__cta">{t.nav.quote}</Link>
      <a href={PHONE_HREF} className="quotebar__tel" aria-label={PHONE_DISPLAY}>
        {icoPhone}
      </a>
      {WA_CONFIGURED ? (
        <a href={waHref(lang)} className="quotebar__tel quotebar__wa" target="_blank" rel="noopener noreferrer" aria-label={t.floats.wa}>
          {icoWa}
        </a>
      ) : null}
    </div>
  );
}
