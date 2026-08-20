import type { Metadata } from "next";
import {
  CaseStudyHero,
  CaseStudyFeatures,
  CaseStudyVisuals,
  CaseStudyCTA,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "APKI Technologies",
  description:
    "A Next.js marketing site for a UK-made, ruggedised portable power unit, rebuilt to speak to humanitarian and defence buyers first.",
  openGraph: {
    title: "APKI Technologies — AI Love You",
    description:
      "A Next.js marketing site for a UK-made, ruggedised portable power unit, rebuilt to speak to humanitarian and defence buyers first.",
    images: [
      {
        url: "/images/apki/homepage-hero.jpg",
        width: 1536,
        height: 784,
        alt: "APKI Technologies homepage hero",
      },
    ],
  },
};

const overview =
  "A Next.js marketing site for a UK-made, ruggedised portable power unit, rebuilt to speak to humanitarian and defence buyers first while keeping the UK power-network and home-medical proof front and centre.";

const features = [
  {
    label: "Technology",
    value: "Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 — mobile-first breakpoints throughout, no external UI library.",
  },
  {
    label: "Animation & diagrams",
    value:
      "A custom IntersectionObserver + CSS-transition reveal component drives scroll-triggered fade/slide-ins, alongside an animated stat counter, a hand-built SVG company timeline, a generative pixel world map, and interactive power-flow/feature diagrams and a livery gallery.",
  },
  {
    label: "Content & data",
    value:
      "No CMS or database — copy, specs and partner logos live in typed TypeScript content files, kept in version control alongside the code rather than behind an admin panel.",
  },
  {
    label: "Hosting",
    value: "Vercel, deployed straight from the Next.js build with no custom server.",
  },
  {
    label: "Contact",
    value:
      "A mailto-based enquiry form — no backend to maintain. It's deep-linkable, so a \"Request data sheets\" button elsewhere on the site can open the form with the enquiry type and message already filled in.",
  },
  {
    label: "SEO & compliance",
    value:
      "Generated sitemap and robots.txt, plus dedicated privacy, terms, cookies, accessibility and modern slavery statement pages — the paper trail a defence or NGO procurement buyer expects to find.",
  },
];

const visuals = [
  {
    label: "Homepage → Product walkthrough",
    src: "/video/apki/homepage-to-product.mp4",
    caption:
      "The humanitarian-first hero, the scroll-revealed proof sections (DNO deployments, ISO certification, any-source charging), and the transition into the Product page's spec sheet and remote-monitoring story.",
  },
  {
    label: "Home page hero",
    src: "/images/apki/homepage-hero.jpg",
    caption:
      "The hero leads with the humanitarian and field-deployment story first, using APKI's real palette (Green #28730A, Yellow #ACAB0F) and Oswald headings pulled straight from the brand handbook.",
  },
  {
    label: "Proof section — medical equipment tested",
    src: "/images/apki/medical-equipment-grid.jpg",
    caption:
      "A dark, high-contrast section breaks the rhythm of the page to slow the reader down on the evidence — the exact medical equipment tested, plus ISO 9001/14001 certificate numbers, not vague claims.",
  },
  {
    label: "Quality & Compliance → Contact walkthrough",
    src: "/video/apki/quality-to-contact.mp4",
    caption:
      "The certification and compliance evidence a procurement or DNO buyer checks first, through to the enquiry path — kept short and low-friction rather than a generic contact form.",
  },
  {
    label: "Product page — real photography and spec sheet",
    src: "/images/apki/product-hero.jpg",
    caption:
      "The Product page pairs real photography with a clean spec table and the remote-monitoring/Wi-Fi story — built to answer a procurement buyer's questions in order.",
  },
  {
    label: "Company page walkthrough",
    src: "/video/apki/company.mp4",
    caption:
      "The 1994-to-today origin story and vision, echoing the brand handbook's own timeline graphic — the credibility context behind the product, not just a spec sheet.",
  },
];

const stack = ["Next.js", "Tailwind CSS"];

export default function APKIPage() {
  return (
    <div className="akaru-theme">
      <CaseStudyHero
        category="Website"
        title="APKI Technologies"
        summary="A Next.js site for a UK-made, ruggedised portable power unit — repositioning a product proven in UK power-network and home-medical contexts as field-deployable technology for humanitarian aid."
        stack={stack}
      />

      <CaseStudyFeatures overview={overview} features={features} />

      <CaseStudyVisuals visuals={visuals} />

      <CaseStudyCTA heading="Need a site that speaks to a technical, high-stakes buyer?">
        <p>
          The APKI site gives them a credible front door for the market
          they&apos;re actively expanding into — NGOs, aid agencies and
          defence procurement — while keeping the DNO and home-medical
          evidence front and centre as proof rather than an afterthought.
        </p>
      </CaseStudyCTA>

      <CaseStudyFooterNav
        next={{
          href: "/work/yardley-hastings-garage",
          label: "Yardley Hastings Garage",
        }}
      />
    </div>
  );
}
