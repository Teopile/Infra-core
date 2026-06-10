import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Noto_Sans_Georgian } from "next/font/google";
import { dictionaries } from "@/lib/dictionaries";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SkipLink } from "@/components/SkipLink";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Floats } from "@/components/Floats";
import { QuoteBar } from "@/components/QuoteBar";
import "./globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-georgian",
});

/* Latin display voice: variable Archivo carries the width axis the
   "Industrial Requisition" display tier uses (en headings, brand lockup). */
const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

/* Requisition voice: Latin/digit-only by design policy (see DESIGN.md). */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mono",
});

const ka = dictionaries.ka;
const SITE_URL = "https://infracoregeorgia.com";
/* GitHub Pages serves the site under /Infra-core; path-based assets must
   carry the prefix there (static imports handle their own). */
const BP = process.env.DEPLOY_TARGET === "pages" ? "/Infra-core" : "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: ka.meta.title,
    template: "%s — Infra Core",
  },
  description: ka.meta.description,
  applicationName: "Infra Core",
  alternates: { canonical: "/" },
  manifest: `${BP}/site.webmanifest`,
  icons: {
    icon: [
      {
        // Brand mark: orange registration square on coal.
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23101216'/%3E%3Crect x='10' y='10' width='12' height='12' fill='%23E04E10'/%3E%3C/svg%3E",
      },
    ],
    apple: `${BP}/assets/icons/apple-touch-icon.png`,
  },
  openGraph: {
    type: "website",
    siteName: "Infra Core",
    title: ka.meta.title,
    description: "ერთი მომწოდებელი მთელი ოფისისთვის — ტექნიკა, ქსელი, ლიცენზიები და მხარდაჭერა.",
    url: "/",
    locale: "ka_GE",
    alternateLocale: ["en_US"],
    images: [
      {
        url: `${BP}/assets/og/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "Infra Core — სრული IT გადაწყვეტილებები ბიზნესისთვის",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ka.meta.title,
    description: "ერთი მომწოდებელი მთელი ოფისისთვის — ტექნიკა, ქსელი, ლიცენზიები და მხარდაჭერა.",
    images: [`${BP}/assets/og/og-cover.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101216" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Infra Core",
  description: "B2B IT solutions and office-equipment reseller in Georgia.",
  url: `${SITE_URL}/`,
  email: "info@infracore-consulting.com",
  // Real number flows in from the env once configured; omitted until then.
  ...(process.env.NEXT_PUBLIC_PHONE_TEL ? { telephone: process.env.NEXT_PUBLIC_PHONE_TEL } : {}),
  image: `${SITE_URL}/assets/og/og-cover.png`,
  address: { "@type": "PostalAddress", addressCountry: "GE" },
  areaServed: "GE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* Font variable classes MUST live on <html>: the --f-* aliases in
     globals.css are declared on :root, and var() substitution happens where
     a custom property is declared, not where it is used. */
  return (
    <html lang="ka" data-lang="ka" className={`${archivo.variable} ${plexMono.variable} ${notoGeorgian.variable}`} suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <SkipLink />
          <TopBar />
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <Floats />
          <QuoteBar />
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
