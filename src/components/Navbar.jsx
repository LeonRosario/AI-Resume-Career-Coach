import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-[30px] z-50 mx-auto w-full max-w-fit px-4"
    >
      <nav className="glass-nav flex items-center justify-between gap-4 px-5 py-3 rounded-[24px] md:min-w-[700px] lg:min-w-[850px] transition-all duration-300">
        <Link
          to="/"
          className="font-fustat font-extrabold text-xl md:text-2xl tracking-tight text-[#0084FF] flex items-center gap-1 select-none shrink-0"
        >
          <span>Career</span>
          <span className="text-[#60B1FF]">AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Log in
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/register"
              className="glass-badge inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold text-slate-800 transition-all duration-200"
            >
              <span>Start Free</span>
              <span className="text-[#0084FF] font-bold">→</span>
            </Link>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/40 bg-white/35 text-slate-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-nav mt-2 rounded-[24px] p-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/30" />
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-slate-600 py-2"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="glass-btn text-center rounded-2xl py-2.5 text-sm font-semibold text-white"
              >
                Start Free →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
