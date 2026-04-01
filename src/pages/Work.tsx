import { Github, ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const projects = [
  {
    category: "SaaS · Flutter · Firebase",
    name: "Real-time POS System",
    description: "Cross-platform point-of-sale application for the hospitality industry with real-time order management and kitchen display integration.",
    impact: [
      "Built real-time order sync across multiple restaurant terminals",
      "Reduced order processing time by 40% with optimized state management",
      "Shipped to iOS, Android, and Web from single Flutter codebase",
    ],
    tech: ["Flutter", "Firebase", "BLoC", "WebSocket"],
    platform: "iOS + Android + Web",
  },
  {
    category: "Fintech · Stripe · Flutter",
    name: "Payment-Integrated Platform",
    description: "SaaS billing and payment platform with Stripe and Razorpay integration, handling live transactions and subscription management.",
    impact: [
      "Integrated Stripe Connect for marketplace-style payouts",
      "Built subscription billing with automated invoice generation",
      "Processed 1000+ live transactions in first month",
    ],
    tech: ["Flutter", "Stripe", "Razorpay", "Firebase"],
    platform: "iOS + Android",
  },
  {
    category: "Real-time · WebSocket · Flutter",
    name: "Live Order Management",
    description: "Real-time kitchen display and order notification system with WebSocket-powered instant updates across devices.",
    impact: [
      "Achieved sub-200ms order notification delivery",
      "Built kitchen display system used across multiple locations",
      "Implemented offline-first architecture with sync recovery",
    ],
    tech: ["Flutter", "WebSocket", "GetX", "REST API"],
    platform: "Mobile + Kitchen Display",
  },
  {
    category: "Cross-platform · Flutter",
    name: "Collection Display App",
    description: "Cross-platform application for managing and displaying product collections with advanced filtering and search capabilities.",
    impact: [
      "Designed responsive UI adapting to phone, tablet, and web",
      "Built advanced search with real-time filtering across 1000+ items",
      "Implemented lazy loading for optimal performance on low-end devices",
    ],
    tech: ["Flutter", "Dart", "Provider", "REST API"],
    platform: "iOS + Android + Web",
  },
];

const Work = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
      <FadeIn>
        <p className="font-mono text-xs text-blue-accent tracking-[4px] uppercase mb-4">Selected Work</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
          Apps I've shipped.
        </h1>
        <p className="text-muted-foreground text-lg mb-16">Real products. Real users. Real impact.</p>
      </FadeIn>

      <div className="space-y-16">
        {projects.map((project, i) => (
          <FadeIn key={project.name} delay={i * 0.1}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="glass-card-hover aspect-[4/3] relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-5xl md:text-6xl font-bold text-foreground/[0.04] select-none">{project.name}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-2 flex-wrap p-8">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-blue-accent/[0.08] border border-blue-accent/20 text-blue-accent font-mono text-[11px]">{t}</span>
                    ))}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-card/90 border border-white/[0.08] font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{project.category}</span>
                  </div>
                </div>
              </div>

              <div className={`space-y-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <p className="font-mono text-xs text-blue-accent tracking-[2px] uppercase">{project.category}</p>
                <h3 className="font-display text-2xl md:text-4xl font-semibold text-foreground tracking-tight">{project.name}</h3>
                <p className="text-muted-foreground text-[17px] leading-[1.7]">{project.description}</p>
                <div className="space-y-2">
                  {project.impact.map((point) => (
                    <p key={point} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-blue-accent shrink-0">→</span>
                      {point}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-blue-accent/[0.08] border border-blue-accent/20 text-blue-accent font-mono text-[11px]">{t}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-mono">Platform: {project.platform}</p>
                <div className="flex gap-3 pt-1">
                  <a href="#" className="p-2 rounded-lg border border-white/[0.08] text-muted-foreground hover:text-blue-accent hover:border-blue-accent/25 transition-all" aria-label="GitHub"><Github size={16} /></a>
                  <a href="#" className="p-2 rounded-lg border border-white/[0.08] text-muted-foreground hover:text-blue-accent hover:border-blue-accent/25 transition-all" aria-label="Live demo"><ExternalLink size={16} /></a>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Work;
