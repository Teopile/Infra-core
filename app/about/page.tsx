import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: dictionaries.ka.why.title,
  description: dictionaries.ka.pages.aboutLead,
  alternates: { canonical: "/about/" },
  openGraph: {
    url: "/about/",
    title: dictionaries.ka.why.title,
    description: dictionaries.ka.pages.aboutLead,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
