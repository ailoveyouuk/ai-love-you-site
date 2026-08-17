// This component is no longer used — removed from app/layout.tsx per
// client feedback (regular system cursor preferred). Left unimported so
// it has zero effect; delete this file whenever convenient.
"use client";

import { useEffect, useRef } from "react";

/**
 * Signature circular cursor from the AI Love You design system.
 * Opt-in only: added purely client-side after mount, only on
 * fine-pointer (mouse/trackpad) devices, so it never affects touch
 * users or server-rendered markup. If JS fails to run, the native
 * cursor is simply left alone (see the default `display:none` on
 * `.cursor-dot` in globals.css).
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      el.closest("a, button, [role='button'], input, textarea, select");

    const over = (e: MouseEvent) => {
      if (isInteractive(e.target)) dot.classList.add("active");
    };
    const out = (e: MouseEvent) => {
      if (isInteractive(e.target)) dot.classList.remove("active");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
