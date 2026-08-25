import type { ComponentPropsWithoutRef } from "react";

type TagVariant = "default" | "accent";

interface TagProps extends ComponentPropsWithoutRef<"span"> {
  variant?: TagVariant;
}

// design.md "Components → Tags": rectangular, 1px border, no rounding,
// metadata typography. Static in v1 — no hover/interactive state is
// planned (DESIGN_SYSTEM.md Part 3), so this renders a plain <span>,
// not a <button>.
//
// "accent" is a justified extension, not an invented one: design.md's
// Colors section names Acid Lime for exactly two uses — hover states, and
// "background fills for small tags/labels." A static filled tag (e.g. a
// "Featured" indicator) is the second of those two uses, applied directly,
// not a new color introduced for the purpose.
// accent now also carries a solid near-black border, matching the
// Hero "Available for Work" tag in the updated design (2026-08-25,
// stitch-design/html/hero-v2-availability.html) — brings it in line with
// design.md's baseline "rectangular boxes with 1px border" spec, which
// the original borderless accent variant was a stylistic exception to.
const variantClasses: Record<TagVariant, string> = {
  default: "border border-border text-text-secondary",
  accent: "border border-text-primary bg-accent-utility text-on-accent-utility",
};

export function Tag({ variant = "default", className = "", ...props }: TagProps) {
  const classes =
    "inline-flex items-center rounded-none " +
    "px-3 py-1 text-metadata font-metadata font-sans uppercase tracking-metadata " +
    variantClasses[variant] +
    " " +
    className;

  return <span className={classes.trim()} {...props} />;
}
