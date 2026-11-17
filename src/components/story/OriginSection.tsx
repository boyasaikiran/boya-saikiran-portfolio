import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  BrainCircuit, 
  Eye, 
  Rocket, 
  Globe, 
  GraduationCap, 
  Compass, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { soundManager } from '../../audio/soundEffects';

interface JourneyChapter {
  id: string;
  stepNumber: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  summary: string;
  details: string;
  focusKeywords: string[];
}

const CHAPTERS: JourneyChapter[] = [
  {
    id: 'foundations',
    stepNumber: 'PHASE 01',
    title: 'Foundations of Computation',
    badge: 'Code & Logic',
    icon: <Code2 className="text-[#FF3548]" size={20} />,
    summary: 'Mastering low-level programming constructs, memory handling, object-oriented concepts, and core data structures.',
    details: 'The journey began with foundational computer science principles. Working extensively with C, C++, and Java through rigorous computer science coursework and hands-on laboratory implementations instilled an obsession with algorithmic efficiency, pointer mechanics, and clean modular architecture.',
    focusKeywords: ['C/C++', 'Java', 'Data Structures', 'Algorithmic Problem Solving']
  },
  {
    id: 'ml-discovery',
    stepNumber: 'PHASE 02',
    title: 'Discovering Machine Learning',
    badge: 'Statistical AI',
    icon: <BrainCircuit className="text-[#75E5ED]" size={20} />,
    summary: 'Transitioning from hardcoded rule systems to predictive statistical modeling on real-world data.',
    details: 'Stepping into Artificial Intelligence at Karunya Institute of Technology and Sciences revealed the power of statistical learning. Exploring Scikit-learn, Pandas, and NumPy paved the way for building practical predictive applications, such as agricultural soil-to-crop classification using Random Forest models.',
    focusKeywords: ['Scikit-learn', 'Pandas', 'NumPy', 'Random Forest', 'Statistical Analysis']
  },
  {
    id: 'deep-learning',
    stepNumber: 'PHASE 03',
    title: 'Deep Learning & Representations',
    badge: 'Neural Architectures',
    icon: <BrainCircuit className="text-[#FF3548]" size={20} />,
    summary: 'Unpacking gradient backpropagation, tensor mechanics, and multi-layer neural networks with PyTorch.',
    details: 'Deep learning transformed abstract math into living representations. Completing Lightning AI fundamentals and hands-on experimentation with PyTorch demystified activation manifolds, custom loss formulations, and the mechanics of training deep neural weights without gradient collapse.',
    focusKeywords: ['PyTorch', 'Lightning AI', 'Backpropagation', 'Loss Functions', 'Tensors']
  },
  {
    id: 'computer-vision',
    stepNumber: 'PHASE 04',
    title: 'The Computer Vision Frontier',
    badge: 'Spatial Intelligence',
    icon: <Eye className="text-[#FF3548]" size={20} />,
    summary: 'Teaching machines to interpret multi-dimensional visual worlds, viewpoints, and semantic patterns.',
    details: 'Visual perception became the core technical obsession. From spatial convolutions and EfficientNet transfer learning to hierarchical Swin Transformers and OpenCV/MediaPipe tracking, computer vision connected raw pixel arrays with rich geometric and semantic comprehension.',
    focusKeywords: ['OpenCV', 'Swin Transformers', 'EfficientNet', 'MediaPipe', 'Metric Learning']
  },
  {
    id: 'practical-systems',
    stepNumber: 'PHASE 05',
    title: 'Engineering Practical Systems',
    badge: 'Real-World Impact',
    icon: <Rocket className="text-[#75E5ED]" size={20} />,
    summary: 'Translating research models into working software with vector search, security, and live interfaces.',
    details: 'Machine learning only delivers value when deployed into dependable systems. During the Karunya Innovation and Design Studio internship on Cross-View Localization (24KIDS422), high-dimensional embeddings were paired with sub-50ms FAISS indexing, Grad-CAM interpretability, and robust Python microservices.',
    focusKeywords: ['FAISS Vector Retrieval', 'Grad-CAM', 'Streamlit', 'Flask Backends', 'KIDS Internship']
  },
  {
    id: 'fullstack-web',
    stepNumber: 'PHASE 06',
    title: 'Web Engineering & Creative Tech',
    badge: 'Interactive Fronts',
    icon: <Globe className="text-[#C6CBD5]" size={20} />,
    summary: 'Crafting responsive user experiences, modular frontend systems, and model dashboards.',
    details: 'Software engineering requires a bridge between high-powered backends and intuitive human interfaces. Modern React, TypeScript, and responsive frontend architectures bring complex data models and machine learning pipelines to life with clean interactive controls and dashboards.',
    focusKeywords: ['React', 'TypeScript', 'Responsive Architecture', 'REST APIs', 'Model Dashboards']
  },
  {
    id: 'industry-leadership',
    stepNumber: 'PHASE 07',
    title: 'Internships, Leadership & Beyond',
    badge: '2023 – 2027',
    icon: <GraduationCap className="text-[#FF3548]" size={20} />,
    summary: 'Serving as AI/ML Department Event Coordinator while pursuing continuous technical growth.',
    details: 'Technical skill flourishes in collaborative environments. As Event Coordinator for the Matrix Association (AI & ML Department, 2025–2026), Boya coordinates hackathons and workshops. Departmental leadership, competitive hackathons, and cohort acceptance into McKinsey Forward continue to broaden his engineering horizon.',
    focusKeywords: ['Matrix Association Coordinator', 'McKinsey Forward', 'G-K Hacks', 'KIDS Studio']
  }
];

