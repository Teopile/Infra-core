import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { ProductsView } from "./ProductsView";

export const metadata: Metadata = {
  title: dictionaries.ka.products.title,
  description: dictionaries.ka.products.lead,
  alternates: { canonical: "/products/" },
  openGraph: {
    url: "/products/",
    title: dictionaries.ka.products.title,
    description: dictionaries.ka.products.lead,
  },
};

export default function ProductsPage() {
  return <ProductsView />;
}
