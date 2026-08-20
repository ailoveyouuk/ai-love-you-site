"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Akaru-style "sliding door" reveal: two panels meet at the centre line
 * and part toward the outer edges to reveal the content beneath.
 *
 * Two trigger modes, both supported at once:
 *  - `revealOnView` (default true): doors open once, the first time the
 *    frame scrolls into the viewport — the entrance transition.
 *  - `openKey`: when this value changes (e.g. an active project index),
 *    the doors close over the current content, swap happens instantly
 *    while hidden, then reopen — used to transition between projects in
 *    the homepage showcase rather than a crossfade.
 */
export default function SlidingDoorReveal({
  children,
  className = "",
  revealOnView = true,
  openKey,
}: {
  children: ReactNode;
  className?: string;
  revealOnView?: boolean;
  openKey?: string | number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(!revealOnView);
  const [open, setOpen] = useState(!revealOnView);
  const prevKey = useRef(openKey);

  // Entrance: open once when the frame first scrolls into view.
  useEffect(() => {
    if (!revealOnView) return;
    const el = frameRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      // Deferred to a microtask rather than called synchronously in the
      // effect body — same pattern used elsewhere for reduced-motion
      // "settle immediately" states (see usePrefersReducedMotion).
      const t = setTimeout(() => {
        setHasEntered(true);
        setOpen(true);
      }, 0);
      return () => clearTimeout(t);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          // Small delay so the frame is settled before the doors move.
          const t = setTimeout(() => setOpen(true), 120);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealOnView]);

  // Swap trigger: close the doors, then reopen shortly after the key
  // (active project) changes — content underneath swaps while hidden.
  useEffect(() => {
    if (openKey === undefined) return;
    if (prevKey.current === openKey) return;
    prevKey.current = openKey;
    if (!hasEntered) return; // entrance transition owns the first open

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    // Doors must close synchronously with the key change (not deferred)
    // so the close animation starts exactly when the active project
    // switches; the reopen below is already deferred via setTimeout.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    const t = setTimeout(() => setOpen(true), 420);
    return () => clearTimeout(t);
  }, [openKey, hasEntered]);

  return (
    <div ref={frameRef} className={`ak-door-frame ${open ? "is-open" : ""} ${className}`}>
      {children}
      <div className="ak-door-panel ak-door-panel--left" aria-hidden="true" />
      <div className="ak-door-panel ak-door-panel--right" aria-hidden="true" />
    </div>
  );
}
