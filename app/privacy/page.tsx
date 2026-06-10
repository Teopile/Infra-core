import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { PrivacyView } from "./PrivacyView";

export const metadata: Metadata = {
  title: dictionaries.ka.pages.privacy.title,
  description: dictionaries.ka.pages.privacy.intro,
  alternates: { canonical: "/privacy/" },
  openGraph: {
    url: "/privacy/",
    title: dictionaries.ka.pages.privacy.title,
    description: dictionaries.ka.pages.privacy.intro,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
