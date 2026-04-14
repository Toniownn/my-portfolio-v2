import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { siteConfig } from "@/lib/data";

const navLinks = siteConfig.navLinks;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled
    ? "text-foreground"
    : theme === "dark" ? "text-white" : "text-foreground";
  const mutedColor = scrolled
    ? "text-muted hover:text-foreground"
    : theme === "dark" ? "text-white/70 hover:text-white" : "text-foreground/60 hover:text-foreground";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between h-14 sm:h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className={`font-serif font-bold text-lg tracking-wide transition-colors duration-300 ${textColor}`}
        >
          CARL
        </a>

        {/* Center nav links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[13px] uppercase tracking-[0.15em] font-sans transition-colors duration-300 ${mutedColor}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-4">
          {/* CTA — desktop */}
          <a
            href="#contact"
            className={`hidden lg:inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.12em] font-sans border rounded-full px-5 py-2 transition-all duration-300 ${
              scrolled
                ? "text-foreground border-foreground/25 hover:bg-foreground hover:text-background"
                : theme === "dark"
                  ? "text-white border-white/25 hover:bg-white hover:text-black"
                  : "text-foreground border-foreground/25 hover:bg-foreground hover:text-background"
            }`}
          >
            Hire Me
            <ArrowUpRight size={14} />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors duration-300 ${mutedColor}`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${textColor}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-5 right-6 text-foreground p-2"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-2xl uppercase tracking-[0.15em] text-foreground hover:text-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="inline-flex items-center gap-2 text-lg uppercase tracking-[0.12em] border border-foreground/30 rounded-full px-6 py-2.5 hover:bg-foreground hover:text-background transition-all"
                onClick={() => setIsOpen(false)}
              >
                Hire Me
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
