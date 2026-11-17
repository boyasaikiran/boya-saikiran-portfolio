import type { Certification } from '../types';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'azure-ai-900',
    title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    date: 'Certified',
    skillsLearned: ['Azure AI Studio', 'Computer Vision APIs', 'Natural Language Processing', 'Conversational AI', 'Responsible AI'],
    category: 'Cloud & DevOps'
  },
  {
    id: 'ibm-ai-practitioner',
    title: 'IBM AI Practitioner',
    issuer: 'IBM',
    date: 'Certified',
    skillsLearned: ['Machine Learning Workflows', 'Deep Learning Concepts', 'Model Evaluation', 'Enterprise AI Deployment'],
    category: 'AI & Deep Learning'
  },
  {
    id: 'cisco-cybersecurity-essentials',
    title: 'Cisco Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Certified',
    skillsLearned: ['Network Defense', 'Threat Landscape Analysis', 'Security Architecture', 'Confidentiality & Integrity'],
    category: 'Cybersecurity & Systems'
  },
  {
    id: 'google-genai-intro',
    title: 'Introduction to Generative AI',
    issuer: 'Google',
    date: 'Certified',
    skillsLearned: ['Large Language Models', 'Generative AI Principles', 'Transformer Architectures', 'Responsible AI'],
    category: 'AI & Deep Learning'
  },
  {
    id: 'simplilearn-ai-web',
    title: 'Master AI for Web App Development',
    issuer: 'Simplilearn',
    date: 'Certified',
    skillsLearned: ['AI Model Integration', 'RESTful Inference APIs', 'Client-Side AI', 'Full-Stack Model Deployment'],
    category: 'AI & Deep Learning'
  }
];
