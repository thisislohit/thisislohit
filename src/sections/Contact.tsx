import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { ListRow } from "@/components/ui/ListRow";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { social } from "@/data/social";

// scope.md IA §07 "Contact": single, deliberate closing statement +
// email/social — no contact form (mailto: only). Data is real
// (src/data/social.ts). Headline/statement/CTA copy drafted 2026-08-25,
// approved before implementation. Contact index restructured into
// ListRow-based rows (same hairline-divider pattern as Work/Experience)
// instead of a flat link row — reorganizes data already on the site,
// not new content.
//
// Deliberately not repeated: the Stitch reference reuses "Built for Real
// Users." as a closing line here too — that's already Work's closing
// line, so it isn't duplicated.
export default function Contact() {
  const contactItems: { label: string; value: string; href?: string }[] = [
    ...(social.email
      ? [{ label: "Email", value: social.email, href: `mailto:${social.email}` }]
      : []),
    ...(social.phone
      ? [{ label: "Phone", value: social.phone, href: `tel:${social.phone.replace(/\s+/g, "")}` }]
      : []),
    ...social.links.map((link) => ({ label: link.label, value: link.label, href: link.url })),
    { label: "Location", value: "Hyderabad, Telangana, India" },
  ];

  return (
    <Section id="contact" aria-label="Contact">
      <div className="col-span-4 lg:col-span-12 flex flex-col gap-6">
        <Text variant="metadata" as="span">
          07 — Contact
        </Text>

        <Heading level="headline-lg" as="h2" className="uppercase">
          Let&apos;s Build Something Useful.
        </Heading>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Text variant="body-lg" className="max-w-md">
            Have a mobile product, a difficult integration, or a system that needs to work
            better? Let&apos;s talk.
          </Text>
          {social.email && (
            <Button href={`mailto:${social.email}`} variant="primary" className="self-start">
              Start a Conversation →
            </Button>
          )}
        </div>

        <Tag variant="accent" className="mt-2 self-start">
          Available for Work
        </Tag>

        <div className="mt-4 flex flex-col divide-y divide-border border-t border-border">
          {contactItems.map((item) => (
            <ListRow key={item.label} href={item.href}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
                <Text variant="metadata" as="span" className="shrink-0 sm:w-32">
                  {item.label}
                </Text>
                <Text variant="body-md">{item.value}</Text>
              </div>
            </ListRow>
          ))}
        </div>
      </div>
    </Section>
  );
}
