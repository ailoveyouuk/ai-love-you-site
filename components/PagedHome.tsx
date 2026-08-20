"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import PlaceholderShot from "@/components/PlaceholderShot";
import { useStepReveal } from "@/components/useStepReveal";
import { useTypewriter } from "@/components/useTypewriter";

type DoorPhase = "idle" | "covering" | "exiting" | "reset";

const NAV_ITEMS = [
  { index: 1, label: "Cases" },
  { index: 2, label: "Capabilities" },
  { index: 3, label: "Development" },
  { index: 4, label: "Management" },
  { index: 5, label: "Design" },
  { index: 6, label: "Contact" },
];

const PROCESS_STEPS = [
  { title: "Discovery", body: "A short call and a clear brief." },
  { title: "Design", body: "Wireframes, then real visual design." },
  { title: "Build", body: "Next.js/React and Tailwind, tested live." },
  { title: "Data & analytics", body: "Forms and tracking wired properly." },
  { title: "Launch", body: "Domain, hosting, SEO foundations, walkthrough." },
  { title: "Management", body: "Six months included, standard." },
];

const CAPABILITIES = [
  {
    title: "Website Development",
    body: "Front-end sites built to do a job, not just look good — design, content structure, SEO and analytics from day one.",
    href: "/website-development",
  },
  {
    title: "Platform Development",
    body: "The data, CRM and project systems behind the site — including Microsoft 365 and SharePoint — structured, maintainable, built to grow.",
    href: "/platform-development",
  },
  {
    title: "AI Integration",
    body: "Claude-based automation, connectors and tooling wired into the systems you already use — training and rollout included.",
    href: "/ai-integration",
  },
];

const PANEL_COUNT = 7;

