import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { NotFoundView } from "./NotFoundView";

// Served as 404.html in the static export: keep it out of indexes and give
// it its own title instead of inheriting the homepage metadata.
export const metadata: Metadata = {
  title: dictionaries.ka.pages.notFound.title,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
