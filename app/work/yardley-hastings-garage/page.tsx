import type { Metadata } from "next";
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";
import VisualBlock from "@/components/VisualBlock";

export const metadata: Metadata = {
  title: "Yardley Hastings Garage — AI Love You",
};

export default function YHGPage() {
  return (
    <>
      <CaseStudyHeader
        category="Website + Platform"
        title="Yardley Hastings Garage"
        summary="A Next.js site for an independent garage, with a managed stocklist and customer reviews as structured data behind the marketing front end — not just a brochure site."
        stack={["Next.js", "Supabase", "Netlify"]}
      />

      <div className="container-page py-14">
        <p className="max-w-2xl text-muted">
          Yardley Hastings Garage needed a site that looks the part &mdash;
          workshop and forecourt photography, service content &mdash; and
          also keeps an accurate, current stocklist and real customer
          reviews without the owner touching code. Built on Next.js with
          Supabase as the backing store, deployed on Netlify.
        </p>
      </div>

      <div className="container-page space-y-16 pb-20">
        <VisualBlock
          label="Home page — forecourt hero and current stock teaser"
          alt="Screen recording of the Yardley Hastings Garage home page, showing the forecourt hero and current stock teaser"
          caption="Yardley Hastings Garage"
          source="Live navigation, home page"
          src="/video/yardley-hastings-garage/homepage.mp4"
          poster="/video/stills/yhg/homepage.jpg"
        >
          <p>
            Real workshop and forecourt photography in the hero, keeping the
            site grounded in the actual business rather than stock imagery,
            with a live teaser of current stock pulled straight from
            Supabase.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Site-wide navigation — servicing, bodywork and detailing"
          alt="Screen recording navigating the Yardley Hastings Garage site across its main sections"
          caption="Yardley Hastings Garage"
          source="Live navigation, full site"
          src="/video/yardley-hastings-garage/navigation.mp4"
          poster="/video/stills/yhg/navigation.jpg"
        >
          <p>
            Servicing, bodywork and detailing each get their own section off
            a single clear nav, so the site reads as one garage with several
            services rather than a bolted-together set of pages.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Stocklist page — structured vehicle listings from Supabase"
          alt="Screen recording of the Yardley Hastings Garage stocklist page, showing structured vehicle listings"
          caption="Yardley Hastings Garage"
          source="Stocklist"
          src="/video/yardley-hastings-garage/stocklist.mp4"
          poster="/video/stills/yhg/stocklist.jpg"
        >
          <p>
            Each vehicle &mdash; make, model, registration, spec, photo set
            &mdash; is a structured Supabase record, so listings can be
            added, updated or removed without a developer in the loop.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Servicing — booking flow and service information"
          alt="Screen recording of the Yardley Hastings Garage servicing pages and booking flow"
          caption="Yardley Hastings Garage"
          source="Servicing"
          src="/video/yardley-hastings-garage/servicing.mp4"
          poster="/video/stills/yhg/servicing.jpg"
        >
          <p>
            Clear service information and a straightforward booking path
            &mdash; the kind of detail that turns a browsing visitor into a
            phone call or a booking, not just a page view.
          </p>
        </VisualBlock>
      </div>

      <CaseStudySection eyebrow="Outcome" title="Where it stands">
        <p>
          The garage now has one place customers browse and one place stock
          gets managed, instead of a static site that goes stale the moment a
          car sells.
        </p>
      </CaseStudySection>

      <CaseStudyFooterNav
        prev={{ href: "/work/apki-technologies", label: "APKI Technologies" }}
        next={{
          href: "/work/renewables-connect",
          label: "Renewables Connect",
        }}
      />
    </>
  );
}
