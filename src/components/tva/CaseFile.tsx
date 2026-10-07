"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { Stamp } from "./Stamp";
import { ScrambleText } from "./ScrambleText";
import type { Project } from "@/data/projects";

// A single project, presented as a manila-folder case file.
export function CaseFile({ project, index }: { project: Project; index: number }) {
  const href = project.liveUrl ?? project.repoUrl;
  const num = String(index + 1).padStart(3, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 70, rotate: index % 2 ? 1.2 : -1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="group relative pt-8"
    >
      {/* folder tab */}
      <div className="absolute left-6 top-0 z-10 flex items-center gap-3 rounded-t-lg border-2 border-b-0 border-ink bg-paper-dark px-5 py-1.5 font-display text-[11px] font-black uppercase tracking-[0.2em] text-ink">
        <span>Case #{num}</span>
        <span className="text-accent-primary">◆</span>
        <span className="text-ink/60">Branch {String(index + 1).padStart(2, "0")}</span>
      </div>

      <TiltCard maxTilt={2.5}>
        <div className="tva-paper grid gap-8 overflow-hidden border-2 border-ink p-6 lg:grid-cols-12 lg:p-10">
          {/* giant ghost number */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[16rem] font-black leading-none text-ink/[0.06] transition-transform duration-700 group-hover:-translate-x-3 group-hover:text-accent-primary/15"
          >
            {index + 1}
          </div>

          <div className="relative flex flex-col gap-5 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">
              <span className="border border-ink/60 px-2 py-0.5">{project.category}</span>
              <span className="text-ink/70">
                <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-[#2f9e7a]" />
                Status: nominal
              </span>
            </div>
            <h3 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {project.name}
            </h3>
            <p className="max-w-xl font-typed text-[15px] leading-relaxed text-ink/85">{project.description}</p>

            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="OPEN"
                className="inline-flex items-center gap-1.5 self-start border-b-2 border-ink font-display text-xs font-black uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent-primary hover:text-accent-primary"
              >
                <ScrambleText text="Access reality logs" auto={false} />
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          <div className="relative flex flex-col gap-5 lg:col-span-5">
            <div className="flex justify-end">
              {project.featured ? (
                <Stamp rotate={6} tone="red" delay={0.5}>
                  ★ Primary reality
                </Stamp>
              ) : (
                <Stamp rotate={-4} tone="ink" delay={0.5}>
                  Open source
                </Stamp>
              )}
            </div>
            <div>
              <div className="mb-2 flex items-center gap-1.5 font-display text-[10px] font-black uppercase tracking-[0.25em] text-ink/60">
                <Cpu size={12} /> Engineering notes
              </div>
              <ul className="space-y-1.5 font-typed text-[13px] text-ink">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    className="flex gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span aria-hidden="true" className="font-black text-accent-primary">☒</span>
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative flex flex-wrap items-center gap-2 border-t-2 border-dashed border-ink/40 pt-5 lg:col-span-12">
            <span className="mr-1 font-display text-[10px] font-black uppercase tracking-[0.25em] text-ink/60">Stack</span>
            {project.stack.map((t) => (
              <span
                key={t}
                className="border border-ink bg-ink px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-paper transition-colors group-hover:bg-accent-primary group-hover:text-on-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}
