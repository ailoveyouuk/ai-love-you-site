import Link from "next/link";
import type { ReactNode } from "react";

export function CaseStudyHeader({
  category,
  title,
  summary,
  stack,
}: {
  category: string;
  title: string;
  summary: string;
  stack: string[];
}) {
  return (
    <div className="border-b border-border">
      <div className="container-page py-16 sm:py-20">
        <Link
          href="/work"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; All work
        </Link>
        <p className="eyebrow mt-6 text-accent">
          {category}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="border border-border px-3 py-1 text-xs uppercase tracking-[0.03em] text-foreground/70"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseStudySection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-border py-14 sm:py-16">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <p className="eyebrow text-xs text-accent">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-2xl">{title}</h2>
          </div>
          <div className="max-w-2xl space-y-4 text-muted [&_strong]:text-foreground">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyFooterNav({
  prev,
  next,
}: {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div className="container-page flex flex-col gap-4 py-14 sm:flex-row sm:items-center sm:justify-between">
      {prev ? (
        <Link
          href={prev.href}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          {next.label} &rarr;
        </Link>
      )}
    </div>
  );
}
