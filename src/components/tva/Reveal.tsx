"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  // "slip" = TVA time-slip: horizontal clip wipe instead of a plain fade.
  variant?: "rise" | "slip";
}

export function Reveal({ delay = 0, y = 36, variant = "rise", ...props }: RevealProps) {
  const hidden =
    variant === "slip"
      ? { opacity: 0, clipPath: "inset(0 100% 0 0)" }
      : { opacity: 0, y };
  const shown =
    variant === "slip" ? { opacity: 1, clipPath: "inset(-30px -30px -30px 0px)" } : { opacity: 1, y: 0 };

  // "slip" plays on mount: a fully clipped element reports zero intersection,
  // so an in-view trigger would never fire for it.
  const trigger = variant === "slip" ? { animate: shown } : { whileInView: shown };

  return (
    <motion.div
      initial={hidden}
      {...trigger}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
      {...props}
    />
  );
}
