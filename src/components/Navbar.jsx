import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Resume Analyzer', href: '#' },
    { name: 'Career Roadmap', href: '#' },
    { name: 'Interview', href: '#' },
    { name: 'Pricing', href: '#' }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-[30px] z-50 mx-auto w-full max-w-fit px-4"
    >
      <nav className="glass-nav flex items-center justify-between gap-6 md:gap-12 px-6 py-3 rounded-2xl md:min-w-[700px] lg:min-w-[850px] transition-all duration-300">
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="#" className="font-fustat font-extrabold text-xl md:text-2xl tracking-tight text-[#0084FF] flex items-center gap-1 select-none">
            <span>Career</span>
            <span className="text-[#60B1FF]">AI</span>
          </a>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Glassy CTA */}
        <div>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="glass-badge inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold text-slate-800 transition-all duration-200 cursor-pointer"
          >
            <span>Start Free</span>
            <span className="text-[#0084FF] font-bold">→</span>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
