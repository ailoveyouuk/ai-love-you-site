import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Legal — AI Love You",
};

export default function LegalPage() {
  return (
    <div className="container-page py-20">
      <p className="eyebrow text-accent">Legal</p>
      <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
        Terms &amp; trading information.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        This is a showcase website and a way to get in touch &mdash; nothing
        on it is a contract or an offer of services. It doesn&apos;t take
        payments, store accounts, or agree terms with anyone; any actual
        project is scoped and agreed separately, in writing.
      </p>
      <p className="mt-4 max-w-2xl text-sm text-muted">
        Last updated 14 August 2026
      </p>

      <div className="mt-14 max-w-2xl space-y-10 text-muted [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-4 [&_strong]:text-foreground">
        <section className="border border-border bg-surface p-6">
          <h2 className="eyebrow text-xs text-accent">Trading disclosure</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="w-40 shrink-0 text-foreground">Trading as</dt>
              <dd>AI Love You</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="w-40 shrink-0 text-foreground">Legal name</dt>
              <dd>Lewis McKinnon, sole trader</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="w-40 shrink-0 text-foreground">Address</dt>
              <dd>
                12 Church Way, Denton, Northamptonshire, NN7 1DG, United
                Kingdom
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="w-40 shrink-0 text-foreground">Email</dt>
              <dd>
                <a href="mailto:lewis@ailoveyou.uk">lewis@ailoveyou.uk</a>
              </dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <dt className="w-40 shrink-0 text-foreground">Phone</dt>
              <dd>
                <a href="tel:+447402456974">+44 (0) 7402 456974</a>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted">
            Shown per the Provision of Services Regulations 2009 and the
            Electronic Commerce (EC Directive) Regulations 2002, which
            require UK service providers to make this information easily
            available. Not VAT registered, so no VAT number is shown.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">1. Use of this website</h2>
          <p className="mt-3">
            By using this site you agree to do so lawfully and not to
            attempt to disrupt, copy or misuse it. Content is provided for
            general information only; I&apos;ve taken reasonable care to
            keep it accurate but make no warranty that it&apos;s complete,
            current or error-free.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">
            2. Intellectual property
          </h2>
          <p className="mt-3">
            The design, code, copy and the AI Love You name and signature
            mark on this site are mine unless stated otherwise, and
            aren&apos;t to be reproduced without permission. Case studies
            show real client work, shared for portfolio purposes with the
            relevant client&apos;s permission; each client&apos;s brand,
            product names and content remain their property.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">3. Liability</h2>
          <p className="mt-3">
            Nothing in these terms limits liability for death or personal
            injury caused by negligence, or for fraud. Beyond that, I&apos;m
            not liable for indirect or consequential loss arising from your
            use of this website. This doesn&apos;t affect your statutory
            rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">4. External links</h2>
          <p className="mt-3">
            This site links to client sites and platforms for portfolio
            purposes, and to social/editorial profiles elsewhere. I&apos;m
            not responsible for the content or availability of external
            sites once you&apos;ve left this one.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">5. Governing law</h2>
          <p className="mt-3">
            These terms are governed by the law of England and Wales, and
            any dispute relating to this website falls under the exclusive
            jurisdiction of its courts.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">6. Privacy &amp; cookies</h2>
          <p className="mt-3">
            How personal data and cookies are handled on this site is set
            out separately in the{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">7. Changes</h2>
          <p className="mt-3">
            These terms may be updated occasionally; the &ldquo;last
            updated&rdquo; date above always reflects the current version.
            For anything not covered here, email{" "}
            <a href="mailto:lewis@ailoveyou.uk">lewis@ailoveyou.uk</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
