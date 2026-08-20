import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data ailoveyou.uk collects, why, and what rights you have over it — a showcase site and contact point, not a store or client portal.",
};

export default function PrivacyPage() {
  return (
    <div className="akaru-theme container-page pt-16 pb-20">
      <Breadcrumbs items={[{ label: "Privacy" }]} />
      <p className="ak-label mt-10">
        <span className="accent">Privacy</span>
      </p>
      <h1 className="ak-headline mt-4 max-w-2xl text-5xl">Privacy Policy</h1>
      <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--ak-muted)" }}>
        This is a showcase website and a contact point &mdash; not a store
        or a client portal. It collects very little data, and this page
        explains exactly what, why, and what rights you have over it.
      </p>
      <p className="mt-4 max-w-2xl text-sm" style={{ color: "var(--ak-muted)" }}>
        Last updated 14 August 2026
      </p>

      <div className="mt-14 max-w-2xl space-y-10 text-muted [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-4 [&_strong]:text-foreground">
        <section>
          <h2 className="text-xl text-foreground">1. Who this policy covers</h2>
          <p className="mt-3">
            &ldquo;I&rdquo;, &ldquo;me&rdquo; and &ldquo;AI Love You&rdquo;
            refer to Lewis McKinnon, trading as AI Love You, a sole trader
            based in the United Kingdom. I am the data controller for the
            personal data described below. For any privacy query, contact{" "}
            <a href="mailto:lewis@ailoveyou.uk">lewis@ailoveyou.uk</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">2. What data I collect</h2>
          <p className="mt-3">
            If you use the contact form or email me directly: your name,
            email address, and whatever you choose to share about your
            project. If analytics are enabled on this site (see Cookies,
            below), aggregate technical data such as page views, referrer,
            device type and approximate location &mdash; no analytics
            cookies are set until you accept them.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">3. How I use it</h2>
          <p className="mt-3">
            Only to reply to your enquiry, and to have the conversation that
            follows if we go on to discuss a project. Analytics data, where
            enabled, is used in aggregate to understand how the site is
            used and to improve it. Nothing collected here is used for
            marketing or shared for advertising purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">4. Legal basis</h2>
          <p className="mt-3">
            I process enquiry data on the basis of{" "}
            <strong>legitimate interest</strong> &mdash; responding to a
            message you&apos;ve chosen to send. Optional analytics cookies
            are only set with your <strong>consent</strong>, given via the
            cookie banner.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">5. Sharing your data</h2>
          <p className="mt-3">
            I don&apos;t sell, rent or share your data for marketing
            purposes. It&apos;s only accessible to the service providers
            needed to run this site and receive email &mdash; for example
            hosting and email providers &mdash; and only to the extent each
            needs it to provide that service.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">6. How long I keep it</h2>
          <p className="mt-3">
            Enquiries are kept only as long as needed to respond to you or
            continue a conversation you&apos;ve started, then deleted.
          </p>
        </section>

        <section id="cookies">
          <h2 className="text-xl text-foreground">7. Cookies</h2>
          <p className="mt-3">
            This site uses <strong>essential cookies only</strong> by
            default &mdash; small amounts of data needed for the site to
            function (for example, remembering your cookie preference). If
            analytics are enabled, an <strong>optional analytics
            cookie</strong> is set only once you choose &ldquo;Accept
            all&rdquo; on the cookie banner; choosing &ldquo;Essential
            only&rdquo; keeps analytics off. You can change your mind at any
            time by clearing your browser&apos;s local storage for this
            site.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">8. Your rights</h2>
          <p className="mt-3">
            Under UK GDPR you have the right to access, correct, or delete
            your personal data, to restrict or object to how it&apos;s
            used, and to receive a copy of it in a portable format. To
            exercise any of these, email{" "}
            <a href="mailto:lewis@ailoveyou.uk">lewis@ailoveyou.uk</a>. If
            you&apos;re not satisfied with how a request is handled, you can
            complain to the UK Information Commissioner&apos;s Office at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl text-foreground">9. Changes to this policy</h2>
          <p className="mt-3">
            This policy may be updated occasionally as the site changes. The
            &ldquo;last updated&rdquo; date above always reflects the
            current version.
          </p>
        </section>
      </div>
    </div>
  );
}
