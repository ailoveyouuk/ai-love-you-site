import type { Metadata } from "next";
import Link from "next/link";
import PixelReveal from "@/components/PixelReveal";
import PixelRevealGroup from "@/components/PixelRevealGroup";

export const metadata: Metadata = {
  title: "AI Integration — AI Love You",
};

const capabilities = [
  {
    title: "Training & workshops",
    body: "Hands-on sessions for your team on using AI tools well in your actual workflow — not generic prompting tips, but tailored to the tools and processes you already run.",
  },
  {
    title: "How-to guides & SOPs",
    body: "Clear, practical documentation for the AI workflows you adopt, so they outlive the person who set them up and don't rely on tribal knowledge.",
  },
  {
    title: "Data analysis",
    body: "Turning your existing data — sales, engagement, operations — into something AI can actually help you understand, not just summarise.",
  },
  {
    title: "Automation",
    body: "Automating the repetitive parts of a workflow — triage, drafting, data entry, reporting — so time goes on the judgement calls that need a person.",
  },
  {
    title: "Asset creation from your own data",
    body: "Content, imagery and reports generated from your company's own material and engagement history, so outputs sound and look like you, not a generic AI.",
  },
  {
    title: "Custom tools & agents",
    body: "Purpose-built tools and agents wired into the systems you already use, doing one job well rather than a general-purpose chatbot bolted on.",
  },
  {
    title: "AI opportunity audit",
    body: "An honest look at where AI would genuinely help your business, and just as importantly, where it wouldn't. No hype, no adoption for its own sake.",
  },
  {
    title: "Responsible adoption",
    body: "AI brought in with the same data-protection and privacy standards as the rest of your systems, not as an unmonitored shortcut.",
  },
];

export default function AIIntegrationPage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow text-accent">AI Integration</p>
      <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
        Putting AI to work in your business, properly.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Not a chatbot bolted onto your website. This is about finding where
        AI genuinely saves your team time or opens up something new &mdash;
        then building and teaching it properly, on your own data and your
        own workflow.
      </p>

      <div className="mt-8">
        <Link href="/contact" className="btn btn-solid">
          Talk through what you need
        </Link>
      </div>

      <div className="mt-20">
        <p className="eyebrow text-xs text-muted">What&apos;s covered</p>
        <h2 className="mt-3 text-2xl text-foreground">
          Including but not limited to.
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
          Often paired with a website or platform build.
        </h2>
        <p className="max-w-xl text-muted">
          AI integration usually sits alongside a{" "}
          <Link
            href="/website-development"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            website
          </Link>{" "}
          or{" "}
          <Link
            href="/platform-development"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            platform
          </Link>{" "}
          project, but it also works well on its own &mdash; training and
          automation for a system you already have.
        </p>
        <Link href="/contact" className="btn btn-solid">
          Tell me what you&apos;re working with
        </Link>
      </div>
    </div>
  );
}
