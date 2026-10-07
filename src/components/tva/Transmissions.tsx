"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TimeDoor } from "./TimeDoor";
import { ScrambleText } from "./ScrambleText";

export interface Transmission {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
}

export function Transmissions({ items }: { items: Transmission[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <TimeDoor open={open} onToggle={setOpen} />
      </div>

      <div className="flex flex-col gap-3 lg:col-span-7">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.ul
              key="open"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
              className="flex flex-col gap-3"
            >
              {items.map((it) => {
                const inner = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent-primary/50 text-accent-primary">{it.icon}</span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">{it.label}</span>
                      <span className="truncate font-display text-lg font-extrabold uppercase text-text-primary group-hover:text-accent-primary sm:text-xl">
                        <ScrambleText text={it.value} auto={false} />
                      </span>
                    </span>
                    {it.href && <ArrowUpRight className="ml-auto shrink-0 text-accent-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />}
                  </>
                );
                const cls = "tva-panel group flex items-center gap-4 p-4";
                return (
                  <motion.li
                    key={it.label}
                    variants={{ hidden: { opacity: 0, x: 80, scale: 0.96 }, show: { opacity: 1, x: 0, scale: 1 } }}
                    transition={{ type: "spring", stiffness: 140, damping: 18 }}
                  >
                    {it.href ? (
                      <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener" data-cursor="TRANSMIT" className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          ) : (
            <motion.button
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(true)}
              data-cursor="OPEN"
              className="self-start border-2 border-dashed border-accent-primary/60 p-8 text-left font-display text-3xl font-black uppercase text-text-muted transition-colors hover:border-accent-primary hover:text-accent-primary"
            >
              Door sealed.
              <span className="mt-2 block font-mono text-xs font-normal tracking-[0.25em]">Click to open the time door</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
