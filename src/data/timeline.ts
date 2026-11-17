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
    title: 'Hackathon Participant — Smart Timetable Generator',
    organization: 'G-K Hacks 2025',
    role: 'Team Member & Algorithmic Developer',
    location: 'Competitive Hackathon',
    description: 'Engineered an automated conflict-resolution academic timetable generator utilizing constraint satisfaction algorithms to eliminate faculty, room, and curriculum scheduling clashes.',
    highlights: [
      'Developed constraint satisfaction solver handling hard and soft scheduling constraints.',
      'Presented functional prototype generating deterministic clash-free weekly matrices.',
      'Collaborated in rapid multi-disciplinary team sprint during competitive hackathon.'
    ],
    statusTag: 'Participated',
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
  }
];
