import { motion } from "framer-motion";
import {
  User, AlignLeft, GraduationCap, Briefcase, FolderGit2,
  Wrench, Award, Trophy, Languages, Heart, Users,
  CheckCircle2, CircleDot,
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

function getSectionDone(data, section) {
  switch (section) {
    case "personal": return Object.values(data.personal).filter(Boolean).length >= 3;
    case "summary": return data.summary && data.summary.length > 20;
    case "experience": return data.experience.some((e) => e.company && e.role && e.description);
    case "education": return data.education.some((e) => e.school && e.degree);
    case "projects": return data.projects.some((p) => p.name && p.description);
    case "skills": return Object.values(data.skills).flat().length > 0;
    case "certifications": return data.certifications.some((c) => c.name);
    case "achievements": return data.achievements.some((a) => a.title);
    case "languages": return data.languages.some((l) => l.language);
    case "interests": return data.interests.length > 0;
    case "references": return data.references.some((r) => r.name);
    default: return false;
  }
}

const colorMap = {
  primary: { dot: "bg-primary-500", text: "text-primary-600", ring: "ring-primary-200", bg: "bg-primary-100" },
  violet: { dot: "bg-violet-500", text: "text-violet-600", ring: "ring-violet-200", bg: "bg-violet-100" },
  indigo: { dot: "bg-indigo-500", text: "text-indigo-600", ring: "ring-indigo-200", bg: "bg-indigo-100" },
  emerald: { dot: "bg-emerald-500", text: "text-emerald-600", ring: "ring-emerald-200", bg: "bg-emerald-100" },
  amber: { dot: "bg-amber-500", text: "text-amber-600", ring: "ring-amber-200", bg: "bg-amber-100" },
  sky: { dot: "bg-sky-500", text: "text-sky-600", ring: "ring-sky-200", bg: "bg-sky-100" },
  rose: { dot: "bg-rose-500", text: "text-rose-600", ring: "ring-rose-200", bg: "bg-rose-100" },
  slate: { dot: "bg-slate-400", text: "text-slate-500", ring: "ring-slate-200", bg: "bg-slate-100" },
};

export default function SidebarNav({ data, completion, activeSection, onSectionClick }) {
  return (
    <nav className="space-y-6">
      <div>
        <h2 className="font-heading text-lg text-ink tracking-tight">Sections</h2>
        <p className="text-xs text-muted/70 mt-0.5">Navigate your resume</p>
      </div>

      <div className="space-y-0.5">
        {sections.map((section) => {
          const done = getSectionDone(data, section.id);
          const active = activeSection === section.id;
          const c = colorMap[section.color] || colorMap.primary;

          return (
            <motion.button
              key={section.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionClick(section.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-primary-50/80 to-primary-50/40 shadow-sm border border-primary-100/60"
                  : "hover:bg-slate-50/60 text-muted hover:text-ink border border-transparent"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                  active
                    ? `${c.dot} text-white shadow-sm shadow-${section.color}-200/30`
                    : done
                    ? `${c.bg} ${c.text}`
                    : "bg-slate-50 text-slate-400 border border-slate-200/60"
                }`}
              >
                <section.icon size={15} strokeWidth={active ? 2.2 : 1.8} />
              </div>

              <span className={`text-sm flex-1 leading-snug ${active ? "font-semibold text-ink" : "font-medium"}`}>
                {section.label}
              </span>

              {done ? (
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" strokeWidth={2.2} />
              ) : (
                <CircleDot size={14} className="text-slate-300 shrink-0" strokeWidth={1.5} />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="pt-5 border-t border-slate-200/50 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted font-medium">Completion</span>
            <span className="font-bold text-ink tabular-nums">{completion.percent}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion.percent}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-violet-500 shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted font-medium">Resume Strength</span>
            <span className={`font-bold tabular-nums ${
              completion.percent >= 80 ? "text-emerald-600" :
              completion.percent >= 50 ? "text-amber-600" : "text-slate-500"
            }`}>
              {completion.percent >= 80 ? "Strong" :
               completion.percent >= 50 ? "Fair" : "Needs Work"}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, completion.percent + 10)}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
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
