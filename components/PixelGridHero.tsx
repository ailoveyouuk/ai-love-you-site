"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive generative pixel grid — the homepage's nod to pixel art,
 * built as a lightweight canvas rather than a video/gif so it stays crisp,
 * cheap to load and fully responsive to the viewport.
 *
 * Base palette is the studio system (background/ink/muted/accent) with a
 * handful of extra "accent pop" hues mixed in sparingly per cell, so the
 * animation reads as colourful without breaking from the brand. Cells
 * drift on a slow organic sine-wave cycle for ambient dynamism, and bloom
 * brighter where the cursor passes, echoing the interactive canvas on
 * craft.wild.as.
 *
 * Performance guardrails, since this redraws every visible cell each
 * frame:
 *  - capped to ~24fps (plenty smooth for a slow ambient drift, roughly
 *    half the canvas fill work of running at the display's native rate)
 *  - paused via IntersectionObserver when the hero scrolls out of view
 *  - paused on document visibilitychange (backgrounded tab)
 *  - chunkier cell size keeps the total cell count — and so the number
 *    of fillRect calls per frame — modest even on wide viewports
 */

// Studio accent + a few playful pops, mixed at low weight so vermilion
// still reads as the dominant hue.
const PALETTE = [
  "#e34234", // studio vermilion — dominant
  "#e34234",
  "#e34234",
  "#f5a623", // amber pop
  "#2fa8a0", // teal pop
  "#3b5bdb", // indigo pop
  "#e85d9e", // pink pop
  "#0e0e10", // ink
];

const CELL = 18;
const GAP = 4;
const STEP = CELL + GAP;
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function PixelGridHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const paletteRgb = PALETTE.map(hexToRgb);
    const bgRgb = hexToRgb("#fcfcfd");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let seeds = new Float32Array(0);
    let hues = new Uint8Array(0);
    let raf = 0;
    let lastDraw = 0;
    let running = false;
    const start = performance.now();
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / STEP) + 1;
      rows = Math.ceil(height / STEP) + 1;
      const count = cols * rows;
      seeds = new Float32Array(count);
      hues = new Uint8Array(count);
      for (let i = 0; i < count; i++) {
        seeds[i] = Math.random() * Math.PI * 2;
        hues[i] = Math.floor(Math.random() * paletteRgb.length);
      }
    }

    // Deterministic pseudo-random derived from a cell's seed, used to give
    // each cell its own twinkle cycle length/offset without a second
    // typed array — keeps memory flat while still looking independent.
    function hashSeed(seed: number) {
      const s = Math.sin(seed * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    }

    // Cells build in diagonally (top-left → bottom-right) on first paint,
    // each staggered by its position, then settles into a continuous
    // twinkle: at a random point in its own cycle a cell flashes up to
    // full brightness and eases back down, independent of every other
    // cell, so the grid visibly changes over time even with no cursor.
    const INTRO_STAGGER_MS = 900;
    const FADE_IN_MS = 500;
    const TWINKLE_MIN_CYCLE = 2.5;
    const TWINKLE_CYCLE_RANGE = 4.5;
    const TWINKLE_PULSE_WIDTH = 0.8; // seconds a flash stays visible within its cycle

    function draw(now: number) {
      const elapsed = now - start;
      const t = elapsed / 1000;
      ctx!.clearRect(0, 0, width, height);

      const maxDiag = rows + cols || 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const seed = seeds[idx];
          const x = c * STEP;
          const y = r * STEP;

          // Diagonal build-in stagger + per-cell jitter so the reveal
          // reads as organic rather than a rigid wipe.
          const diagFrac = (r + c) / maxDiag;
          const jitter = hashSeed(seed) * 0.6;
          const introDelay = (diagFrac + jitter) * INTRO_STAGGER_MS;
          const cellElapsed = elapsed - introDelay;
          if (cellElapsed < 0) continue;
          const buildIn = Math.min(1, cellElapsed / FADE_IN_MS);

          // Ambient low-level drift, kept subtle — the twinkle carries
          // most of the visible motion.
          const wave =
            0.5 + 0.5 * Math.sin(t * 0.5 + seed + c * 0.32 + r * 0.24);

          // Independent twinkle: each cell has its own cycle length
          // (derived from its seed) and flashes once per cycle, easing
          // up then back down — pixels visibly swap in and out at rest.
          const cycle = TWINKLE_MIN_CYCLE + hashSeed(seed + 1.7) * TWINKLE_CYCLE_RANGE;
          const phaseOffset = hashSeed(seed + 3.3) * cycle;
          const localT = (t + phaseOffset) % cycle;
          let twinkle = 0;
          if (localT < TWINKLE_PULSE_WIDTH) {
            const p = localT / TWINKLE_PULSE_WIDTH;
            twinkle = Math.sin(p * Math.PI); // smooth rise + fall
          }

          const cx = x + CELL / 2;
          const cy = y + CELL / 2;
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Smooth exponential falloff rather than a hard-edged radius —
          // every cell on the canvas responds to the cursor, just more
          // faintly the further away it is, so there's no visible ring
          // where the spotlight used to cut off abruptly.
          const falloff = 260;
          const proximity = Math.exp(-dist / falloff);

          const intensity =
            Math.min(1, wave * 0.25 + twinkle * 0.7 + proximity * 0.95) *
            buildIn;
          if (intensity < 0.03) continue;

          const rgb = paletteRgb[hues[idx]];
          const rr = Math.round(lerp(bgRgb[0], rgb[0], intensity));
          const gg = Math.round(lerp(bgRgb[1], rgb[1], intensity));
          const bb = Math.round(lerp(bgRgb[2], rgb[2], intensity));

          ctx!.fillStyle = `rgb(${rr}, ${gg}, ${bb})`;
          ctx!.fillRect(x, y, CELL, CELL);
        }
      }
    }

    function loop(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - lastDraw < FRAME_INTERVAL) return;
      lastDraw = now;
      draw(now);
    }

    function start_() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop_() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function handleResize() {
      resize();
      // Draw one static frame well past the intro window so every cell
      // has already "built in" — reduced-motion users get a settled
      // grid, not a half-revealed one.
      if (reduceMotion) draw(start + 999999);
    }
    function handleVisibility() {
      if (document.hidden) {
        stop_();
      } else {
        start_();
      }
    }

    resize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    // Pause the whole loop whenever the hero scrolls off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          start_();
        } else {
          stop_();
        }
      },
      { threshold: 0 }
    );
    observer.observe(parent);

    if (reduceMotion) {
      draw(start + 999999);
    }

    return () => {
      stop_();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pixel-hero-canvas" />;
}
