"use client"

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
import useTypewriter from '../../hooks/useTypewriter';

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  accent: string;
  rotation?: number;
  badge?: string;
  cta?: string;
}

interface PricingProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
  className?: string;
}

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};

const PricingHeader = ({ title }: { title: string }) => (
  <div className="text-center mb-8 sm:mb-12 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block"
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink bg-gradient-to-r from-blue-50 to-white px-8 py-4 rounded-xl border-[4px] border-blue-200 shadow-[8px_8px_0px_0px_rgba(37,99,235,0.12),_15px_15px_15px_-3px_rgba(37,99,235,0.06)] transform transition-transform hover:translate-x-1 hover:translate-y-1 mb-3 relative before:absolute before:inset-0 before:bg-white/50 before:rounded-xl before:blur-sm before:-z-10">
        {title}
      </h1>
      <motion.div
        className="h-2 bg-gradient-to-r from-blue-300 via-primary to-blue-300 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  </div>
);

const PricingToggle = ({ isYearly, onToggle }: { isYearly: boolean; onToggle: () => void }) => (
  <div className="flex justify-center items-center gap-4 mb-8 relative z-10">
    <span className={`text-muted font-medium ${!isYearly ? 'text-ink' : ''}`}>Monthly</span>
    <motion.button
      className="w-16 h-8 flex items-center bg-blue-100 rounded-full p-1 border-2 border-blue-300 shadow-[2px_2px_0px_0px_rgba(37,99,235,0.15)]"
      onClick={onToggle}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full border-2 border-primary"
        animate={{ x: isYearly ? 32 : 0 }}
      />
    </motion.button>
    <span className={`text-muted font-medium ${isYearly ? 'text-ink' : ''}`}>Yearly</span>
    {isYearly && (
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-primary font-medium text-sm"
      >
        Save 20%
      </motion.span>
    )}
  </div>
);

const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    />
  </>
);

const PricingCard = ({ plan, isYearly, index }: { plan: PricingPlan; isYearly: boolean; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const previousPrice = !isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const ctaLabel = plan.cta || 'GET STARTED';
  const { displayText: ctaDisplay, isTyping: ctaTyping, start: ctaStart } = useTypewriter(ctaLabel, { speed: 45 });

  return (
    <motion.div
      ref={cardRef}
      key={plan.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        ...(plan.isPopular ? { scale: 1.05 } : {}),
      }}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative w-full bg-white/80 backdrop-blur-sm rounded-xl p-6 border-[3px] border-blue-200 shadow-[6px_6px_0px_0px_rgba(37,99,235,0.12)] hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,0.2)] hover:border-primary transition-all duration-200"
    >
      <motion.div
        className={cn(
          'absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center border-2 border-blue-300 shadow-[3px_3px_0px_0px_rgba(37,99,235,0.15)]',
          plan.accent
        )}
        animate={{
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.1, 0.9, 1.1, 1],
          y: [0, -5, 5, -3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <div className="text-center text-white">
          <div className="text-lg font-black">
            ₹<Counter from={previousPrice} to={currentPrice} />
          </div>
          <div className="text-[10px] font-bold">/{isYearly ? 'yr' : 'mo'}</div>
        </div>
      </motion.div>

      <div className="mb-4">
        <h3 className="text-xl font-black text-ink mb-2">{plan.name}</h3>
        {plan.badge && (
          <motion.span
            className={cn(
              'inline-block px-3 py-1 text-white font-bold rounded-md text-xs border-2 border-blue-300 shadow-[2px_2px_0px_0px_rgba(37,99,235,0.15)]',
              plan.accent
            )}
            animate={{
              y: [0, -3, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {plan.badge}
          </motion.span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {plan.features.map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              x: 5,
              scale: 1.02,
              transition: { type: 'spring', stiffness: 400 },
            }}
            className="flex items-center gap-2 p-2 bg-blue-50/50 rounded-md border-2 border-blue-100 shadow-[2px_2px_0px_0px_rgba(37,99,235,0.08)]"
          >
            <motion.span
              whileHover={{ scale: 1.2, rotate: 360 }}
              className={cn(
                'w-5 h-5 rounded-md flex items-center justify-center text-white font-bold text-xs border border-blue-300 shadow-[1px_1px_0px_0px_rgba(37,99,235,0.15)]',
                plan.accent
              )}
            >
              ✓
            </motion.span>
            <span className="text-body font-bold text-sm">{feature}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        className={cn(
          'w-full py-2 rounded-lg text-white font-black text-sm border-2 border-primary shadow-[4px_4px_0px_0px_rgba(37,99,235,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,0.3)] active:shadow-[2px_2px_0px_0px_rgba(37,99,235,0.15)] transition-all duration-200',
          plan.accent
        )}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.95,
          rotate: [-1, 1, 0],
        }}
        onHoverStart={ctaStart}
      >
        <span className="relative inline-flex items-center shrink-0">
          <span className="invisible whitespace-nowrap" aria-hidden="true">
            {ctaLabel}
          </span>
          <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
            {ctaDisplay}
            {ctaTyping && (
              <span className="ml-px w-[2px] h-[1em] bg-current animate-cursor-blink" />
            )}
          </span>
        </span>
        {' '}→
      </motion.button>
    </motion.div>
  );
};

export const PricingContainer = ({ title = 'Pricing Plans', subtitle, plans, className = '' }: PricingProps) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className={cn('min-h-screen p-4 sm:p-6 lg:p-8 relative overflow-hidden rounded-[12px]', className)}>
      <PricingHeader title={title} />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-muted font-medium text-base sm:text-lg mb-6 sm:mb-8 relative z-10 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <PricingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
      <BackgroundEffects />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {plans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} isYearly={isYearly} index={index} />
        ))}
      </div>
    </section>
  );
};
