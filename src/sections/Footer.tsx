import { ArrowUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SocialLink } from "@/components/ui/SocialLink";
import { Text } from "@/components/ui/Text";
import { social } from "@/data/social";

// design.md "Components → Footer" / DESIGN_SYSTEM.md Part 3: minimal
// closing landmark — copyright, SocialLinks, back-to-top. Top hairline
// divider (border-border-subtle) separates it from Contact; no full-width
// fill/background, per "elements sit directly on the paper" (§1.0
// Elevation). Also carries the Branded Identity wordmark/nav treatment
// from the pulled Stitch screen (folded in here per scope.md IA decision,
// not a standalone section).
//
// Back-to-top is plain markup here, not a components/ui primitive — it's
// used exactly once and DESIGN_SYSTEM.md doesn't name it as a separate
// component, only as a bullet under Footer's own spec.
export default function Footer() {
  const socialLinks = [
    ...(social.email ? [{ label: "Email", href: `mailto:${social.email}` }] : []),
    ...(social.phone
      ? [{ label: "Phone", href: `tel:${social.phone.replace(/\s+/g, "")}` }]
      : []),
    ...social.links.map((link) => ({ label: link.label, href: link.url })),
  ];

  return (
    <Section as="footer" className="border-t border-border-subtle">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Full name, matching the updated bottom-bar copyright convention
            (2026-08-25, stitch-design/html/hero-v2-availability.html) —
            was "thisislohit" (the site's established brand mark); both are
            real, non-invented identifiers, this just matches the newer
            reference. */}
        <Text variant="metadata" as="span">
          © {new Date().getFullYear()} Lohit Satya Sai Kuntamukkala
        </Text>

        <div className="flex flex-wrap items-center gap-6">
          <Text variant="metadata" as="span">
            Location: Hyderabad
          </Text>

          {socialLinks.map((link) => (
            <SocialLink key={link.href} label={link.label} href={link.href} />
          ))}

          <a
            href="#hero"
            aria-label="Back to top"
            className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-sm border border-transparent text-text-primary transition-colors duration-fast hover:border-border"
          >
            <ArrowUp size={20} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}
