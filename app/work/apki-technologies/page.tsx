import type { Metadata } from "next";
import Image from "next/image";
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";
import VisualBlock from "@/components/VisualBlock";

export const metadata: Metadata = {
  title: "APKI Technologies — AI Love You",
};

export default function APKIPage() {
  return (
    <>
      <CaseStudyHeader
        category="Website"
        title="APKI Technologies"
        summary="A Next.js site for a UK-made, ruggedised portable power unit — repositioning a product proven in UK power-network and home-medical contexts as field-deployable technology for humanitarian aid."
        stack={["Next.js", "Tailwind CSS"]}
      />

      <div className="border-b border-border">
        <div className="container-page grid gap-3 py-10 sm:grid-cols-3">
          <div className="overflow-hidden border border-border bg-surface">
            <Image
              src="/images/apki/front.jpg"
              alt="APKI 2200Li portable power unit, front view"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden border border-border bg-surface">
            <Image
              src="/images/apki/angle.jpg"
              alt="APKI 2200Li portable power unit, angled view"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden border border-border bg-surface">
            <Image
              src="/images/apki/back.jpg"
              alt="APKI 2200Li portable power unit, rear view"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        <p className="max-w-2xl text-muted">
          APKI make the <strong className="text-foreground">2200Li</strong>, a
          ruggedised, UK-made portable power unit already field-proven with 4
          of the 6 UK Distribution Network Operators and tested on real
          medical equipment. The brief was a site that reads as evidence-led
          technology, not a generic power-bank product page &mdash; built on
          Next.js and Tailwind from APKI&apos;s own brand handbook and spec
          sheet.
        </p>
      </div>

      <div className="container-page space-y-16 pb-20">
        <VisualBlock
          label="Homepage → Product walkthrough"
          alt="Screen recording navigating the APKI site from the homepage through the Product page"
          caption="APKI Technologies"
          source="Live navigation, home → product"
          src="/video/apki/homepage-to-product.mp4"
        >
          <p>
            The humanitarian-first hero, the scroll-revealed proof sections
            (DNO deployments, ISO certification, any-source charging), and
            the transition into the Product page&apos;s spec sheet and
            remote-monitoring story.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Quality & Compliance → Contact walkthrough"
          alt="Screen recording navigating from the Quality & Compliance page through to Contact"
          caption="APKI Technologies"
          source="Live navigation, compliance → contact"
          src="/video/apki/quality-to-contact.mp4"
        >
          <p>
            The certification and compliance evidence a procurement or DNO
            buyer checks first, through to the enquiry path &mdash; kept
            short and low-friction rather than a generic contact form.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Company page walkthrough"
          alt="Screen recording navigating the APKI Company page"
          caption="APKI Technologies"
          source="Live navigation, company"
          src="/video/apki/company.mp4"
        >
          <p>
            The 1994-to-today origin story and vision, echoing the brand
            handbook&apos;s own timeline graphic &mdash; the credibility
            context behind the product, not just a spec sheet.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Home page hero — power-flow motion graphic and headline"
          alt="APKI homepage hero: 'Power that keeps life-critical care running.'"
          caption="APKI Technologies"
          source="Home page hero"
          src="/images/apki/homepage-hero.jpg"
        >
          <p>
            The hero leads with the humanitarian and field-deployment story
            first, using APKI&apos;s real palette (Green #28730A, Yellow
            #ACAB0F) and Oswald headings pulled straight from the brand
            handbook. The DNO and utility-sector evidence sits just below as
            credibility, not the headline.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Proof section — full range of medical equipment tested"
          alt="Dark navy section listing the medical equipment APKI's unit has been independently tested on"
          caption="APKI Technologies"
          source="Home page — proof section"
          src="/images/apki/medical-equipment-grid.jpg"
        >
          <p>
            A dark, high-contrast section breaks the rhythm of the page to
            slow the reader down on the evidence &mdash; the exact medical
            equipment tested, plus ISO 9001/14001 certificate numbers, not
            vague claims.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Product page — real photography and spec sheet"
          alt="APKI 2200Li product page with real product photography and specification table"
          caption="APKI Technologies"
          source="Product page"
          src="/images/apki/product-hero.jpg"
        >
          <p>
            The Product page pairs real photography with a clean spec table
            and the remote-monitoring/Wi-Fi story &mdash; built to answer a
            procurement buyer&apos;s questions in order, not just look good in
            a hero shot.
          </p>
        </VisualBlock>
      </div>

      <CaseStudySection eyebrow="Outcome" title="Where it stands">
        <p>
          The site gives APKI a credible front door for the market they&apos;re
          actively expanding into &mdash; NGOs, aid agencies and defence
          procurement &mdash; while keeping the DNO and home-medical evidence
          front and centre as proof rather than an afterthought.
        </p>
      </CaseStudySection>

      <CaseStudyFooterNav
        next={{
          href: "/work/yardley-hastings-garage",
          label: "Yardley Hastings Garage",
        }}
      />
    </>
  );
}
