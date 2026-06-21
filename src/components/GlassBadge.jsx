import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function GlassBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="glass-badge inline-flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-700 select-none cursor-default transition-all duration-300"
    >
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={15} fill="#FF801E" color="#FF801E" className="drop-shadow-sm" />
        ))}
      </div>
      <span className="tracking-tight text-[13px] md:text-sm font-semibold">
        Rated <span className="text-[#FF801E]">4.9/5</span> by 2700+ job seekers
      </span>
    </motion.div>
  );
}