// How far (in accumulated wheel-delta px) a scroll gesture has to travel
// before it commits to the next/previous section. Below this the door
// tracks the gesture directly and rubber-bands back if it stalls, so the
// transition reads as continuous scroll rather than a discrete snap.
const DRAG_THRESHOLD = 220;
const COMMIT_MS = 360;
const RETRACT_MS = 260;
const DOOR_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function PagedHome() {
  const [index, setIndex] = useState(0);
  const [doorPhase, setDoorPhase] = useState<DoorPhase>("idle");
  const pendingRef = useRef(0);
  const isDesktopRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  // Wheel-driven scrub state — lives outside React state so every wheel
  // tick can move the door directly (no re-render per tick).
  const dragRef = useRef(0); // 0..1 progress toward committing
  const dragDirRef = useRef<1 | -1>(1);
  const wheelBusyRef = useRef(false); // mid commit/retract animation
  const dragIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  function setDoorTransform(pct: number, transitionMs?: number) {
    const el = doorRef.current;
    if (!el) return;
    el.style.transition = transitionMs
      ? `transform ${transitionMs}ms ${DOOR_EASE}`
      : "none";
    el.style.transform = `translateX(${pct}%)`;
  }

  function clearDragTimer() {
    if (dragIdleTimerRef.current) {
      clearTimeout(dragIdleTimerRef.current);
      dragIdleTimerRef.current = null;
    }
  }

  const retractDoor = useCallback(() => {
    setDoorTransform(100, RETRACT_MS);
    dragRef.current = 0;
    clearDragTimer();
    window.setTimeout(() => {
      wheelBusyRef.current = false;
    }, RETRACT_MS);
  }, []);

  const commitDrag = useCallback(() => {
    wheelBusyRef.current = true;
    clearDragTimer();
    // Finish covering smoothly from wherever the door currently sits —
    // the transition interpolates from the live drag position, so a
    // gesture that commits mid-swipe continues rather than jumping.
    setDoorTransform(0, COMMIT_MS);
    window.setTimeout(() => {
      const dir = dragDirRef.current;
      const next = Math.min(
        PANEL_COUNT - 1,
        Math.max(0, indexRef.current + dir)
      );
      setIndex(next);
      setDoorTransform(-100, COMMIT_MS);
      window.setTimeout(() => {
        setDoorTransform(100); // instant reset, parked off-screen right
        dragRef.current = 0;
        wheelBusyRef.current = false;
      }, COMMIT_MS);
    }, COMMIT_MS);
  }, []);

  const goTo = useCallback(
    (target: number) => {
      if (target < 0 || target >= PANEL_COUNT) return;
      if (target === index) return;
      if (!isDesktopRef.current) {
        setIndex(target);
        return;
      }
      if (reduceMotionRef.current) {
        setIndex(target);
        return;
      }
      if (doorPhase !== "idle" || wheelBusyRef.current || dragRef.current > 0)
        return;
      // Clear any stale inline transform left by the wheel-scrub path so
      // the CSS classes below drive this click/keyboard-triggered swap.
      if (doorRef.current) {
        doorRef.current.style.transition = "";
        doorRef.current.style.transform = "";
      }
      pendingRef.current = target;
      setDoorPhase("covering");
    },
    [index, doorPhase]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Door animation sequence: cover -> swap content -> exit -> reset.
  useEffect(() => {
    if (doorPhase === "covering") {
      const t = setTimeout(() => {
        setIndex(pendingRef.current);
        setDoorPhase("exiting");
      }, 420);
      return () => clearTimeout(t);
    }
    if (doorPhase === "exiting") {
      const t = setTimeout(() => setDoorPhase("reset"), 420);
      return () => clearTimeout(t);
    }
    if (doorPhase === "reset") {
      const t = setTimeout(() => setDoorPhase("idle"), 20);
      return () => clearTimeout(t);
    }
  }, [doorPhase]);

  // Desktop/reduced-motion detection + body scroll lock while paged.
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncDesktop() {
      isDesktopRef.current = desktopQuery.matches;
      document.body.style.overflow = desktopQuery.matches ? "hidden" : "";
    }
    function syncMotion() {
      reduceMotionRef.current = motionQuery.matches;
    }
    syncDesktop();
    syncMotion();
    desktopQuery.addEventListener("change", syncDesktop);
    motionQuery.addEventListener("change", syncMotion);
    return () => {
      desktopQuery.removeEventListener("change", syncDesktop);
      motionQuery.removeEventListener("change", syncMotion);
      document.body.style.overflow = "";
    };
  }, []);

  // Wheel + keyboard navigation (desktop only, guarded via isDesktopRef).
  // Wheel input scrubs the door directly — partial scroll moves it
  // partway and rubber-bands back if the gesture stalls, so a swipe
  // reads as continuous motion instead of triggering a fixed-duration
  // jump on the first tick.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function onWheel(e: WheelEvent) {
      if (!isDesktopRef.current) return;
      e.preventDefault();
      if (wheelBusyRef.current || doorPhase !== "idle") return;

      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 2) return;

      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      const current = indexRef.current;
      if ((current === 0 && dir === -1) || (current === PANEL_COUNT - 1 && dir === 1)) {
        return;
      }

      if (dragRef.current === 0) {
        dragDirRef.current = dir;
      } else if (dir !== dragDirRef.current) {
        return; // ignore a direction reversal mid-gesture
      }

      if (reduceMotionRef.current) {
        // Skip the scrub animation entirely, just page instantly.
        dragRef.current = 0;
        wheelBusyRef.current = true;
        setIndex(current + dir);
        window.setTimeout(() => {
          wheelBusyRef.current = false;
        }, 150);
        return;
      }

      dragRef.current = Math.min(
        1,
        dragRef.current + Math.abs(delta) / DRAG_THRESHOLD
      );
      setDoorTransform((1 - dragRef.current) * 100);
      clearDragTimer();

      if (dragRef.current >= 1) {
        commitDrag();
      } else {
        dragIdleTimerRef.current = setTimeout(() => {
          if (dragRef.current > 0 && dragRef.current < 1 && !wheelBusyRef.current) {
            retractDoor();
          }
        }, 160);
      }
    }

    function onKeydown(e: KeyboardEvent) {
      if (!isDesktopRef.current) return;
      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        goNext();
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        goPrev();
      }
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeydown);
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeydown);
    };
  }, [goNext, goPrev, doorPhase, commitDrag, retractDoor]);

  const doorClass =
    doorPhase === "covering"
      ? "is-covering"
      : doorPhase === "exiting"
        ? "is-exiting"
        : doorPhase === "reset"
          ? "is-reset"
          : "";

  return (
    <>
      {/* Desktop paged stage */}
      <div ref={stageRef} className="ak-paged-stage akaru-theme">
        <LogoWatermark />
        <div
          className="ak-paged-panel"
          style={
            index === 0
              ? { justifyContent: "flex-start", paddingTop: "clamp(3rem, 14vh, 8rem)" }
              : undefined
          }
        >
          {/* goTo is a stable useCallback used only inside click handlers
              further down the tree (e.g. IntroPanel's "See the work"
              button) — the refs it closes over are read when it's invoked,
              not during this render, but the compiler's ref-access lint
              can't see through the prop hand-off. */}
          {/* eslint-disable-next-line react-hooks/refs */}
          {renderPanel(index, goTo)}
        </div>
        <div ref={doorRef} className={`ak-paged-door ${doorClass}`} aria-hidden="true" />
      </div>

      <nav className="ak-paged-sidenav" aria-label="Sections">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.index}
            type="button"
            className={index === item.index ? "active" : ""}
            onClick={() => goTo(item.index)}
          >
            <span className="label">{item.label}</span>
            <span className="dot" aria-hidden="true" />
          </button>
        ))}
      </nav>

      <div className="ak-paged-arrows">
        <button
          type="button"
          className="ak-paged-arrow"
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Previous section"
        >
          &uarr;
        </button>
        <button
          type="button"
          className="ak-paged-arrow"
          onClick={goNext}
          disabled={index === PANEL_COUNT - 1}
          aria-label="Next section"
        >
          &darr;
        </button>
      </div>

      {/* Mobile fallback — normal stacked scroll, no wheel-jacking. */}
      <div className="akaru-theme lg:hidden">
        <LogoWatermark />
        <MobilePanels goTo={goTo} />
      </div>
    </>
  );
}

