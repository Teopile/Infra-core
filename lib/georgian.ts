import type { Lang } from "./dictionaries";

/* Chromium does not apply the Unicode Georgian case mapping under CSS
   text-transform, so the display tier converts Mkhedruli to Mtavruli
   capitals (U+10D0.. -> U+1C90.., a fixed +0xBC0 offset) at render time.
   Purely presentational and reversible; Latin fragments pass through and
   keep the CSS uppercase. */
const MTAVRULI_OFFSET = 0x1c90 - 0x10d0;

export function toMtavruli(text: string): string {
  return text.replace(/[ა-ჺჽ-ჿ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + MTAVRULI_OFFSET)
  );
}

/** Display-tier text: Mtavruli capitals in Georgian, untouched otherwise. */
export function displayText(lang: Lang, text: string): string {
  return lang === "ka" ? toMtavruli(text) : text;
}
