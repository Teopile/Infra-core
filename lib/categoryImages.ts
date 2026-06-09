// Static imports keep category photos basePath-safe on both Vercel and
// GitHub Pages (same pattern as the home hero image).

import type { StaticImageData } from "next/image";
import type { ProductSlug } from "@/components/icons";

import computers from "@/public/assets/categories/computers.jpg";
import monitors from "@/public/assets/categories/monitors.jpg";
import networking from "@/public/assets/categories/networking.jpg";
import printers from "@/public/assets/categories/printers.jpg";
import headsets from "@/public/assets/categories/headsets.jpg";
import software from "@/public/assets/categories/software.jpg";

export const CATEGORY_IMAGE: Record<ProductSlug, StaticImageData> = {
  computers,
  monitors,
  networking,
  printers,
  headsets,
  software,
};
