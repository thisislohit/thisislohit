"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { Stamp } from "./Stamp";
import { RiveSlot } from "./RiveSlot";
import { TVAEmblem } from "./TVAEmblem";

const FIELDS: [string, string][] = [
  ["Name", "Lohit Kuntamukkala"],
  ["Designation", "Variant L-616"],
  ["Alias", "God of Mobile Stories"],
  ["Origin", "Hyderabad · Earth-616"],
  ["Occupation", "Flutter Architect"],
];

const CRIMES = [
  "Shipping Stripe Tap-to-Pay on Android + iOS",
  "Building offline-first POS systems that never blink",
  "Running a white-label Melos monorepo without incident",
];

function Silhouette() {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="horn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d98a" />
          <stop offset="1" stopColor="#c7871f" />
        </linearGradient>
      </defs>
      {/* shoulders + neck + head */}
      <path d="M12 240 C12 192 56 172 100 172 C144 172 188 192 188 240 Z" fill="#3a2414" />
      <rect x="84" y="140" width="32" height="40" fill="#3a2414" />
      <ellipse cx="100" cy="108" rx="38" ry="46" fill="#4a2e19" />
      {/* gold circlet + floating hourglass sigil (original variant mark) */}
      <path d="M64 84 Q100 66 136 84 L136 92 Q100 76 64 92 Z" fill="url(#horn)" stroke="#7a4a00" strokeWidth="1.5" />
      <path d="M86 42 H114 L100 62 L114 82 H86 L100 62 Z" fill="none" stroke="url(#horn)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M92 76 H108 L100 66 Z" fill="url(#horn)" />
    </svg>
  );
}

// The hero's centrepiece: a TVA "Variant Apprehension Form" with a live scan.
export function VariantDossier() {
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setConfirmed(true), 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <TiltCard maxTilt={7} className="w-full max-w-md justify-self-center lg:justify-self-end">
      <div className="tva-paper rotate-[1.5deg] p-5 font-typed sm:p-6">
        <div className="mb-4 flex items-center justify-between border-b-2 border-ink pb-3">
          <div>
            <div className="font-display text-[10px] font-black uppercase tracking-[0.25em] text-ink/70">Time Variance Authority</div>
            <div className="font-display text-lg font-black uppercase leading-tight text-ink">Variant Apprehension Form</div>
          </div>
          <TVAEmblem size={46} className="text-accent-primary" />
        </div>

        <div className="grid grid-cols-[132px_1fr] gap-4">
          {/* scan window */}
          <div className="relative aspect-[5/6] overflow-hidden border-2 border-ink bg-[#1a0d05]">
            <RiveSlot src="/rive/variant.riv" stateMachine="Main" fallback={<Silhouette />} />
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-crt/60 to-transparent"
              animate={{ top: ["-20%", "110%"] }}
              transition={{ repeat: confirmed ? 0 : Infinity, duration: 1.8, ease: "linear" }}
            />
            {["left-1 top-1 border-l-2 border-t-2", "right-1 top-1 border-r-2 border-t-2", "left-1 bottom-1 border-l-2 border-b-2", "right-1 bottom-1 border-r-2 border-b-2"].map((c) => (
              <span key={c} className={`absolute h-3 w-3 border-crt ${c}`} />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-center font-mono text-[8px] font-bold uppercase tracking-widest text-crt">
              {confirmed ? "● match 99.9%" : "scanning…"}
            </div>
          </div>

          <dl className="flex flex-col justify-between gap-1.5 text-[11px] leading-tight text-ink">
            {FIELDS.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.18 }}
              >
                <dt className="font-display text-[8px] font-black uppercase tracking-[0.22em] text-ink/55">{k}</dt>
                <dd className="font-bold uppercase">{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div className="mt-4 border-t-2 border-dashed border-ink/50 pt-3">
          <div className="mb-1.5 font-display text-[9px] font-black uppercase tracking-[0.25em] text-ink/60">Charges filed</div>
          <ul className="space-y-1 text-[11px] text-ink">
            {CRIMES.map((c, i) => (
              <motion.li
                key={c}
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 + i * 0.35 }}
              >
                <span aria-hidden="true" className="font-black text-accent-primary">☒</span>
                {c}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="font-mono text-[9px] uppercase leading-tight tracking-widest text-ink/60">
            Case no. 616-L / Clearance: public
            <br />
            Sentence: <b className="text-ink">hire immediately</b>
          </div>
          <Stamp rotate={-12} tone="red" delay={3.6} className="!text-base">
            Variant
          </Stamp>
        </div>
      </div>
    </TiltCard>
  );
}
