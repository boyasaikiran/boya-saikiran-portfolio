import type { DeveloperRepo } from '../types';

export const GITHUB_PROFILE_URL = 'https://github.com/boyasaikiran';
export const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/boya-saikiran-15aab1294/';
export const OWNER_EMAIL = 'boyasaikiran37@gmail.com';
export const OWNER_PHONE = '+91 6303093649';
export const OWNER_PHONE_RAW = '6303093649';
export const RESUME_URL = '/Boya_Saikiran_Resume.pdf';

export const CURATED_REPOSITORIES: DeveloperRepo[] = [
  {
    name: 'diabetes-risk-prediction',
    description: 'Machine learning-based diabetes risk prediction using calibrated Logistic Regression and an interactive Streamlit diagnostic web application.',
    language: 'Python',
    url: 'https://github.com/boyasaikiran/diabetes-risk-prediction',
    isOwnerRepo: true,
    tags: ['machine-learning', 'logistic-regression', 'streamlit', 'healthcare-ai', 'mit-license']
  },
  {
    name: 'Real-time-CCTV-Night-Vision-to-Coloured-Vision-AI-Model',
    description: 'Computer vision deep learning model transforming monochrome infrared nighttime CCTV surveillance video feeds into natural full-color spectral video in real time.',
    language: 'Python / PyTorch',
    url: 'https://github.com/boyasaikiran/Real-time-CCTV-Night-Vision-to-Coloured-Vision-AI-Model',
    isOwnerRepo: true,
    tags: ['computer-vision', 'deep-learning', 'night-vision-colorization', 'opencv', 'surveillance-ai']
  },
  {
    name: 'AI-image-vs-Human-image-Classifier',
    description: 'Binary deep classification pipeline built with EfficientNet-B0 and PyTorch to distinguish synthetic AI-generated imagery from genuine human photography (★ 2).',
    language: 'Python / PyTorch',
    url: 'https://github.com/boyasaikiran/AI-image-vs-Human-image-Classifier',
    isOwnerRepo: true,
    tags: ['deep-learning', 'efficientnet', 'transfer-learning', 'image-classification']
  },
  {
    name: 'crop_recommendation_system',
    description: 'Precision agriculture machine learning application powered by Random Forest and Streamlit, evaluating soil NPK chemical ratios and weather parameters (★ 1).',
    language: 'Python / Scikit-learn',
    url: 'https://github.com/boyasaikiran/crop_recommendation_system',
    isOwnerRepo: true,
    tags: ['machine-learning', 'random-forest', 'streamlit', 'precision-agriculture']
  },
  {
    name: 'Automated-Parking-Management-System-Using-Machine-learning',
    description: 'Computer vision and machine learning parking slot occupancy detection and automated bay vacancy management using overhead camera feeds (★ 1).',
    language: 'Python / OpenCV',
    url: 'https://github.com/boyasaikiran/Automated-Parking-Management-System-Using-Machine-learning',
    isOwnerRepo: true,
    tags: ['computer-vision', 'opencv', 'smart-parking', 'machine-learning']
  },
  {
    name: 'AI-Career-Intelligence-Platform',
    description: 'AI-driven career intelligence recommendation engine that analyzes developer technical competency profiles and maps personalized upskilling trajectories.',
    language: 'Python',
    url: 'https://github.com/boyasaikiran/AI-Career-Intelligence-Platform',
    isOwnerRepo: true,
    tags: ['machine-learning', 'career-intelligence', 'nlp', 'recommendation-systems']
  },
  {
    name: 'leaf_vein_classification',
    description: 'Fine-grained botanical species identification and classification analyzing high-resolution leaf venation patterns and skeletal morphological structures.',
    language: 'Python / OpenCV',
    url: 'https://github.com/boyasaikiran/leaf_vein_classification',
    isOwnerRepo: true,
    tags: ['computer-vision', 'feature-extraction', 'opencv', 'botanical-ai']
  },
  {
    name: 'otp-verification-system',
    description: 'Responsive web authentication verification application featuring segmented digit input fields, countdown timers, and automated validation logic.',
    language: 'JavaScript',
    url: 'https://github.com/boyasaikiran/otp-verification-system',
    isOwnerRepo: true,
    tags: ['javascript', 'authentication', 'security', 'frontend']
  },
  {
    name: 'GiftGenie',
    description: 'Interactive web platform providing intelligent gift recommendations based on recipient personality traits, occasion context, and budget preferences.',
    language: 'JavaScript',
    url: 'https://github.com/boyasaikiran/GiftGenie',
    isOwnerRepo: true,
    tags: ['javascript', 'web-app', 'recommendations']
  },
  {
    name: 'Recover-Orchestrator',
    description: 'Python system process orchestration utility managing automated recovery workflows, task scheduling, and background process monitoring.',
    language: 'Python',
    url: 'https://github.com/boyasaikiran/Recover-Orchestrator',
    isOwnerRepo: true,
    tags: ['python', 'orchestration', 'automation', 'devops']
  },
  {
    name: '24KIDS422',
    description: 'Cross-View University Campus Locator leveraging Swin-Tiny hierarchical vision transformers, Triplet Margin Loss, and FAISS indexing (Karunya Innovation Studio).',
    language: 'Python / PyTorch',
    url: 'https://github.com/karunyainnovationstudio/24KIDS422',
    isOwnerRepo: false,
    tags: ['computer-vision', 'swin-transformer', 'faiss', 'metric-learning', 'university-1652']
  },
  {
    name: 'scikit-learn',
    description: 'Forked from scikit-learn/scikit-learn: machine learning in Python. Deep exploration of core estimators, preprocessing transformers, and metric evaluations.',
    language: 'Python / Cython',
    url: 'https://github.com/boyasaikiran/scikit-learn',
    isOwnerRepo: false,
    tags: ['open-source', 'machine-learning', 'scikit-learn', 'core-ml']
  }
];

export const TECHNICAL_DOMAINS = [
  {
    title: 'Computer Vision & Deep Metric Learning',
    description: 'Specializing in cross-view spatial alignment, vision transformers, nighttime CCTV colorization, and overhead parking slot segmentation.'
  },
  {
    title: 'Machine Learning & Clinical Health AI',
    description: 'Calibrated predictive modeling (diabetes risk prediction, precision agriculture crop recommendation, career intelligence).'
  },
  {
    title: 'Full-Stack Software & Web Engineering',
    description: 'Bridging backend machine learning inference microservices with modern responsive React, TypeScript, and JavaScript user interfaces.'
  }
];
