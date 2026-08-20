import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page flex flex-col gap-10 py-16 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow text-xs text-muted">
            Get in touch
          </p>
          <a
            href="mailto:lewis@ailoveyou.uk"
            className="mt-3 block text-lg text-foreground transition-colors hover:text-accent"
          >
            lewis@ailoveyou.uk
          </a>
          <p className="mt-1 text-sm text-muted">
            Lewis McKinnon &mdash; freelance web &amp; platform developer, UK.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <div>
            <p className="eyebrow text-xs text-muted">
              Services
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/website-development" className="transition-colors hover:text-accent">
                Websites
              </Link>
              <Link href="/platform-development" className="transition-colors hover:text-accent">
                Platforms
              </Link>
              <Link href="/microsoft-365" className="transition-colors hover:text-accent">
                Microsoft 365
              </Link>
              <Link href="/learning-platforms" className="transition-colors hover:text-accent">
                Learning Platforms
              </Link>
              <Link href="/ai-integration" className="transition-colors hover:text-accent">
                AI Integration
              </Link>
            </div>
          </div>

          <div>
            <p className="eyebrow text-xs text-muted">
              Studio
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/work" className="transition-colors hover:text-accent">
                Cases
              </Link>
              <Link href="/about" className="transition-colors hover:text-accent">
                About
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-accent"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="eyebrow text-xs text-muted">
              Elsewhere
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a
                href="https://instagram.com/ailoveyouuk"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                Instagram
              </a>
              <a
                href="/journal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition-colors hover:opacity-70"
              >
                Journal
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-xs text-muted">
              Legal
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="transition-colors hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/legal" className="transition-colors hover:text-accent">
                Terms &amp; Legal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="eyebrow container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Lewis McKinnon, trading as AI
            Love You. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
