import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Maya Chen",
    role: "Software Engineer @ Stripe",
    avatar: "MC",
    gradient: "linear-gradient(135deg,#2563EB 0%,#4F46E5 100%)",
    quote:
      "The ATS checker showed me exactly which keywords I was missing. I rewrote two lines and started getting callbacks within a week.",
    stars: 5,
  },
  {
    name: "Daniel Osei",
    role: "Frontend Developer @ Shopify",
    avatar: "DO",
    gradient: "linear-gradient(135deg,#7C3AED 0%,#6D28D9 100%)",
    quote:
      "The mock interview feature is the closest thing to a real technical screen I've practiced with. The feedback was specific, not generic.",
    stars: 5,
  },
  {
    name: "Priya Raman",
    role: "Full Stack Developer @ Linear",
    avatar: "PR",
    gradient: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)",
    quote:
      "The skill gap roadmap turned a vague 'learn cloud stuff' goal into four concrete weeks. I followed it and it worked.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-24 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="brand-pill mb-4 inline-flex"
          >
            Real outcomes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-ink mt-4"
          >
            People who hired CareerAI,<br className="hidden sm:block" /> then got hired
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="glass rounded-[20px] p-7 flex flex-col hover:shadow-glass-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-amber-400 text-sm leading-none">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-body leading-[1.75] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: t.gradient }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink leading-tight">{t.name}</p>
                  <p className="text-xs text-muted mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
