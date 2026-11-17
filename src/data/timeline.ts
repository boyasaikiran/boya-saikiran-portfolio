import type { TimelineItem } from '../types';

export const TIMELINE: TimelineItem[] = [
  {
    id: 'kits-education',
    period: '2023 – 2027 (Expected)',
    category: 'EDUCATION',
    title: 'B.Tech in Computer Science and Engineering (AI & ML)',
    organization: 'Karunya Institute of Technology and Sciences',
    role: 'Undergraduate Engineering Student',
    location: 'Coimbatore, Tamil Nadu, India',
    description: 'Pursuing specialized undergraduate studies focused on foundational computer science, machine learning algorithms, deep neural network architectures, and advanced computer vision systems.',
    highlights: [
      'Specialized curriculum in Artificial Intelligence and Machine Learning.',
      'Core coursework: Data Structures, Algorithms, Neural Networks, Computer Vision, Operating Systems, Database Management.',
      'Active participant in departmental innovation and competitive hackathon events.'
    ],
    statusTag: 'In Progress',
    verified: true
  },
  {
    id: 'matrix-leadership',
    period: '2025 – 2026',
    category: 'LEADERSHIP',
    title: 'Event Coordinator — AI & ML Department',
    organization: 'Matrix Association, Karunya Institute of Technology and Sciences',
    role: 'Department Event Coordinator',
    location: 'Coimbatore, India',
    description: 'Elected leadership role driving student technical engagement, organizing departmental hackathons, technical symposia, and practical AI/ML peer workshops.',
    highlights: [
      'Coordinating department-wide technical workshops and student AI challenges.',
      'Fostering peer-to-peer collaboration in computer vision and machine learning toolchains.',
      'Liaising with faculty mentors and industry speakers for departmental conferences.'
    ],
    statusTag: 'Current Leadership',
    verified: true
  },
  {
    id: 'kids-internship',
    period: '2024 – 2025',
    category: 'INTERNSHIP',
    title: 'Computer Vision Research Intern',
    organization: 'Karunya Innovation and Design Studio (KIDS)',
    role: 'Computer Vision Team Member',
    location: 'Coimbatore, India',
    description: 'Researched and built deep learning architectures for cross-view university campus localization (Project 24KIDS422), bridging satellite, drone, and ground-level perspectives.',
    highlights: [
      'Implemented hierarchical Swin Transformer (Swin-Tiny) backbones for orientation-invariant feature extraction.',
      'Trained metric learning networks utilizing Triplet Margin Loss with hard negative mining on the University-1652 benchmark.',
      'Integrated FAISS indexing achieving sub-50ms vector query retrieval and verified spatial attention using Grad-CAM.'
    ],
    statusTag: 'Completed Internship',
    verified: true
  },
  {
    id: 'gk-hacks',
    period: '2025',
    category: 'HACKATHON',
    title: 'Hackathon Finalist — Smart Timetable Generator',
    organization: 'G-K Hacks 2025',
    role: 'Team Lead & Algorithmic Developer',
    location: 'Competitive Hackathon',
    description: 'Engineered an automated conflict-resolution academic timetable generator utilizing constraint satisfaction algorithms to eliminate faculty, room, and curriculum scheduling clashes.',
    highlights: [
      'Developed constraint satisfaction solver handling hard and soft scheduling constraints.',
      'Presented functional prototype generating deterministic clash-free weekly matrices.',
      'Collaborated in rapid multi-disciplinary team sprint during competitive hackathon.'
    ],
    statusTag: 'Finalist Team',
    verified: true
  },
  {
    id: 'sail-vocational',
    period: 'Vocational Training',
    category: 'VOCATIONAL TRAINING',
    title: 'Vocational Industrial Training',
    organization: 'Bhilai Steel Plant (Steel Authority of India Limited - SAIL)',
    role: 'Vocational Trainee',
    location: 'Bhilai, Chhattisgarh, India',
    description: 'Completed technical vocational training exploring industrial automation, heavy engineering operational workflows, instrumentation systems, and plant-level computational monitoring.',
    highlights: [
      'Observed large-scale industrial control systems, instrumentation telemetry, and automated plant processes.',
      'Gained practical insight into safety-critical industrial computing environments and hardware reliability standards.'
    ],
    statusTag: 'Completed Training',
    verified: true
  },
  {
    id: 'inamigos-web-internship',
    period: 'Completed Experience',
    category: 'WEB DEVELOPMENT',
    title: 'Web Development Internship Experience',
    organization: 'InAmigos Foundation',
    role: 'Web Development Intern',
    location: 'Remote',
    description: 'Contributed to front-end development tasks, responsive web page structuring, and digital outreach initiatives for foundation web properties.',
    highlights: [
      'Built responsive interface components ensuring cross-browser styling consistency.',
      'Collaborated on foundation digital workflows and community web platforms.'
    ],
    statusTag: 'Completed Internship',
    verified: true
  },
  {
    id: 'thiranex-selection',
    period: 'Internship Selection',
    category: 'WEB DEVELOPMENT',
    title: 'Web Development Internship Selection',
    organization: 'Thiranex',
    role: 'Selected Candidate',
    location: 'Remote / Hybrid',
    description: 'Successfully selected for the web development internship program following technical evaluation of web programming capabilities.',
    highlights: [
      'Recognized for technical aptitude in modern web development standards and frontend foundations.'
    ],
    statusTag: 'Selected',
    verified: true
  },
  {
    id: 'mckinsey-forward',
    period: 'Accepted Cohort',
    category: 'RECOGNITION',
    title: 'McKinsey Academy Forward Program',
    organization: 'McKinsey & Company',
    role: 'Selected Participant',
    location: 'Global Virtual Program',
    description: 'Accepted into the competitive McKinsey Forward global leadership curriculum focused on digital problem-solving, structured analytical thinking, and executive communications.',
    highlights: [
      'Mastering business problem framing, hypothesis-driven analytical techniques, and digital workplace agility.'
    ],
    statusTag: 'Selected Participant',
    verified: true
  },
  {
    id: 'adobe-hackathon',
    period: 'Hackathon Participation',
    category: 'HACKATHON',
    title: 'Adobe University Hackathon',
    organization: 'Adobe',
    role: 'Student Competitor',
    location: 'National Hackathon Challenge',
    description: 'Participated in the university-level hackathon developing software solutions around creative productivity and digital document intelligence.',
    highlights: [
      'Explored creative software APIs and collaborative digital problem statements under timed contest constraints.'
    ],
    statusTag: 'Participated',
    verified: true
  },
  {
    id: 'azure-ai-program',
    period: 'Curriculum Completed',
    category: 'RECOGNITION',
    title: 'Azure AI Fundamentals Program',
    organization: 'Microsoft Learn / Azure',
    role: 'Program Trainee',
    location: 'Online Curriculum',
    description: 'Completed dedicated coursework covering computer vision APIs, natural language processing, conversational AI, and responsible AI principles on Microsoft Azure.',
    highlights: [
      'Hands-on exposure to Azure Cognitive Services and Computer Vision REST endpoints.'
    ],
    statusTag: 'Completed Program',
    verified: true
  },
  {
    id: 'tap-academy',
    period: 'Foundation Training',
    category: 'EDUCATION',
    title: 'Java Full Stack & DSA Specialization',
    organization: 'TAP Academy',
    role: 'Student Trainee',
    location: 'Technical Training',
    description: 'Rigorous foundation training in Core Java, object-oriented software engineering principles, complex data structures, and algorithmic optimization.',
    highlights: [
      'Mastered memory allocation, collections framework, multi-threading, and exception handling in Java.'
    ],
    statusTag: 'Completed Specialization',
    verified: true
  }
];
