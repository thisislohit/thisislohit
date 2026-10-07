"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Scroll-linked drift for hero layers: as you leave the section, the layer
// moves at its own speed, fades and (optionally) rotates, giving depth.
export function ScrollParallax({
  children,
  y = [0, -90],
  rotate = [0, 0],
  fade = true,
  className = "",
}: {
  children: ReactNode;
  y?: [number, number];
  rotate?: [number, number];
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });
  const ty = useTransform(p, [0, 1], y);
  const rot = useTransform(p, [0, 1], rotate);
  const opacity = useTransform(p, [0, 0.8], [1, fade ? 0.15 : 1]);

  return (
    <motion.div ref={ref} style={{ y: ty, rotate: rot, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
