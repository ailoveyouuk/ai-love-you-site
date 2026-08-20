"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/website-development", label: "Websites" },
  { href: "/platform-development", label: "Platforms" },
  { href: "/microsoft-365", label: "Microsoft 365" },
  { href: "/ai-integration", label: "AI" },
  { href: "/work", label: "Cases" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /** True when the given href matches the current route.
   *  Uses startsWith so /work/apki-technologies still highlights "Cases". */
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 left-0 z-50 h-20 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-signature.svg"
            alt="AI Love You"
            width={140}
            height={32}
            className="h-6 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(link.href) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-solid btn-sm hidden sm:inline-flex">
            Start a project
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-border lg:hidden"
          >
            <span
              className={`block h-px w-4 bg-foreground transition-transform ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-foreground transition-transform ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="eyebrow flex flex-col gap-1 border-t border-border bg-background px-6 py-4 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-2.5 transition-colors ${
                isActive(link.href) ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 py-2.5 text-accent"
          >
            Start a project &rarr;
          </Link>
        </nav>
      )}
    </header>
  );
}
