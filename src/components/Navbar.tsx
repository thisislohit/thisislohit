import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = ["Product", "Features", "Integrations", "Testimonials", "Pricing"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-4" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-6">
          <a href="#" className="text-xl font-bold tracking-tight text-slate-900">Loomify</a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                {link}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <button className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,23,42,0.22)] transition-all hover:scale-[1.02] hover:shadow-[0_16px_36px_rgba(15,23,42,0.28)]">
              Start Free Trial
            </button>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-sm font-semibold text-slate-900">Menu</button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/30 p-6 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mt-20 rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a key={link} href="#" className="text-base text-slate-700">{link}</a>
                ))}
                <button className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Start Free Trial</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
