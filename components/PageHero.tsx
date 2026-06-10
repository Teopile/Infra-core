"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LanguageProvider";
import { displayText } from "@/lib/georgian";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  lead?: string;
  /** Trail after "Home"; the last crumb is rendered as the current page. */
  trail?: Crumb[];
}

/**
 * Subpage title block: breadcrumb, display-tier h1, and the page's real
 * route stamped in mono on the ink rule (requisition voice, Latin-only).
 */
export function PageHero({ title, lead, trail = [] }: PageHeroProps) {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const route = (pathname.replace(/\/+$/, "") || "/").toLowerCase();

  return (
    <section className="phero">
      <div className="container">
        <nav className="breadcrumb" aria-label={lang === "ka" ? "ნავიგაციის ბილიკი" : "Breadcrumb"}>
          <ol>
            <li>
              <Link href="/">{t.pages.home}</Link>
            </li>
            {trail.map((c, i) => {
              const isLast = i === trail.length - 1;
              return (
                <li key={`${c.label}-${i}`}>
                  <span className="breadcrumb__sep" aria-hidden="true">/</span>
                  {c.href && !isLast ? (
                    <Link href={c.href}>{c.label}</Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="phero__row">
          <h1 className="phero__title display">{displayText(lang, title)}</h1>
          <span className="phero__route" aria-hidden="true">{route}</span>
        </div>
        {lead ? <p className="phero__lead">{lead}</p> : null}
      </div>
    </section>
  );
}
