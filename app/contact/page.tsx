import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — AI Love You",
};

export default function ContactPage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow text-accent">
        Contact
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
        Tell me what you&apos;re trying to build.
      </h1>
      <p className="mt-6 max-w-xl text-muted">
        A short brief is enough &mdash; what you have, what you need, and any
        deadline you&apos;re working to. I&apos;ll reply within a couple of
        working days.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <aside className="space-y-8">
          <div>
            <p className="text-sm text-muted">Email</p>
            <a
              href="mailto:lewis@ailoveyou.uk"
              className="mt-1 block text-foreground transition-colors hover:text-accent"
            >
              lewis@ailoveyou.uk
            </a>
          </div>
          <div>
            <p className="text-sm text-muted">Phone</p>
            <a
              href="tel:+447402456974"
              className="mt-1 block text-foreground transition-colors hover:text-accent"
            >
              +44 (0) 7402 456974
            </a>
          </div>
          <div>
            <p className="text-sm text-muted">Instagram</p>
            <a
              href="https://instagram.com/ailoveyouuk"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-foreground transition-colors hover:text-accent"
            >
              @ailoveyouuk
            </a>
          </div>
          <div>
            <p className="text-sm text-muted">Studio address</p>
            <p className="mt-1 text-foreground">
              12 Church Way, Denton
              <br />
              Northamptonshire, NN7 1DG
              <br />
              United Kingdom
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Trading as</p>
            <p className="mt-1 text-foreground">
              Lewis McKinnon, sole trader
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
