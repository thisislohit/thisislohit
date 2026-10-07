import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/tva/SectionHeader";
import { CaseFileReel } from "@/components/tva/CaseFileReel";
import { Reveal } from "@/components/tva/Reveal";
import { projects } from "@/data/projects";

export default function Work() {
  const sorted = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <Section id="work" aria-label="Case files" className="scroll-mt-16">
      <div className="col-span-4 flex flex-col gap-12 lg:col-span-12">
        <SectionHeader code="01" eyebrow="Nexus realities" title="Case Files" meta="Branch multi.sys · 2023 → present" />

        <Reveal className="max-w-2xl font-mono text-sm leading-relaxed text-text-secondary">
          Production Flutter software, payment infrastructure and offline-first architecture. Each folder is an
          active, stable branch — reviewed, filed, and verified against reality.
        </Reveal>

        <CaseFileReel projects={sorted} />

        <Reveal className="flex flex-col justify-between gap-3 border border-border bg-surface/60 p-4 font-mono text-xs uppercase tracking-widest text-text-muted sm:flex-row sm:items-center">
          <span>{"// "}Total recorded branch realities: {projects.length}</span>
          <span className="font-bold text-accent-primary">All timelines production-verified</span>
        </Reveal>
      </div>
    </Section>
  );
}
