"use client";

import { useEffect, useState } from "react";

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
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  useEffect(() => {
    if (n === text.length && n > 0) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, text.length]);

  return (
    <span className={className}>
      {text.slice(0, n)}
      {caret && <span className="animate-caret ml-0.5 inline-block w-[0.55em] bg-current align-middle">&nbsp;</span>}
    </span>
  );
}
