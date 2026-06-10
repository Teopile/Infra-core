/** Two-digit, mono-safe count for title-block annotations (numerals only —
 *  invented words are banned from annotations in both languages). */
export const nn = (n: number): string => `/ ${String(n).padStart(2, "0")}`;
