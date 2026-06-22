import { useState } from "react";

const initialState = {
  personal: { name: "", title: "", email: "", phone: "", location: "" },
  summary: "",
  education: [{ id: 1, school: "", degree: "", year: "" }],
  experience: [{ id: 1, company: "", role: "", duration: "", desc: "" }],
  projects: [{ id: 1, name: "", desc: "" }],
  skills: "",
};

export function useResumeBuilder() {
  const [data, setData] = useState(initialState);

  const updatePersonal = (field, value) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [field]: value } }));

  const updateSummary = (value) => setData((d) => ({ ...d, summary: value }));

  const updateSkills = (value) => setData((d) => ({ ...d, skills: value }));

  const updateListItem = (section, id, field, value) =>
    setData((d) => ({
      ...d,
      [section]: d[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));

  const addListItem = (section, template) =>
    setData((d) => ({
      ...d,
      [section]: [...d[section], { id: Date.now(), ...template }],
    }));

  const removeListItem = (section, id) =>
    setData((d) => ({
      ...d,
      [section]: d[section].filter((item) => item.id !== id),
    }));

  return { data, updatePersonal, updateSummary, updateSkills, updateListItem, addListItem, removeListItem };
}
