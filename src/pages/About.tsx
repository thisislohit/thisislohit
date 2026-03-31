import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Globe, Clock } from "lucide-react";

const values = [
  { title: "Engineering Excellence", desc: "I write code that's maintainable, testable, and built to last. Clean architecture isn't optional — it's the foundation." },
  { title: "User-Centric Thinking", desc: "Every technical decision is filtered through the lens of user experience. Performance, accessibility, and delight." },
  { title: "Shipping Velocity", desc: "I believe in shipping early, iterating fast, and maintaining quality. Production is the ultimate test environment." },
];

const About = () => (
  <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
    <FadeIn>
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">About</p>
      <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-16">
        The person behind<br />the code
      </h1>
    </FadeIn>

    <div className="grid md:grid-cols-5 gap-12 md:gap-16">
      {/* Bio */}
      <div className="md:col-span-3 space-y-6">
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            I'm Lohit Satya Sai Kuntamukkala — a developer based in Hyderabad, India, passionate about
            building software that makes a real difference. My journey started with mobile development in
            Flutter, and has expanded into full-stack engineering across web and mobile platforms.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            I'm drawn to complex problems — SaaS platforms with intricate billing logic, real-time systems
            that need to feel instant, and fintech applications where reliability isn't negotiable. I've
            integrated Stripe payments, built WebSocket-powered live features, and shipped apps used in
            production across the hospitality industry.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            My approach to engineering is rooted in performance and user experience. I believe great software
            is invisible — it just works. Clean architecture, thoughtful state management, and obsessive
            attention to detail are what separate good products from exceptional ones.
          </p>
        </FadeIn>
      </div>

      {/* Details card */}
      <div className="md:col-span-2">
        <FadeIn delay={0.2}>
          <div className="bg-card rounded-2xl p-8 shadow-sm space-y-5 sticky top-28">
            <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">Details</p>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Hyderabad, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">English, Hindi, Telugu</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Available for new projects</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>

    {/* What I bring */}
    <div className="mt-24">
      <FadeIn>
        <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-8">What I bring to a team</p>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <FadeIn key={v.title} delay={i * 0.1}>
            <div className="bg-card rounded-2xl p-8 shadow-sm h-full">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>

    {/* CTA */}
    <FadeIn>
      <div className="mt-24 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">Let's build something together</h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-primary-foreground rounded-full text-sm font-medium hover:scale-105 transition-transform"
        >
          Get in Touch <ArrowRight size={16} />
        </Link>
      </div>
    </FadeIn>
  </div>
);

export default About;
