import type { Metadata } from "next";
import {
  CaseStudyHeader,
  CaseStudySection,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";
import VisualBlock from "@/components/VisualBlock";

export const metadata: Metadata = {
  title: "Renewables Connect — AI Love You",
};

export default function RenewablesConnectPage() {
  return (
    <>
      <CaseStudyHeader
        category="Platform"
        title="Renewables Connect"
        summary="Architecture and build for a ground-up rebuild of a SharePoint-based learning platform into a structured, CMS-driven system on Azure, built to serve thousands of learners globally."
        stack={["Next.js", "Sanity CMS", "Azure AD B2C", "Azure Functions"]}
      />

      <div className="border-b border-border">
        <div className="container-page py-14">
          <p className="max-w-2xl text-muted">
            Renewables Connect deliver professional training for the global
            renewables industry. Their existing learning platform ran on
            SharePoint — course content served as static PDFs, no structured
            progress tracking, no learner accounts that followed a student
            from one device to another. As the course catalogue expanded, the
            platform couldn&apos;t hold up: editors had no authoring
            environment beyond file management, and learners had no meaningful
            experience.
          </p>
          <p className="mt-4 max-w-2xl text-muted">
            The agreed brief was a complete rebuild on a modern,
            maintainable stack: Next.js as the front-end framework, Sanity as
            the headless CMS for structured content authoring, and Azure AD
            B2C for authentication &mdash; all designed to a minimum of
            5,000 registered learners globally from day one, with room to grow.
          </p>
        </div>
      </div>

      <CaseStudySection eyebrow="Architecture" title="How it&apos;s built.">
        <p>
          The rebuild is structured around a clean separation between content,
          delivery, and identity. Sanity holds everything editorial &mdash;
          courses, modules, sub-modules, and the mix of content blocks within
          each (text, images, video, audio, quizzes) &mdash; and editors can
          structure and update content in a browser-based Studio without
          touching code. Azure handles the infrastructure layer: Azure AD B2C
          manages learner accounts and enterprise SSO, Azure Functions track
          and store progress, and Azure SQL holds the learner state. Media
          (video and audio for each sub-module) lives on Azure Blob Storage and
          delivers via Azure CDN.
        </p>
        <p>
          Next.js sits in front of all of it, pulling content from Sanity at
          build time where possible and on-demand for authenticated learner
          views, and calling Azure Functions for progress reads and writes.
          The result is a platform that feels like a purpose-built learning
          environment &mdash; because it is &mdash; not a file system with a
          login page in front.
        </p>
      </CaseStudySection>

      <div className="container-page space-y-16 pb-20">
        <VisualBlock
          label="Sanity Studio — sub-module authoring interface"
          alt="Placeholder for Renewables Connect CMS authoring screenshot"
          caption="Renewables Connect"
          source="CMS authoring"
        >
          <p>
            Sanity Studio gives Renewables Connect&apos;s content team a
            structured authoring environment for the first time. Courses break
            into modules, modules into sub-modules, and each sub-module
            accepts an ordered mix of content blocks &mdash; text, image,
            video, audio, quiz &mdash; configured in the Studio rather than
            assembled in code. Editors publish changes without a deployment.
          </p>
          <p>
            The first scoped course &mdash; &ldquo;An Introduction to the
            World of Renewables &amp; Clean Energy&rdquo; &mdash; runs to 15
            sub-modules and roughly 60 hours of study. The content model is
            designed to handle that depth without the data structure becoming
            unwieldy for editors or for the front end fetching it.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Learner dashboard — module progress across devices"
          alt="Placeholder for Renewables Connect learner dashboard screenshot"
          caption="Renewables Connect"
          source="Learner dashboard"
        >
          <p>
            Learner authentication is handled entirely by Azure AD B2C,
            which supports direct email/password accounts and enterprise SSO
            out of the box &mdash; relevant for corporate training buyers who
            want learners to authenticate against their own identity provider.
          </p>
          <p>
            Progress (completed sub-modules, current position, quiz results)
            is written to Azure SQL via Azure Functions each time a learner
            advances, and read back on login so progress follows them from
            desktop to tablet to mobile. No progress is stored client-side;
            it&apos;s always server-authoritative.
          </p>
        </VisualBlock>

        <VisualBlock
          label="Sub-module page — structured content blocks in the frontend"
          alt="Placeholder for Renewables Connect sub-module page screenshot"
          caption="Renewables Connect"
          source="Sub-module page"
        >
          <p>
            Each sub-module renders its content blocks in order &mdash; text
            sections, embedded video and audio (streamed from Azure Blob
            Storage via Azure CDN), image references, and inline quiz
            components. The block-based model means Sanity can hold content of
            quite different shapes (a mostly-text sub-module, an
            audio-led sub-module, a quiz-heavy assessment) and the front end
            renders each appropriately without bespoke templates per content
            type.
          </p>
        </VisualBlock>
      </div>

      <CaseStudySection eyebrow="Status" title="Where it stands.">
        <p>
          The platform is in active build against the agreed architecture.
          Renewables Connect are running the first course through the Sanity
          authoring environment as it&apos;s built, which means the content
          model is being validated against real editorial work rather than
          theoretical requirements. Learner-facing screens will follow as
          the auth and progress layers come online.
        </p>
        <p>
          Because the deliverable at this stage is an architecture and build
          &mdash; not a live product &mdash; this case study covers the
          decisions made and the system being assembled, not an outcome yet
          reached. Screenshots and outcome notes will be added once the
          platform reaches learners.
        </p>
      </CaseStudySection>

      <CaseStudyFooterNav
        prev={{
          href: "/work/yardley-hastings-garage",
          label: "Yardley Hastings Garage",
        }}
        next={{
          href: "/work/ai-love-you-journal",
          label: "AI Love You Journal",
        }}
      />
    </>
  );
}
