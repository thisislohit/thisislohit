"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoomScene } from "./LoomScene";
import { PRUNE_EVENT } from "./PruneButton";

type Phase = "idle" | "away" | "loom";

// Everything that visually "is the page". Collected at prune time and
// tagged so CSS can disintegrate / restore each piece with its own delay.
const TARGETS = 'nav[aria-label="Primary"], main section .col-span-4 > *, footer > div > div > *';

const AWAY_MS = 1500;

// Pruning: the page crumbles into ash, then the Temporal Loom scene plays —
// Loki walks to the Loom, raises his hands, gathers every thread into a single
// golden point — and the flood of light re-forms the page from the very top.
export function PruneEffect() {
  const [phase, setPhase] = useState<Phase>("idle");
  const canvas = useRef<HTMLCanvasElement>(null);
  const busy = useRef(false);
  const els = useRef<HTMLElement[]>([]);

  const html = () => document.documentElement;

  const finish = useCallback(() => {
    els.current.forEach((el) => {
      el.classList.remove("prune-target");
      el.style.removeProperty("--prune-delay");
    });
    delete html().dataset.prune;
    html().style.overflow = "";
    setPhase("idle");
    busy.current = false;
  }, []);

  // The gold light floods the screen: restore the page beneath it.
  const flash = useCallback(
    (andFinish = false) => {
      window.scrollTo({ top: 0, behavior: "instant" });
      els.current.forEach((el, i) => el.style.setProperty("--prune-delay", `${i * 0.06}s`));
      html().dataset.prune = "back";
      if (andFinish) setTimeout(finish, 1800);
    },
    [finish],
  );

  const run = useCallback(() => {
    if (busy.current) return;
    busy.current = true;

    els.current = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    els.current.forEach((el) => {
      const top = Math.max(0, el.getBoundingClientRect().top);
      el.classList.add("prune-target");
      // blocks on screen crumble first, top to bottom
      el.style.setProperty("--prune-delay", `${Math.min(1, top / window.innerHeight) * 0.9}s`);
    });
    html().style.overflow = "hidden";
    html().dataset.prune = "away";
    setPhase("away");

    // reduced motion: skip the film, just reset
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => (reduce ? flash(true) : setPhase("loom")), AWAY_MS);
  }, [flash]);

  useEffect(() => {
    window.addEventListener(PRUNE_EVENT, run);
    return () => window.removeEventListener(PRUNE_EVENT, run);
  }, [run]);

  // Ash crumbling off the page while it is being erased.
  useEffect(() => {
    if (phase !== "away") return;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);
    const ash = Array.from({ length: 520 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2.4,
      vy: -(Math.random() * 3 + 0.6),
      r: Math.random() * 2.6 + 0.6,
      life: Math.random() * 0.8 + 0.6,
      gold: Math.random() > 0.6,
      delay: Math.random() * 0.9,
    }));
    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const a of ash) {
        if (t < a.delay) continue;
        const age = (t - a.delay) / a.life;
        if (age > 1) continue;
        a.x += a.vx + Math.sin(t * 6 + a.y * 0.02) * 0.8;
        a.y += a.vy;
        ctx.globalAlpha = 1 - age;
        ctx.fillStyle = a.gold ? "#e8b84a" : "#ff7a1a";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fillRect(a.x, a.y, a.r * 2, a.r * 2);
      }
      if (t < 2.4) raf = requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <>
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[250] h-full w-full" />
      {phase === "loom" && <LoomScene onFlash={() => flash()} onDone={finish} />}
    </>
  );
}
