"use client";

import { motion } from "framer-motion";

// A rubber stamp that slams onto the page when scrolled into view.
export function Stamp({
  children,
  rotate = -8,
  tone = "orange",
  delay = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  rotate?: number;
  tone?: "orange" | "red" | "ink";
  delay?: number;
  className?: string;
}) {
  const color =
    tone === "red" ? "text-error border-error" : tone === "ink" ? "text-ink border-ink" : "text-accent-primary border-accent-primary";
  return (
    <motion.span
      initial={{ opacity: 0, scale: 2.6, rotate: rotate - 14 }}
      whileInView={{ opacity: 0.92, scale: 1, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 420, damping: 18, delay }}
      className={`inline-block select-none border-[3px] px-3 py-1 font-display text-sm font-black uppercase tracking-[0.18em] mix-blend-multiply ${color} ${className}`}
      style={{ borderRadius: 4 }}
    >
      {children}
    </motion.span>
  );
}
