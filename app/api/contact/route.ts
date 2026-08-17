import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form handler. Sends the enquiry to lewis@ailoveyou.uk via Resend
 * (https://resend.com — free tier is plenty for enquiry volume like this).
 *
 * Requires RESEND_API_KEY in the environment (see .env.example) — get one
 * free at resend.com, then add it to .env.local for local dev and to your
 * hosting provider's environment variables when deployed. Nothing here
 * hardcodes a key; without one set, this route returns a clear 500 rather
 * than silently failing.
 *
 * `sendFrom` uses Resend's shared onboarding domain, which works
 * immediately with no setup — swap it for an address on your own verified
 * domain (e.g. enquiries@ailoveyou.uk) once you've added and verified
 * ailoveyou.uk in the Resend dashboard, for better deliverability.
 */

const TO_EMAIL = "lewis@ailoveyou.uk";
const FROM_EMAIL = "AI Love You <onboarding@resend.dev>";

const PROJECT_LABELS: Record<string, string> = {
  website: "A website",
  platform: "A platform / CRM / data system",
  both: "Both",
  "not-sure": "Not sure yet",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const project = typeof body.project === "string" ? body.project : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  // Honeypot — a field real visitors never fill in (hidden via CSS), left
  // empty. If it's filled, silently pretend success rather than telling a
  // bot its submission was rejected.
  const company = typeof body.company === "string" ? body.company.trim() : "";

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are all required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — see .env.example. Contact form cannot send."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact form isn't fully set up yet — please email lewis@ailoveyou.uk directly for now.",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const projectLabel = PROJECT_LABELS[project] ?? "Not specified";

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Looking for: ${projectLabel}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Couldn't send that — please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Couldn't send that — please try again shortly." },
      { status: 500 }
    );
  }
}
