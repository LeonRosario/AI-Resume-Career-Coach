import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  ({ label, icon: Icon, type = "text", error, className = "", ...props }, ref) => {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    const actualType = isPassword ? (show ? "text" : "password") : type;

    return (
      <label className="block">
        {label && (
          <span className="block text-sm font-medium text-ink/70 mb-1.5">{label}</span>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
            />
          )}
          <input
            ref={ref}
            type={actualType}
            className={`glass-input w-full rounded-2xl py-3 ${Icon ? "pl-11" : "pl-4"} ${
              isPassword ? "pr-11" : "pr-4"
            } text-sm text-ink placeholder:text-ink/35 outline-none focus:ring-2 focus:ring-primary-400/60 transition-shadow ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/70"
              tabIndex={-1}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <span className="block text-xs text-red-500 mt-1">{error}</span>}
      </label>
    );
  }
);

Input.displayName = "Input";
export default Input;
