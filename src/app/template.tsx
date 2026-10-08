"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Re-mounts on every navigation: an orange time-slip bar sweeps in from the
// left, covers the screen, and exits right while the new page settles in.
// Everything starts in its *resting* (hidden/visible) state so server-rendered
// HTML is never covered or blank before hydration. The slide-up happens inside
// an overflow-clip wrapper so it can never make the document scrollable.
export default function Template({ children }: { children: React.ReactNode }) {
  // the wipe is removed from the DOM once it has played (no idle full-screen layer)
  const [wipe, setWipe] = useState(true);
  return (
    <>
      {wipe && (
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-accent-primary"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 100%)"] }}
        transition={{ duration: 1.1, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] }}
        style={{ boxShadow: "0 0 80px 20px rgba(255,122,26,0.7)" }}
        onAnimationComplete={() => setWipe(false)}
      />
      )}
      <div className="flex min-h-0 flex-1 flex-col overflow-clip">
        <motion.div
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
          className="flex min-h-0 flex-1 flex-col gap-stack-xl"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
