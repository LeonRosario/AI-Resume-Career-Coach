import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ResumeProvider } from "./context/ResumeContext";

import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ResumeAnalyzer from "./pages/dashboard/ResumeAnalyzer";
import AtsChecker from "./pages/dashboard/AtsChecker";
import SkillGap from "./pages/dashboard/SkillGap";
import JobMatch from "./pages/dashboard/JobMatch";
import InterviewPrep from "./pages/dashboard/InterviewPrep";
import ResumeBuilder from "./pages/dashboard/ResumeBuilder";
import Settings from "./pages/dashboard/Settings";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/app" replace /> : children;
}

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="ats-checker" element={<AtsChecker />} />
          <Route path="skill-gap" element={<SkillGap />} />
          <Route path="job-match" element={<JobMatch />} />
          <Route path="interview-prep" element={<InterviewPrep />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LazyMotion features={domAnimation} strict>
        <AuthProvider>
          <ResumeProvider>
            <AppRoutes />
          </ResumeProvider>
        </AuthProvider>
      </LazyMotion>
    </BrowserRouter>
  );
}
