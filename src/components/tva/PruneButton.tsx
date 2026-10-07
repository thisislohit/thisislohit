"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { BOOT_KEY } from "./BootSequence";

// Easter egg / footer CTA: "prunes" the timeline — an orange wipe consumes
// the page, then the site reloads from the very first boot sequence.
export function PruneButton() {
  const [pruning, setPruning] = useState(false);

  const prune = () => {
    setPruning(true);
    setTimeout(() => {
      try {
        sessionStorage.removeItem(BOOT_KEY);
      } catch {}
      window.scrollTo(0, 0);
      // Full reload on purpose: re-runs the head script that arms the boot sequence.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`${window.location.origin}/`);
    }, 1700);
  };

  return (
    <>
      <button
        onClick={prune}
        data-cursor="PRUNE"
        className="group inline-flex items-center gap-2 border border-error/60 bg-error/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-error transition-colors hover:bg-error hover:text-text-primary"
      >
        <Scissors size={14} className="transition-transform group-hover:-rotate-45" />
        Prune this timeline
      </button>
      <AnimatePresence>
        {pruning && (
          <motion.div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-error"
            initial={{ clipPath: "circle(0% at 50% 80%)" }}
            animate={{ clipPath: "circle(150% at 50% 80%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center font-display font-black uppercase text-background"
            >
              <div className="text-5xl tracking-tight sm:text-7xl">Pruned.</div>
              <div className="mt-2 font-mono text-xs tracking-[0.3em]">Just kidding — rebooting timeline…</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
