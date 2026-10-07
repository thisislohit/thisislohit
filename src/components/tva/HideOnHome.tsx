"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The home screen is a single, non-scrolling stage: no footer there.
export function HideOnHome({ children }: { children: ReactNode }) {
  return usePathname() === "/" ? null : <>{children}</>;
}
