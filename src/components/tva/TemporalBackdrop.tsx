"use client";

import { useEffect, useRef, useState } from "react";
import { PRUNE_EVENT } from "./PruneButton";

// The Sacred Timeline, alive behind the whole site: a luminous ribbon of
// strands that swells and pinches as it flows. New branches keep diverging
// from it; each one is either PRUNED (turns red, flashes, retracts from the
// tip) or REJOINS the main timeline. A small HUD narrates the count.

const STRANDS = 28;
const STEP = 12;

type Branch = {
  id: number;
  x0: number;
  dir: 1 | -1;
  len: number;
  amp: number;
  born: number;
  growFor: number;
  liveFor: number;
  fate: "prune" | "merge";
  phase: "grow" | "live" | "end";
  endAt: number;
  forced: boolean;
  offs: number[];
};

const smooth = (u: number) => u * u * (3 - 2 * u);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function TemporalBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hud, setHud] = useState({ spawned: 0, pruned: 0, rejoined: 0, active: 0, line: "SACRED TIMELINE: STABLE" });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0, h = 0, raf = 0, last = 0, t = 0, nextSpawn = 1.2, idSeq = 40;
    const mouse = { x: -9999, y: -9999 };
    const stats = { spawned: 0, pruned: 0, rejoined: 0 };
    let branches: Branch[] = [];
    let scrollP = 0;

    const strands = Array.from({ length: STRANDS }, (_, i) => ({
      off: (i / (STRANDS - 1)) * 2 - 1,
      ph: i * 1.37,
      f: 0.008 + (i % 5) * 0.0011,
      s: 0.5 + (i % 7) * 0.05,
      gold: i % 4 === 0,
    }));

    const pushHud = (line: string) =>
      setHud({ ...stats, active: branches.length, line });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // main timeline centre-line and its swelling half-width
    const cy = (x: number) =>
      h * (0.3 + 0.42 * scrollP) + 46 * Math.sin(x * 0.0016 + t * 0.35) + 24 * Math.sin(x * 0.0043 - t * 0.5);
    const hw = (x: number) => 20 + 24 * (0.5 + 0.5 * Math.sin(x * 0.0022 + t * 0.22));
    const sy = (i: number, x: number) => {
      const s = strands[i];
      let y = cy(x) + s.off * hw(x) + 6 * Math.sin(x * s.f * 1.6 + t * s.s + s.ph);
      const dx = x - mouse.x, dy = y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 22000) y += (dy >= 0 ? 1 : -1) * (1 - d2 / 22000) * 26; // strands part around the cursor
      return y;
    };

    const spawn = (forced = false) => {
      const dir: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
      const b: Branch = {
        id: ++idSeq,
        x0: w * (0.08 + Math.random() * 0.72),
        dir,
        len: 420 + Math.random() * 380,
        amp: 120 + Math.random() * 190,
        born: t,
        growFor: 3 + Math.random() * 1.5,
        liveFor: 4 + Math.random() * 5,
        fate: Math.random() < 0.62 ? "prune" : "merge",
        phase: "grow",
        endAt: 0,
        forced,
        offs: Array.from({ length: 5 }, (_, i) => (i - 2) * 3.2),
      };
      branches.push(b);
      stats.spawned++;
      pushHud(`▸ NEW BRANCH #${String(b.id).padStart(4, "0")} DIVERGED`);
    };

    const startEnd = (b: Branch, fate: "prune" | "merge") => {
      b.phase = "end";
      b.fate = fate;
      b.endAt = t;
    };

    const branchPoint = (b: Branch, j: number, x: number, grow: number, merge: number) => {
      const u = clamp01((x - b.x0) / b.len);
      const tail = Math.max(0, x - b.x0 - b.len) * 0.18;
      const d = b.dir * (b.amp * smooth(u) + tail) * (1 - merge);
      return cy(x) + b.offs[j] * (0.4 + u) + d + 5 * Math.sin(x * 0.011 + t * 0.9 + j);
    };

    const drawBranch = (b: Branch, dt: number) => {
      b.x0 -= 14 * dt; // the whole branch drifts with the flow
      const total = b.len + 520;
      let grow = 1, retract = 0, merge = 0, red = 0;
      const age = t - b.born;
      if (b.phase === "grow") {
        grow = 1 - Math.pow(1 - clamp01(age / b.growFor), 3);
        if (age >= b.growFor) b.phase = "live";
      }
      if (b.phase === "live" && age >= b.growFor + b.liveFor) startEnd(b, b.fate);
      if (b.phase === "end") {
        const e = t - b.endAt;
        if (b.fate === "prune") {
          red = clamp01(e / 0.5);
          retract = smooth(clamp01((e - 0.35) / 1.5));
          if (e > 1.95) return false;
        } else {
          merge = smooth(clamp01(e / 2.6));
          if (e > 2.7) return false;
        }
      }
      if (b.x0 + total < -80) return false;

      const xStart = b.x0;
      const xEnd = b.x0 + total * grow * (1 - retract);
      if (xEnd <= xStart) return true;

      const base = b.fate === "merge" && b.phase !== "end" ? [232, 184, 74] : [255, 122, 26];
      const col = [
        base[0] + (229 - base[0]) * red,
        base[1] + (57 - base[1]) * red,
        base[2] + (43 - base[2]) * red,
      ];
      const forcedRed = b.forced ? 1 : red;
      const rgb = b.forced ? [229, 57, 43] : col;
      ctx.lineWidth = 1.2;
      for (let j = 0; j < b.offs.length; j++) {
        ctx.beginPath();
        for (let x = xStart; x <= xEnd; x += STEP) {
          const y = branchPoint(b, j, x, grow, merge);
          if (x === xStart) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},${0.42 - j * 0.04})`;
        ctx.stroke();
      }
      // glowing growth tip
      const tipX = xEnd;
      const tipY = branchPoint(b, 2, tipX, grow, merge);
      const tipR = b.phase === "grow" ? 5 : 3;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,${230 - forcedRed * 150 | 0},${200 - forcedRed * 170 | 0},0.95)`;
      ctx.shadowColor = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`;
      ctx.shadowBlur = 14;
      ctx.arc(tipX, tipY, tipR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // pruning flash ring at the tip
      if (b.phase === "end" && b.fate === "prune") {
        const e = t - b.endAt;
        if (e < 0.9) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,120,90,${1 - e / 0.9})`;
          ctx.lineWidth = 2;
          ctx.arc(tipX, tipY, 8 + e * 70, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      return true;
    };

    const pulses = Array.from({ length: 16 }, (_, i) => ({ i: (i * 5) % STRANDS, x: Math.random() * 2000, v: 110 + Math.random() * 190 }));

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // faint wide glow under the bundle
      ctx.lineWidth = 9;
      for (const i of [3, 14, 24]) {
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += STEP * 2) {
          const y = sy(i, x);
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(255,122,26,0.05)";
        ctx.stroke();
      }

      // the main strands
      ctx.lineWidth = 1;
      for (let i = 0; i < STRANDS; i++) {
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += STEP) {
          const y = sy(i, x);
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const mid = 1 - Math.abs(strands[i].off);
        ctx.strokeStyle = strands[i].gold
          ? `rgba(232,184,74,${0.17 + mid * 0.26})`
          : `rgba(255,122,26,${0.14 + mid * 0.28})`;
        ctx.stroke();
      }

      // minutes of light running along the strands
      for (const p of pulses) {
        p.x += p.v * dt;
        if (p.x > w + 40) p.x = -40;
        const y = sy(p.i, p.x);
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,236,200,0.9)";
        ctx.shadowColor = "#ff9a4d";
        ctx.shadowBlur = 12;
        ctx.arc(p.x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // branches
      branches = branches.filter((b) => {
        const keep = drawBranch(b, dt);
        if (!keep) {
          if (b.fate === "prune") {
            stats.pruned++;
            pushHud(`▸ BRANCH #${String(b.id).padStart(4, "0")} PRUNED BY THE TVA`);
          } else {
            stats.rejoined++;
            pushHud(`▸ BRANCH #${String(b.id).padStart(4, "0")} REJOINED THE SACRED TIMELINE`);
          }
        }
        return keep;
      });

      if (t > nextSpawn && branches.length < 5) {
        spawn();
        nextSpawn = t + 2.2 + Math.random() * 2.6;
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollP = max > 0 ? clamp01(window.scrollY / max) : 0;
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    // Pruning wipes every active branch at once, in red.
    const onPrune = () => {
      branches.forEach((b) => {
        b.fate = "prune";
        b.forced = true;
        if (b.phase !== "end") startEnd(b, "prune");
      });
      for (let i = 0; i < 4; i++) spawn(true);
      pushHud("▸ MASS PRUNING IN PROGRESS");
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener(PRUNE_EVENT, onPrune);
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      t = 12;
      for (let i = 0; i < 2; i++) spawn();
      branches.forEach((b) => {
        b.born = t - b.growFor - 1;
        b.phase = "live";
      });
      frame(performance.now());
      cancelAnimationFrame(raf);
    } else {
      last = performance.now();
      spawn();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener(PRUNE_EVENT, onPrune);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,122,26,0.14),transparent_65%)]" />
        <canvas ref={ref} className="absolute inset-0" />
        <div className="tva-scanlines absolute inset-0" />
        <div className="tva-vignette absolute inset-0" />
        <div className="tva-grain" />
      </div>

      {/* live narration of the timeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-3 left-4 z-[41] hidden max-w-[22rem] flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted sm:flex xl:left-16"
      >
        <span className="text-accent-primary">{hud.line}</span>
        <span>
          spawned {String(hud.spawned).padStart(3, "0")} · pruned{" "}
          <span className="text-error">{String(hud.pruned).padStart(3, "0")}</span> · rejoined{" "}
          {String(hud.rejoined).padStart(3, "0")} · active {hud.active}
        </span>
      </div>
    </>
  );
}
