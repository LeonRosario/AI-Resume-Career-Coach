import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Aurora from "../ui/Aurora";
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
      {/* Blue gradient glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(96,177,255,0.25) 0%, rgba(0,132,255,0) 70%)', filter: 'blur(60px)' }} />
      <div className="fixed bottom-0 left-1/3 w-[500px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,132,255,0.15) 0%, rgba(0,132,255,0) 70%)', filter: 'blur(60px)' }} />
      <Aurora />
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
