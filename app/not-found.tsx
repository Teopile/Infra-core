import type { Metadata } from "next";
import { dictionaries } from "@/lib/dictionaries";
import { NotFoundView } from "./NotFoundView";

// Served as 404.html in the static export. Next emits its own noindex meta
// for not-found pages — declaring robots here would double the tag.
export const metadata: Metadata = {
  title: dictionaries.ka.pages.notFound.title,
};

export default function NotFound() {
  return <NotFoundView />;
}
