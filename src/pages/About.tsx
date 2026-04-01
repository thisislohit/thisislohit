import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, Zap, Globe } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const About = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
      <FadeIn>
        <p className="font-mono text-xs text-blue-accent tracking-[4px] uppercase mb-4">About</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-12">
          The engineer behind the app.
        </h1>
      </FadeIn>

      <div className="grid md:grid-cols-[60%_40%] gap-16">
        <div className="space-y-8">
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground leading-[1.8] text-[17px] border-l-2 border-blue-accent/30 pl-5">
              I'm a Flutter developer based in Hyderabad, India, with 2+ years building
              production-grade mobile applications for startups and businesses. I specialize
              in apps that don't just work — they feel fast, look premium, and scale without drama.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground leading-[1.8] text-[17px] border-l-2 border-blue-accent/30 pl-5">
              My work spans real-time order management systems, Stripe-integrated payment
              platforms, SaaS tools for the hospitality industry, and cross-platform apps
              used daily by real people. I work with founders who care about quality — and move fast.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-muted-foreground leading-[1.8] text-[17px] border-l-2 border-blue-accent/30 pl-5">
              When I'm not building in Flutter, I'm obsessing over micro-interactions,
              architecture decisions, and shipping things that actually make it to the App Store.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.2}>
            <div className="glass-card p-6 space-y-4">
              <p className="font-mono text-xs text-muted-foreground tracking-[3px] uppercase">Details</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="text-foreground">Hyderabad, India 🇮🇳</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Languages</span><span className="text-foreground">English, Hindi, Telugu</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Availability</span><span className="text-green-success">Open to work</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Work style</span><span className="text-foreground">Remote-first</span></div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-mono text-xs text-muted-foreground tracking-[3px] uppercase mb-3">What I bring</p>
            <div className="space-y-3">
              {[
                { icon: Smartphone, title: "Mobile-first thinking", desc: "Every UI decision made for thumbs, not cursors." },
                { icon: Zap, title: "Production-ready code", desc: "BLoC, GetX, Riverpod — architecture that scales." },
                { icon: Globe, title: "Remote-native workflow", desc: "Async-first, docs-driven, timezone-flexible." },
              ].map((card) => (
                <div key={card.title} className="glass-card-hover p-5">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-accent/10 flex items-center justify-center shrink-0">
                      <card.icon size={16} className="text-blue-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{card.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-24 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-accent to-cyan-accent hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(79,142,247,0.4)] transition-all duration-200"
          >
            Let's build something together <ArrowRight size={16} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
};

export default About;
