export const resumeAnalysis = {
  score: 92,
  strengths: ["React", "Projects", "Experience", "Leadership", "Communication"],
  missing: ["Docker", "AWS", "Testing"],
  breakdown: [
    { label: "Formatting", value: 95 },
    { label: "Keyword match", value: 88 },
    { label: "Impact statements", value: 90 },
    { label: "ATS compatibility", value: 94 },
  ],
  suggestions: [
    "Quantify your project impact — add metrics like \"reduced load time by 40%\".",
    "Add a dedicated Skills section with Docker and cloud tooling.",
    "Tighten your summary to 2–3 lines focused on your target role.",
  ],
};

export const atsResult = {
  matchScore: 87,
  matched: ["React", "Node.js", "SQL", "REST APIs", "Git"],
  missing: ["AWS", "Docker", "Kubernetes"],
};

export const skillGap = {
  targetRole: "Full Stack Developer",
  current: ["React", "Node.js", "MongoDB", "JavaScript", "Git"],
  missing: ["Docker", "Cloud (AWS)", "System Design"],
  roadmap: [
    { week: "Week 1", title: "Learn Docker", detail: "Containers, images, docker-compose basics", done: true },
    { week: "Week 2", title: "AWS Basics", detail: "EC2, S3, IAM fundamentals", done: false },
    { week: "Week 3", title: "System Design", detail: "Scalability, load balancing, caching", done: false },
    { week: "Week 4", title: "Deploy Project", detail: "Ship a containerized app to the cloud", done: false },
  ],
};

export const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Nimbus Labs",
    location: "Remote",
    experience: "2-4 yrs",
    match: 94,
    required: ["React", "Python", "SQL"],
    salary: "$110k – $135k",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Lumen Health",
    location: "New York, NY",
    experience: "1-3 yrs",
    match: 89,
    required: ["React", "TypeScript", "CSS"],
    salary: "$95k – $120k",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Orbit Finance",
    location: "Remote",
    experience: "3-5 yrs",
    match: 85,
    required: ["Node.js", "React", "AWS"],
    salary: "$120k – $145k",
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "Datasphere",
    location: "Austin, TX",
    experience: "2-4 yrs",
    match: 78,
    required: ["Node.js", "PostgreSQL", "Docker"],
    salary: "$105k – $130k",
  },
  {
    id: 5,
    title: "Product Engineer",
    company: "Flowstate",
    location: "San Francisco, CA",
    experience: "3-6 yrs",
    match: 73,
    required: ["React", "GraphQL", "System Design"],
    salary: "$130k – $160k",
  },
  {
    id: 6,
    title: "Junior Web Developer",
    company: "Brightpath Edu",
    location: "Remote",
    experience: "0-1 yrs",
    match: 68,
    required: ["JavaScript", "HTML/CSS", "React"],
    salary: "$70k – $85k",
  },
];

export const interviewQuestions = [
  "Tell me about a project you're most proud of and your specific role in it.",
  "Explain your project architecture — how did you structure the front and back end?",
  "How do you approach debugging a production issue under time pressure?",
  "Describe a time you disagreed with a teammate's technical decision. What did you do?",
  "How would you design a URL shortening service at a high level?",
];

export const activity = [
  { id: 1, text: "Resume analyzed — scored 92/100", time: "2 hours ago", type: "analyze" },
  { id: 2, text: "Matched with Software Engineer at Nimbus Labs", time: "Yesterday", type: "match" },
  { id: 3, text: "Completed mock interview — scored 8.4/10", time: "2 days ago", type: "interview" },
  { id: 4, text: "Updated skills: added Docker", time: "4 days ago", type: "skill" },
];

export const resumeHistory = [
  { id: 1, name: "Resume_v3_SoftwareEngineer.pdf", date: "Jun 14, 2026", score: 92 },
  { id: 2, name: "Resume_v2_FullStack.pdf", date: "May 28, 2026", score: 84 },
  { id: 3, name: "Resume_v1_Draft.pdf", date: "May 10, 2026", score: 71 },
];
