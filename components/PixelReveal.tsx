"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * A card that's invisible until its turn in the cascade (see
 * PixelRevealGroup): its outline draws itself in one stroke, then its
 * number animates in, then its title and body follow. No pixelation —
 * kept the file name for import stability, but this is now a straight
 * "draw the card, then reveal its content" sequence.
 */

const DRAW_DURATION = 550; // ms — time for the outline to trace itself
const NUMBER_DURATION = 260; // ms — number fade/rise
const TEXT_DURATION = 340; // ms — title + body fade/rise
const GAP = 90; // ms — pause between each stage
const CASCADE_STEP = 220; // ms — default stagger between cards (see Group)
const PERIMETER = 4 * 99; // matches the rect's user-space width/height below

type Phase = "idle" | "outline" | "number" | "text" | "done";

export default function PixelReveal({
  number,
  title,
  body,
  className = "",
  active = true,
  index = 0,
  step = CASCADE_STEP,
}: {
  number: string;
  title: string;
  body: string;
  className?: string;
  /** Set true (typically by PixelRevealGroup) to start the sequence. */
  active?: boolean;
  /** Position in the cascade — 0 draws in first. */
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
        timers.push(
          setTimeout(() => {
            setPhase("number");
            timers.push(
              setTimeout(() => {
                setPhase("text");
                timers.push(
                  setTimeout(() => setPhase("done"), TEXT_DURATION)
                );
              }, NUMBER_DURATION + GAP)
            );
          }, DRAW_DURATION + GAP)
        );
      }, index * step)
    );
    return () => timers.forEach(clearTimeout);
  }, [active, index, step, reduceMotion]);

  const outlineOn = reduceMotion === true || phase !== "idle";
  const numberOn =
    reduceMotion === true ||
    phase === "number" ||
    phase === "text" ||
    phase === "done";
  const textOn =
    reduceMotion === true || phase === "text" || phase === "done";

  return (
    <div className={`relative ${className}`}>
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

      <div className="relative flex h-full flex-col p-6">
        <span
          className="font-mono text-sm text-accent"
          style={{
            opacity: numberOn ? 1 : 0,
            transform: numberOn ? "translateY(0)" : "translateY(4px)",
            transition: `opacity ${NUMBER_DURATION}ms ease-out, transform ${NUMBER_DURATION}ms ease-out`,
          }}
        >
          {number}
        </span>
        <div
          style={{
            opacity: textOn ? 1 : 0,
            transform: textOn ? "translateY(0)" : "translateY(6px)",
            transition: `opacity ${TEXT_DURATION}ms ease-out, transform ${TEXT_DURATION}ms ease-out`,
          }}
        >
          <h3 className="mt-2 text-lg">{title}</h3>
          <p className="mt-2 text-sm text-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}
