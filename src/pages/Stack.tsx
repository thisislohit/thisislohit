import FadeIn from "@/components/FadeIn";

const categories = [
  { label: "Mobile", emoji: "📱", tags: ["Flutter", "Dart"], colorClass: "bg-blue-accent/[0.08] border-blue-accent/20 text-blue-accent" },
  { label: "State", emoji: "🧠", tags: ["BLoC", "GetX", "Riverpod", "Provider"], colorClass: "bg-purple-accent/[0.08] border-purple-accent/20 text-purple-accent" },
  { label: "Backend", emoji: "🔥", tags: ["Firebase", "Firestore", "Supabase"], colorClass: "bg-[rgba(251,146,60,0.08)] border-[rgba(251,146,60,0.2)] text-[#fb923c]" },
  { label: "Payments", emoji: "💳", tags: ["Stripe", "Razorpay"], colorClass: "bg-green-success/[0.08] border-green-success/20 text-green-success" },
  { label: "APIs", emoji: "🌐", tags: ["REST", "WebSocket", "GraphQL"], colorClass: "bg-cyan-accent/[0.08] border-cyan-accent/20 text-cyan-accent" },
  { label: "Frontend", emoji: "🖥", tags: ["React", "Tailwind CSS", "TypeScript"], colorClass: "bg-blue-accent/[0.08] border-blue-accent/20 text-blue-accent" },
  { label: "DevTools", emoji: "🛠", tags: ["Git", "Figma", "Postman", "VS Code", "Xcode"], colorClass: "bg-white/[0.04] border-white/[0.1] text-muted-foreground" },
];

const Stack = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
      <FadeIn>
        <p className="font-mono text-xs text-blue-accent tracking-[4px] uppercase mb-4">Tools I Master</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-4">
          My engineering toolkit.
        </h1>
        <p className="text-muted-foreground text-lg mb-16">Carefully chosen. Deeply understood.</p>
      </FadeIn>

      <div className="space-y-10">
        {categories.map((cat, i) => (
          <FadeIn key={cat.label} delay={i * 0.1}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2 md:min-w-[140px] shrink-0">
                <span>{cat.emoji}</span>
                <span className="font-mono text-[13px] text-muted-foreground uppercase tracking-[3px]">{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag) => (
                  <span key={tag} className={`inline-block px-4 py-2 rounded-full border font-mono text-[13px] font-medium cursor-default hover:scale-105 transition-all duration-200 ${cat.colorClass}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Stack;
