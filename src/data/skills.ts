export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

// Sourced directly from the user-provided resume (2026-08-25), organized
// by actual usage. The resume's own "Research & Development",
// "Debugging & Issue Resolution", and "Basic CI/CD Knowledge" headings
// were traits/practices rather than tag-able technologies, so their
// concrete tools (e.g. Fastlane) were folded into Tools & Workflow instead
// of kept as separate categories — every individual skill name is still
// exactly as given, only the grouping was condensed.
//
// `description` added 2026-08-25 to match the updated Expertise design's
// "Technical Capability Index" format — each is a direct restatement of
// resume/experience content already used elsewhere on the site (e.g.
// experience.ts's "offline-first real-time sync", "Tap-to-Pay integration"),
// not a new claim. Deliberately NOT added: Riverpod, SQLite — present in
// the Stitch reference but not in the user's confirmed skills list.
export const skillGroups: SkillGroup[] = [
  {
    category: "Mobile Development",
    description: "Building production-grade cross-platform applications with Flutter and Dart, plus native Android and iOS work.",
    skills: ["Flutter 3", "Dart", "Android (Java)", "iOS"],
  },
  {
    category: "State Management",
    description: "Structuring maintainable apps around predictable state and modular, testable business logic.",
    skills: ["BLoC", "Provider", "GetX"],
  },
  {
    category: "Networking & Real-time",
    description: "Real-time data sync and reliable networking layers for live order updates and payment confirmations.",
    skills: ["WebSockets", "REST APIs", "Dio"],
  },
  {
    category: "Offline & Data Sync",
    description: "Offline-first storage and background synchronization so apps keep working on unreliable connections.",
    skills: ["Hive", "Real-time Data Sync"],
  },
  {
    category: "Payments",
    description: "Integrating Stripe payment infrastructure and mobile hardware, including Tap-to-Pay and terminal pairing.",
    skills: ["Stripe SDK", "Tap-to-Pay", "Terminal Pairing", "Apple Pay", "Google Pay"],
  },
  {
    category: "Firebase & Integrations",
    description: "Firebase-backed auth, data, and push notifications, bridged to native platform code via Platform Channels.",
    skills: ["Firebase Auth", "Firestore", "FCM", "Deep Linking", "Platform Channels"],
  },
  {
    category: "Tools & Workflow",
    description: "Version control, IDE tooling, and Fastlane-driven build/release automation.",
    skills: ["Git", "GitHub", "Android Studio", "VS Code", "Fastlane", "SharedPreferences"],
  },
];
