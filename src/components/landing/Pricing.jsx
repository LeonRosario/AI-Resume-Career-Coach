import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Try the essentials before you commit.",
    features: ["1 resume analysis / month", "Basic ATS check", "3 job matches", "Community support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    desc: "For an active job search.",
    features: [
      "Unlimited resume analysis",
      "Unlimited ATS checks",
      "Full skill gap roadmap",
      "Unlimited job matches",
      "5 mock interviews / month",
    ],
    cta: "Start 7-day trial",
    highlight: true,
  },
  {
    name: "Career+",
    price: "$39",
    period: "/month",
    desc: "For serious career moves.",
    features: [
      "Everything in Pro",
      "Unlimited mock interviews",
      "AI resume builder & export",
      "Priority AI response time",
      "1:1 review session",
    ],
    cta: "Go Career+",
    highlight: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-primary-600 uppercase">
            Pricing
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl mt-3" style={{ color: "#111827" }}>
            Simple plans, real results
          </h2>
          <p className="mt-4" style={{ color: "#6B7280" }}>Cancel anytime. No surprise charges.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <GlassCard
              key={plan.name}
              delay={i * 0.1}
              variant={plan.highlight ? "strong" : "default"}
              className={`p-8 flex flex-col relative ${
                plan.highlight ? "md:-translate-y-3 ring-2 ring-primary-400/50" : ""
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gradient text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                  Most popular
                </span>
              )}
              <h3 className="font-heading font-bold text-xl" style={{ color: "#111827" }}>{plan.name}</h3>
              <p className="text-sm mt-1.5" style={{ color: "#6B7280" }}>{plan.desc}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-heading font-extrabold text-4xl" style={{ color: "#111827" }}>{plan.price}</span>
                <span className="text-sm mb-1" style={{ color: "#9CA3AF" }}>{plan.period}</span>
              </div>

              <ul className="mt-7 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#4B5563" }}>
                    <Check size={16} className="text-primary-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "primary" : "glass"}
                full
                className="mt-8"
                style={plan.highlight ? {} : { color: "#111827" }}
                onClick={() => navigate("/register")}
              >
                {plan.cta}
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
