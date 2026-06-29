import { Target, ChevronDown } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function RoleSelector({ role, options, onChange }) {
  return (
    <GlassCard className="p-7">
      <div className="flex items-center gap-2 mb-4">
        <Target size={20} className="text-primary-600" />
        <h2 className="font-heading font-bold text-lg text-ink">Target Role</h2>
      </div>
      <div className="relative max-w-sm">
        <select
          value={role}
          onChange={(e) => onChange(e.target.value)}
          className="glass-input w-full rounded-2xl py-3 px-4 pr-10 text-sm font-medium text-ink outline-none focus:ring-2 focus:ring-primary-400/60 appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
      </div>
    </GlassCard>
  );
}
