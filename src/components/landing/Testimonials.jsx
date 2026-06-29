import { Star } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const testimonials = [
  {
    name: "Maya Chen",
    role: "Software Engineer @ Stripe",
    quote:
      "The ATS checker showed me exactly which keywords I was missing. I rewrote two lines and started getting callbacks within a week.",
  },
  {
    name: "Daniel Osei",
    role: "Frontend Developer @ Shopify",
    quote:
      "The mock interview feature is the closest thing to a real technical screen I've practiced with. The feedback was specific, not generic.",
  },
  {
    name: "Priya Raman",
    role: "Full Stack Developer @ Linear",
    quote:
      "The skill gap roadmap turned a vague 'learn cloud stuff' goal into four concrete weeks. I followed it and it worked.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-primary-600 uppercase">
            Real outcomes
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink mt-3">
            People who hired CareerAI, then got hired
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <GlassCard key={t.name} delay={i * 0.1} className="p-7 flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-primary-400 text-primary-400" />
                ))}
              </div>
              <p className="text-sm text-body leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[rgba(0,132,255,0.1)]">
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold font-heading">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
