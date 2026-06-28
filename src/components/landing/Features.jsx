import { FileSearch, Target, Map, MessagesSquare, FileEdit, Briefcase } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    desc: "Get an instant score on formatting, keywords, and impact — with line-by-line AI suggestions.",
  },
  {
    icon: Target,
    title: "ATS Checker",
    desc: "Paste any job description and see exactly how well your resume matches before you apply.",
  },
  {
    icon: Map,
    title: "Skill Gap Roadmap",
    desc: "We compare your skills to your target role and build a week-by-week plan to close the gap.",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    desc: "Discover roles ranked by real compatibility, not just keyword overlap.",
  },
  {
    icon: MessagesSquare,
    title: "AI Mock Interviews",
    desc: "Practice with an AI interviewer that asks follow-ups and scores your answers.",
  },
  {
    icon: FileEdit,
    title: "Resume Builder",
    desc: "Build a polished resume section by section, with AI-improved writing throughout.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-primary-600 uppercase">
            Everything you need
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink mt-3">
            One coach, every stage of the search
          </h2>
          <p className="text-ink/55 mt-4">
            From your first draft to your final interview, CareerAI stays with you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <GlassCard key={f.title} hover delay={i * 0.07} className="p-7">
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient-soft flex items-center justify-center mb-5">
                <f.icon size={22} className="text-primary-600" strokeWidth={2} />
              </div>
              <h3 className="font-heading font-bold text-lg text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
