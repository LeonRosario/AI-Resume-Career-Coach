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
} from "lucide-react";
import Logo from "../ui/Logo";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/resume-analyzer", label: "Resume Analyzer", icon: FileSearch },
  { to: "/app/ats-checker", label: "ATS Checker", icon: Target },
  { to: "/app/skill-gap", label: "Skill Gap", icon: Map },
  { to: "/app/job-match", label: "Job Match", icon: Briefcase },
  { to: "/app/interview-prep", label: "Interview Prep", icon: MessagesSquare },
  { to: "/app/resume-builder", label: "Resume Builder", icon: FileEdit },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const content = (
    <div className="flex flex-col h-full rounded-none md:rounded-glass p-4"
      style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", border: "1px solid rgba(0,132,255,0.12)", boxShadow: "0 20px 50px rgba(0,132,255,0.12)" }}
    >
      <div className="flex items-center justify-between mb-8 px-1 pt-1">
        <Logo to="/app" />
        <button className="md:hidden p-1 text-body hover:text-ink" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors group ${
                isActive ? "text-[#0084FF]" : "text-body hover:text-ink hover:bg-white/10"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-2xl shadow-glass"
                    style={{ background: "rgba(0,132,255,0.12)", border: "1px solid rgba(0,132,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <link.icon size={18} className="relative z-10" strokeWidth={2.25} />
                <span className="relative z-10">{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[rgba(0,132,255,0.12)] pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold font-heading">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted truncate">{user?.email || ""}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-muted hover:text-rose-600 hover:bg-rose-50/80 transition-colors"
        >
          <LogOut size={18} strokeWidth={2.25} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-72 shrink-0 sticky top-4 self-start h-[calc(100vh-2rem)] my-4 ml-4">
        {content}
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-xs z-50 md:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
