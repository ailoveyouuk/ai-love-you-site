import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import PixelGridHero from "@/components/PixelGridHero";
import PixelRevealGroup from "@/components/PixelRevealGroup";
import PixelRevealProjectCard from "@/components/PixelRevealProjectCard";

// Homepage shows three with real visuals rather than all four — Renewables
// Connect (no live screenshot yet) is still on /work, just not the first
// thing a new visitor sees.
const selectedWork = projects.filter((p) => p.slug !== "renewables-connect");

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Sanity CMS",
  "Azure",
  "Netlify",
];

export default function Home() {
  return (
    <>
      <section className="pixel-hero border-b border-border">
        <PixelGridHero />
        <div className="pixel-hero-scrim" aria-hidden="true" />
        <div className="pixel-hero-content container-page flex flex-col gap-8 py-24 sm:py-32">
          <p className="eyebrow text-accent">
            Freelance web &amp; platform development
          </p>
          <div className="flex max-w-4xl flex-col gap-5">
            <Image
              src="/brand/logo-signature.svg"
              alt="AI Love You"
              width={560}
              height={128}
              className="h-9 w-auto sm:h-12"
              priority
            />
            <h1 className="headline">Websites and platforms.</h1>
          </div>
          <p className="sub-headline text-lg">
            I design and build front-end sites and the structured platforms
            behind them &mdash; data management, CRM and project systems &mdash;
            so the thing your customers see and the thing your team runs on
            actually work together.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/work" className="btn btn-solid">
              See the work
            </Link>
            <Link href="/contact" className="btn">
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/40">
        <div className="container-page py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Selected work
            </h2>
            <Link
              href="/work"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              View all &rarr;
            </Link>
          </div>
          <PixelRevealGroup className="grid gap-4 sm:grid-cols-3">
            {selectedWork.map((project, i) => (
              <PixelRevealProjectCard
                key={project.slug}
                category={project.category}
                name={project.name}
                summary={project.summary}
                href={project.href}
                featured={i === 0}
                className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
                image={
                  project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={`${project.name} — ${project.category}`}
                      className="h-full w-full object-cover"
                    />
                  ) : undefined
                }
              />
            ))}
          </PixelRevealGroup>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-16">
          <p className="eyebrow mb-6 text-muted">
            Stack &amp; tools
          </p>
          <div className="flex flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="border border-border px-4 py-2 text-xs uppercase tracking-[0.05em] text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page flex flex-col items-start gap-6 py-24">
          <h2 className="max-w-2xl text-3xl sm:text-4xl">
            Have a site or platform that needs building &mdash; or fixing?
          </h2>
          <p className="max-w-xl text-muted">
            I work with small businesses and organisations who need a site
            that looks right and a back end that holds up. Tell me what
            you&apos;re trying to do.
          </p>
          <Link href="/contact" className="btn btn-solid">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
