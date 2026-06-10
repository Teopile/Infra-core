// Service detail pages. FAITHFULNESS: every lead and scope line is grounded
// in claims that already exist in dictionaries.ts (delivery, network setup,
// configuration, turnkey handover, warranty, backups, modernization,
// prophylaxis, support, consultation). Unconfirmed facts (timeframes, SLAs,
// coverage, cabling, out-of-hours, monitoring, retainers) were CUT per the
// owner's rule: an unverifiable promise costs more trust than a missing one.

import type { Lang } from "./dictionaries";

export type ServiceSlug = "delivery" | "infrastructure";

export interface ServicePage {
  slug: ServiceSlug;
  /** Index into dictionaries[lang].services.items (source of the title). */
  index: number;
  lead: Record<Lang, string>;
  scope: Record<Lang, string[]>;
}

export const servicePages: ServicePage[] = [
  {
    slug: "delivery",
    index: 1,
    lead: {
      ka: "ჩვენ გაწვდით მზა ოფისს და არა ყუთებს: ტექნიკა მოგეწოდებათ, მონტაჟდება, კონფიგურირდება და გასაღების ჩაბარებამდე გადმოგეცემათ — ყველაფერზე ოფიციალური გარანტიით.",
      en: "We deliver a working office, not boxes: equipment arrives, gets installed, configured and handed over turnkey — with an official warranty on everything.",
    },
    scope: {
      ka: [
        "შეკვეთილი ტექნიკის მიწოდება",
        "ქსელის დაყენება — Wi-Fi, სვიჩები, როუტერები",
        "სამუშაო ადგილების მონტაჟი",
        "პროგრამებისა და ლიცენზიების კონფიგურაცია",
        "ოფისის ჩაბარება გასაღების პრინციპით",
        "ოფიციალური გარანტია მთელ აღჭურვილობაზე",
      ],
      en: [
        "Delivery of the ordered equipment",
        "Network setup — Wi-Fi, switches, routers",
        "Workstation installation",
        "Software and license configuration",
        "Turnkey office handover",
        "Official warranty on all equipment",
      ],
    },
  },
  {
    slug: "infrastructure",
    index: 3,
    lead: {
      ka: "პრევენცია უფრო იაფია, ვიდრე აღდგენა: სარეზერვო ასლები, ქსელის მოდერნიზაცია და პროფილაქტიკა, რომ ოფისი შეუფერხებლად მუშაობდეს.",
      en: "Prevention is cheaper than recovery: backups, network modernization and preventive maintenance that keep the office running.",
    },
    scope: {
      ka: [
        "სარეზერვო ასლების მოწყობა",
        "ქსელის მოდერნიზაცია",
        "პროფილაქტიკური მოვლა",
        "ტექნიკური მხარდაჭერა",
        "კონსულტაცია სწორი აღჭურვილობის შესარჩევად",
      ],
      en: [
        "Backup setup",
        "Network modernization",
        "Preventive maintenance",
        "Technical support",
        "Consultation on the right equipment",
      ],
    },
  },
];

export const serviceSlugs: ServiceSlug[] = servicePages.map((s) => s.slug);

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

/** Map services.items index -> detail slug (rows without a page get none). */
export const servicePageByIndex: Record<number, ServiceSlug | undefined> =
  Object.fromEntries(servicePages.map((s) => [s.index, s.slug]));
