"use client";

import { useEffect, useRef, useState } from "react";

// Targeting-reticle cursor. Fine pointers only; touch devices keep the OS cursor.
//
// Built for zero lag: the dot's transform is written straight to the DOM from
// the raw pointer event (no React, no animation library, no rAF in between),
// and the ring trails it with a light lerp in a rAF loop that sleeps whenever
// the ring has caught up. It sits above everything (cards, overlays, the boot
// screen), so it is never hidden under a popup.
const INTERACTIVE = 'a,button,[role="tab"],[data-cursor]';

export function TVACursor() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only sync with a browser-only value
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const d = dot.current;
    const r = ring.current;
    const l = label.current;
    if (!d || !r || !l) return;
    document.documentElement.classList.add("tva-cursor");

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const follow = calm ? 1 : 0.42; // 1 = glued to the pointer, lower = more trail
    let tx = -100, ty = -100; // pointer
    let rx = -100, ry = -100; // ring
    let s = 1, ts = 1, rot = 0, trot = 0;
    let hot = false, down = false, seen = false, raf = 0;

    const paintRing = () => {
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${s}) rotate(${rot}deg)`;
    };
    const loop = () => {
      rx += (tx - rx) * follow;
      ry += (ty - ry) * follow;
      s += (ts - s) * 0.3;
      rot += (trot - rot) * 0.3;
      paintRing();
      const settled = Math.abs(tx - rx) + Math.abs(ty - ry) + Math.abs(ts - s) + Math.abs(trot - rot) < 0.05;
      raf = settled ? 0 : requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const shape = () => {
      ts = down ? 0.7 : hot ? 1.9 : 1;
      trot = hot ? 45 : 0;
      r.dataset.hot = hot ? "1" : "0";
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      d.style.transform = `translate3d(${tx}px, ${ty}px, 0)`; // instant: no frame of lag
      if (!seen) {
        seen = true;
        rx = tx;
        ry = ty;
        d.style.opacity = r.style.opacity = "1";
      }
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(INTERACTIVE);
      const nowHot = !!el;
      if (nowHot !== hot) {
        hot = nowHot;
        shape();
      }
      const text = el?.dataset.cursor ?? "";
      if (l.textContent !== text) l.textContent = text;
      wake();
    };
    const press = (v: boolean) => () => {
      down = v;
      shape();
      wake();
    };
    const dn = press(true);
    const up = press(false);
    const leave = () => {
      d.style.opacity = r.style.opacity = "0";
      seen = false;
    };

    // pointerrawupdate fires ahead of the frame (lowest latency); fall back to pointermove
    const moveEvent = "onpointerrawupdate" in window ? "pointerrawupdate" : "pointermove";
    window.addEventListener(moveEvent, move as EventListener, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.documentElement.classList.remove("tva-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener(moveEvent, move as EventListener);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        data-hot="0"
        style={{ opacity: 0, transform: "translate3d(-100px, -100px, 0)" }}
        className="pointer-events-none fixed left-0 top-0 z-[1000] -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent-primary transition-[border-radius,opacity] duration-200 will-change-transform data-[hot=1]:rounded-[4px]"
      />
      <div
        ref={dot}
        aria-hidden="true"
        style={{ opacity: 0, transform: "translate3d(-100px, -100px, 0)" }}
        className="pointer-events-none fixed left-0 top-0 z-[1000] will-change-transform"
      >
        <span className="absolute -left-[3px] -top-[3px] block h-1.5 w-1.5 rounded-full bg-accent-utility" />
        <span
          ref={label}
          className="absolute left-5 top-3 whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-widest text-accent-primary"
        />
      </div>
    </>
  );
}
