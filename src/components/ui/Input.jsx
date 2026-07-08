import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  ({ label, icon: Icon, type = "text", error, hint, className = "", ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword ? (show ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <span className="text-sm font-medium text-body">{label}</span>
        )}
        <motion.div
          className="relative group"
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.2 }}
        >
          {Icon && (
            <Icon
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-placeholder group-focus-within:text-primary-500 transition-colors pointer-events-none"
            />
          )}
          <input
            ref={ref}
            type={actualType}
            className={[
              "glass-input w-full rounded-xl py-2.5",
              Icon ? "pl-10" : "pl-3.5",
              isPassword ? "pr-10" : "pr-3.5",
              "text-sm text-ink",
              "placeholder:text-placeholder",
              "outline-none",
              "focus:border-primary-400 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]",
              "transition-all duration-200",
              error ? "border-red-400 focus:border-red-400" : "",
              className,
            ].filter(Boolean).join(" ")}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-placeholder hover:text-muted transition-colors"
              tabIndex={-1}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </motion.div>
        {error && (
          <span className="text-xs text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
            {error}
          </span>
        )}
        {hint && !error && (
          <span className="text-xs text-muted">{hint}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
