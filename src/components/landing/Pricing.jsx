import { motion } from "framer-motion";
import { Check, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Try the essentials before you commit.",
    features: [
      "1 resume analysis / month",
      "Basic ATS check",
      "3 job matches",
      "Community support",
    ],
    cta: "Start free",
    variant: "glass",
    highlight: false,
    icon: null,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    desc: "For an active job search.",
    features: [
      "Unlimited resume analysis",
      "Unlimited ATS checks",
      "Full skill gap roadmap",
      "Unlimited job matches",
      "5 mock interviews / month",
    ],
    cta: "Start 7-day trial",
    variant: "primary",
    highlight: true,
    badge: "Most popular",
    icon: Zap,
  },
  {
    name: "Career+",
    price: "$39",
    period: "/mo",
    desc: "For serious career moves.",
    features: [
      "Everything in Pro",
      "Unlimited mock interviews",
      "AI resume builder & export",
      "Priority AI response time",
      "1:1 review session",
    ],
    cta: "Go Career+",
    variant: "glass",
    highlight: false,
    icon: Star,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative px-6 py-24 bg-white">
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
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-ink mt-4"
          >
            Simple plans, real results
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted mt-3"
          >
            Cancel anytime. No surprise charges.
          </motion.p>
        </div>
        </Reveal>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.008 }}
              className={[
                "relative flex flex-col p-8 rounded-[24px] transition-shadow duration-300",
                plan.highlight
                  ? "pricing-highlight shadow-glass-xl md:-mt-4 md:-mb-4"
                  : "glass shadow-glass hover:shadow-glass-lg",
              ].join(" ")}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="pricing-badge flex items-center gap-1.5">
                    <Zap size={11} /> {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                {plan.icon && (
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center mb-4">
                    <plan.icon size={18} className="text-primary-600" strokeWidth={2} />
                  </div>
                )}
                <h3 className="font-heading text-xl text-ink">{plan.name}</h3>
                <p className="text-sm text-muted mt-1">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1 mb-7">
                <span className="font-heading text-4xl md:text-5xl text-ink leading-none">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted text-sm mb-1">{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-primary-600" strokeWidth={3} />
                    </span>
                    <span className="text-body">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.highlight ? "primary" : "secondary"}
                full
                size="md"
                onClick={() => navigate("/register")}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted mt-10"
        >
          All plans include a free trial. No credit card required to start.
        </motion.p>
      </div>
    </section>
  );
}
