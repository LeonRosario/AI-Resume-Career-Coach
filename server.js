import express from "express";
import cors from "cors";
import {
  resumeAnalysis,
  atsResult,
  jobs,
  interviewQuestions,
  activity,
  resumeHistory,
  roadmapData,
  testimonials,
} from "./server/data.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", service: "CareerAI backend" });
});

app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const user = { name: email.split("@")[0] || "There", email };
  res.json({ user, token: "demo-token" });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const user = { name, email };
  res.json({ user, token: "demo-token" });
});

app.get("/api/resume-analysis", (req, res) => {
  res.json(resumeAnalysis);
});

app.get("/api/ats-result", (req, res) => {
  res.json(atsResult);
});

app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.get("/api/interview-questions", (req, res) => {
  res.json(interviewQuestions);
});

app.get("/api/activity", (req, res) => {
  res.json(activity);
});

app.get("/api/resume-history", (req, res) => {
  res.json(resumeHistory);
});

app.get("/api/roadmap/:role", (req, res) => {
  const role = req.params.role;
  const roadmap = roadmapData.roles[role] ?? roadmapData.roles[roadmapData.defaultRole];
  res.json({ role, roadmap });
});

app.get("/api/testimonials", (req, res) => {
  res.json(testimonials);
});

app.listen(port, () => {
  console.log(`CareerAI backend running on http://localhost:${port}`);
});
