export interface Project {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

// First three sourced directly from the user-provided resume (2026-08-25)
// "Key Projects" section — these are client/employer work, so no public
// live/repo URL is set (none exists; not invented). bus-tracking-flutter
// is the user's own public GitHub repo (github.com/thisislohit), README
// confirmed directly, not guessed. `category` and `highlights` added
// 2026-08-25 to match the updated Featured Work design — every highlight
// is a direct restatement of a resume bullet, nothing new claimed.
// Deliberately NOT added here (see tasks.md): the resume's "Additional
// Contributions" (Delivery Management App, Grafterr Customer Apps, IELTS
// Learning Platform) — the user explicitly said not to add these as Work
// entries; and project images — explicitly deferred until real
// screenshots exist, not the Stitch reference's AI-generated stock photos.
export const projects: Project[] = [
  {
    name: "Grafterr POS System",
    category: "Hospitality / Point of Sale",
    description:
      "Full-featured Point of Sale system for the hospitality industry — menu management, order processing, Stripe payments, and multi-type printing (Bluetooth/LAN/USB) with an offline-first, real-time-sync experience.",
    highlights: [
      "Menu management",
      "Order processing",
      "Stripe payments",
      "Bluetooth / LAN / USB printing",
      "Offline-first operation",
    ],
    stack: ["Flutter 3", "BLoC", "Provider", "Hive", "Firebase", "REST API", "Native Android (Java)"],
    featured: true,
  },
  {
    name: "Grafterr GO!",
    category: "Payments / Mobile",
    description:
      "High-availability payment app with Stripe Tap-to-Pay integration and terminal pairing, improving payment reliability across Android and iOS.",
    highlights: [
      "Stripe Tap-to-Pay integration",
      "Hardware terminal pairing",
      "Native Android bridge",
      "Resilient workflow architecture",
    ],
    stack: ["Flutter 3", "BLoC", "Stripe SDK", "Native Java", "SharedPreferences", "REST API"],
    featured: true,
  },
  {
    name: "Collection Display App",
    category: "Real-time / Independent Project",
    description:
      "Real-time display solution for order status and promotional ads on tablets and screens, independently owned end-to-end — UI/UX, architecture, testing, and deployment.",
    highlights: ["Real-time order updates", "Offline synchronization", "Push notifications"],
    stack: ["Flutter 3", "GetX", "Dio", "Firebase", "Hive", "FCM"],
    featured: true,
  },
  {
    name: "Bus Tracking Flutter",
    category: "Open Source / Personal Project",
    description:
      "Crowd-sourced bus tracking app that averages multiple passengers' live GPS locations to estimate arrival for waiting riders.",
    highlights: ["Crowd-sourced GPS averaging", "Firebase Auth + Realtime Database", "Google Maps integration"],
    stack: ["Flutter", "Firebase Auth", "Firebase Database", "Google Maps API"],
    repoUrl: "https://github.com/thisislohit/bus-tracking-flutter",
    featured: false,
  },
];
