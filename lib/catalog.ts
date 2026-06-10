// Product-category catalog: adds routing slugs and faithful detail bullets on
// top of the titles/descriptions that already live in `dictionaries.ts`.
//
// FAITHFULNESS: the `bullets` only re-list items that are already enumerated
// inside each category's description in dictionaries.ts. Nothing here invents
// new products, specs, prices, or claims. Titles/descriptions are NOT copied —
// they are read at render time from dictionaries[lang].products.items[index].

import type { Lang } from "./dictionaries";
import type { ProductSlug } from "@/components/icons";

export interface ProductCategory {
  slug: ProductSlug;
  /** Index into dictionaries[lang].products.items (the source of title + description). */
  index: number;
  bullets: Record<Lang, string[]>;
}

export const productCategories: ProductCategory[] = [
  {
    slug: "computers",
    index: 0,
    bullets: {
      ka: ["დესკტოპ PC", "Mini PC (მათ შორის Beelink)", "სამუშაო სადგურები", "All-in-One კომპიუტერები"],
      en: ["Desktop PCs", "Mini PCs (including Beelink)", "Workstations", "All-in-One computers"],
    },
  },
  {
    slug: "monitors",
    index: 1,
    bullets: {
      ka: ["მონიტორები", "ოფისის აქსესუარები"],
      en: ["Monitors", "Office accessories"],
    },
  },
  {
    slug: "networking",
    index: 2,
    bullets: {
      ka: ["სვიჩები", "როუტერები", "Wi-Fi გადაწყვეტილებები"],
      en: ["Switches", "Routers", "Wi-Fi solutions"],
    },
  },
  {
    slug: "printers",
    index: 3,
    bullets: {
      ka: ["პრინტერები", "MFP", "სკანერები", "საოფისე ტექნიკა"],
      en: ["Printers", "MFPs", "Scanners", "Office hardware"],
    },
  },
  {
    slug: "headsets",
    index: 4,
    bullets: {
      ka: ["Jabra ყურსასმენები", "ყურსასმენები ოფისისთვის", "ყურსასმენები call-center-ისთვის"],
      en: ["Jabra headsets", "Office headsets", "Call-center headsets"],
    },
  },
  {
    slug: "software",
    index: 5,
    bullets: {
      ka: ["პროგრამული უზრუნველყოფა", "ლიცენზირება ბიზნესისთვის"],
      en: ["Software", "Business licensing"],
    },
  },
];

export const productSlugs: ProductSlug[] = productCategories.map((c) => c.slug);

/* Brands the company supplies, each mapped to the catalog category whose
   (already-approved) description represents it. Shared by the home vendors
   band and the brands page. */
export const suppliedBrands: { name: string; slug: ProductSlug }[] = [
  { name: "Beelink", slug: "computers" },
  { name: "Jabra", slug: "headsets" },
];

export function getCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}
