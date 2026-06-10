import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { ContactView } from "./ContactView";

export const metadata: Metadata = {
  title: dictionaries.ka.contact.title,
  description: dictionaries.ka.contact.lead,
  alternates: { canonical: "/contact/" },
  openGraph: {
    url: "/contact/",
    title: dictionaries.ka.contact.title,
    description: dictionaries.ka.contact.lead,
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
