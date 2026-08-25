import type { ComponentPropsWithoutRef } from "react";

// design.md's 12-column asymmetric grid, collapsing to 4-column on mobile
// (DESIGN_SYSTEM.md §1.6/§1.11 — the 12-col grid activates at `lg`).
// Purely structural — no background/border of its own, per "elements sit
// directly on the paper" (§1.0 Elevation).
export function Container({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  const classes =
    "grid grid-cols-4 lg:grid-cols-12 gap-gutter " +
    "px-margin-page-mobile md:px-margin-page " +
    className;

  return <div className={classes.trim()} {...props} />;
}
