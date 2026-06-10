import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: dictionaries.ka.why.title,
  description: dictionaries.ka.pages.aboutLead,
  alternates: { canonical: "/about/" },
  openGraph: {
    url: "/about/",
    title: dictionaries.ka.why.title,
    description: dictionaries.ka.pages.aboutLead,
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return <AboutView />;
}
