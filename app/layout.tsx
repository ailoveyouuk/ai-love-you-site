import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ConditionalFooter from "@/components/ConditionalFooter";
import CookieConsent from "@/components/CookieConsent";

// Brand display/heading font. Exposed as --font-inter-tight, picked up by
// the --font-display token in globals.css (falls back to Helvetica Neue
// if a build environment ever lacks network access to fetch it).
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const SITE_URL = "https://www.ailoveyou.uk";
const SITE_TITLE = "AI Love You — websites and platforms, built with care";
const SITE_DESCRIPTION =
  "AI Love You is the studio Lewis McKinnon builds under: freelance web and platform development — polished front-end sites and structured data/CRM platforms.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — AI Love You",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Lewis McKinnon" }],
  creator: "Lewis McKinnon",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AI Love You",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Love You — websites and platforms, built with care",
      },
    ],
  },
  // Deliberately no title/description/images here — Twitter/X's crawler
  // falls back to the Open Graph tags above when twitter:title etc. are
  // absent, so this one line covers every page without duplicating each
  // page's openGraph block into a matching twitter block too.
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${interTight.variable}`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="bg-ambient" aria-hidden="true" />
        <Nav />
        <main className="flex-1 pt-20">{children}</main>
        <ConditionalFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
