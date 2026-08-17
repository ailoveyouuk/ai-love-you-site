"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Wraps a grid of PixelReveal cards and triggers them one after another
 * — not all at once — the moment the grid scrolls into view. Each direct
 * child is cloned with `active` and its position (`index`) in the
 * cascade, which PixelReveal uses to offset its own start time.
 */
export default function PixelRevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(
              child as ReactElement<{ active?: boolean; index?: number }>,
              { active, index: i }
            )
          : child
      )}
    </div>
  );
}
