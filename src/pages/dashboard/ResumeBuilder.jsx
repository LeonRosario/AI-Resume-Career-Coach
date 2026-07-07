import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User, AlignLeft, GraduationCap, Briefcase, FolderGit2,
  Wrench, Award, Trophy, Languages, Heart, Users,
  Plus, Trash2, Image, Link, Globe, GitFork,
  Eye, Maximize2, Minimize2, Download,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useResumeBuilder } from "../../lib/useResumeBuilder";
import ResumePreview from "../../components/dashboard/ResumePreview";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SidebarNav from "../../components/builder/SidebarNav";
import TopToolbar from "../../components/builder/TopToolbar";
import SectionCard from "../../components/builder/SectionCard";
import SkillChip from "../../components/builder/SkillChip";
import AIActionButton from "../../components/builder/AIActionButton";
import ATSPanel from "../../components/builder/ATSPanel";

const SKILL_CATEGORIES = [
  { key: "programmingLanguages", label: "Programming Languages", color: "primary" },
  { key: "frontend", label: "Frontend", color: "sky" },
  { key: "backend", label: "Backend", color: "violet" },
  { key: "databases", label: "Databases", color: "emerald" },
  { key: "cloud", label: "Cloud", color: "indigo" },
  { key: "devops", label: "DevOps", color: "amber" },
  { key: "tools", label: "Tools", color: "rose" },
  { key: "softSkills", label: "Soft Skills", color: "slate" },
];

const PROFICIENCIES = ["Beginner", "Intermediate", "Advanced", "Native"];

