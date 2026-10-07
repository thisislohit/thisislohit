"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Targeting-reticle cursor. Fine pointers only; touch devices keep the OS cursor.
export function TVACursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [hot, setHot] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only sync with a browser-only value
    setEnabled(true);
    document.documentElement.classList.add("tva-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("a,button,[data-cursor]");
      setHot(!!t);
      setLabel(t?.dataset.cursor ?? "");
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("tva-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-screen"
        style={{ x: rx, y: ry }}
      >
        <motion.div
          className="-ml-4 -mt-4 h-8 w-8 border border-accent-primary"
          animate={{ scale: down ? 0.7 : hot ? 1.9 : 1, rotate: hot ? 45 : 0, borderRadius: hot ? "4px" : "999px" }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        />
        {label && (
          <span className="absolute left-5 top-3 whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-widest text-accent-primary">
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent-utility"
        style={{ x, y }}
      />
    </>
  );
}
