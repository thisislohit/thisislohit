import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

const baseClasses =
  "inline-flex items-center justify-center min-h-11 min-w-11 px-6 py-3 " +
  "rounded-none border font-sans text-body-md transition-colors " +
  "duration-fast disabled:opacity-30 disabled:pointer-events-none";

// design.md "Components → Buttons":
// - Primary: solid #111111 fill, white text, 0px radius. Hover → Electric Blue fill.
// - Secondary: 1px #111111 border, no fill. Hover → Acid Lime fill + near-black text.
// Active state has no distinct spec (DESIGN_SYSTEM.md §Interaction states) —
// reuses the hover fill at 90% opacity for tactile feedback.
//
// Primary's hover/active fill uses accent-primary-text, not accent-primary
// directly — white text on the literal design.md blue (#4D7CFE) computes
// to 3.73:1, failing WCAG AA's 4.5:1 (flagged in DESIGN_SYSTEM.md §1.10,
// fixed 2026-08-25 per explicit user request). accent-primary-text is the
// same hue darkened to 6.44:1 with white text — the identical token
// already used for standalone link text, reused here rather than adding a
// third near-duplicate blue.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-text-primary text-on-primary border-text-primary " +
    "hover:bg-accent-primary-text hover:border-accent-primary-text " +
    "active:bg-accent-primary-text active:opacity-90",
  secondary:
    "bg-transparent text-text-primary border-text-primary " +
    "hover:bg-accent-utility hover:text-on-accent-utility hover:border-accent-utility " +
    "active:bg-accent-utility active:text-on-accent-utility active:opacity-90",
};

interface ButtonOwnProps {
  variant?: ButtonVariant;
}

type ButtonAsButton = ButtonOwnProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsAnchor = ButtonOwnProps &
  ComponentPropsWithoutRef<"a"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// Visible focus ring is handled globally (globals.css :focus-visible),
// so it never needs to be redeclared per component — never `outline: none`
// without a replacement.
export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return <a href={href} className={classes} {...anchorProps} />;
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return <button type={type} className={classes} {...buttonProps} />;
}
