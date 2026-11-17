import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Compass, Eye, Sprout, Lock } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import type { Project } from '../../types';
import { soundManager } from '../../audio/soundEffects';

interface MissionCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ project, onOpenDetails }) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Computer Vision':
        return <Eye size={14} className="text-[#FF3548]" />;
      case 'AI / Machine Learning':
        return <Sprout size={14} className="text-[#75E5ED]" />;
      case 'System & Security':
        return <Lock size={14} className="text-[#FF3548]" />;
      default:
        return <Compass size={14} className="text-[#8D94A3]" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Completed & Evaluated':
        return 'bg-[#E32636]/10 text-[#FF3548] border-[#E32636]/30';
      case 'In Production / Live':
        return 'bg-[#75E5ED]/10 text-[#75E5ED] border-[#75E5ED]/30';
      case 'Hackathon Finalist':
        return 'bg-[#C6CBD5]/10 text-[#F5F6F8] border-[#C6CBD5]/30';
      case 'Experimental Prototype':
      default:
        return 'bg-[#121621] text-[#8D94A3] border-[#272D3A]';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="cyber-card rounded-2xl overflow-hidden flex flex-col justify-between group h-full"
    >
      {/* Card Header & Cyber Visual Graphic */}
      <div>
        <div className="relative h-44 bg-[#07080C] border-b border-[#272D3A] p-5 flex flex-col justify-between overflow-hidden">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E32636_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Glowing Accents */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#E32636]/10 rounded-full blur-xl group-hover:bg-[#E32636]/25 transition-all" />

          {/* Top Mission Metadata */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded bg-[#121621]/90 border border-[#272D3A] text-xs font-mono text-[#FF3548] tracking-widest font-semibold">
              {project.missionNumber}
            </span>

            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono border ${getStatusBadgeClass(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Center Graphic & Mission Identity */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8D94A3] mb-1">
              {getCategoryIcon(project.category)}
              <span>{project.category}</span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#FF3548] transition-colors leading-snug">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <p className="text-xs sm:text-sm text-[#8D94A3] line-clamp-3 mb-5 leading-relaxed">
            {project.overview}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-[#07080C] border border-[#272D3A] text-[11px] font-mono text-[#C6CBD5]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0 border-t border-[#272D3A]/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
              }}
              className="p-2 rounded-lg bg-[#07080C] border border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#8D94A3] transition-colors"
              title="GitHub Repository"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <GithubIcon size={14} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
              }}
              className="p-2 rounded-lg bg-[#07080C] border border-[#272D3A] text-[#8D94A3] hover:text-[#75E5ED] hover:border-[#75E5ED] transition-colors"
              title="Live Demo"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenDetails(project);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#121621] hover:bg-[#E32636] border border-[#272D3A] hover:border-[#E32636] text-xs font-mono text-white tracking-wider uppercase transition-all duration-200 group-hover:border-[#FF3548]"
        >
          <span>MISSION BRIEF</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
};
