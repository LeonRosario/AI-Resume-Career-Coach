import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];
const duration = 0.6;

const variantMap = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  as: Component = motion.div,
  once = true,
  margin = "-48px",
  ...props
}) {
  const v = variantMap[variant] || variantMap["fade-up"];
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden: v.hidden,
        visible: { ...v.visible, transition: { duration, ease, delay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
