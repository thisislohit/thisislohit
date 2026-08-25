import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Link } from "@/components/ui/Link";

// scope.md IA §01 "Hero", updated 2026-08-25 to match a richer Hero design
// the user supplied directly (stitch-design/html/hero-v2-availability.html
// + DESIGN.md, not from the live Stitch project's own screen list — a
// separate export). Full name as the giant display statement, role as a
// secondary heading, "Available for Work" status (confirmed true by the
// user, not inferred), and a technical-signals grid.
//
// Deliberate deviations from that reference, not oversights:
// - The source's two separate <h1> tags ("LOHIT" / "KUNTAMUKKALA") are
//   merged into one real <h1> — the page's single heading-level-1,
//   required for correct heading hierarchy (DESIGN_SYSTEM.md a11y rules).
//   Visual line-break is done with block spans, not a second heading.
// - "Let's Talk" keeps this site's already-established hover-only
//   underline (Link component) rather than the source's always-on
//   underline — design.md's prose explicitly says "no persistent
//   underline," which the new screen doesn't override elsewhere.
// - CTA button typography (metadata-style, uppercase, wide-tracked) is
//   applied locally to these two Hero buttons only, not to Button's
//   shared base style — Contact's email Button wasn't part of this
//   update, so its existing body-md style is left alone rather than
//   silently changed everywhere.
export default function Hero() {
  return (
    <Section id="hero" aria-label="Hero">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Text variant="metadata" as="span">
            01 — Mobile Engineering
          </Text>
          <div className="h-px max-w-md flex-1 bg-border" />
        </div>

        <Heading level="hero-name" as="h1" className="uppercase">
          <span className="block">Lohit</span>
          <span className="relative block text-right lg:-mr-[10vw] lg:text-left">
            Kuntamukkala
            <span
              className="ml-4 inline-block h-3 w-3 animate-pulse bg-accent-primary align-middle"
              aria-hidden="true"
            />
          </span>
        </Heading>

        <div className="flex flex-col gap-6 lg:max-w-xl lg:self-end">
          <Tag variant="accent">Available for Work</Tag>

          <Heading level="headline-lg" as="h2" className="uppercase leading-none">
            Flutter Developer
          </Heading>

          <Text variant="metadata" as="span">
            3+ years building production mobile software
          </Text>

          <Text variant="body-lg" className="max-w-[520px]">
            Building scalable cross-platform mobile applications, payment systems, offline-first
            experiences, and production software with Flutter.
          </Text>

          <div className="flex flex-wrap items-center gap-8">
            <Button
              href="#work"
              variant="primary"
              className="!font-metadata !text-metadata uppercase tracking-metadata"
            >
              View My Work →
            </Button>
            <Link href="#contact" className="inline-flex items-center gap-1 uppercase">
              <Text variant="metadata" as="span" className="!text-accent-primary-text">
                Let&apos;s Talk
              </Text>
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-metadata font-metadata uppercase tracking-metadata text-text-muted">
                Domain
              </span>
              <span className="font-sans text-metadata font-metadata uppercase tracking-metadata text-text-primary">
                Mobile / Flutter / Architecture
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-sans text-metadata font-metadata uppercase tracking-metadata text-text-muted">
                Platforms
              </span>
              <span className="font-sans text-metadata font-metadata uppercase tracking-metadata text-text-primary">
                Android · iOS · Windows
              </span>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="inline-flex items-center gap-2 self-start font-sans text-metadata font-metadata uppercase tracking-metadata text-text-primary transition-colors duration-fast hover:text-accent-primary"
        >
          Scroll to Explore
          <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
