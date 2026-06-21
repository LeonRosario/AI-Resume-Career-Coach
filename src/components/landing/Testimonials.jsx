import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    avatar: 'SC',
    rating: 5,
    text: 'CareerAI helped me rewrite my resume and I got 3x more interview callbacks. The ATS score went from 62 to 94 in one session.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager at Stripe',
    avatar: 'MJ',
    rating: 5,
    text: 'The interview coach is incredible. I practiced behavioral questions for a week and felt completely prepared for my final round.',
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist at Meta',
    avatar: 'PS',
    rating: 5,
    text: 'The career roadmap showed me exactly which skills to learn. I landed my dream role within 4 months of following the plan.',
  },
  {
    name: 'Alex Rivera',
    role: 'UX Designer at Airbnb',
    avatar: 'AR',
    rating: 5,
    text: 'Finally a tool that understands design portfolios. The job matching feature found roles I never would have discovered on my own.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="glass-badge mb-4 inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0084FF]">
            Testimonials
          </span>
          <h2 className="font-fustat text-3xl font-bold text-slate-900 md:text-5xl">
            Loved by job seekers worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 md:text-lg">
            Join thousands of professionals who accelerated their careers with AI-powered coaching.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="relative h-full p-8" float={i % 2 === 0}>
                <Quote
                  size={32}
                  className="absolute right-6 top-6 text-[#0084FF]/15"
                />
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      fill="#FF801E"
                      color="#FF801E"
                    />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-slate-600 md:text-base">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#60B1FF] to-[#319AFF] text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
