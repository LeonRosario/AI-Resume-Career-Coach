import { motion } from "framer-motion";
import {
  FileSearch, Target, Map,
  Briefcase, MessagesSquare, FileEdit,
} from "lucide-react";
import GlassCard from "../ui/GlassCard";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    desc: "Get an instant score on formatting, keywords, and impact — with line-by-line AI suggestions.",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-primary-600",
    iconBg: "bg-primary-50 border-primary-100",
  },
  {
    icon: Target,
    title: "ATS Checker",
    desc: "Paste any job description and see exactly how well your resume matches before you apply.",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-100",
  },
  {
    icon: Map,
    title: "Skill Gap Roadmap",
    desc: "We compare your skills to your target role and build a week-by-week plan to close the gap.",
    color: "from-indigo-500/10 to-indigo-600/5",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50 border-indigo-100",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    desc: "Discover roles ranked by real compatibility, not just keyword overlap.",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-primary-600",
    iconBg: "bg-primary-50 border-primary-100",
  },
  {
    icon: MessagesSquare,
    title: "AI Mock Interviews",
    desc: "Practice with an AI interviewer that asks follow-ups and scores your answers.",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-100",
  },
  {
    icon: FileEdit,
    title: "Resume Builder",
    desc: "Build a polished resume section by section, with AI-improved writing throughout.",
    color: "from-indigo-500/10 to-indigo-600/5",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50 border-indigo-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-24 bg-white">
      {/* Top divider */}
      <div className="section-divider max-w-6xl mx-auto mb-24" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brand-pill mb-4 inline-flex"
          >
            Everything you need
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-ink mt-4"
          >
            One coach, every stage of the search
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted mt-4 text-base"
          >
            From your first draft to your final interview, CareerAI stays with you.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className={[
                "glass feature-card rounded-[20px] p-7",
                "bg-gradient-to-br from-white",
                f.color,
              ].join(" ")}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${f.iconBg}`}>
                <f.icon size={22} className={f.iconColor} strokeWidth={1.8} />
              </div>

              <h3 className="font-heading text-lg text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>

              {/* Arrow indicator */}
              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-muted group-hover:text-primary-600 transition-colors">
                <span>Learn more</span>
                <span className="opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
