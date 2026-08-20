import Link from "next/link";

export type Crumb = { label: string; href?: string };

/**
 * Small tracked-out trail — Home / Work / Project — shown above the page
 * title on every subpage (case studies, capability pages, about/contact/
 * legal). Not shown on the homepage itself, which is the root.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="ak-label flex flex-wrap items-center gap-2">
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[color:var(--ak-ink)]"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} style={{ color: "var(--ak-ink)" }}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
