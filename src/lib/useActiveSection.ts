"use client";

import { useEffect, useState } from "react";

// Scroll-spy: which section id is crossing the middle of the viewport.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);
  return active;
}

export const SECTIONS = [
  { id: "hero", code: "00", label: "VARIANT FILE", branch: "L-616 // ORIGIN" },
  { id: "work", code: "01", label: "CASE FILES", branch: "NEXUS REALITIES" },
  { id: "experience", code: "02", label: "INCIDENT LOG", branch: "CHRONOLOGY 2023→" },
  { id: "skills", code: "03", label: "TEMPORAL LOOM", branch: "CAPABILITY MATRIX" },
  { id: "contact", code: "04", label: "THE TIME DOOR", branch: "TRANSMIT" },
];
