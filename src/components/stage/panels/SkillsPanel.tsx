"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { ScrambleText } from "@/components/tva/ScrambleText";

// Seven threads of the Loom; pick one to see what it is made of.
export function SkillsPanel() {
  const [i, setI] = useState(0);
  const g = skillGroups[i];

  return (
    <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
      <div role="tablist" aria-label="Skill categories" className="flex gap-2 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible">
        {skillGroups.map((s, n) => (
          <button
            key={s.category}
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`shrink-0 border px-3 py-2 text-left font-display text-[13px] font-black uppercase tracking-wide transition-colors ${
              n === i ? "border-accent-primary bg-accent-primary text-on-primary" : "border-border text-text-secondary hover:border-accent-primary/60 hover:text-accent-primary"
            }`}
          >
            <span className="mr-2 font-mono text-[10px]">{String(n + 1).padStart(2, "0")}</span>
            {s.category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={g.category}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-4"
        >
          <h3 className="font-display text-2xl font-black uppercase text-text-primary">
            <ScrambleText text={g.category} />
          </h3>
          <p className="font-mono text-[13px] leading-relaxed text-text-secondary">{g.description}</p>
          <div className="flex flex-wrap gap-2">
            {g.skills.map((s, n) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * n, type: "spring", stiffness: 300, damping: 18 }}
                className="border border-accent-utility/50 bg-accent-utility/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-accent-utility"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
