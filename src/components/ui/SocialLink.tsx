import { ExternalLink, Mail, Phone } from "lucide-react";
import { Link } from "./Link";

interface SocialLinkProps {
  label: string;
  href: string;
}

// design.md "Icons": functional indicators, not decorative. lucide-react
// (checked directly — no Github/Linkedin/Twitter export exists in the
// installed package; brand/logo icons aren't part of this icon set at all)
// has no brand logos, which lines up with that rule rather than fighting
// it: every SocialLink gets a generic, functional icon — Mail for
// mailto:, Phone for tel:, ExternalLink for anything else (DESIGN_SYSTEM.md
// Part 3). Only external (http/https) links get target="_blank" — mailto:
// and tel: stay in-tab, matching normal browser/OS handling for those
// schemes.
export function SocialLink({ label, href }: SocialLinkProps) {
  const isEmail = href.startsWith("mailto:");
  const isPhone = href.startsWith("tel:");
  const isExternal = !isEmail && !isPhone;
  const Icon = isEmail ? Mail : isPhone ? Phone : ExternalLink;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2"
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
