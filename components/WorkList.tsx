"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { useStepReveal } from "@/components/useStepReveal";
import { useTypewriter } from "@/components/useTypewriter";

const ROW_STAGGER_MS = 200;

function WorkRow({
  index,
  project,
  active,
}: {
  index: number;
  project: Project;
  active: boolean;
}) {
  const startDelay = index * ROW_STAGGER_MS;
  const { typed, typing, bodyReady } = useTypewriter(project.name, {
    active,
    startDelay,
  });

  return (
    <Link
      href={project.href}
      className="ak-rule group block py-10 transition-colors first:pt-0 hover:bg-[color:var(--ak-line)]/20"
    >
      <div className="container-page grid gap-6 lg:grid-cols-[120px_1fr_280px] lg:items-center">
        <span
          className={active ? "ak-index text-base ak-step-number-in" : "ak-index text-base ak-step-pending"}
          style={active ? { animationDelay: `${startDelay}ms` } : undefined}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <p className={active ? "ak-label ak-step-number-in" : "ak-label ak-step-pending"} style={active ? { animationDelay: `${startDelay}ms` } : undefined}>
            {project.category}
          </p>
          <h2 className="ak-heading mt-2 text-3xl sm:text-4xl">
            <span aria-hidden="true">
              {typed}
              {typing && <span className="ak-type-cursor" />}
            </span>
            <span className="sr-only">{project.name}</span>
          </h2>
          <p
            className={`mt-3 max-w-xl text-sm ${bodyReady ? "ak-step-in" : "ak-step-pending"}`}
            style={{ color: "var(--ak-muted)" }}
          >
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {project.stack.map((s) => (
              <span
                key={s}
                className={`ak-label ${bodyReady ? "ak-step-in" : "ak-step-pending"}`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {project.image ? (
          <div
            className={`aspect-video w-full overflow-hidden ${bodyReady ? "ak-step-in" : "ak-step-pending"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.name} — ${project.category}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <span />
        )}
      </div>
    </Link>
  );
}

/** Numbered, full-width project rows for the /work index — each row
 *  builds in as: number + category pop in, the title types out, then
 *  the summary/stack/image fade in — staggered down the list the first
 *  time it scrolls into view. */
export default function WorkList({ projects }: { projects: Project[] }) {
  const { ref, active } = useStepReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mt-16 flex flex-col">
      {projects.map((project, i) => (
        <WorkRow key={project.slug} index={i} project={project} active={active} />
      ))}
    </div>
  );
}
