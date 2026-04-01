import { Github, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="py-8 px-6 max-w-[1200px] mx-auto border-t border-white/[0.05]">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Lohit Satya Sai Kuntamukkala
      </p>
      <p className="text-sm text-muted-foreground">
        Built with Flutter love 💙
      </p>
      <div className="flex items-center gap-3">
        {/* [FILL IN] Add real URLs */}
        <a href="#" className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-blue-accent hover:border-blue-accent transition-all duration-200" aria-label="GitHub">
          <Github size={14} />
        </a>
        <a href="#" className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground hover:text-blue-accent hover:border-blue-accent transition-all duration-200" aria-label="LinkedIn">
          <Linkedin size={14} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
