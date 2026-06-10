"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/dictionaries";
import { getCategory } from "@/lib/catalog";

const STORAGE_KEY = "infracore-lang";
const TITLE_SUFFIX = " — Infra Core"; // must match the layout's title template

/**
 * Per-route document title in the active language. Mirrors the titles the
 * server metadata exports produce for Georgian, so hydration never replaces
 * a specific page title with the generic site title. Returns null for
 * unmapped routes (404s) so the document title is left untouched.
 */
function routeTitle(dict: Dict, pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return dict.meta.title;
  if (path === "/products") return dict.products.title + TITLE_SUFFIX;
  const slugMatch = path.match(/^\/products\/([^/]+)$/);
  if (slugMatch) {
    const cat = getCategory(slugMatch[1]);
    return cat ? dict.products.items[cat.index].t + TITLE_SUFFIX : null;
  }
  if (path === "/services") return dict.services.title + TITLE_SUFFIX;
  if (path === "/brands") return dict.vendors.title + TITLE_SUFFIX;
  if (path === "/about") return dict.why.title + TITLE_SUFFIX;
  if (path === "/contact") return dict.contact.title + TITLE_SUFFIX;
  if (path === "/privacy") return dict.pages.privacy.title + TITLE_SUFFIX;
  return null;
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to "ka" so the statically exported HTML matches the Georgian metadata.
  const [lang, setLang] = useState<Lang>("ka");
  const pathname = usePathname();

  // Restore a saved preference on the client (may briefly flash for EN visitors).
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "en") setLang("en");
    } catch {}
  }, []);

  // Keep <html lang>, the per-route document title, and persistence in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    const title = routeTitle(dictionaries[lang], pathname);
    if (title && document.title !== title) document.title = title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang, pathname]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
