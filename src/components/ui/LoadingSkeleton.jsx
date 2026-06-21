import { motion } from 'framer-motion';

export function SkeletonLine({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`rounded-xl bg-white/50 backdrop-blur-sm ${className}`}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card rounded-[24px] p-6 space-y-4 ${className}`}>
      <SkeletonLine className="h-4 w-1/3" />
      <SkeletonLine className="h-8 w-2/3" />
      <SkeletonLine className="h-20 w-full" />
      <div className="flex gap-2">
        <SkeletonLine className="h-8 w-20" />
        <SkeletonLine className="h-8 w-20" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
