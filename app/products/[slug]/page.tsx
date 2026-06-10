import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { getCategory, productSlugs } from "@/lib/catalog";
import { ProductDetailView } from "./ProductDetailView";

// Static export: only the slugs below are built; anything else serves the 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = getCategory(params.slug);
  if (!cat) return {};
  const item = dictionaries.ka.products.items[cat.index];
  return {
    title: item.t,
    description: item.d,
    alternates: { canonical: `/products/${cat.slug}/` },
    openGraph: {
      url: `/products/${cat.slug}/`,
      title: item.t,
      description: item.d,
      images: [OG_IMAGE],
    },
  };
}

export default function ProductCategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  return <ProductDetailView slug={cat.slug} />;
}
