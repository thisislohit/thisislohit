"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Stamp } from "@/components/tva/Stamp";
import { projects } from "@/data/projects";

const list = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

// One case file at a time. The full description and stack are a tap away.
export function WorkPanel() {
  const [[i, dir], setPage] = useState<[number, number]>([0, 0]);
  const [more, setMore] = useState(false);
  const p = list[i];
  const href = p.liveUrl ?? p.repoUrl;

  const step = (d: number) => {
    setMore(false);
    setPage([(i + d + list.length) % list.length, d]);
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.article
            key={i}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 60, rotate: d * 1.5 }),
              center: { opacity: 1, x: 0, rotate: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -60, rotate: d * -1.5 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) step(1);
              else if (info.offset.x > 70) step(-1);
            }}
            className="tva-paper flex flex-col gap-3 border-2 border-ink p-5"
          >
            <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/70">
              <span>
                Case #{String(i + 1).padStart(3, "0")} · {p.category}
              </span>
              {p.featured && (
                <Stamp rotate={4} tone="red" delay={0.2} className="!px-2 !py-0.5 !text-[10px]">
                  ★ Primary
                </Stamp>
              )}
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-4xl">{p.name}</h3>
            <p className={`font-typed text-[14px] leading-relaxed text-ink/85 ${more ? "" : "line-clamp-2"}`}>{p.description}</p>
            <ul className="flex flex-wrap gap-1.5 font-typed text-[12px] text-ink">
              {p.highlights.slice(0, more ? undefined : 3).map((h) => (
                <li key={h} className="border border-ink/50 px-2 py-0.5">☒ {h}</li>
              ))}
            </ul>
            <AnimatePresence initial={false}>
              {more && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="flex flex-wrap gap-1.5 border-t-2 border-dashed border-ink/40 pt-3">
                    {p.stack.map((t) => (
                      <span key={t} className="bg-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-paper">{t}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center justify-between gap-3">
              <button onClick={() => setMore((v) => !v)} aria-expanded={more} className="inline-flex items-center gap-1 font-display text-[11px] font-black uppercase tracking-[0.2em] text-ink hover:text-accent-primary">
                {more ? "Close file" : "Open full file"}
                <ChevronDown size={14} className={`transition-transform ${more ? "rotate-180" : ""}`} />
              </button>
              {href && (
                <a href={href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-display text-[11px] font-black uppercase tracking-[0.2em] text-ink hover:text-accent-primary">
                  Visit <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => step(-1)} aria-label="Previous case" className="flex h-9 w-9 items-center justify-center border border-border text-accent-primary hover:bg-accent-primary hover:text-on-primary">
          <ArrowLeft size={16} />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Case files">
          {list.map((c, n) => (
            <button
              key={c.name}
              role="tab"
              aria-selected={n === i}
              aria-label={c.name}
              onClick={() => setPage([n, n > i ? 1 : -1])}
              className={`h-2 transition-all ${n === i ? "w-8 bg-accent-primary shadow-[0_0_10px_rgba(255,122,26,0.9)]" : "w-2 bg-border hover:bg-accent-primary/60"}`}
            />
          ))}
        </div>
        <button onClick={() => step(1)} aria-label="Next case" className="flex h-9 w-9 items-center justify-center border border-border text-accent-primary hover:bg-accent-primary hover:text-on-primary">
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
