import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'campus-locator',
    missionNumber: 'MISSION-01',
    title: 'Cross-View University Campus Locator',
    tagline: 'Multi-view geo-localization bridging satellite, drone, and ground-level perspective embeddings.',
    category: 'Computer Vision',
    status: 'Completed & Evaluated',
    techStack: ['PyTorch', 'Swin-Tiny', 'Triplet Margin Loss', 'FAISS', 'Grad-CAM', 'University-1652'],
    githubUrl: 'https://github.com/karunyainnovationstudio/24KIDS422',
    featured: true,
    overview: 'An advanced computer-vision research project engineered during the Karunya Innovation and Design Studio internship (24KIDS422). The system addresses cross-view geographic localization by matching ground and drone imagery against satellite reference maps using hierarchical vision transformer embeddings.',
    problemStatement: 'Cross-view geo-localization faces severe geometric perspective distortion, dramatic scale differences, seasonal lighting shifts, and occlusions when matching street or aerial drone photos against perpendicular satellite views.',
    objective: 'Design an end-to-end deep metric learning pipeline capable of extracting orientation-invariant 256-dimensional feature representations for fast sub-50ms vector search across thousands of campus facilities.',
    datasetAndSources: 'University-1652 Multi-View Benchmark Dataset, comprising 1,652 university buildings captured across 72 university campuses worldwide with synchronized satellite, drone flight path, and ground-level camera perspectives.',
    architecture: 'Input multi-view images (224x224) fed through a shifted-window hierarchical Swin-Tiny backbone. Extracted feature maps undergo global pooling, dense projection heads with L2 normalization to generate 256-D metric vectors. Training employs Triplet Margin Loss with hard negative mining. Similarity queries execute over a FAISS IndexFlatIP index with Grad-CAM visualization for saliency explainability.',
    technologyChoices: 'Swin-Tiny provides superior multi-scale receptive fields compared to standard CNNs with lower parameter overhead. FAISS enables billion-scale vector indexing with sub-millisecond retrieval. Grad-CAM confirms attention focuses on architectural contours rather than background artifacts.',
    implementationProcess: [
      'Preprocessed University-1652 multi-angle imagery with random horizontal flips, affine transformations, and color jitter.',
      'Fine-tuned Swin Transformer (Swin-Tiny) backbone initialized with ImageNet pre-trained weights.',
      'Constructed dense linear projection heads with batch normalization and L2 unit sphere mapping.',
      'Implemented triplet mining strategies (margin = 0.3) to maximize inter-class distance and minimize intra-class drift.',
      'Integrated Facebook AI Similarity Search (FAISS) vector database for near-instant cosine similarity retrieval.',
      'Built Grad-CAM saliency heatmaps to inspect attention maps across drone and ground camera angles.'
    ],
    challenges: [
      'Extreme visual discrepancies between 90° nadir satellite captures and 45°/0° oblique drone/ground shots.',
      'Vanishing architectural features during occlusions by trees and neighboring buildings.',
      'Computational constraints during batch triplet mining on high-resolution image sets.'
    ],
    solutions: [
      'Employed Swin-Tiny shifted-window self-attention to capture long-range geometric context invariant to viewpoint shift.',
      'Utilized semi-hard negative mining to prevent gradient collapse while maintaining discriminative stability.',
      'Built an in-memory FAISS flat index for vector retrieval latency under 50ms.'
    ],
    evaluationMethodology: 'Standard Cross-View Geo-Localization protocol evaluating Drone-to-Satellite and Street-to-Satellite retrieval using Cumulative Matching Characteristics (CMC Top-1, Top-5) and Mean Average Precision (mAP).',
    results: {
      metrics: [
        { label: 'Street Top-1', value: '42.9%', type: 'reported', context: 'Reported benchmark in project evaluation run' },
        { label: 'Drone Top-1', value: '25.1%', type: 'reported', context: 'Reported benchmark in project evaluation run' },
        { label: 'Street Top-5', value: '100.0%', type: 'reported', context: 'Top-5 candidate retrieval accuracy' },
        { label: 'Drone Top-5', value: '100.0%', type: 'reported', context: 'Top-5 candidate retrieval accuracy' },
        { label: 'Street mAP', value: '0.63', type: 'reported', context: 'Mean Average Precision' },
        { label: 'Drone mAP', value: '0.49', type: 'reported', context: 'Mean Average Precision' },
        { label: 'FAISS Search Latency', value: '< 50ms', type: 'latency', context: 'Reported query retrieval execution speed' }
      ],
      reportedSummary: 'Reported evaluation runs showed 100% Top-5 retrieval across both drone and street queries, with sub-50ms vector query times. Street Top-1 reached 42.9% (mAP 0.63) and Drone Top-1 reached 25.1% (mAP 0.49).',
      validationDisclaimer: 'Metrics represent reported project evaluations from the 24KIDS422 research team and project documentation. Results depend on test dataset partitions and specific hyperparameter tuning runs; they are presented as reported by the project team.'
    },
    limitations: [
      'Challenging retrieval performance on non-salient campus buildings lacking distinctive geometric features.',
      'Performance degrades in nighttime or extreme low-visibility weather conditions due to lack of infrared/multispectral channels.'
    ],
    futureImprovements: [
      'Integrate cross-attention mechanisms between ground and satellite branches to correlate fine-grained window features.',
      'Incorporate lightweight Vision-Language Models (VLMs) for text-guided geographic localization prompts.'
    ],
    hasInteractiveSimulator: 'campus-locator'
  },
  {
    id: 'cctv-night-vision-colorizer',
    missionNumber: 'MISSION-02',
    title: 'Real-time CCTV Night Vision to Coloured Vision AI',
    tagline: 'Deep generative image-to-image translation translating monochrome infrared surveillance feeds into vivid colorized video.',
    category: 'Computer Vision',
    status: 'Completed & Evaluated',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'Deep Learning', 'Image-to-Image Translation', 'CNNs'],
    githubUrl: 'https://github.com/boyasaikiran/Real-time-CCTV-Night-Vision-to-Coloured-Vision-AI-Model',
    featured: true,
    overview: 'A deep learning computer vision model engineered to reconstruct natural full-color spectral information from low-light monochrome and infrared nighttime CCTV security camera video feeds in real time.',
    problemStatement: 'Nighttime surveillance security systems predominantly capture low-contrast, monochrome infrared (IR) video, obscuring critical visual forensic details such as vehicle colors, clothing pigments, and ambient environmental hues.',
    objective: 'Develop an automated colorization model capable of predicting chrominance channels (ab) from luminance (L) inputs in real time without introducing severe chromatic aberration or temporal flickering artifacts.',
    datasetAndSources: 'Paired day/night surveillance video datasets and synthetic low-light luminance/chrominance training pairs across street traffic, residential perimeters, and parking zones.',
    architecture: 'Input monochrome/IR video frames converted into CIE Lab color space -> Luminance (L) channel normalized and processed through a deep convolutional autoencoder with residual bottleneck connections and skip connections -> Dual-head output predicting Chrominance (a and b) channels -> Reconstruction of full-color RGB frame via color-space inverse transformation.',
    technologyChoices: 'Working within the CIE Lab color space isolates brightness (L) from color (ab), preventing spatial distortion and allowing the neural network to focus solely on realistic pigment synthesis without altering underlying scene geometry.',
    implementationProcess: [
      'Built a high-throughput video frame extraction and color-space conversion pipeline with OpenCV.',
      'Designed a multi-scale convolutional architecture incorporating perceptual loss (VGG feature matching) and L1 pixel loss.',
      'Applied temporal consistency filters to suppress inter-frame flicker in continuous video streams.',
      'Optimized PyTorch inference latency for real-time video stream processing on edge GPU/CPU configurations.'
    ],
    challenges: [
      'Ill-posed color ambiguity (e.g. distinguishing a red car from a blue car in flat grayscale IR video).',
      'Maintaining edge sharpness and preventing color bleeding around moving objects.'
    ],
    solutions: [
      'Incorporated semantic spatial priors and contextual texture cues to infer most probable real-world color distributions.',
      'Utilized perceptual feature losses to ensure color boundaries strictly align with physical object edges.'
    ],
    evaluationMethodology: 'Evaluated using Peak Signal-to-Noise Ratio (PSNR), Structural Similarity Index (SSIM), and inference frame rate (FPS).',
    results: {
      metrics: [
        { label: 'Domain', value: 'Surveillance AI', type: 'experimental' },
        { label: 'Color Space', value: 'CIE Lab', type: 'experimental', context: 'Luminance to Chrominance (ab)' },
        { label: 'Processing', value: 'Real-Time', type: 'experimental', context: 'Video frame colorization' }
      ],
      reportedSummary: 'Substantially elevates nighttime scene interpretability, enabling clearer vehicle and person attribute recognition in low-light surveillance scenarios.',
      validationDisclaimer: 'Evaluated on captured security video test segments; color reproduction represents statistical reconstruction of learned real-world scene distributions.'
    },
    limitations: [
      'May produce subdued pastel tones on unusual or highly reflective synthetic materials in total darkness.'
    ],
    futureImprovements: [
      'Incorporate lightweight Vision Transformer blocks for longer-range environmental lighting context.',
      'Export optimized ONNX / TensorRT runtime engines for zero-latency camera edge hardware integration.'
    ]
  },
  {
    id: 'ai-vs-human-classifier',
    missionNumber: 'MISSION-03',
    title: 'AI vs Human Image Classifier',
    tagline: 'Deep convolutional feature extractor detecting generative synthesis artifacts and diffusion noise patterns.',
    category: 'Computer Vision',
    status: 'Completed & Evaluated',
    techStack: ['PyTorch', 'EfficientNet-B0', 'Transfer Learning', 'Torchvision', 'Scikit-learn', 'OpenCV'],
    githubUrl: 'https://github.com/boyasaikiran/AI-image-vs-Human-image-Classifier',
    featured: true,
    overview: 'A deep learning classification engine trained to identify synthetic images generated by modern generative AI models (Diffusion, GANs) versus authentic human-captured photography through micro-texture and frequency artifact detection.',
    problemStatement: 'The rapid proliferation of hyper-realistic generative models produces imagery with subtle frequency domain inconsistencies, unnatural boundary blends, and semantic structural anomalies that evade casual human detection.',
    objective: 'Build an optimized binary classification model utilizing transfer learning with EfficientNet-B0 that accurately flags synthetic visual artifacts with minimal parameter count and fast inference.',
    datasetAndSources: 'Curated dataset of authentic real-world photography balanced with synthetic images generated via Stable Diffusion, Midjourney, and StyleGAN architectures across diverse subjects (portraits, landscapes, objects).',
    architecture: 'Input imagery normalized to ImageNet distributions. Backbone features extracted via EfficientNet-B0 inverted residual blocks (MBConv) with squeeze-and-excitation optimization. Custom classification head consists of Adaptive Average Pooling, Dropout (0.3), Linear (1280 -> 256), ReLU, and a 2-class Softmax output.',
    technologyChoices: 'EfficientNet-B0 achieves high top-1 accuracy with only ~5.3 million parameters, making it ideal for edge deployment, fast training iterations, and reduced GPU memory footprints.',
    implementationProcess: [
      'Constructed a robust image augmentation pipeline incorporating RandomResizedCrop, RandomHorizontalFlip, and ColorJitter.',
      'Froze early feature extraction layers of pre-trained EfficientNet-B0 to retain generalized low-level edge and texture detectors.',
      'Trained high-level convolutional blocks and custom classification head using Adam optimizer with cosine annealing learning rate scheduler.',
      'Monitored validation loss and Binary Cross-Entropy to prevent overfitting on synthetic generator-specific noise.'
    ],
    challenges: [
      'Generators improving rapidly, leaving fewer visible boundary artifacts.',
      'Overfitting to particular generator color grading or resolution signatures.'
    ],
    solutions: [
      'Included images from multiple generative engines to enforce generalized artifact learning rather than single-model fingerprinting.',
      'Applied heavy data regularization including Gaussian blur and compression artifact simulation.'
    ],
    evaluationMethodology: 'Stratified test set validation evaluating Precision, Recall, F1-Score, and ROC-AUC curve.',
    results: {
      metrics: [
        { label: 'Architecture', value: 'EfficientNet-B0', type: 'experimental' },
        { label: 'Parameters', value: '5.3M', type: 'experimental' },
        { label: 'GitHub Community', value: '2 Stars', type: 'experimental', context: 'Public repository engagement' }
      ],
      reportedSummary: 'Effective high-confidence discrimination of synthetic artifacts with robust inference times suitable for web API integration.',
      validationDisclaimer: 'Trained and validated on curated public benchmarks; real-world efficacy may vary with newly emerging generator architectures.'
    },
    limitations: [
      'Reduced accuracy when evaluating heavily re-compressed images or low-resolution thumbnails.',
      'May produce false positives on authentic photographs subjected to aggressive digital retouching or HDR filters.'
    ],
    futureImprovements: [
      'Incorporate Discrete Cosine Transform (DCT) frequency analysis branch alongside spatial convolutional channels.',
      'Deploy as an interactive browser extension for instant web image authenticity verification.'
    ]
  },
  {
    id: 'crop-recommendation-system',
    missionNumber: 'MISSION-04',
    title: 'Smart Crop Recommendation System',
    tagline: 'Precision agriculture ML pipeline predicting optimal crop yields from multi-variable soil and weather telemetry.',
    category: 'AI / Machine Learning',
    status: 'In Production / Live',
    techStack: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'NumPy', 'Streamlit'],
    githubUrl: 'https://github.com/boyasaikiran/crop_recommendation_system',
    featured: true,
    overview: 'An interactive agro-intelligence platform designed to help farmers and agronomists select optimal crops based on exact soil chemical properties and meteorological conditions.',
    problemStatement: 'Sub-optimal crop selection driven by traditional guesswork leads to poor soil depletion, wasted irrigation, reduced crop yields, and economic losses for agricultural communities.',
    objective: 'Develop an intuitive, highly accurate decision-support system analyzing 7 distinct environmental parameters to recommend the most suitable crop out of 22 agricultural varieties.',
    datasetAndSources: 'Agricultural crop dataset featuring 2,200 labeled observations across 22 crops with continuous parameters: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature (°C), Humidity (%), Soil pH, and Rainfall (mm).',
    architecture: 'Data ingestion and validation pipeline -> Standard scaler preprocessing -> Random Forest ensemble classifier (100 estimators with entropy criterion) -> Streamlit interactive frontend with dynamic parameter sliders.',
    technologyChoices: 'Random Forest was selected for its exceptional ability to capture non-linear interactions between chemical nutrients (NPK ratios) and weather dynamics without risk of overfitting on tabular data.',
    implementationProcess: [
      'Conducted exploratory data analysis (EDA) and correlation matrix inspection on NPK ratios, rainfall, and pH balance.',
      'Trained and benchmarked multiple models including Decision Trees, Gaussian Naive Bayes, Support Vector Machines, and Random Forest.',
      'Optimized hyperparameters using GridSearchCV for tree depth, split criteria, and minimum sample leaves.',
      'Built a reactive Streamlit web dashboard providing instant recommendations and confidence metrics.'
    ],
    challenges: [
      'Multi-collinearity between temperature and humidity factors across seasonal crop categories.',
      'Ensuring recommendations remained ecologically realistic across extreme climate edge cases.'
    ],
    solutions: [
      'Ensemble bagging reduced variance across boundary conditions.',
      'Input validation boundaries implemented in the user interface to prevent biologically impossible soil parameter inputs.'
    ],
    evaluationMethodology: 'K-Fold Cross-Validation (K=5) measuring Multiclass Accuracy, Precision, Recall, and Confusion Matrix across all 22 crop classes.',
    results: {
      metrics: [
        { label: 'Supported Crops', value: '22 Classes', type: 'experimental', context: 'Rice, Maize, Chickpea, Cotton, Coffee, etc.' },
        { label: 'Features Evaluated', value: '7 Variables', type: 'experimental', context: 'N, P, K, Temp, Humidity, pH, Rainfall' },
        { label: 'Model Core', value: 'Random Forest', type: 'experimental' }
      ],
      reportedSummary: 'High-precision crop prediction delivering rapid decisions via clean Streamlit interface with clear agricultural guidance.',
      validationDisclaimer: 'Model predictions reflect the distribution of the training benchmark; local agricultural soil tests are recommended for commercial deployment.'
    },
    limitations: [
      'Does not currently account for dynamic market crop pricing or regional fertilizer accessibility.',
      'Relies on static snapshot soil data rather than continuous IoT soil sensor streaming.'
    ],
    futureImprovements: [
      'Integrate real-time weather API telemetry based on GPS coordinates.',
      'Connect IoT LoRaWAN soil probe data directly to an automated continuous inference endpoint.'
    ],
    hasInteractiveSimulator: 'crop-predictor'
  },
  {
    id: 'diabetes-risk-prediction',
    missionNumber: 'MISSION-05',
    title: 'Diabetes Risk Prediction Engine',
    tagline: 'Clinical health risk prediction utilizing calibrated Logistic Regression and interactive Streamlit diagnostics.',
    category: 'AI / Machine Learning',
    status: 'In Production / Live',
    techStack: ['Python', 'Scikit-learn', 'Logistic Regression', 'Streamlit', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/boyasaikiran/diabetes-risk-prediction',
    featured: true,
    overview: 'A clinical machine learning decision support tool designed to quantify patient diabetes risk based on medical diagnostic biometrics, offering probabilistic confidence scores and interpretable risk factor breakdowns.',
    problemStatement: 'Early diabetes onset often remains asymptomatic, leading to severe chronic complications when metabolic dysregulation goes undetected by standard annual clinical checkups.',
    objective: 'Train, calibrate, and deploy an explainable supervised classification model delivering well-calibrated risk probabilities from non-invasive diagnostic health markers.',
    datasetAndSources: 'Clinical patient health benchmark data tracking Glucose concentration, Blood Pressure, Skin Thickness, Insulin levels, Body Mass Index (BMI), Diabetes Pedigree Function, and Age.',
    architecture: 'Patient biomarker telemetry -> Missing value imputation & Robust scaling -> Calibrated Logistic Regression with L2 regularization -> Platt probability calibration -> Interactive Streamlit web interface presenting risk stratifications.',
    technologyChoices: 'Calibrated Logistic Regression provides transparent, log-odds interpretability crucial for medical applications, allowing doctors and patients to understand exact contributing factors rather than opaque black-box predictions.',
    implementationProcess: [
      'Conducted clinical data preprocessing handling physiologically impossible zero-values in glucose and blood pressure through median imputation.',
      'Trained Logistic Regression with hyperparameter optimization over regularization strength (C).',
      'Implemented probability calibration curves (Brier score minimization) ensuring output percentages reflect genuine clinical likelihoods.',
      'Engineered an interactive Streamlit diagnostic calculator for rapid point-of-care patient risk assessment.'
    ],
    challenges: [
      'Handling missing physiological indicators without distorting patient risk distributions.',
      'Preventing overconfidence in borderline high-risk cases.'
    ],
    solutions: [
      'Applied median grouped imputation conditioned on patient age and pregnancy status.',
      'Utilized isotonic calibration to adjust output probabilities.'
    ],
    evaluationMethodology: 'Evaluated using ROC-AUC, Sensitivity (Recall), Specificity, and Brier calibration score.',
    results: {
      metrics: [
        { label: 'Algorithm', value: 'Logistic Regression', type: 'experimental', context: 'L2 Calibrated' },
        { label: 'Interface', value: 'Streamlit', type: 'experimental', context: 'Interactive diagnostic tool' },
        { label: 'License', value: 'MIT', type: 'experimental', context: 'Open-source software' }
      ],
      reportedSummary: 'Fast, interpretable, and clinically transparent risk quantification tool deployed with interactive web UI.',
      validationDisclaimer: 'Intended as a screening decision-support aid; final diagnoses require certified laboratory blood glucose panels.'
    },
    limitations: [
      'Trained on diagnostic indicator distributions that may vary across different regional demographics.'
    ],
    futureImprovements: [
      'Incorporate longitudinal patient trend data to model diabetic progression over multi-year intervals.'
    ]
  },
  {
    id: 'automated-parking-management',
    missionNumber: 'MISSION-06',
    title: 'Automated Parking Management System',
    tagline: 'Computer vision automated slot detection and occupancy tracking using image processing and machine learning.',
    category: 'Computer Vision',
    status: 'Completed & Evaluated',
    techStack: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning', 'Image Processing'],
    githubUrl: 'https://github.com/boyasaikiran/Automated-Parking-Management-System-Using-Machine-learning',
    featured: false,
    overview: 'An intelligent visual surveillance application that monitors parking lots in real time via overhead cameras, automatically segmenting parking bays and detecting vehicle occupancy status without expensive inductive ground sensors.',
    problemStatement: 'Urban parking facilities suffer from inefficient utilization, driver congestion, and high hardware maintenance costs associated with physical in-ground ultrasonic or magnetic bay sensors.',
    objective: 'Create an automated vision-based slot monitoring system that maps designated coordinates, extracts spatial pixel densities, and classifies vacant vs occupied slots at 30+ FPS.',
    datasetAndSources: 'Overhead parking lot video feeds and photographic surveillance captures across variable lighting conditions, shadows, and weather states.',
    architecture: 'Overhead camera feed -> Perspective warping & Region of Interest (ROI) mapping -> Image filtering (Adaptive Thresholding, Gaussian Blur, Dilation) -> Pixel count thresholding & feature classification -> Real-time visual overlay displaying vacant/occupied slot counts and spot availability.',
    technologyChoices: 'OpenCV spatial image processing combined with ML classification enables deployment on existing security camera infrastructure without installing any physical road hardware.',
    implementationProcess: [
      'Engineered an interactive slot coordinate selector to annotate polygon boundaries for each parking bay.',
      'Applied morphological operations to extract vehicle presence signatures while suppressing asphalt shadows.',
      'Integrated real-time dashboard counters calculating available vs occupied capacity metrics.',
      'Optimized frame processing loop to maintain low CPU overhead on multi-camera streams.'
    ],
    challenges: [
      'Dynamic shadows cast by trees and adjacent structures causing false occupancy triggers.',
      'Camera angle perspective distortion on distant parking bays.'
    ],
    solutions: [
      'Utilized adaptive thresholding with morphological kernels tailored to vehicle mass geometry rather than lighting contrast.',
      'Applied inverse perspective mapping to normalize bay bounding boxes.'
    ],
    evaluationMethodology: 'Tested on continuous real-world parking lot camera video recordings measuring detection accuracy and false alarm rates.',
    results: {
      metrics: [
        { label: 'Technology', value: 'OpenCV / Python', type: 'experimental' },
        { label: 'Hardware', value: 'Zero Road Sensors', type: 'experimental', context: 'Vision-only overhead analysis' },
        { label: 'Community', value: '1 Star', type: 'experimental', context: 'Public GitHub repo' }
      ],
      reportedSummary: 'Cost-effective smart city parking management running on standard surveillance cameras.',
      validationDisclaimer: 'Accuracy depends on camera elevation, lens clarity, and unobstructed line of sight to parking bays.'
    },
    limitations: [
      'Extreme weather events (heavy snow, torrential downpours) may partially obscure painted bay markings.'
    ],
    futureImprovements: [
      'Integrate YOLOv8 object detection backbone for vehicle license plate recognition (ALPR).'
    ]
  },
  {
    id: 'ai-career-intelligence',
    missionNumber: 'MISSION-07',
    title: 'AI Career Intelligence Platform',
    tagline: 'Intelligent career trajectory planning and skill-gap recommendation engine built with Python.',
    category: 'AI / Machine Learning',
    status: 'In Production / Live',
    techStack: ['Python', 'Machine Learning', 'NLP', 'Data Science', 'Recommendation Systems'],
    githubUrl: 'https://github.com/boyasaikiran/AI-Career-Intelligence-Platform',
    featured: false,
    overview: 'An AI-driven career guidance and skill mapping platform that evaluates student resumes, portfolios, and technical interests to recommend personalized engineering career paths, prerequisite milestones, and targeted upskilling roadmaps.',
    problemStatement: 'Computer science undergraduates and early-career developers frequently struggle to navigate rapidly evolving tech specializations (AI, Cloud, DevOps, Cyber) and identify actionable skill gaps.',
    objective: 'Build an automated career intelligence recommendation engine that analyzes developer technical competency profiles and matches them against industry role requirement vectors.',
    datasetAndSources: 'Tech industry job competency profiles, skills ontology dictionaries, and role prerequisite knowledge graphs.',
    architecture: 'Candidate profile & skills ingestion -> Vectorized skill embedding & similarity matching -> Skill-gap gap analysis algorithm -> Personalized roadmap generation engine -> Web user dashboard.',
    technologyChoices: 'Python data science stack enables fast natural language parsing of skills and structured correlation mapping against industry demand profiles.',
    implementationProcess: [
      'Curated technical skill hierarchies across AI/ML, Full-Stack, Cloud, and Data Engineering.',
      'Developed cosine similarity matching algorithms comparing candidate skill profiles with benchmark job profiles.',
      'Engineered an actionable gap-analysis visualizer highlighting missing prerequisite technologies.'
    ],
    challenges: [
      'Handling informal or synonymously worded skill descriptions in candidate inputs.'
    ],
    solutions: [
      'Implemented standardized ontology mapping to harmonize variant skill terminologies into canonical concepts.'
    ],
    evaluationMethodology: 'User experience evaluation across diverse student and peer resumes.',
    results: {
      metrics: [
        { label: 'Core Language', value: 'Python', type: 'experimental' },
        { label: 'Domain', value: 'Career AI & EdTech', type: 'experimental' }
      ],
      reportedSummary: 'Constructive guidance system empowering students to identify specific engineering strengths and target learning milestones.',
      validationDisclaimer: 'Skill demand profiles reflect synthesized tech industry benchmarks.'
    },
    limitations: [
      'Continuous maintenance required to keep tech ontology updated with newly emerging libraries and frameworks.'
    ],
    futureImprovements: [
      'Integrate real-time job board API ingestion for dynamic market demand weighting.'
    ]
  },
  {
    id: 'leaf-vein-classification',
    missionNumber: 'MISSION-08',
    title: 'Botanical Leaf Vein Classification',
    tagline: 'Computer vision botanical identification extracting venation micro-patterns and morphometric contours.',
    category: 'Computer Vision',
    status: 'Completed & Evaluated',
    techStack: ['Python', 'OpenCV', 'Computer Vision', 'Feature Extraction', 'Image Processing'],
    githubUrl: 'https://github.com/boyasaikiran/leaf_vein_classification',
    featured: false,
    overview: 'A fine-grained computer vision project that classifies plant and foliage species by analyzing high-resolution leaf venation patterns and skeletal morphological structures.',
    problemStatement: 'Botanical species identification is challenging when overall leaf silhouettes appear identical across distinct plant families, necessitating micro-structural venation analysis.',
    objective: 'Implement image processing pipelines that isolate complex vein networks (reticulate, parallel, palmate) and extract discriminative geometric feature vectors for accurate species classification.',
    datasetAndSources: 'High-resolution digital leaf photography datasets with transparent backlight illumination capturing intricate xylem and phloem venation architecture.',
    architecture: 'High-res leaf image -> Grayscale conversion & Contrast Limited Adaptive Histogram Equalization (CLAHE) -> Morphological skeletonization and edge detection (Canny, Sobel) -> Venation density and branching angle feature extraction -> Machine learning classification.',
    technologyChoices: 'CLAHE and morphological thinning enable extraction of ultra-fine vein contours even in low-contrast botanical specimens.',
    implementationProcess: [
      'Developed multi-stage image enhancement routines highlighting sub-millimeter vein structures.',
      'Computed geometric feature metrics including branching angle frequency, vein length distributions, and fractal dimensions.',
      'Trained classification models to distinguish botanical taxa from extracted structural vectors.'
    ],
    challenges: [
      'Non-uniform illumination across natural leaf surfaces and background leaf tissue discoloration.'
    ],
    solutions: [
      'Applied localized adaptive thresholding and background subtraction filters.'
    ],
    evaluationMethodology: 'Evaluated classification accuracy and feature reproducibility across varied leaf specimens.',
    results: {
      metrics: [
        { label: 'Domain', value: 'Botanical CV', type: 'experimental' },
        { label: 'Toolchain', value: 'OpenCV / Python', type: 'experimental' }
      ],
      reportedSummary: 'Reliable extraction of botanical venation features facilitating automated plant taxonomy.',
      validationDisclaimer: 'Best results achieved with back-illuminated leaf specimen captures.'
    },
    limitations: [
      'Damaged or withered leaf specimens with broken venation networks can distort extracted feature metrics.'
    ],
    futureImprovements: [
      'Train lightweight Convolutional Neural Networks (MobileNetV3) directly on high-resolution venation patches.'
    ]
  },
  {
    id: 'otp-verification-system',
    missionNumber: 'MISSION-09',
    title: 'Secure OTP Verification System',
    tagline: 'Web authentication verification system featuring secure token lifecycle, expiration logic, and clean interface.',
    category: 'System & Security',
    status: 'Completed & Evaluated',
    techStack: ['JavaScript', 'HTML/CSS', 'Authentication', 'Security Workflows', 'Web Engineering'],
    githubUrl: 'https://github.com/boyasaikiran/otp-verification-system',
    featured: false,
    overview: 'A lightweight, secure one-time password (OTP) verification application engineered in JavaScript, providing time-bound token validation, input auto-focus handling, and defensive retry limiting.',
    problemStatement: 'Web application authentication flows frequently suffer from clunky multi-digit input UX, lack of expiration controls, and insecure token verification.',
    objective: 'Build an intuitive, responsive verification interface featuring segmented digit input fields, countdown timers, and automated validation logic.',
    datasetAndSources: 'Simulated user authentication sessions and web security testing scenarios.',
    architecture: 'Client verification request -> Digit-by-digit auto-advancing input fields -> Validity countdown timer -> Client/backend verification handshake with token expiration enforcement.',
    technologyChoices: 'Vanilla JavaScript provides zero-dependency speed and fine-grained DOM event control for seamless keyboard navigation across 6-digit input cells.',
    implementationProcess: [
      'Built multi-box numeric input with automatic focus shifting, backspace retreat, and clipboard paste parsing.',
      'Implemented countdown timer with automatic token expiry and resend cooldown throttling.',
      'Constructed stateful verification logic flagging successful authentication or remaining attempts.'
    ],
    challenges: [
      'Handling diverse mobile keyboard behaviors and multi-digit paste events cleanly.'
    ],
    solutions: [
      'Intercepted clipboard paste events to automatically populate all subsequent digit inputs sequentially.'
    ],
    evaluationMethodology: 'Cross-browser manual and automated UI testing.',
    results: {
      metrics: [
        { label: 'Language', value: 'JavaScript', type: 'experimental' },
        { label: 'Input Architecture', value: 'Auto-Advancing Cells', type: 'experimental' }
      ],
      reportedSummary: 'Clean, reliable, and user-friendly verification interface ready for embedding into web applications.',
      validationDisclaimer: 'Client-side verification workflow designed for web frontend integration.'
    },
    limitations: [
      'Production deployment requires pairing with an encrypted backend SMS/Email delivery gateway.'
    ],
    futureImprovements: [
      'Add WebOTP API support for automatic one-click SMS verification on Android browsers.'
    ]
  },
  {
    id: 'smart-timetable-generator',
    missionNumber: 'MISSION-10',
    title: 'Smart Timetable Generator',
    tagline: 'Constraint-satisfaction automated scheduler resolving faculty, room, and curriculum conflicts.',
    category: 'Academic / Hackathon',
    status: 'Hackathon Finalist',
    techStack: ['Python', 'Algorithms', 'Constraint Satisfaction', 'Data Structures', 'Streamlit'],
    featured: false,
    overview: 'An algorithmic scheduling application developed during G-K Hacks 2025 to eliminate the tedious, conflict-prone manual chore of organizing university academic timetables.',
    problemStatement: 'Higher education institutions struggle with complex multi-variable scheduling where instructor availability, classroom seating capacities, lab equipment requirements, and student batch overlaps create hard constraints that are difficult to resolve manually.',
    objective: 'Design an automated scheduling engine applying constraint satisfaction techniques to generate clash-free semester schedules in seconds.',
    datasetAndSources: 'University department curriculum matrices, instructor teaching load quotas, and classroom inventory records.',
    architecture: 'Input constraint parser -> Constraint Satisfaction Problem (CSP) formulation -> Backtracking search with forward checking and heuristic variable ordering (MRV - Minimum Remaining Values) -> Schedule matrix output view.',
    technologyChoices: 'Backtracking with Forward Checking provides deterministic clash elimination without needing heavy metaheuristics for standard department scale.',
    implementationProcess: [
      'Modeled scheduling rules into Hard Constraints (no faculty clashes, no room clashes) and Soft Constraints (balanced instructor load, minimizing student gaps).',
      'Implemented heuristic variable selection to prioritize highly constrained courses and lab blocks first.',
      'Designed a clear visual grid interface displaying generated weekly schedules by department, section, or faculty member.'
    ],
    challenges: [
      'State space explosion when scheduling large engineering departments with shared multi-section electives and lab hours.'
    ],
    solutions: [
      'Prioritized lab blocks and core lecture assignments before slotting flexible single-credit elective modules.'
    ],
    evaluationMethodology: 'Stress-tested with synthetic college departments with up to 50 faculty members and 30 classroom resources.',
    results: {
      metrics: [
        { label: 'Event', value: 'G-K Hacks 2025', type: 'experimental', context: 'Team hackathon project' },
        { label: 'Conflict Rate', value: '0 Hard Clashes', type: 'experimental', context: 'Deterministic constraint solver' }
      ],
      reportedSummary: 'Successfully demonstrated automated conflict-free timetable generation during G-K Hacks 2025.',
      validationDisclaimer: 'Developed as a team hackathon prototype. Metrics and performance reflect demonstrated test runs.'
    },
    limitations: [
      'Does not dynamically adjust for sudden day-of instructor illness or emergency room reassignments.'
    ],
    futureImprovements: [
      'Incorporate Genetic Algorithms for multi-objective optimization of faculty preferences.'
    ]
  }
];

