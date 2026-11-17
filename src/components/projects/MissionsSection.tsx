import React, { useState } from 'react';
import { Compass, Beaker } from 'lucide-react';
import { PROJECTS, ADDITIONAL_PROJECTS } from '../../data/projects';
import type { Project } from '../../types';
import { MissionCard } from './MissionCard';
import { MissionDetailModal } from './MissionDetailModal';
import { soundManager } from '../../audio/soundEffects';

export const MissionsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filterOptions = [
    { label: 'All Missions (10)', value: 'ALL' },
    { label: 'Computer Vision', value: 'Computer Vision' },
    { label: 'AI / Machine Learning', value: 'AI / Machine Learning' },
    { label: 'System & Security', value: 'System & Security' },
    { label: 'Academic & Hackathon', value: 'Academic / Hackathon' },
  ];

  const filteredMissions = selectedFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <section id="missions" className="relative py-28 bg-[#0D1018] border-t border-[#272D3A]/60 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E32636]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#75E5ED]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3">
            <Compass size={13} />
            <span>OPERATIONAL PROJECT ARCHIVES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            THE <span className="text-[#FF3548]">MISSIONS</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            Exploration archives spanning deep metric learning, multi-perspective campus localization, 
            generative AI detection, agricultural optimization, and in-browser computer vision synthesis.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((opt) => {
            const isActive = selectedFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFilter(opt.value);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all border ${
                  isActive
                    ? 'bg-[#E32636] border-[#FF3548] text-white shadow-[0_0_15px_rgba(227,38,54,0.3)]'
                    : 'bg-[#121621] border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#8D94A3]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredMissions.map((project) => (
            <MissionCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveProjectModal(p)}
            />
          ))}
        </div>

        {/* Additional Research & Experimental Prototypes Subsection */}
        <div className="mt-20 border-t border-[#272D3A] pt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#75E5ED] uppercase tracking-wider mb-1">
                <Beaker size={14} />
                <span>Exploratory Lab Work</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Additional Research &amp; Prototypes
              </h3>
            </div>
            <div className="text-xs font-mono text-[#8D94A3]">
              * Identified as academic, experimental, or exploratory initiatives
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADDITIONAL_PROJECTS.map((extra, idx) => (
              <div
                key={idx}
                className="bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3] rounded-xl p-5 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8D94A3] mb-2">
                    <span className="text-[#FF3548]">{extra.category}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#07080C] border border-[#272D3A]">
                      {extra.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {extra.title}
                  </h4>
                  <p className="text-xs text-[#8D94A3] leading-relaxed mb-4">
                    {extra.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#272D3A]/60 text-[11px] font-mono text-[#75E5ED]">
                  {extra.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Inspector for Active Mission */}
      <MissionDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
