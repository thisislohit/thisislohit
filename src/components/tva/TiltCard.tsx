"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

// Pointer-reactive 3D tilt with a moving amber sheen — carried over from the
// previous portfolio's TiltCard, re-tinted for the TVA.
export function TiltCard({
  children,
  className = "",
  maxTilt = 5,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${glareX}% ${glareY}%, rgba(255,170,90,0.16), transparent 55%)`;
  const glareOpacity = useMotionValue(0);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
        glareOpacity.set(1);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
        glareOpacity.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{ background: glare, opacity: glareOpacity }}
      />
    </motion.div>
  );
}
