import { motion } from "framer-motion";
import {
  User, AlignLeft, GraduationCap, Briefcase, FolderGit2,
  Wrench, Award, Trophy, Languages, Heart, Users,
  CheckCircle2, Circle,
} from "lucide-react";

const sections = [
  { id: "personal", label: "Personal Info", icon: User, color: "primary" },
  { id: "summary", label: "Professional Summary", icon: AlignLeft, color: "violet" },
  { id: "experience", label: "Experience", icon: Briefcase, color: "indigo" },
  { id: "education", label: "Education", icon: GraduationCap, color: "emerald" },
  { id: "projects", label: "Projects", icon: FolderGit2, color: "amber" },
  { id: "skills", label: "Skills", icon: Wrench, color: "sky" },
  { id: "certifications", label: "Certifications", icon: Award, color: "rose" },
  { id: "achievements", label: "Achievements", icon: Trophy, color: "amber" },
  { id: "languages", label: "Languages", icon: Languages, color: "violet" },
  { id: "interests", label: "Interests", icon: Heart, color: "rose" },
  { id: "references", label: "References", icon: Users, color: "slate" },
];

function getSectionCompletion(data, section) {
  switch (section) {
    case "personal":
      return Object.values(data.personal).filter(Boolean).length >= 3;
    case "summary":
      return data.summary && data.summary.length > 20;
    case "experience":
      return data.experience.some((e) => e.company && e.role && e.description);
    case "education":
      return data.education.some((e) => e.school && e.degree);
    case "projects":
      return data.projects.some((p) => p.name && p.description);
    case "skills":
      return Object.values(data.skills).flat().length > 0;
    case "certifications":
      return data.certifications.some((c) => c.name);
    case "achievements":
      return data.achievements.some((a) => a.title);
    case "languages":
      return data.languages.some((l) => l.language);
    case "interests":
      return data.interests.length > 0;
    case "references":
      return data.references.some((r) => r.name);
    default:
      return false;
  }
}

const colorMap = {
  primary: { dot: "bg-primary-500", ring: "ring-primary-200", text: "text-primary-600" },
  violet: { dot: "bg-violet-500", ring: "ring-violet-200", text: "text-violet-600" },
  indigo: { dot: "bg-indigo-500", ring: "ring-indigo-200", text: "text-indigo-600" },
  emerald: { dot: "bg-emerald-500", ring: "ring-emerald-200", text: "text-emerald-600" },
  amber: { dot: "bg-amber-500", ring: "ring-amber-200", text: "text-amber-600" },
  sky: { dot: "bg-sky-500", ring: "ring-sky-200", text: "text-sky-600" },
  rose: { dot: "bg-rose-500", ring: "ring-rose-200", text: "text-rose-600" },
  slate: { dot: "bg-slate-400", ring: "ring-slate-200", text: "text-slate-500" },
};

export default function SidebarNav({ data, completion, activeSection, onSectionClick }) {
  return (
    <nav className="space-y-5">
      <div className="space-y-2">
        <h2 className="font-heading text-base text-ink">Sections</h2>
        <p className="text-xs text-muted">Click to jump to a section</p>
      </div>

      <div className="space-y-1">
        {sections.map((section) => {
          const done = getSectionCompletion(data, section.id);
          const active = activeSection === section.id;
          const c = colorMap[section.color] || colorMap.primary;

          return (
            <motion.button
              key={section.id}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionClick(section.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 ${
                active
                  ? "nav-active-bg shadow-sm"
                  : "hover:bg-white/40 text-muted hover:text-ink"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  active
                    ? `${c.dot} text-white shadow-sm`
                    : done
                    ? `${c.dot} text-white`
                    : "bg-white/60 text-muted border border-slate-200"
                }`}
              >
                <section.icon size={14} strokeWidth={2} />
              </div>

              <span className={`text-sm font-medium flex-1 ${active ? "text-ink" : ""}`}>
                {section.label}
              </span>

              {done ? (
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              ) : (
                <Circle size={14} className="text-slate-300 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-200/60 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted font-medium">Completion</span>
            <span className="text-ink font-semibold">{completion.percent}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion.percent}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted font-medium">Resume Strength</span>
            <span className={`font-semibold ${
              completion.percent >= 80 ? "text-emerald-600" :
              completion.percent >= 50 ? "text-amber-600" : "text-slate-500"
            }`}>
              {completion.percent >= 80 ? "Strong" :
               completion.percent >= 50 ? "Fair" : "Needs Work"}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, completion.percent + 10)}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className={`h-full rounded-full ${
                completion.percent >= 80 ? "bg-emerald-400" :
                completion.percent >= 50 ? "bg-amber-400" : "bg-slate-400"
              }`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
