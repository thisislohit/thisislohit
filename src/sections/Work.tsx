import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { projects } from "@/data/projects";
import { ProjectRow } from "@/sections/work/ProjectRow";

// scope.md IA §03 "Work / Projects": list rows (title, one-line
// description, stack tags, arrow-up-right link), asymmetric layout.
// Data is real (src/data/projects.ts, from the user's resume + GitHub).
// Headline/closing line drafted 2026-08-25, approved before implementation.
export default function Work() {
  // Featured first, otherwise resume order preserved — Array.sort is
  // stable (ES2019+), so this never reorders within the same featured
  // status.
  const sortedProjects = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <Section id="work" aria-label="Work">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-6">
        <Text variant="metadata" as="span">
          03 — Work
        </Text>

        <Heading level="headline-lg" as="h2">
          Work That Ships.
        </Heading>

        {sortedProjects.length > 0 && (
          <div className="flex flex-col divide-y divide-border">
            {sortedProjects.map((project, index) => (
              <ProjectRow key={project.name} project={project} index={index} />
            ))}
          </div>
        )}

        <Text variant="body-lg" className="mt-stack-md border-t border-border pt-stack-md">
          Built for Real Users.
        </Text>
      </div>
    </Section>
  );
}
