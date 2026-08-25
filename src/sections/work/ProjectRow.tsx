import { ListRow } from "@/components/ui/ListRow";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
  index: number;
}

// design.md "Lists" applied to Work/Projects (scope.md IA §03): title,
// one-line description, stack tags, arrow-up-right link. Links out to the
// live project if there is one, otherwise the repo — never both, per
// ListRow's single-link-per-row model. Category label + "Engineering
// Highlights" list added 2026-08-25 to match the updated Featured Work
// design — every highlight is a direct restatement of a resume bullet
// already used in the project's own description, nothing new claimed.
export function ProjectRow({ project, index }: ProjectRowProps) {
  const href = project.liveUrl ?? project.repoUrl;

  return (
    <ListRow href={href}>
      <div className="flex flex-col gap-3">
        <Text variant="metadata" as="span">
          {String(index + 1).padStart(2, "0")} / {project.category}
        </Text>
        <Text variant="body-lg">{project.name}</Text>
        <Text variant="body-md">{project.description}</Text>

        <div className="flex flex-wrap gap-2">
          {project.featured && <Tag variant="accent">Featured</Tag>}
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <ul className="mt-2 flex flex-col gap-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 bg-text-primary" aria-hidden="true" />
              <Text variant="body-md">{highlight}</Text>
            </li>
          ))}
        </ul>
      </div>
    </ListRow>
  );
}
