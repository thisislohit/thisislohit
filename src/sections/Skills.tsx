import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { skillGroups } from "@/data/skills";

// Compact "Stack // Production" index at the bottom — matches the updated
// Expertise design's grouping (Mobile / State / Backend & Storage /
// Delivery), but every entry is pulled directly from skillGroups' own tag
// arrays above (src/data/skills.ts), not a new list. Deliberately does NOT
// include Riverpod or SQLite (present in the Stitch reference, not in the
// user's confirmed skills — same decision already made when skillGroups
// was built) or a "CI/CD" entry (the reference has one, but no literal
// "CI/CD" tag exists in skillGroups — only Fastlane, which is already
// listed here).
const STACK_INDEX = [
  { label: "Mobile", items: ["Flutter 3", "Dart", "Android (Java)", "iOS"] },
  { label: "State", items: ["BLoC", "Provider", "GetX"] },
  { label: "Backend & Storage", items: ["Firebase Auth", "Firestore", "Hive"] },
  { label: "Delivery", items: ["Git", "GitHub", "Fastlane"] },
];

// scope.md IA §04 "Skills". Restructured 2026-08-25 to match the updated
// "Expertise / Technical Stack" Stitch export (lohit_portfolio_expertise_
// technical_stack) — a numbered capability-index table (idx / category /
// description + stack), a table header row, larger per-row category
// titles, a "3+ years" stat card alongside the section headline, and a
// compact "Stack // Production" index below the typographic break.
//
// Deliberate deviations from that reference, not oversights:
// - Headline kept at headline-lg scale, not the reference's bigger
//   display-lg/xl — every other section's <h2> on this page (About/Work/
//   Experience/Foundations/Contact) is headline-lg; breaking that for one
//   section would undercut the consistency already established there.
// - Category titles ("Mobile Development", "Architecture & State", etc.)
//   are real <h3>s, not plain styled text — unlike Experience's role
//   titles (which repeat "Flutter Developer" 3x and would make a
//   meaningless heading outline), every category title here is distinct,
//   so a real heading is the correct, more accessible choice.
// - The reference's arbitrary per-row tag/title coloring (lime fill on
//   row 1's lead tag, black fill on row 2's, blue outline + blue title on
//   row 3) isn't reproduced — Tag only has two variants (default/accent)
//   per design.md's token system, so each row's lead tag uses the
//   existing `accent` variant uniformly instead of inventing per-row
//   one-off colors.
// - No "Resume" nav button or "SYSTEM / MOBILE / 001" tag/hover-highlight
//   row background — kept the existing `thisislohit` nav wordmark and
//   layout, not the reference's "LSSK" rebrand or "Built With Precision"
//   tagline (unapproved new copy).
export default function Skills() {
  return (
    <Section id="skills" aria-label="Skills">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-stack-md">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-gutter">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <Text variant="metadata" as="span">
              04 — Skills
            </Text>

            <Heading level="headline-lg" as="h2">
              Built Beyond UI.
            </Heading>
          </div>

          <div className="flex flex-col justify-end border border-border bg-surface p-6 lg:col-span-4">
            <span className="font-sans text-headline-lg-mobile font-display-lg tracking-tighter text-text-primary">
              3+
            </span>
            <Text variant="metadata" as="span" className="normal-case leading-relaxed">
              Years building production
              <br />
              mobile software
            </Text>
          </div>
        </div>

        {skillGroups.length > 0 && (
          <div className="flex flex-col">
            <div className="hidden border-b border-border pb-4 lg:grid lg:grid-cols-12 lg:gap-gutter">
              <Text variant="metadata" as="span" className="lg:col-span-1">
                Idx
              </Text>
              <Text variant="metadata" as="span" className="lg:col-span-4">
                Capability Domain
              </Text>
              <Text variant="metadata" as="span" className="lg:col-span-7">
                Description &amp; Stack
              </Text>
            </div>

            <div className="flex flex-col divide-y divide-border">
              {skillGroups.map((group, index) => (
                <div
                  key={group.category}
                  className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-gutter"
                >
                  <Text variant="metadata" as="span" className="lg:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <h3 className="font-sans text-headline-lg-mobile font-headline uppercase leading-none tracking-headline-lg-mobile text-text-primary break-words lg:col-span-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-col gap-4 lg:col-span-7">
                    <Text variant="body-lg" className="max-w-2xl">
                      {group.description}
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, skillIndex) => (
                        <Tag key={skill} variant={skillIndex === 0 ? "accent" : "default"}>
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Typographic break — editorial pull-statement, not a document
            heading. */}
        <p className="my-stack-md border-y border-border py-stack-md text-center font-sans text-display-lg-mobile font-display-lg leading-display-lg tracking-display-lg text-text-primary break-words lg:text-display-lg">
          Flutter Is the Tool. Engineering Is the Job.
        </p>

        <div className="flex flex-col gap-8 border-t border-border pt-8">
          <Text variant="metadata" as="span">
            Stack // Production
          </Text>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STACK_INDEX.map((column) => (
              <div key={column.label} className="flex flex-col gap-4">
                <Text variant="metadata" as="span" className="text-text-primary">
                  {column.label}
                </Text>
                <ul className="flex flex-col gap-2">
                  {column.items.map((item) => (
                    <li key={item}>
                      <Text variant="body-md">{item}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
