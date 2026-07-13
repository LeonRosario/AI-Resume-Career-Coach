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
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ["1 User", "10 Projects", "5GB Storage", "Basic Support"],
    isPopular: false,
    accent: "bg-rose-500",
    rotation: -2,
  },
  {
    name: "Pro",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: ["5 Users", "50 Projects", "100GB Storage", "Priority Support"],
    isPopular: true,
    accent: "bg-blue-500",
    rotation: 1,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: ["Unlimited", "Contact Us", "1TB Storage", "24/7 Support"],
    isPopular: false,
    accent: "bg-purple-500",
    rotation: 2,
  },
];

export function PricingDemo() {
  return <PricingContainer title="Choose Your Perfect Plan" plans={DEMO_PLANS} />;
}
