import type { ComponentPropsWithoutRef } from "react";

// design.md "Components → Input Fields": bottom-border only, active state
// shifts the border to accent-primary. DESIGN_SYSTEM.md Part 3: reserved
// for a possible future contact form — Contact is mailto:-only in v1
// (scope.md Out of Scope) — built for completeness/consistency since
// design.md specifies its style, not because anything renders it yet.
// The global :focus-visible ring (globals.css) still applies on top of
// the border-color change; this only adds the border shift, it doesn't
// replace the ring.
export function Input({ className = "", ...props }: ComponentPropsWithoutRef<"input">) {
  const classes =
    "w-full bg-transparent border-0 border-b border-text-primary rounded-sm " +
    "px-1 py-2 font-sans text-body-md text-text-primary " +
    "focus:border-accent-primary transition-colors duration-fast " +
    className;

  return <input className={classes.trim()} {...props} />;
}
