"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TVAEmblem } from "./TVAEmblem";

export const BOOT_KEY = "tva-booted";

const LINES = [
  "TVA // TIME VARIANCE AUTHORITY — TEMPAD OS v6.16",
  "SCANNING SACRED TIMELINE ............ OK",
  "NEXUS EVENT DETECTED // BRANCH 616",
  "VARIANT IDENTIFIED: LOHIT  [ALIAS: GOD OF MOBILE STORIES]",
  "THREAT ASSESSMENT: PRODUCTION-GRADE FLUTTER",
  "RECOMMENDED ACTION: DO NOT PRUNE.",
  "OPENING TIME DOOR ...",
];

// First-visit intro (once per session): a TVA terminal boots, identifies the
// variant, then the Time Door splits open onto the site. Enabled by the
// <head> script in layout.tsx setting html[data-boot="play"] before paint.
export function BootSequence() {
  // "init" renders the same markup as the server (CSS hides it unless the
  // head script flagged a first visit), so hydration never mismatches.
  const [phase, setPhase] = useState<"init" | "play" | "off">("init");
  const [shown, setShown] = useState(0);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only sync with a browser-only value
    setPhase(document.documentElement.dataset.boot === "play" ? "play" : "off");
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {}
    delete document.documentElement.dataset.boot;
    setPhase("off");
  };

  useEffect(() => {
    if (phase !== "play") return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), 350 + i * 430)));
    timers.push(setTimeout(() => setOpening(true), 350 + LINES.length * 430 + 250));
    timers.push(setTimeout(finish, 350 + LINES.length * 430 + 250 + 1400));
    const key = () => {
      setOpening(true);
      setTimeout(finish, 900);
    };
    window.addEventListener("keydown", key, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", key);
    };
  }, [phase]);

  return (
    <>
      {phase !== "off" && (
        <div
          className="boot-overlay fixed inset-0 z-[200] items-center justify-center overflow-hidden"
          role="dialog"
          aria-label="TVA boot sequence"
        >
          {/* Time Door panels */}
          {(["left", "right"] as const).map((side) => (
            <motion.div
              key={side}
              className={`absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-1/2 bg-[#120a05]`}
              animate={{ x: opening ? (side === "left" ? "-101%" : "101%") : 0 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className={`absolute inset-y-0 ${side === "left" ? "right-0" : "left-0"} w-1 bg-accent-primary shadow-[0_0_40px_10px_rgba(255,122,26,0.8)]`} />
            </motion.div>
          ))}
          {/* Light spilling through the opening door */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 w-[60vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,170,90,0.9),rgba(255,122,26,0.5)_35%,transparent_70%)]"
            initial={{ opacity: 0, scaleX: 0.05 }}
            animate={{ opacity: opening ? [0, 1, 0] : 0, scaleX: opening ? 1 : 0.05 }}
            transition={{ duration: 1.3 }}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-2xl flex-col gap-6 px-6"
            animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-5 text-accent-primary">
              <TVAEmblem size={84} />
              <div>
                <div className="font-display text-2xl font-black uppercase tracking-tight text-text-primary">Time Variance Authority</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Secure terminal · Clearance: Visitor</div>
              </div>
            </div>
            <div className="min-h-[13rem] border-l-2 border-accent-primary/60 pl-4 font-mono text-[12px] leading-relaxed text-crt sm:text-sm">
              {LINES.slice(0, shown).map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === 3 ? "text-accent-utility" : i === 5 ? "font-bold text-accent-primary" : ""}
                >
                  <span className="text-text-muted">&gt; </span>
                  {l}
                </motion.div>
              ))}
              <span className="animate-caret inline-block h-3.5 w-2 bg-crt align-middle" />
            </div>
            <div className="h-1.5 w-full overflow-hidden bg-surface-elevated">
              <motion.div
                className="h-full bg-accent-primary shadow-[0_0_12px_rgba(255,122,26,0.9)]"
                animate={{ width: `${(shown / LINES.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <button
              onClick={() => {
                setOpening(true);
                setTimeout(finish, 900);
              }}
              className="self-start font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted underline decoration-dotted hover:text-accent-primary"
            >
              Skip · press any key
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
