import type { ComponentPropsWithoutRef } from "react";

// design.md "Components" / DESIGN_SYSTEM.md Part 3 "Link": inline text
// links use accent-primary color, underline appears only on hover — no
// persistent underline, keeping the editorial text blocks clean. Tailwind's
// preflight already resets <a> to `text-decoration: inherit` (no default
// underline), so only the hover state needs declaring.
//
// Uses accent-primary-text, not accent-primary directly — the literal
// design.md blue (#4D7CFE) computes to 3.47:1 as normal-size text on the
// background, failing WCAG AA's 4.5:1 (confirmed via QA, 2026-08-25).
// accent-primary-text is the same hue darkened to 6.0:1 — see globals.css.
export function Link({ className = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const classes = `text-accent-primary-text underline-offset-4 hover:underline ${className}`.trim();
  return <a className={classes} {...props} />;
}
