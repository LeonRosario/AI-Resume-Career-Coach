import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Briefcase, ArrowRight,
  SlidersHorizontal, DollarSign, Clock,
} from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { jobs } from "../../data/mockData";

const roles       = ["All roles", "Software Engineer", "Frontend Developer", "Full Stack Developer", "Backend Engineer"];
const experiences = ["Any experience", "0-1 yrs", "1-3 yrs", "2-4 yrs", "3-5 yrs", "3-6 yrs"];
const locations   = ["Any location", "Remote", "New York, NY", "Austin, TX", "San Francisco, CA"];

function FilterSelect({ value, onChange, options, label }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-[10px] font-semibold text-muted uppercase tracking-wide">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="glass-input rounded-xl py-2.5 px-3.5 pr-8 text-sm font-medium text-body outline-none appearance-none cursor-pointer w-full"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

function MatchRing({ value }) {
  const color = value >= 85 ? "#22C55E" : value >= 70 ? "#2563EB" : "#F59E0B";
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg width="48" height="48" className="-rotate-90">
        <circle cx="24" cy="24" r={r} stroke="rgba(37,99,235,0.08)" strokeWidth="4" fill="none" />
        <motion.circle
          cx="24" cy="24" r={r}
          stroke={color} strokeWidth="4" fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
  );
}

export default function JobMatch() {
  const [role, setRole]         = useState(roles[0]);
  const [experience, setExperience] = useState(experiences[0]);
  const [location, setLocation] = useState(locations[0]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (role !== "All roles" && j.title !== role) return false;
      if (experience !== "Any experience" && j.experience !== experience) return false;
      if (location !== "Any location" && j.location !== location) return false;
      return true;
    });
  }, [role, experience, location]);

  return (
    <div className="space-y-5">

      {/* Filters */}
      <GlassCard className="p-5" accent>
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex items-center gap-2 text-muted mr-1 self-end pb-[3px]">
            <SlidersHorizontal size={15} />
            <span className="text-sm font-medium">Filters</span>
          </div>
          <FilterSelect label="Role"       value={role}       onChange={setRole}       options={roles} />
          <FilterSelect label="Experience" value={experience} onChange={setExperience} options={experiences} />
          <FilterSelect label="Location"   value={location}   onChange={setLocation}   options={locations} />
          <span className="text-sm text-muted ml-auto self-end pb-[3px]">
            <strong className="text-ink">{filtered.length}</strong> matches
          </span>
        </div>
      </GlassCard>

      {/* Job grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="glass rounded-[20px] p-5 flex flex-col cursor-pointer hover:shadow-glass-lg transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center shrink-0">
                  <Briefcase size={18} className="text-primary-600" strokeWidth={1.8} />
                </div>
                <MatchRing value={job.match} />
              </div>

              {/* Job info */}
              <h3 className="font-heading text-base text-ink leading-snug">{job.title}</h3>
              <p className="text-sm text-muted mt-0.5">{job.company}</p>

              <div className="flex items-center gap-1 text-xs text-muted mt-2">
                <MapPin size={12} className="shrink-0" />
                <span>{job.location}</span>
                <span className="mx-1 opacity-40">·</span>
                <Clock size={12} className="shrink-0" />
                <span>{job.experience}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {job.required.map((r) => (
                  <Badge key={r} tone="neutral" size="sm">{r}</Badge>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1 text-sm font-semibold text-body">
                  <DollarSign size={13} className="text-emerald-500" />
                  {job.salary}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="!px-2 text-primary-600 hover:text-primary-700"
                >
                  Apply
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <GlassCard className="p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Briefcase size={22} className="text-muted" />
          </div>
          <p className="text-sm font-medium text-body">No roles match these filters</p>
          <p className="text-xs text-muted mt-1">Try widening your search</p>
        </GlassCard>
      )}
    </div>
  );
}
