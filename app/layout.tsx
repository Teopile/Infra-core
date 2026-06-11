import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Noto_Sans_Georgian } from "next/font/google";
import { dictionaries } from "@/lib/dictionaries";
import { SITE_URL } from "@/lib/site";
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
      { url: `${BP}/favicon.ico`, sizes: "32x32" },
      { url: `${BP}/assets/brand/logo-icon.svg`, type: "image/svg+xml" },
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
        url: `${BP}/assets/og/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Infra Core — სრული IT გადაწყვეტილებები ბიზნესისთვის",
      },
    ],
  },
  /* No root twitter block: a parent twitter object overrides per-page og
     titles on X with homepage-frozen values. With none declared, X reads
     each page's og:* tags — correct titles everywhere. */
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B6854",
};

/* JSON.stringify does not escape `</script>` or the U+2028/U+2029 line
   separators, so a stray value could break out of this inline <script>. Every
   input below is owner-controlled, but encode the HTML-significant characters
   as their JSON \u escapes (valid JSON, parses identically) so the sink is
   safe by construction rather than by assumption. */
function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028")
    .replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Infra Core",
  description: "B2B IT solutions and office-equipment reseller in Georgia.",
  url: `${SITE_URL}/`,
  email: "info@infracore-consulting.com",
  // Real number flows in from the env once configured; omitted until then.
  ...(process.env.NEXT_PUBLIC_PHONE_TEL ? { telephone: process.env.NEXT_PUBLIC_PHONE_TEL } : {}),
  image: `${SITE_URL}/assets/og/og-cover.jpg`,
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
        {/* next/font fails to emit preloads in this export, so the hero font
            arrives after CSS and the swap costs ~5.6s LCP render delay +
            CLS 0.199 on throttled mobile (measured). Explicit preloads for
            the above-fold-critical files (React hoists <link> to <head>).
            Hashes are content-stable; refresh them from out/_next/static/css
            after a next/font version bump (stale = harmless 404 hint). */}
        <link rel="preload" href={`${BP}/_next/static/media/a6c4972a91679e5a-s.p.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={`${BP}/_next/static/media/95058a9c3e49a56e-s.p.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={`${BP}/_next/static/media/c214ffb7f5362987-s.p.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
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
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </body>
    </html>
  );
}
