export const roleOptions = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Engineer",
  "Data Scientist",
  "AI/ML Engineer",
  "DevOps Engineer",
  "Mobile Developer",
];

export const roadmapData = {
  defaultRole: "Full Stack Developer",
  roles: {
    "Full Stack Developer": {
      current: ["React", "Node.js", "MongoDB", "JavaScript", "Git"],
      missing: ["Docker", "AWS", "System Design"],
      roadmap: [
        {
          step: 1,
          week: "Week 1",
          title: "Learn Docker",
          description: "Master containerization fundamentals for modern full stack deployment.",
          topics: ["Containers", "Images", "Docker Compose"],
          status: "not_started",
        },
        {
          step: 2,
          week: "Week 2",
          title: "Learn AWS Basics",
          description: "Understand core cloud services for hosting and scaling applications.",
          topics: ["EC2", "S3", "IAM"],
          status: "not_started",
        },
        {
          step: 3,
          week: "Week 3",
          title: "System Design",
          description: "Learn to architect scalable, maintainable full stack systems.",
          topics: ["Architecture", "APIs", "Scalability"],
          status: "not_started",
        },
        {
          step: 4,
          week: "Week 4",
          title: "Deployment",
          description: "Ship applications reliably with automated pipelines and cloud hosting.",
          topics: ["CI/CD", "Cloud Hosting"],
          status: "not_started",
        },
      ],
    },
    "Frontend Developer": {
      current: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
      missing: ["Testing", "Performance Optimization", "TypeScript"],
      roadmap: [
        {
          step: 1,
          week: "Week 1",
          title: "Advanced React",
          description: "Level up your React skills with modern patterns and state management.",
          topics: ["Hooks", "State Management"],
          status: "not_started",
        },
        {
          step: 2,
          week: "Week 2",
          title: "TypeScript",
          description: "Add type safety and better tooling to your frontend codebase.",
          topics: ["Types", "Interfaces"],
          status: "not_started",
        },
        {
          step: 3,
          week: "Week 3",
          title: "Frontend Testing",
          description: "Write reliable tests for components and user interactions.",
          topics: ["Jest", "React Testing Library"],
          status: "not_started",
        },
        {
          step: 4,
          week: "Week 4",
          title: "Performance",
          description: "Optimize load times and runtime performance for production apps.",
          topics: ["Optimization", "Lazy Loading"],
          status: "not_started",
        },
      ],
    },
    "Backend Engineer": {
      current: ["Python", "Node.js", "APIs", "Databases"],
      missing: ["System Design", "Docker", "Cloud"],
      roadmap: [
        {
          step: 1,
          week: "Week 1",
          title: "Backend Architecture",
          description: "Design robust services with clear boundaries and scalable APIs.",
          topics: ["Service design", "REST & GraphQL", "Microservices"],
          status: "not_started",
        },
        {
          step: 2,
          week: "Week 2",
          title: "Database Scaling",
          description: "Handle data growth with indexing, replication, and caching.",
          topics: ["Indexing", "Replication", "Caching"],
          status: "not_started",
        },
        {
          step: 3,
          week: "Week 3",
          title: "Docker & Deployment",
          description: "Containerize and deploy backend services consistently.",
          topics: ["Containers", "Docker Compose", "Build pipelines"],
          status: "not_started",
        },
        {
          step: 4,
          week: "Week 4",
          title: "System Design",
          description: "Architect backend systems that scale under real-world load.",
          topics: ["Architecture patterns", "Fault tolerance", "Load balancing"],
          status: "not_started",
        },
      ],
    },
    "Data Scientist": {
      current: ["Python", "SQL", "Statistics", "Machine Learning"],
      missing: ["Deep Learning", "MLOps", "Cloud"],
      roadmap: [
        {
          step: 1,
          week: "Week 1",
          title: "Machine Learning",
          description: "Strengthen core ML workflows from data prep to model evaluation.",
          topics: ["Supervised learning", "Feature engineering", "Model evaluation"],
          status: "not_started",
        },
        {
          step: 2,
          week: "Week 2",
          title: "Deep Learning",
          description: "Build and tune neural networks for complex prediction tasks.",
          topics: ["Neural networks", "CNNs", "Model tuning"],
          status: "not_started",
        },
        {
          step: 3,
          week: "Week 3",
          title: "MLOps",
          description: "Operationalize models with reproducible pipelines and monitoring.",
          topics: ["Training pipelines", "Model versioning", "Monitoring"],
          status: "not_started",
        },
        {
          step: 4,
          week: "Week 4",
          title: "Deployment",
          description: "Serve models reliably in production cloud environments.",
          topics: ["Model serving", "API integration", "Cloud deployment"],
          status: "not_started",
        },
      ],
    },
    "AI/ML Engineer": {
      current: ["Python", "Machine Learning", "APIs", "Data Processing"],
      missing: ["Deep Learning", "LLMs", "RAG", "Vector Databases", "MLOps"],
      roadmap: [
        {
          step: 1,
          week: "Week 1",
          title: "AI Fundamentals",
          description: "Core ML concepts and data workflows.",
          topics: ["ML algorithms", "Data preparation"],
          status: "not_started",
        },
        {
          step: 2,
          week: "Week 2",
          title: "Deep Learning",
          description: "Neural nets and transformer foundations.",
          topics: ["Neural networks", "Transformers"],
          status: "not_started",
        },
        {
          step: 3,
          week: "Week 3",
          title: "Generative AI",
          description: "Working with LLMs, RAG, and embeddings.",
          topics: ["LLM APIs", "RAG", "Embeddings"],
          status: "not_started",
        },
        {
          step: 4,
          week: "Week 4",
          title: "Production AI",
          description: "Deploying and monitoring AI systems.",
          topics: ["Deployment", "Monitoring"],
          status: "not_started",
        },
      ],
    },
    "DevOps Engineer": {
      current: ["Linux", "Git", "Networking", "Basic Cloud"],
      missing: ["Docker", "Kubernetes", "Terraform", "AWS", "CI/CD"],
      roadmap: [
        {
          step: 1,
          week: "Week 1",
          title: "Containers",
          description: "Learn container basics and tooling.",
          topics: ["Docker", "Images", "Compose"],
          status: "not_started",
        },
        {
          step: 2,
          week: "Week 2",
          title: "Cloud",
          description: "AWS fundamentals for infra engineers.",
          topics: ["AWS basics", "EC2", "S3"],
          status: "not_started",
        },
        {
          step: 3,
          week: "Week 3",
          title: "Automation",
          description: "CI/CD and pipeline automation.",
          topics: ["CI/CD pipelines", "GitHub Actions"],
          status: "not_started",
        },
        {
          step: 4,
          week: "Week 4",
          title: "Infrastructure",
          description: "Orchestrate with Kubernetes and Terraform.",
          topics: ["Kubernetes", "Terraform"],
          status: "not_started",
        },
      ],
    },
    "Mobile Developer": {
      current: ["Java", "Kotlin", "JavaScript", "React Native"],
      missing: ["Flutter", "App Deployment", "Testing", "Mobile Architecture"],
      roadmap: [
        {
          step: 1,
          week: "Week 1",
          title: "Mobile UI",
          description: "Build responsive mobile interfaces.",
          topics: ["Components", "Navigation"],
          status: "not_started",
        },
        {
          step: 2,
          week: "Week 2",
          title: "State Management",
          description: "Manage app state effectively.",
          topics: ["Redux", "Context API"],
          status: "not_started",
        },
        {
          step: 3,
          week: "Week 3",
          title: "Testing",
          description: "Unit and integration testing for apps.",
          topics: ["Unit testing", "Debugging"],
          status: "not_started",
        },
        {
          step: 4,
          week: "Week 4",
          title: "Deployment",
          description: "Publish apps to stores and manage releases.",
          topics: ["Play Store", "App Store"],
          status: "not_started",
        },
      ],
    },
  },
};

export function getRoleData(role) {
  return roadmapData.roles[role] ?? roadmapData.roles[roadmapData.defaultRole];
}

export function getRoleProgress(roleData) {
  const completed = roleData.current.length;
  const total = roleData.current.length + roleData.missing.length;
  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
