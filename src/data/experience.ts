export interface ExperienceEntry {
  role: string;
  company: string;
  project: string;
  startDate: string;
  endDate: string | "Present";
  impact: string;
  tags: string[];
}

// Sourced directly from the user-provided resume (2026-08-25). Impact
// lines are condensed from the resume's own bullet points, not invented.
// `project` and `tags` added 2026-08-25 to match the updated Experience
// Timeline design — every tag is a direct restatement of a resume bullet
// for that specific role (e.g. Crowdnetic's "Design Token architecture"
// and "Tap-to-Pay and payment solutions" bullets, both in the original
// resume for this role, not carried over from a different one).
export const experience: ExperienceEntry[] = [
  {
    role: "Flutter Developer",
    company: "Crowdnetic Technologies Pvt Ltd.",
    project: "FinMkt",
    startDate: "Jan 2026",
    endDate: "Present",
    impact:
      "Architected a white-label Flutter platform with a Melos monorepo, config-driven client branding, and Fastlane-automated multi-client releases.",
    tags: ["White-label", "Monorepo", "Melos", "Design Tokens", "Fastlane", "Tap-to-Pay"],
  },
  {
    role: "Flutter Developer",
    company: "Abilio IT Solutions",
    project: "Sevaki",
    startDate: "Aug 2025",
    endDate: "Jan 2026",
    impact:
      "Built the Sevaki Project using Clean Architecture and Flutter BLoC, focused on modular, maintainable, testable app development.",
    tags: ["Clean Architecture", "Flutter BLoC", "Sevaki"],
  },
  {
    role: "Flutter Developer",
    company: "FIN Infocom Pvt Ltd",
    project: "Grafterr",
    startDate: "Apr 2023",
    endDate: "Jul 2025",
    impact:
      "Led Grafterr's SaaS hospitality apps across Android, iOS, Windows, and custom Stripe S700 hardware, including Tap-to-Pay integration and offline-first real-time sync.",
    tags: [
      "Android",
      "iOS",
      "Windows",
      "Custom Android",
      "Stripe",
      "Tap-to-Pay",
      "Offline-first",
      "Hive",
      "WebSockets",
      "Performance Profiling",
    ],
  },
];
