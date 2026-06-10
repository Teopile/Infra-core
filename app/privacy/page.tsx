import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { PrivacyView } from "./PrivacyView";

export const metadata: Metadata = {
  title: dictionaries.ka.pages.privacy.title,
  description: dictionaries.ka.pages.privacy.intro,
  alternates: { canonical: "/privacy/" },
  openGraph: {
    url: "/privacy/",
    title: dictionaries.ka.pages.privacy.title,
    description: dictionaries.ka.pages.privacy.intro,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
