import type { Metadata } from "next";
import Link from "next/link";
import PixelReveal from "@/components/PixelReveal";
import PixelRevealGroup from "@/components/PixelRevealGroup";

export const metadata: Metadata = {
  title: "Platform Development — AI Love You",
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

export default function PlatformDevelopmentPage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow text-accent">Platform Development</p>
      <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
        Data, CRM and project systems behind the front end.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Some projects need more than a site &mdash; they need the structured
        data, CRM-style tooling or project systems running behind it.
        Renewables Connect, in the{" "}
        <Link
          href="/work"
          className="text-accent underline decoration-accent/40 underline-offset-4"
        >
          work
        </Link>{" "}
        section, is a live example: a learning platform with real content
        architecture and a data model built to scale to thousands of
        learners.
      </p>

      <div className="mt-8">
        <Link href="/contact" className="btn btn-solid">
          Tell me what you&apos;re building
        </Link>
      </div>

      <div className="mt-20">
        <p className="eyebrow text-xs text-muted">What it covers</p>
        <h2 className="mt-3 text-2xl text-foreground">
          Broadly, what a platform project involves.
        </h2>
        <PixelRevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {covers.map((item, i) => (
            <PixelReveal
              key={item.title}
              number={String(i + 1).padStart(2, "0")}
              title={item.title}
              body={item.body}
              className="min-h-[190px]"
            />
          ))}
        </PixelRevealGroup>
      </div>

      <div className="pixel-dots mt-16 border border-border bg-surface/60 p-8">
        <p className="eyebrow text-xs text-muted">More detail coming soon</p>
        <p className="mt-3 max-w-xl text-sm text-muted">
          This page is a first pass &mdash; the full breakdown of process,
          stack and what&apos;s included (in the same detail as{" "}
          <Link
            href="/website-development"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            website development
          </Link>
          ) is coming. If the platform needs AI built in too &mdash;
          automation, dashboards that summarise themselves, that kind of
          thing &mdash; that&apos;s covered on{" "}
          <Link
            href="/ai-integration"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            AI integration
          </Link>
          . In the meantime, get in touch and we can talk through what a
          platform build would look like for you.
        </p>
      </div>
    </div>
  );
}
