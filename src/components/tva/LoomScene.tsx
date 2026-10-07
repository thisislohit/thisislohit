"use client";

import { useEffect, useRef, useState } from "react";

// Timeline of the scene, in seconds.
const WALK_START = 1.0;
const WALK_END = 4.6; // the variant reaches the Loom and stops
const ARMS_UP = [4.6, 5.3] as const;
const PULL = [5.0, 6.9] as const; // every thread bends into their hands
const COLLAPSE = [6.8, 7.5] as const; // all threads fold into one point overhead
const FLASH = 7.4; // total whiteout — page restores beneath it
const WEB = [8.0, 8.9] as const; // the light clears into a web of threads
const FADE = [9.3, 10.6] as const; // overlay dissolves
export const LOOM_TOTAL = 10.7;

const CAPTIONS: [number, string, string][] = [
  [0.7, "The Temporal Loom", "where every timeline is woven"],
  [4.8, "Every thread. Every branch.", "gathered by one variant"],
  [7.6, "One sacred timeline", "restored"],
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

const GREEN: [number, number, number] = [255, 122, 26];
const EMERALD: [number, number, number] = [255, 150, 60];
const MINT: [number, number, number] = [255, 226, 190];
const GOLD: [number, number, number] = [232, 184, 74];
const RED: [number, number, number] = [229, 57, 43];

// An original hooded variant, seen from behind, crosses a dusty lit path
// toward a vast web of timeline threads, carrying glowing strands in both
// hands. They raise their arms, every thread is drawn in, the web folds into
// one point and the screen whites out in golden light — clearing to a web
// of threads as the page re-forms.
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
      const rgb = k < 0.06 ? RED : k < 0.14 ? GOLD : k < 0.26 ? MINT : k < 0.55 ? GREEN : EMERALD;
      return {
        y0: (r() - 0.5) * 2, amp: 6 + r() * 26, f: 0.004 + r() * 0.009, ph: r() * 6.28,
        sp: 0.25 + r() * 0.7, side: r() > 0.5 ? 1 : -1, rgb, a: 0.25 + r() * 0.55, pullAt: r(), w: 0.7 + r() * 1.1,
      };
    });
    const tiles = 16;
    const dust = Array.from({ length: 110 }, () => ({ x: r(), y: r(), v: 0.3 + r() * 1.2, s: 0.6 + r() * 1.8, a: 0.15 + r() * 0.4 }));
    const motes = Array.from({ length: 80 }, (_, i) => ({ ang: i * 2.399, rad: 14 + ((i * 37) % 46), spin: 1.5 + (i % 5) * 0.6, side: i % 2 ? 1 : -1 }));
    const web = Array.from({ length: 80 }, () => ({ a1: r() * 6.283, a2: r() * 6.283, d1: 0.5 + r() * 0.7, d2: 0.5 + r() * 0.7, w: 0.6 + r() * 1.1 }));
    const rgba = (c: number[], a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

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

      const cam = ease(clamp01((t - WALK_START) / (WALK_END - WALK_START + 1)));
      const S = 1 + cam * 0.7;

      const walkU = ease(seg(t, [WALK_START, WALK_END]));
      const pathTopY = vpy + h * 0.2;
      const fy = lerp(h * 0.9, pathTopY, walkU);
      const fscale = lerp(1.05, 0.36, walkU) * unit * 3.1;
      const fx = vpx;
      const walking = t > WALK_START && t < WALK_END;
      const bob = walking ? Math.sin(t * 9) : 0;
      const armsU = ease(seg(t, ARMS_UP));

      const sx = (lx: number) => fx + lx * fscale;
      const sy = (ly: number) => fy + ly * fscale;
      const handL = { x: sx(lerp(-21, -38, armsU)), y: sy(lerp(-50, -138, armsU)) };
      const handR = { x: sx(lerp(21, 38, armsU)), y: sy(lerp(-50, -138, armsU)) };
      const point = { x: fx, y: sy(-160) - 18 * unit };

      const pkAll = ease(clamp01((t - PULL[0]) / (PULL[1] - PULL[0])));
      const shake = armsU * (1 - clamp01((t - COLLAPSE[1]) / 0.3)) * (1 + pkAll * 2) * (t < FLASH + 0.6 ? 1 : 0);
      ctx.setTransform(dpr, 0, 0, dpr, (Math.random() - 0.5) * shake * 2.2 * dpr, (Math.random() - 0.5) * shake * 2.2 * dpr);

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

      // ————— the Loom —————
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.translate(vpx, vpy);
      ctx.scale(S, S);
      ctx.translate(-vpx, -vpy);
      const inv = (p: { x: number; y: number }) => ({ x: vpx + (p.x - vpx) / S, y: vpy + (p.y - vpy) / S });
      const hl = inv(handL), hr = inv(handR), pt = inv(point);
      const collapse = ease(seg(t, COLLAPSE));
      const reveal = out(clamp01(t / 1.4));

      for (const th of threads) {
        const pk = ease(clamp01((t - PULL[0] - th.pullAt * 1.0) / 0.9));
        const hand = th.side === 1 ? hr : hl;
        const lit = pk;
        const c = [lerp(th.rgb[0], 255, lit * 0.55), lerp(th.rgb[1], 214, lit), lerp(th.rgb[2], 110, lit)];
        ctx.beginPath();
        let started = false;
        for (let x = -40; x <= w + 40; x += 20) {
          const nx = (x - vpx) / (w * 0.5);
          const spread = h * 0.34 * (0.22 + 0.78 * Math.pow(Math.abs(nx), 1.35));
          let y = vpy + th.y0 * spread + th.amp * Math.sin(x * th.f + t * th.sp + th.ph);
          let px = x;
          const near = Math.exp(-Math.pow((x - hand.x) / (w * 0.3), 2));
          const wgt = pk * (0.35 + 0.65 * near);
          px = lerp(px, hand.x, wgt * 0.55);
          y = lerp(y, hand.y, wgt);
          px = lerp(px, pt.x, collapse);
          y = lerp(y, pt.y, collapse);
          if (!started) {
            ctx.moveTo(px, y);
            started = true;
          } else ctx.lineTo(px, y);
        }
        ctx.lineWidth = th.w / S + lit * 0.8;
        ctx.strokeStyle = rgba(c, th.a * reveal * (1 - collapse * 0.25));
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
        const flow = walking ? t * 0.5 : WALK_END * 0.5;
        ctx.lineWidth = 1;
        for (let i = 0; i < tiles; i++) {
          const z = (i / tiles + flow) % 1;
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

      // ————— dust blowing across the path —————
      if (t < FLASH + 0.5) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const gust = walking ? 1.6 : 0.5;
        for (const d of dust) {
          d.x -= d.v * gust * dt * 0.35;
          if (d.x < -0.05) d.x = 1.05;
          ctx.globalAlpha = d.a * clamp01(t / 1.2) * (1 - collapse * 0.7);
          ctx.fillStyle = "#ffb676";
          ctx.beginPath();
          ctx.arc(d.x * w, d.y * h, d.s * unit * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // ————— the variant, from behind —————
      if (t > 0.4 && t < FLASH + 0.4) {
        const fade = clamp01((t - 0.4) / 0.8) * (1 - clamp01((t - COLLAPSE[0]) / 0.9) * 0.7);
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(fx, fy - bob * fscale * 0.3);
        ctx.scale(fscale, fscale);
        const sway = walking ? Math.sin(t * 4.5) * 3 : Math.sin(t * 2) * 1.2 * (1 - armsU);
        const lw = 1 / fscale;

        ctx.strokeStyle = "#0a0604";
        ctx.lineCap = "round";
        ctx.lineWidth = 7;
        const swing = walking ? Math.sin(t * 9) * 5 : 0;
        for (const s of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(s * 5, -40);
          ctx.lineTo(s * 5 + swing * s * -0.4, -4 + (s * swing > 0 ? -3 : 0));
          ctx.stroke();
        }
        // cloak
        ctx.fillStyle = "#2a1608";
        ctx.beginPath();
        ctx.moveTo(-17, -86);
        ctx.quadraticCurveTo(-30 + sway, -44, -26 + sway * 1.6, -3);
        ctx.quadraticCurveTo(0, 6 + sway * 0.4, 26 + sway * 1.6, -3);
        ctx.quadraticCurveTo(30 + sway, -44, 17, -86);
        ctx.quadraticCurveTo(0, -92, -17, -86);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,160,80,0.7)";
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "#ff7a1a";
        ctx.shadowBlur = 8 / fscale + 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,122,26,0.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-26 + sway * 1.6, -5);
        ctx.quadraticCurveTo(0, 5 + sway * 0.4, 26 + sway * 1.6, -5);
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,200,120,0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.lineTo(sway * 0.8, -4);
        ctx.stroke();
        // sleeves
        ctx.strokeStyle = "#2a1608";
        ctx.lineWidth = 7;
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
        // mantle + pointed hood
        ctx.fillStyle = "#1c0f06";
        ctx.beginPath();
        ctx.moveTo(-19, -82);
        ctx.quadraticCurveTo(0, -94, 19, -82);
        ctx.quadraticCurveTo(10, -74, 0, -76);
        ctx.quadraticCurveTo(-10, -74, -19, -82);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-11, -88);
        ctx.quadraticCurveTo(-13, -112, 0, -122);
        ctx.quadraticCurveTo(13, -112, 11, -88);
        ctx.quadraticCurveTo(0, -82, -11, -88);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,170,90,0.85)";
        ctx.lineWidth = lw * 1.2;
        ctx.shadowColor = "#ff7a1a";
        ctx.shadowBlur = 8 / fscale + 3;
        ctx.stroke();
        // floating hourglass sigil
        const pulse = 0.75 + 0.25 * Math.sin(t * 3);
        ctx.shadowColor = "#ffe08a";
        ctx.shadowBlur = 14 / fscale + 5;
        ctx.strokeStyle = `rgba(255,226,140,${0.9 * pulse})`;
        ctx.fillStyle = `rgba(255,214,120,${0.55 * pulse})`;
        ctx.lineWidth = lw * 1.6;
        ctx.beginPath();
        ctx.moveTo(-8, -146);
        ctx.lineTo(8, -146);
        ctx.lineTo(0, -135);
        ctx.lineTo(8, -124);
        ctx.lineTo(-8, -124);
        ctx.lineTo(0, -135);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-5, -126);
        ctx.lineTo(5, -126);
        ctx.lineTo(0, -132);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();

        // glowing hands
        const handGlow = 70 * unit * (0.4 + pkAvg(t));
        for (const hnd of [handL, handR]) {
          const g = ctx.createRadialGradient(hnd.x, hnd.y, 0, hnd.x, hnd.y, handGlow);
          g.addColorStop(0, "rgba(255,240,200,0.95)");
          g.addColorStop(0.3, "rgba(255,190,80,0.55)");
          g.addColorStop(1, "rgba(255,120,30,0)");
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.globalAlpha = fade * Math.max(0.35, armsU);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(hnd.x, hnd.y, handGlow, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // glowing threads held in both hands: they trail behind while walking and
        // stream upward as the arms rise
        if (t < COLLAPSE[0] + 0.4) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.lineCap = "round";
          const held = clamp01((t - 0.6) / 0.8) * fade;
          for (const [hi, hnd] of [handL, handR].entries()) {
            const dir = hi === 0 ? -1 : 1;
            for (let k = 0; k < 7; k++) {
              const wob = Math.sin(t * 3 + k * 1.3 + hi) * 14 * unit;
              const ex = hnd.x + dir * (40 + k * 16) * unit * (1 - armsU * 0.4) + wob;
              const ey = lerp(hnd.y + (90 + k * 14) * unit, hnd.y - (150 + k * 20) * unit, armsU);
              const cx1 = hnd.x + dir * 20 * unit + wob * 0.6;
              const cy1 = lerp(hnd.y + 60 * unit, hnd.y - 60 * unit, armsU);
              ctx.beginPath();
              ctx.moveTo(hnd.x, hnd.y);
              ctx.quadraticCurveTo(cx1, cy1, ex, ey);
              ctx.strokeStyle = rgba(k % 3 === 0 ? MINT : GREEN, held * (0.75 - k * 0.07));
              ctx.lineWidth = (2.4 - k * 0.2) * unit * 1.2;
              ctx.shadowColor = "#ff7a1a";
              ctx.shadowBlur = 12;
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      }

      // ————— magic swirling into the hands —————
      if (armsU > 0.3 && t < COLLAPSE[1]) {
        const build = clamp01((t - ARMS_UP[0] - 0.2) / 1.2);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (const m of motes) {
          const hnd = m.side === 1 ? handR : handL;
          const rad = m.rad * unit * (1.6 - pkAll * 0.9);
          const ang = m.ang + t * m.spin * m.side;
          ctx.globalAlpha = build * (0.35 + 0.5 * ((m.rad % 7) / 7));
          ctx.fillStyle = m.rad % 2 > 1 ? "#fff0c0" : "#ff7a1a";
          ctx.shadowColor = "#ff7a1a";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(hnd.x + Math.cos(ang) * rad, hnd.y + Math.sin(ang) * rad * 0.55, (1.2 + (m.rad % 3)) * unit, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
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

      // ————— whiteout, then it clears into a web of threads —————
      if (t > COLLAPSE[0] + 0.5) {
        const wh = ease(seg(t, [COLLAPSE[0] + 0.5, FLASH + 0.4]));
        ctx.fillStyle = `rgba(255,248,228,${wh})`;
        ctx.fillRect(0, 0, w, h);
      }
      if (t > WEB[0]) {
        const wk = ease(seg(t, WEB));
        const R = Math.max(w, h) * 0.9;
        ctx.save();
        ctx.strokeStyle = `rgba(74,38,12,${0.5 * wk})`;
        for (const l of web) {
          ctx.lineWidth = l.w;
          ctx.beginPath();
          ctx.moveTo(point.x + Math.cos(l.a1) * l.d1 * R * wk, point.y + Math.sin(l.a1) * l.d1 * R * wk * 0.7);
          ctx.lineTo(point.x + Math.cos(l.a2) * l.d2 * R * wk, point.y + Math.sin(l.a2) * l.d2 * R * wk * 0.7);
          ctx.stroke();
        }
        ctx.restore();
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
    <div className="fixed inset-0 z-[260]" role="status" aria-live="polite" aria-label="A variant gathers the threads of the Temporal Loom and restores the timeline">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      {cap >= 0 && (
        <div key={cap} className="pointer-events-none absolute inset-x-0 bottom-[11vh] flex animate-[cap-in_0.9s_ease-out_both] flex-col items-center gap-1 px-6 text-center">
          <div className="font-display text-2xl font-black uppercase tracking-[0.18em] text-text-primary sm:text-4xl" style={{ textShadow: "0 0 30px rgba(255,122,26,0.8)" }}>
            {CAPTIONS[cap][1]}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: "#e8b84a" }}>{CAPTIONS[cap][2]}</div>
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
