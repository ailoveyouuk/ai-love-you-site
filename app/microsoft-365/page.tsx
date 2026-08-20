import type { Metadata } from "next";
import Link from "next/link";
import CapabilityGrid from "@/components/CapabilityGrid";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Microsoft 365 & SharePoint",
  description:
    "SharePoint intranets, Teams, Power Automate and Power Apps set up to actually get used — plus migration, integration and staff training that make it stick.",
  openGraph: {
    title: "Microsoft 365 & SharePoint — AI Love You",
    description:
      "SharePoint intranets, Teams, Power Automate and Power Apps set up to actually get used — plus migration, integration and staff training that make it stick.",
  },
};

const capabilities = [
  {
    title: "Intranets & team sites",
    body: "SharePoint intranets and team sites built properly — information architecture, permissions and branding worked out from the start, not a default template left as-is.",
  },
  {
    title: "Document libraries & content",
    body: "Document libraries structured around how your teams actually file and find things, with metadata, versioning and retention set up so search works and nothing gets lost.",
  },
  {
    title: "Teams",
    body: "Teams structured to match how departments and projects actually run, integrated with the SharePoint sites and files behind them rather than left as a disconnected chat app.",
  },
  {
    title: "Power Automate",
    body: "Approval chains, notifications and repetitive admin work automated between SharePoint, Teams, Outlook and beyond — built to genuinely save time, not automation for its own sake.",
  },
  {
    title: "Power Apps",
    body: "Lightweight internal tools and forms built on top of your existing Microsoft 365 data, so staff get a proper interface instead of another spreadsheet passed around by email.",
  },
  {
    title: "Migration",
    body: "Moving existing intranets, file shares or legacy systems onto Microsoft 365 cleanly, with content and permissions carried across rather than a flat dump of files.",
  },
  {
    title: "Integration",
    body: "Connecting Microsoft 365 to the rest of your stack — your website, CRM or other platforms — so data and documents don't need re-entering by hand.",
  },
  {
    title: "Training & rollout",
    body: "Staff training and clear documentation so a new intranet, Team or automated process actually gets used, not just built and quietly ignored.",
  },
];

export default function Microsoft365Page() {
  return (
    <div className="akaru-theme">
      <div className="container-page pt-16">
        <Breadcrumbs items={[{ label: "Microsoft 365" }]} />
        <p className="ak-label mt-10">
          <span className="accent">Microsoft 365 &amp; SharePoint</span>
        </p>
        <h1 className="ak-headline mt-4 max-w-3xl">
          Getting the platform you already pay for actually working.
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ak-muted)" }}>
          Most businesses on Microsoft 365 are using a fraction of it.
          I build proper SharePoint intranets and document libraries, wire
          up Teams, Power Automate and Power Apps where they genuinely save
          time, and handle the migration, integration and staff training
          that make it stick.
        </p>

        <div className="mt-8">
          <Link href="/contact" className="ak-btn">
            Tell me what you&apos;re working with &rarr;
          </Link>
        </div>
      </div>

      <div className="ak-rule mt-16">
        <div className="container-page py-16">
          <p className="ak-label">What it covers</p>
          <h2 className="ak-heading mt-3 text-2xl">
            The parts of Microsoft 365 I work with most.
          </h2>
          <CapabilityGrid items={capabilities} />
        </div>
      </div>

      <div className="ak-rule">
        <div className="container-page flex flex-col items-start gap-6 py-16">
          <h2 className="ak-heading max-w-2xl text-3xl">
            Usually paired with a wider platform or AI project.
          </h2>
          <p className="max-w-xl" style={{ color: "var(--ak-muted)" }}>
            Microsoft 365 work often sits alongside broader{" "}
            <Link href="/platform-development" className="ak-link-accent">
              platform development
            </Link>{" "}
            or{" "}
            <Link href="/ai-integration" className="ak-link-accent">
              Claude integration
            </Link>{" "}
            — connectors, automation and dashboards built on top of the data
            already sitting in SharePoint and Teams.
          </p>
          <Link href="/contact" className="ak-btn">
            Tell me what you&apos;re building &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
