import { motion } from "framer-motion";
import { Upload, ScanLine, TrendingUp } from "lucide-react";
import Reveal from "../ui/Reveal";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload your resume",
    desc: "Drop in a PDF — we parse your experience, skills, and projects in seconds.",
    color: "from-primary-500 to-primary-600",
    shadow: "shadow-[0_8px_24px_rgba(37,99,235,0.28)]",
  },
  {
    icon: ScanLine,
    step: "02",
    title: "Get scanned & scored",
    desc: "See your ATS score, matched skills, and exactly what's missing for your target role.",
    color: "from-indigo-500 to-violet-600",
    shadow: "shadow-[0_8px_24px_rgba(99,102,241,0.28)]",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Close the gap & apply",
    desc: "Follow your roadmap, rehearse interviews, and apply to roles ranked by real fit.",
    color: "from-violet-500 to-violet-700",
    shadow: "shadow-[0_8px_24px_rgba(124,58,237,0.28)]",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal variant="fade-up">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brand-pill mb-4 inline-flex"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-ink mt-4"
          >
            Three steps to your next offer
          </motion.h2>
        </div>
        </Reveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-10 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px hidden md:block"
            style={{ background: "linear-gradient(90deg, rgba(37,99,235,0.2), rgba(79,70,229,0.2), rgba(124,58,237,0.2))" }}
            aria-hidden="true"
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.13, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="glass rounded-[20px] p-8 text-center relative transition-shadow duration-300 hover:shadow-glass-lg"
            >
              {/* Step icon */}
              <div
                className={[
                  "w-16 h-16 rounded-2xl",
                  `bg-gradient-to-br ${s.color}`,
                  s.shadow,
                  "flex items-center justify-center mx-auto mb-5",
                ].join(" ")}
              >
                <s.icon size={26} className="text-white" strokeWidth={1.8} />
              </div>

              {/* Step number */}
              <span
                className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 block"
                style={{ color: i === 0 ? "#2563EB" : i === 1 ? "#6366F1" : "#7C3AED" }}
              >
                Step {s.step}
              </span>

              <h3 className="font-heading text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
