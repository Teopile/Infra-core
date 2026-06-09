import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import { dictionaries } from "@/lib/dictionaries";
import "./globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-georgian",
});

const ka = dictionaries.ka;
const SITE_URL = "https://infracoregeorgia.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: ka.meta.title,
  description: ka.meta.description,
  applicationName: "Infra Core",
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230B1626'/%3E%3Cpath d='M16 6l8 4.6v9.2L16 24l-8-4.2v-9.2L16 6z' fill='none' stroke='%232E90FA' stroke-width='2' stroke-linejoin='round'/%3E%3Ccircle cx='16' cy='15' r='2.4' fill='%2322C3E6'/%3E%3C/svg%3E",
      },
    ],
    apple: "/assets/icons/apple-touch-icon.png",
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
        url: "/assets/og/og-cover.png",
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
    images: ["/assets/og/og-cover.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1626" },
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
  image: `${SITE_URL}/assets/og/og-cover.png`,
  address: { "@type": "PostalAddress", addressCountry: "GE" },
  areaServed: "GE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" data-lang="ka" suppressHydrationWarning>
      <body className={notoGeorgian.variable}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
