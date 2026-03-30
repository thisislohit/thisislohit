import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";
import { Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <FadeIn>
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          Contact
        </p>
      </FadeIn>

      <div className="mb-16">
        <TextReveal
          text="Let's Work Together"
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
          delay={0}
          as="h2"
        />
      </div>

      <FadeIn delay={0.2}>
        <div className="max-w-xl mx-auto text-center space-y-8">
          <p className="text-muted-foreground leading-relaxed text-lg">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:kuntamukkala2017@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              kuntamukkala2017@gmail.com
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Hyderabad, India
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
