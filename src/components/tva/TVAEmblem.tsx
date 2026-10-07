"use client";

import { motion } from "framer-motion";

// Original TVA-style seal: ticked chronometer ring, orbiting text, hourglass core.
export function TVAEmblem({ size = 120, className = "" }: { size?: number; className?: string }) {
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <path id="tva-ring-text" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <motion.g
        style={{ originX: "100px", originY: "100px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 48, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="2" />
        {ticks.map((i) => (
          <line
            key={i}
            x1="100"
            y1="8"
            x2="100"
            y2={i % 5 === 0 ? 20 : 14}
            stroke="currentColor"
            strokeWidth={i % 5 === 0 ? 2.4 : 1}
            transform={`rotate(${i * 6} 100 100)`}
          />
        ))}
        <text fontSize="11" fontWeight="800" letterSpacing="4.2" fill="currentColor" fontFamily="var(--font-archivo), sans-serif">
          <textPath href="#tva-ring-text" startOffset="0">
            TIME VARIANCE AUTHORITY · ALL TIME. ALL THE TIME. ·
          </textPath>
        </text>
      </motion.g>
      <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* hourglass */}
      <path d="M78 74 H122 L104 100 L122 126 H78 L96 100 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <motion.path
        d="M88 118 H112 L100 106 Z"
        fill="currentColor"
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.circle
        cx="100"
        cy="96"
        r="1.8"
        fill="currentColor"
        animate={{ cy: [96, 118], opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeIn" }}
      />
    </svg>
  );
}
