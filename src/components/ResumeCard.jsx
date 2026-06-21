import React from 'react';
import { CheckCircle2, AlertTriangle, Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08)' }}
      className="glass-card w-full max-w-sm p-6 relative overflow-hidden transition-all duration-300 shadow-lg shadow-slate-100/50 border border-white/20"
    >
      {/* Background glow inside card */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#0084FF]/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Header Info */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <Award size={14} className="text-[#0084FF]" />
            <span>AI Resume Review</span>
          </div>
          <h3 className="font-fustat font-bold text-lg text-slate-800">Resume Score</h3>
        </div>
        <div className="flex items-center gap-1 bg-green-50/80 border border-green-200/50 px-2.5 py-1 rounded-full text-green-600 font-semibold text-xs backdrop-blur-sm">
          <CheckCircle2 size={13} className="text-green-500" />
          <span>ATS Compatible</span>
        </div>
      </div>

      {/* Circle Score & Primary metrics */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative flex items-center justify-center w-20 h-20">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: '92, 100' }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              className="text-[#0084FF]"
              strokeWidth="3.5"
              strokeDasharray="92, 100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-center">
            <span className="font-fustat font-extrabold text-2xl text-slate-800">92</span>
            <span className="text-[10px] text-slate-400 block -mt-1">/100</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="text-xs text-slate-500 font-medium">Recommended Role:</div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
            <Briefcase size={15} className="text-slate-600" />
            <span>Full Stack Developer</span>
          </div>
        </div>
      </div>

      {/* Missing Skills Section */}
      <div className="pt-4 border-t border-slate-200/50">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
          <AlertTriangle size={14} className="text-[#FF801E]" />
          <span>Missing Skills to reach 98/100:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Docker', 'AWS'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-white/60 border border-slate-200/40 shadow-sm"
            >
              + {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
