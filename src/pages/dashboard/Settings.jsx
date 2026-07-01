import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, FileClock, SlidersHorizontal,
  Moon, Sun, Download, Trash2, Bell,
  Camera, Check,
} from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { resumeHistory } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";

const tabs = [
  { id: "profile",     label: "User Info",       icon: User },
  { id: "history",     label: "Resume History",  icon: FileClock },
  { id: "preferences", label: "Preferences",     icon: SlidersHorizontal },
];

function Toggle({ checked, onChange, label }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={[
        "relative w-11 h-6 rounded-full transition-all duration-200 shrink-0",
        checked ? "bg-brand-gradient shadow-glow-sm" : "bg-slate-200",
      ].join(" ")}
      aria-pressed={checked}
      aria-label={label}
    >
      <motion.span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      />
    </button>
  );
}

function PreferenceRow({ icon: Icon, title, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center shrink-0">
          <Icon size={15} className="text-primary-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{title}</p>
          <p className="text-xs text-muted">{desc}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

export default function Settings() {
  const { user } = useAuth();
  const [tab,          setTab]          = useState("profile");
  const [darkMode,     setDarkMode]     = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [jobAlerts,    setJobAlerts]    = useState(true);
  const [saved,        setSaved]        = useState(false);
  const [name,  setName]  = useState(user?.name  ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="grid lg:grid-cols-[220px,1fr] gap-5">

      {/* Tab nav */}
      <GlassCard className="p-2.5 h-fit lg:sticky lg:top-4" animate={false}>
        <div className="flex lg:flex-col gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={[
                "relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-[12px]",
                "text-sm font-medium whitespace-nowrap transition-all duration-200",
                tab === t.id ? "text-primary-700" : "text-muted hover:text-ink hover:bg-primary-50/60",
              ].join(" ")}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="settings-tab"
                  className="absolute inset-0 rounded-[12px] nav-active-bg"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <t.icon size={15} className="relative z-10 shrink-0" />
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Panels */}
      <div className="space-y-5">

        {/* Profile */}
        {tab === "profile" && (
          <GlassCard className="p-7" accent>
            <h3 className="font-heading text-xl text-ink mb-1">User Info</h3>
            <p className="text-sm text-muted mb-6">Update your name and contact details.</p>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-7 pb-6 border-b border-slate-100">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xl font-bold font-heading shadow-glow-sm"
                >
                  {name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center hover:bg-primary-50 transition-colors">
                  <Camera size={11} className="text-muted" />
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{name || "Your Name"}</p>
                <p className="text-xs text-muted">{email || "your@email.com"}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Lee"
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button variant="primary" onClick={handleSave}>
                {saved ? (
                  <span className="flex items-center gap-1.5">
                    <Check size={15} /> Saved!
                  </span>
                ) : "Save changes"}
              </Button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-emerald-600 font-medium"
                >
                  Changes saved successfully
                </motion.span>
              )}
            </div>
          </GlassCard>
        )}

        {/* Resume History */}
        {tab === "history" && (
          <GlassCard className="p-7" accent>
            <h3 className="font-heading text-xl text-ink mb-1">Resume History</h3>
            <p className="text-sm text-muted mb-6">Every version you've uploaded or built.</p>

            <div className="space-y-3">
              {resumeHistory.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-soft rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center shrink-0">
                      <FileClock size={14} className="text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">{r.name}</p>
                      <p className="text-xs text-muted mt-0.5">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <Badge
                      tone={r.score >= 85 ? "success" : r.score >= 70 ? "brand" : "warning"}
                      size="md"
                    >
                      {r.score}/100
                    </Badge>
                    <button className="p-2 rounded-lg hover:bg-primary-50 text-muted hover:text-primary-600 transition-colors">
                      <Download size={15} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Preferences */}
        {tab === "preferences" && (
          <GlassCard className="p-7" accent>
            <h3 className="font-heading text-xl text-ink mb-1">Preferences</h3>
            <p className="text-sm text-muted mb-6">Control how CareerAI looks and notifies you.</p>

            <div>
              <PreferenceRow
                icon={darkMode ? Moon : Sun}
                title="Dark mode"
                desc="Switch to a darker interface"
                checked={darkMode}
                onChange={setDarkMode}
              />
              <PreferenceRow
                icon={Bell}
                title="Email updates"
                desc="Resume tips and product news"
                checked={emailUpdates}
                onChange={setEmailUpdates}
              />
              <PreferenceRow
                icon={Bell}
                title="Job match alerts"
                desc="Get notified on new high-match roles"
                checked={jobAlerts}
                onChange={setJobAlerts}
              />
            </div>

            {darkMode && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 glass-soft rounded-xl px-4 py-3 flex items-center gap-2.5"
              >
                <Moon size={14} className="text-primary-500 shrink-0" />
                <p className="text-xs text-muted">
                  Dark mode is a preview — the interface stays in its light glass theme in this demo.
                </p>
              </motion.div>
            )}
          </GlassCard>
        )}
      </div>
    </div>
  );
}
