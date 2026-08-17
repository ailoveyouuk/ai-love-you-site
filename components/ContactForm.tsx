"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

// Shared class for all form controls — border, bg, focus transition, placeholder.
const inputClass =
  "mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none " +
  "transition-colors duration-150 focus:border-accent placeholder:text-foreground/30";

// Chevron for the custom select arrow.
function ChevronDown() {
  return (
    <svg
      className="pointer-events-none h-4 w-4 text-muted"
      fill="none"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      project: data.get("project"),
      message: data.get("message"),
      company: data.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        setStatus("error");
        setErrorMessage(
          result.error ?? "Something went wrong — please try again."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Couldn't reach the server — check your connection and try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-accent/30 bg-accent/[0.04] p-8">
        <p className="eyebrow text-xs text-accent">Sent</p>
        <h2 className="mt-3 text-xl text-foreground">Thanks — got it.</h2>
        <p className="mt-3 max-w-md text-sm text-muted">
          I&apos;ll reply within a couple of working days. If it&apos;s
          urgent, email{" "}
          <a
            href="mailto:lewis@ailoveyou.uk"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            lewis@ailoveyou.uk
          </a>{" "}
          or call{" "}
          <a
            href="tel:+447402456974"
            className="text-accent underline decoration-accent/40 underline-offset-4"
          >
            +44 (0) 7402 456974
          </a>{" "}
          directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot — hidden from real visitors via CSS, not display:none
          (some bots skip display:none fields), left blank by anyone human. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="project" className="text-sm text-muted">
          What are you looking to build?
        </label>
        {/* Wrapper div gives us a custom arrow; appearance-none strips the native one. */}
        <div className="relative">
          <select
            id="project"
            name="project"
            className={inputClass + " appearance-none pr-10 cursor-pointer"}
            defaultValue="website"
          >
            <option value="website">A website</option>
            <option value="platform">A platform / CRM / data system</option>
            <option value="both">Both</option>
            <option value="not-sure">Not sure yet</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronDown />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={inputClass + " resize-none"}
          placeholder="A little about the project, and any timeline you're working to."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-solid disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "error" && (
        <p className="text-xs text-accent">{errorMessage}</p>
      )}

      <p className="text-xs text-muted">
        Prefer email or a call? Reach me directly at{" "}
        <a
          href="mailto:lewis@ailoveyou.uk"
          className="text-accent underline decoration-accent/40 underline-offset-4"
        >
          lewis@ailoveyou.uk
        </a>{" "}
        or{" "}
        <a
          href="tel:+447402456974"
          className="text-accent underline decoration-accent/40 underline-offset-4"
        >
          +44 (0) 7402 456974
        </a>
        .
      </p>
    </form>
  );
}
