"use client";

import { useLang } from "./LanguageProvider";

/** Keyboard skip link to the main landmark; label follows the active language. */
export function SkipLink() {
  const { t } = useLang();
  return (
    <a href="#main" className="skip-link">
      {t.skip}
    </a>
  );
}
