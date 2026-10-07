"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrambleText } from "./ScrambleText";

// Every section opens like a TVA form: file code, stamped title, hairline that draws in.
export function SectionHeader({
  code,
  eyebrow,
  title,
  meta,
}: {
  code: string;
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  // Observe the heading itself: its words start translated out of their
  // overflow-hidden masks, so observing the words would never fire.
  const h2 = useRef<HTMLHeadingElement>(null);
  const seen = useInView(h2, { once: true, margin: "-60px" });

  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em]">
        <span className="bg-accent-primary px-2 py-1 text-on-primary">{code}</span>
        <span className="text-accent-primary">
          <ScrambleText text={eyebrow} />
        </span>
        {meta && <span className="text-text-muted">{"// "}{meta}</span>}
      </div>
      <h2 ref={h2} className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight text-text-primary sm:text-6xl lg:text-8xl">
        {title.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pr-[0.2em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: seen ? 0 : "110%" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h2>
      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-accent-primary via-accent-utility/60 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      />
    </header>
  );
}
