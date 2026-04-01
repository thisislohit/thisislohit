import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const ease = [0.16, 1, 0.3, 1] as const;

const wordVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease },
  }),
};

const Contact = () => {
  const line1 = ["Let's", "build", "something"];
  const line2 = ["remarkable."];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-40">
      <div className="text-center max-w-[700px] mx-auto">
        <FadeIn>
          <p className="font-mono text-xs text-blue-accent tracking-[4px] uppercase mb-8">Get in Touch</p>
        </FadeIn>

        <h1 className="font-display text-4xl md:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.1] mb-6">
          {line1.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span className="inline-block text-foreground" variants={wordVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                {word}
              </motion.span>
            </span>
          ))}
          <br />
          {line2.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span className="inline-block text-gradient-blue" variants={wordVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + line1.length}>
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <FadeIn delay={0.3}>
          <p className="text-lg text-muted-foreground max-w-[520px] mx-auto mb-12">
            Open to full-time roles, freelance contracts, and interesting
            problems — worldwide.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="glass-card border-green-success/20 p-8 max-w-[480px] mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-success animate-pulse-glow" />
              <span className="font-mono text-sm text-green-success">Currently available</span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Hyderabad, India · Open to remote worldwide</p>
            <p className="text-xs text-muted-foreground mb-6">Typical response time: under 24 hours</p>

            <div className="border-t border-white/[0.06] pt-6">
              <a
                href="mailto:kuntamukkala2017@gmail.com"
                className="font-display text-xl md:text-2xl font-semibold text-blue-accent hover:underline decoration-blue-accent/30 underline-offset-4 transition-all"
              >
                kuntamukkala2017@gmail.com
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Mail, label: "Email", href: "mailto:kuntamukkala2017@gmail.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-blue-accent hover:border-blue-accent hover:bg-blue-accent/[0.08] hover:scale-[1.08] transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
