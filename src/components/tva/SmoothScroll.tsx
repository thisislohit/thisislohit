"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Buttery inertial scrolling for the whole site. Skipped entirely for
// reduced-motion users so native scrolling (and anchor jumps) stay instant.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // In-page anchors (#work etc.) glide through Lenis instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href");
      if (!a || !href) return;
      const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : null;
      if (!hash || hash.length < 2 || window.location.pathname !== "/") return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.6 });
        history.replaceState(null, "", hash);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
