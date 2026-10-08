"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience } from "@/data/experience";

// Three roles on a mini thread. Tap one to read what was shipped.
export function ExperiencePanel() {
  const [open, setOpen] = useState(0);

  return (
    <div className="relative pl-7">
      <div className="absolute bottom-2 left-[9px] top-2 w-px bg-border" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute left-[8px] top-2 w-[3px] origin-top bg-gradient-to-b from-accent-primary to-accent-utility"
        style={{ height: "calc(100% - 1rem)", boxShadow: "0 0 12px rgba(255,122,26,0.9)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      />
      <ol className="flex flex-col gap-3">
      {experience.map((e, i) => {
        const live = e.endDate === "Present";
        const on = open === i;
        return (
          <li key={e.company + e.startDate} className="relative">
            <span className={`absolute -left-[26px] top-4 h-3.5 w-3.5 rounded-full border-[3px] ${live ? "border-error bg-error shadow-[0_0_14px_3px_rgba(229,57,43,0.7)]" : "border-accent-primary bg-background"}`}>
              {live && <span className="absolute inset-0 animate-ping rounded-full bg-error" />}
            </span>
            <button
              onClick={() => setOpen(on ? -1 : i)}
              aria-expanded={on}
              className={`w-full border p-4 text-left transition-colors ${on ? "border-accent-primary/70 bg-accent-primary/5" : "border-border hover:border-accent-primary/50"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-display text-lg font-black uppercase leading-tight text-text-primary">
                  {e.role} <span className="text-accent-utility">· {e.company}</span>
                </span>
                <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${live ? "text-error-text" : "text-text-muted"}`}>
                  {e.startDate} → {e.endDate}
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-primary">Incident · {e.project}</div>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="mt-3 font-mono text-[13px] leading-relaxed text-text-secondary">{e.impact}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {e.tags.map((t) => (
                        <span key={t} className="border border-accent-primary/40 bg-accent-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-primary-text">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </li>
        );
      })}
      </ol>
    </div>
  );
}
