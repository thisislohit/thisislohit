import { ListRow } from "@/components/ui/ListRow";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { ExperienceEntry } from "@/data/experience";

// design.md "Lists" applied to Experience (scope.md IA §05): role, company,
// dates, one-line impact. No outbound URL in the data model, so this
// renders as a non-interactive ListRow (no arrow) — unlike ProjectRow; an
// arrow with no real destination would be decorative, not functional
// (design.md's icon rule), so it's intentionally left out even though the
// updated reference design shows one.
//
// Role title is large styled text, not a Heading — all three entries
// share the same title ("Flutter Developer"), and three identical <h3>s
// in a row would be a poor, repetitive heading-outline experience for
// screen reader users. The section's own "Where I've Built." headline is
// the one real heading here, same precedent as ProjectRow's title.
export function ExperienceRow({ entry }: { entry: ExperienceEntry }) {
  return (
    <ListRow>
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-gutter">
        <div className="flex flex-col gap-1 lg:col-span-4">
          <Text variant="metadata" as="span">
            {entry.startDate} — {entry.endDate}
          </Text>
          <Text variant="body-lg">{entry.company}</Text>
          <Text variant="body-md">{entry.project}</Text>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <p className="font-sans text-4xl font-bold tracking-tight text-text-primary break-words lg:text-6xl">
            {entry.role}
          </p>
          <Text variant="body-lg" className="max-w-2xl">
            {entry.impact}
          </Text>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </ListRow>
  );
}
