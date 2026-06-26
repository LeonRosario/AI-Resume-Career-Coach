import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Award, Zap } from "lucide-react";
import Button from "../ui/Button";
import { Typewriter } from "../ui/TypewriterText";
import HeroBackground from "../HeroBackground";

const resumeSkills = ["AI Strategy", "UX Design", "Product Ops", "Leadership"];
const resumeExperience = [
  { title: "Lead Product Designer", company: "Nexa Labs", date: "2024" },
  { title: "Senior UX Consultant", company: "Pulse AI", date: "2022" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.05fr,0.95fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 glass-soft rounded-full px-4 py-1.5 text-xs font-semibold text-sky-200/90 mb-6 backdrop-blur-md">
            <Sparkles size={14} /> Your AI career coach, on demand
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.04] tracking-tight">
            Land your next role with a resume that actually
            <Typewriter
              text={["gets read", "gets noticed", "gets interviews", "gets you hired"]}
              speed={90}
              deleteSpeed={45}
              delay={1800}
              loop={true}
              cursor="|"
              className="text-gradient"
            />
          </h1>
          <p className="mt-6 text-lg text-slate-300/90 leading-relaxed max-w-xl">
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

          <div className="flex flex-col sm:flex-row gap-6 mt-10 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-sky-300" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-sky-300" /> 60-second scan
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[520px]"
          >
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/75 shadow-[0_40px_120px_rgba(20,56,126,0.35)] ring-1 ring-sky-400/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_22%)]" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400/75 via-sky-400/75 to-cyan-300/75" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_12%,transparent_12%)]" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400/80">
                    PDF PREVIEW
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/80">Career Resume</p>
                  <h2 className="text-3xl font-semibold text-white">Jordan Ellis</h2>
                  <p className="text-sm text-slate-400">Senior Product Designer · AI Resume Coach</p>
                </div>

                <div className="glass-soft rounded-3xl border border-white/10 p-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {resumeSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Experience</p>
                    {resumeExperience.map((item) => (
                      <div key={item.title} className="rounded-3xl bg-slate-900/70 border border-white/10 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.company}</p>
                          </div>
                          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400/90">
                            {item.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Projects</p>
                      <p className="mt-3 text-sm font-semibold text-white">AI hiring dashboard</p>
                      <p className="text-xs text-slate-400 mt-1">Resume analytics for hiring teams.</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Education</p>
                      <p className="mt-3 text-sm font-semibold text-white">M.S. Design Systems</p>
                      <p className="text-xs text-slate-400 mt-1">Stanford University · 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 left-3 glass-soft rounded-3xl border border-white/10 px-4 py-3 shadow-glass-lg"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-1">
                <ShieldCheck size={14} />
                <span>ATS Score</span>
              </div>
              <p className="text-xl font-semibold text-white">92%</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-8 right-6 glass-soft rounded-3xl border border-white/10 px-4 py-3 shadow-glass-lg"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-1">
                <Award size={14} />
                <span>AI Analysis</span>
              </div>
              <p className="text-sm font-semibold text-white">Skills match</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute top-28 right-0 glass-soft rounded-3xl border border-white/10 px-4 py-3 shadow-glass-lg hidden sm:block"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-1">
                <Zap size={14} />
                <span>Skills Matched</span>
              </div>
              <p className="text-sm font-semibold text-white">8 key tags</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
              className="absolute bottom-16 left-0 glass-soft rounded-3xl border border-white/10 px-4 py-3 shadow-glass-lg hidden sm:block"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-1">
                <Sparkles size={14} />
                <span>Interview Ready</span>
              </div>
              <p className="text-sm font-semibold text-white">Confidence boost</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
