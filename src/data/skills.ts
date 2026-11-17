import type { SkillNode } from '../types';

export const SKILLS: SkillNode[] = [
  // --- PROGRAMMING ---
  {
    id: 'python',
    name: 'Python',
    category: 'PROGRAMMING',
    level: 'Hands-on Experience',
    description: 'Primary engineering language utilized across backend development (FastAPI), deep learning (PyTorch), data science, and automation.',
    projectsUsed: ['Recovery Orchestrator', 'OpsGuardian', 'Cross-View Campus Locator', 'Real-time CCTV Night Vision Colorizer', 'Diabetes Risk Prediction'],
    relatedSkillIds: ['fastapi', 'pytorch', 'scikit-learn', 'opencv', 'sqlalchemy']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'PROGRAMMING',
    level: 'Hands-on Experience',
    description: 'Modern ES6+ development for full-stack web applications, Node.js backends, DOM architectures, and LangGraph.js multi-agent systems.',
    projectsUsed: ['GiftGenie — Multi-Agent Platform', 'KarunyaHacks Web Features', 'OTP Verification System', 'The Web of Ideas Portfolio'],
    relatedSkillIds: ['langgraph', 'node-js', 'react', 'rest-apis']
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'PROGRAMMING',
    level: 'Hands-on Experience',
    description: 'Relational database schema design, normalized data modeling, ACID transactions, complex queries, and ORM abstractions (SQLAlchemy).',
    projectsUsed: ['Recovery Orchestrator', 'OpsGuardian Diagnostic Database'],
    relatedSkillIds: ['postgresql', 'sqlalchemy', 'python']
  },
  {
    id: 'bash-shell',
    name: 'Bash / Shell',
    category: 'PROGRAMMING',
    level: 'Used in Projects',
    description: 'Linux shell scripting, command-line automation, environment configuration, container lifecycle scripts, and automated test runners.',
    projectsUsed: ['OpsGuardian Docker Sandbox', 'Automated Test Pipelines'],
    relatedSkillIds: ['docker', 'git']
  },
  {
    id: 'java',
    name: 'Java',
    category: 'PROGRAMMING',
    level: 'Hands-on Experience',
    description: 'Object-oriented programming, data structures, algorithms, and system fundamentals acquired through computer science coursework.',
    projectsUsed: ['Academic Systems & Algorithms', 'Data Structure Implementations'],
    relatedSkillIds: ['c-plus-plus', 'python']
  },
  {
    id: 'c',
    name: 'C',
    category: 'PROGRAMMING',
    level: 'Used in Projects',
    description: 'Low-level procedural programming, memory management, pointers, and foundational computer architecture understanding.',
    projectsUsed: ['Academic Operating Systems & Systems Programming'],
    relatedSkillIds: ['c-plus-plus']
  },
  {
    id: 'c-plus-plus',
    name: 'C++',
    category: 'PROGRAMMING',
    level: 'Used in Projects',
    description: 'Algorithmic problem solving, Standard Template Library (STL), and object-oriented memory management.',
    projectsUsed: ['Competitive Problem Solving', 'Algorithmic Optimization'],
    relatedSkillIds: ['c', 'java']
  },

  // --- AI AND MACHINE LEARNING ---
  {
    id: 'langgraph',
    name: 'LangGraph.js',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Multi-agent orchestration, stateful agent graphs, parallel execution nodes, and bounded retry loops integrating Claude API.',
    projectsUsed: ['GiftGenie — Multi-Agent Recommendation Platform'],
    relatedSkillIds: ['javascript', 'claude-api', 'deep-learning']
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Neural representations, backpropagation dynamics, custom loss functions, and vision transformer architectures.',
    projectsUsed: ['Cross-View Campus Locator (24KIDS422)', 'CCTV Night Vision Colorizer', 'AI vs Human Classifier'],
    relatedSkillIds: ['pytorch', 'swin-transformer', 'efficientnet', 'computer-vision']
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Dynamic neural network construction, autograd mechanics, custom loss functions, and vision transformer training.',
    projectsUsed: ['Cross-View University Campus Locator', 'Real-time CCTV Night Vision Colorizer', 'AI vs Human Image Classifier'],
    relatedSkillIds: ['deep-learning', 'swin-transformer', 'efficientnet', 'opencv']
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Supervised classification, ensemble methods (Random Forest), probability calibration (Platt scaling), and codebase exploration of official repo.',
    projectsUsed: ['Diabetes Risk Prediction', 'Smart Crop Recommendation System', 'scikit-learn Open-Source Study'],
    relatedSkillIds: ['numpy', 'pandas', 'machine-learning']
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Predictive modeling, hyperparameter optimization, cross-validation, and bias-variance tradeoff balancing.',
    projectsUsed: ['Diabetes Risk Prediction', 'Smart Crop Recommendation System', 'Automated Parking System'],
    relatedSkillIds: ['scikit-learn', 'deep-learning']
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Vectorized mathematical operations, multi-dimensional tensor manipulations, array broadcasting, and numeric computation.',
    projectsUsed: ['Crop Recommendation System', 'Campus Locator Feature Transformations'],
    relatedSkillIds: ['pandas', 'scikit-learn', 'pytorch']
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Data wrangling, exploratory data analysis, time-series transformations, and statistical summaries for tabular datasets.',
    projectsUsed: ['Smart Crop Recommendation System', 'Diabetes Clinical Benchmark Data'],
    relatedSkillIds: ['numpy', 'scikit-learn']
  },

  // --- COMPUTER VISION ---
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Spatial feature extraction, image retrieval, cross-view geo-localization, and real-time infrared-to-color video translation.',
    projectsUsed: ['Cross-View Campus Locator (24KIDS422)', 'CCTV Night Vision Colorizer', 'Automated Parking System', 'Leaf Vein Classification'],
    relatedSkillIds: ['opencv', 'swin-transformer', 'faiss', 'pytorch']
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Real-time video frame processing, spatial filtering, color space conversions (CIE Lab), morphological operations, and ROI mapping.',
    projectsUsed: ['Real-time CCTV Night Vision Colorizer', 'Automated Parking Management System', 'Leaf Vein Classification', 'Campus Locator Preprocessing'],
    relatedSkillIds: ['computer-vision', 'pytorch', 'feature-extraction']
  },
  {
    id: 'swin-transformer',
    name: 'Swin Transformer',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Hierarchical Vision Transformer with Shifted Windows, delivering multi-scale attention modeling with linear computational complexity.',
    projectsUsed: ['Cross-View University Campus Locator (24KIDS422)'],
    relatedSkillIds: ['pytorch', 'deep-learning', 'faiss', 'feature-extraction']
  },
  {
    id: 'efficientnet',
    name: 'EfficientNet',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Compound scaling architectures utilizing inverted residual blocks and squeeze-and-excitation optimization for efficient vision models.',
    projectsUsed: ['AI vs Human Image Classifier'],
    relatedSkillIds: ['pytorch', 'transfer-learning']
  },
  {
    id: 'faiss',
    name: 'FAISS',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Facebook AI Similarity Search library for high-speed indexing, clustering, and sub-millisecond retrieval of dense 256-D vector embeddings.',
    projectsUsed: ['Cross-View University Campus Locator'],
    relatedSkillIds: ['swin-transformer', 'python']
  },
  {
    id: 'feature-extraction',
    name: 'Feature Extraction',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Dense vector representations, projection heads, L2 normalization, and spatial pooling for high-dimensional semantic embeddings.',
    projectsUsed: ['Cross-View University Campus Locator', 'Leaf Vein Classification'],
    relatedSkillIds: ['swin-transformer', 'opencv', 'pytorch']
  },

  // --- WEB DEVELOPMENT ---
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Modern, high-performance asynchronous Python web framework for building resilient REST APIs, webhook handlers, and microservices.',
    projectsUsed: ['Recovery Orchestrator (175 Tests)', 'OpsGuardian Diagnostic Sandbox'],
    relatedSkillIds: ['python', 'rest-apis', 'sqlalchemy', 'webhooks']
  },
  {
    id: 'node-js',
    name: 'Node.js',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Server-side JavaScript runtime, npm ecosystem orchestration, asynchronous I/O, and backend API engineering.',
    projectsUsed: ['KarunyaHacks Web Applications', 'Build Toolchains'],
    relatedSkillIds: ['javascript', 'express-js', 'rest-apis']
  },
  {
    id: 'express-js',
    name: 'Express.js',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Minimalist web framework for Node.js powering RESTful routing, middleware pipelines, and API integrations.',
    projectsUsed: ['KarunyaHacks Web Application Features'],
    relatedSkillIds: ['node-js', 'javascript', 'rest-apis']
  },
  {
    id: 'react',
    name: 'React',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Component-driven frontend architecture, hooks, state management, interactive 3D canvas integration, and high-performance UI rendering.',
    projectsUsed: ['The Web of Ideas Portfolio', 'Interactive Web Interfaces'],
    relatedSkillIds: ['javascript', 'node-js', 'html', 'css']
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Designing, documenting, and consuming stateless HTTP RESTful API endpoints with structured JSON schemas and status codes.',
    projectsUsed: ['KarunyaHacks Trainee Work', 'Recovery Orchestrator', 'OTP Verification System'],
    relatedSkillIds: ['fastapi', 'node-js', 'express-js']
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Python SQL toolkit and Object Relational Mapper (ORM) providing full power and flexibility of SQL with ACID transaction safety.',
    projectsUsed: ['Recovery Orchestrator (Decision Workflow)'],
    relatedSkillIds: ['fastapi', 'postgresql', 'sql', 'python']
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Event-driven architectures, idempotent webhook processing, signature verification, and persistent event deduplication.',
    projectsUsed: ['Recovery Orchestrator (Payment Recovery)'],
    relatedSkillIds: ['fastapi', 'rest-apis', 'sqlalchemy']
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Rapid interactive prototyping platform for data science, machine learning models, and algorithm visualization dashboards.',
    projectsUsed: ['Diabetes Risk Prediction', 'Smart Crop Recommendation System', 'Smart Timetable Generator'],
    relatedSkillIds: ['python', 'scikit-learn', 'pandas']
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Semantic markup, accessibility landmarks, modern HTML5 media APIs, canvas element management, and SEO metadata.',
    projectsUsed: ['The Web of Ideas Portfolio', 'OTP Verification System', 'GiftGenie'],
    relatedSkillIds: ['css', 'javascript', 'react']
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Responsive layouts, Flexbox, Grid, CSS animations, custom properties, and dark cinematic UI design systems.',
    projectsUsed: ['The Web of Ideas Portfolio', 'Responsive Web Interfaces', 'GiftGenie'],
    relatedSkillIds: ['html', 'react', 'javascript']
  },

  // --- TOOLS AND PLATFORMS ---
  {
    id: 'docker',
    name: 'Docker & Docker Compose',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Containerization, Dockerfile optimization, multi-container Docker Compose orchestration, and reproducible failure-testing sandboxes.',
    projectsUsed: ['OpsGuardian Root-Cause Sandbox', 'Microservice Containerization'],
    relatedSkillIds: ['prometheus-grafana', 'git', 'bash-shell']
  },
  {
    id: 'prometheus-grafana',
    name: 'Prometheus & Grafana',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Time-series telemetry scraping, service health dashboards, alerting rules, and visual root-cause diagnostics.',
    projectsUsed: ['OpsGuardian Root-Cause Diagnostic System'],
    relatedSkillIds: ['docker', 'fastapi', 'python']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Enterprise relational database management, transaction isolation, indexes, and persistent recovery logging.',
    projectsUsed: ['Recovery Orchestrator', 'OpsGuardian Database'],
    relatedSkillIds: ['sql', 'sqlalchemy', 'fastapi']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'TOOLS AND PLATFORMS',
    level: 'Used in Projects',
    description: 'NoSQL document database, BSON schemas, flexible collection structures, and aggregation pipelines.',
    projectsUsed: ['Document Storage & Web Backends'],
    relatedSkillIds: ['node-js', 'javascript']
  },
  {
    id: 'firebase-firestore',
    name: 'Firebase & Firestore',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Real-time cloud database, document collections, user session state, and serverless persistence for multi-agent workflows.',
    projectsUsed: ['GiftGenie Multi-Agent Platform'],
    relatedSkillIds: ['javascript', 'langgraph']
  },
  {
    id: 'git',
    name: 'Git',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Distributed version control, atomic commits, branching workflows, code reviews, and collaborative hygiene.',
    projectsUsed: ['All projects and repositories'],
    relatedSkillIds: ['github']
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Repository hosting, pull requests, issue tracking, continuous integration, and open-source collaboration.',
    projectsUsed: ['GitHub portfolio & open source repositories'],
    relatedSkillIds: ['git']
  },
  {
    id: 'vs-code',
    name: 'VS Code',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Primary IDE workflow with advanced extensions, Python language servers, remote development, and Git tooling.',
    projectsUsed: ['Daily engineering and development'],
    relatedSkillIds: ['git', 'python']
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Azure AI (AI-900)',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Certified Azure AI Fundamentals (AI-900), covering cognitive services, computer vision APIs, NLP, and responsible AI principles.',
    projectsUsed: ['Certified Azure AI Fundamentals (AI-900)'],
    relatedSkillIds: ['python', 'deep-learning']
  }
];
