"use client";

import { useStepReveal } from "@/components/useStepReveal";
import { useTypewriter } from "@/components/useTypewriter";

const ITEM_STAGGER_MS = 160;

function CapabilityItem({
  index,
  title,
  body,
  active,
}: {
  index: number;
  title: string;
  body: string;
  active: boolean;
}) {
  const startDelay = index * ITEM_STAGGER_MS;
  const { typed, typing, bodyReady } = useTypewriter(title, { active, startDelay });

  return (
    <div>
      <span
        className={active ? "ak-index ak-step-number-in" : "ak-index ak-step-pending"}
        style={active ? { animationDelay: `${startDelay}ms` } : undefined}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="ak-heading mt-3 text-lg">
        <span aria-hidden="true">
          {typed}
          {typing && <span className="ak-type-cursor" />}
        </span>
        <span className="sr-only">{title}</span>
      </h3>
      <p
        className={`mt-2 text-sm ${bodyReady ? "ak-step-in" : "ak-step-pending"}`}
        style={{ color: "var(--ak-muted)" }}
      >
        {body}
      </p>
    </div>
  );
}

/**
 * Numbered capability/process list — the Akaru-inspired replacement for
 * the old PixelReveal card grid. Each item builds in as: number pops in,
 * the title types out, then the body fades in — staggered across the
 * group the first time it scrolls into view.
 */
export default function CapabilityGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  const { ref, active } = useStepReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <CapabilityItem
          key={item.title}
          index={i}
          title={item.title}
          body={item.body}
          active={active}
        />
      ))}
    </div>
  );
}
