import type { ComponentPropsWithoutRef } from "react";

type Level = "display-xl" | "display-lg" | "headline-lg" | "hero-name";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends Omit<ComponentPropsWithoutRef<"h1">, "className"> {
  // Visual scale — independent of the semantic tag below. This is what
  // makes it possible for Hero to use display-xl while still being the
  // page's single <h1>, per DESIGN_SYSTEM.md Part 3 "Heading".
  level: Level;
  // Semantic HTML level — set explicitly by the caller so the document's
  // heading outline stays correct regardless of visual size.
  as: HeadingTag;
  className?: string;
}

// design.md treats display type as a graphic element (allowed to clip,
// tight tracking/leading) — see DESIGN_SYSTEM.md §1.2/§1.4. Mobile sizes
// for display-xl/display-lg are derived (§1.7); headline-lg's mobile size
// and its own distinct line-height/letter-spacing are direct from design.md.
const levelClasses: Record<Level, string> = {
  "display-xl":
    "text-display-xl-mobile lg:text-display-xl " +
    "font-display-xl leading-display-xl tracking-display-xl",
  "display-lg":
    "text-display-lg-mobile lg:text-display-lg " +
    "font-display-lg leading-display-lg tracking-display-lg",
  "headline-lg":
    "text-headline-lg-mobile lg:text-headline-lg font-headline " +
    "leading-headline-lg-mobile lg:leading-headline-lg " +
    "tracking-headline-lg-mobile lg:tracking-headline-lg",
  // From the updated Hero design (2026-08-25, stitch-design/html/
  // hero-v2-availability.html) — a fluid size (clamp, scales continuously
  // with viewport) rather than the discrete mobile/desktop pairs used by
  // every other level. Reuses display-xl's weight/leading and
  // display-lg's tracking rather than inventing new values for those.
  "hero-name": "text-hero-name font-display-xl leading-display-xl tracking-display-lg",
};

export function Heading({ level, as: Tag, className = "", ...props }: HeadingProps) {
  // break-words: display type is allowed to clip per design.md, but that
  // means the viewport edge, not losing letters mid-word — a long word at
  // display-xl-mobile's size can be wider than its own column (e.g.
  // "Developer." at 112px), and without this the browser lets it overflow
  // rather than wrap, silently truncating it against the viewport edge.
  // Found via mobile visual QA, not from design.md itself (a real gap the
  // source design never had to address, since it never tested this word).
  const classes =
    `font-sans text-text-primary break-words ${levelClasses[level]} ${className}`.trim();
  return <Tag className={classes} {...props} />;
}
