import type { Metadata } from "next";
import Link from "next/link";
import CapabilityGrid from "@/components/CapabilityGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lewis McKinnon, freelance web & platform developer trading as AI Love You — how projects run, from brief to build to handover.",
  openGraph: {
    title: "About — AI Love You",
    description:
      "Lewis McKinnon, freelance web & platform developer trading as AI Love You — how projects run, from brief to build to handover.",
  },
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
    <div className="akaru-theme">
      <div className="container-page pt-16">
        <Breadcrumbs items={[{ label: "About" }]} />
        <p className="ak-label mt-10">
          <span className="accent">About</span>
        </p>
        <h1 className="ak-headline mt-4 max-w-3xl">
          Websites and platforms, built with care.
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ak-muted)" }}>
          I&apos;m Lewis McKinnon, a freelance web and platform developer. AI
          Love You is the studio name I build under — it&apos;s what you see
          on this site and on Instagram; Lewis McKinnon is the name on the
          invoice.
        </p>
      </div>

      <div className="ak-rule mt-16">
        <div className="container-page py-16">
          <p className="ak-label">Process</p>
          <h2 className="ak-heading mt-3 text-2xl">How I work.</h2>
          <CapabilityGrid items={steps} />
        </div>
      </div>

      <div className="ak-rule">
        <div className="container-page grid gap-8 py-16 lg:grid-cols-[120px_1fr]">
          <p className="ak-label">A bit more</p>
          <div className="max-w-2xl space-y-4 text-lg" style={{ color: "var(--ak-muted)" }}>
            <p>
              I build websites and the platforms underneath them — data
              management, CRM-style tooling, project systems — for
              businesses that need both to work together, not just a page
              that looks good. Recent work spans a brand-driven product site
              for a UK power-technology company, a garage website with a
              live stock and reviews platform behind it, and the
              architecture for a learning platform rebuild serving thousands
              of learners.
            </p>
            <p>
              I also write the{" "}
              <a
                href="/journal"
                target="_blank"
                rel="noopener noreferrer"
                className="ak-link-accent"
              >
                AI Love You Journal
              </a>
              , a lifestyle &amp; culture publication under the same brand —
              it&apos;s not a coded build, but it&apos;s the clearest sense
              of the tone and quality bar the AI Love You name carries.
            </p>
          </div>
        </div>
      </div>

      <div className="container-page py-14">
        <Link href="/contact" className="ak-btn">
          Get in touch &rarr;
        </Link>
      </div>
    </div>
  );
}
