// Static imports keep category photos basePath-safe on both Vercel and
// GitHub Pages (same pattern as the home hero image).

import type { StaticImageData } from "next/image";
import type { ProductSlug } from "@/components/icons";

import computers from "@/public/assets/categories/computers.webp";
import monitors from "@/public/assets/categories/monitors.webp";
import networking from "@/public/assets/categories/networking.webp";
import printers from "@/public/assets/categories/printers.webp";
import headsets from "@/public/assets/categories/headsets.webp";
import software from "@/public/assets/categories/software.webp";

export const CATEGORY_IMAGE: Record<ProductSlug, StaticImageData> = {
  computers,
  monitors,
  networking,
  printers,
  headsets,
  software,
};
