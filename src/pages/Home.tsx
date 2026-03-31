import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, Zap, CreditCard, Radio, Smartphone, Code } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const wordVariants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.7, delay: 0.4 + i * 0.08, ease },
  }),
};

const heroWords = ["Lohit", "Satya", "Sai"];
const heroWords2 = ["Kuntamukkala"];

const highlights = [
  { label: "2+", sub: "Years Experience" },
  { label: "SaaS", sub: "Apps Built" },
  { label: "Stripe", sub: "Payments" },
  { label: "Real-time", sub: "Systems" },
  { label: "Cross-platform", sub: "Development" },
];

const focusAreas = [
  { icon: CreditCard, title: "SaaS & Payments", desc: "Stripe-integrated platforms with subscription billing and checkout flows." },
  { icon: Radio, title: "Real-time Systems", desc: "WebSocket and Firebase-powered live data, notifications, and collaboration." },
  { icon: Zap, title: "Performance", desc: "Optimized rendering, lazy loading, and sub-second load times." },
  { icon: Smartphone, title: "Cross-platform", desc: "Flutter apps that ship to iOS, Android, and web from a single codebase." },
];

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto relative pt-20">
        <div className="space-y-8">
          {/* Available pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-green/60 text-sm text-foreground font-medium">
              <span className="w-2 h-2 rounded-full bg-pastel-green animate-pulse" />
              Available for Work
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] text-foreground">
            {heroWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br className="hidden sm:block" />
            {heroWords2.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i + heroWords.length}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Role */}
          <motion.p
            className="text-lg md:text-xl font-medium text-muted-foreground tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Flutter Developer · Frontend Engineer
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            I build scalable SaaS applications, real-time systems, and
            payment-integrated platforms that ship to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Link
              to="/work"
              className="px-7 py-3.5 bg-foreground text-primary-foreground rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200 inline-flex items-center gap-2"
            >
              View My Work <ArrowRight size={16} />
            </Link>
            <a
              href="#"
              className="px-7 py-3.5 border border-foreground/15 text-foreground rounded-full text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Floating card */}
        <motion.div
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm max-w-[220px]">
            <p className="text-xs text-muted-foreground mb-1">Currently</p>
            <p className="text-sm font-medium text-foreground">Open to Freelance</p>
            <p className="text-xs text-muted-foreground mt-2">Flutter & React</p>
          </div>
        </motion.div>
      </section>

      {/* Impact Strip */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-pastel-blue/30 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="text-2xl md:text-3xl font-serif font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1.5 tracking-wide">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          <div className="md:col-span-3">
            <FadeIn>
              <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">About</p>
              <h2 className="font-serif text-3xl md:text-5xl font-semibold text-foreground mb-8">
                The person behind the code
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a developer who cares deeply about the products I build. With experience across SaaS applications,
                payment systems, and real-time collaborative tools, I focus on writing code that's clean, performant,
                and built to scale. Every feature I ship is crafted with the end user in mind.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:gap-3 transition-all"
              >
                Read More About Me <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
          <div className="md:col-span-2">
            <FadeIn delay={0.2}>
              <div className="bg-card rounded-2xl p-8 shadow-sm space-y-5">
                <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">What I focus on</p>
                {focusAreas.map((area) => (
                  <div key={area.title} className="flex gap-3">
                    <area.icon size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{area.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{area.desc}</p>
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
