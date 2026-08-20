"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PlaceholderShot from "@/components/PlaceholderShot";

export type ShowcaseItem = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  href: string;
  image?: string;
};

/**
 * Scroll-linked numbered showcase (desktop), in the spirit of
 * silent-house.com's "1 / 2 / 3" pinned section: a sticky visual panel on
 * one side crossfades between project images as the reader scrolls past
 * each numbered row on the other side. The active row expands with its
 * summary and a link; the rest sit collapsed to just a number and title.
 *
 * Active row is whichever row's vertical centre is closest to the
 * viewport's centre line, recomputed on scroll via rAF-throttled
 * getBoundingClientRect reads (cheap — only runs while scrolling, and
 * only over a handful of rows).
 */
export default function ScrollShowcase({ items }: { items: ShowcaseItem[] }) {
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
        <div className="relative h-[calc(70vh-40px)] overflow-hidden border border-border bg-surface">
          {items.map((item, i) => (
            <div
              key={item.slug}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-opacity duration-500 ease-out"
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
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="font-mono text-xs text-muted">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <Link
            href={activeItem.href}
            className="text-xs text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-foreground"
          >
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
              className="flex min-h-[60vh] items-center border-t border-border first:border-t-0"
            >
              <Link href={item.href} className="group w-full py-8">
                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-muted/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`text-3xl transition-colors duration-300 sm:text-4xl ${
                      isActive
                        ? "text-foreground"
                        : "text-muted/40 group-hover:text-muted"
                    }`}
                  >
                    {item.name}
                  </h3>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isActive ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="eyebrow text-accent">{item.category}</p>
                  <p className="mt-2 max-w-md text-sm text-muted">
                    {item.summary}
                  </p>
                  <span className="mt-3 inline-block text-xs text-accent underline decoration-accent/40 underline-offset-4">
                    Read the case study &rarr;
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
