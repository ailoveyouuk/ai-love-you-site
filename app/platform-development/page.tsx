import type { Metadata } from "next";
import Link from "next/link";
import CapabilityConcertina from "@/components/CapabilityConcertina";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Platform Development",
  description:
    "Data modelling, CRM-style tooling and project systems built behind the front end — from a garage's stocklist to a four-app learning platform.",
  openGraph: {
    title: "Platform Development — AI Love You",
    description:
      "Data modelling, CRM-style tooling and project systems built behind the front end — from a garage's stocklist to a four-app learning platform.",
  },
};

const covers = [
  {
    title: "Data modelling",
    body: "The structure behind the site — content, records, relationships — designed to fit how your business actually works, not forced into a generic template.",
  },
  {
    title: "CRM & admin tooling",
    body: "Lightweight tools for managing enquiries, customers or stock without needing a developer for every change — built around Supabase or a comparable backend.",
  },
  {
    title: "Integrations",
    body: "Connecting the platform to the tools you already use — email, payments, booking, reporting — rather than duplicating data by hand.",
  },
  {
    title: "Access & permissions",
    body: "Different views and controls for different roles, so a team can share one system without stepping on each other.",
  },
  {
    title: "Dashboard creation",
    body: "Clear, role-appropriate dashboards that surface the numbers that matter, rather than a raw data dump nobody opens twice.",
  },
  {
    title: "Learning environments",
    body: "Structured platforms for training and course content — modules, progress tracking, learner data — built to scale, like the Renewables Connect rebuild.",
  },
];

const process = [
  {
    title: "Discovery & data modelling",
    body: "Mapping how records, roles and relationships actually work in the business first — customers, stock, enquiries, learners, whatever the platform is built around — before a single table gets designed.",
  },
  {
    title: "Architecture & schema",
    body: "A proper schema and API shape decided up front: what's structured data versus content, what needs its own service, and how it all stays typed end to end from database to front end.",
  },
  {
    title: "Build",
    body: "Backend and admin tooling built in parallel with the front end — usually Supabase/Postgres for a single-app platform, or a dedicated API service once several apps need to share the same data.",
  },
  {
    title: "Integrations",
    body: "Wiring the platform to the tools already in use — email, payments, booking, reporting, Microsoft 365 — so data flows through the system instead of being re-entered by hand.",
  },
  {
    title: "Testing & rollout",
    body: "Tested against real data and real workflows before go-live, with a staged handover so the team using it day to day isn't learning the system cold.",
  },
  {
    title: "Ongoing management",
    body: "Monitoring, fixes and dependency/security updates included after launch, the same as every website build — a platform holding customer or learner data doesn't get to go stale.",
  },
];

export default function PlatformDevelopmentPage() {
  return (
    <div className="akaru-theme">
      <div className="container-page pt-16">
        <Breadcrumbs items={[{ label: "Platform Development" }]} />
        <p className="ak-label mt-10">
          <span className="accent">Platform Development</span>
        </p>
        <h1 className="ak-headline mt-4 max-w-3xl">
          Data, CRM and project systems behind the front end.
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ak-muted)" }}>
          Some projects need more than a site — they need the structured
          data, CRM-style tooling or project systems running behind it.
          That spans custom builds like Renewables Connect, covered in
          detail on{" "}
          <Link href="/learning-platforms" className="ak-link-accent">
            learning platforms
          </Link>{" "}
          — real content architecture and a data model built to scale to
          thousands of learners. Getting the most out of{" "}
          <Link href="/microsoft-365" className="ak-link-accent">
            Microsoft 365 and SharePoint
          </Link>{" "}
          you already run is covered separately.
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
            Broadly, what a platform project involves.
          </h2>
          <CapabilityConcertina items={covers} />
        </div>
      </div>

      <div className="ak-rule">
        <div className="container-page py-16">
          <p className="ak-label">Process</p>
          <h2 className="ak-heading mt-3 text-2xl">
            How a platform project runs, start to finish.
          </h2>
          <CapabilityConcertina items={process} />
        </div>
      </div>

      <div className="ak-rule">
        <div className="container-page py-16">
          <p className="ak-label">
            <span className="accent">In practice</span>
          </p>
          <h2 className="ak-heading mt-3 max-w-2xl text-2xl">
            Two different platforms, built the same way.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            <div>
              <p className="ak-label">
                <Link href="/work/renewables-connect" className="hover:text-[color:var(--ak-ink)]">
                  Renewables Connect
                </Link>
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ak-muted)" }}>
                A four-app learning platform — learner, institution, employer
                and admin — sharing one typed data model over a dedicated
                Fastify + Prisma API, built to scale to thousands of
                learners. Full breakdown on{" "}
                <Link href="/learning-platforms" className="ak-link-accent">
                  learning platforms
                </Link>
                .
              </p>
            </div>
            <div>
              <p className="ak-label">
                <Link href="/work/yardley-hastings-garage" className="hover:text-[color:var(--ak-ink)]">
                  Yardley Hastings Garage
                </Link>
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ak-muted)" }}>
                A single-app platform on Supabase/Postgres behind a garage&apos;s
                marketing site — customers, vehicles and enquiries as
                structured tables, with a stocklist that manages itself
                instead of a page that goes stale the moment a car sells.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="ak-rule">
        <div className="container-page flex flex-col items-start gap-6 py-16">
          <h2 className="ak-heading max-w-2xl text-3xl">
            Got data, records or a workflow that&apos;s outgrown spreadsheets?
          </h2>
          <p className="max-w-xl" style={{ color: "var(--ak-muted)" }}>
            Whether that&apos;s a CRM behind a website, an internal dashboard,
            or a full learning platform, it starts the same way — mapping how
            the business actually works before any schema gets written. If
            the platform needs Claude built in too — connectors, automation,
            dashboards that summarise themselves — that&apos;s covered on{" "}
            <Link href="/ai-integration" className="ak-link-accent">
              AI integration
            </Link>
            .
          </p>
          <Link href="/contact" className="ak-btn">
            Tell me what you&apos;re building &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
