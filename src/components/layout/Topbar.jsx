import { Menu, Bell, Search, Sparkles } from "lucide-react";

export default function Topbar({ onMenuClick, title }) {
  return (
    <div
      className="sticky top-0 z-30 px-4 md:px-6 py-3.5 mb-6 flex items-center justify-between"
      style={{
        background: "rgba(244,247,255,0.85)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottom: "1px solid rgba(37,99,235,0.08)",
      }}
    >
      {/* Left: menu button + title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 -ml-1 rounded-xl text-muted hover:text-ink hover:bg-white transition-colors"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-lg md:text-xl text-ink leading-tight">{title}</h1>
        </div>
      </div>

      {/* Right: search + notifications */}
      <div className="flex items-center gap-2">
        {/* Search — hidden on small screens */}
        <div className="hidden sm:flex items-center gap-2 glass-input rounded-xl px-3 py-2 w-44 md:w-56 group">
          <Search size={14} className="text-placeholder group-focus-within:text-primary-500 shrink-0 transition-colors" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-sm placeholder:text-placeholder w-full text-ink"
            aria-label="Search"
          />
        </div>

        {/* Notification bell */}
        <button
          className="relative p-2.5 rounded-xl text-muted hover:text-ink hover:bg-white transition-all border border-transparent hover:border-primary-100"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span
            className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-primary-600 ring-2 ring-[#F4F7FF]"
            aria-hidden="true"
          />
        </button>

        {/* AI badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-gradient-soft border border-primary-200/50">
          <Sparkles size={13} className="text-primary-600" />
          <span className="text-xs font-semibold text-primary-700">AI Active</span>
        </div>
      </div>
    </div>
  );
}
