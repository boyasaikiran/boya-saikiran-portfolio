import type { Certification } from '../types';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'oracle-ai-foundations-2025',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Certified',
    issueDate: '21 October 2025',
    validUntil: '21 October 2027',
    recipient: 'BOYA SAIKIRAN',
    status: 'CERTIFIED',
    credentialType: 'Oracle Certified Foundations Associate',
    category: 'AI & Deep Learning',
    skillsLearned: [
      'Artificial Intelligence Fundamentals',
      'Machine Learning Fundamentals',
      'Deep Learning Concepts',
      'Generative AI Fundamentals',
      'Oracle Cloud Infrastructure AI'
    ],
    badgeUrl: '/images/certificates/oracle-badge.png',
    certificateUrl: '/images/certificates/oracle-ai-foundations-certificate.jpg',
    isFeatured: true
  },
  {
    id: 'azure-ai-900',
    title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    date: 'Certified',
    credentialType: 'Industry Certification',
    skillsLearned: ['Azure AI Studio', 'Computer Vision APIs', 'Natural Language Processing', 'Conversational AI', 'Responsible AI'],
    category: 'Cloud & DevOps',
    status: 'CERTIFIED'
  },
  {
    id: 'ibm-ai-practitioner',
    title: 'IBM AI Practitioner',
    issuer: 'IBM',
    date: 'Certified',
    credentialType: 'Professional Course Completion',
    skillsLearned: ['Machine Learning Workflows', 'Deep Learning Concepts', 'Model Evaluation', 'Enterprise AI Deployment'],
    category: 'AI & Deep Learning',
    status: 'COMPLETED'
  },
  {
    id: 'cisco-cybersecurity-essentials',
    title: 'Cisco Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Certified',
    credentialType: 'Academy Certification',
    skillsLearned: ['Network Defense', 'Threat Landscape Analysis', 'Security Architecture', 'Confidentiality & Integrity'],
    category: 'Cybersecurity & Systems',
    status: 'CERTIFIED'
  },
  {
    id: 'google-genai-intro',
    title: 'Introduction to Generative AI',
    issuer: 'Google',
    date: 'Certified',
    credentialType: 'Learning Credential',
    skillsLearned: ['Large Language Models', 'Generative AI Principles', 'Transformer Architectures', 'Responsible AI'],
    category: 'AI & Deep Learning',
    status: 'COMPLETED'
  },
  {
    id: 'simplilearn-ai-web',
    title: 'Master AI for Web App Development',
    issuer: 'Simplilearn',
    date: 'Certified',
    credentialType: 'Skill Certification',
    skillsLearned: ['AI Model Integration', 'RESTful Inference APIs', 'Client-Side AI', 'Full-Stack Model Deployment'],
    category: 'AI & Deep Learning',
    status: 'COMPLETED'
  }
];
