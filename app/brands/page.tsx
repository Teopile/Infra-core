import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { BrandsView } from "./BrandsView";

export const metadata: Metadata = {
  title: dictionaries.ka.vendors.title,
  description: dictionaries.ka.pages.brandsLead,
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return <BrandsView />;
}
