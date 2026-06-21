import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function GlassButton({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 select-none';

  const variants = {
    primary: 'glass-btn text-white shadow-lg shadow-blue-500/20',
    secondary:
      'glass-badge text-slate-800 hover:bg-white/50',
    outline:
      'bg-white/20 backdrop-blur-md border border-white/40 text-slate-700 hover:bg-white/40',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.03 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    ...props,
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-60 disabled:cursor-not-allowed`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
