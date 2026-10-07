"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "./ScrambleText";
import type { SkillGroup } from "@/data/skills";

// Capability matrix drawn as a loom: animated threads run behind the tiles.
export function LoomGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="relative">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M-20 ${60 + i * 110} C 250 ${i % 2 ? -40 + i * 110 : 160 + i * 110}, 700 ${i % 2 ? 160 + i * 110 : -40 + i * 110}, 1020 ${60 + i * 110}`}
            fill="none"
            stroke={i % 3 === 0 ? "#e8b84a" : "#ff7a1a"}
            strokeOpacity={i % 3 === 0 ? 0.35 : 0.22}
            strokeWidth="1.4"
            strokeDasharray="14 10"
            className="animate-thread-flow"
            style={{ animationDuration: `${5 + i}s` }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.category}
            initial={{ opacity: 0, y: 50, rotateX: -18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.19, 1, 0.22, 1] }}
            whileHover={{ y: -6 }}
            style={{ transformPerspective: 900 }}
            className={`tva-panel group relative flex flex-col gap-4 p-6 ${i === 0 ? "lg:col-span-2" : ""}`}
          >
            <span className="pointer-events-none absolute -bottom-3 right-3 font-display text-8xl font-black leading-none text-accent-primary/[0.07] transition-colors group-hover:text-accent-primary/20">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative font-display text-2xl font-black uppercase leading-tight text-text-primary">
              <ScrambleText text={g.category} auto={false} />
            </h3>
            <p className="relative font-mono text-xs leading-relaxed text-text-muted">{g.description}</p>
            <div className="relative mt-auto flex flex-wrap gap-2 pt-2">
              {g.skills.map((s) => (
                <span
                  key={s}
                  className="border border-accent-utility/40 bg-accent-utility/10 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent-utility transition-colors hover:bg-accent-utility hover:text-on-accent-utility"
                >
                  <ScrambleText text={s} auto={false} />
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
