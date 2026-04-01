import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Stack", path: "/stack" },
  { label: "Experience", path: "/experience" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 backdrop-blur-xl bg-[rgba(8,8,16,0.7)] border-b border-white/[0.05]"
            : "py-4 bg-transparent"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[56px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0.5">
            <span className="font-display text-lg font-bold text-foreground tracking-tight">LSK</span>
            <span className="w-[2px] h-4 bg-blue-accent animate-blink ml-0.5" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-sm transition-colors duration-200 group"
              >
                <span className={
                  location.pathname === link.path
                    ? "text-blue-accent font-medium"
                    : "text-muted-foreground hover:text-blue-accent"
                }>
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-accent"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex px-5 py-2 rounded-full text-sm font-medium text-blue-accent border border-blue-accent/50 bg-blue-accent/[0.08] hover:bg-blue-accent/[0.18] hover:shadow-[0_0_20px_rgba(79,142,247,0.3)] transition-all duration-200"
            >
              Hire Me →
            </Link>
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 bg-card border-l border-white/[0.06] p-8 pt-24 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-display font-medium ${
                      location.pathname === link.path
                        ? "text-blue-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                to="/contact"
                className="mt-auto px-5 py-3 rounded-full text-sm font-medium text-blue-accent border border-blue-accent/50 bg-blue-accent/[0.08] text-center"
              >
                Hire Me →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
