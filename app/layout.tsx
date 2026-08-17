import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

// NOTE: the brand reference calls for Inter Tight (via next/font/google) as
// the display/heading font. This build environment has no outbound network
// access at build time (next/font/google fails without it), so headings
// fall back to the system font stack defined in globals.css. Swap in
// `Inter_Tight` from "next/font/google" (see README) once building
// somewhere with normal internet access — the --font-display CSS variable
// is already wired up to pick it up automatically.

export const metadata: Metadata = {
  title: "AI Love You — websites and platforms, built with care",
  description:
    "AI Love You is the studio Lewis McKinnon builds under: freelance web and platform development — polished front-end sites and structured data/CRM platforms.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="bg-ambient" aria-hidden="true" />
        <Nav />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
