import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl"
    >
      <nav
        className={`glass-nav rounded-2xl px-5 py-3 flex items-center justify-between transition-shadow ${
          scrolled ? "shadow-glass-lg" : "shadow-glass"
        }`}
      >
        <Logo />

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-ink/70 hover:text-ink rounded-xl hover:bg-white/40 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/register")}>
            Get started
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav rounded-2xl mt-2 overflow-hidden shadow-glass-lg"
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-ink/70 hover:text-ink rounded-xl hover:bg-white/40"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-2 px-1">
                <Button variant="glass" size="sm" full onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button variant="primary" size="sm" full onClick={() => navigate("/register")}>
                  Get started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
