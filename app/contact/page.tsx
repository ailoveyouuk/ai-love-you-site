import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me what you're trying to build — a short brief is enough. I reply within a couple of working days.",
  openGraph: {
    title: "Contact — AI Love You",
    description:
      "Tell me what you're trying to build — a short brief is enough. I reply within a couple of working days.",
  },
};

export default function ContactPage() {
  return (
    <div className="akaru-theme container-page pt-16 pb-20">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <p className="ak-label mt-10">
        <span className="accent">Contact</span>
      </p>
      <h1 className="ak-headline mt-4 max-w-3xl">
        Tell me what you&apos;re trying to build.
      </h1>
      <p className="mt-6 max-w-xl text-lg" style={{ color: "var(--ak-muted)" }}>
        A short brief is enough — what you have, what you need, and any
        deadline you&apos;re working to. I&apos;ll reply within a couple of
        working days.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <aside className="space-y-8">
          <div>
            <p className="ak-label">Email</p>
            <a
              href="mailto:lewis@ailoveyou.uk"
              className="mt-1 block transition-colors hover:text-[color:var(--ak-accent)]"
              style={{ color: "var(--ak-ink)" }}
            >
              lewis@ailoveyou.uk
            </a>
          </div>
          <div>
            <p className="ak-label">Phone</p>
            <a
              href="tel:+447402456974"
              className="mt-1 block transition-colors hover:text-[color:var(--ak-accent)]"
              style={{ color: "var(--ak-ink)" }}
            >
              +44 (0) 7402 456974
            </a>
          </div>
          <div>
            <p className="ak-label">Instagram</p>
            <a
              href="https://instagram.com/ailoveyouuk"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block transition-colors hover:text-[color:var(--ak-accent)]"
              style={{ color: "var(--ak-ink)" }}
            >
              @ailoveyouuk
            </a>
          </div>
          <div>
            <p className="ak-label">Studio address</p>
            <p className="mt-1" style={{ color: "var(--ak-ink)" }}>
              12 Church Way, Denton
              <br />
              Northamptonshire, NN7 1DG
              <br />
              United Kingdom
            </p>
          </div>
          <div>
            <p className="ak-label">Trading as</p>
            <p className="mt-1" style={{ color: "var(--ak-ink)" }}>
              Lewis McKinnon, sole trader
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
