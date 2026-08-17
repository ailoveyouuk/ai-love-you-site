import type { Metadata } from "next";
import Link from "next/link";
import PixelReveal from "@/components/PixelReveal";
import PixelRevealGroup from "@/components/PixelRevealGroup";

export const metadata: Metadata = {
  title: "About — AI Love You",
};

const steps = [
  {
    title: "Understand the brief",
    body: "What the site or platform actually needs to do, for whom, and what \"done\" looks like — before any design or code.",
  },
  {
    title: "Design the system, not just the page",
    body: "Brand, content structure and data model worked out together, so the front end and the platform behind it are built to fit each other.",
  },
  {
    title: "Build in the open",
    body: "Working in Next.js and Tailwind as a default, with Supabase, Sanity or Azure brought in where the project needs real data, CMS or infrastructure — regular check-ins, no black box.",
  },
  {
    title: "Ship, then hand over cleanly",
    body: "A live site or platform you (or your team) can actually run, with the parts that need ongoing content or data management made manageable without a developer on call.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow text-accent">
        About
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
        Websites and platforms, built with care.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        I&apos;m Lewis McKinnon, a freelance web and platform developer. AI
        Love You is the studio name I build under &mdash; it&apos;s what you
        see on this site and on Instagram; Lewis McKinnon is the name on the
        invoice.
      </p>

      <div className="mt-16">
        <p className="eyebrow text-xs text-muted">Process</p>
        <h2 className="mt-3 text-2xl text-foreground">How I work.</h2>
        <PixelRevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <PixelReveal
              key={step.title}
              number={String(i + 1).padStart(2, "0")}
              title={step.title}
              body={step.body}
              className="min-h-[190px] bg-surface"
            />
          ))}
        </PixelRevealGroup>
      </div>

      <div className="mt-16 max-w-2xl space-y-4 text-muted">
        <h2 className="text-2xl text-foreground">A bit more</h2>
        <p>
          I build websites and the platforms underneath them &mdash; data
          management, CRM-style tooling, project systems &mdash; for
          businesses that need both to work together, not just a page that
          looks good. Recent work spans a brand-driven product site for a
          UK power-technology company, a garage website with a live stock
          and reviews platform behind it, and the architecture for a
          learning platform rebuild serving thousands of learners.
        </p>
        <p>
          I also write the{" "}
          <a
            href="https://www.ailoveyou.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            AI Love You Journal
          </a>
          , a lifestyle &amp; culture publication under the
          same brand &mdash; it&apos;s not a coded build, but it&apos;s the
          clearest sense of the tone and quality bar the AI Love You name
          carries.
        </p>
      </div>

      <div className="mt-16">
        <Link href="/contact" className="btn btn-solid">
          Get in touch
        </Link>
      </div>
    </div>
  );
}
