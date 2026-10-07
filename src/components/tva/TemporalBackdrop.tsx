"use client";

import { useEffect, useRef } from "react";

// Fixed full-screen atmosphere: drifting time-embers on a canvas that part
// around the cursor, plus CRT scanlines, vignette, film grain and a warm glow.
export function TemporalBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };
    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; gold: boolean };
    let ps: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.floor((w * h) / 18000));
      ps = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (anywhere = false): P => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.35 + 0.08),
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.6 + 0.2,
      gold: Math.random() > 0.65,
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / 118) * 1.6;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
        p.x += p.vx + Math.sin((p.y + p.x) * 0.01) * 0.12;
        p.y += p.vy;
        if (p.y < -10) Object.assign(p, spawn());
        ctx.beginPath();
        ctx.fillStyle = p.gold ? `rgba(232,184,74,${p.a})` : `rgba(255,122,26,${p.a})`;
        ctx.shadowColor = p.gold ? "rgba(232,184,74,0.9)" : "rgba(255,122,26,0.9)";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", vis);
    if (!reduce) raf = requestAnimationFrame(draw);
    else draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,122,26,0.18),transparent_65%)]" />
      <div className="absolute bottom-0 left-0 h-[50vh] w-[60vw] bg-[radial-gradient(ellipse_at_0%_100%,rgba(232,184,74,0.08),transparent_70%)]" />
      <canvas ref={ref} className="absolute inset-0" />
      <div className="tva-scanlines absolute inset-0" />
      <div className="tva-vignette absolute inset-0" />
      <div className="tva-grain" />
    </div>
  );
}
