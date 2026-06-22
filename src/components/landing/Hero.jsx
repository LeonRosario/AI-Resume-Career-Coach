import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import ScoreRing from "../ui/ScoreRing";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 glass-soft rounded-full px-4 py-1.5 text-xs font-semibold text-primary-700 mb-6">
            <Sparkles size={14} /> Your AI career coach, on demand
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.08] tracking-tight">
            Land your next role with a resume that actually{" "}
            <span className="text-gradient">gets read</span>
          </h1>
          <p className="mt-6 text-lg text-ink/60 leading-relaxed max-w-xl">
            CareerAI scans your resume against real job descriptions, closes your
            skill gaps with a guided roadmap, and rehearses your interview answers
            — so you walk in ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Button
              variant="primary"
              size="lg"
              icon={Upload}
              onClick={() => navigate("/register")}
            >
              Upload your resume — free
            </Button>
            <Button
              variant="glass"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate("/login")}
            >
              See how it works
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-10 text-sm text-ink/45">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-primary-500" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-primary-500" /> 60-second scan
            </span>
          </div>
        </motion.div>

        {/* Right: floating signature visual — live resume scan card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-strong rounded-glass p-6 shadow-glass-lg relative overflow-hidden"
          >
            {/* scan line */}
            <div className="absolute inset-x-6 top-0 h-full pointer-events-none overflow-hidden rounded-glass">
              <div className="w-full h-24 bg-gradient-to-b from-primary-300/40 to-transparent animate-scanline" />
            </div>

            <div className="flex items-center justify-between mb-5 relative">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              </div>
              <span className="text-xs font-medium text-ink/40">resume_scan.ai</span>
            </div>

            <div className="flex items-center gap-6 relative">
              <ScoreRing value={92} size={120} label="ATS Score" />
              <div className="flex-1 space-y-2.5">
                {["React", "Node.js", "Leadership"].map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex items-center gap-2 glass-soft rounded-xl px-3 py-2"
                  >
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-xs font-medium text-ink/70">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* floating mini card */}
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -left-8 glass-strong rounded-2xl px-4 py-3 shadow-glass-lg hidden sm:flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-ink">Match found</p>
              <p className="text-[11px] text-ink/45">94% — Software Engineer</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
