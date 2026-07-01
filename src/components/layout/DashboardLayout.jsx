import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AuroraBackground from "../ui/aurora-background";
import PageTransition from "../ui/PageTransition";

const titles = {

  "/app/resume-analyzer": "Resume Analyzer",
  "/app/ats-checker": "ATS Checker",
  "/app/skill-gap": "Skill Gap Analysis",
  "/app/job-match": "Job Recommendations",
  "/app/interview-prep": "AI Interview Prep",
  "/app/resume-builder": "Resume Builder",
  "/app/settings": "Profile Settings",
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = titles[location.pathname] || "CareerAI";

  return (
    <div className="relative min-h-screen bg-white">
      <div className="fixed inset-0 pointer-events-none z-0"><AuroraBackground variant="subtle" /></div>
      <div className="relative z-10 flex max-w-[1600px] mx-auto">
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex-1 min-w-0 p-4 md:p-6">
          <Topbar onMenuClick={() => setMobileOpen(true)} title={title} />
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
