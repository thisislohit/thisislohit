import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/tva/SectionHeader";
import { IncidentLog } from "@/components/tva/IncidentLog";
import { Reveal } from "@/components/tva/Reveal";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" aria-label="Incident log" className="scroll-mt-16">
      <div className="col-span-4 flex flex-col gap-12 lg:col-span-12">
        <SectionHeader code="02" eyebrow="Temporal chronology" title="Incident Log" meta="Era 2023 → 2026" />
        <Reveal className="max-w-2xl font-mono text-sm leading-relaxed text-text-secondary">
          Every role on record, in strict chronological order. Follow the glowing thread — it is the Sacred
          Timeline, and it has never been pruned.
        </Reveal>
        <IncidentLog entries={experience} />
      </div>
    </Section>
  );
}
