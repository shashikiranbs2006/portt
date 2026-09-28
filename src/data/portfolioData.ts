export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Backend & Systems" | "Agentic AI" | "Cloud & DevOps" | "Tooling";
  description: string;
  longDescription?: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface PortfolioData {
  user: {
    name: string;
    alias: string;
    role: string;
    tagline: string;
    location: string;
    education: string;
    cgpa: string;
    avatarUrl: string;
    bio: string[];
  };
  stickyNote: {
    pronouns: string;
    mbti: string;
    status: string;
    handles: { label: string; url: string }[];
    quote: string;
  };
  likesAndDislikes: {
    likes: string[];
    dislikes: string[];
  };
  whatsInMyBag: {
    id: string;
    name: string;
    emoji: string;
    detail: string;
  }[];
  experience: ExperienceItem[];
  projects: Project[];
  skills: {
    category: string;
    items: string[];
  }[];
  certifications: string[];
  musicPlaylist: {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    coverUrl?: string;
  }[];
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    location: string;
    resumeUrl: string;
  };
}

export const portfolioData: PortfolioData = {
  user: {
    name: "Shashikiran B S",
    alias: "shashikiran.exe",
    role: "Backend & Agentic AI Engineer",
    tagline: "CSE (AI/ML) @ BMSIT · Agentic AI Intern @ KlarDataLabs · Shipped multi-tenant systems & LLM tooling.",
    location: "Bengaluru, India",
    education: "B.E. Computer Science & Engineering (AI/ML) — BMS Institute of Technology & Management",
    cgpa: "8.7 / 10.0 (Graduating May 2028)",
    avatarUrl: "/avatar.jpg",
    bio: [
      "Third-year B.E. Computer Science & Engineering (AI/ML) student at BMSIT, Bengaluru (CGPA 8.7/10).",
      "Backend-focused engineer with shipped work in multi-tenant architectures, agentic orchestration, testing infrastructure, and developer tooling.",
      "Comfortable navigating ambiguous problems and owning services end-to-end—from relational schema design and query isolation to deployment pipelines and CI."
    ]
  },
  stickyNote: {
    pronouns: "He / Him",
    mbti: "INTJ ⚡",
    status: "Seeking Summer 2027 SWE Intern (AMTS)",
    handles: [
      { label: "github/shashikiranbs2006", url: "https://github.com/shashikiranbs2006" },
      { label: "in/shashikiran-bs", url: "https://linkedin.com/in/shashikiran-bs" }
    ],
    quote: "Cross-organization access should fail by construction, not by convention."
  },
  likesAndDislikes: {
    likes: [
      "Multi-tenant isolation & clean schemas",
      "FastAPI & strict type safety",
      "Strands Agents SDK & AWS Bedrock",
      "Testcontainers & CI merge gates",
      "PostgreSQL indexing & query tuning",
      "Hackathons (Organised NIRMAAN 2026)",
      "Pixel-perfect retro interfaces",
      "Late-night systems engineering"
    ],
    dislikes: [
      "Cross-tenant data leaks",
      "Skipping unit/integration tests",
      "Overengineered microservices without schema",
      "Unindexed foreign key queries",
      "Generic template code without personality",
      "Silent pipeline failures",
      "Cold pizza during 24-hr hackathons",
      "Flaky test suites"
    ]
  },
  whatsInMyBag: [
    { id: "1", name: "Dev Laptop", emoji: "💻", detail: "Arch / Linux environment & Docker" },
    { id: "2", name: "AWS Bedrock", emoji: "⚡", detail: "Agent orchestration sandbox" },
    { id: "3", name: "Hackathon Badge", emoji: "🏷️", detail: "NIRMAAN 2026 Lead Organiser" },
    { id: "4", name: "Testcontainers", emoji: "🐳", detail: "Postgres integration testing" },
    { id: "5", name: "Sticky Notes", emoji: "📝", detail: "Database schema wireframing" },
    { id: "6", name: "Espresso Mug", emoji: "☕", detail: "Fuel for 24-hr sprint sessions" }
  ],
  experience: [
    {
      company: "KlarDataLabs",
      role: "Agentic AI & LLM Engineer Intern",
      location: "Zurich, Switzerland (Remote)",
      period: "Aug 2026 – Present",
      highlights: [
        "Working on agent orchestration and LLM tooling using the Strands Agents SDK integrated with AWS Bedrock.",
        "Building and testing local development workflows, validating agent behavior against cloud-hosted backends before deployment."
      ]
    },
    {
      company: "Coding Club, BMSIT",
      role: "Treasurer & Core Member | Lead Organiser, NIRMAAN 2026",
      location: "Bengaluru, India",
      period: "Aug 2024 – Present",
      highlights: [
        "Lead Organiser for NIRMAAN 2026, a 24-hour hackathon with a Rs. 1,00,000 prize pool, 200+ participants, and Rs. 3,00,000 budget across 52 sponsor companies.",
        "Manage finances for 100+ member community; conducted DSA, Python, and ML workshops for batches of 30–40 students."
      ]
    }
  ],
  projects: [
    {
      id: "proj-relay-ai",
      title: "The Relay – AI Coding Assistant",
      subtitle: "VS Code Extension with Multi-Provider LLM Router & Web Simulation",
      category: "Agentic AI",
      description: "Priority queue request router with automatic provider failover, real-time quota tracking, and seamless state preservation.",
      longDescription: "Features an intelligent context-compression and handoff pipeline that transfers active conversation state between LLM backends on quota exhaustion without dropping session context. Built with VS Code Workspace & WorkspaceEdit APIs. Includes an interactive web simulation deployed on Vercel and full extension download on GitHub.",
      tech: ["TypeScript", "React", "AWS Bedrock", "VS Code API", "LLM Tooling", "Vercel"],
      demoUrl: "https://relay-jofk.vercel.app/",
      githubUrl: "https://github.com/shashikiranbs2006/relay",
      featured: true
    },
    {
      id: "proj-edurag",
      title: "Yoru Chatbot (EduRAG)",
      subtitle: "AI Educational RAG Chatbot & Document Retrieval Microservice",
      category: "Agentic AI",
      description: "Containerized educational chatbot and vector retrieval microservice engineered over 500+ pages of academic and technical curriculum with sub-2s query latency.",
      longDescription: "Implements hybrid semantic search and BM25 reranking using ChromaDB and FastAPI. Built to assist students by indexing complex technical documentation and providing precise contextual answers with source attribution and graceful out-of-scope fallback handling. Deployed live on Render.",
      tech: ["Python", "FastAPI", "ChromaDB", "Docker", "Embeddings", "Render"],
      demoUrl: "https://edu-rag.onrender.com/",
      githubUrl: "https://github.com/shashikiranbs2006/yoru_chatbot",
      featured: true
    },
    {
      id: "proj-prompt-compiler",
      title: "Prompt Compiler",
      subtitle: "Google Chrome Extension & Interactive Prompt Optimization Playground",
      category: "Tooling",
      description: "Developer productivity tool and Google Chrome extension that parses, structures, and compiles raw prompts into optimized LLM instructions with token estimation and templating.",
      longDescription: "Bridges chaotic human intent and deterministic model output with automated prompt structuring, XML tag standardization, token reduction algorithms, and dynamic variable injection. Interactive web simulation deployed on Vercel with unpackaged browser extension install on GitHub.",
      tech: ["TypeScript", "React", "Chrome Extension API", "LLM Tooling", "Vercel"],
      demoUrl: "https://prompt-compiler-five.vercel.app/",
      githubUrl: "https://github.com/shashikiranbs2006/prompt-compiler",
      featured: true
    },
    {
      id: "proj-credit-card",
      title: "Credit Card Fraud Detection",
      subtitle: "Real-Time Machine Learning Transaction Scoring & Imbalanced Data Analytics",
      category: "Backend & Systems",
      description: "Machine learning fraud detection platform analyzing high-volume transaction data with imbalanced classification techniques (SMOTE, XGBoost / Random Forest) and real-time transaction scoring.",
      longDescription: "Engineered an end-to-end anomaly detection pipeline capable of identifying fraudulent credit card transactions in heavily imbalanced financial datasets (fraud rate < 0.2%). Implements feature scaling, SMOTE resampling, high-recall decision boundaries, and interactive risk scoring telemetry. Deployed live on Streamlit Cloud.",
      tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Streamlit", "Machine Learning"],
      demoUrl: "https://credit-card-fraud-detection-by-shashikiran.streamlit.app/",
      githubUrl: "https://github.com/shashikiranbs2006/credit-card-fraud-detection",
      featured: true
    },
    {
      id: "proj-fitphile",
      title: "FitPhile",
      subtitle: "Personalized Health, Fitness & Workout Tracking Platform",
      category: "Backend & Systems",
      description: "Full-stack fitness and wellness web application designed for tracking workouts, nutrition profiles, and body metrics with personalized health analytics.",
      longDescription: "FitPhile delivers a clean, responsive fitness management system with custom workout logging, caloric intake tracking, body composition metrics, and routine planning. Designed with structured relational schemas, clean API endpoints, and production deployment on Render.",
      tech: ["Python", "FastAPI", "PostgreSQL", "React", "Docker", "Render"],
      demoUrl: "https://fitphile.onrender.com/",
      githubUrl: "https://github.com/shashikiranbs2006/fitphile",
      featured: true
    },
    {
      id: "proj-multi-tenant",
      title: "Multi-Tenant Ticketing Platform",
      subtitle: "Enterprise request-scoped tenant isolation & query routing",
      category: "Backend & Systems",
      description: "Designed a shared-schema multi-tenant data model across 9 relational tables with org_id scoping, composite indexes, and strict role-based access control.",
      longDescription: "Engineered query-level request-scoped isolation ensuring cross-organization access fails by construction, not by convention. Included pagination, filtering, sorting, and full audit logging. Rigorously tested with Testcontainers (Postgres) in GitHub Actions CI with zero merge on failing tests.",
      tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "Testcontainers", "GitHub Actions"],
      demoUrl: "https://github.com/shashikiranbs2006",
      githubUrl: "https://github.com/shashikiranbs2006",
      featured: false
    },
    {
      id: "proj-nirmaan",
      title: "NIRMAAN 2026 Hackathon Hub",
      subtitle: "24-hr Hackathon orchestration platform & participant portal",
      category: "Tooling",
      description: "Hackathon management platform coordinating 200+ participants, ₹1,00,000 prize pool, and 52 sponsor companies.",
      longDescription: "Centralized submission verification, team matching, live judging rubric calculation, and finance tracking system for BMSIT's flagship annual technical symposium.",
      tech: ["TypeScript", "FastAPI", "PostgreSQL", "TailwindCSS"],
      demoUrl: "https://github.com/shashikiranbs2006",
      githubUrl: "https://github.com/shashikiranbs2006",
      featured: false
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "SQL", "JavaScript", "TypeScript", "C", "C++ (fundamentals)"]
    },
    {
      category: "Backend & Systems",
      items: ["FastAPI", "PostgreSQL", "REST API Design", "Relational Database Design", "Multi-Tenant Isolation", "Access Control"]
    },
    {
      category: "Testing & Infrastructure",
      items: ["pytest", "Testcontainers Postgres", "GitHub Actions CI", "Docker", "Git"]
    },
    {
      category: "Agentic AI & Cloud",
      items: ["Strands Agents SDK", "AWS Bedrock", "EC2 (fundamentals)", "ChromaDB", "LLM Tooling"]
    },
    {
      category: "Core Computer Science",
      items: ["Data Structures & Algorithms", "OOP", "Complexity Analysis"]
    }
  ],
  certifications: [
    "CS50: Intro to CS — Harvard (2024)",
    "Python Programming & SQL — GQT Institute (2023–2024)"
  ],
  musicPlaylist: [
    {
      id: "track-1",
      title: "Backburner (Nostalgia Mix)",
      artist: "NIKI / 808s",
      album: "Early 2000s Tape #1",
      duration: "3:42"
    },
    {
      id: "track-2",
      title: "Color Outside The Lines",
      artist: "CORTIS & Martin",
      album: "Panasonic DV Tapes",
      duration: "2:54"
    },
    {
      id: "track-3",
      title: "Cyber Bliss (Lo-Fi Drift)",
      artist: "Digital★Decoy",
      album: "XP Dreaming",
      duration: "4:15"
    }
  ],
  contact: {
    email: "shashibs238@gmail.com",
    phone: "+91 7676104288",
    github: "https://github.com/shashikiranbs2006",
    linkedin: "https://linkedin.com/in/shashikiran-bs",
    location: "Bengaluru, India",
    resumeUrl: "/resume.pdf"
  }
};
