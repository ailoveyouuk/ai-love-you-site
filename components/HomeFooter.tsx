import Link from "next/link";

/**
 * Minimal, persistent footer for the paged homepage — socials and the
 * legal essentials, nothing else. Fixed at the bottom of the viewport so
 * it never has to be scrolled to; the standard multi-column Footer
 * appears on every other page instead (see ConditionalFooter).
 */
export default function HomeFooter() {
  return (
    <footer className="ak-home-footer">
      <div className="container-page flex h-full items-center justify-between">
        <p className="ak-label">
          &copy; {new Date().getFullYear()} Lewis McKinnon, trading as AI
          Love You
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com/ailoveyouuk"
            target="_blank"
            rel="noopener noreferrer"
            className="ak-label transition-colors hover:text-[color:var(--ak-ink)]"
          >
            Instagram
          </a>
          <a
            href="/journal"
            target="_blank"
            rel="noopener noreferrer"
            className="ak-label ak-link-accent transition-colors hover:opacity-70"
          >
            Journal
          </a>
          <Link
            href="/privacy"
            className="ak-label transition-colors hover:text-[color:var(--ak-ink)]"
          >
            Privacy
          </Link>
          <Link
            href="/legal"
            className="ak-label transition-colors hover:text-[color:var(--ak-ink)]"
          >
            Legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
