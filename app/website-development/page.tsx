import type { Metadata } from "next";
import Link from "next/link";
import PixelReveal from "@/components/PixelReveal";
import PixelRevealGroup from "@/components/PixelRevealGroup";

export const metadata: Metadata = {
  title: "Website Development — AI Love You",
};

const process = [
  {
    title: "Discovery & consultation",
    body: "Understanding your audience, goals, competitors and content before any design starts — a short discovery call and a clear brief, so the site is built to actually do a job.",
  },
  {
    title: "Design",
    body: "Wireframes first, then visual design applied to your brand — not a template. Shared and iterated with you at each stage, not delivered as a surprise.",
  },
  {
    title: "Build",
    body: "Front-end development in Next.js/React and Tailwind as standard, tested across real devices and browsers as it's built, not just at the end.",
  },
  {
    title: "Data, forms & analytics",
    body: "Enquiry forms wired to email or a CRM, and privacy-conscious analytics set up so you can see what's working from day one.",
  },
  {
    title: "Launch",
    body: "Domain, hosting and DNS handled, SEO foundations in place, performance checked — and a walkthrough so you know how to use what you've been given.",
  },
  {
    title: "Ongoing management",
    body: "Six months of monitoring, small fixes, content support and security updates included as standard with every project — not an optional extra.",
  },
];

const capabilities = [
  {
    title: "Design",
    body: "Bespoke visual design built around your brand, not a reskinned template — typography, colour and layout worked out together, with a lightweight design system so new pages stay consistent as the site grows.",
  },
  {
    title: "Consultative process",
    body: "Regular check-ins and shared previews, not a black box. You see the site as it's built and can steer it — the brief evolves with real feedback rather than being locked on day one.",
  },
  {
    title: "Data & content structure",
    body: "Content modelled properly from the start — whether that's a simple content structure or a CMS/database behind it — so the site can grow without a rebuild every time something changes.",
  },
  {
    title: "Analytics",
    body: "Privacy-conscious analytics set up so you can see traffic, behaviour and what's actually converting — configured to respect cookie consent, not bolted on regardless of it.",
  },
  {
    title: "Contacts, CRM & enquiries",
    body: "Enquiry forms that route somewhere useful — your inbox, a CRM, or a lead-tracking system — with spam protection, so enquiries don't get lost or buried.",
  },
  {
    title: "Imagery, graphics & animation",
    body: "Guidance on sourcing or commissioning photography, custom graphics where the brand needs them, and motion used with restraint — enough to feel considered, never at the cost of load time.",
  },
  {
    title: "Device responsiveness",
    body: "Designed mobile-first and tested across phone, tablet and desktop breakpoints, with touch-friendly interactions — most visitors will meet the site on a phone before anything else.",
  },
  {
    title: "SEO",
    body: "Technical foundations built in from the start: metadata, structured data, sitemaps and clean URLs, plus guidance on the on-page content that actually gets a site found.",
  },
  {
    title: "Performance & accessibility",
    body: "Fast load times and optimised assets as a baseline, with accessible markup so the site works with keyboards, screen readers and not just a mouse.",
  },
  {
    title: "Security & hosting",
    body: "Secure hosting, HTTPS by default, and regular backups — with dependency and security updates handled as part of ongoing management, not left to go stale.",
  },
  {
    title: "Handover & training",
    body: "Clear documentation and a walkthrough of anything you'll manage yourself, so you're never locked out of your own content or waiting on me for routine changes.",
  },
];

export default function WebsiteDevelopmentPage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow text-accent">Website Development</p>
      <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
        What&apos;s included in every website build.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        A website here isn&apos;t just a design handed over and forgotten.
        It&apos;s a consultative build &mdash; design, data, discoverability
        and support &mdash; put together so it keeps working after launch,
        not just on the day it ships.
      </p>

      <div className="mt-8">
        <Link href="/contact" className="btn btn-solid">
          Start a project
        </Link>
      </div>

      {/* Ongoing management — highlighted standard inclusion */}
      <div className="pixel-dots mt-16 border border-accent/30 bg-accent/[0.04] p-8">
        <p className="eyebrow text-xs text-accent">Included as standard</p>
        <h2 className="mt-3 text-2xl text-foreground">
          Six months of ongoing management, on every project.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Every website I build includes six months of monitoring, small
          fixes, content support and security/dependency updates after
          launch &mdash; not sold as an add-on. After that, ongoing support
          continues on a simple rolling basis if you want it.
        </p>
      </div>

      <div className="mt-20">
        <p className="eyebrow text-xs text-muted">Process</p>
        <h2 className="mt-3 text-2xl text-foreground">
          How a project runs, start to finish.
        </h2>
        <PixelRevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, i) => (
            <PixelReveal
              key={step.title}
              number={String(i + 1).padStart(2, "0")}
              title={step.title}
              body={step.body}
              className="min-h-[200px] bg-surface"
            />
          ))}
        </PixelRevealGroup>
      </div>

      <div className="mt-20">
        <p className="eyebrow text-xs text-muted">What&apos;s covered</p>
        <h2 className="mt-3 text-2xl text-foreground">
          Every capability that goes into the build.
        </h2>
        <PixelRevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, i) => (
            <PixelReveal
              key={item.title}
              number={String(i + 1).padStart(2, "0")}
              title={item.title}
              body={item.body}
              className="min-h-[200px]"
            />
          ))}
        </PixelRevealGroup>
      </div>

      <div className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-16">
        <h2 className="max-w-2xl text-3xl sm:text-4xl">
          Looking for a platform, or AI, behind the site too?
        </h2>
        <p className="max-w-xl text-muted">
          Data management, CRM-style tooling and project systems are covered
          on{" "}
          <Link
            href="/platform-development"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            platform development
          </Link>
          , and training, automation and tooling built on your own data are
          covered on{" "}
          <Link
            href="/ai-integration"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            AI integration
          </Link>
          .
        </p>
        <Link href="/contact" className="btn btn-solid">
          Tell me what you&apos;re building
        </Link>
      </div>
    </div>
  );
}
