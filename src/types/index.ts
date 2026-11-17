export type ProjectCategory = 
  | 'Computer Vision'
  | 'AI / Machine Learning'
  | 'System & Security'
  | 'Web Application'
  | 'System Tooling'
  | 'Academic / Hackathon'
  | 'Research Prototype';

export type ProjectStatus = 
  | 'Completed & Evaluated'
  | 'In Production / Live'
  | 'Hackathon Project'
  | 'Active Research'
  | 'Experimental Prototype';

export interface MetricItem {
  label: string;
  value: string;
  type: 'reported' | 'experimental' | 'latency';
  context?: string;
}

export interface Project {
  id: string;
  missionNumber: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  overview: string;
  problemStatement: string;
  objective: string;
  datasetAndSources: string;
  architecture: string;
  technologyChoices: string;
  implementationProcess: string[];
  challenges: string[];
  solutions: string[];
  evaluationMethodology: string;
  results: {
    metrics: MetricItem[];
    reportedSummary: string;
    validationDisclaimer: string;
  };
  limitations: string[];
  futureImprovements: string[];
  hasInteractiveSimulator?: 'campus-locator' | 'crop-predictor' | 'image-classifier';
}

export type SkillCategory = 
  | 'PROGRAMMING'
  | 'AI AND MACHINE LEARNING'
  | 'COMPUTER VISION'
  | 'WEB DEVELOPMENT'
  | 'TOOLS AND PLATFORMS';

export type ExperienceLevel = 'Hands-on Experience' | 'Used in Projects' | 'Familiar';

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  level: ExperienceLevel;
  description: string;
  projectsUsed: string[];
  relatedSkillIds: string[];
  iconName?: string;
}

export type TimelineCategory = 
  | 'EDUCATION'
  | 'INTERNSHIP'
  | 'LEADERSHIP'
  | 'HACKATHON'
  | 'WEB DEVELOPMENT'
  | 'RECOGNITION';

export interface TimelineItem {
  id: string;
  period: string;
  category: TimelineCategory;
  title: string;
  organization: string;
  role: string;
  location: string;
  description: string;
  highlights: string[];
  statusTag: string;
  verified: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  skillsLearned: string[];
  category: 'AI & Deep Learning' | 'Cloud & DevOps' | 'Core Engineering' | 'Cybersecurity & Systems';
}

export interface DeveloperRepo {
  name: string;
  description: string;
  language: string;
  url: string;
  isOwnerRepo: boolean;
  tags: string[];
}
