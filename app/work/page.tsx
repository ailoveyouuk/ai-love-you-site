import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import WorkList from "@/components/WorkList";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "A selection of recent builds — a marketing site, a website with a data platform behind it, a platform rebuild, and the self-published Journal this design language started on.",
  openGraph: {
    title: "Cases — AI Love You",
    description:
      "A selection of recent builds — a marketing site, a website with a data platform behind it, a platform rebuild, and the self-published Journal this design language started on.",
  },
};

export default function WorkPage() {
  return (
    <div className="akaru-theme">
      <div className="container-page pt-16">
        <Breadcrumbs items={[{ label: "Cases" }]} />
        <p className="ak-label mt-10">
          <span className="accent">Cases</span>
        </p>
        <h1 className="ak-headline mt-4 max-w-3xl">
          Sites and platforms, built end to end.
        </h1>
        <p className="mt-6 max-w-xl text-lg" style={{ color: "var(--ak-muted)" }}>
          A selection of recent builds — a marketing site, a website with a
          data platform behind it, a platform rebuild in progress, and the
          self-published Journal this design language started on.
        </p>
      </div>

      <WorkList projects={projects} />

      <div className="ak-rule">
        <div className="container-page grid gap-8 py-16 lg:grid-cols-[120px_1fr]">
          <p className="ak-label">Also live</p>
          <div>
            <h2 className="ak-heading text-2xl">The Journal itself.</h2>
            <p className="mt-3 max-w-xl text-sm" style={{ color: "var(--ak-muted)" }}>
              The case study above covers the build — the live, ongoing
              publication is at{" "}
              <a href="/journal" target="_blank" rel="noopener noreferrer" className="ak-link-accent">
                ailoveyou.uk/journal
              </a>
              , and it&apos;s the clearest evidence of the AI Love You voice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
