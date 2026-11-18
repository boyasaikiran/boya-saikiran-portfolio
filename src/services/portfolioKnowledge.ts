import { PROJECTS } from '../data/projects';
import { OWNER_EMAIL, OWNER_PHONE, GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, RESUME_URL } from '../data/developerActivity';

export interface AssistantAnswer {
  speechText: string;
  displayText: string;
  action?: {
    type: 'NAVIGATE' | 'OPEN_RESUME' | 'OPEN_LINKEDIN' | 'OPEN_GITHUB' | 'START_TOUR';
    targetId?: string;
    tourId?: string;
  };
  followUps?: string[];
}

export const queryPortfolioKnowledge = (query: string): AssistantAnswer => {
  const q = query.toLowerCase().trim();

  // 1. Recruiter Mode
  if (q.includes('recruiter') || q.includes('hire') || q.includes('summary') || q.includes('profile')) {
    return {
      speechText: "Here's an executive briefing on Boya Saikiran! He's a B.Tech Artificial Intelligence and Machine Learning engineer at Karunya graduating May 2027. He has proven experience in production Python, FastAPI, computer vision with PyTorch and OpenCV, and distributed systems with Docker and Prometheus. Would you like to inspect his verified resume or projects?",
      displayText: `### Executive Recruiter Briefing — Boya Saikiran\n\n- **Education**: B.Tech CSE (AI & ML) at Karunya Institute of Technology and Sciences (Graduating May 2027)\n- **Core Engineering**: Python, FastAPI, PyTorch, OpenCV, Docker, PostgreSQL, SQLAlchemy, Prometheus, LangGraph.js\n- **Verified Experience**:\n  1. Web Dev Trainee — *KarunyaHacks*\n  2. Computer Vision Intern — *KIDS*\n  3. Cybersecurity Virtual Intern — *Cisco / AICTE*\n- **Key Highlights**: Built Recovery Orchestrator (175 automated tests), GiftGenie (LangGraph.js multi-agent engine), and OpsGuardian (Docker/Prometheus diagnostics).\n- **Contact**: [boyasaikiran37@gmail.com](mailto:${OWNER_EMAIL}) • +91 6303093649`,
      action: { type: 'NAVIGATE', targetId: 'journey' },
      followUps: ['Open official resume', 'Show AI projects', 'Contact Boya Saikiran'],
    };
  }

  // 2. Who is Boya Saikiran
  if (q.includes('who is') || q.includes('about') || q.includes('sai') || q.includes('introduce')) {
    return {
      speechText: "Boya Saikiran is an Artificial Intelligence and Machine Learning engineer in progress at Karunya Institute of Technology and Sciences. He focuses on computer vision architectures, intelligent multi-agent systems, and scalable backend platforms.",
      displayText: `**Boya Saikiran** is an AI/ML Engineer in Progress, Computer Vision Enthusiast, and Software Developer based in India.\n\nHe specializes in connecting high-performance deep learning models (PyTorch, Swin Transformers, OpenCV) with scalable backend microservices (FastAPI, PostgreSQL, Docker).`,
      action: { type: 'NAVIGATE', targetId: 'origin' },
      followUps: ['Explore Missions', 'View Skill Arsenal', 'Open Resume'],
    };
  }

  // 3. Projects & Missions
  if (q.includes('project') || q.includes('mission') || q.includes('built') || q.includes('code')) {
    // Specific project: Campus locator
    if (q.includes('campus') || q.includes('locator') || q.includes('cross-view')) {
      const proj = PROJECTS.find((m) => m.id === 'mission-01') || PROJECTS[0];
      return {
        speechText: "The Cross-View University Campus Locator is a dual-stream computer vision system developed at KIDS that pairs ground-level drone and query photos with satellite ortho-imagery using metric learning.",
        displayText: `### ${proj.title}\n\n**${proj.tagline}**\n\n${proj.overview}\n\n- **Architecture**: ${proj.architecture}\n- **Tech Stack**: ${proj.techStack.join(', ')}\n- **Key Evaluation**: ${proj.evaluationMethodology}`,
        action: { type: 'NAVIGATE', targetId: 'missions' },
        followUps: ['Explain Recovery Orchestrator', 'Explain OpsGuardian', 'Explain GiftGenie'],
      };
    }

    // Specific project: Recovery Orchestrator
    if (q.includes('recovery') || q.includes('orchestrator')) {
      const proj = PROJECTS.find((m) => m.id === 'mission-10') || PROJECTS[0];
      return {
        speechText: "Recovery Orchestrator is a robust automated decision workflow built with Python, FastAPI, PostgreSQL, and SQLAlchemy, thoroughly verified by 175 automated test suites.",
        displayText: `### ${proj.title}\n\n**${proj.tagline}**\n\n${proj.overview}\n\n- **Test Coverage**: 175 automated unit and integration tests\n- **Tech Stack**: ${proj.techStack.join(', ')}`,
        action: { type: 'NAVIGATE', targetId: 'missions' },
        followUps: ['Explore other projects', 'View GitHub repository'],
      };
    }

    // Specific project: OpsGuardian
    if (q.includes('opsguardian') || q.includes('guardian') || q.includes('diagnostic')) {
      const proj = PROJECTS.find((m) => m.id === 'mission-11') || PROJECTS[0];
      return {
        speechText: "OpsGuardian is a containerized microservice diagnostic platform built with FastAPI, PostgreSQL, Docker Compose, and Prometheus/Grafana that identifies root causes during simulated infrastructure outages.",
        displayText: `### ${proj.title}\n\n**${proj.tagline}**\n\n${proj.overview}\n\n- **Tech Stack**: ${proj.techStack.join(', ')}`,
        action: { type: 'NAVIGATE', targetId: 'missions' },
        followUps: ['Explain GiftGenie', 'Show skills'],
      };
    }

    // Specific project: GiftGenie
    if (q.includes('gift') || q.includes('genie') || q.includes('agent')) {
      const proj = PROJECTS.find((m) => m.id === 'mission-09') || PROJECTS[0];
      return {
        speechText: "GiftGenie is an intelligent multi-agent recommendation engine powered by LangGraph.js, Claude API, and Firebase Firestore that synthesizes gift ideas from recipient profiles.",
        displayText: `### ${proj.title}\n\n**${proj.tagline}**\n\n${proj.overview}\n\n- **Tech Stack**: ${proj.techStack.join(', ')}`,
        action: { type: 'NAVIGATE', targetId: 'missions' },
        followUps: ['Explain Campus Locator', 'Show skill arsenal'],
      };
    }

    // General projects query
    return {
      speechText: `Boya Saikiran has engineered 13 distinct missions, ranging from Computer Vision and Deep Learning to Multi-Agent platforms and backend orchestrators. Let me take you to the Missions sector!`,
      displayText: `### Featured Engineering Missions\n\n1. **Cross-View University Campus Locator** (Swin Transformer, Metric Learning)\n2. **Recovery Orchestrator** (FastAPI, 175 Tests, PostgreSQL)\n3. **OpsGuardian Diagnostic System** (Docker, Prometheus, Grafana)\n4. **GiftGenie Multi-Agent Engine** (LangGraph.js, Claude API)\n5. **Real-time Night Vision to Color CCTV** (PyTorch, OpenCV)\n6. **AI vs Human Image Classifier** (EfficientNet-B0)\n7. **Diabetes Risk Prediction Engine** (Calibrated ML)\n8. **Smart Crop Recommendation** (Random Forest)\n\n*Scroll below to interact with each mission's architecture simulator!*`,
      action: { type: 'NAVIGATE', targetId: 'missions' },
      followUps: ['Explain Campus Locator', 'Explain Recovery Orchestrator', 'Explain GiftGenie'],
    };
  }

  // 4. Skills & Arsenal
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('arsenal') || q.includes('languages') || q.includes('framework')) {
    return {
      speechText: "Sai's technical arsenal spans AI/ML and Computer Vision, Systems and Cloud, Frontend Engineering, and Algorithmic foundations. Let's look at the constellation in the Arsenal sector!",
      displayText: `### Technical Arsenal Constellation\n\n- **Core Languages**: Python, JavaScript, TypeScript, C, C++, Java, SQL, Bash\n- **AI & Deep Learning**: PyTorch, OpenCV, Scikit-learn, Swin Transformers, EfficientNet, MediaPipe, FAISS\n- **Systems & Cloud**: FastAPI, Docker Compose, PostgreSQL, SQLAlchemy, Prometheus, Grafana, Git\n- **Frontend & Creative Tech**: React 19, TypeScript, Tailwind CSS, Three.js / R3F, GSAP, Framer Motion`,
      action: { type: 'NAVIGATE', targetId: 'arsenal' },
      followUps: ['Show certifications', 'Explore missions', 'Who is Sai?'],
    };
  }

  // 5. Certifications & Credentials
  if (q.includes('certif') || q.includes('credential') || q.includes('achievement') || q.includes('badge')) {
    return {
      speechText: "Here are Sai's 5 official verified certifications from Microsoft, IBM, Cisco, Google Cloud, and Simplilearn!",
      displayText: `### Official Verified Credentials\n\n1. **Microsoft Certified: Azure AI Fundamentals (AI-900)** — Microsoft\n2. **IBM AI Practitioner** — IBM\n3. **Cisco Cybersecurity Essentials** — Cisco Networking Academy\n4. **Introduction to Generative AI** — Google Cloud\n5. **Master AI for Web App Development** — Simplilearn`,
      action: { type: 'NAVIGATE', targetId: 'achievements' },
      followUps: ['Open resume', 'Explore missions', 'Contact Sai'],
    };
  }

  // 6. Resume
  if (q.includes('resume') || q.includes('cv') || q.includes('curriculum')) {
    return {
      speechText: "Opening Boya Saikiran's official resume PDF in a new tab right now!",
      displayText: `Opening **Boya Saikiran Resume PDF**...\n\nYou can also [click here to download or view the PDF](${RESUME_URL}).`,
      action: { type: 'OPEN_RESUME' },
      followUps: ['I am a recruiter. Tell me about Sai.', 'Explore missions', 'Contact Sai'],
    };
  }

  // 7. Contact, Email & Phone
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('call') || q.includes('message')) {
    return {
      speechText: `You can reach Sai directly at boyasaikiran37@gmail.com, or call +91 6303093649. Let me take you straight to the Communication Transmitter!`,
      displayText: `### Direct Communication Coordinates\n\n- **Email**: [${OWNER_EMAIL}](mailto:${OWNER_EMAIL})\n- **Cellular**: [${OWNER_PHONE}](tel:6303093649)\n- **LinkedIn**: [Boya Saikiran](${LINKEDIN_PROFILE_URL})\n- **GitHub**: [boyasaikiran](${GITHUB_PROFILE_URL})\n- **Base**: Coimbatore, Tamil Nadu, India`,
      action: { type: 'NAVIGATE', targetId: 'contact' },
      followUps: ['Open resume', 'Explore missions', 'Tour the portfolio'],
    };
  }

  // 8. Guided Tour request
  if (q.includes('tour') || q.includes('guide') || q.includes('walkthrough')) {
    return {
      speechText: "I'd love to give you a guided tour! We can explore his origin, major missions, technical arsenal, or his journey timeline.",
      displayText: `### Interactive Guided Tours\n\nSelect which sector you'd like me to guide you through:\n- **Meet Sai** (Origin & Core Vision)\n- **Explore Projects** (Missions & Real-time Demos)\n- **Technical Arsenal** (Skills & Toolchain)\n- **Professional Journey** (Education & Experience)`,
      action: { type: 'START_TOUR', tourId: 'projects' },
      followUps: ['Tour Projects', 'Tour Origin', 'Tour Skills'],
    };
  }

  // Default fallback
  return {
    speechText: "I'm connected to all of Boya Saikiran's portfolio nodes! You can ask me about his AI projects, technical skills, verified certifications, or request his resume.",
    displayText: `I'm Mini Sai! Here are some things you can ask me:\n- *"Who is Boya Saikiran?"*\n- *"Explain the Campus Locator project"*\n- *"Show the technical skills arsenal"*\n- *"What certifications does Sai have?"*\n- *"I'm a recruiter, give me a briefing"*\n- *"Open resume"*`,
    followUps: ['Who is Sai?', 'Show AI projects', 'Open resume', 'Contact Sai'],
  };
};
