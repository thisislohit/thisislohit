import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface IconButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  icon: ReactNode;
  // Icon-only control — there is no visible label, so an accessible name
  // is required, not optional.
  "aria-label": string;
}

// design.md doesn't name a distinct "IconButton" component, but the mobile
// nav toggle and shortcuts-dialog trigger need one (DESIGN_SYSTEM.md
// Part 3). Built from only the tokens that entry lists: --color-border,
// --color-text-primary, --radius-sm — no new visual language introduced.
//
// Icon sizing/stroke (20–24px, 2px stroke per the Lucide spec in design.md)
// is the caller's responsibility, e.g. <IconButton icon={<Menu size={24} />} />.
export function IconButton({
  icon,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  const classes =
    "inline-flex items-center justify-center min-h-11 min-w-11 rounded-sm " +
    "border border-transparent text-text-primary transition-colors duration-fast " +
    "hover:border-border active:border-text-primary " +
    "disabled:opacity-30 disabled:pointer-events-none " +
    className;

  return (
    <button type={type} className={classes.trim()} {...props}>
      {icon}
    </button>
  );
}
