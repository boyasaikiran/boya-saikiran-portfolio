import type { SkillNode } from '../types';

export const SKILLS: SkillNode[] = [
  // --- PROGRAMMING ---
  {
    id: 'python',
    name: 'Python',
    category: 'PROGRAMMING',
    level: 'Hands-on Experience',
    description: 'Primary engineering language utilized across all deep learning, computer vision, data pipelines, and backend microservices.',
    projectsUsed: ['Cross-View University Campus Locator', 'Real-time CCTV Night Vision Colorizer', 'Diabetes Risk Prediction', 'Automated Parking System', 'Smart Crop Recommendation'],
    relatedSkillIds: ['pytorch', 'scikit-learn', 'opencv', 'flask', 'streamlit']
  },
  {
    id: 'java',
    name: 'Java',
    category: 'PROGRAMMING',
    level: 'Hands-on Experience',
    description: 'Object-oriented programming, data structures, algorithms, and system fundamentals acquired through academic coursework and practical projects.',
    projectsUsed: ['Academic Systems & Algorithms', 'Data Structure Implementations'],
    relatedSkillIds: ['c-plus-plus', 'python']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'PROGRAMMING',
    level: 'Used in Projects',
    description: 'Modern ES6+ development for client-side interactivity, DOM manipulation, asynchronous operations, and interactive web applications.',
    projectsUsed: ['GiftGenie', 'OTP Verification System', 'The Web of Ideas Portfolio'],
    relatedSkillIds: ['react', 'node-js', 'html', 'css']
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
    description: 'Performance-critical algorithmic problem solving, Standard Template Library (STL), and object-oriented architectures.',
    projectsUsed: ['Competitive Problem Solving', 'Algorithmic Optimization'],
    relatedSkillIds: ['c', 'java']
  },

  // --- AI AND MACHINE LEARNING ---
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Dynamic neural network construction, autograd mechanics, custom loss functions, and vision transformer training.',
    projectsUsed: ['Cross-View University Campus Locator', 'Real-time CCTV Night Vision Colorizer', 'AI vs Human Image Classifier'],
    relatedSkillIds: ['deep-learning', 'transfer-learning', 'swin-transformer', 'efficientnet', 'opencv']
  },
  {
    id: 'tensorflow-keras',
    name: 'TensorFlow / Keras',
    category: 'AI AND MACHINE LEARNING',
    level: 'Used in Projects',
    description: 'Building and fine-tuning sequential and functional neural network architectures, pre-processing layers, and model export pipelines.',
    projectsUsed: ['Deep Learning Explorations', 'Image Classification Benchmarks'],
    relatedSkillIds: ['pytorch', 'deep-learning', 'machine-learning']
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Supervised and unsupervised learning, ensemble algorithms (Random Forest), cross-validation, calibrated logistic regression, and scikit-learn repository exploration.',
    projectsUsed: ['Diabetes Risk Prediction', 'Smart Crop Recommendation System', 'scikit-learn Open-Source Study'],
    relatedSkillIds: ['numpy', 'pandas', 'machine-learning']
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Vectorized mathematical operations, multi-dimensional tensor manipulations, array broadcasting, and high-performance numeric computations.',
    projectsUsed: ['Crop Recommendation System', 'Campus Locator Feature Transformations'],
    relatedSkillIds: ['pandas', 'scikit-learn', 'pytorch']
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Tabular data wrangling, data hygiene, exploratory data analysis, time-series transformations, and statistical summaries.',
    projectsUsed: ['Smart Crop Recommendation System', 'Benchmark Dataset Preparation'],
    relatedSkillIds: ['numpy', 'scikit-learn']
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Theory and practice of backpropagation, optimization dynamics (Adam, SGD, Cosine Annealing), regularization, attention mechanisms, and deep representation learning.',
    projectsUsed: ['Cross-View Campus Locator', 'AI vs Human Classifier', 'Chest X-Ray Analysis'],
    relatedSkillIds: ['pytorch', 'cnn', 'swin-transformer', 'transfer-learning']
  },
  {
    id: 'transfer-learning',
    name: 'Transfer Learning',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Leveraging large-scale pre-trained weights (ImageNet) to accelerate convergence and maximize generalization on specialized domain-specific tasks.',
    projectsUsed: ['Cross-View Campus Locator', 'AI vs Human Image Classifier'],
    relatedSkillIds: ['pytorch', 'swin-transformer', 'efficientnet']
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'AI AND MACHINE LEARNING',
    level: 'Hands-on Experience',
    description: 'Core concepts including bias-variance tradeoff, regularization, hyperparameter optimization, and ensemble decision methods.',
    projectsUsed: ['Smart Crop Recommendation System', 'Algorithmic Classifiers'],
    relatedSkillIds: ['scikit-learn', 'deep-learning']
  },

  // --- COMPUTER VISION ---
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Image processing, spatial filtering, edge detection, color space conversions, geometric transformations, and video stream manipulation.',
    projectsUsed: ['Real-time CCTV Night Vision Colorizer', 'Automated Parking Management System', 'Leaf Vein Classification', 'Campus Locator Preprocessing'],
    relatedSkillIds: ['mediapipe', 'feature-extraction', 'pytorch']
  },
  {
    id: 'mediapipe',
    name: 'MediaPipe',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'High-speed in-browser and cross-platform hand, pose, and face landmark tracking with real-time 3D coordinate estimation.',
    projectsUsed: ['Computer Vision Pose & Feature Experiments'],
    relatedSkillIds: ['opencv', 'javascript']
  },
  {
    id: 'cnn',
    name: 'CNNs',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Convolutional feature hierarchies, spatial pooling, receptive field modeling, and convolutional neural backbones.',
    projectsUsed: ['AI vs Human Classifier', 'Bird Species Classification', 'Pneumonia Detection'],
    relatedSkillIds: ['efficientnet', 'pytorch', 'deep-learning']
  },
  {
    id: 'efficientnet',
    name: 'EfficientNet',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Compound scaling architectures utilizing inverted residual blocks and squeeze-and-excitation optimization for efficient vision models.',
    projectsUsed: ['AI vs Human Image Classifier'],
    relatedSkillIds: ['cnn', 'pytorch', 'transfer-learning']
  },
  {
    id: 'swin-transformer',
    name: 'Swin Transformer',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Hierarchical Vision Transformer with Shifted Windows, delivering multi-scale attention modeling with linear computational complexity.',
    projectsUsed: ['Cross-View University Campus Locator'],
    relatedSkillIds: ['pytorch', 'deep-learning', 'feature-extraction', 'faiss']
  },
  {
    id: 'image-retrieval',
    name: 'Image Retrieval',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Content-based image retrieval (CBIR), deep metric embeddings, cosine similarity scoring, and nearest-neighbor candidate ranking.',
    projectsUsed: ['Cross-View University Campus Locator'],
    relatedSkillIds: ['faiss', 'feature-extraction', 'swin-transformer']
  },
  {
    id: 'feature-extraction',
    name: 'Feature Extraction',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Dense vector representations, projection heads, L2 normalization, and spatial pooling for high-dimensional semantic embeddings.',
    projectsUsed: ['Cross-View University Campus Locator', 'AI vs Human Classifier'],
    relatedSkillIds: ['swin-transformer', 'image-retrieval', 'pytorch']
  },
  {
    id: 'faiss',
    name: 'FAISS',
    category: 'COMPUTER VISION',
    level: 'Hands-on Experience',
    description: 'Facebook AI Similarity Search library for high-speed indexing, clustering, and sub-millisecond retrieval of dense vector embeddings.',
    projectsUsed: ['Cross-View University Campus Locator'],
    relatedSkillIds: ['image-retrieval', 'swin-transformer', 'python']
  },

  // --- WEB DEVELOPMENT ---
  {
    id: 'html',
    name: 'HTML',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Semantic markup, accessibility landmarks, modern HTML5 media APIs, canvas element management, and SEO metadata.',
    projectsUsed: ['The Web of Ideas Portfolio', 'OTP Verification System'],
    relatedSkillIds: ['css', 'javascript', 'react']
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Responsive layouts, Flexbox, Grid, CSS animations, custom properties, and dark cinematic UI design systems.',
    projectsUsed: ['The Web of Ideas Portfolio', 'Responsive Web Interfaces'],
    relatedSkillIds: ['html', 'react', 'javascript']
  },
  {
    id: 'react',
    name: 'React',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Modern component-driven frontend architecture, hooks, state management, interactive 3D canvas integration, and high-performance rendering.',
    projectsUsed: ['GiftGenie', 'OTP Verification System', 'The Web of Ideas Portfolio'],
    relatedSkillIds: ['javascript', 'html', 'css', 'node-js']
  },
  {
    id: 'node-js',
    name: 'Node.js',
    category: 'WEB DEVELOPMENT',
    level: 'Used in Projects',
    description: 'Server-side JavaScript runtime, npm ecosystem orchestration, package automation, and backend API integration.',
    projectsUsed: ['Build Toolchains', 'Web Applications'],
    relatedSkillIds: ['javascript', 'react', 'rest-apis']
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Lightweight Python WSGI micro-framework for serving machine learning models, REST endpoints, and authentication workflows.',
    projectsUsed: ['OTP Verification System', 'Model Inference Microservices'],
    relatedSkillIds: ['python', 'rest-apis']
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
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'WEB DEVELOPMENT',
    level: 'Hands-on Experience',
    description: 'Designing, documenting, and consuming stateless HTTP RESTful API endpoints with structured JSON schemas and status codes.',
    projectsUsed: ['OTP Verification System', 'Flask Backends', 'Portfolio Integrations'],
    relatedSkillIds: ['flask', 'node-js', 'python']
  },

  // --- TOOLS AND PLATFORMS ---
  {
    id: 'git',
    name: 'Git',
    category: 'TOOLS AND PLATFORMS',
    level: 'Hands-on Experience',
    description: 'Distributed version control, atomic commits, branching workflows, merge conflict resolution, and collaborative code hygiene.',
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
    id: 'docker',
    name: 'Docker',
    category: 'TOOLS AND PLATFORMS',
    level: 'Used in Projects',
    description: 'Containerization fundamentals, Dockerfiles, multi-stage builds, images, and isolated reproducibility for ML environments.',
    projectsUsed: ['ML Environment Containerization', 'Coursework Projects'],
    relatedSkillIds: ['git', 'google-cloud']
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
    id: 'google-cloud',
    name: 'Google Cloud',
    category: 'TOOLS AND PLATFORMS',
    level: 'Familiar',
    description: 'Cloud computing fundamentals, Compute Engine, cloud storage, and AI ecosystem exploration.',
    projectsUsed: ['Cloud Training & Deployment Labs'],
    relatedSkillIds: ['docker', 'azure-ai']
  },
  {
    id: 'azure-ai',
    name: 'Microsoft Azure AI',
    category: 'TOOLS AND PLATFORMS',
    level: 'Familiar',
    description: 'Cloud cognitive services, Azure AI Studio, and machine learning workspace environments.',
    projectsUsed: ['Cloud AI Explorations & Services'],
    relatedSkillIds: ['google-cloud', 'machine-learning']
  }
];
