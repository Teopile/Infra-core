"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Trail after "Home"; the last crumb is rendered as the current page. */
  trail?: Crumb[];
}

/** Compact subpage header with a breadcrumb, eyebrow, title and optional lead. */
export function PageHero({ eyebrow, title, lead, trail = [] }: PageHeroProps) {
  const { t } = useLang();
  return (
    <section className="page-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
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
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="page-hero__title">{title}</h1>
        {lead ? <p className="page-hero__lead">{lead}</p> : null}
      </div>
    </section>
  );
}
