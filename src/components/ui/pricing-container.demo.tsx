import { PricingContainer } from "@/components/ui/pricing-container";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  accent: string;
  rotation?: number;
}

const DEMO_PLANS: PricingPlan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "ATS Resume Builder",
      "1 Resume",
      "Basic Resume Templates",
      "ATS Score Checker",
      "Resume PDF Export",
      "Basic AI Suggestions",
      "Community Support"
    ],
    isPopular: false,
    accent: "bg-emerald-500",
    rotation: -2,
    badge: "Perfect for Students",
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    monthlyPrice: 299,
    yearlyPrice: 2999,
    features: [
      "Unlimited Resumes",
      "Premium Resume Templates",
      "Advanced ATS Analysis",
      "AI Resume Rewriting",
      "AI Resume Summary Generator",
      "Skill Gap Analysis",
      "Job Match Score",
      "AI Interview Preparation",
      "Resume Version History",
      "Priority Support"
    ],
    isPopular: true,
    accent: "bg-blue-500",
    rotation: 1,
    badge: "Most Popular",
    cta: "Upgrade to Pro",
  },
  {
    name: "Premium Career Coach",
    monthlyPrice: 599,
    yearlyPrice: 5999,
    features: [
      "Everything in Pro plus:",
      "Unlimited AI Career Coaching",
      "Personalized Career Roadmap",
      "AI Mock Interviews",
      "Real-time Resume Optimization",
      "AI Cover Letter Generator",
      "LinkedIn Profile Optimization",
      "Portfolio Review",
      "Unlimited Job Recommendations",
      "Early Access to New AI Features",
      "24/7 Premium Support"
    ],
    isPopular: false,
    accent: "bg-purple-500",
    rotation: 2,
    badge: "Best Value",
    cta: "Go Premium",
  },
];

export function PricingDemo() {
  return (
    <PricingContainer
      title="Choose the Right Plan for Your Career"
      subtitle="Start for free and upgrade when you're ready to unlock advanced AI-powered career tools."
      plans={DEMO_PLANS}
    />
  );
}
