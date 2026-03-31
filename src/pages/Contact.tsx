import FadeIn from "@/components/FadeIn";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

const Contact = () => (
  <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
    <div className="max-w-2xl mx-auto text-center">
      <FadeIn>
        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">Contact</p>
        <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-6">
          Let's Build Something
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Open to full-time roles, freelance projects, and interesting conversations.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <a
          href="mailto:kuntamukkala2017@gmail.com"
          className="inline-block font-serif text-2xl md:text-3xl font-semibold text-foreground hover:text-muted-foreground transition-colors relative group"
        >
          kuntamukkala2017@gmail.com
          <span className="absolute left-0 -bottom-1 w-full h-px bg-foreground/20 group-hover:bg-foreground transition-colors" />
        </a>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="flex justify-center gap-4 mt-10">
          <a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/15 rounded-full text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/15 rounded-full text-sm font-medium text-foreground hover:bg-foreground/5 transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.35}>
        <div className="mt-12 flex justify-center items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>Hyderabad, India 🇮🇳</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="mt-10 bg-card rounded-2xl p-6 shadow-sm inline-block">
          <p className="text-sm text-foreground font-medium">✨ Currently available for new projects</p>
        </div>
      </FadeIn>
    </div>
  </div>
);

export default Contact;
