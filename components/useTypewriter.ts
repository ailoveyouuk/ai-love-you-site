"use client";

import { useEffect, useState } from "react";

const CHAR_MS = 35;
const BODY_GAP_MS = 180;

/**
 * Drives the "number first, then type the title, then fade the body"
 * build-in used by every numbered step/capability list. Call once per
 * item with that item's own `startDelay` (its stagger offset within the
 * group) — typing begins `leadMs` after `startDelay` (giving the number
 * its own beat first), runs one character at a time, then `bodyReady`
 * flips true a short pause after the last character lands.
 */
export function useTypewriter(
  text: string,
  {
    active,
    startDelay = 0,
    leadMs = 350,
  }: { active: boolean; startDelay?: number; leadMs?: number }
) {
  const [count, setCount] = useState(0);
  const [bodyReady, setBodyReady] = useState(false);

  useEffect(() => {
    if (!active) {
      // Deferred rather than called synchronously in the effect body —
      // same pattern used elsewhere for "reset/settle" state changes
      // triggered by an effect (see SlidingDoorReveal, usePrefersReducedMotion).
      const t = setTimeout(() => {
        setCount(0);
        setBodyReady(false);
      }, 0);
      return () => clearTimeout(t);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => {
        setCount(text.length);
        setBodyReady(true);
      }, 0);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= text.length; i++) {
      timers.push(
        setTimeout(() => setCount(i), startDelay + leadMs + i * CHAR_MS)
      );
    }
    timers.push(
      setTimeout(
        () => setBodyReady(true),
        startDelay + leadMs + text.length * CHAR_MS + BODY_GAP_MS
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [active, text, startDelay, leadMs]);

  return {
    typed: text.slice(0, count),
    typing: active && count < text.length,
    bodyReady,
  } as const;
}
