import type { Metadata } from "next";
import Experience from "@/sections/Experience";
import FoundationsEducation from "@/sections/FoundationsEducation";

// Foundations & Education (scope.md IA §06) lives on this route rather
// than getting its own — it was scroll-only, not a top-level nav item,
// even on the old single-page layout, and follows Experience numerically
// (05 → 06).
export const metadata: Metadata = {
  title: "Experience — thisislohit",
  description: "Career history and education — 3+ years building production mobile software.",
};

export default function ExperiencePage() {
  return (
    <>
      <Experience />
      <FoundationsEducation />
    </>
  );
}
