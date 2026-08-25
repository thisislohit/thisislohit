import type { Metadata } from "next";
import Work from "@/sections/Work";
import Skills from "@/sections/Skills";

// Skills (scope.md IA §04) lives on this route rather than getting its own
// — it was scroll-only, not a top-level nav item, even on the old
// single-page layout, and follows Work numerically (03 → 04).
export const metadata: Metadata = {
  title: "Work — thisislohit",
  description: "Projects and technical capability — Flutter, payments, offline-first systems.",
};

export default function WorkPage() {
  return (
    <>
      <Work />
      <Skills />
    </>
  );
}
