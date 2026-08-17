import type { Metadata } from "next";
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";
import VisualBlock from "@/components/VisualBlock";

export const metadata: Metadata = {
  title: "AI Love You Journal — AI Love You",
};

export default function AILoveYouJournalPage() {
  return (
    <>
      <CaseStudyHeader
        category="Editorial Platform"
        title="AI Love You Journal"
        summary="A self-published lifestyle & culture publication under the AI Love You name — the studio's own design language, built and maintained as a real front-end project rather than a blog template."
        stack={["HTML", "CSS", "JavaScript"]}
      />

      <div className="container-page py-14">
        <p className="max-w-2xl text-muted">
          The Journal is where the AI Love You design system actually lives
          first &mdash; the studio palette, typography and editorial layout
          this portfolio site borrows from were established here. It&apos;s
          hand-built front end, not a CMS theme: a searchable, filterable
          archive of editions with a custom sidebar reading experience.
        </p>
      </div>

      <div className="container-page space-y-16 pb-20">
        <VisualBlock
          label="Homepage — edition archive and sidebar navigation"
          alt="Screen recording of the AI Love You Journal homepage, showing the edition archive and sidebar navigation"
          caption="AI Love You Journal"
          source="Live navigation, homepage"
          src="/video/journal/homepage.mp4"
          poster="/video/stills/journal/homepage.jpg"
        >
          <p>
            A persistent sidebar nav and search keep the archive navigable as
            it grows, with trending tags and a period filter surfacing older
            editions rather than burying them.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Filtering & search — finding an edition by tag or period"
          alt="Screen recording of the AI Love You Journal's filtering and search in use"
          caption="AI Love You Journal"
          source="Live navigation, filtering"
          src="/video/journal/filtering.mp4"
          poster="/video/stills/journal/filtering.jpg"
        >
          <p>
            Department and tag filters, live search and a period selector
            &mdash; the same kind of structured browsing a larger content
            site needs, built here at a smaller scale first.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Edition navigation — reading experience between entries"
          alt="Screen recording navigating between AI Love You Journal editions"
          caption="AI Love You Journal"
          source="Live navigation, edition to edition"
          src="/video/journal/edition-nav.mp4"
          poster="/video/stills/journal/edition-nav.jpg"
        >
          <p>
            Long-form editorial layout with clean transitions between
            entries &mdash; built for reading, not just browsing, with the
            same typographic care as the rest of the AI Love You brand.
          </p>
        </VisualBlock>
      </div>

      <CaseStudySection eyebrow="Outcome" title="Where it stands">
        <p>
          A live, ongoing publication and the clearest proof of the AI Love
          You voice and design language in one place &mdash; and the source
          this portfolio site&apos;s own design system was pulled from.
        </p>
      </CaseStudySection>

      <CaseStudyFooterNav
        prev={{
          href: "/work/renewables-connect",
          label: "Renewables Connect",
        }}
        next={{ href: "/work/apki-technologies", label: "APKI Technologies" }}
      />
    </>
  );
}
