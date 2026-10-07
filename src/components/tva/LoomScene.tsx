"use client";

import { useEffect, useRef, useState } from "react";

// Timeline of the scene, in seconds.
const WALK_START = 1.0;
const WALK_END = 4.4; // Loki reaches the Loom and stops
const ARMS_UP = [4.4, 5.1] as const;
const PULL = [4.9, 6.5] as const; // every thread bends into his hands
const COLLAPSE = [6.4, 7.1] as const; // all threads fold into one point above him
const FLASH = 7.0; // gold light takes the screen — page restores beneath
const FADE = [8.6, 9.8] as const; // overlay dissolves
export const LOOM_TOTAL = 9.9;

const CAPTIONS: [number, string, string][] = [
  [0.7, "The Temporal Loom", "where every timeline is woven"],
  [4.6, "Every thread. Every branch.", "he gathers them all"],
  [6.6, "God of Stories", "a single, sacred timeline"],
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
const out = (v: number) => 1 - Math.pow(1 - v, 3);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const seg = (t: number, [a, b]: readonly [number, number]) => clamp01((t - a) / (b - a));

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Thread = {
  y0: number; amp: number; f: number; ph: number; sp: number; side: 1 | -1;
  rgb: [number, number, number]; a: number; pullAt: number; w: number;
};

// "The walk to the Loom": Loki seen from behind crosses a lit path toward a
// vast web of timeline threads, raises both hands, draws every thread into
// them and folds the whole web into one golden point that floods the screen.
export function LoomScene({ onFlash, onDone }: { onFlash: () => void; onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const skip = useRef(false);
  const flashed = useRef(false);
  const [cap, setCap] = useState(-1);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, last = performance.now(), t = 0, finished = false, lastCap = -1;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const r = rng(616);
    const threads: Thread[] = Array.from({ length: 150 }, () => {
      const k = r();
      const rgb: [number, number, number] = k < 0.12 ? [229, 57, 43] : k < 0.38 ? [232, 184, 74] : k < 0.46 ? [255, 226, 190] : [255, 122, 26];
      return {
        y0: (r() - 0.5) * 2,
        amp: 6 + r() * 26,
        f: 0.004 + r() * 0.009,
        ph: r() * 6.28,
        sp: 0.25 + r() * 0.7,
        side: r() > 0.5 ? 1 : -1,
        rgb,
        a: 0.25 + r() * 0.55,
        pullAt: r(),
        w: 0.7 + r() * 1.1,
      };
    });
    const tiles = 16;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (skip.current) {
        t = Math.max(t, FLASH - 0.5);
        skip.current = false;
      }
      t += dt;

      const vpx = w * 0.5;
      const vpy = h * 0.4;
      const unit = h / 900;

      // — camera dolly toward the Loom —
      const cam = ease(clamp01((t - WALK_START) / (WALK_END - WALK_START + 1)));
      const S = 1 + cam * 0.7;

      // — Loki's walk (along the path, away from camera) —
      const walkU = ease(seg(t, [WALK_START, WALK_END]));
      const pathTopY = vpy + h * 0.2;
      const fy = lerp(h * 0.9, pathTopY, walkU);
      const fscale = lerp(1.05, 0.36, walkU) * unit * 3.1;
      const fx = vpx;
      const walking = t > WALK_START && t < WALK_END;
      const bob = walking ? Math.sin(t * 9) : 0;
      const armsU = ease(seg(t, ARMS_UP));

      // local figure coords → screen
      const sx = (lx: number) => fx + lx * fscale;
      const sy = (ly: number) => fy + ly * fscale;
      // hand positions (arms relative to shoulders at y≈-84)
      const handL = { x: sx(lerp(-21, -38, armsU)), y: sy(lerp(-50, -138, armsU)) };
      const handR = { x: sx(lerp(21, 38, armsU)), y: sy(lerp(-50, -138, armsU)) };
      const point = { x: fx, y: sy(-160) - 18 * unit }; // where everything converges

      // ————— background —————
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#070403";
      ctx.fillRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(vpx, vpy, 0, vpx, vpy, h * 0.95);
      glow.addColorStop(0, "rgba(255,140,50,0.34)");
      glow.addColorStop(0.45, "rgba(120,50,10,0.16)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // ————— the Loom (threads) —————
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.translate(vpx, vpy);
      ctx.scale(S, S);
      ctx.translate(-vpx, -vpy);
      // hand/point in the scaled space so the pull lands where Loki really is
      const inv = (p: { x: number; y: number }) => ({ x: vpx + (p.x - vpx) / S, y: vpy + (p.y - vpy) / S });
      const hl = inv(handL), hr = inv(handR), pt = inv(point);
      const collapse = ease(seg(t, COLLAPSE));
      const reveal = out(clamp01(t / 1.4));

      for (const th of threads) {
        const pk = ease(clamp01((t - PULL[0] - th.pullAt * 1.0) / 0.9));
        const hand = th.side === 1 ? hr : hl;
        const gold = pk;
        const R = lerp(th.rgb[0], 255, gold * 0.55);
        const G = lerp(th.rgb[1], 214, gold);
        const B = lerp(th.rgb[2], 110, gold);
        ctx.beginPath();
        let started = false;
        for (let x = -40; x <= w + 40; x += 20) {
          const nx = (x - vpx) / (w * 0.5);
          const spread = h * 0.34 * (0.22 + 0.78 * Math.pow(Math.abs(nx), 1.35));
          let y = vpy + th.y0 * spread + th.amp * Math.sin(x * th.f + t * th.sp + th.ph);
          let px = x;
          // threads bend into the nearest raised hand
          const near = Math.exp(-Math.pow((x - hand.x) / (w * 0.3), 2));
          const wgt = pk * (0.35 + 0.65 * near);
          px = lerp(px, hand.x, wgt * 0.55);
          y = lerp(y, hand.y, wgt);
          // …then everything folds into one point above his head
          px = lerp(px, pt.x, collapse);
          y = lerp(y, pt.y, collapse);
          if (!started) {
            ctx.moveTo(px, y);
            started = true;
          } else ctx.lineTo(px, y);
        }
        ctx.lineWidth = th.w / S + gold * 0.8;
        ctx.strokeStyle = `rgba(${R | 0},${G | 0},${B | 0},${th.a * reveal * (1 - collapse * 0.25)})`;
        ctx.stroke();
      }
      ctx.restore();

      // ————— the lit path —————
      if (t < FLASH + 0.5) {
        const topW = w * 0.012;
        const botW = w * 0.2;
        ctx.save();
        ctx.globalAlpha = 0.9 * (1 - collapse * 0.6);
        const grad = ctx.createLinearGradient(0, pathTopY, 0, h);
        grad.addColorStop(0, "rgba(255,150,70,0.5)");
        grad.addColorStop(1, "rgba(30,14,6,0.9)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(vpx - topW, pathTopY);
        ctx.lineTo(vpx + topW, pathTopY);
        ctx.lineTo(vpx + botW, h);
        ctx.lineTo(vpx - botW, h);
        ctx.closePath();
        ctx.fill();
        // glowing edges
        ctx.strokeStyle = "rgba(255,140,60,0.75)";
        ctx.shadowColor = "#ff7a1a";
        ctx.shadowBlur = 14;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(vpx - topW, pathTopY);
        ctx.lineTo(vpx - botW, h);
        ctx.moveTo(vpx + topW, pathTopY);
        ctx.lineTo(vpx + botW, h);
        ctx.stroke();
        ctx.shadowBlur = 0;
        // tile lines racing toward the horizon
        const flow = walking ? t * 0.5 : WALK_END * 0.5;
        ctx.lineWidth = 1;
        for (let i = 0; i < tiles; i++) {
          const z = ((i / tiles + flow) % 1);
          const yy = lerp(pathTopY, h, Math.pow(z, 2.2));
          const half = lerp(topW, botW, (yy - pathTopY) / (h - pathTopY));
          ctx.strokeStyle = `rgba(255,150,70,${0.08 + z * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(vpx - half, yy);
          ctx.lineTo(vpx + half, yy);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ————— Loki, from behind —————
      if (t > 0.4 && t < FLASH + 0.4) {
        const fade = clamp01((t - 0.4) / 0.8) * (1 - clamp01((t - COLLAPSE[0]) / 0.9) * 0.7);
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(fx, fy - bob * fscale * 0.3);
        ctx.scale(fscale, fscale);
        const sway = walking ? Math.sin(t * 4.5) * 3 : Math.sin(t * 2) * 1.2 * (1 - armsU);
        const lw = 1 / fscale;

        // legs
        const swing = walking ? Math.sin(t * 9) * 5 : 0;
        ctx.strokeStyle = "#0a0604";
        ctx.lineCap = "round";
        ctx.lineWidth = 7;
        for (const s of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(s * 5, -40);
          ctx.lineTo(s * 5 + swing * s * -0.4, -4 + (s * swing > 0 ? -3 : 0));
          ctx.stroke();
        }
        // cape
        ctx.fillStyle = "#06261b";
        ctx.beginPath();
        ctx.moveTo(-17, -86);
        ctx.quadraticCurveTo(-30 + sway, -44, -26 + sway * 1.6, -3);
        ctx.quadraticCurveTo(0, 6 + sway * 0.4, 26 + sway * 1.6, -3);
        ctx.quadraticCurveTo(30 + sway, -44, 17, -86);
        ctx.quadraticCurveTo(0, -92, -17, -86);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,160,80,0.65)";
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "#ff7a1a";
        ctx.shadowBlur = 8 / fscale + 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
        // centre seam
        ctx.strokeStyle = "rgba(255,200,120,0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.lineTo(sway * 0.8, -4);
        ctx.stroke();
        // arms (rest → raised V)
        ctx.strokeStyle = "#06261b";
        ctx.lineWidth = 6.5;
        for (const s of [-1, 1]) {
          const hxL = lerp(21, 38, armsU) * s;
          const hyL = lerp(-50, -138, armsU);
          const exL = lerp(25, 30, armsU) * s;
          const eyL = lerp(-68, -108, armsU);
          ctx.beginPath();
          ctx.moveTo(s * 16, -84);
          ctx.quadraticCurveTo(exL, eyL, hxL, hyL);
          ctx.stroke();
        }
        // head, hair
        ctx.fillStyle = "#0a0604";
        ctx.beginPath();
        ctx.arc(0, -97, 8.4, 0, Math.PI * 2);
        ctx.fill();
        // helmet: two swept horns + blade
        const gold = "#e8b84a";
        ctx.fillStyle = gold;
        ctx.strokeStyle = "rgba(255,230,160,0.9)";
        ctx.lineWidth = lw * 1.2;
        ctx.shadowColor = "#ffb347";
        ctx.shadowBlur = 10 / fscale + 3;
        for (const s of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(s * 4, -102);
          ctx.bezierCurveTo(s * 18, -104, s * 14, -124, s * 28, -140);
          ctx.bezierCurveTo(s * 10, -130, s * 3, -118, s * 1, -104);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(0, -140);
        ctx.lineTo(3.2, -103);
        ctx.lineTo(-3.2, -103);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();

        // glowing hands
        if (armsU > 0.05) {
          for (const hnd of [handL, handR]) {
            const g = ctx.createRadialGradient(hnd.x, hnd.y, 0, hnd.x, hnd.y, 70 * unit * (0.4 + pkAvg(t)));
            g.addColorStop(0, "rgba(255,240,200,0.95)");
            g.addColorStop(0.3, "rgba(255,190,80,0.55)");
            g.addColorStop(1, "rgba(255,120,30,0)");
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = fade * armsU;
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(hnd.x, hnd.y, 70 * unit * (0.4 + pkAvg(t)), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      // ————— the flood of golden light —————
      if (t > COLLAPSE[0] + 0.2) {
        const g = ease(clamp01((t - (COLLAPSE[0] + 0.2)) / 1.1));
        const bloom = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, Math.max(w, h) * 1.25 * g);
        bloom.addColorStop(0, "rgba(255,255,240,1)");
        bloom.addColorStop(0.25, "rgba(255,226,150,0.98)");
        bloom.addColorStop(0.7, "rgba(255,170,60,0.9)");
        bloom.addColorStop(1, "rgba(255,122,26,0)");
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, w, h);
      }

      // — captions —
      let ci = -1;
      for (let i = 0; i < CAPTIONS.length; i++) if (t >= CAPTIONS[i][0]) ci = i;
      if (t > FLASH + 0.3) ci = -1;
      if (ci !== lastCap) {
        lastCap = ci;
        setCap(ci);
      }

      if (t >= FLASH && !flashed.current) {
        flashed.current = true;
        onFlash();
      }
      canvas.style.opacity = String(1 - ease(seg(t, FADE)));
      if (t >= LOOM_TOTAL && !finished) {
        finished = true;
        onDone();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    // average pull progress → hands swell as threads arrive
    function pkAvg(tt: number) {
      return ease(clamp01((tt - PULL[0]) / (PULL[1] - PULL[0] + 0.9)));
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[260]" role="status" aria-live="polite" aria-label="Loki gathers the threads of the Temporal Loom and restores the timeline">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      {cap >= 0 && (
        <div key={cap} className="pointer-events-none absolute inset-x-0 bottom-[11vh] flex animate-[cap-in_0.9s_ease-out_both] flex-col items-center gap-1 px-6 text-center">
          <div className="font-display text-2xl font-black uppercase tracking-[0.18em] text-text-primary sm:text-4xl" style={{ textShadow: "0 0 30px rgba(255,122,26,0.8)" }}>
            {CAPTIONS[cap][1]}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent-utility">{CAPTIONS[cap][2]}</div>
        </div>
      )}
      <button
        onClick={() => (skip.current = true)}
        className="absolute bottom-4 right-4 border border-border bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted backdrop-blur hover:text-accent-primary"
      >
        Skip scene ›
      </button>
    </div>
  );
}
