import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { ServicesView } from "./ServicesView";

export const metadata: Metadata = {
  title: dictionaries.ka.services.title,
  description: dictionaries.ka.services.lead,
  alternates: { canonical: "/services/" },
  openGraph: {
    url: "/services/",
    title: dictionaries.ka.services.title,
    description: dictionaries.ka.services.lead,
  },
};

export default function ServicesPage() {
  return <ServicesView />;
}
