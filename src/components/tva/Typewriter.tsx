"use client";

import { useEffect, useRef } from "react";

// Types text by writing to the DOM node directly: no React state, so a
// 20 ms-per-character typewriter costs zero re-renders.
export function Typewriter({
  text,
  speed = 28,
  onDone,
  caret = true,
  className = "",
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
  caret?: boolean;
  className?: string;
}) {
  const node = useRef<HTMLSpanElement>(null);
  const done = useRef(onDone);

  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    let n = 0;
    el.textContent = "";
    const id = setInterval(() => {
      n++;
      el.textContent = text.slice(0, n);
      if (n >= text.length) {
        clearInterval(id);
        done.current?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={node} aria-hidden="true" />
      {caret && <span className="animate-caret ml-0.5 inline-block w-[0.55em] bg-current align-middle">&nbsp;</span>}
    </span>
  );
}
