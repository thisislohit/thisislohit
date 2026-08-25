import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { skillGroups } from "@/data/skills";

// scope.md IA §04 "Skills". Restructured 2026-08-25 into an index-row
// format (number / category / description + tags) matching the updated
// Expertise design's "Technical Capability Index" — same hairline-divider
// list pattern already used by Work/Experience, not a new one. Data is
// real (src/data/skills.ts, from the user's resume). Headline/break
// drafted 2026-08-25, approved before implementation.
export default function Skills() {
  return (
    <Section id="skills" aria-label="Skills">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-6">
        <Text variant="metadata" as="span">
          04 — Skills
        </Text>

        <Heading level="headline-lg" as="h2">
          Built Beyond UI.
        </Heading>

        {skillGroups.length > 0 && (
          <div className="flex flex-col divide-y divide-border">
            {skillGroups.map((group, index) => (
              <div
                key={group.category}
                className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-gutter"
              >
                <Text variant="metadata" as="span" className="lg:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text variant="body-lg" className="lg:col-span-3">
                  {group.category}
                </Text>
                <div className="flex flex-col gap-4 lg:col-span-8">
                  <Text variant="body-md">{group.description}</Text>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Typographic break — editorial pull-statement, not a document
            heading. */}
        <p className="my-stack-md border-y border-border py-stack-md text-center font-sans text-display-lg-mobile font-display-lg leading-display-lg tracking-display-lg text-text-primary break-words lg:text-display-lg">
          Flutter Is the Tool. Engineering Is the Job.
        </p>
      </div>
    </Section>
  );
}
