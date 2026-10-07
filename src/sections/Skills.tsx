import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/tva/SectionHeader";
import { LoomGrid } from "@/components/tva/LoomGrid";
import { Reveal } from "@/components/tva/Reveal";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <Section id="skills" aria-label="Temporal loom" className="scroll-mt-16">
      <div className="col-span-4 flex flex-col gap-12 lg:col-span-12">
        <SectionHeader code="03" eyebrow="Capability matrix" title="Temporal Loom" meta="Core: Flutter systems" />
        <Reveal className="max-w-2xl font-mono text-sm leading-relaxed text-text-secondary">
          Every thread the variant can weave — grouped by how it is actually used in production. Hover a tile to
          decode it.
        </Reveal>
        <LoomGrid groups={skillGroups} />
      </div>
    </Section>
  );
}
