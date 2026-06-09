"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/dictionaries";

const STORAGE_KEY = "infracore-lang";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to "ka" so the statically exported HTML matches the Georgian metadata.
  const [lang, setLang] = useState<Lang>("ka");

  // Restore a saved preference on the client (may briefly flash for EN visitors).
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "en") setLang("en");
    } catch {}
  }, []);

  // Keep <html lang>, the document title, and persistence in sync with state.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    document.title = dictionaries[lang].meta.title;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

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
