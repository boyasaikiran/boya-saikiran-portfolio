export interface TourStep {
  title: string;
  sectionId: string;
  description: string;
  focusPoint?: string;
}

export interface GuidedTour {
  id: string;
  name: string;
  iconName: string;
  steps: TourStep[];
}

export const GUIDED_TOURS: Record<string, GuidedTour> = {
  overview: {
    id: 'overview',
    name: 'Complete Portfolio Odyssey',
    iconName: 'Compass',
    steps: [
      {
        title: 'Step 1: The Origin Story',
        sectionId: 'origin',
        description: 'Explore how Boya Saikiran transformed childhood curiosity into deep learning architectures and computer vision research.',
      },
      {
        title: 'Step 2: The Arsenal Constellation',
        sectionId: 'arsenal',
        description: 'Inspect the technical skill stack: PyTorch, Swin Transformers, OpenCV, FastAPI, Docker, and PostgreSQL.',
      },
      {
        title: 'Step 3: Engineering Missions',
        sectionId: 'missions',
        description: 'Explore 13 engineering projects including the Campus Locator, Recovery Orchestrator (175 tests), and OpsGuardian.',
      },
      {
        title: 'Step 4: Professional Journey',
        sectionId: 'journey',
        description: 'Review verified internships at KarunyaHacks, KIDS, and Cisco/AICTE along with hackathons and leadership.',
      },
      {
        title: 'Step 5: Verified Credentials',
        sectionId: 'achievements',
        description: 'Inspect 5 official certifications from Microsoft (Azure AI-900), IBM, Cisco, Google Cloud, and Simplilearn.',
      },
      {
        title: 'Step 6: Communication Transmitter',
        sectionId: 'contact',
        description: 'Direct contact coordinates: boyasaikiran37@gmail.com, cellular +91 6303093649, and official resume PDF.',
      },
    ],
  },
  projects: {
    id: 'projects',
    name: 'Flagship Projects Tour',
    iconName: 'Layers',
    steps: [
      {
        title: 'Mission 01: Cross-View Campus Locator',
        sectionId: 'missions',
        description: 'Dual-stream metric learning system matching ground drone/query imagery with satellite ortho-maps.',
      },
      {
        title: 'Mission 10: Recovery Orchestrator',
        sectionId: 'missions',
        description: 'Automated state machine engine built with Python, FastAPI, and PostgreSQL with 175 automated test suites.',
      },
      {
        title: 'Mission 11: OpsGuardian Diagnostic System',
        sectionId: 'missions',
        description: 'Containerized root-cause monitoring microservice with Docker, Prometheus, and Grafana telemetry.',
      },
      {
        title: 'Mission 09: GiftGenie Multi-Agent Engine',
        sectionId: 'missions',
        description: 'Autonomous multi-agent recommendation engine powered by LangGraph.js, Claude API, and Firebase Firestore.',
      },
    ],
  },
};
