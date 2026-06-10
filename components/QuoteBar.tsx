"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { icoPhone } from "./icons";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

/**
 * Mobile-only sticky conversion bar (<=640px via CSS): the quote request
 * stays reachable at every scroll depth, with tap-to-call beside it.
 */
export function QuoteBar() {
  const { t } = useLang();
  return (
    <div className="quotebar">
      <Link href="/contact" className="quotebar__cta">{t.nav.quote}</Link>
      <a href={PHONE_HREF} className="quotebar__tel" aria-label={PHONE_DISPLAY}>
        {icoPhone}
      </a>
    </div>
  );
}
