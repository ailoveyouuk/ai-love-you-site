import type { Metadata } from "next";
import Link from "next/link";
import CapabilityGrid from "@/components/CapabilityGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "AI Integration",
  description:
    "Claude adoption, connectors, custom Skills and agentic automation — wiring Claude into your real tools and data, not a generic chatbot login.",
  openGraph: {
    title: "AI Integration — AI Love You",
    description:
      "Claude adoption, connectors, custom Skills and agentic automation — wiring Claude into your real tools and data, not a generic chatbot login.",
  },
};

const capabilities = [
  {
    title: "Claude adoption & rollout",
    body: "Getting Claude properly set up across your team — Team/Enterprise plans, access and governance, and a rollout that fits how you actually work, not a free-for-all chatbot login.",
  },
  {
    title: "Connectors & integrations",
    body: "Wiring Claude into the systems you already run — Microsoft 365 and SharePoint, Slack, Google Workspace, your CRM or database — via MCP, so it works with your real data instead of copy-pasted context.",
  },
  {
    title: "Custom Skills",
    body: "Reusable Claude Skills built around your specific workflows and house style, so recurring tasks — reports, reviews, drafting — run the same reliable way every time, for anyone on the team.",
  },
  {
    title: "Agentic automation",
    body: "Claude Code and Agent SDK-built agents that handle multi-step work end to end — triage, research, drafting, data entry — with a person reviewing the judgement calls, not doing the busywork.",
  },
  {
    title: "Training & workshops",
    body: "Hands-on sessions on using Claude well in your actual tools and workflow — not generic prompting tips, but tailored to what your team does day to day.",
  },
  {
    title: "How-to guides & SOPs",
    body: "Clear, practical documentation for the Claude workflows you adopt, so they outlive the person who set them up and don't rely on tribal knowledge.",
  },
  {
    title: "Data analysis & reporting",
    body: "Turning your existing data — sales, engagement, operations — into something Claude can help you understand and act on, not just summarise.",
  },
  {
    title: "Opportunity audit",
    body: "An honest look at where Claude would genuinely help your business, and just as importantly, where it wouldn't. No hype, no adoption for its own sake.",
  },
  {
    title: "Responsible adoption",
    body: "Claude brought in with the same data-protection and privacy standards as the rest of your systems — proper access control, not an unmonitored shortcut.",
  },
];

export default function AIIntegrationPage() {
  return (
    <div className="akaru-theme">
      <div className="container-page pt-16">
        <Breadcrumbs items={[{ label: "AI Integration" }]} />
        <p className="ak-label mt-10">
          <span className="accent">AI Integration</span>
        </p>
        <h1 className="ak-headline mt-4 max-w-3xl">
          Putting Claude to work in your business, properly.
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ak-muted)" }}>
          Not a chatbot bolted onto your website. I work exclusively with
          Claude — connectors, Skills, custom agents and the training to go
          with them — building on genuine depth with the platform rather
          than a shallow pass across every AI tool going. The goal is
          finding where it actually saves your team time, then building
          and teaching it properly, on your own systems and your own
          workflow.
        </p>

        <div className="mt-8">
          <Link href="/contact" className="ak-btn">
            Talk through what you need &rarr;
          </Link>
        </div>
      </div>

      <div className="ak-rule mt-16">
        <div className="container-page py-16">
          <p className="ak-label">What&apos;s covered</p>
          <h2 className="ak-heading mt-3 text-2xl">
            Including but not limited to.
          </h2>
          <CapabilityGrid items={capabilities} />
        </div>
      </div>

      <div className="ak-rule">
        <div className="container-page flex flex-col items-start gap-6 py-16">
          <h2 className="ak-heading max-w-2xl text-3xl">
            Often paired with a website or platform build.
          </h2>
          <p className="max-w-xl" style={{ color: "var(--ak-muted)" }}>
            Claude integration usually sits alongside a{" "}
            <Link href="/website-development" className="ak-link-accent">
              website
            </Link>{" "}
            or{" "}
            <Link href="/platform-development" className="ak-link-accent">
              platform
            </Link>{" "}
            project — Microsoft 365/SharePoint work especially — but it also
            works well on its own — training, connectors and automation for
            a system you already have.
          </p>
          <Link href="/contact" className="ak-btn">
            Tell me what you&apos;re working with &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
