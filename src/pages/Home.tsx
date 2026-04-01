import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail, Smartphone, Zap, Globe, CreditCard, Star } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useEffect, useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const wordVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.3 + i * 0.08, ease },
  }),
};

const floatingBadges = [
  { label: "Flutter 3.x", icon: Smartphone, position: "top-4 -left-4 md:top-8 md:-left-8", anim: "animate-float-1" },
  { label: "Firebase", icon: Zap, position: "top-4 -right-4 md:top-8 md:-right-8", anim: "animate-float-2" },
  { label: "Stripe API", icon: CreditCard, position: "bottom-16 -left-4 md:bottom-20 md:-left-8", anim: "animate-float-3" },
  { label: "2+ Years", icon: Star, position: "bottom-16 -right-4 md:bottom-20 md:-right-8", anim: "animate-float-4" },
];

const stats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Apps Shipped" },
  { value: 3, suffix: "", label: "Payment Systems" },
  { value: 100, suffix: "%", label: "Remote Ready" },
  { value: null, display: "∞", label: "Bugs Fixed", italic: true },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const Home = () => {
  const heroLine1 = ["Flutter"];
  const heroLine2 = ["Developer."];
  const heroLine3 = ["Frontend", "Engineer."];

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center px-6 max-w-[1200px] mx-auto pt-20">
        <div className="grid md:grid-cols-[55%_45%] gap-12 items-center w-full">
          {/* Left */}
          <div className="space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-success/25 bg-green-success/[0.08] text-green-success font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-green-success animate-pulse-glow" />
                Available for work · Worldwide Remote
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold tracking-[-2px] leading-[1.05]">
              {heroLine1.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                  <motion.span className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-foreground" variants={wordVariants} initial="hidden" animate="visible" custom={i}>
                    {word}
                  </motion.span>
                </span>
              ))}
              <br />
              {heroLine2.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                  <motion.span className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-gradient-blue" variants={wordVariants} initial="hidden" animate="visible" custom={i + heroLine1.length}>
                    {word}
                  </motion.span>
                </span>
              ))}
              <br />
              {heroLine3.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                  <motion.span className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-foreground" variants={wordVariants} initial="hidden" animate="visible" custom={i + heroLine1.length + heroLine2.length}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Name */}
            <motion.p
              className="text-base text-muted-foreground tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Lohit Satya Sai Kuntamukkala
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-[17px] text-muted-foreground max-w-[480px] leading-[1.8]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              I help startups and product companies build mobile apps that
              users love — from first pixel to production. Flutter, Firebase,
              Stripe, real-time systems. Clean code. Faster than you'd expect.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <Link
                to="/work"
                className="px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-accent to-cyan-accent hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(79,142,247,0.4)] transition-all duration-200 inline-flex items-center gap-2"
              >
                View My Work <ArrowRight size={16} />
              </Link>
              <a
                href="#"
                className="px-6 py-3 rounded-full text-sm font-medium text-foreground border border-white/[0.12] hover:border-blue-accent/40 hover:bg-blue-accent/[0.06] transition-all duration-200"
              >
                Download Resume
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              className="flex gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {/* [FILL IN] Add real URLs */}
              {[
                { icon: Github, label: "GitHub", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Mail, label: "Email", href: "mailto:kuntamukkala2017@gmail.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-[38px] h-[38px] rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-blue-accent hover:border-blue-accent transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Glow behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] rounded-full bg-blue-accent opacity-20" style={{ filter: 'blur(80px)' }} />
            </div>

            {/* Photo placeholder */}
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-2xl border border-blue-accent/20 bg-gradient-to-b from-card to-background overflow-hidden">
              {/* Grid dot pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
              {/* [FILL IN] Replace with real photo: <img src="/your-photo.webp" alt="Lohit" className="w-full h-full object-cover" /> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl font-bold text-foreground/10">LSK</span>
              </div>
              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Floating badges */}
            {floatingBadges.map(({ label, icon: Icon, position, anim }) => (
              <div key={label} className={`absolute ${position} ${anim} hidden md:flex`}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/90 border border-blue-accent/20 backdrop-blur-md">
                  <Icon size={12} className="text-blue-accent" />
                  <span className="font-mono text-[11px] text-foreground">{label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Strip */}
      <section className="py-12 mt-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-card border-y border-white/[0.05] rounded-2xl py-12 px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.08} className="text-center relative">
                  {i > 0 && <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/[0.06]" />}
                  <p className={`text-4xl md:text-5xl font-display font-bold text-blue-accent ${stat.italic ? 'italic' : ''}`}>
                    {stat.value !== null ? <CountUp target={stat.value} suffix={stat.suffix} /> : stat.display}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-[2px]">{stat.label}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[60%_40%] gap-12 md:gap-16">
          <div>
            <FadeIn>
              <p className="font-mono text-xs text-blue-accent tracking-[4px] uppercase mb-4">About</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-8 tracking-tight">
                The engineer behind the app.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 border-l-2 border-blue-accent/30 pl-5">
                I'm a Flutter developer based in Hyderabad with 2+ years building production-grade
                mobile applications for startups and businesses. I specialize in apps that don't just
                work — they feel fast, look premium, and scale without drama.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-accent hover:gap-3 transition-all"
              >
                Read More About Me <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
          <div>
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <p className="font-mono text-xs text-muted-foreground tracking-[3px] uppercase">What I bring</p>
                {[
                  { icon: Smartphone, title: "Mobile-first thinking", desc: "Every UI decision made for thumbs, not cursors.", color: "text-blue-accent" },
                  { icon: Zap, title: "Production-ready code", desc: "BLoC, GetX, Riverpod — architecture that scales.", color: "text-cyan-accent" },
                  { icon: Globe, title: "Remote-native workflow", desc: "Async-first, docs-driven, timezone-flexible.", color: "text-purple-accent" },
                ].map((card) => (
                  <div key={card.title} className="glass-card-hover p-6">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-blue-accent/10 flex items-center justify-center shrink-0`}>
                        <card.icon size={18} className={card.color} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{card.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
