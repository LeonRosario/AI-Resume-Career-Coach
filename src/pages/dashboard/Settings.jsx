import { useState } from "react";
import { motion } from "framer-motion";
import { User, FileClock, SlidersHorizontal, Moon, Sun, Download, Trash2, Bell } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { resumeHistory } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

const tabs = [
  { id: "profile", label: "User Info", icon: User },
  { id: "history", label: "Resume History", icon: FileClock },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
        checked ? "bg-brand-gradient" : "bg-[rgba(0,132,255,0.08)]"
      }`}
      aria-pressed={checked}
    >
      <motion.span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow"
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

export default function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="grid lg:grid-cols-[220px,1fr] gap-5">
      {/* Tab nav */}
      <GlassCard className="p-3 h-fit lg:sticky lg:top-4">
        <div className="flex lg:flex-col gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.id ? "text-primary-700" : "text-ink/55 hover:text-ink hover:bg-white/40"
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="settings-tab"
                  className="absolute inset-0 rounded-2xl shadow-glass"
                  style={{ background: "rgba(0,132,255,0.12)", border: "1px solid rgba(0,132,255,0.15)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <t.icon size={16} className="relative z-10" />
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Panels */}
      <div className="space-y-5">
        {tab === "profile" && (
          <GlassCard className="p-7">
            <h3 className="font-heading font-bold text-lg text-ink mb-1">User Info</h3>
            <p className="text-sm text-ink/50 mb-6">Update your name and contact details.</p>

            <div className="flex items-center gap-4 mb-7">
              <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xl font-bold font-heading shadow-glow">
                {name?.[0]?.toUpperCase() || "U"}
              </div>
              <Button variant="glass" size="sm">
                Change photo
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <Button variant="primary" className="mt-6">
              Save changes
            </Button>
          </GlassCard>
        )}

        {tab === "history" && (
          <GlassCard className="p-7">
            <h3 className="font-heading font-bold text-lg text-ink mb-1">Resume History</h3>
            <p className="text-sm text-ink/50 mb-6">Every version you've uploaded or built.</p>

            <div className="space-y-3">
              {resumeHistory.map((r) => (
                <div key={r.id} className="glass-soft rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{r.name}</p>
                    <p className="text-xs text-ink/45 mt-0.5">{r.date}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge tone={r.score >= 85 ? "success" : r.score >= 70 ? "brand" : "warning"}>
                      {r.score}/100
                    </Badge>
                    <button className="p-2 rounded-xl hover:bg-white/50 text-ink/40 hover:text-primary-600">
                      <Download size={16} />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-white/50 text-ink/40 hover:text-rose-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {tab === "preferences" && (
          <GlassCard className="p-7">
            <h3 className="font-heading font-bold text-lg text-ink mb-1">Preferences</h3>
            <p className="text-sm text-ink/50 mb-6">Control how CareerAI looks and notifies you.</p>

            <div className="space-y-1">
              <div className="flex items-center justify-between py-4 border-b border-[rgba(0,132,255,0.1)]">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={18} className="text-primary-600" /> : <Sun size={18} className="text-primary-600" />}
                  <div>
                    <p className="text-sm font-medium text-ink">Dark mode</p>
                    <p className="text-xs text-ink/45">Switch to a darker interface</p>
                  </div>
                </div>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[rgba(0,132,255,0.1)]">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-ink">Email updates</p>
                    <p className="text-xs text-ink/45">Resume tips and product news</p>
                  </div>
                </div>
                <Toggle checked={emailUpdates} onChange={setEmailUpdates} />
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-ink">Job match alerts</p>
                    <p className="text-xs text-ink/45">Get notified on new high-match roles</p>
                  </div>
                </div>
                <Toggle checked={jobAlerts} onChange={setJobAlerts} />
              </div>
            </div>

            {darkMode && (
              <p className="text-xs text-ink/40 mt-5 glass-soft rounded-xl px-4 py-3">
                Dark mode is a preview preference in this demo — the interface stays in its
                light glass theme.
              </p>
            )}
          </GlassCard>
        )}
      </div>
    </div>
  );
}
