"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PlaceholderShot from "@/components/PlaceholderShot";
import SlidingDoorReveal from "@/components/SlidingDoorReveal";

export type ShowcaseItem = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  href: string;
  image?: string;
};

/**
 * Akaru-style numbered showcase: a sticky visual panel on one side that
 * transitions between project images via a sliding-door reveal (doors
 * close over the current image, swap happens hidden, doors reopen on the
 * next) as the reader scrolls past each numbered row on the other side.
 *
 * Structurally the same scroll-tracking approach as the previous
 * ScrollShowcase (closest-row-to-viewport-centre via rAF-throttled
 * getBoundingClientRect reads) — only the visual language changes: no
 * crossfade, doors instead; numbered rows in the tiny tracked-caps label
 * style rather than the pixel-art reveal cards.
 */
export default function AkaruShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    function update() {
      ticking = false;
      const viewportCenter = window.innerHeight * 0.5;
      let closestIndex = 0;
      let closestDist = Infinity;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const dist = Math.abs(rowCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      setActive(closestIndex);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const activeItem = items[active];

  return (
    <div className="hidden gap-16 lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Sticky visual panel */}
      <div className="sticky top-28 h-[70vh] self-start">
        <SlidingDoorReveal
          className="h-[calc(70vh-40px)] w-full"
          openKey={activeItem.slug}
        >
          {items.map((item, i) => (
            <div
              key={item.slug}
              aria-hidden={i !== active}
              className="absolute inset-0"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={`${item.name} — ${item.category}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PlaceholderShot label={item.name} alt={item.name} />
              )}
            </div>
          ))}
        </SlidingDoorReveal>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="ak-index">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <Link href={activeItem.href} className="ak-btn">
            View case study &rarr;
          </Link>
        </div>
      </div>

      {/* Numbered stack */}
      <div className="flex flex-col">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={item.slug}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="ak-rule flex min-h-[60vh] items-center first:border-t-0"
            >
              <Link href={item.href} className="group w-full py-8">
                <div className="flex items-baseline gap-4">
                  <span
                    className={`ak-index transition-colors duration-300 ${
                      isActive ? "text-[color:var(--ak-accent)]" : ""
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`ak-heading text-3xl transition-colors duration-300 sm:text-4xl ${
                      isActive ? "" : "opacity-30 group-hover:opacity-60"
                    }`}
                    style={{ color: "var(--ak-ink)" }}
                  >
                    {item.name}
                  </h3>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isActive ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="ak-label">
                    <span className="accent">{item.category}</span>
                  </p>
                  <p
                    className="mt-2 max-w-md text-sm"
                    style={{ color: "var(--ak-muted)" }}
                  >
                    {item.summary}
                  </p>
                  <span className="ak-btn mt-3">Read the case study &rarr;</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
