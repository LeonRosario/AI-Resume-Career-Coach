import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

const navLinks = [
  { label: "Features",     href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing",      href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl"
    >
      {/* ── Main nav bar ── */}
      <nav
        className={[
          "glass-nav rounded-2xl px-5 py-3",
          "flex items-center justify-between",
          "transition-all duration-300",
          scrolled ? "shadow-glass-lg" : "shadow-glass",
        ].join(" ")}
      >
        <Logo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <motion.button
              key={link.label}
              onClick={() => handleNav(link.href)}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative px-4 py-2 text-sm font-medium text-muted hover:text-ink rounded-xl transition-colors duration-200"
            >
              {link.label}
              <motion.span
                className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary-500"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                layoutId="nav-indicator"
              />
            </motion.button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              Log in
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/register")}
            >
              Get started free
            </Button>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="md:hidden p-2 -mr-1 text-ink rounded-xl hover:bg-primary-50 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass-nav rounded-2xl mt-2 overflow-hidden shadow-glass-lg"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className="flex items-center px-4 py-3 text-sm font-medium text-muted hover:text-ink rounded-xl hover:bg-primary-50/70 transition-all text-left"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Divider */}
              <div className="section-divider my-2" />

              <div className="grid grid-cols-2 gap-2 px-1">
                <Button
                  variant="glass"
                  size="sm"
                  full
                  onClick={() => { setOpen(false); navigate("/login"); }}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  full
                  onClick={() => { setOpen(false); navigate("/register"); }}
                >
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
