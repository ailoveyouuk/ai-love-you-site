import type { Metadata } from "next";
import {
  CaseStudyHero,
  CaseStudyFeatures,
  CaseStudyVisuals,
  CaseStudyTextSection,
  CaseStudyCTA,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "AI Love You Journal",
  description:
    "A self-published lifestyle & culture publication under the AI Love You name — where the studio's design language actually lives first.",
  openGraph: {
    title: "AI Love You Journal — AI Love You",
    description:
      "A self-published lifestyle & culture publication under the AI Love You name — where the studio's design language actually lives first.",
    images: [
      {
        url: "/video/stills/journal/homepage.jpg",
        width: 1280,
        height: 704,
        alt: "AI Love You Journal homepage",
      },
    ],
  },
};

const overview =
  "A self-published lifestyle & culture publication under the AI Love You name — the studio's own design language, built and maintained as a real front-end project rather than a blog template.";

const features = [
  {
    label: "Technology",
    value:
      "Hand-built HTML, CSS and JavaScript — no framework, no CMS. It's where the AI Love You palette, type scale and editorial layout were established first, before this portfolio site borrowed them. No framework runtime to ship keeps the payload minimal and load times fast.",
  },
  {
    label: "Content",
    value:
      "Editions are authored directly rather than pulled from a database or headless CMS, keeping the archive fully under version control.",
  },
  {
    label: "Navigation & search",
    value:
      "A persistent sidebar with live search, department and tag filters, and a period selector — the structured browsing a larger content site needs, proven here first at a smaller scale.",
  },
  {
    label: "Animation",
    value: "CSS transitions handle the entry and page-to-page transitions, kept restrained so they never get in the way of reading.",
  },
  {
    label: "Responsiveness",
    value: "Mobile-first layout, with the sidebar collapsing to a standard mobile nav pattern on small screens.",
  },
  {
    label: "Hosting",
    value: "Static hosting — no server-rendered pages or backend to maintain.",
  },
];

const visuals = [
  {
    label: "Homepage — edition archive and sidebar navigation",
    src: "/video/journal/homepage.mp4",
    poster: "/video/stills/journal/homepage.jpg",
    caption:
      "A persistent sidebar nav and search keep the archive navigable as it grows, with trending tags and a period filter surfacing older editions rather than burying them.",
  },
  {
    label: "Filtering & search — finding an edition by tag or period",
    src: "/video/journal/filtering.mp4",
    poster: "/video/stills/journal/filtering.jpg",
    caption:
      "Department and tag filters, live search and a period selector — the same kind of structured browsing a larger content site needs, built here at a smaller scale first.",
  },
  {
    label: "Edition navigation — reading experience between entries",
    src: "/video/journal/edition-nav.mp4",
    poster: "/video/stills/journal/edition-nav.jpg",
    caption:
      "Long-form editorial layout with clean transitions between entries — built for reading, not just browsing, with the same typographic care as the rest of the AI Love You brand.",
  },
];

const stack = ["HTML", "CSS", "JavaScript"];

export default function AILoveYouJournalPage() {
  return (
    <div className="akaru-theme">
      <CaseStudyHero
        category="Editorial Platform"
        title="AI Love You Journal"
        summary="A self-published lifestyle & culture publication under the AI Love You name — the studio's own design language, built and maintained as a real front-end project rather than a blog template."
        stack={stack}
      />

      <CaseStudyFeatures overview={overview} features={features} />

      <CaseStudyTextSection eyebrow="Context" title="Where the system lives.">
        <p>
          The Journal is where the AI Love You design system actually lives
          first — the studio palette, typography and editorial layout this
          portfolio site borrows from were established here. It&apos;s
          hand-built front end, not a CMS theme: a searchable, filterable
          archive of editions with a custom sidebar reading experience.
        </p>
      </CaseStudyTextSection>

      <CaseStudyVisuals visuals={visuals} />

      <CaseStudyCTA heading="Want a site with a genuine voice, not a template?">
        <p>
          The Journal is a live, ongoing publication and the clearest proof
          of the AI Love You voice and design language in one place — and
          the source this portfolio site&apos;s own design system was
          pulled from.
        </p>
      </CaseStudyCTA>

      <CaseStudyFooterNav
        prev={{
          href: "/work/renewables-connect",
          label: "Renewables Connect",
        }}
        next={{ href: "/work/apki-technologies", label: "APKI Technologies" }}
      />
    </div>
  );
}
