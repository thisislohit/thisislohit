"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { SECTIONS, useActiveSection } from "@/lib/useActiveSection";

// The Sacred Timeline: a thread that fills as you scroll, with a node per
// section. Desktop = left rail. Every size also gets a thin top progress bar.
export function SacredTimelineRail() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const pct = useTransform(smooth, (v) => String(Math.round(v * 100)).padStart(3, "0"));
  const onHome = usePathname() === "/";

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[56] h-[3px] origin-left bg-gradient-to-r from-accent-primary via-accent-utility to-accent-primary"
        style={{ scaleX: smooth, boxShadow: "0 0 12px rgba(255,122,26,0.9)" }}
      />

      {onHome && (
        <aside
          aria-label="Sacred Timeline"
          className="pointer-events-none fixed bottom-0 left-5 top-0 z-40 hidden items-center xl:flex"
        >
          <div className="relative flex h-[56vh] flex-col justify-between">
            <div className="absolute bottom-0 left-[5px] top-0 w-px bg-border" />
            <motion.div
              className="absolute left-[4px] top-0 w-[3px] origin-top bg-gradient-to-b from-accent-primary to-accent-utility"
              style={{ scaleY: smooth, height: "100%", boxShadow: "0 0 14px rgba(255,122,26,0.9)" }}
            />
            {SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`/#${s.id}`}
                  data-cursor={s.label}
                  className="pointer-events-auto group relative flex items-center gap-3"
                >
                  <motion.span
                    animate={{ scale: on ? 1.5 : 1, backgroundColor: on ? "#ff7a1a" : "#1c110a" }}
                    className="relative z-10 block h-[11px] w-[11px] rounded-full border-2 border-accent-primary"
                    style={{ boxShadow: on ? "0 0 14px 3px rgba(255,122,26,0.8)" : "none" }}
                  >
                    {on && <span className="absolute inset-0 animate-ping rounded-full bg-accent-primary" />}
                  </motion.span>
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                      on ? "translate-x-0 text-accent-primary opacity-100" : "-translate-x-1 text-text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  >
                    {s.code} {s.label}
                  </span>
                </a>
              );
            })}
            <div className="absolute -bottom-9 left-0 font-mono text-[9px] tracking-widest text-text-muted">
              <motion.span>{pct}</motion.span>% INTEGRITY
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
