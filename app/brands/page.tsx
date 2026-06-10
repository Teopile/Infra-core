import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { BrandsView } from "./BrandsView";

export const metadata: Metadata = {
  title: dictionaries.ka.vendors.title,
  description: dictionaries.ka.pages.brandsLead,
  alternates: { canonical: "/brands/" },
  openGraph: {
    url: "/brands/",
    title: dictionaries.ka.vendors.title,
    description: dictionaries.ka.pages.brandsLead,
    images: [OG_IMAGE],
  },
};

export default function BrandsPage() {
  return <BrandsView />;
}
