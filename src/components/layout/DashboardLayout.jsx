import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import PageTransition from "../ui/PageTransition";

const titles = {
  "/app":                  "Dashboard",
  "/app/resume-analyzer":  "Resume Analyzer",
  "/app/ats-checker":      "ATS Checker",
  "/app/skill-gap":        "Skill Gap Analysis",
  "/app/job-match":        "Job Recommendations",
  "/app/interview-prep":   "AI Interview Prep",
  "/app/resume-builder":   "Resume Builder",
  "/app/settings":         "Profile Settings",
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = titles[location.pathname] ?? "CareerAI";

  return (
    <div className="relative min-h-screen">
      {/* Subtle mesh background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 90% 60% at 70% 10%, rgba(37,99,235,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(79,70,229,0.05) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      {/* Layout */}
      <div className="relative z-10 flex max-w-[1680px] mx-auto">
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main className="flex-1 min-w-0 min-h-screen flex flex-col">
          <Topbar onMenuClick={() => setMobileOpen(true)} title={title} />

          <div className="flex-1 px-4 md:px-6 pb-8">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
