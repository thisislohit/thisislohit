"use client";

import { Scissors } from "lucide-react";

export const PRUNE_EVENT = "tva:prune";

// Footer CTA: asks <PruneEffect /> (mounted once in the layout) to erase the
// page and then restore the timeline.
export function PruneButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event(PRUNE_EVENT))}
      data-cursor="PRUNE"
      className="group inline-flex items-center gap-2 border border-error/60 bg-error/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-error transition-colors hover:bg-error hover:text-text-primary"
    >
      <Scissors size={14} className="transition-transform group-hover:-rotate-45" />
      Prune this timeline
    </button>
  );
}
