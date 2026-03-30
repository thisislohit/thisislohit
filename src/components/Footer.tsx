import FadeIn from "./FadeIn";

const Footer = () => (
  <footer className="py-12 px-6 md:px-12 max-w-6xl mx-auto border-t border-border">
    <FadeIn>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Lohit Satya Sai Kuntamukkala
        </p>
        <p className="text-sm text-muted-foreground">
          Hyderabad, India
        </p>
      </div>
    </FadeIn>
  </footer>
);

export default Footer;
