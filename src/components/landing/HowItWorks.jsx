import { Upload, ScanLine, TrendingUp } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const steps = [
  {
    icon: Upload,
    title: "Upload your resume",
    desc: "Drop in a PDF — we parse your experience, skills, and projects in seconds.",
  },
  {
    icon: ScanLine,
    title: "Get scanned & scored",
    desc: "See your ATS score, matched skills, and exactly what's missing for your target role.",
  },
  {
    icon: TrendingUp,
    title: "Close the gap & apply",
    desc: "Follow your roadmap, rehearse interviews, and apply to roles ranked by real fit.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-primary-600 uppercase">
            How it works
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink mt-3">
            Three steps to your next offer
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <GlassCard key={s.title} delay={i * 0.12} className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-5 shadow-glow">
                <s.icon size={24} className="text-white" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-primary-500 tracking-widest">
                STEP {i + 1}
              </span>
              <h3 className="font-heading font-bold text-lg text-ink mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
