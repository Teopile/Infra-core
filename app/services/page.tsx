import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { ServicesView } from "./ServicesView";

export const metadata: Metadata = {
  title: dictionaries.ka.services.title,
  description: dictionaries.ka.services.lead,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesView />;
}
