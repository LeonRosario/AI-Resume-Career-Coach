import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import GlassButton from '../ui/GlassButton';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for getting started with AI resume analysis.',
    features: [
      '1 resume analysis per month',
      'Basic ATS score',
      '3 job matches',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For active job seekers who want the full AI coaching experience.',
    features: [
      'Unlimited resume analyses',
      'Advanced ATS + keyword optimization',
      'Unlimited job matching',
      'AI interview coach (50 sessions/mo)',
      'Career roadmap generator',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    description: 'For teams, bootcamps, and career services departments.',
    features: [
      'Everything in Pro',
      'Team dashboard & analytics',
      'Bulk resume processing',
      'Custom branding',
      'Dedicated account manager',
      'SSO & API access',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="glass-badge mb-4 inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0084FF]">
            Pricing
          </span>
          <h2 className="font-fustat text-3xl font-bold text-slate-900 md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 md:text-lg">
            Start free and upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#60B1FF] to-[#319AFF] px-4 py-1 text-xs font-bold text-white shadow-lg shadow-blue-500/25">
                    <Sparkles size={12} />
                    Most Popular
                  </span>
                </div>
              )}
              <GlassCard
                className={`flex h-full flex-col p-8 ${plan.highlighted ? 'ring-2 ring-[#0084FF]/30 shadow-xl shadow-blue-500/10' : ''}`}
                hover={!plan.highlighted}
              >
                <div className="mb-6">
                  <h3 className="font-fustat text-xl font-bold text-slate-800">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="font-fustat text-4xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500">{plan.period}</span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#0084FF]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.highlighted ? (
                  <GlassButton to="/register" className="w-full justify-center">
                    {plan.cta}
                  </GlassButton>
                ) : (
                  <Link
                    to="/register"
                    className="glass-badge flex w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-white/50"
                  >
                    {plan.cta}
                  </Link>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
