import type { Metadata } from "next";
import Link from "next/link";
import CapabilityGrid from "@/components/CapabilityGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import SlidingDoorReveal from "@/components/SlidingDoorReveal";
import { CaseStudyFeatures } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Learning Platforms",
  description:
    "Course content, progress tracking and scored assessment, built to scale — the detail behind Renewables Connect, a four-app learning platform rebuild.",
  openGraph: {
    title: "Learning Platforms — AI Love You",
    description:
      "Course content, progress tracking and scored assessment, built to scale — the detail behind Renewables Connect, a four-app learning platform rebuild.",
    images: [
      {
        url: "/images/renewables-connect/dashboard.jpg",
        width: 1280,
        height: 800,
        alt: "Renewables Connect learner dashboard",
      },
    ],
  },
};

const capabilities = [
  {
    title: "Multi-app architecture",
    body: "Separate learner, institution, employer and admin experiences where the audience genuinely needs it — sharing one type system and design language rather than one app trying to be everything to everyone.",
  },
  {
    title: "Course & content architecture",
    body: "Modules, sections and content blocks modelled as structured, typed data — text, video, image, callout, chart, quiz — so one viewer renders any course without a bespoke template per page.",
  },
  {
    title: "Progress tracking",
    body: "Per-learner progress, completion and reading state tracked at the section level, rolling up into part- and programme-level dashboards rather than a single blunt \"% complete\" figure.",
  },
  {
    title: "Assessment & scoring",
    body: "Scored quizzes with pass marks, wrong-answer explanations and results that feed straight back into the learner's dashboard — built to confirm learning, not just mark attendance.",
  },
  {
    title: "Authentication at scale",
    body: "Sign-in that works for a mixed audience — Microsoft Authentication for learners inside a corporate tenant, and open account creation for everyone else — verified independently on the API, not just trusted from the front end.",
  },
  {
    title: "Content authoring",
    body: "A CMS layer for non-developer editors to publish and update course content without a deploy, once the catalogue is big enough that editing code isn't the right workflow any more.",
  },
  {
    title: "Data visualisation",
    body: "Progress, completion and cohort figures presented as clear charts and dashboards, in a consistent visual language across every app in the system.",
  },
  {
    title: "Built to scale",
    body: "A data model, hosting setup and CI/CD pipeline designed for thousands of concurrent learners from day one, not retrofitted once a spreadsheet-and-PDF system falls over.",
  },
];

const renewablesOverview =
  "Renewables Connect deliver professional training for the global renewables industry. Their existing platform ran on SharePoint — static PDFs, no accounts, no progress tracking. The rebuild is a four-app Next.js system — learner, institution, employer and admin — with a working dashboard, module viewer, scored assessments and a content model designed to scale to thousands of learners.";

const renewablesFeatures = [
  {
    label: "Technology",
    value:
      "A Turborepo monorepo — four Next.js apps plus a Fastify API and shared TypeScript packages, typed end to end. One @rc/types package defines Learner, Certificate and JobRole once, used identically everywhere.",
  },
  {
    label: "Backend & data",
    value:
      "A dedicated Fastify + Prisma API over PostgreSQL, containerised with Docker, sitting behind all four apps rather than each one hitting its own database.",
  },
  {
    label: "Content",
    value:
      "Sanity CMS with Portable Text rendering, so course content can be updated by a non-developer editor without a code deploy.",
  },
  {
    label: "Authentication",
    value:
      "Microsoft Authentication (MSAL) against Azure AD B2C, with the API independently verifying every request's token via JWKS.",
  },
  {
    label: "Assessment",
    value:
      "Every sub-module ends in a ten-question, scored Confirmation of Learning quiz with a 70% pass mark and wrong-answer explanations linking back to the relevant section.",
  },
  {
    label: "Hosting & CI/CD",
    value:
      "Each app deploys to its own Azure Static Web App, with GitHub Actions building and deploying automatically on push to main.",
  },
];

export default function LearningPlatformsPage() {
  return (
    <div className="akaru-theme">
      <div className="container-page pt-16">
        <Breadcrumbs items={[{ label: "Learning Platforms" }]} />
        <p className="ak-label mt-10">
          <span className="accent">Learning Platforms</span>
        </p>
        <h1 className="ak-headline mt-4 max-w-3xl">
          Course content, progress and assessment — built to scale.
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ak-muted)" }}>
          A learning platform is a specific kind of build: structured course
          content, per-learner progress, scored assessment, and often
          several different audiences — learners, institutions, employers,
          admins — who each need their own view of the same data. It&apos;s
          the largest platform project I&apos;ve built, for{" "}
          <Link href="/work/renewables-connect" className="ak-link-accent">
            Renewables Connect
          </Link>
          , and the detail below is drawn directly from that build.
        </p>

        <div className="mt-8">
          <Link href="/contact" className="ak-btn ak-btn-accent">
            Tell me what you&apos;re building &rarr;
          </Link>
        </div>
      </div>

      <div className="ak-rule mt-16">
        <div className="container-page py-16">
          <p className="ak-label">What it covers</p>
          <h2 className="ak-heading mt-3 text-2xl">
            What goes into a learning platform build.
          </h2>
          <CapabilityGrid items={capabilities} />
        </div>
      </div>

      <div className="ak-rule">
        <div className="container-page py-16">
          <p className="ak-label">
            <span className="accent">The build</span>
          </p>
          <h2 className="ak-heading mt-3 max-w-2xl text-2xl">
            Renewables Connect — a SharePoint learning archive rebuilt as a
            four-app platform.
          </h2>
          <p
            className="mt-4 max-w-2xl text-sm leading-relaxed"
            style={{ color: "var(--ak-muted)" }}
          >
            {renewablesOverview}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
            <div>
              <span className="ak-index text-base">01</span>
              <SlidingDoorReveal className="mt-3 w-full aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/renewables-connect/dashboard.jpg"
                  alt="Renewables Connect learner dashboard"
                  className="h-full w-full object-cover"
                />
              </SlidingDoorReveal>
              <p className="ak-label mt-5">
                Learner dashboard — programme progress at a glance
              </p>
            </div>
            <div>
              <span className="ak-index text-base">02</span>
              <SlidingDoorReveal className="mt-3 w-full aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/renewables-connect/module-viewer.jpg"
                  alt="Renewables Connect module viewer"
                  className="h-full w-full object-cover"
                />
              </SlidingDoorReveal>
              <p className="ak-label mt-5">
                Module viewer — sectioned content with reading progress
              </p>
            </div>
          </div>
        </div>
      </div>

      <CaseStudyFeatures
        overview="The stack and architecture behind Renewables Connect, in brief."
        features={renewablesFeatures}
      />

      <div className="ak-rule">
        <div className="container-page flex flex-col items-start gap-6 py-16">
          <h2 className="ak-heading max-w-2xl text-3xl">
            Need a course, training programme or internal academy built
            properly?
          </h2>
          <p className="max-w-xl" style={{ color: "var(--ak-muted)" }}>
            See the{" "}
            <Link href="/work/renewables-connect" className="ak-link-accent">
              full Renewables Connect case study
            </Link>{" "}
            for every screen, or read about{" "}
            <Link href="/platform-development" className="ak-link-accent">
              platform development
            </Link>{" "}
            more broadly. If Claude belongs in the platform too — content
            drafting, learner support, automated summaries — that&apos;s
            covered on{" "}
            <Link href="/ai-integration" className="ak-link-accent">
              AI integration
            </Link>
            .
          </p>
          <Link href="/contact" className="ak-btn ak-btn-accent">
            Start a project &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
