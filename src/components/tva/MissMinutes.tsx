"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { X } from "lucide-react";
import { RiveSlot } from "./RiveSlot";
import { Typewriter } from "./Typewriter";
import { SECTIONS, useActiveSection } from "@/lib/useActiveSection";

const LINES: Record<string, string[]> = {
  file: [
    "That's the Variant File — everything the TVA knows about this variant, nicely summarised.",
  ],
  hero: [
    "Well hello, valued visitor! I'm Miss Minutes, your TVA guide. This variant's file is now open.",
    "Fun fact: this variant has never once needed pruning.",
  ],
  work: [
    "These are the Case Files. Every branch here shipped to production. Hover one — they like attention.",
    "Stripe Tap-to-Pay across Android and iOS? Filed under 'handled'.",
  ],
  experience: [
    "The Incident Log! Three years of timeline-safe Flutter, in strict chronological order.",
    "Follow the glowing thread. It's the Sacred Timeline. Please don't cut it.",
  ],
  skills: [
    "The Temporal Loom — every capability, woven. Hover a tile to decode it.",
    "BLoC, Hive, Stripe, Fastlane… that's a lot of threads for one variant!",
  ],
  contact: [
    "You've reached the Time Door. Open it and say hello — the TVA strongly encourages hiring this variant.",
    "Psst — try pressing G then H anywhere to jump home.",
  ],
};

function Face({ look }: { look: { x: ReturnType<typeof useSpring>; y: ReturnType<typeof useSpring> } }) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        loop();
      }, 2200 + Math.random() * 3200);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" aria-hidden="true">
      {/* bells */}
      <circle cx="36" cy="16" r="9" fill="#ffb347" stroke="#7a2e00" strokeWidth="3" />
      <circle cx="84" cy="16" r="9" fill="#ffb347" stroke="#7a2e00" strokeWidth="3" />
      {/* body */}
      <circle cx="60" cy="64" r="48" fill="#ff7a1a" stroke="#7a2e00" strokeWidth="4" />
      <circle cx="60" cy="64" r="38" fill="#ffd9a0" stroke="#7a2e00" strokeWidth="2" />
      {/* tick marks */}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="60" y1="29" x2="60" y2={i % 3 === 0 ? 35 : 32} stroke="#7a2e00" strokeWidth="2" transform={`rotate(${i * 30} 60 64)`} />
      ))}
      {/* forehead clock hands */}
      <line x1="60" y1="44" x2="60" y2="38" stroke="#7a2e00" strokeWidth="2.5" strokeLinecap="round" />
      <motion.line
        x1="60" y1="44" x2="68" y2="44" stroke="#7a2e00" strokeWidth="2.5" strokeLinecap="round"
        style={{ originX: "60px", originY: "44px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />
      {/* eyes */}
      {[46, 74].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="62" rx="9" ry={blink ? 1.2 : 11} fill="#fff" stroke="#7a2e00" strokeWidth="2.5" />
          {!blink && (
            <motion.g style={{ x: look.x, y: look.y }}>
              <circle cx={cx} cy="62" r="5" fill="#2a1608" />
              <circle cx={cx + 1.8} cy="59.5" r="1.8" fill="#fff" />
            </motion.g>
          )}
        </g>
      ))}
      {/* cheeks + smile */}
      <circle cx="34" cy="78" r="5" fill="#ff8f5a" opacity="0.6" />
      <circle cx="86" cy="78" r="5" fill="#ff8f5a" opacity="0.6" />
      <path d="M44 80 Q60 96 76 80" fill="#fff" stroke="#7a2e00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MissMinutes() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pick, setPick] = useState({ id: "", i: 0 });
  const idx = pick.id === active ? pick.i : 0;
  const lx = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const ly = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 });
  const btn = useRef<HTMLButtonElement>(null);
  const [look, setLook] = useState({ lookX: 0, lookY: 0 });

  // Eyes follow the pointer.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const r = btn.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 220);
      lx.set((dx / d) * 3.6 * k);
      ly.set((dy / d) * 4.2 * k);
      setLook({ lookX: (dx / d) * k, lookY: (dy / d) * k });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [lx, ly]);

  // Pop a fresh message when the visitor enters a new section.
  useEffect(() => {
    if (dismissed) return;
    const show = setTimeout(() => setOpen(true), 700);
    const hide = setTimeout(() => setOpen(false), 8500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [active, dismissed]);

  const lines = LINES[active] ?? LINES.hero;
  const line = lines[idx % lines.length];

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[55] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key={active + idx}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            role="status"
            className="tva-paper pointer-events-auto relative max-w-[17rem] rounded-xl rounded-br-sm border-2 border-ink p-4 text-[13px] leading-snug"
          >
            <button
              onClick={() => {
                setOpen(false);
                setDismissed(true);
              }}
              aria-label="Dismiss Miss Minutes"
              className="absolute right-1.5 top-1.5 p-1 text-ink/60 hover:text-ink"
            >
              <X size={12} />
            </button>
            <div className="mb-1 font-display text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary">
              Miss Minutes · TVA Guide
            </div>
            <Typewriter text={line} speed={18} caret={false} className="font-typed" />
            <button
              onClick={() => setPick({ id: active, i: idx + 1 })}
              className="mt-2 block font-display text-[10px] font-bold uppercase tracking-widest text-ink/70 underline decoration-dotted hover:text-accent-primary"
            >
              Next ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={btn}
        onClick={() => {
          setDismissed(false);
          setOpen((v) => !v);
        }}
        aria-label="Talk to Miss Minutes"
        aria-expanded={open}
        data-cursor="HI!"
        whileHover={{ scale: 1.1, rotate: [0, -6, 6, -4, 0] }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { repeat: Infinity, duration: 3.2, ease: "easeInOut" }, scale: { type: "spring" }, rotate: { duration: 0.5 } }}
        className="pointer-events-auto h-16 w-16 drop-shadow-[0_8px_18px_rgba(255,122,26,0.45)] sm:h-20 sm:w-20"
      >
        <RiveSlot
          src="/rive/miss-minutes.riv"
          stateMachine="Main"
          inputs={{ ...look, talk: open }}
          fallback={<Face look={{ x: lx, y: ly }} />}
        />
      </motion.button>
    </div>
  );
}