export const ADDITIONAL_PROJECTS = [
  {
    title: 'GiftGenie',
    category: 'Web Application',
    tech: 'JavaScript, Web Development, Algorithms',
    status: 'Public Repository',
    description: 'Interactive web platform providing intelligent gift recommendations based on recipient personality traits, occasion context, and budget preferences.'
  },
  {
    title: 'Recover-Orchestrator',
    category: 'System Tooling',
    tech: 'Python, Automation, Process Orchestration',
    status: 'Public Repository',
    description: 'Python process orchestration utility managing system recovery workflows, process monitoring, and automated operational task execution.'
  },
  {
    title: 'campus-insight-hub-73',
    category: 'Campus Analytics',
    tech: 'TypeScript, Modern Frontend, Data Visualization',
    status: 'Active Repository',
    description: 'Interactive campus insight and analytics dashboard platform engineered in TypeScript for student tracking and departmental metrics.'
  },
  {
    title: 'Flutter-Lab-URK23CS7143',
    category: 'Mobile Engineering',
    tech: 'Flutter, Dart, Cross-Platform Mobile',
    status: 'Academic Laboratory',
    description: 'Comprehensive mobile application engineering laboratory repository (URK23CS7143) implementing native mobile UI components, navigation, and state workflows.'
  },
  {
    title: 'scikit-learn (Open-Source Fork)',
    category: 'Open-Source Learning',
    tech: 'Python, Machine Learning Core, Cython, NumPy',
    status: 'Open-Source Study',
    description: 'Local fork and codebase exploration of the official scikit-learn repository, analyzing algorithmic implementations of core estimators and metric modules.'
  }
];
