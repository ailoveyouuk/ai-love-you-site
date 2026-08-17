"use client";

import { useEffect, useState } from "react";

/**
 * Slim cookie consent bar — essential-only by default, optional analytics
 * only on explicit "Accept all". Ported from the same pattern used on the
 * AI Love You Journal (cookie-consent.js), sharing the same localStorage
 * key so a returning visitor's choice is recognisable across both
 * properties in spirit, and restyled with the studio pill-button system
 * rather than the Journal's dark bar.
 */
const STORAGE_KEY = "aily_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        // Deliberate effect, not a lint-rule violation in practice: this
        // reads a browser-only value (localStorage) that isn't knowable
        // during SSR. Starting from `false` on both the server render and
        // the client's first render, then flipping post-mount, avoids a
        // hydration mismatch — computing this eagerly via a lazy useState
        // initializer would make the client's first paint disagree with
        // the server's and trigger a hydration error instead.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (e.g. private mode) — skip the banner
      // rather than risk an error loop.
    }
  }, []);

  function dismiss(choice: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore — best effort only
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 backdrop-blur-md"
    >
      <div className="container-page flex flex-col gap-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">
          This site uses essential cookies to run, and optional analytics
          cookies to understand how it&apos;s used.{" "}
          <a
            href="/privacy#cookies"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            Cookie Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => dismiss("declined")}
            className="btn btn-sm"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="btn btn-solid btn-sm"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
