"use client";

import { useEffect, useRef, useState } from "react";
import { useStepReveal } from "@/components/useStepReveal";
import { useTypewriter } from "@/components/useTypewriter";

// Pause after an item finishes typing/fading in before it concertinas
// down to its column width and the next item begins.
const SETTLE_DELAY_MS = 450;

type Phase = "building" | "settled";

// Column width once an item has settled — matches the gap-x-8 (2rem) used
// on the flex container, so settled items line up exactly as they would
// in a plain sm:grid-cols-2 lg:grid-cols-3 grid.
const SETTLED_WIDTH =
  "w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]";

function ConcertinaItem({
  index,
  title,
  body,
  phase,
  onBuilt,
}: {
  index: number;
  title: string;
  body: string;
  phase: Phase;
  onBuilt: () => void;
}) {
  const building = phase === "building";
  const { typed, typing, bodyReady } = useTypewriter(title, {
    active: building,
  });
  const firedRef = useRef(false);

  useEffect(() => {
    if (building && bodyReady && !firedRef.current) {
      firedRef.current = true;
      const t = setTimeout(onBuilt, SETTLE_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, [building, bodyReady, onBuilt]);

  const settled = phase === "settled";

  return (
    <div
      className={`transition-[width] duration-700 ease-out ${
        settled ? SETTLED_WIDTH : "w-full"
      }`}
    >
      <span className={building ? "ak-index ak-step-number-in" : "ak-index"}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="ak-heading mt-3 text-lg">
        {settled ? (
          title
        ) : (
          <>
            <span aria-hidden="true">
              {typed}
              {typing && <span className="ak-type-cursor" />}
            </span>
            <span className="sr-only">{title}</span>
          </>
        )}
      </h3>
      <p
        className={`mt-2 text-sm ${
          settled || bodyReady ? "ak-step-in" : "ak-step-pending"
        }`}
        style={{ color: "var(--ak-muted)" }}
      >
        {body}
      </p>
    </div>
  );
}

/**
 * Sequential "concertina" reveal — an alternative to CapabilityGrid's
 * all-at-once staggered build. Item 01 renders full width and plays its
 * number/type/fade build-in, then folds down to its column width; item
 * 02 then builds full width beneath it, folds in alongside 01; and so on
 * until every item has settled into a normal sm:grid-cols-2 lg:grid-cols-3
 * layout. Used where a single section should read as a deliberate
 * one-at-a-time build rather than the whole group arriving together.
 */
export default function CapabilityConcertina({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  const { ref, active } = useStepReveal<HTMLDivElement>();
  const [builtCount, setBuiltCount] = useState(0);

  const visibleCount = active ? Math.min(builtCount + 1, items.length) : 0;

  return (
    <div ref={ref} className="mt-8 flex flex-wrap gap-x-8 gap-y-10">
      {items.slice(0, visibleCount).map((item, i) => (
        <ConcertinaItem
          key={item.title}
          index={i}
          title={item.title}
          body={item.body}
          phase={i < builtCount ? "settled" : "building"}
          onBuilt={() => setBuiltCount((c) => Math.max(c, i + 1))}
        />
      ))}
    </div>
  );
}
