// eslint-disable-next-line react-refresh/only-export-components
import { createContext, useContext, useState } from "react";

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState({
    atsScore: 0,
    status: "No resume analyzed",
    jobMatch: 0,
    topJobTitle: "",
    topJobCompany: "",
    skillsTracked: 0,
    totalSkills: 0,
    analysis: {
      formatting: 0,
      keywords: 0,
      impact: 0,
      ats: 0,
    },
    strengths: [],
    missing: [],
    hasAnalysis: false,
  });

  const updateResumeData = (data) => {
    setResumeData((prev) => ({ ...prev, ...data, hasAnalysis: true }));
  };

  const clearResumeData = () => {
    setResumeData({
      atsScore: 0,
      status: "No resume analyzed",
      jobMatch: 0,
      topJobTitle: "",
      topJobCompany: "",
      skillsTracked: 0,
      totalSkills: 0,
      analysis: {
        formatting: 0,
        keywords: 0,
        impact: 0,
        ats: 0,
      },
      strengths: [],
      missing: [],
      hasAnalysis: false,
    });
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData, clearResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within ResumeProvider");
  }
  return context;
}
