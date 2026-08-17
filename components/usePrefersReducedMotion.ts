import { useEffect, useState } from "react";

/**
 * Whether the user has requested reduced motion — `null` until known.
 *
 * This is a browser-only value (matchMedia), unknowable during SSR.
 * Starting from `null` on both the server render and the client's first
 * render, then resolving it in an effect post-mount, avoids a hydration
 * mismatch: computing it eagerly via a lazy useState initializer would
 * make the client's first paint disagree with the server's and trigger a
 * hydration error instead. This is the one shared place that pattern
 * lives, rather than duplicated (and re-justified) in every animated
 * component that needs it.
 */
export function usePrefersReducedMotion(): boolean | null {
  const [value, setValue] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    setValue(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return value;
}
