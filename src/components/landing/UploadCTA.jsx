import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GlassButton from '../ui/GlassButton';

export default function UploadCTA() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <section id="upload" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="font-fustat text-3xl font-bold text-slate-900 md:text-4xl">
            Ready to supercharge your career?
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Drop your resume below and get instant AI-powered insights — no signup required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard hover={false} className="p-10 md:p-14">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              className={`flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed px-8 py-14 transition-all duration-300 ${
                dragOver
                  ? 'border-[#0084FF] bg-[#0084FF]/5'
                  : 'border-white/60 bg-white/20'
              }`}
            >
              <motion.div
                animate={{ y: dragOver ? -4 : 0 }}
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#60B1FF] to-[#319AFF] text-white shadow-lg shadow-blue-500/25"
              >
                <Upload size={28} />
              </motion.div>
              <p className="font-fustat mb-1 text-lg font-bold text-slate-800">
                Drag & drop your resume here
              </p>
              <p className="mb-6 text-sm text-slate-500">
                Supports PDF, DOCX — up to 5MB
              </p>
              <label className="cursor-pointer">
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                <span className="glass-btn inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white">
                  <FileText size={16} />
                  Browse Files
                </span>
              </label>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <GlassButton to="/register">
                Create Free Account
                <ArrowRight size={16} />
              </GlassButton>
              <span className="text-xs text-slate-400">or continue as guest</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
