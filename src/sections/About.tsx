import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";

// scope.md: "short, confident positioning statement — not a biography."
// Drafted from the user's resume Personal Statement, approved 2026-08-25 —
// every claim (multi-platform hospitality/payments work, native Android +
// Stripe integrations, the white-label/Melos platform) traces back to
// src/data/experience.ts, nothing invented beyond phrasing.
const ABOUT_STATEMENT =
  "I build Flutter systems for environments where failure isn't an option — hospitality and payments software running across Android, iOS, Windows, and purpose-built hardware. Over three years, that's meant native Android integrations, Stripe payment flows, and most recently architecting a white-label platform serving multiple clients from a single codebase. I optimize for dependable, not just demo-ready.";

// "Technical Profile" tags — added 2026-08-25 to match the updated About
// design. Each is a direct restatement of a resume/experience fact
// already used elsewhere on the site (SaaS apps, Stripe integrations,
// native Android, Hive offline-first, real-time sync via WebSockets/REST,
// 2+ years production stability at FIN Infocom, performance optimization
// bullet from the resume) — nothing new claimed.
const TECHNICAL_PROFILE = [
  "SaaS-based applications",
  "Payment integrations",
  "Native Android integration",
  "Offline-first systems",
  "Real-time synchronization",
  "Production stability",
  "Performance optimization",
];

// Engineering Philosophy — drafted 2026-08-25, approved by the user before
// implementation. Each principle is grounded in a specific resume/
// experience fact (see the comment per item), not invented; tags on 03/04
// are existing confirmed skills, not new ones. Row hover tint + number
// shift (2026-08-25, matching lohit_portfolio_about_engineering_philosophy)
// uses the existing accent-primary-text token at Tailwind's built-in 5%
// opacity modifier, not a new one-off color — no arrow icon, unlike the
// reference, since these rows have no real link destination (same rule
// already applied to Experience/Skills rows).
const PRINCIPLES = [
  {
    title: "Solve the System",
    description:
      "Good mobile software is more than a UI. I think about data flow, state, synchronization, and failure cases — not just what's on screen.",
    tags: [] as string[],
    // Grounded in: Clean Architecture, BLoC, the white-label platform work.
  },
  {
    title: "Build for Real Conditions",
    description:
      "Offline scenarios, unreliable networks, payment failures, and hardware constraints are part of the product — not edge cases to ignore.",
    tags: [] as string[],
    // Grounded in: Hive offline-first, Stripe reliability work, Stripe S700 hardware.
  },
  {
    title: "Keep Complexity Under Control",
    description: "Architecture should make a system easier to understand, test, change, and scale.",
    tags: ["Clean Architecture", "BLoC", "Modularity"],
    // Grounded in: the Melos monorepo, config-driven client setup.
  },
  {
    title: "Learn When the Problem Demands It",
    description:
      "New SDKs, native platform APIs, and unfamiliar integrations are problems to investigate, not reasons to stop.",
    tags: ["R&D", "SDK Integration", "Native Platform"],
    // Grounded in: the resume's own "Research & Development" skill category.
  },
];

// How I Work — each column maps directly to a resume skill category
// (Debugging & Issue Resolution, Third-party Integrations, Performance
// Optimization), approved alongside the philosophy copy above.
const HOW_I_WORK = [
  { label: "Build", description: "Architecture and predictable state management from day one." },
  {
    label: "Debug",
    description: "Stack traces, network layers, and platform specifics, resolved at the root cause.",
  },
  {
    label: "Integrate",
    description: "Third-party services, APIs, and hardware peripherals, connected cleanly.",
  },
  { label: "Improve", description: "Continuously refactoring for performance and maintainability." },
];

export default function About() {
  return (
    <Section id="about" aria-label="About">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-6">
        {/* Metadata eyebrow — design.md's "structural anchor" cadence,
            same pattern used across the pulled Stitch screens. */}
        <Text variant="metadata" as="span">
          02 — About
        </Text>

        <Heading level="headline-lg" as="h2">
          I Build for the Real World.
        </Heading>

        <Text variant="body-lg" className="max-w-2xl">
          {ABOUT_STATEMENT}
        </Text>

        <div className="mt-2 flex flex-wrap gap-2">
          {TECHNICAL_PROFILE.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <Text variant="metadata" as="span">
              Based In
            </Text>
            <Text variant="body-md">Hyderabad</Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text variant="metadata" as="span">
              Primary Focus
            </Text>
            <Text variant="body-md">Flutter</Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text variant="metadata" as="span">
              Platforms
            </Text>
            <Text variant="body-md">Android, iOS, Windows</Text>
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="mt-stack-md flex flex-col gap-8 border-t border-border pt-stack-md">
          <div className="flex flex-col gap-2">
            <Text variant="metadata" as="span">
              Engineering Philosophy
            </Text>
            <Text variant="body-lg" className="max-w-2xl">
              Architecture, reliability, performance, and the small details that determine whether
              software actually works in production.
            </Text>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {PRINCIPLES.map((principle, index) => (
              <div
                key={principle.title}
                className="group flex flex-col gap-3 py-8 px-4 -mx-4 transition-colors duration-base hover:bg-accent-primary-text/5"
              >
                <Text
                  variant="metadata"
                  as="span"
                  className="transition-transform duration-fast group-hover:translate-x-1 group-hover:text-accent-primary-text"
                >
                  {String(index + 1).padStart(2, "0")} —
                </Text>
                {/* Plain <h3>, not the Heading component — this sub-scale
                    (Tailwind's default text-2xl/text-4xl) doesn't match any
                    of our named type-scale levels, same as the source
                    design's own choice to drop to plain utility sizes here
                    rather than reuse headline-lg's full 48/64px scale. */}
                <h3 className="font-sans text-2xl font-bold tracking-tight text-text-primary lg:text-4xl">
                  {principle.title}
                </h3>
                <Text variant="body-md" className="max-w-xl">
                  {principle.description}
                </Text>
                {principle.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {principle.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Typographic break — editorial pull-statement, not a document
            heading (no new level introduced into the page outline). */}
        <p className="my-stack-md border-y border-border py-stack-md text-center font-sans text-display-lg-mobile font-display-lg leading-display-lg tracking-display-lg text-text-primary break-words lg:text-display-lg">
          The App Is Only the Surface.
        </p>

        {/* How I Work */}
        <div className="flex flex-col gap-8 border-t border-border pt-stack-md">
          <Text variant="metadata" as="span">
            How I Work
          </Text>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_I_WORK.map((item) => (
              <div key={item.label} className="flex flex-col gap-2 border-l border-border pl-4">
                <Text variant="metadata" as="span">
                  {item.label}
                </Text>
                <Text variant="body-md">{item.description}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
