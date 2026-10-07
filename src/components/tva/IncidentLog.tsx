"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ExperienceEntry } from "@/data/experience";

// Chronology as a vertical Sacred Timeline that fills as you scroll past it.
export function IncidentLog({ entries }: { entries: ExperienceEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-14">
      <div className="absolute bottom-0 left-[11px] top-0 w-px bg-border sm:left-[19px]" />
      <motion.div
        className="absolute left-[10px] top-0 w-[3px] origin-top bg-gradient-to-b from-accent-primary via-accent-utility to-accent-primary sm:left-[18px]"
        style={{ scaleY: fill, height: "100%", boxShadow: "0 0 18px rgba(255,122,26,0.9)" }}
      />

      <div className="flex flex-col gap-14">
        {entries.map((e, i) => {
          const live = e.endDate === "Present";
          return (
            <motion.article
              key={e.company + e.startDate}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="relative"
            >
              {/* node on the thread */}
              <span
                className={`absolute -left-[31px] top-7 z-10 block h-4 w-4 rounded-full border-[3px] sm:-left-[45px] ${
                  live ? "border-error bg-error shadow-[0_0_18px_4px_rgba(229,57,43,0.7)]" : "border-accent-primary bg-background shadow-[0_0_14px_rgba(255,122,26,0.8)]"
                }`}
              >
                {live && <span className="absolute inset-0 animate-ping rounded-full bg-error" />}
              </span>

              <div className="tva-panel p-6 sm:p-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-accent-primary">
                    Incident #{String(entries.length - i).padStart(3, "0")} · {e.project}
                  </span>
                  <span className={live ? "text-error" : "text-text-muted"}>
                    {e.startDate} → {e.endDate}
                    {live && <span className="ml-2 animate-flicker">● ongoing</span>}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-primary sm:text-4xl">
                  {e.role}
                </h3>
                <p className="mt-1 font-display text-lg font-bold uppercase text-accent-utility">{e.company}</p>
                <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-text-secondary">{e.impact}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t, ti) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + ti * 0.04 }}
                      className="border border-accent-primary/40 bg-accent-primary/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-accent-primary-text"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}

        {/* the unwritten next node */}
        <motion.a
          href="/#contact"
          data-cursor="WRITE IT"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="group relative block"
        >
          <span className="absolute -left-[31px] top-5 z-10 block h-4 w-4 rounded-full border-[3px] border-dashed border-accent-utility bg-background sm:-left-[45px]" />
          <div className="flex items-center justify-between gap-4 border-2 border-dashed border-accent-utility/50 p-6 transition-colors group-hover:border-accent-utility group-hover:bg-accent-utility/5">
            <div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-accent-utility">Next node · unwritten</div>
              <div className="mt-1 font-display text-2xl font-black uppercase text-text-primary">Your timeline, here?</div>
            </div>
            <ArrowUpRight className="text-accent-utility transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </motion.a>
      </div>
    </div>
  );
}
