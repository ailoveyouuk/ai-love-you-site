import type { Metadata } from "next";
import Link from "next/link";
import {
  CaseStudyHero,
  CaseStudyFeatures,
  CaseStudyVisuals,
  CaseStudyTextSection,
  CaseStudyCTA,
  CaseStudyFooterNav,
} from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Renewables Connect",
  description:
    "A ground-up rebuild of a SharePoint learning platform into a four-app system — learner, institution, employer and admin — built to scale to thousands of learners.",
  openGraph: {
    title: "Renewables Connect — AI Love You",
    description:
      "A ground-up rebuild of a SharePoint learning platform into a four-app system — learner, institution, employer and admin — built to scale to thousands of learners.",
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

const overview =
  "A ground-up rebuild of a SharePoint-based learning platform into a four-app system — learner, institution, employer and admin — with a working dashboard, module viewer, progress tracking and assessment engine, built to serve thousands of learners globally.";

const features = [
  {
    label: "Technology",
    value:
      "A Turborepo monorepo — four Next.js apps (learner, institution, employer, admin) plus a Fastify API and shared TypeScript packages, all typed end to end. A single @rc/types package defines Learner, Certificate and JobRole once, consumed identically by every app and the API.",
  },
  {
    label: "Backend & data",
    value:
      "A dedicated Fastify + Prisma API over PostgreSQL, containerised with Docker and health-checked, sitting behind the four front-end apps rather than each app hitting its own database directly.",
  },
  {
    label: "Content",
    value:
      "Sanity CMS with Portable Text rendering for course content, so non-developer editors can update modules without a deploy.",
  },
  {
    label: "Authentication",
    value:
      "Microsoft Authentication (MSAL) against Azure AD B2C, with the API independently verifying each request's token via JWKS rather than trusting the front end.",
  },
  {
    label: "Data visualisation",
    value: "Chart.js, in a consistent dark \"data card\" style for progress and completion figures.",
  },
  {
    label: "Hosting & CI/CD",
    value:
      "Each of the four apps deploys to its own Azure Static Web App, with GitHub Actions building and deploying automatically on push to main — Tailwind CSS throughout, mobile-first via a shared design system.",
  },
];

const visuals = [
  {
    label: "Learner dashboard — programme progress at a glance",
    src: "/images/renewables-connect/dashboard.jpg",
    caption:
      "The dashboard is the learner's home screen: overall completion, average quiz score, and a breakdown by the three curriculum parts, each with its own progress bar and completion percentage. Career Profile and Programme Overview surface as secondary cards — the former feeds the employer-facing talent pipeline once a learner opts in to be discoverable.",
  },
  {
    label: "Module viewer — sectioned content with reading progress",
    src: "/images/renewables-connect/module-viewer.jpg",
    caption:
      "Each sub-module is broken into sections listed in a table-of-contents sidebar, with a per-section time estimate and a live progress indicator as the learner scrolls. Content blocks — video, image, callout, chart — render in order from structured data, so the same viewer handles an eleven-section deep-dive or a six-section overview without bespoke templates.",
  },
  {
    label: "Confirmation of Learning — scored assessment with feedback",
    src: "/images/renewables-connect/quiz.jpg",
    caption:
      "Every sub-module ends in a ten-question Confirmation of Learning quiz — four options per question, a pass mark of 70%, and wrong-answer explanations that link straight back to the relevant section for review. It's built end-to-end: questions render, answers score, and results feed back into the dashboard's per-part completion figures.",
  },
  {
    label: "Part overview — sub-module cards with live status",
    src: "/images/renewables-connect/part-overview.jpg",
    caption:
      "Each of the three curriculum parts has its own overview page — sub-module cards showing section count, estimated hours, topic tags and live status (available, in progress, completed, coming soon), so a learner or an institution reviewing the programme can see the shape of a part before committing to it.",
  },
  {
    label: "Sign-in — Microsoft Authentication via Azure AD B2C",
    src: "/images/renewables-connect/login.jpg",
    caption:
      "Sign-in runs on Azure AD B2C with MSAL handling the token flow client-side — “Continue with Microsoft” for learners with an existing account, or a free account created through the same hosted flow. It satisfied a specific brief requirement: retain Microsoft Authentication from the SharePoint era while opening the platform to any learner globally, not just ones inside a corporate Microsoft tenant.",
  },
];

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Chart.js",
  "Azure AD B2C",
  "Azure",
];

