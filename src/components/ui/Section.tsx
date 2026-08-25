import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./Container";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  // Only the tags actually used across the IA (see architecture.md) —
  // not a general polymorphic escape hatch.
  as?: "section" | "footer";
}

// design.md's Section/Container primitive (DESIGN_SYSTEM.md Part 3):
// enforces page margins + the 12-col/4-col grid via Container, but carries
// no visual styling of its own (no background/border) — a section's own
// className is for structural concerns only (e.g. Footer's top divider),
// never a fill or shadow.
export function Section({ as: Tag = "section", className = "", children, ...props }: SectionProps) {
  return (
    <Tag className={className} {...props}>
      <Container>{children}</Container>
    </Tag>
  );
}
