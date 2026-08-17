"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Animated project card — the "Selected work" / /work variant of PixelReveal.
 * Instead of number / title / body it takes category / name / summary, with an
 * optional image slot that reveals between the outline-draw and the text phases.
 *
 * Phases (no image):  idle → outline → heading → body → done
 * Phases (with image): idle → outline → image → heading → body → done
 *
 * Designed to be a direct child of PixelRevealGroup, which injects `active`
 * and `index` automatically.
 */

const DRAW_DURATION = 550; // outline traces itself
const IMAGE_DURATION = 300; // image fades in (only when image prop provided)
const HEADING_DURATION = 260; // category eyebrow fades/rises
const BODY_DURATION = 340; // name + summary + CTA fade/rise
const GAP = 90; // pause between phases
const CASCADE_STEP = 220; // default stagger between cards
const PERIMETER = 4 * 99;

type Phase = "idle" | "outline" | "image" | "heading" | "body" | "done";

export default function PixelRevealProjectCard({
  category,
  name,
  summary,
  href,
  image,
  featured = false,
  className = "",
  active = true,
  index = 0,
  step = CASCADE_STEP,
}: {
  category: string;
  name: string;
  summary: string;
  href: string;
  /** Optional image slot — e.g. <PlaceholderShot /> or <Image />. When provided,
   *  the image bleeds to the card edges and fades in as its own phase between
   *  the outline draw and the text reveal. */
  image?: ReactNode;
  /** Featured card gets extra padding (sm:p-10). Only meaningful without image. */
  featured?: boolean;
  className?: string;
  /** Injected by PixelRevealGroup — true once the group scrolls into view. */
  active?: boolean;
  /** Position in the cascade — 0 draws first. Injected by PixelRevealGroup. */
  index?: number;
  /** Ms between one card starting and the next. */
  step?: number;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const reduceMotion = usePrefersReducedMotion();
  const startedRef = useRef(false);

  useEffect(() => {
    // Reduced motion is handled entirely by the `reduceMotion === true ||`
    // checks below — the card renders fully resolved immediately, no
    // phase/timer state needed, so there's nothing to start here.
    if (!active || startedRef.current || reduceMotion === null) return;
    if (reduceMotion) return;
    startedRef.current = true;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        setPhase("outline");

        const afterOutline = () => {
          if (image) {
            setPhase("image");
            timers.push(
              setTimeout(() => {
                setPhase("heading");
                timers.push(
                  setTimeout(() => {
                    setPhase("body");
                    timers.push(
                      setTimeout(() => setPhase("done"), BODY_DURATION)
                    );
                  }, HEADING_DURATION + GAP)
                );
              }, IMAGE_DURATION + GAP)
            );
          } else {
            setPhase("heading");
            timers.push(
              setTimeout(() => {
                setPhase("body");
                timers.push(
                  setTimeout(() => setPhase("done"), BODY_DURATION)
                );
              }, HEADING_DURATION + GAP)
            );
          }
        };

        timers.push(setTimeout(afterOutline, DRAW_DURATION + GAP));
      }, index * step)
    );

    return () => timers.forEach(clearTimeout);
  }, [active, image, index, step, reduceMotion]);

  const outlineOn = reduceMotion === true || phase !== "idle";
  const imageOn =
    reduceMotion === true ||
    phase === "image" ||
    phase === "heading" ||
    phase === "body" ||
    phase === "done";
  const headingOn =
    reduceMotion === true ||
    phase === "heading" ||
    phase === "body" ||
    phase === "done";
  const bodyOn =
    reduceMotion === true || phase === "body" || phase === "done";

  return (
    <Link
      href={href}
      className={`group relative flex flex-col bg-surface ${
        image
          ? "" // no padding — image bleeds; text section carries its own
          : featured
          ? "justify-between p-6 sm:p-10"
          : "justify-between p-6"
      } ${className}`}
    >
      {/* Animated border — drawn in phase "outline" */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{
            strokeDasharray: PERIMETER,
            strokeDashoffset: outlineOn ? 0 : PERIMETER,
            transition: `stroke-dashoffset ${DRAW_DURATION}ms ease-in-out`,
          }}
        />
      </svg>

      {image ? (
        <>
          {/* Image — bleeds to card edges, fades in as its own phase */}
          <div
            className="relative"
            style={{
              opacity: imageOn ? 1 : 0,
              transition: `opacity ${IMAGE_DURATION}ms ease-out`,
            }}
          >
            {image}
          </div>

          {/* Text + CTA below the image, padded, CTA pinned to bottom */}
          <div className="relative flex flex-1 flex-col justify-between p-6">
            <div>
              <p
                className="eyebrow text-xs text-accent"
                style={{
                  opacity: headingOn ? 1 : 0,
                  transform: headingOn ? "translateY(0)" : "translateY(4px)",
                  transition: `opacity ${HEADING_DURATION}ms ease-out, transform ${HEADING_DURATION}ms ease-out`,
                }}
              >
                {category}
              </p>
              <div
                style={{
                  opacity: bodyOn ? 1 : 0,
                  transform: bodyOn ? "translateY(0)" : "translateY(6px)",
                  transition: `opacity ${BODY_DURATION}ms ease-out, transform ${BODY_DURATION}ms ease-out`,
                }}
              >
                <h3 className="mt-3 text-lg">{name}</h3>
                <p className="mt-3 text-sm text-muted">{summary}</p>
              </div>
            </div>
            <p
              className="mt-4 text-xs uppercase tracking-[0.05em] text-foreground/70 transition-colors group-hover:text-accent"
              style={{
                opacity: bodyOn ? 1 : 0,
                transition: `opacity ${BODY_DURATION}ms ease-out`,
              }}
            >
              Read the case study &rarr;
            </p>
          </div>
        </>
      ) : (
        <>
          {/* No image — content + CTA as siblings so justify-between pins CTA to bottom */}
          <div className="relative">
            <p
              className="eyebrow text-xs text-accent"
              style={{
                opacity: headingOn ? 1 : 0,
                transform: headingOn ? "translateY(0)" : "translateY(4px)",
                transition: `opacity ${HEADING_DURATION}ms ease-out, transform ${HEADING_DURATION}ms ease-out`,
              }}
            >
              {category}
            </p>
            <div
              style={{
                opacity: bodyOn ? 1 : 0,
                transform: bodyOn ? "translateY(0)" : "translateY(6px)",
                transition: `opacity ${BODY_DURATION}ms ease-out, transform ${BODY_DURATION}ms ease-out`,
              }}
            >
              <h3 className="mt-3 text-lg">{name}</h3>
              <p className="mt-3 text-sm text-muted">{summary}</p>
            </div>
          </div>
          <p
            className="relative mt-6 text-xs uppercase tracking-[0.05em] text-foreground/70 transition-colors group-hover:text-accent"
            style={{
              opacity: bodyOn ? 1 : 0,
              transition: `opacity ${BODY_DURATION}ms ease-out`,
            }}
          >
            Read the case study &rarr;
          </p>
        </>
      )}
    </Link>
  );
}
