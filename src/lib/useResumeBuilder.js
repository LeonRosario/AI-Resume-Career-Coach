import { useState, useCallback, useRef, useEffect } from "react";

const INITIAL_SKILLS = {
  programmingLanguages: [],
  frontend: [],
  backend: [],
  databases: [],
  cloud: [],
  devops: [],
  tools: [],
  softSkills: [],
};

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const emptyPersonal = {
  photo: "",
  name: "",
  role: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  location: "",
};

const emptyExperience = () => ({
  id: createId(),
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  bulletPoints: [],
});

const emptyEducation = () => ({
  id: createId(),
  school: "",
  degree: "",
  field: "",
  cgpa: "",
  startDate: "",
  endDate: "",
  achievements: "",
});

const emptyProject = () => ({
  id: createId(),
  name: "",
  techStack: "",
  github: "",
  liveDemo: "",
  description: "",
});

const emptyCertification = () => ({
  id: createId(),
  name: "",
  issuer: "",
  date: "",
  credentialUrl: "",
});

const emptyAchievement = () => ({
  id: createId(),
  title: "",
  description: "",
});

const emptyLanguage = () => ({
  id: createId(),
  language: "",
  proficiency: "Intermediate",
});

const emptyReference = () => ({
  id: createId(),
  name: "",
  title: "",
  company: "",
  email: "",
  phone: "",
});

const initialState = {
  resumeName: "My Resume",
  personal: { ...emptyPersonal },
  summary: "",
  education: [emptyEducation()],
  experience: [emptyExperience()],
  projects: [emptyProject()],
  skills: JSON.parse(JSON.stringify(INITIAL_SKILLS)),
  certifications: [emptyCertification()],
  achievements: [emptyAchievement()],
  languages: [emptyLanguage()],
  interests: [],
  references: [emptyReference()],
};

function computeCompletion(data) {
  const checks = [];

  if (data.personal.name) checks.push(true); else checks.push(false);
  if (data.personal.email) checks.push(true); else checks.push(false);
  if (data.personal.phone) checks.push(true); else checks.push(false);
  if (data.personal.role) checks.push(true); else checks.push(false);
  if (data.summary && data.summary.length > 20) checks.push(true); else checks.push(false);
  if (data.education.some((e) => e.school && e.degree)) checks.push(true); else checks.push(false);
  if (data.experience.some((e) => e.company && e.role)) checks.push(true); else checks.push(false);
  if (data.projects.some((p) => p.name && p.description)) checks.push(true); else checks.push(false);
  if (data.skills && Object.values(data.skills).flat().length > 0) checks.push(true); else checks.push(false);
  if (data.certifications.some((c) => c.name)) checks.push(true); else checks.push(false);

  const total = checks.length;
  const done = checks.filter(Boolean).length;
  return { percent: Math.round((done / total) * 100), score: done };
}

function computeATSScore(data) {
  const hasName = data.personal.name ? 1 : 0;
  const hasEmail = data.personal.email ? 1 : 0;
  const hasPhone = data.personal.phone ? 1 : 0;
  const hasLinkedIn = data.personal.linkedin ? 1 : 0;
  const hasSummary = data.summary && data.summary.length > 30 ? 1 : 0;
  const hasExperience = data.experience.some((e) => e.description && e.description.length > 30) ? 1 : 0;
  const hasEducation = data.education.some((e) => e.school && e.degree) ? 1 : 0;
  const hasProjects = data.projects.length > 0 && data.projects[0].name ? 1 : 0;
  const hasSkills = Object.values(data.skills).flat().length > 0 ? 1 : 0;
  const hasCertifications = data.certifications.some((c) => c.name) ? 1 : 0;

  const raw = hasName + hasEmail + hasPhone + hasLinkedIn + hasSummary + hasExperience + hasEducation + hasProjects + hasSkills + hasCertifications;
  const atsScore = Math.round((raw / 10) * 100);

  const totalSkills = Object.values(data.skills).flat().length;
  const keywordScore = Math.min(100, totalSkills * 8 + 20);
  const formattingScore = hasSummary && hasExperience && hasEducation ? 90 : 65;
  const readability = data.summary && data.summary.length > 20 ? 85 : 50;
  const sectionCoverage = Math.round((raw / 10) * 100);

  const suggestions = [];
  if (!data.personal.name) suggestions.push("Add your full name");
  if (!data.personal.email) suggestions.push("Add an email address");
  if (!data.personal.phone) suggestions.push("Add a phone number");
  if (!data.personal.linkedin) suggestions.push("Add a LinkedIn URL");
  if (!data.summary || data.summary.length < 30) suggestions.push("Write a professional summary (30+ characters)");
  if (!data.experience.some((e) => e.description && e.description.length > 30)) suggestions.push("Add detailed descriptions to your experience");
  if (Object.values(data.skills).flat().length < 5) suggestions.push("Add at least 5 skills");
  if (!data.education.some((e) => e.school && e.degree)) suggestions.push("Add your education details");

  return {
    atsScore,
    keywordScore,
    formattingScore,
    readability,
    sectionCoverage,
    suggestions,
    grammar: Math.min(100, readability + 10),
  };
}

