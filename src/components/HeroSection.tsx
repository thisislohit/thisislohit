import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import RoleTransition from "./RoleTransition";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto relative">
      {/* Subtle gradient highlight behind hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[700px] h-[400px] bg-pastel-blue/30 rounded-full blur-3xl" />
      </div>

      <div className="space-y-8">
        <TextReveal
          text="Lohit Satya Sai Kuntamukkala"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-foreground"
          delay={0.3}
          staggerDelay={0.1}
        />

        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Flutter Developer &nbsp;|&nbsp; Frontend Engineer
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Building scalable SaaS applications, real-time systems, and
          payment-integrated platforms with clean architecture.
        </motion.p>

        <motion.div
          className="flex gap-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-foreground/20 text-foreground rounded-full text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
