import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";

export default function CtaBand() {
  const navigate = useNavigate();
  return (
    <section className="relative px-6 py-10">
      <GlassCard variant="strong" className="max-w-5xl mx-auto p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-gradient-soft rounded-full blur-3xl" />
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl relative" style={{ color: "#111827" }}>
          Ready to see your resume's real score?
        </h2>
        <p className="mt-4 relative max-w-lg mx-auto" style={{ color: "#6B7280" }}>
          Upload it free — no credit card, no commitment. Just a clear next step.
        </p>
        <Button
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          className="mt-8 relative"
          onClick={() => navigate("/register")}
        >
          Get my free score
        </Button>
      </GlassCard>
    </section>
  );
}
