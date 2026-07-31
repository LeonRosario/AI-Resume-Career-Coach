"use client"

import { motion } from "motion/react";
import type { Ref } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface HowItWorksCardProps {
  step: HowItWorksStep;
  index: number;
  side?: "left" | "right";
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function HowItWorksCard({
  step,
  index,
  side,
  className,
  ref,
}: HowItWorksCardProps) {
  const Icon = step.icon;
  const baseRotation = side === "left" ? -2.5 : side === "right" ? 2.5 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.09, ease }}
      whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
      style={{ rotate: baseRotation }}
      className={cn(
        "group relative w-full rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-card sm:p-7",
        "transition-[border-color,box-shadow,background-color] duration-300 ease-out",
        "hover:border-[#2563EB]/40 hover:bg-white hover:shadow-[0_24px_50px_-12px_rgba(37,99,235,0.25)]",
        className,
      )}
    >
      {/* Icon + step number */}
      <div className="mb-5 flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB] transition-all duration-300 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white group-hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.45)]">
          <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
        </span>
        <span
          aria-hidden="true"
          className="ml-auto font-heading text-4xl font-extrabold leading-none tracking-tight text-[#2563EB]/20 transition-colors duration-300 group-hover:text-[#2563EB]/40"
        >
          {step.number}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-heading text-lg font-semibold leading-snug text-ink sm:text-xl">
        {step.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.description}</p>
    </motion.div>
  );
}
