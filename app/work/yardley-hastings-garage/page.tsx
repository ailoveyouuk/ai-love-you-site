import type { Metadata } from "next";
import {
  CaseStudyHero,
  CaseStudyFeatures,
  CaseStudyVisuals,
  CaseStudyCTA,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Yardley Hastings Garage",
  description:
    "A Next.js site for an independent garage, with a managed stocklist and customer reviews as structured data behind the marketing front end.",
  openGraph: {
    title: "Yardley Hastings Garage — AI Love You",
    description:
      "A Next.js site for an independent garage, with a managed stocklist and customer reviews as structured data behind the marketing front end.",
    images: [
      {
        url: "/video/stills/yhg/homepage.jpg",
        width: 1280,
        height: 704,
        alt: "Yardley Hastings Garage homepage",
      },
    ],
  },
};

const overview =
  "A Next.js site for an independent garage, with a managed stocklist and customer reviews as structured data behind the marketing front end — not just a brochure site.";

const features = [
  {
    label: "Technology",
    value: "Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 — mobile-first throughout.",
  },
  {
    label: "Backend & data",
    value:
      "Supabase (Postgres) behind a server-side API route — customers, vehicles and enquiries are structured tables, not a form-to-email bridge. A new enquiry upserts the customer by email first, so repeat contact from the same person links to one record instead of duplicating it. A stocklist browser and homepage preview read from the same vehicles table used to manage listings.",
  },
  {
    label: "Animation",
    value:
      "A scroll-triggered fade-in component reveals content as it enters view, alongside a homepage image/video carousel and a lazy-loaded background video that only starts downloading once it's needed.",
  },
  {
    label: "Hosting",
    value: "Netlify, via the official Next.js runtime plugin, on a Node 20 build.",
  },
  {
    label: "Forms",
    value:
      "A general enquiry form and a separate vehicle-specific enquiry form tied to a stock listing, plus a slide-out service request drawer and a floating mobile call-to-action button for booking or calling directly — built around how the site actually gets used on a phone in a car park.",
  },
  {
    label: "SEO & reviews",
    value:
      "Structured data (schema.org JSON-LD) for local business and vehicle listings, a generated sitemap and robots.txt, and a testimonials section pulling in real customer reviews.",
  },
];

const visuals = [
  {
    label: "Home page — forecourt hero and current stock teaser",
    src: "/video/yardley-hastings-garage/homepage.mp4",
    poster: "/video/stills/yhg/homepage.jpg",
    caption:
      "Real workshop and forecourt photography in the hero, keeping the site grounded in the actual business rather than stock imagery, with a live teaser of current stock pulled straight from Supabase.",
  },
  {
    label: "Site-wide navigation — servicing, bodywork and detailing",
    src: "/video/yardley-hastings-garage/navigation.mp4",
    poster: "/video/stills/yhg/navigation.jpg",
    caption:
      "Servicing, bodywork and detailing each get their own section off a single clear nav, so the site reads as one garage with several services rather than a bolted-together set of pages.",
  },
  {
    label: "Stocklist page — structured vehicle listings from Supabase",
    src: "/video/yardley-hastings-garage/stocklist.mp4",
    poster: "/video/stills/yhg/stocklist.jpg",
    caption:
      "Each vehicle — make, model, registration, spec, photo set — is a structured Supabase record, so listings can be added, updated or removed without a developer in the loop.",
  },
  {
    label: "Servicing — booking flow and service information",
    src: "/video/yardley-hastings-garage/servicing.mp4",
    poster: "/video/stills/yhg/servicing.jpg",
    caption:
      "Clear service information and a straightforward booking path — the kind of detail that turns a browsing visitor into a phone call or a booking, not just a page view.",
  },
];

const stack = ["Next.js", "Supabase", "Netlify"];

export default function YHGPage() {
  return (
    <div className="akaru-theme">
      <CaseStudyHero
        category="Website + Platform"
        title="Yardley Hastings Garage"
        summary="A Next.js site for an independent garage, with a managed stocklist and customer reviews as structured data behind the marketing front end — not just a brochure site."
        stack={stack}
      />

      <CaseStudyFeatures overview={overview} features={features} />

      <CaseStudyVisuals visuals={visuals} />

      <CaseStudyCTA heading="Need a site with real data behind it, not just pages?">
        <p>
          Yardley Hastings Garage now has one place customers browse and one
          place stock gets managed, instead of a static site that goes stale
          the moment a car sells.
        </p>
      </CaseStudyCTA>

      <CaseStudyFooterNav
        prev={{ href: "/work/apki-technologies", label: "APKI Technologies" }}
        next={{
          href: "/work/renewables-connect",
          label: "Renewables Connect",
        }}
      />
    </div>
  );
}
