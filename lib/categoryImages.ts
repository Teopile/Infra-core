// Static imports keep category photos basePath-safe on both Vercel and
// GitHub Pages. The files live OUTSIDE public/ so the export ships exactly
// one copy (the hashed bundle under _next/static/media), not two.

import type { StaticImageData } from "next/image";
import type { ProductSlug } from "@/components/icons";

import computers from "@/assets/categories/computers.webp";
import monitors from "@/assets/categories/monitors.webp";
import networking from "@/assets/categories/networking.webp";
import printers from "@/assets/categories/printers.webp";
import headsets from "@/assets/categories/headsets.webp";
import software from "@/assets/categories/software.webp";

export const CATEGORY_IMAGE: Record<ProductSlug, StaticImageData> = {
  computers,
  monitors,
  networking,
  printers,
  headsets,
  software,
};
