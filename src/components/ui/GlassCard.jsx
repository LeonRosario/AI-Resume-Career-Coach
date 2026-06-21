import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  float = false,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-card rounded-[24px] ${float ? 'animate-float-medium' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
