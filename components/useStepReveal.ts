"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives a "build in" reveal for a numbered list/grid — 01, 02, 03...
 * Attach `ref` to the container; `active` flips true (once) the first
 * time the container enters the viewport, and consuming components use
 * it to add a staggered fade/rise animation per item, e.g.:
 *
 *   const { ref, active } = useStepReveal<HTMLDivElement>();
 *   <div ref={ref}>
 *     {items.map((item, i) => (
 *       <div
 *         key={item.title}
 *         className={active ? "ak-step-in" : "ak-step-pending"}
 *         style={active ? { animationDelay: `${i * 90}ms` } : undefined}
 *       >
 *
 * Works for both normal scrolled-into-view sections and the paged
 * homepage's panels — those are already "in view" the moment they
 * mount, so the same observer fires almost immediately and the reveal
 * plays as a build-in on arrival instead.
 */
export function useStepReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred to a microtask rather than set synchronously in the
      // effect body — same pattern used elsewhere for reduced-motion
      // "settle immediately" states.
      const t = setTimeout(() => setActive(true), 0);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, active } as const;
}
