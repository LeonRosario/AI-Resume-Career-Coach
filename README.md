CareerAI — AI Resume & Career Coach

A full-featured SaaS frontend built with React, Vite, Tailwind CSS, and Framer Motion. Liquid glass UI throughout, 10 fully-built pages, mock authentication, and a working PDF export.


Tech Stack

ToolPurposeReact 18UI frameworkViteDev server & bundlerTailwind CSS 3Utility stylingFramer MotionAnimations & transitionsReact Router 6Client-side routingreact-dropzoneResume drag-and-drop uploadjsPDF + html2canvasClient-side PDF exportLucide ReactIcons


Getting Started


# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

Open http://localhost:5173 in your browser.

To build for production:

bashnpm run build


Pages

RoutePage/Landing page/loginLogin/registerRegister/appDashboard home/app/resume-analyzerResume Analyzer/app/ats-checkerATS Checker/app/skill-gapSkill Gap Analysis/app/job-matchJob Recommendations/app/interview-prepAI Interview Prep/app/resume-builderResume Builder/app/settingsProfile Settings

Dashboard routes are protected — you must be logged in to access them. Auth state is mocked and persisted to localStorage.


Project Structure

src/
├── components/
│   ├── auth/          # AuthLayout, AuthVisual
│   ├── dashboard/     # ResumePreview (live builder preview)
│   ├── landing/       # Hero, Features, HowItWorks, Testimonials, Pricing, CtaBand
│   ├── layout/        # Navbar, Sidebar, Topbar, DashboardLayout, Footer
│   └── ui/            # GlassCard, Button, Input, Badge, ProgressBar,
│                      # ScoreRing, Aurora, DropzoneUpload, AnalyzingState,
│                      # PageTransition, Skeleton, Logo
├── context/
│   └── AuthContext.jsx
├── data/
│   └── mockData.js    # Shared mock data for all dashboard pages
├── lib/
│   └── useResumeBuilder.js
└── pages/
    ├── Landing.jsx
    ├── auth/
    │   ├── Login.jsx
    │   └── Register.jsx
    └── dashboard/
        ├── DashboardHome.jsx
        ├── ResumeAnalyzer.jsx
        ├── AtsChecker.jsx
        ├── SkillGap.jsx
        ├── JobMatch.jsx
        ├── InterviewPrep.jsx
        ├── ResumeBuilder.jsx
        └── Settings.jsx


Design System

Colors

NameValueBackground#FFFFFFInk (text)#0B1220Primary#0084FFGradient start#60B1FFGradient end#319AFF

Glass card spec (every card)

cssbackground: rgba(255, 255, 255, 0.35);
backdrop-filter: blur(30px);
border: 1px solid rgba(255, 255, 255, 0.4);
border-radius: 24px;

Three glass variants are available:


.glass — default (35% white)
.glass-strong — elevated panels (55% white)
.glass-soft — subtle inset areas (20% white)


Typography


Headings: Fustat Bold / ExtraBold
Body & UI: Inter


Signature visual element

The Aurora field — three slow-drifting radial gradient blobs fixed behind every page — gives glass surfaces something to refract, making the effect feel liquid rather than static.


Key Features


1.Drag-and-drop resume upload with react-dropzone, simulated AI analysis with loading state
2.Score ring — animated SVG circle that fills to the resume/match score on mount
3.ATS checker — paste any job description, get matched/missing keyword breakdown
4.Skill gap roadmap — animated timeline with week-by-week learning plan
5.Job match grid — filterable by role, experience level, and location
6.AI interview chat — full chat UI with typing indicator, question progression tracker, and end-of-session feedback scoring
7.Resume builder — live-preview editor with 5 sections and one-click PDF download
8.Profile settings — tabbed interface with resume history and animated toggle switches
9.Framer Motion throughout — page fade transitions, floating hero card, hover-lift on all cards, score ring animation, roadmap step reveals


