import type { ComponentPropsWithoutRef } from "react";

type TextVariant = "body-lg" | "body-md" | "metadata";
type TextTag = "p" | "span" | "div";

interface TextProps extends Omit<ComponentPropsWithoutRef<"p">, "className"> {
  variant?: TextVariant;
  as?: TextTag;
  className?: string;
}

// design.md's typographic primitive alongside Heading (DESIGN_SYSTEM.md
// Part 3) — wraps the body/metadata type-scale tokens so no component
// hardcodes a raw font-size. Each variant fully specifies its own color
// (not a shared base) so a caller's className can't lose a Tailwind
// same-specificity ordering fight against a base class.
const variantClasses: Record<TextVariant, string> = {
  "body-lg": "text-body-lg font-body leading-body-lg tracking-body text-text-primary",
  "body-md": "text-body-md font-body leading-body-md tracking-body text-text-primary",
  // Metadata is muted per design.md's "structural anchor" role, not
  // primary reading text — matches Tag's use of the same color.
  metadata: "text-metadata font-metadata uppercase tracking-metadata text-text-secondary",
};

export function Text({ variant = "body-md", as: Tag = "p", className = "", ...props }: TextProps) {
  const classes = `font-sans ${variantClasses[variant]} ${className}`.trim();
  return <Tag className={classes} {...props} />;
}
