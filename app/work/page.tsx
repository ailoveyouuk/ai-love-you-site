import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import PlaceholderShot from "@/components/PlaceholderShot";
import PixelRevealGroup from "@/components/PixelRevealGroup";
import PixelRevealProjectCard from "@/components/PixelRevealProjectCard";

export const metadata: Metadata = {
  title: "Work — AI Love You",
};

export default function WorkPage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow text-accent">
        Work
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
        Sites and platforms, built end to end.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Four builds &mdash; a marketing site, a website with a data platform
        behind it, a platform rebuild in progress, and the self-published
        Journal this design language started on.
      </p>

      <PixelRevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <PixelRevealProjectCard
            key={project.slug}
            category={project.category}
            name={project.name}
            summary={project.summary}
            href={project.href}
            image={
              project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={`${project.name} — ${project.category}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PlaceholderShot
                  label={`${project.name} — ${project.category}`}
                  alt={`Placeholder screenshot for ${project.name}`}
                />
              )
            }
          />
        ))}
      </PixelRevealGroup>

      <div className="mt-20 pixel-dots border border-border bg-surface/60 p-8">
        <p className="eyebrow text-xs text-muted">Also live</p>
        <h2 className="mt-3 text-xl">The Journal itself</h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          The case study above covers the build &mdash; the live, ongoing
          publication is at{" "}
          <a
            href="https://www.ailoveyou.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            ailoveyou.uk
          </a>
          , and it&apos;s the clearest evidence of the AI Love You voice.
        </p>
      </div>
    </div>
  );
}
