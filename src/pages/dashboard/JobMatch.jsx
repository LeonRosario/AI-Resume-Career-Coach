import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ArrowRight, SlidersHorizontal } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { jobs } from "../../data/mockData";

const roles = ["All roles", "Software Engineer", "Frontend Developer", "Full Stack Developer", "Backend Engineer"];
const experiences = ["Any experience", "0-1 yrs", "1-3 yrs", "2-4 yrs", "3-5 yrs", "3-6 yrs"];
const locations = ["Any location", "Remote", "New York, NY", "Austin, TX", "San Francisco, CA"];

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="glass-input rounded-xl py-2.5 px-4 text-sm font-medium text-ink/75 outline-none focus:ring-2 focus:ring-primary-400/60 cursor-pointer"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export default function JobMatch() {
  const [role, setRole] = useState(roles[0]);
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
    <div className="space-y-6">
      <GlassCard className="p-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-ink/50 text-sm font-medium mr-1">
          <SlidersHorizontal size={16} /> Filters
        </div>
        <FilterSelect value={role} onChange={setRole} options={roles} />
        <FilterSelect value={experience} onChange={setExperience} options={experiences} />
        <FilterSelect value={location} onChange={setLocation} options={locations} />
        <span className="text-sm text-ink/40 ml-auto">{filtered.length} matches found</span>
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((job, i) => (
          <GlassCard key={job.id} hover delay={i * 0.06} className="p-6 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-brand-gradient-soft flex items-center justify-center">
                <Briefcase size={18} className="text-primary-600" />
              </div>
              <Badge tone={job.match >= 85 ? "success" : job.match >= 70 ? "brand" : "warning"}>
                Match: {job.match}%
              </Badge>
            </div>

            <h3 className="font-heading font-bold text-ink">{job.title}</h3>
            <p className="text-sm text-ink/50">{job.company}</p>

            <div className="flex items-center gap-1.5 text-xs text-ink/45 mt-2">
              <MapPin size={13} /> {job.location} · {job.experience}
            </div>

            <p className="text-xs font-semibold text-ink/40 mt-4 mb-2 tracking-wide uppercase">
              Required
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.required.map((r) => (
                <Badge key={r}>{r}</Badge>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[rgba(0,132,255,0.1)]">
              <span className="text-sm font-semibold text-ink/70">{job.salary}</span>
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right" className="!px-2">
                Apply
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {filtered.length === 0 && (
        <GlassCard className="p-12 text-center">
          <p className="text-ink/50">No roles match these filters yet. Try widening your search.</p>
        </GlassCard>
      )}
    </div>
  );
}