/** Faint, slowly-drifting AI Love You wordmark behind the panel content. */
function LogoWatermark() {
  return (
    <div className="ak-logo-watermark" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-signature.svg" alt="" />
    </div>
  );
}

function renderPanel(index: number, goTo: (i: number) => void) {
  switch (index) {
    case 0:
      return <IntroPanel goTo={goTo} />;
    case 1:
      return <WorkPanel />;
    case 2:
      return <CapabilitiesPanel />;
    case 3:
      return <DevelopmentPanel />;
    case 4:
      return <ManagementPanel />;
    case 5:
      return <DesignPanel />;
    case 6:
      return <ContactPanel />;
    default:
      return null;
  }
}

function IntroPanel({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="container-page">
      <p className="ak-label">Freelance web &amp; platform development</p>
      <h1 className="ak-headline mt-6 max-w-5xl">
        Websites and platforms, built with care.
      </h1>
      <p className="mt-8 max-w-xl text-lg" style={{ color: "var(--ak-muted)" }}>
        I design and build front-end sites and the structured platforms
        behind them &mdash; data management, CRM and project systems.
      </p>
      <div className="mt-10 flex flex-wrap gap-10">
        <button type="button" className="ak-btn" onClick={() => goTo(1)}>
          See the work &rarr;
        </button>
        <Link href="/contact" className="ak-btn ak-btn-accent">
          Start a project &rarr;
        </Link>
      </div>
      <div className="ak-scroll-hint">
        <span className="ak-label">Scroll or swipe</span>
        <span className="chev" aria-hidden="true">
          &darr;
        </span>
      </div>
    </div>
  );
}

const CAROUSEL_INTERVAL_MS = 5000;

/** Large single-image carousel — one stylised visual at a time rather
 *  than a grid of small cards, with dot + arrow navigation. Auto-plays
 *  through the projects on a timer and resets its countdown on any
 *  manual navigation. Runs unconditionally (no pause-on-hover) — the
 *  carousel is the largest thing on screen, so a resting cursor would
 *  otherwise pause it almost permanently. */
function WorkPanel() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  const goToProject = useCallback((i: number) => {
    setActive((i + projects.length) % projects.length);
  }, []);
  const nextProject = useCallback(() => goToProject(active + 1), [active, goToProject]);
  const prevProject = useCallback(() => goToProject(active - 1), [active, goToProject]);

  // Re-armed on every `active` change (autoplay tick or manual nav alike),
  // so a click always buys a fresh 5s rather than cutting the next tick
  // short.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % projects.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="container-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ak-label">
            01 &mdash; <span className="accent">Work</span>
          </p>
          <h2 className="ak-heading mt-3 text-3xl sm:text-4xl">
            Selected sites &amp; platforms.
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="ak-paged-arrow"
            onClick={prevProject}
            aria-label="Previous project"
          >
            &larr;
          </button>
          <button
            type="button"
            className="ak-paged-arrow"
            onClick={nextProject}
            aria-label="Next project"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:items-center">
        <Link
          href={project.href}
          className="group block"
          aria-label={`${project.name} — ${project.category}`}
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-[color:var(--ak-line)]">
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  pointerEvents: i === active ? "auto" : "none",
                }}
                aria-hidden={i === active ? undefined : true}
              >
                {p.video && i === active ? (
                  // Only the active slide mounts a <video> — the others
                  // show their poster as a plain image, so the carousel
                  // isn't autoplaying three hidden videos at once.
                  <video
                    key={p.video}
                    src={p.video}
                    poster={p.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.category}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <PlaceholderShot label={p.name} alt={p.name} />
                )}
              </div>
            ))}
          </div>
        </Link>

        <div key={project.slug} className="ak-fade-in">
          <span className="ak-index text-lg">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <p className="ak-label mt-3">{project.category}</p>
          <h3 className="ak-heading mt-2 text-2xl sm:text-3xl">{project.name}</h3>
          <p className="mt-3 max-w-xs text-sm" style={{ color: "var(--ak-muted)" }}>
            {project.summary}
          </p>
          <Link href={project.href} className="ak-btn mt-6">
            View case study &rarr;
          </Link>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => goToProject(i)}
            aria-label={`Show ${p.name}`}
            aria-current={i === active}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? "2rem" : "0.75rem",
              background: i === active ? "var(--ak-ink)" : "var(--ak-line-strong)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const PANEL_ITEM_STAGGER_MS = 160;

