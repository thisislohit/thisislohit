"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// plain ASCII only: every glyph exists in the site fonts, so nothing falls back to a wider face
const GLYPHS = "/\\|<>[]{}#%&*+=0123456789";

// Decodes text from noise, like a TVA terminal resolving a record. Runs on
// view (auto) and/or on hover (via the returned wrapper's pointer events).
export function ScrambleText({
  text,
  className = "",
  auto = true,
  delay = 0,
}: {
  text: string;
  className?: string;
  auto?: boolean;
  delay?: number;
}) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const duration = 650 + text.length * 22;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (p < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, [text]);

  useEffect(() => {
    if (!auto || !ref.current) return;
    const el = ref.current;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(run, delay);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame.current);
    };
  }, [auto, delay, run]);

  return (
    // The final text reserves the width (invisible); the scramble is drawn on
    // top of it, so decoding never changes the layout or moves a click target.
    <span ref={ref} className={`relative inline-block ${className}`} onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible whitespace-nowrap">{text}</span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">{out}</span>
    </span>
  );
}