export const OriginSection: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('foundations');
  const activeChapter = CHAPTERS.find(c => c.id === selectedChapterId) || CHAPTERS[0];

  const handleSelectChapter = (id: string) => {
    soundManager.playClick();
    setSelectedChapterId(id);
  };

  return (
    <section id="origin" className="relative py-28 bg-[#0D1018] border-t border-[#272D3A]/60 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#E32636]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#75E5ED]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3">
            <Compass size={13} />
            <span>BIOGRAPHY &amp; TRAJECTORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            THE <span className="text-[#FF3548]">ORIGIN</span>
          </h2>

          <p className="text-base sm:text-lg text-[#C6CBD5] italic mb-4 font-light">
            &ldquo;Every builder has a beginning. This is mine.&rdquo;
          </p>

          <p className="text-sm text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            Boya Saikiran is a Computer Science and Engineering undergraduate student specializing in 
            <span className="text-white font-medium"> Artificial Intelligence and Machine Learning </span> 
            at <span className="text-[#75E5ED] font-medium">Karunya Institute of Technology and Sciences</span> (Batch 2023–2027). 
            Here is the grounded progression of his engineering foundation.
          </p>
        </div>

        {/* Interactive Story Progression Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Chapter Navigation List */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-3 px-2 flex items-center justify-between">
              <span>Trajectory Stages</span>
              <span>7 Chapters</span>
            </div>

            <div className="space-y-2">
              {CHAPTERS.map((chapter) => {
                const isSelected = chapter.id === selectedChapterId;
                return (
                  <button
                    key={chapter.id}
                    onClick={() => handleSelectChapter(chapter.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#121621] border-[#E32636] shadow-[0_0_20px_rgba(227,38,54,0.2)]'
                        : 'bg-[#07080C]/60 border-[#272D3A]/60 hover:bg-[#121621]/60 hover:border-[#8D94A3]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-lg border transition-colors ${
                        isSelected 
                          ? 'bg-[#E32636]/10 border-[#E32636]/40' 
                          : 'bg-[#121621] border-[#272D3A] group-hover:border-[#8D94A3]/40'
                      }`}>
                        {chapter.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#FF3548] tracking-widest">{chapter.stepNumber}</span>
                          <span className="text-[10px] font-mono text-[#8D94A3]">• {chapter.badge}</span>
                        </div>
                        <h4 className={`text-sm font-semibold transition-colors ${
                          isSelected ? 'text-white' : 'text-[#C6CBD5] group-hover:text-white'
                        }`}>
                          {chapter.title}
                        </h4>
                      </div>
                    </div>

                    <ChevronRight 
                      size={16} 
                      className={`transition-all ${
                        isSelected ? 'text-[#FF3548] translate-x-1' : 'text-[#272D3A] group-hover:text-[#8D94A3]'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Layered Narrative Card Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#121621] border border-[#272D3A] rounded-2xl p-6 sm:p-8 relative shadow-2xl"
              >
                {/* Accent Top Strip */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#FF3548] to-transparent" />

                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#07080C] border border-[#272D3A] text-xs font-mono text-[#FF3548]">
                    <span>{activeChapter.stepNumber}</span>
                    <span className="text-[#272D3A]">|</span>
                    <span className="text-[#C6CBD5]">{activeChapter.badge}</span>
                  </div>

                  <div className="text-xs font-mono text-[#8D94A3] flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#75E5ED]" />
                    <span>Verified Journey</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {activeChapter.title}
                </h3>

                <p className="text-base text-[#75E5ED] font-mono leading-relaxed mb-6 bg-[#07080C]/40 p-4 rounded-xl border border-[#272D3A]/40">
                  {activeChapter.summary}
                </p>

                <p className="text-sm sm:text-base text-[#C6CBD5] leading-relaxed mb-8">
                  {activeChapter.details}
                </p>

                {/* Focus Keywords */}
                <div>
                  <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-3">
                    Core Technical Pillars
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeChapter.focusKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[#07080C] border border-[#272D3A] text-xs font-mono text-[#F5F6F8] hover:border-[#FF3548]/40 transition-colors"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Academic Institution Credential Footer */}
                <div className="mt-8 pt-6 border-t border-[#272D3A]/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8D94A3]">
                  <span>Karunya Institute of Technology and Sciences</span>
                  <span className="text-[#C6CBD5]">Expected Graduation: 2027</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
