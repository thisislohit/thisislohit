"use client";

import { VariantDossier } from "@/components/tva/VariantDossier";
import { CountUp } from "@/components/tva/CountUp";

const STATS = [
  { to: 3, suffix: "+", label: "Years in production" },
  { to: 4, suffix: "", label: "Case files" },
  { to: 3, suffix: "", label: "Platforms" },
  { to: 0, suffix: "", label: "Prunings" },
];

export function FilePanel() {
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[1fr_1fr]">
      <VariantDossier />
      <div className="flex flex-col gap-5">
        <p className="font-mono text-sm leading-relaxed text-text-secondary">
          I build Flutter systems for places where failure isn&apos;t an option — hospitality and payments software
          across Android, iOS, Windows and purpose-built hardware.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="border border-border p-3">
              <div className="font-display text-3xl font-black leading-none text-accent-primary">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">Hyderabad · Earth-616 · Android · iOS · Windows</p>
      </div>
    </div>
  );
}
