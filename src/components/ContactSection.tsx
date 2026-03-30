import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Email</p>
              <a
                href="mailto:kuntamukkala2017@gmail.com"
                className="text-foreground font-medium hover:opacity-60 transition-opacity text-lg"
              >
                kuntamukkala2017@gmail.com
              </a>
            </div>

            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Location</p>
              <p className="text-foreground font-medium text-lg">Hyderabad, India</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
