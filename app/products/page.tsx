import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { ProductsView } from "./ProductsView";

export const metadata: Metadata = {
  title: dictionaries.ka.products.title,
  description: dictionaries.ka.products.lead,
  alternates: { canonical: "/products/" },
  openGraph: {
    url: "/products/",
    title: dictionaries.ka.products.title,
    description: dictionaries.ka.products.lead,
    images: [OG_IMAGE],
  },
};

export default function ProductsPage() {
  return <ProductsView />;
}
