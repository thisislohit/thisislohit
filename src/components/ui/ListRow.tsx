import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface ListRowProps {
  // When present, the whole row becomes a single <a> — never a link
  // nested inside a non-interactive row, so keyboard/focus behavior is
  // native. Rows with no outbound link (e.g. Experience, which has no
  // URL in its data model) render as a plain, non-interactive container
  // and get no arrow.
  href?: string;
  children: ReactNode;
  className?: string;
}

// design.md "Components → Lists": hairline dividers between rows (applied
// by the caller via Tailwind's `divide-y divide-border` on the list
// wrapper, not by ListRow itself — DESIGN_SYSTEM.md Part 3 "List/ListRow"
// says "no divider on first/last per section", which is exactly what
// `divide-y` gives for free). On hover, the trailing Lucide ArrowUpRight
// translates by --motion-hover-translate (2px) toward the upper right.
export function ListRow({ href, children, className = "" }: ListRowProps) {
  const content = (
    <div className={`flex items-center justify-between gap-gutter py-6 ${className}`.trim()}>
      <div className="flex-1">{children}</div>
      {href && (
        <ArrowUpRight
          size={24}
          strokeWidth={2}
          aria-hidden="true"
          className="shrink-0 text-text-primary transition-transform duration-fast group-hover:translate-x-[var(--motion-hover-translate)] group-hover:-translate-y-[var(--motion-hover-translate)]"
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group block">
        {content}
      </a>
    );
  }

  return content;
}
