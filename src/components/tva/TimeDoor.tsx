"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RiveSlot } from "./RiveSlot";

// The Time Door: two panels slide apart on an arched frame to flood the
// archway with orange light. Opens by itself on scroll-in; click toggles.
export function TimeDoor({ open, onToggle }: { open: boolean; onToggle: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const tried = useRef(false);

  useEffect(() => {
    if (!inView || tried.current) return;
    tried.current = true;
    const t = setTimeout(() => onToggle(true), 700);
    return () => clearTimeout(t);
  }, [inView, onToggle]);

  const panel = (side: "l" | "r") => (
    <motion.div
      className={`absolute inset-y-0 ${side === "l" ? "left-0 border-r" : "right-0 border-l"} w-1/2 border-ink bg-gradient-to-b from-[#3a2414] to-[#23140a]`}
      animate={{ x: open ? (side === "l" ? "-96%" : "96%") : 0 }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* rivets + panel detail */}
      <div className="absolute inset-3 border border-accent-primary/30" />
      {[18, 50, 82].map((t) => (
        <span key={t} className={`absolute h-1.5 w-1.5 rounded-full bg-accent-utility/70 ${side === "l" ? "right-5" : "left-5"}`} style={{ top: `${t}%` }} />
      ))}
      <div className={`absolute top-1/2 h-20 w-1.5 -translate-y-1/2 rounded bg-accent-utility/60 ${side === "l" ? "right-2" : "left-2"}`} />
    </motion.div>
  );

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[22rem]">
      <RiveSlot
        src="/rive/time-door.riv"
        stateMachine="Main"
        inputs={{ open }}
        className="aspect-[3/4] w-full"
        fallback={
          <button
            onClick={() => onToggle(!open)}
            data-cursor={open ? "CLOSE" : "OPEN"}
            aria-pressed={open}
            aria-label={open ? "Close the Time Door" : "Open the Time Door"}
            className="relative block aspect-[3/4] w-full overflow-hidden rounded-t-[999px] border-[6px] border-accent-primary bg-[#1c110a] shadow-[0_0_60px_-10px_rgba(255,122,26,0.7)]"
          >
            {/* light beyond the door */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,#fff1d0_0%,#ffb25e_30%,#ff7a1a_60%,#7a2e00_100%)]"
              animate={{ opacity: open ? 1 : 0.25, scale: open ? [1, 1.06, 1] : 1 }}
              transition={{ opacity: { duration: 1.2 }, scale: { repeat: Infinity, duration: 4 } }}
            />
            {open && (
              <svg aria-hidden="true" viewBox="0 0 100 130" className="absolute inset-0 h-full w-full">
                {Array.from({ length: 14 }, (_, i) => (
                  <motion.line
                    key={i}
                    x1="50" y1="78" x2={50 + Math.cos((i / 14) * Math.PI * 2) * 90} y2={78 + Math.sin((i / 14) * Math.PI * 2) * 90}
                    stroke="#fff1d0" strokeWidth="0.6" strokeOpacity="0.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 + i * 0.03, duration: 1 }}
                  />
                ))}
              </svg>
            )}
            {panel("l")}
            {panel("r")}
          </button>
        }
      />
      <div className="mt-4 text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
        {open ? "● Time door open" : "○ Time door sealed"}
      </div>
    </div>
  );
}
