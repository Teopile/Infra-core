import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { ServicesView } from "./ServicesView";

export const metadata: Metadata = {
  title: dictionaries.ka.services.title,
  description: dictionaries.ka.services.lead,
  alternates: { canonical: "/services/" },
  openGraph: {
    url: "/services/",
    title: dictionaries.ka.services.title,
    description: dictionaries.ka.services.lead,
    images: [OG_IMAGE],
  },
};

export default function ServicesPage() {
  return <ServicesView />;
}
