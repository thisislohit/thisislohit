import type { ComponentPropsWithoutRef } from "react";

// design.md "Components → Lists": hairline (1px) dividers between rows,
// used sparingly — a List usage, not a page-wide pattern (DESIGN_SYSTEM.md
// Part 3 "Divider"). Tailwind's preflight already resets <hr> to a
// top-border-only, zero-height line; only the border color needs setting.
export function Divider({ className = "", ...props }: ComponentPropsWithoutRef<"hr">) {
  const classes = `border-t border-border ${className}`.trim();
  return <hr className={classes} {...props} />;
}