export default function RenewablesConnectPage() {
  return (
    <div className="akaru-theme">
      <CaseStudyHero
        category="Platform"
        title="Renewables Connect"
        summary="A ground-up rebuild of a SharePoint-based learning platform into a four-app system — learner, institution, employer and admin — with a working dashboard, module viewer, progress tracking and assessment engine, built to serve thousands of learners globally."
        stack={stack}
      />

      <CaseStudyFeatures overview={overview} features={features} />

      <CaseStudyTextSection eyebrow="Brief" title="Where it started.">
        <p>
          Renewables Connect deliver professional training for the global
          renewables industry. Their existing learning platform ran on
          SharePoint — course content served as static PDFs, no structured
          progress tracking, no learner accounts that followed a student from
          one device to another. As the course catalogue expanded, the
          platform couldn&apos;t hold up: editors had no authoring environment
          beyond file management, and learners had no meaningful experience.
        </p>
        <p>
          The agreed brief was a complete rebuild on a modern stack, scoped as
          four connected apps rather than one monolith: a learner-facing
          platform, an institution dashboard for education partners, an
          employer app for talent discovery, and an internal admin console —
          all sharing a common type system and design language, designed to a
          minimum of 5,000 registered learners globally from day one.
        </p>
      </CaseStudyTextSection>

      <CaseStudyTextSection eyebrow="Architecture" title="How it's built.">
        <p>
          The build is a Next.js monorepo: four apps (learner, institution,
          employer, admin) plus two shared packages — a TypeScript type
          library used across all four, and a typed API client — so a{" "}
          <code>Learner</code>, a <code>Certificate</code> or a{" "}
          <code>JobRole</code> means the same thing everywhere it&apos;s
          referenced. Learner authentication runs on Microsoft Authentication
          via Azure AD B2C (MSAL), chosen so the platform can accept both
          direct email/password sign-ups and &ldquo;Sign in with
          Microsoft&rdquo; for learners with existing accounts. Course
          content is currently structured TypeScript content files — each
          sub-module an ordered set of sections and typed content blocks
          (text, image, video, audio, callout, chart, quiz) — with a Sanity
          CMS integration scoped for when a non-developer content team needs
          to publish without a deploy.
        </p>
        <p>
          The module viewer renders those content blocks against a
          table-of-contents sidebar with a live reading-progress bar and
          deep-linkable sections. Chart.js visualisations run throughout the
          curriculum in a consistent dark &ldquo;data card&rdquo; style, and
          each sub-module ends in a Confirmation of Learning assessment —
          scored, explained, and gated behind a 70% pass mark. Progress, quiz
          scores and completion state are tracked per learner and designed to
          sync through Azure Functions and Azure SQL once that backend layer
          is deployed, so a learner&apos;s place in the course follows them
          from device to device rather than living only in one browser.
        </p>
      </CaseStudyTextSection>

      <CaseStudyVisuals visuals={visuals} />

      <CaseStudyCTA heading="Building a platform this size?">
        <p>
          All fifteen sub-modules of the first course are built, with eleven
          of the fifteen carrying a live Confirmation of Learning quiz — the
          module viewer, dashboard, part overview and sign-in screens shown
          above are working, navigable UI, not mockups. If you need a
          platform built to scale from day one, with the data model,
          authentication and content architecture thought through properly,
          that&apos;s the kind of build this is. See{" "}
          <Link href="/learning-platforms" className="ak-link-accent">
            learning platforms
          </Link>{" "}
          for the full breakdown.
        </p>
      </CaseStudyCTA>

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
    </div>
  );
}
