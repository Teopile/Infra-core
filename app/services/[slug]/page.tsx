import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries } from "@/lib/dictionaries";
import { OG_IMAGE } from "@/lib/site";
import { getServicePage, serviceSlugs } from "@/lib/serviceCatalog";
import { ServiceDetailView } from "./ServiceDetailView";

// Static export: only the slugs below are built; anything else serves the 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const svc = getServicePage(params.slug);
  if (!svc) return {};
  const title = dictionaries.ka.services.items[svc.index].t;
  return {
    title,
    description: svc.lead.ka,
    alternates: { canonical: `/services/${svc.slug}/` },
    openGraph: {
      url: `/services/${svc.slug}/`,
      title,
      description: svc.lead.ka,
      images: [OG_IMAGE],
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const svc = getServicePage(params.slug);
  if (!svc) notFound();
  return <ServiceDetailView slug={svc.slug} />;
}
