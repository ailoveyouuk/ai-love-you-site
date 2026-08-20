"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

/**
 * The homepage is a full-viewport paged experience with its own fixed,
 * minimal footer (see HomeFooter) — the standard multi-column Footer
 * would add page-level scroll height that breaks the "no vertical
 * scroll" layout. Every other route keeps the normal Footer.
 */
export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer />;
}
