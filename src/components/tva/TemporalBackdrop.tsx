"use client";

import { useEffect, useRef, useState } from "react";
import { PRUNE_EVENT } from "./PruneButton";

// The Sacred Timeline, alive behind the whole site: a luminous ribbon of
// strands that swells and pinches as it flows. New branches keep diverging
// from it; each one is either PRUNED (turns red, flashes, retracts from the
// tip) or REJOINS the main timeline. A small HUD narrates the count.
//
// Performance notes (this runs every frame, behind everything):
//  - glows are pre-rendered ONCE into small sprites and blitted with
//    drawImage — no per-frame shadowBlur passes;
//  - the ribbon's centre-line / width are computed once per x per frame, not
//    once per strand per x;
//  - strands are batched into a handful of paths (one stroke per colour band)
//    instead of one stroke per strand;
//  - the canvas backing store is capped at 1.25× DPR and drops to 30 fps while
//    a card is open, and it fully pauses while the prune cinematic plays.

const STRANDS = 24;
const STEP = 16;
const BANDS = 3; // alpha bands per colour

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

// A soft radial glow rendered once; drawn many times with drawImage.
function makeSprite(size: number, stops: [number, string][]) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, col]) => grad.addColorStop(o, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

export function TemporalBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hud, setHud] = useState({ spawned: 0, pruned: 0, rejoined: 0, active: 0, line: "SACRED TIMELINE: STABLE" });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    let w = 0, h = 0, raf = 0, last = 0, lastDraw = 0, t = 0, nextSpawn = 1.2, idSeq = 40;
    let paused = false;
    let stage = false;
    let ribbonFrac = 0.64; // vertical position of the ribbon on the stage (set by Stage from the real hero height)
    let waveAmp = 1;
    const mouse = { x: -9999, y: -9999 };
    const stats = { spawned: 0, pruned: 0, rejoined: 0 };
    let branches: Branch[] = [];
    let scrollP = 0;
    // Stage mode (home screen): ribbon sits mid-screen, publishes node
    // positions, and dives toward a node when a panel opens ("warp").
    const warpState = { target: 0, value: 0, x: 0, y: 0 };
    const NODE_FRACTIONS = [0.11, 0.3, 0.5, 0.7, 0.89];

    const strands = Array.from({ length: STRANDS }, (_, i) => ({
      off: (i / (STRANDS - 1)) * 2 - 1,
      ph: i * 1.37,
      f: (0.008 + (i % 5) * 0.0011) * 1.6,
      s: 0.5 + (i % 7) * 0.05,
      gold: i % 4 === 0,
      band: Math.min(BANDS - 1, Math.floor((1 - Math.abs((i / (STRANDS - 1)) * 2 - 1)) * BANDS)),
    }));

    // pre-rendered glows (drawn with drawImage — never blurred per frame)
    const pulseSprite = makeSprite(32, [[0, "rgba(255,240,205,1)"], [0.25, "rgba(255,170,90,0.85)"], [1, "rgba(255,122,26,0)"]]);
    const tipSprite = makeSprite(48, [[0, "rgba(255,240,200,1)"], [0.3, "rgba(255,150,60,0.8)"], [1, "rgba(255,122,26,0)"]]);
    const tipRedSprite = makeSprite(48, [[0, "rgba(255,210,190,1)"], [0.3, "rgba(255,70,50,0.8)"], [1, "rgba(229,57,43,0)"]]);

    const pushHud = (line: string) => setHud({ ...stats, active: branches.length, line });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil((w + 40) / STEP) + 1;
      cyArr = new Float32Array(cols);
      hwArr = new Float32Array(cols);
      if (reduce && cyArr.length) renderOnce();
    };
    let cols = 0;
    let cyArr = new Float32Array(0);
    let hwArr = new Float32Array(0);

    // main timeline centre-line (any x) — branches attach to this
    let baseY = 0;
    const cy = (x: number) => baseY + waveAmp * (46 * Math.sin(x * 0.0016 + t * 0.35) + 24 * Math.sin(x * 0.0043 - t * 0.5));

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
        offs: Array.from({ length: 4 }, (_, i) => (i - 1.5) * 3.6),
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

    const branchPoint = (b: Branch, j: number, x: number, merge: number) => {
      const u = clamp01((x - b.x0) / b.len);
      const tail = Math.max(0, x - b.x0 - b.len) * 0.18;
      const d = b.dir * (b.amp * smooth(u) + tail) * (1 - merge);
      return cy(x) + b.offs[j] * (0.4 + u) + d + 5 * Math.sin(x * 0.011 + t * 0.9 + j);
    };

    // returns false once the branch is finished
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
      const rgb = b.forced ? [229, 57, 43] : [base[0] + (229 - base[0]) * red, base[1] + (57 - base[1]) * red, base[2] + (43 - base[2]) * red];
      // all of a branch's strands in ONE path / ONE stroke
      ctx.beginPath();
      for (let j = 0; j < b.offs.length; j++) {
        let first = true;
        for (let x = xStart; x <= xEnd; x += STEP) {
          const y = branchPoint(b, j, x, merge);
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else ctx.lineTo(x, y);
        }
      }
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},0.4)`;
      ctx.stroke();

      // growth tip: a blitted glow sprite, not a shadowBlur
      const tipY = branchPoint(b, 1, xEnd, merge);
      const r = b.phase === "grow" ? 15 : 10;
      ctx.drawImage(b.forced || red > 0.5 ? tipRedSprite : tipSprite, xEnd - r, tipY - r, r * 2, r * 2);

      if (b.phase === "end" && b.fate === "prune") {
        const e = t - b.endAt;
        if (e < 0.9) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,120,90,${1 - e / 0.9})`;
          ctx.lineWidth = 2;
          ctx.arc(xEnd, tipY, 8 + e * 70, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      return true;
    };

    const pulses = Array.from({ length: 12 }, (_, i) => ({ i: (i * 5) % STRANDS, x: Math.random() * 2000, v: 110 + Math.random() * 190 }));

    // colour × alpha-band path batches (reused each frame)
    const BAND_ALPHA = [0.2, 0.3, 0.42];

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // 30 fps while a card is open (the card is covering most of the view)
      const minGap = warpState.target === 1 ? 1000 / 30 - 2 : 0;
      if (now - lastDraw < minGap) return;
      lastDraw = now;

      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      t += dt;

      waveAmp = stage ? 0.5 : 1; // nodes ride the ribbon: keep their drift small
      baseY = h * (stage ? ribbonFrac : 0.3 + 0.42 * scrollP);
      const prevWarp = warpState.value;
      warpState.value += (warpState.target - warpState.value) * Math.min(1, dt * 3.2);
      const S = 1 + warpState.value * 1.15;

      // centre-line + width: once per column
      for (let c = 0; c < cols; c++) {
        const x = -20 + c * STEP;
        cyArr[c] = cy(x);
        hwArr[c] = 20 + 24 * (0.5 + 0.5 * Math.sin(x * 0.0022 + t * 0.22));
      }

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(warpState.x, warpState.y);
      ctx.scale(S, S);
      ctx.translate(-warpState.x, -warpState.y);
      ctx.globalCompositeOperation = "lighter";

      // the strands, batched: 2 colours × BANDS alpha bands = 6 strokes
      const paths: Path2D[][] = [Array.from({ length: BANDS }, () => new Path2D()), Array.from({ length: BANDS }, () => new Path2D())];
      for (let i = 0; i < STRANDS; i++) {
        const s = strands[i];
        const path = paths[s.gold ? 1 : 0][s.band];
        for (let c = 0; c < cols; c++) {
          const x = -20 + c * STEP;
          let y = cyArr[c] + s.off * hwArr[c] + 6 * Math.sin(x * s.f + t * s.s + s.ph);
          const dx = x - mouse.x;
          if (dx < 148 && dx > -148) {
            const dy = y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 22000) y += (dy >= 0 ? 1 : -1) * (1 - d2 / 22000) * 26; // strands part around the cursor
          }
          if (c === 0) path.moveTo(x, y);
          else path.lineTo(x, y);
        }
      }
      ctx.lineWidth = 1;
      for (let b = 0; b < BANDS; b++) {
        ctx.strokeStyle = `rgba(255,122,26,${BAND_ALPHA[b]})`;
        ctx.stroke(paths[0][b]);
        ctx.strokeStyle = `rgba(232,184,74,${BAND_ALPHA[b] + 0.08})`;
        ctx.stroke(paths[1][b]);
      }
      // one soft wide glow under the middle of the ribbon
      ctx.lineWidth = 9;
      ctx.strokeStyle = "rgba(255,122,26,0.05)";
      ctx.stroke(paths[0][BANDS - 1]);

      // minutes of light running along the strands (sprite blits)
      for (const p of pulses) {
        p.x += p.v * dt;
        if (p.x > w + 40) p.x = -40;
        const c = Math.max(0, Math.min(cols - 1, Math.round((p.x + 20) / STEP)));
        const s = strands[p.i];
        const y = cyArr[c] + s.off * hwArr[c] + 6 * Math.sin(p.x * s.f + t * s.s + s.ph);
        ctx.drawImage(pulseSprite, p.x - 8, y - 8, 16, 16);
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
      ctx.restore();

      // warp streaks while diving toward / pulling back from a node (one path)
      const speed = Math.abs(warpState.value - prevWarp) / Math.max(dt, 0.001);
      if (speed > 0.08) {
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        const n = 56;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + i * 0.37;
          const r0 = 40 + ((i * 53) % 160) + warpState.value * 120;
          const len = Math.min(380, speed * 220) * (0.4 + ((i * 17) % 10) / 10);
          ctx.moveTo(warpState.x + Math.cos(a) * r0, warpState.y + Math.sin(a) * r0);
          ctx.lineTo(warpState.x + Math.cos(a) * (r0 + len), warpState.y + Math.sin(a) * (r0 + len));
        }
        ctx.strokeStyle = `rgba(255,190,110,${Math.min(0.5, speed * 0.45)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      // publish where the nodes sit on the ribbon so the DOM can pin to them
      if (stage) {
        const pts = NODE_FRACTIONS.map((f) => {
          const x = w * f;
          return { x, y: cy(x) };
        });
        window.dispatchEvent(new CustomEvent("tva:nodes", { detail: pts }));
      }

      if (t > nextSpawn && branches.length < 5) {
        spawn();
        nextSpawn = t + 2.2 + Math.random() * 2.6;
      }
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollP = max > 0 ? clamp01(window.scrollY / max) : 0;
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const run = () => {
      cancelAnimationFrame(raf);
      if (reduce || paused || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const onVis = () => run();
    // The prune cinematic covers the whole screen: stop drawing underneath it.
    const onPause = (e: Event) => {
      paused = (e as CustomEvent<boolean>).detail;
      if (paused) cancelAnimationFrame(raf);
      else run();
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
    const onWarp = (e: Event) => {
      const d = (e as CustomEvent<{ on: boolean; x: number; y: number }>).detail;
      warpState.target = d.on ? 1 : 0;
      if (d.on) {
        warpState.x = d.x;
        warpState.y = d.y;
      }
    };
    // the home stage announces itself via <html data-stage>
    const syncStage = () => {
      stage = document.documentElement.dataset.stage === "1";
      if (reduce) renderOnce();
    };
    const onRibbon = (e: Event) => {
      ribbonFrac = (e as CustomEvent<number>).detail;
      if (reduce) renderOnce();
    };
    // reduced motion draws a single still frame (and republishes node positions)
    function renderOnce() {
      frame(performance.now());
      cancelAnimationFrame(raf);
    }
    const mo = new MutationObserver(syncStage);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-stage"] });
    syncStage();

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener(PRUNE_EVENT, onPrune);
    window.addEventListener("tva:warp", onWarp);
    window.addEventListener("tva:pause", onPause);
    window.addEventListener("tva:ribbon", onRibbon);
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      t = 12;
      for (let i = 0; i < 2; i++) spawn();
      branches.forEach((b) => {
        b.born = t - b.growFor - 1;
        b.phase = "live";
      });
      last = performance.now();
      frame(performance.now());
      cancelAnimationFrame(raf);
    } else {
      last = performance.now();
      spawn();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener(PRUNE_EVENT, onPrune);
      window.removeEventListener("tva:warp", onWarp);
      window.removeEventListener("tva:pause", onPause);
      window.removeEventListener("tva:ribbon", onRibbon);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,122,26,0.14),transparent_65%)]" />
        <canvas ref={ref} className="absolute inset-0" />
        <div className="tva-overlay absolute inset-0" />
      </div>

      {/* live narration of the timeline */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-3 left-4 z-[41] hidden max-w-[22rem] flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted sm:flex xl:left-16"
      >
        <span className="text-accent-primary">{hud.line}</span>
        <span>
          spawned {String(hud.spawned).padStart(3, "0")} · pruned{" "}
          <span className="text-error-text">{String(hud.pruned).padStart(3, "0")}</span> · rejoined{" "}
          {String(hud.rejoined).padStart(3, "0")} · active {hud.active}
        </span>
      </div>
    </>
  );
}
