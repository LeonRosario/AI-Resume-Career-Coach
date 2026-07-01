import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileSearch,
  Target,
  Briefcase,
  MessagesSquare,
  Map,
  Settings,
  LogOut,
  X,
  FileEdit,
  ChevronRight,
} from "lucide-react";
import Logo from "../ui/Logo";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/app",               label: "Dashboard",      icon: LayoutDashboard, end: true },
  { to: "/app/resume-analyzer", label: "Resume Analyzer", icon: FileSearch },
  { to: "/app/ats-checker",   label: "ATS Checker",    icon: Target },
  { to: "/app/skill-gap",     label: "Skill Gap",      icon: Map },
  { to: "/app/job-match",     label: "Job Match",      icon: Briefcase },
  { to: "/app/interview-prep", label: "Interview Prep", icon: MessagesSquare },
  { to: "/app/resume-builder", label: "Resume Builder", icon: FileEdit },
  { to: "/app/settings",      label: "Settings",       icon: Settings },
];

const groups = [
  { label: "Main",    items: links.slice(0, 1) },
  { label: "Tools",   items: links.slice(1, 7) },
  { label: "Account", items: links.slice(7) },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const content = (
    <div
      className="flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        borderRight: "1px solid rgba(37,99,235,0.1)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 pt-6 pb-5">
        <Logo to="/app" />
        <button
          className="md:hidden p-1.5 rounded-lg text-muted hover:text-ink hover:bg-primary-50 transition-colors"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 pb-2 overflow-y-auto space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-placeholder">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) => [
                    "relative flex items-center gap-3 px-3.5 py-2.5 rounded-[14px]",
                    "text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "nav-active-bg text-primary-700"
                      : "text-muted hover:text-ink hover:bg-primary-50/60",
                  ].join(" ")}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active"
                          className="absolute inset-0 nav-active-bg rounded-[14px]"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <link.icon
                        size={17}
                        className={[
                          "relative z-10 shrink-0 transition-colors",
                          isActive ? "text-primary-600" : "text-muted group-hover:text-ink",
                        ].join(" ")}
                        strokeWidth={isActive ? 2.4 : 2}
                      />
                      <span className="relative z-10 flex-1">{link.label}</span>
                      {isActive && (
                        <ChevronRight
                          size={13}
                          className="relative z-10 text-primary-400 shrink-0"
                          strokeWidth={2.5}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-primary-50">
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-3 mb-1 rounded-[14px] hover:bg-primary-50/60 transition-colors cursor-default">
          <div
            className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ boxShadow: "0 2px 8px rgba(37,99,235,0.3)" }}
          >
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink truncate leading-snug">
              {user?.name ?? "User"}
            </p>
            <p className="text-[11px] text-muted truncate">
              {user?.email ?? ""}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-sm font-medium text-muted hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={17} strokeWidth={2} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[248px] shrink-0 sticky top-0 self-start h-screen">
        {content}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-[280px] z-50 md:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
