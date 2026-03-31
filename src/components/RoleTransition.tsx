import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const RoleTransition = () => {
  const [phase, setPhase] = useState<"initial" | "strike" | "swap">("initial");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("strike"), 2800);
    const t2 = setTimeout(() => setPhase("swap"), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <span className="inline-flex items-baseline gap-0">
      {/* Role word container — fixed width to prevent layout shift */}
      <span className="relative inline-block overflow-hidden" style={{ minWidth: "7.5ch" }}>
        {/* "Flutter" with strike-through */}
        <motion.span
          className="inline-block text-muted-foreground"
          animate={phase === "swap" ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          style={{ position: phase === "swap" ? "absolute" : "relative" }}
        >
          <span className="relative">
            Flutter
            {/* Strike-through line */}
            <motion.span
              className="absolute left-0 top-1/2 h-[2px] bg-muted-foreground/70"
              initial={{ width: "0%" }}
              animate={phase !== "initial" ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.5, ease }}
            />
          </span>
        </motion.span>

        {/* "Full Stack" dropping in */}
        {phase === "swap" && (
          <motion.span
            className="inline-block bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-green bg-clip-text"
            style={{ WebkitTextFillColor: "transparent" }}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            Full Stack
          </motion.span>
        )}
      </span>
      <span className="text-muted-foreground">&nbsp;Developer</span>
    </span>
  );
};

export default RoleTransition;
