import type { ReactNode } from "react";

/* ---------- Inline icon set (line icons, 24x24) ----------
 * Stroke icons inherit `currentColor` and are sized by their container.
 * `aria-hidden` because every icon here is decorative; labels live in text.
 */
const svg = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
);

export const icoMonitor = svg(<><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></>);
export const icoMonitorAcc = svg(<><rect x="2.5" y="4" width="19" height="12" rx="1.5" /><path d="M8 20h8M12 16v4M7 9h6" /></>);
export const icoNetwork = svg(<><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 17h.01M11 17h.01M12 14V8a4 4 0 0 1 4-4M12 8a4 4 0 0 0-4-4" /></>);
export const icoPrinter = svg(<path d="M7 9V4h10v5M7 18H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M7 14h10v6H7z" />);
export const icoHeadset = svg(<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM20 13h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1zM17 19a3 3 0 0 1-3 3h-2" />);
export const icoSoftware = svg(<path d="M4 5h16v11H4zM2 20h20M9.5 9.5l2 2 3-3" />);
export const icoShieldCheck = svg(<><path d="M12 3l8 4v5c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V7l8-4z" /><path d="m9 12 2 2 4-4" /></>);
export const icoTruck = svg(<path d="M3 13h11V6H3zM14 9h3l3 3v4h-6zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />);
export const icoSupport = svg(<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM20 13h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1z" />);
export const icoServer = svg(<><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01" /></>);
export const icoCheck = svg(<path d="M20 7 9 18l-5-5" />);
export const icoBolt = svg(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />);
export const icoBox = svg(<path d="M21 8 12 3 3 8l9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />);
export const icoTag = svg(<><path d="M20 12 12 4H5a1 1 0 0 0-1 1v7l8 8 8-8z" /><circle cx="8.5" cy="8.5" r="1.3" /></>);
export const icoCheckCircle = svg(<><circle cx="12" cy="12" r="9" /><path d="m8.4 12 2.3 2.3 4.9-4.8" /></>);

export const icoPhone = (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2z" /></svg>
);
export const icoMail = (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.4l8 5 8-5V7H4z" /></svg>
);
export const icoPin = (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" /></svg>
);
/* Section icon arrays — index-aligned with dictionary item order. */
export const SERVICE_ICONS = [icoShieldCheck, icoTruck, icoSupport, icoServer];
export const WHAT_ICONS = [icoMonitor, icoShieldCheck, icoCheck, icoBolt];
export const WHY_ICONS = [icoBox, icoTag, icoCheckCircle];
export const TRUST_ICONS = [icoShieldCheck, icoTruck, icoTag];

/* Product-category icons keyed by catalog slug. */
export type ProductSlug =
  | "computers"
  | "monitors"
  | "networking"
  | "printers"
  | "headsets"
  | "software";

export const PRODUCT_ICON_BY_SLUG: Record<ProductSlug, ReactNode> = {
  computers: icoMonitor,
  monitors: icoMonitorAcc,
  networking: icoNetwork,
  printers: icoPrinter,
  headsets: icoHeadset,
  software: icoSoftware,
};
