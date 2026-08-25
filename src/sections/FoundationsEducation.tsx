import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

// scope.md IA §06 "Foundations & Education": the education entry —
// degree, institution, dates, all confirmed from the user's resume and
// consistent with the pulled Stitch screen. Headline + closing statement
// drafted 2026-08-25, approved before implementation.
//
// Deliberately NOT added: the updated Stitch reference's "Continuously
// Learning" subsection (React/Node.js/SQL/Backend/Deployment/Unity/AR tags
// + "expanding beyond mobile into backend, web, deployment, spatial
// computing") — this is the same territory as the now-cut Beyond Mobile
// section. Since the user declined that content there, it isn't
// reintroduced here either.
export default function FoundationsEducation() {
  return (
    <Section id="foundations" aria-label="Foundations & Education">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-6">
        <Text variant="metadata" as="span">
          06 — Foundations
        </Text>

        <Heading level="headline-lg" as="h2" className="uppercase">
          Where It Started.
        </Heading>

        <div className="flex flex-col gap-1 border-t border-border pt-6">
          <Text variant="body-lg">B.Tech, Computer Science &amp; Engineering</Text>
          <Text variant="body-md">
            Krishna University College of Engineering and Technology, Machilipatnam, Andhra
            Pradesh, India
          </Text>
          <Text variant="metadata" as="span" className="mt-1">
            2018 — 2022
          </Text>
        </div>

        <div className="mt-4 flex flex-col gap-4 border-t border-border pt-6">
          {/* Plain styled <p>, not a second Heading — same precedent as
              Work's "Built for Real Users." and the About/Skills
              typographic breaks: closing statements stay out of the
              document outline unless they're a real section title. */}
          <p className="font-sans text-headline-lg-mobile font-headline uppercase leading-headline-lg-mobile tracking-headline-lg-mobile text-text-primary break-words lg:text-headline-lg lg:leading-headline-lg lg:tracking-headline-lg">
            Building Is How I Learn.
          </p>
          <Text variant="body-lg" className="max-w-2xl">
            Instead of learning technologies only in theory, I prefer building complete systems
            and solving the problems that appear along the way.
          </Text>
        </div>
      </div>
    </Section>
  );
}
