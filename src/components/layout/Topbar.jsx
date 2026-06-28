import { Menu, Bell, Search } from "lucide-react";

export default function Topbar({ onMenuClick, title }) {
  return (
    <div className="glass rounded-glass px-4 md:px-6 py-4 flex items-center justify-between mb-6 sticky top-4 z-30">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 -ml-2 text-ink/70 hover:text-ink rounded-xl hover:bg-white/40"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-heading font-bold text-lg md:text-xl text-ink">{title}</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden sm:flex items-center gap-2 glass-input rounded-xl px-3 py-2 w-48 md:w-64">
          <Search size={16} className="text-ink/40" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-sm placeholder:text-ink/35 w-full"
          />
        </div>
        <button
          className="relative p-2.5 rounded-xl glass-soft hover:bg-white/50 text-ink/60 hover:text-ink transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-primary-600" />
        </button>
      </div>
    </div>
  );
}