export function useResumeBuilder() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("resume-builder-data");
      if (saved) return JSON.parse(saved);
    } catch {}
    return JSON.parse(JSON.stringify(initialState));
  });

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastSaved, setLastSaved] = useState(null);
  const [saving, setSaving] = useState(false);
  const isUndoRedo = useRef(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    if (isUndoRedo.current) {
      isUndoRedo.current = false;
      return;
    }
    const entry = JSON.parse(JSON.stringify(data));
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      next.push(entry);
      if (next.length > 50) next.shift();
      return next;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 49));
  }, [data]);

  useEffect(() => {
    setSaving(true);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem("resume-builder-data", JSON.stringify(data));
      setLastSaved(new Date().toLocaleTimeString());
      setSaving(false);
    }, 800);
    return () => clearTimeout(saveTimer.current);
  }, [data]);

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    isUndoRedo.current = true;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setData(JSON.parse(JSON.stringify(history[newIndex])));
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    isUndoRedo.current = true;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setData(JSON.parse(JSON.stringify(history[newIndex])));
  }, [history, historyIndex]);

  const setResumeName = useCallback((name) => {
    setData((d) => ({ ...d, resumeName: name }));
  }, []);

  const updatePersonal = useCallback((field, value) => {
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));
  }, []);

  const updateSummary = useCallback((value) => {
    setData((d) => ({ ...d, summary: value }));
  }, []);

  const updateSkills = useCallback((category, skills) => {
    setData((d) => ({ ...d, skills: { ...d.skills, [category]: skills } }));
  }, []);

  const addSkill = useCallback((category, skill) => {
    setData((d) => ({
      ...d,
      skills: { ...d.skills, [category]: [...(d.skills[category] || []), skill] },
    }));
  }, []);

  const removeSkill = useCallback((category, index) => {
    setData((d) => ({
      ...d,
      skills: {
        ...d.skills,
        [category]: d.skills[category].filter((_, i) => i !== index),
      },
    }));
  }, []);

  const updateListItem = useCallback((section, id, field, value) => {
    setData((d) => ({
      ...d,
      [section]: d[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const addListItem = useCallback((section, template) => {
    setData((d) => ({
      ...d,
      [section]: [...d[section], { id: createId(), ...template }],
    }));
  }, []);

  const removeListItem = useCallback((section, id) => {
    setData((d) => ({
      ...d,
      [section]: d[section].filter((item) => item.id !== id),
    }));
  }, []);

  const addInterest = useCallback((interest) => {
    setData((d) => ({
      ...d,
      interests: [...d.interests, { id: createId(), interest }],
    }));
  }, []);

  const removeInterest = useCallback((id) => {
    setData((d) => ({
      ...d,
      interests: d.interests.filter((i) => i.id !== id),
    }));
  }, []);

  const updateInterest = useCallback((id, value) => {
    setData((d) => ({
      ...d,
      interests: d.interests.map((i) =>
        i.id === id ? { ...i, interest: value } : i
      ),
    }));
  }, []);

  const completion = computeCompletion(data);
  const ats = computeATSScore(data);

  const reset = useCallback(() => {
    setData(JSON.parse(JSON.stringify(initialState)));
    setHistory([]);
    setHistoryIndex(-1);
    localStorage.removeItem("resume-builder-data");
  }, []);

  return {
    data,
    completion,
    ats,
    saving,
    lastSaved,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    updatePersonal,
    updateSummary,
    updateSkills,
    addSkill,
    removeSkill,
    updateListItem,
    addListItem,
    removeListItem,
    addInterest,
    removeInterest,
    updateInterest,
    setResumeName,
    undo,
    redo,
    reset,
  };
}
