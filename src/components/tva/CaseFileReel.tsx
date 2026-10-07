"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CaseFile } from "./CaseFile";
import type { Project } from "@/data/projects";

const QUERY = "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

// Case files as a pinned horizontal reel: the section sticks to the screen
// and vertical scrolling pulls the folders sideways, like flipping a cabinet.
// Small / short / reduced-motion screens get a plain vertical stack.
export function CaseFileReel({ projects }: { projects: Project[] }) {
  const pinned = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  if (!pinned) {
    return (
      <div className="flex flex-col gap-14">
        {projects.map((p, i) => (
          <CaseFile key={p.name} project={p} index={i} />
        ))}
      </div>
    );
  }
  return <PinnedReel projects={projects} />;
}

function PinnedReel({ projects }: { projects: Project[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);
  const caseNo = useTransform(smooth, (v) => String(Math.min(projects.length, Math.floor(v * projects.length) + 1)).padStart(2, "0"));

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length]);

  return (
    // full-bleed: escape the grid's page margins so folders slide edge to edge
    <div ref={outer} className="relative -mx-margin-page" style={{ height: `${projects.length * 85 + 60}vh` }}>
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-12 px-margin-page">
          {projects.map((p, i) => (
            <div key={p.name} className="w-[min(74vw,1040px)] shrink-0">
              <CaseFile project={p} index={i} />
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-margin-page bottom-4 flex items-center gap-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-accent-primary">
          <span>
            Case <motion.span>{caseNo}</motion.span> / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="h-[3px] flex-1 bg-border">
            <motion.div className="h-full origin-left bg-accent-primary shadow-[0_0_10px_rgba(255,122,26,0.9)]" style={{ scaleX: smooth }} />
          </div>
          <span className="text-text-muted">Keep scrolling →</span>
        </div>
      </div>
    </div>
  );
}
