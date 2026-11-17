import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  AlertCircle, 
  ArrowUpRight, 
  Cpu, 
  Database, 
  Layers, 
  Activity, 
  Compass
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import type { Project } from '../../types';
import { soundManager } from '../../audio/soundEffects';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { CropPredictorSimulator } from './CropPredictorSimulator';

interface MissionDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({ project, onClose }) => {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#07080C]/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#121621] border border-[#272D3A] rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-[#121621]/95 backdrop-blur-md border-b border-[#272D3A] p-5 sm:p-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#E32636]/15 border border-[#E32636]/40 text-xs font-mono text-[#FF3548] font-bold tracking-widest">
                {project.missionNumber}
              </span>
              <span className="text-xs font-mono text-[#8D94A3] hidden sm:inline">
                // {project.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07080C] border border-[#272D3A] text-xs font-mono text-[#C6CBD5] hover:text-white hover:border-[#8D94A3] transition-colors"
                >
                  <GithubIcon size={13} />
                  <span>GitHub</span>
                  <ArrowUpRight size={11} />
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E32636]/10 border border-[#E32636]/40 text-xs font-mono text-[#FF3548] hover:bg-[#E32636] hover:text-white transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>Live Demo</span>
                </a>
              )}

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-2 rounded-lg bg-[#07080C] border border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#FF3548] transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-sm leading-relaxed">
            
            {/* Title & Overview Banner */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[#75E5ED] font-mono mb-4">
                {project.tagline}
              </p>
              <div className="p-4 rounded-xl bg-[#07080C]/80 border border-[#272D3A] text-xs sm:text-sm text-[#C6CBD5]">
                {project.overview}
              </div>
            </div>

            {/* Interactive Embedded Simulators */}
            {project.hasInteractiveSimulator === 'campus-locator' && (
              <ArchitectureDiagram />
            )}

            {project.hasInteractiveSimulator === 'crop-predictor' && (
              <CropPredictorSimulator />
            )}

            {/* 1. Problem Statement & 2. Objective */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#FF3548] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  <span>01. Problem Statement</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8D94A3]">
                  {project.problemStatement}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#75E5ED] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Compass size={14} />
                  <span>02. Objective</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8D94A3]">
                  {project.objective}
                </p>
              </div>
            </div>

            {/* 3. Dataset & Data Sources & 5. Technology Choices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#C6CBD5] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Database size={14} />
                  <span>03. Dataset &amp; Data Sources</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8D94A3]">
                  {project.datasetAndSources}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#C6CBD5] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu size={14} />
                  <span>05. Technology Choices</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8D94A3]">
                  {project.technologyChoices}
                </p>
              </div>
            </div>

            {/* 4. Architecture Specification */}
            <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
              <div className="text-xs font-mono text-[#FF3548] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers size={14} />
                <span>04. Architecture Specification</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C6CBD5] font-mono leading-relaxed">
                {project.architecture}
              </p>
            </div>

            {/* 6. Implementation Process */}
            <div>
              <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-3">
                06. Implementation Workflow
              </div>
              <div className="space-y-2">
                {project.implementationProcess.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#07080C]/80 border border-[#272D3A] flex items-start gap-3 text-xs font-mono text-[#F5F6F8]"
                  >
                    <span className="text-[#FF3548] font-bold">0{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Challenges & 8. Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#FF3548] uppercase tracking-wider mb-3">
                  07. Engineering Challenges
                </div>
                <ul className="space-y-2 text-xs text-[#8D94A3] list-disc list-inside">
                  {project.challenges.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#75E5ED] uppercase tracking-wider mb-3">
                  08. Implemented Solutions
                </div>
                <ul className="space-y-2 text-xs text-[#8D94A3] list-disc list-inside">
                  {project.solutions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 9. Evaluation Methodology & 10. Results */}
            <div className="p-6 rounded-xl bg-[#07080C] border border-[#E32636]/40 shadow-[0_0_20px_rgba(227,38,54,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono text-[#FF3548] uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={14} />
                  <span>09. Evaluation Methodology &amp; 10. Results</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121621] text-[#75E5ED] border border-[#272D3A]">
                  Verified Benchmarks
                </span>
              </div>

              <p className="text-xs text-[#8D94A3] mb-4">
                {project.evaluationMethodology}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {project.results.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#121621] border border-[#272D3A] text-center">
                    <div className="text-[10px] font-mono text-[#8D94A3] uppercase truncate mb-1">
                      {m.label}
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      {m.value}
                    </div>
                    {m.context && (
                      <div className="text-[9px] text-[#75E5ED] font-mono mt-0.5 truncate">
                        {m.context}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#C6CBD5] leading-relaxed mb-3">
                {project.results.reportedSummary}
              </p>

              {/* Crucial Verification Disclaimer */}
              <div className="p-3 rounded-lg bg-[#121621]/60 border border-[#272D3A] text-[11px] font-mono text-[#8D94A3] italic">
                {project.results.validationDisclaimer}
              </div>
            </div>

            {/* 11. Limitations & 12. Future Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-2">
                  11. Current Limitations
                </div>
                <ul className="space-y-1.5 text-xs text-[#8D94A3] list-disc list-inside">
                  {project.limitations.map((lim, i) => (
                    <li key={i}>{lim}</li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-[#07080C] border border-[#272D3A]">
                <div className="text-xs font-mono text-[#75E5ED] uppercase tracking-wider mb-2">
                  12. Future Improvements
                </div>
                <ul className="space-y-1.5 text-xs text-[#8D94A3] list-disc list-inside">
                  {project.futureImprovements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 13. Links & Repository Footer */}
            <div className="pt-4 border-t border-[#272D3A] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#8D94A3]">
                Mission File ID: {project.id} // Karunya Institute of Technology and Sciences
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#FF3548] transition-colors"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-[#75E5ED] hover:underline"
                  >
                    <ExternalLink size={14} />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
