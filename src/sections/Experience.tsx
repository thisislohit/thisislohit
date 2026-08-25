import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { experience } from "@/data/experience";
import { ExperienceRow } from "@/sections/experience/ExperienceRow";

// scope.md IA §05 "Experience": compact list with hairline dividers —
// role, company, dates, one-line impact. Data is real
// (src/data/experience.ts, from the user's resume). Headline/closing
// statement drafted 2026-08-25, matching the updated Experience Timeline
// design. Headline kept at headline-lg scale (not the reference's bigger
// display-lg/display-xl) for consistency with every other section's <h2>
// on this page — About/Work/Skills/Foundations/Contact all use the same
// scale, so Experience does too.
export default function Experience() {
  return (
    <Section id="experience" aria-label="Experience">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-6">
        <Text variant="metadata" as="span">
          05 — Experience
        </Text>

        <Heading level="headline-lg" as="h2" className="uppercase">
          Where I&apos;ve Built.
        </Heading>

        {experience.length > 0 && (
          <div className="flex flex-col divide-y divide-border">
            {experience.map((entry) => (
              <ExperienceRow key={`${entry.company}-${entry.startDate}`} entry={entry} />
            ))}
          </div>
        )}

        <div className="mt-stack-md flex flex-col gap-6 border-t border-border pt-stack-md lg:flex-row lg:items-end lg:justify-between">
          <p className="font-sans text-display-lg-mobile font-display-lg leading-display-lg tracking-display-lg text-text-primary break-words lg:text-display-lg">
            From Features to <span className="text-accent-primary-text">Systems.</span>
          </p>
          <div className="flex flex-col gap-2 lg:text-right">
            <Text variant="metadata" as="span">
              Career / 2023 → Present
            </Text>
            <Text variant="metadata" as="span">
              Focus / Mobile Engineering
            </Text>
          </div>
        </div>
      </div>
    </Section>
  );
}
