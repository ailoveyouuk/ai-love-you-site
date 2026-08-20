import Link from "next/link";
import type { ReactNode } from "react";
import SlidingDoorReveal from "@/components/SlidingDoorReveal";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * Shared case-study system, in the Akaru-inspired imagery-first language
 * (numbered visual blocks behind a sliding-door reveal, short captions
 * instead of paragraphs wrapped around the image). Originally hand-built
 * for the APKI Technologies page; lifted out here so all four case
 * studies share one component instead of diverging.
 */

export function CaseStudyHero({
  category,
  title,
  summary,
  stack,
}: {
  category: string;
  title: string;
  summary: ReactNode;
  stack: string[];
}) {
  return (
    <div className="container-page pt-16">
      <Breadcrumbs items={[{ label: "Cases", href: "/work" }, { label: title }]} />
      <p className="ak-label mt-10">
        <span className="accent">{category}</span>
      </p>
      <h1 className="ak-headline mt-4 max-w-4xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ak-muted)" }}>
        {summary}
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
        {stack.map((s) => (
          <span key={s} className="ak-label">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export type CaseStudyFeature = { label: string; value: ReactNode };

// 3x2 spec-table borders: an internal grid line to the right of every cell
// except the last column, and below every cell except the last row — the
// outer edge is handled by the container's own border. Mobile collapses to
// a single column, so only the bottom rule applies there.
function specCellBorder(index: number, total: number) {
  const cols = 3;
  const rows = Math.ceil(total / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);
  const isLastRow = row === rows - 1;
  const isLastInMobileFlow = index === total - 1;

  const mobileBottom = isLastInMobileFlow ? "" : "border-b border-border";
  const desktopRight = col === cols - 1 ? "sm:border-r-0" : "sm:border-r";
  const desktopBottom = isLastRow ? "sm:border-b-0" : "sm:border-b";

  return `${mobileBottom} border-border ${desktopRight} ${desktopBottom}`;
}

/** "At a glance" section — a full-width intro line, larger than the body
 *  copy around it to read as a standalone summary, sitting above a
 *  separate bordered 3x2 spec table (technology, animation, backend,
 *  hosting, forms, responsiveness — six cells, cleanly gridlined). */
export function CaseStudyFeatures({
  overview,
  features,
}: {
  overview: ReactNode;
  features: CaseStudyFeature[];
}) {
  return (
    <div className="ak-rule mt-16">
      <div className="container-page py-14">
        <p className="ak-label">
          <span className="accent">At a glance</span>
        </p>
        <p
          className="mt-6 max-w-3xl text-xl leading-relaxed"
          style={{ color: "var(--ak-ink)" }}
        >
          {overview}
        </p>
        <div className="mt-10 grid grid-cols-1 border border-border bg-surface sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.label}
              className={`p-6 sm:p-8 ${specCellBorder(i, features.length)}`}
            >
              <p className="ak-label">{f.label}</p>
              <div
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--ak-muted)" }}
              >
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VIDEO_EXTENSIONS = [".mov", ".mp4", ".webm"];

export type CaseStudyVisual = {
  /** Used as the React key — keep unique per case study. */
  label: string;
  src: string;
  /** Still frame shown before a video loads (video src only). */
  poster?: string;
  caption: ReactNode;
};

// Every tile below the full-width lead shot uses the same aspect ratio, so
// the two-column grid lines up cleanly row by row instead of drifting like
// a masonry layout.
const GRID_TILE_ASPECT = "aspect-[4/3]";

function VisualTile({
  visual,
  index,
  aspect,
}: {
  visual: CaseStudyVisual;
  index: number;
  aspect: string;
}) {
  const isVideo = VIDEO_EXTENSIONS.some((ext) =>
    visual.src.toLowerCase().endsWith(ext)
  );
  return (
    <div>
      <span className="ak-index text-base">
        {String(index + 1).padStart(2, "0")}
      </span>
      <SlidingDoorReveal className={`mt-3 w-full ${aspect}`}>
        {isVideo ? (
          <video
            src={visual.src}
            poster={visual.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visual.src}
            alt={visual.label}
            className="h-full w-full object-cover"
          />
        )}
      </SlidingDoorReveal>
      <p className="ak-label mt-5">{visual.label}</p>
      <div
        className="mt-2 space-y-3 text-sm"
        style={{ color: "var(--ak-muted)" }}
      >
        {visual.caption}
      </div>
    </div>
  );
}

export function CaseStudyVisuals({ visuals }: { visuals: CaseStudyVisual[] }) {
  const [first, ...rest] = visuals;
  if (!first) return null;

  return (
    <div className="mt-20 pb-16">
      <div className="container-page">
        <VisualTile visual={first} index={0} aspect="aspect-video" />

        {rest.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2">
            {rest.map((v, i) => (
              <VisualTile
                key={v.label}
                visual={v}
                index={i + 1}
                aspect={GRID_TILE_ASPECT}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Text-only section — architecture notes, status updates, outcome copy.
 *  Used where there's no image to lead with. */
export function CaseStudyTextSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="ak-rule">
      <div className="container-page grid gap-8 py-16 lg:grid-cols-[120px_1fr]">
        <p className="ak-label">{eyebrow}</p>
        <div className="max-w-2xl space-y-4 text-lg" style={{ color: "var(--ak-ink)" }}>
          {title && <h2 className="ak-heading text-2xl">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
}

/** Closing call to action — replaces the old "Where it stands" text
 *  section with a direct pitch to get in touch, matching the CTA pattern
 *  already used at the bottom of the capability pages. */
export function CaseStudyCTA({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="ak-rule">
      <div className="container-page flex flex-col items-start gap-6 py-16">
        <h2 className="ak-heading max-w-2xl text-3xl">{heading}</h2>
        <div className="max-w-xl space-y-4" style={{ color: "var(--ak-muted)" }}>
          {children}
        </div>
        <Link href="/contact" className="ak-btn ak-btn-accent">
          Start a project &rarr;
        </Link>
      </div>
    </div>
  );
}

export function CaseStudyFooterNav({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div className="container-page flex items-center justify-between py-14">
      {prev ? (
        <Link href={prev.href} className="ak-btn">
          &larr; {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="ak-btn">
          {next.label} &rarr;
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