function CapabilityCard({
  index,
  title,
  body,
  href,
  active,
}: {
  index: number;
  title: string;
  body: string;
  href: string;
  active: boolean;
}) {
  const startDelay = index * PANEL_ITEM_STAGGER_MS;
  const { typed, typing, bodyReady } = useTypewriter(title, { active, startDelay });

  return (
    <Link href={href} className="group block">
      <span
        className={active ? "ak-index ak-step-number-in" : "ak-index ak-step-pending"}
        style={active ? { animationDelay: `${startDelay}ms` } : undefined}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="ak-heading mt-3 text-2xl">
        <span aria-hidden="true">
          {typed}
          {typing && <span className="ak-type-cursor" />}
        </span>
        <span className="sr-only">{title}</span>
      </h3>
      <p
        className={`mt-3 max-w-xs text-sm ${bodyReady ? "ak-step-in" : "ak-step-pending"}`}
        style={{ color: "var(--ak-muted)" }}
      >
        {body}
      </p>
      <span className={`ak-btn mt-4 ${bodyReady ? "ak-step-in" : "ak-step-pending"}`}>
        Learn more &rarr;
      </span>
    </Link>
  );
}

function CapabilitiesPanel() {
  const { ref, active } = useStepReveal<HTMLDivElement>();
  return (
    <div className="container-page">
      <p className="ak-label">
        02 &mdash; <span className="accent">Capabilities</span>
      </p>
      <h2 className="ak-heading mt-3 text-3xl sm:text-4xl">What I build.</h2>
      <div ref={ref} className="mt-12 grid gap-10 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <CapabilityCard
            key={c.title}
            index={i}
            title={c.title}
            body={c.body}
            href={c.href}
            active={active}
          />
        ))}
      </div>
    </div>
  );
}

function ProcessStep({
  index,
  title,
  body,
  active,
}: {
  index: number;
  title: string;
  body: string;
  active: boolean;
}) {
  const startDelay = index * PANEL_ITEM_STAGGER_MS;
  const { typed, typing, bodyReady } = useTypewriter(title, { active, startDelay });

  return (
    <div>
      <span
        className={active ? "ak-index ak-step-number-in" : "ak-index ak-step-pending"}
        style={active ? { animationDelay: `${startDelay}ms` } : undefined}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="ak-heading mt-3 text-base">
        <span aria-hidden="true">
          {typed}
          {typing && <span className="ak-type-cursor" />}
        </span>
        <span className="sr-only">{title}</span>
      </h3>
      <p
        className={`mt-2 text-xs ${bodyReady ? "ak-step-in" : "ak-step-pending"}`}
        style={{ color: "var(--ak-muted)" }}
      >
        {body}
      </p>
    </div>
  );
}

function DevelopmentPanel() {
  const { ref, active } = useStepReveal<HTMLDivElement>();
  return (
    <div className="container-page">
      <p className="ak-label">
        03 &mdash; <span className="accent">Development</span>
      </p>
      <h2 className="ak-heading mt-3 text-3xl sm:text-4xl">
        How a project runs, start to finish.
      </h2>
      <div
        ref={ref}
        className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
      >
        {PROCESS_STEPS.map((step, i) => (
          <ProcessStep
            key={step.title}
            index={i}
            title={step.title}
            body={step.body}
            active={active}
          />
        ))}
      </div>
    </div>
  );
}

