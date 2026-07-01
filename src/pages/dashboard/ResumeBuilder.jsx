import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Wand2, Plus, Trash2, Download,
  User, GraduationCap, Briefcase, FolderGit2, Wrench,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ResumePreview from "../../components/dashboard/ResumePreview";
import { useResumeBuilder } from "../../lib/useResumeBuilder";

const sampleSummary =
  "Full-stack developer with 3+ years building scalable web apps using React and Node.js. Proven record of shipping features that improved user engagement by double digits.";

function SectionHeader({ icon: Icon, title, color = "text-primary-600", bg = "bg-primary-50 border-primary-100" }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${bg}`}>
        <Icon size={15} className={color} />
      </div>
      <h3 className="font-heading text-base text-ink">{title}</h3>
    </div>
  );
}

export default function ResumeBuilder() {
  const {
    data, updatePersonal, updateSummary, updateSkills,
    updateListItem, addListItem, removeListItem,
  } = useResumeBuilder();

  const [improving, setImproving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const generateSummary = () => {
    setImproving(true);
    setTimeout(() => { updateSummary(sampleSummary); setImproving(false); }, 1000);
  };

  const improveWriting = () => {
    if (!data.summary) return generateSummary();
    setImproving(true);
    setTimeout(() => {
      updateSummary(
        data.summary.trim().endsWith(".")
          ? data.summary + " Known for clear communication and fast iteration."
          : data.summary + ". Known for clear communication and fast iteration."
      );
      setImproving(false);
    }, 900);
  };

  const exportPDF = async () => {
    setExporting(true);
    const el = document.getElementById("resume-preview");
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save(`${data.personal.name || "resume"}.pdf`);
    setExporting(false);
  };

  return (
    <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-5">

      {/* ── Editor ── */}
      <div className="space-y-5">

        {/* Personal Info */}
        <GlassCard className="p-6" accent>
          <SectionHeader icon={User} title="Personal Info" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full name"  placeholder="Jordan Lee"            value={data.personal.name}     onChange={(e) => updatePersonal("name",     e.target.value)} />
            <Input label="Title"      placeholder="Full Stack Developer"  value={data.personal.title}    onChange={(e) => updatePersonal("title",    e.target.value)} />
            <Input label="Email"      placeholder="jordan@email.com"      value={data.personal.email}    onChange={(e) => updatePersonal("email",    e.target.value)} />
            <Input label="Phone"      placeholder="(555) 123-4567"        value={data.personal.phone}    onChange={(e) => updatePersonal("phone",    e.target.value)} />
            <Input label="Location"   placeholder="Austin, TX"            value={data.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} className="sm:col-span-2" />
          </div>
        </GlassCard>

        {/* Summary */}
        <GlassCard className="p-6">
          <SectionHeader icon={Sparkles} title="Professional Summary" color="text-violet-600" bg="bg-violet-50 border-violet-100" />
          <textarea
            value={data.summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="A 2–3 line summary of your experience and what you're looking for..."
            rows={4}
            className="glass-input w-full rounded-xl p-3.5 text-sm text-ink placeholder:text-placeholder outline-none focus:border-primary-400 resize-none transition-all"
            style={{ lineHeight: 1.7 }}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            <Button variant="outline" size="sm" icon={Wand2} onClick={improveWriting} disabled={improving}>
              {improving ? "Improving..." : "Improve Writing"}
            </Button>
            <Button variant="ghost" size="sm" icon={Sparkles} onClick={generateSummary} disabled={improving}>
              Generate Summary
            </Button>
          </div>
        </GlassCard>

        {/* Education */}
        <GlassCard className="p-6">
          <SectionHeader icon={GraduationCap} title="Education" color="text-emerald-600" bg="bg-emerald-50 border-emerald-100" />
          <div className="space-y-3">
            {data.education.map((e) => (
              <div key={e.id} className="glass-soft rounded-xl p-4">
                <div className="grid sm:grid-cols-3 gap-3">
                  <Input placeholder="School"  value={e.school} onChange={(ev) => updateListItem("education", e.id, "school", ev.target.value)} />
                  <Input placeholder="Degree"  value={e.degree} onChange={(ev) => updateListItem("education", e.id, "degree", ev.target.value)} />
                  <Input placeholder="Year"    value={e.year}   onChange={(ev) => updateListItem("education", e.id, "year",   ev.target.value)} />
                </div>
                {data.education.length > 1 && (
                  <button onClick={() => removeListItem("education", e.id)} className="text-xs text-red-500 mt-2.5 flex items-center gap-1 hover:text-red-600 transition-colors">
                    <Trash2 size={11} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" icon={Plus} className="mt-3" onClick={() => addListItem("education", { school: "", degree: "", year: "" })}>
            Add education
          </Button>
        </GlassCard>

        {/* Experience */}
        <GlassCard className="p-6">
          <SectionHeader icon={Briefcase} title="Experience" color="text-indigo-600" bg="bg-indigo-50 border-indigo-100" />
          <div className="space-y-3">
            {data.experience.map((e) => (
              <div key={e.id} className="glass-soft rounded-xl p-4 space-y-3">
                <div className="grid sm:grid-cols-3 gap-3">
                  <Input placeholder="Role"     value={e.role}     onChange={(ev) => updateListItem("experience", e.id, "role",     ev.target.value)} />
                  <Input placeholder="Company"  value={e.company}  onChange={(ev) => updateListItem("experience", e.id, "company",  ev.target.value)} />
                  <Input placeholder="Duration" value={e.duration} onChange={(ev) => updateListItem("experience", e.id, "duration", ev.target.value)} />
                </div>
                <textarea
                  value={e.desc}
                  onChange={(ev) => updateListItem("experience", e.id, "desc", ev.target.value)}
                  placeholder="What did you build or improve? Use a metric if you can."
                  rows={2}
                  className="glass-input w-full rounded-xl p-3 text-sm outline-none focus:border-primary-400 resize-none transition-all"
                />
                {data.experience.length > 1 && (
                  <button onClick={() => removeListItem("experience", e.id)} className="text-xs text-red-500 flex items-center gap-1 hover:text-red-600 transition-colors">
                    <Trash2 size={11} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" icon={Plus} className="mt-3" onClick={() => addListItem("experience", { company: "", role: "", duration: "", desc: "" })}>
            Add experience
          </Button>
        </GlassCard>

        {/* Projects */}
        <GlassCard className="p-6">
          <SectionHeader icon={FolderGit2} title="Projects" color="text-amber-600" bg="bg-amber-50 border-amber-100" />
          <div className="space-y-3">
            {data.projects.map((p) => (
              <div key={p.id} className="glass-soft rounded-xl p-4 space-y-3">
                <Input placeholder="Project name" value={p.name} onChange={(ev) => updateListItem("projects", p.id, "name", ev.target.value)} />
                <textarea
                  value={p.desc}
                  onChange={(ev) => updateListItem("projects", p.id, "desc", ev.target.value)}
                  placeholder="Brief description and tech stack..."
                  rows={2}
                  className="glass-input w-full rounded-xl p-3 text-sm outline-none focus:border-primary-400 resize-none transition-all"
                />
                {data.projects.length > 1 && (
                  <button onClick={() => removeListItem("projects", p.id)} className="text-xs text-red-500 flex items-center gap-1 hover:text-red-600 transition-colors">
                    <Trash2 size={11} /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" icon={Plus} className="mt-3" onClick={() => addListItem("projects", { name: "", desc: "" })}>
            Add project
          </Button>
        </GlassCard>

        {/* Skills */}
        <GlassCard className="p-6">
          <SectionHeader icon={Wrench} title="Skills" />
          <Input
            placeholder="React, Node.js, SQL, Docker, TypeScript..."
            value={data.skills}
            onChange={(e) => updateSkills(e.target.value)}
            hint="Separate skills with commas"
          />
        </GlassCard>
      </div>

      {/* ── Live preview ── */}
      <div className="lg:sticky lg:top-4 h-fit space-y-4">
        <GlassCard className="p-5" accent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading text-base text-ink">Live Preview</h3>
              <p className="text-xs text-muted">Updates as you type</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={exportPDF}
              disabled={exporting}
              loading={exporting}
            >
              {exporting ? "Exporting..." : "Download PDF"}
            </Button>
          </div>
          <div className="max-h-[720px] overflow-y-auto rounded-xl border border-slate-100">
            <ResumePreview data={data} />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