export default function ResumeBuilder() {
  const {
    data, completion, ats, saving, lastSaved,
    canUndo, canRedo,
    updatePersonal, updateSummary, updateSkills, addSkill, removeSkill,
    updateListItem, addListItem, removeListItem,
    addInterest, removeInterest, updateInterest,
    setResumeName, undo, redo, reset,
  } = useResumeBuilder();

  const [activeSection, setActiveSection] = useState("personal");
  const [improving, setImproving] = useState({});
  const [exporting, setExporting] = useState(false);
  const [previewFull, setPreviewFull] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [template, setTemplate] = useState("modern");
  const [skillInputs, setSkillInputs] = useState({});
  const [interestInput, setInterestInput] = useState("");
  const previewRef = useRef(null);

  const scrollToSection = useCallback((id) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const simulateAI = useCallback(async (key, delay = 800) => {
    setImproving((p) => ({ ...p, [key]: true }));
    await new Promise((r) => setTimeout(r, delay));
    setImproving((p) => ({ ...p, [key]: false }));
  }, []);

  const improveSummary = useCallback(async () => {
    await simulateAI("summary");
    const enhancements = [
      " Proven track record of delivering measurable results through strategic thinking and cross-functional collaboration.",
      " Adept at leveraging cutting-edge technologies to drive innovation and optimize workflows.",
      " Passionate about solving complex problems and mentoring teams to achieve excellence.",
    ];
    const add = enhancements[Math.floor(Math.random() * enhancements.length)];
    updateSummary(
      data.summary.trim()
        ? data.summary.trim().endsWith(".") ? data.summary + add : data.summary + "." + add
        : "Experienced professional with a strong background in delivering impactful solutions. " + add.trim()
    );
  }, [data.summary, updateSummary, simulateAI]);

  const rewriteSummary = useCallback(async () => {
    await simulateAI("rewrite-summary", 1000);
    if (data.summary.trim()) {
      const rewritten = data.summary
        .replace(/I am/g, "Dynamic")
        .replace(/I have/g, "Possess")
        .replace(/good/g, "strong")
        .replace(/great/g, "exceptional");
      updateSummary(rewritten);
    }
  }, [data.summary, updateSummary, simulateAI]);

  const shortenSummary = useCallback(async () => {
    await simulateAI("shorten-summary", 600);
    if (data.summary.length > 60) {
      updateSummary(data.summary.split(".").slice(0, 2).join(".") + ".");
    }
  }, [data.summary, updateSummary, simulateAI]);

  const expandSummary = useCallback(async () => {
    await simulateAI("expand-summary", 900);
    updateSummary(
      data.summary + " Committed to continuous learning and professional growth, with a focus on delivering high-impact results that align with organizational goals."
    );
  }, [data.summary, updateSummary, simulateAI]);

  const generateBullet = useCallback(async (id) => {
    await simulateAI(`bullet-${id}`);
    const bullets = [
      "Led cross-functional initiatives that improved team productivity by 25%",
      "Implemented scalable solutions reducing operational costs by 15%",
      "Collaborated with stakeholders to define and deliver key project milestones",
    ];
    const item = data.experience.find((e) => e.id === id);
    if (item) {
      const newBullets = [...(item.bulletPoints || []), bullets[Math.floor(Math.random() * bullets.length)]];
      updateListItem("experience", id, "bulletPoints", newBullets);
    }
  }, [data.experience, updateListItem, simulateAI]);

  const improveExperience = useCallback(async (id) => {
    await simulateAI(`improve-exp-${id}`, 700);
    const item = data.experience.find((e) => e.id === id);
    if (item && item.description) {
      const improved = item.description
        .replace(/helped with/g, "spearheaded")
        .replace(/worked on/g, "engineered")
        .replace(/was responsible for/g, "owned");
      updateListItem("experience", id, "description", improved);
    }
  }, [data.experience, updateListItem, simulateAI]);

  const generateSTAR = useCallback(async (id) => {
    await simulateAI(`star-${id}`, 1000);
    const item = data.experience.find((e) => e.id === id);
    if (item) {
      updateListItem("experience", id, "description",
        "Situation: Faced with [challenge].\nTask: Needed to [objective].\nAction: Implemented [solution] using [tools/technologies].\nResult: Achieved [measurable outcome]."
      );
    }
  }, [data.experience, updateListItem, simulateAI]);

  const generateProjectDesc = useCallback(async (id) => {
    await simulateAI(`project-${id}`, 800);
    const item = data.projects.find((p) => p.id === id);
    if (item && item.name) {
      updateListItem("projects", id, "description",
        `Built ${item.name} using ${item.techStack || "modern technologies"} to solve ${item.name.includes("AI") ? "intelligent automation" : "real-world problems"}. Implemented best practices for scalability, performance, and maintainability.`
      );
    }
  }, [data.projects, updateListItem, simulateAI]);

  const improveProjectATS = useCallback(async (id) => {
    await simulateAI(`project-ats-${id}`, 600);
    const item = data.projects.find((p) => p.id === id);
    if (item && item.description) {
      const atsOptimized = item.description + " Leveraged industry-standard tools and methodologies to ensure robust and scalable architecture.";
      updateListItem("projects", id, "description", atsOptimized);
    }
  }, [data.projects, updateListItem, simulateAI]);

  const highlightAchievements = useCallback(async (id) => {
    await simulateAI(`project-ach-${id}`, 700);
    const item = data.projects.find((p) => p.id === id);
    if (item && item.description) {
      const highlighted = item.description + " Achieved measurable improvements in performance and user satisfaction through iterative development.";
      updateListItem("projects", id, "description", highlighted);
    }
  }, [data.projects, updateListItem, simulateAI]);

  const suggestSkills = useCallback(async () => {
    await simulateAI("suggest-skills", 900);
    const suggestions = {
      programmingLanguages: ["TypeScript", "Python"],
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "Express"],
      databases: ["PostgreSQL", "MongoDB"],
      cloud: ["AWS", "Docker"],
      tools: ["Git", "VS Code"],
    };
    for (const [cat, skills] of Object.entries(suggestions)) {
      for (const skill of skills) {
        if (!data.skills[cat]?.includes(skill)) {
          addSkill(cat, skill);
        }
      }
    }
  }, [data.skills, addSkill, simulateAI]);

  const addSkillFromInput = (category) => {
    const val = (skillInputs[category] || "").trim();
    if (val && !data.skills[category]?.includes(val)) {
      addSkill(category, val);
      setSkillInputs((prev) => ({ ...prev, [category]: "" }));
    }
  };

  const addInterestItem = () => {
    const val = interestInput.trim();
    if (val) {
      addInterest(val);
      setInterestInput("");
    }
  };

  const exportPDF = async () => {
    setExporting(true);
    try {
      const el = document.getElementById("resume-preview");
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      pdf.save(`${data.resumeName || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF export failed", err);
    }
    setExporting(false);
  };

  const exportDOCX = async () => {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 1200));
    alert("DOCX export coming soon! Your resume data is ready.");
    setExporting(false);
  };

  const importResume = () => {
    alert("Import feature coming soon! You'll be able to upload existing resumes.");
  };

  const shareResume = async () => {
    const shareData = {
      title: data.resumeName,
      text: `Check out my resume: ${data.personal.name || "Untitled"}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch {}
  };

  const duplicateResume = () => {
    alert("Duplicate feature coming soon!");
  };

  return (
    <div className="min-h-screen">
      {/* Top Toolbar */}
      <div className="mb-5">
        <TopToolbar
          resumeName={data.resumeName}
          onNameChange={setResumeName}
          saving={saving}
          lastSaved={lastSaved}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          onExportPDF={exportPDF}
          onExportDOCX={exportDOCX}
          onImport={importResume}
          onDuplicate={duplicateResume}
          onShare={shareResume}
        />
      </div>

      {/* 3-Column Layout */}
      <div className="flex gap-5 items-start">
        {/* Left Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden xl:block w-[240px] shrink-0"
        >
          <div className="sticky top-4">
            <GlassCard className="p-5" variant="strong">
              <SidebarNav
                data={data}
                completion={completion}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            </GlassCard>
          </div>
        </motion.aside>

        {/* Center Editor */}
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 min-w-0 space-y-5"
        >
          {/* Personal Info */}
          <div id="section-personal">
            <SectionCard icon={User} title="Personal Information" description="Name, contact, and links" color="primary">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 border-2 border-dashed border-primary-200 flex items-center justify-center cursor-pointer hover:bg-primary-100 transition-colors shrink-0">
                    <Image size={20} className="text-primary-400" />
                  </div>
                  <div className="text-xs text-muted">
                    <p className="font-medium text-ink">Photo</p>
                    <p>Optional · Recommended</p>
                  </div>
                </div>
                <Input label="Full name" placeholder="e.g. Jordan Lee" value={data.personal.name} onChange={(e) => updatePersonal("name", e.target.value)} />
                <Input label="Professional role" placeholder="e.g. Full Stack Developer" value={data.personal.role} onChange={(e) => updatePersonal("role", e.target.value)} />
                <Input label="Email" placeholder="jordan@email.com" value={data.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} />
                <Input label="Phone" placeholder="+1 (555) 000-0000" value={data.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
                <Input label="Location" placeholder="e.g. San Francisco, CA" value={data.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} />
                <Input label="LinkedIn" icon={Link} placeholder="linkedin.com/in/yourprofile" value={data.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} />
                <Input label="GitHub" icon={GitFork} placeholder="github.com/yourhandle" value={data.personal.github} onChange={(e) => updatePersonal("github", e.target.value)} />
                <Input label="Portfolio" icon={Globe} placeholder="yourportfolio.com" value={data.personal.portfolio} onChange={(e) => updatePersonal("portfolio", e.target.value)} className="sm:col-span-2" />
              </div>
            </SectionCard>
          </div>

          {/* Summary */}
          <div id="section-summary">
            <SectionCard
              icon={AlignLeft}
              title="Professional Summary"
              description="A brief overview of your experience and goals"
              color="violet"
              actions={
                <>
                  <AIActionButton onClick={improveSummary} disabled={improving["summary"]}>Improve with AI</AIActionButton>
                  <AIActionButton onClick={rewriteSummary} variant="outline" disabled={improving["rewrite-summary"]}>Rewrite</AIActionButton>
                  <AIActionButton onClick={shortenSummary} variant="ghost" disabled={improving["shorten-summary"]}>Shorten</AIActionButton>
                  <AIActionButton onClick={expandSummary} variant="ghost" disabled={improving["expand-summary"]}>Expand</AIActionButton>
                </>
              }
            >
              <div className="space-y-2">
                <textarea
                  value={data.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  placeholder="Write a 2-4 line professional summary that highlights your experience, key skills, and career objectives..."
                  rows={4}
                  className="glass-input w-full rounded-xl p-4 text-sm text-ink placeholder:text-placeholder outline-none focus:border-primary-400 resize-none transition-all leading-relaxed"
                />
                <div className="flex justify-end">
                  <span className={`text-xs font-medium ${data.summary.length > 20 ? "text-muted" : "text-amber-500"}`}>
                    {data.summary.length} characters
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Experience */}
          <div id="section-experience">
            <SectionCard
              icon={Briefcase}
              title="Experience"
              description="Your work history"
              color="indigo"
            >
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-soft rounded-xl p-5 space-y-4 relative"
                  >
                    {data.experience.length > 1 && (
                      <button
                        onClick={() => removeListItem("experience", exp.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input placeholder="Company name" value={exp.company} onChange={(e) => updateListItem("experience", exp.id, "company", e.target.value)} />
                      <Input placeholder="Job title" value={exp.role} onChange={(e) => updateListItem("experience", exp.id, "role", e.target.value)} />
                      <Input placeholder="Location" value={exp.location} onChange={(e) => updateListItem("experience", exp.id, "location", e.target.value)} />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Start date" value={exp.startDate} onChange={(e) => updateListItem("experience", exp.id, "startDate", e.target.value)} />
                        <div className="flex items-center gap-2">
                          <Input placeholder="End date" value={exp.current ? "Present" : exp.endDate} onChange={(e) => updateListItem("experience", exp.id, "endDate", e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateListItem("experience", exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements. Use metrics when possible."
                      rows={3}
                      className="glass-input w-full rounded-xl p-3.5 text-sm text-ink placeholder:text-placeholder outline-none focus:border-primary-400 resize-none transition-all leading-relaxed"
                    />
                    {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                      <div className="space-y-1.5">
                        {exp.bulletPoints.map((bp, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-body bg-white/60 rounded-lg px-3 py-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                            <span>{bp}</span>
                            <button
                              onClick={() => {
                                const updated = exp.bulletPoints.filter((_, j) => j !== i);
                                updateListItem("experience", exp.id, "bulletPoints", updated);
                              }}
                              className="ml-auto text-muted hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <AIActionButton onClick={() => generateBullet(exp.id)} disabled={improving[`bullet-${exp.id}`]}>Generate Bullet Point</AIActionButton>
                      <AIActionButton onClick={() => improveExperience(exp.id)} variant="outline" disabled={improving[`improve-exp-${exp.id}`]}>Improve Writing</AIActionButton>
                      <AIActionButton onClick={() => generateSTAR(exp.id)} variant="ghost" disabled={improving[`star-${exp.id}`]}>Generate STAR Format</AIActionButton>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={Plus}
                onClick={() => addListItem("experience", { company: "", role: "", location: "", startDate: "", endDate: "", current: false, description: "", bulletPoints: [] })}
                className="mt-3"
              >
                Add Experience
              </Button>
            </SectionCard>
          </div>

          {/* Education */}
          <div id="section-education">
            <SectionCard icon={GraduationCap} title="Education" description="Your academic background" color="emerald">
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-soft rounded-xl p-5 space-y-3 relative"
                  >
                    {data.education.length > 1 && (
                      <button
                        onClick={() => removeListItem("education", edu.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input placeholder="University / School" value={edu.school} onChange={(e) => updateListItem("education", edu.id, "school", e.target.value)} />
                      <Input placeholder="Degree (e.g. B.S.)" value={edu.degree} onChange={(e) => updateListItem("education", edu.id, "degree", e.target.value)} />
                      <Input placeholder="Field of study" value={edu.field} onChange={(e) => updateListItem("education", edu.id, "field", e.target.value)} />
                      <Input placeholder="CGPA / GPA" value={edu.cgpa} onChange={(e) => updateListItem("education", edu.id, "cgpa", e.target.value)} />
                      <Input placeholder="Start date" value={edu.startDate} onChange={(e) => updateListItem("education", edu.id, "startDate", e.target.value)} />
                      <Input placeholder="End date" value={edu.endDate} onChange={(e) => updateListItem("education", edu.id, "endDate", e.target.value)} />
                    </div>
                    <textarea
                      value={edu.achievements}
                      onChange={(e) => updateListItem("education", edu.id, "achievements", e.target.value)}
                      placeholder="Notable achievements, honors, or activities..."
                      rows={2}
                      className="glass-input w-full rounded-xl p-3.5 text-sm text-ink placeholder:text-placeholder outline-none focus:border-primary-400 resize-none transition-all leading-relaxed"
                    />
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" size="sm" icon={Plus} onClick={() => addListItem("education", { school: "", degree: "", field: "", cgpa: "", startDate: "", endDate: "", achievements: "" })} className="mt-3">
                Add Education
              </Button>
            </SectionCard>
          </div>

          {/* Projects */}
          <div id="section-projects">
            <SectionCard
              icon={FolderGit2}
              title="Projects"
              description="Key projects and side work"
              color="amber"
            >
              <div className="space-y-4">
                {data.projects.map((proj, idx) => (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-soft rounded-xl p-5 space-y-3 relative"
                  >
                    {data.projects.length > 1 && (
                      <button
                        onClick={() => removeListItem("projects", proj.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input placeholder="Project name" value={proj.name} onChange={(e) => updateListItem("projects", proj.id, "name", e.target.value)} />
                      <Input placeholder="Tech stack (e.g. React, Node.js)" value={proj.techStack} onChange={(e) => updateListItem("projects", proj.id, "techStack", e.target.value)} />
                      <Input icon={GitFork} placeholder="GitHub URL" value={proj.github} onChange={(e) => updateListItem("projects", proj.id, "github", e.target.value)} />
                      <Input icon={Globe} placeholder="Live demo URL" value={proj.liveDemo} onChange={(e) => updateListItem("projects", proj.id, "liveDemo", e.target.value)} />
                    </div>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateListItem("projects", proj.id, "description", e.target.value)}
                      placeholder="Describe the project, your role, and the impact..."
                      rows={3}
                      className="glass-input w-full rounded-xl p-3.5 text-sm text-ink placeholder:text-placeholder outline-none focus:border-primary-400 resize-none transition-all leading-relaxed"
                    />
                    <div className="flex flex-wrap gap-2">
                      <AIActionButton onClick={() => generateProjectDesc(proj.id)} disabled={improving[`project-${proj.id}`]}>Generate Description</AIActionButton>
                      <AIActionButton onClick={() => improveProjectATS(proj.id)} variant="outline" disabled={improving[`project-ats-${proj.id}`]}>Improve ATS Keywords</AIActionButton>
                      <AIActionButton onClick={() => highlightAchievements(proj.id)} variant="ghost" disabled={improving[`project-ach-${proj.id}`]}>Highlight Achievements</AIActionButton>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" size="sm" icon={Plus} onClick={() => addListItem("projects", { name: "", techStack: "", github: "", liveDemo: "", description: "" })} className="mt-3">
                Add Project
              </Button>
            </SectionCard>
          </div>

          {/* Skills */}
          <div id="section-skills">
            <SectionCard
              icon={Wrench}
              title="Skills"
              description="Categorized technical and professional skills"
              color="sky"
              actions={
                <AIActionButton onClick={suggestSkills} disabled={improving["suggest-skills"]}>Suggest Missing Skills</AIActionButton>
              }
            >
              <div className="space-y-5">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.key}>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-medium text-ink">{cat.label}</span>
                      <span className="text-xs text-muted">{data.skills[cat.key]?.length || 0} skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {data.skills[cat.key]?.map((skill, idx) => (
                        <SkillChip
                          key={skill}
                          label={skill}
                          color={cat.color}
                          onRemove={() => removeSkill(cat.key, idx)}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={skillInputs[cat.key] || ""}
                        onChange={(e) => setSkillInputs((prev) => ({ ...prev, [cat.key]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkillFromInput(cat.key); } }}
                        placeholder={`Add ${cat.label.toLowerCase().slice(0, -1)}...`}
                        className="glass-input flex-1 rounded-xl px-3.5 py-2 text-xs text-ink placeholder:text-placeholder outline-none focus:border-primary-400 transition-all"
                      />
                      <button
                        onClick={() => addSkillFromInput(cat.key)}
                        className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center hover:bg-primary-100 transition-colors shrink-0"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Certifications */}
          <div id="section-certifications">
            <SectionCard icon={Award} title="Certifications" description="Professional certifications and licenses" color="rose">
              <div className="space-y-4">
                {data.certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-soft rounded-xl p-5 space-y-3 relative"
                  >
                    {data.certifications.length > 1 && (
                      <button
                        onClick={() => removeListItem("certifications", cert.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input placeholder="Certificate name" value={cert.name} onChange={(e) => updateListItem("certifications", cert.id, "name", e.target.value)} />
                      <Input placeholder="Issuing organization" value={cert.issuer} onChange={(e) => updateListItem("certifications", cert.id, "issuer", e.target.value)} />
                      <Input placeholder="Date obtained" value={cert.date} onChange={(e) => updateListItem("certifications", cert.id, "date", e.target.value)} />
                      <Input placeholder="Credential URL (optional)" value={cert.credentialUrl} onChange={(e) => updateListItem("certifications", cert.id, "credentialUrl", e.target.value)} />
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" size="sm" icon={Plus} onClick={() => addListItem("certifications", { name: "", issuer: "", date: "", credentialUrl: "" })} className="mt-3">
                Add Certification
              </Button>
            </SectionCard>
          </div>

          {/* Achievements */}
          <div id="section-achievements">
            <SectionCard icon={Trophy} title="Achievements" description="Awards, honors, and accomplishments" color="amber">
              <div className="space-y-4">
                {data.achievements.map((ach, idx) => (
                  <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-soft rounded-xl p-5 space-y-3 relative"
                  >
                    {data.achievements.length > 1 && (
                      <button
                        onClick={() => removeListItem("achievements", ach.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <Input placeholder="Achievement title" value={ach.title} onChange={(e) => updateListItem("achievements", ach.id, "title", e.target.value)} />
                    <textarea
                      value={ach.description}
                      onChange={(e) => updateListItem("achievements", ach.id, "description", e.target.value)}
                      placeholder="Describe the achievement and its impact..."
                      rows={2}
                      className="glass-input w-full rounded-xl p-3.5 text-sm text-ink placeholder:text-placeholder outline-none focus:border-primary-400 resize-none transition-all leading-relaxed"
                    />
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" size="sm" icon={Plus} onClick={() => addListItem("achievements", { title: "", description: "" })} className="mt-3">
                Add Achievement
              </Button>
            </SectionCard>
          </div>

          {/* Languages */}
          <div id="section-languages">
            <SectionCard icon={Languages} title="Languages" description="Languages you speak" color="violet">
              <div className="space-y-3">
                {data.languages.map((lang, idx) => (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-soft rounded-xl p-4 flex items-center gap-3 relative"
                  >
                    {data.languages.length > 1 && (
                      <button
                        onClick={() => removeListItem("languages", lang.id)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                    <div className="flex-1">
                      <input
                        value={lang.language}
                        onChange={(e) => updateListItem("languages", lang.id, "language", e.target.value)}
                        placeholder="e.g. English"
                        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-placeholder"
                      />
                    </div>
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateListItem("languages", lang.id, "proficiency", e.target.value)}
                      className="glass-input rounded-lg px-3 py-1.5 text-xs text-ink outline-none focus:border-primary-400 transition-all"
                    >
                      {PROFICIENCIES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" size="sm" icon={Plus} onClick={() => addListItem("languages", { language: "", proficiency: "Intermediate" })} className="mt-3">
                Add Language
              </Button>
            </SectionCard>
          </div>

          {/* Interests */}
          <div id="section-interests">
            <SectionCard icon={Heart} title="Interests" description="Personal interests and hobbies" color="rose">
              <div className="flex flex-wrap gap-2 mb-3">
                {data.interests.map((item) => (
                  <motion.span
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200"
                  >
                    {item.interest}
                    <button
                      onClick={() => removeInterest(item.id)}
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-rose-200/50 transition-colors"
                    >
                      <Trash2 size={9} strokeWidth={2.5} />
                    </button>
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addInterestItem(); } }}
                  placeholder="Add an interest..."
                  className="glass-input flex-1 rounded-xl px-3.5 py-2 text-sm text-ink placeholder:text-placeholder outline-none focus:border-primary-400 transition-all"
                />
                <button
                  onClick={addInterestItem}
                  className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors shrink-0"
                >
                  <Plus size={15} />
                </button>
              </div>
            </SectionCard>
          </div>

          {/* References */}
          <div id="section-references">
            <SectionCard icon={Users} title="References" description="Professional references" color="slate">
              <div className="space-y-4">
                {data.references.map((ref, idx) => (
                  <motion.div
                    key={ref.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-soft rounded-xl p-5 space-y-3 relative"
                  >
                    {data.references.length > 1 && (
                      <button
                        onClick={() => removeListItem("references", ref.id)}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input placeholder="Full name" value={ref.name} onChange={(e) => updateListItem("references", ref.id, "name", e.target.value)} />
                      <Input placeholder="Job title" value={ref.title} onChange={(e) => updateListItem("references", ref.id, "title", e.target.value)} />
                      <Input placeholder="Company" value={ref.company} onChange={(e) => updateListItem("references", ref.id, "company", e.target.value)} />
                      <Input placeholder="Email" value={ref.email} onChange={(e) => updateListItem("references", ref.id, "email", e.target.value)} />
                      <Input placeholder="Phone" value={ref.phone} onChange={(e) => updateListItem("references", ref.id, "phone", e.target.value)} />
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" size="sm" icon={Plus} onClick={() => addListItem("references", { name: "", title: "", company: "", email: "", phone: "" })} className="mt-3">
                Add Reference
              </Button>
            </SectionCard>
          </div>

          {/* Bottom spacer */}
          <div className="h-8" />
        </motion.main>

        {/* Right Panel - ATS + Preview */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={`${previewFull ? "fixed inset-4 z-50" : "hidden lg:block w-[360px] shrink-0"} transition-all`}
        >
          <div className={`${previewFull ? "h-full overflow-y-auto" : "sticky top-4"} space-y-4`}>
            {/* ATS Panel */}
            <ATSPanel ats={ats} />

            {/* Preview Panel */}
            <motion.div
              layout
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Preview Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-1">
                <div>
                  <h3 className="font-heading text-sm text-ink">Live Preview</h3>
                  <p className="text-[10px] text-muted">ATS-friendly layout</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="text-[11px] font-medium bg-white/80 border border-slate-200 rounded-lg px-2 py-1 text-muted outline-none focus:border-primary-400 cursor-pointer"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                    <option value="ats">ATS</option>
                  </select>
                  <div className="flex items-center gap-1">
                  <button
                    onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-ink hover:bg-white/50 transition-all"
                  >
                    <Minimize2 size={12} />
                  </button>
                  <span className="text-[11px] font-medium text-muted w-8 text-center">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-ink hover:bg-white/50 transition-all"
                  >
                    <Maximize2 size={12} />
                  </button>
                  {previewFull && (
                    <button
                      onClick={() => setPreviewFull(false)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-ink hover:bg-white/50 transition-all ml-1"
                    >
                      <Minimize2 size={12} />
                    </button>
                  )}
                </div>
              </div>
              </div>

              {/* Preview Content */}
              <div className="px-5 pb-5" ref={previewRef}>
                <div
                  className="rounded-xl overflow-hidden shadow-glass-lg border border-slate-100"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.3s ease" }}
                >
                  <ResumePreview data={data} template={template} />
                </div>
              </div>

              {/* Preview Actions */}
              <div className="px-5 pb-4 flex items-center gap-2">
                <Button variant="primary" size="xs" icon={Download} full onClick={exportPDF} loading={exporting}>
                  {exporting ? "Exporting..." : "Download PDF"}
                </Button>
                <button
                  onClick={() => setPreviewFull((p) => !p)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-muted hover:text-ink hover:bg-white/50 border border-transparent hover:border-slate-200 transition-all"
                >
                  Fullscreen
                </button>
              </div>
            </motion.div>
          </div>
        </motion.aside>

        {/* Mobile bottom toolbar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
          <div className="glass-strong rounded-t-2xl px-4 py-3 flex items-center justify-between">
            <Button variant="outline" size="xs" icon={Eye}>Preview</Button>
            <Button variant="primary" size="xs" icon={Download} onClick={exportPDF} loading={exporting}>
              {exporting ? "..." : "PDF"}
            </Button>
          </div>
        </div>
      </div>

      {/* Empty padding for mobile toolbar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
