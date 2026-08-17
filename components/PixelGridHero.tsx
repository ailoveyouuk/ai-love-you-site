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

    function draw(now: number) {
      const t = (now - start) / 1000;
      ctx!.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const seed = seeds[idx];
          const x = c * STEP;
          const y = r * STEP;

          // Slow ambient drift — gentle amplitude so it reads as dynamism,
          // not noise, and stays legible under the text scrim.
          const wave =
            0.5 + 0.5 * Math.sin(t * 0.5 + seed + c * 0.32 + r * 0.24);

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

          const intensity = Math.min(1, wave * 0.45 + proximity * 0.95);
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
      if (reduceMotion) draw(performance.now());
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
      draw(performance.now());
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
