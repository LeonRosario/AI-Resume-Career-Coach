import { forwardRef } from 'react';

const GlassInput = forwardRef(function GlassInput(
  { label, id, type = 'text', error, icon: Icon, className = '', ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-600">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full rounded-2xl border border-white/40 bg-white/35 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 backdrop-blur-[30px] transition-all duration-200 outline-none focus:border-[#0084FF]/50 focus:ring-2 focus:ring-[#0084FF]/20 ${Icon ? 'pl-11' : ''} ${error ? 'border-red-300 focus:ring-red-200' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default GlassInput;
