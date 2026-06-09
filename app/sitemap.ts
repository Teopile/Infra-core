import type { MetadataRoute } from "next";
import { productSlugs } from "@/lib/catalog";

export const dynamic = "force-static";

const BASE = "https://infracoregeorgia.com";

// Static routes + one entry per product category. Trailing slashes match the
// `trailingSlash: true` export setting.
const STATIC_ROUTES = ["/", "/products", "/services", "/brands", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_ROUTES, ...productSlugs.map((s) => `/products/${s}`)];
  return paths.map((path) => ({
    url: path === "/" ? `${BASE}/` : `${BASE}${path}/`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