function ManagementPanel() {
  return (
    <div className="container-page">
      <p className="ak-label">
        04 &mdash; <span className="accent">Management</span>
      </p>
      <h2 className="ak-headline mt-6 max-w-3xl text-4xl sm:text-5xl">
        Nothing goes stale after launch.
      </h2>
      <p className="mt-8 max-w-xl text-lg" style={{ color: "var(--ak-muted)" }}>
        Six months of monitoring, small fixes, content support and security
        updates are included as standard on every project &mdash; not sold
        as an add-on. After that, support continues on a simple rolling
        basis if you want it.
      </p>
      <Link href="/website-development" className="ak-btn mt-8 inline-flex">
        More on what&apos;s included &rarr;
      </Link>
    </div>
  );
}

const DESIGN_MEDIA_INTERVAL_MS = 3000;

const DESIGN_MEDIA = [
  { src: "/images/apki/homepage-hero.jpg", alt: "APKI Technologies — home page hero" },
  { src: "/video/stills/yhg/homepage.jpg", alt: "Yardley Hastings Garage — home page" },
  { src: "/images/renewables-connect/dashboard.jpg", alt: "Renewables Connect — learner dashboard" },
  { src: "/video/stills/journal/homepage.jpg", alt: "AI Love You Journal — edition archive" },
  { src: "/images/apki/product-hero.jpg", alt: "APKI Technologies — product page" },
];

function DesignPanel() {
  const [active, setActive] = useState(0);

  // Re-armed on every `active` change, same pattern as the Work carousel —
  // runs unconditionally (no pause-on-hover), just respects reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % DESIGN_MEDIA.length);
    }, DESIGN_MEDIA_INTERVAL_MS);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="ak-label">
          05 &mdash; <span className="accent">Design</span>
        </p>
        <h2 className="ak-heading mt-3 text-3xl sm:text-4xl">
          Design is not a reskinned template.
        </h2>
        <p className="mt-6 max-w-md text-sm" style={{ color: "var(--ak-muted)" }}>
          Typography, colour and layout worked out together around your
          brand, with a lightweight system so new pages stay consistent as
          the site grows. Custom graphics and motion where the brand needs
          them, used with restraint.
        </p>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-[color:var(--ak-line)]">
        {DESIGN_MEDIA.map((m, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={m.src}
            src={m.src}
            alt={m.alt}
            aria-hidden={i === active ? undefined : true}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: i === active ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="container-page">
      <p className="ak-label">
        06 &mdash; <span className="accent">Contact</span>
      </p>
      <h2 className="ak-headline mt-6 max-w-3xl text-4xl sm:text-5xl">
        Have a site or platform that needs building?
      </h2>
      <p className="mt-8 max-w-xl text-lg" style={{ color: "var(--ak-muted)" }}>
        Tell me what you&apos;re trying to do &mdash; or reach me directly.
      </p>
      <div className="mt-10 flex flex-wrap gap-10">
        <Link href="/contact" className="ak-btn ak-btn-accent">
          Start a project &rarr;
        </Link>
        <a href="mailto:lewis@ailoveyou.uk" className="ak-btn">
          lewis@ailoveyou.uk
        </a>
      </div>
    </div>
  );
}

/** Mobile fallback: the same seven sections, normal document flow. */
function MobilePanels({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="ak-mobile-panels flex flex-col">
      <section className="ak-rule py-20">
        <IntroPanel goTo={goTo} />
      </section>
      <section className="ak-rule py-20">
        <WorkPanel />
      </section>
      <section className="ak-rule py-20">
        <CapabilitiesPanel />
      </section>
      <section className="ak-rule py-20">
        <DevelopmentPanel />
      </section>
      <section className="ak-rule py-20">
        <ManagementPanel />
      </section>
      <section className="ak-rule py-20">
        <DesignPanel />
      </section>
      <section className="py-20">
        <ContactPanel />
      </section>
      <HomeFooterMobile />
    </div>
  );
}

function HomeFooterMobile() {
  return (
    <div className="ak-rule container-page flex flex-wrap items-center justify-between gap-4 py-8">
      <p className="ak-label">
        &copy; {new Date().getFullYear()} Lewis McKinnon, trading as AI Love
        You
      </p>
      <div className="flex items-center gap-6">
        <a
          href="https://instagram.com/ailoveyouuk"
          target="_blank"
          rel="noopener noreferrer"
          className="ak-label"
        >
          Instagram
        </a>
        <a
          href="/journal"
          target="_blank"
          rel="noopener noreferrer"
          className="ak-label ak-link-accent"
        >
          Journal
        </a>
        <Link href="/privacy" className="ak-label">
          Privacy
        </Link>
        <Link href="/legal" className="ak-label">
          Legal
        </Link>
      </div>
    </div>
  );
}
