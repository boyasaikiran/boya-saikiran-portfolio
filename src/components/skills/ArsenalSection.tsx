import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Terminal, 
  Eye, 
  Globe, 
  Wrench, 
  Share2, 
  Sparkles, 
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  Award,
  Compass
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { SKILLS } from '../../data/skills';
import { PROJECTS } from '../../data/projects';
import type { SkillCategory, SkillNode } from '../../types';
import { soundManager } from '../../audio/soundEffects';

interface CategoryFilter {
  label: string;
  value: SkillCategory | 'ALL';
  icon: React.ReactNode;
}

const CATEGORIES: CategoryFilter[] = [
  { label: 'All Technologies', value: 'ALL', icon: <Layers size={13} /> },
  { label: 'AI & Machine Learning', value: 'AI AND MACHINE LEARNING', icon: <Cpu size={13} /> },
  { label: 'Computer Vision', value: 'COMPUTER VISION', icon: <Eye size={13} /> },
  { label: 'Programming', value: 'PROGRAMMING', icon: <Terminal size={13} /> },
  { label: 'Web & Backend', value: 'WEB DEVELOPMENT', icon: <Globe size={13} /> },
  { label: 'Tools & Platforms', value: 'TOOLS AND PLATFORMS', icon: <Wrench size={13} /> },
];

// Helper to look up real project data (title, mission number, github repo)
const findProjectData = (projectName: string) => {
  const norm = projectName.toLowerCase();
  return PROJECTS.find(p => {
    const pTitle = p.title.toLowerCase();
    const pId = p.id.toLowerCase();
    return norm.includes(pId) || 
           pTitle.includes(norm) || 
           norm.includes(pTitle) ||
           (norm.includes('campus locator') && pId === 'campus-locator') ||
           (norm.includes('night vision') && pId === 'cctv-night-vision-colorizer') ||
           (norm.includes('ai vs human') && pId === 'ai-vs-human-classifier') ||
           (norm.includes('crop') && pId === 'crop-recommendation-system') ||
           (norm.includes('diabetes') && pId === 'diabetes-risk-prediction') ||
           (norm.includes('parking') && pId === 'automated-parking-management') ||
           (norm.includes('leaf vein') && pId === 'leaf-vein-classification') ||
           (norm.includes('giftgenie') && pId === 'gift-genie') ||
           (norm.includes('recover') && pId === 'recover-orchestrator') ||
           (norm.includes('opsguardian') && pId === 'ops-guardian') ||
           (norm.includes('otp') && pId === 'otp-verification-system') ||
           (norm.includes('timetable') && pId === 'smart-timetable-generator');
  }) || null;
};

export const ArsenalSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'ALL'>('ALL');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('swin-transformer');
  const [showAdditional, setShowAdditional] = useState<boolean>(false);

  // Filter skills by category
  const matchesCategory = (skill: SkillNode) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'AI AND MACHINE LEARNING') {
      return skill.category === 'AI AND MACHINE LEARNING' || skill.category === 'AI / DATA RETRIEVAL' || skill.category === 'DATA / SCIENTIFIC COMPUTING';
    }
    if (selectedCategory === 'TOOLS AND PLATFORMS') {
      return skill.category === 'TOOLS AND PLATFORMS' || skill.category === 'DEVOPS / MONITORING';
    }
    return skill.category === selectedCategory;
  };

  const coreSkills = SKILLS.filter(s => s.isCore && matchesCategory(s));
  const additionalSkills = SKILLS.filter(s => !s.isCore && matchesCategory(s));

  // Determine active skill
  const activeSkill = SKILLS.find(s => s.id === selectedSkillId) || SKILLS[0];

  const handleSelectSkill = (id: string) => {
    soundManager.playClick();
    soundManager.playHover();
    setSelectedSkillId(id);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Hands-on Experience':
        return 'bg-[#FF3548]/15 border-[#FF3548]/40 text-[#FF3548]';
      case 'Used in Projects':
        return 'bg-[#75E5ED]/15 border-[#75E5ED]/40 text-[#75E5ED]';
      case 'Familiar':
      default:
        return 'bg-[#C6CBD5]/15 border-[#272D3A] text-[#C6CBD5]';
    }
  };

  const renderSkillCard = (skill: SkillNode, isCoreBadge = false) => {
    const isSelected = skill.id === selectedSkillId;
    const isRelatedToActive = activeSkill.relatedSkillIds.includes(skill.id);

    return (
      <button
        key={skill.id}
        onClick={() => handleSelectSkill(skill.id)}
        className={`relative p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-200 group flex flex-col justify-between ${
          isSelected
            ? 'bg-[#1A2030] border-[#FF3548] shadow-[0_0_18px_rgba(255,48,71,0.35)] ring-1 ring-[#FF3548] z-10'
            : isRelatedToActive
            ? 'bg-[#121621] border-[#75E5ED]/60 shadow-[0_0_12px_rgba(117,229,237,0.2)] hover:border-[#75E5ED]'
            : 'bg-[#07080C]/85 border-[#272D3A]/70 hover:bg-[#121621] hover:border-[#8D94A3] opacity-80 hover:opacity-100'
        }`}
      >
        <div className="flex items-start justify-between gap-1.5 mb-2 w-full">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className={`text-xs font-semibold truncate transition-colors ${
              isSelected ? 'text-[#FF3548]' : isRelatedToActive ? 'text-[#75E5ED]' : 'text-white group-hover:text-[#FF3548]'
            }`}>
              {skill.name}
            </span>
          </div>

          {isSelected && (
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3548] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3548]" />
            </span>
          )}

          {isRelatedToActive && !isSelected && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#75E5ED] shadow-[0_0_6px_#75E5ED] flex-shrink-0 mt-0.5" title="Connected to active node" />
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <span className="text-[10px] font-mono text-[#8D94A3] truncate">
            {skill.category}
          </span>
          {isCoreBadge && (
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#FF3548]/10 text-[#FF3548] border border-[#FF3548]/25 flex-shrink-0">
              CORE
            </span>
          )}
        </div>
      </button>
    );
  };

  return (
    <section id="arsenal" className="relative py-24 sm:py-28 bg-[#07080C] border-t border-[#272D3A]/60 overflow-hidden bg-web-lattice">
      
      {/* Background Cyber Ambient Lighting */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-[#FF3548]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#75E5ED]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3 shadow-[0_0_12px_rgba(255,48,71,0.2)]">
            <Cpu size={13} />
            <span>KNOWLEDGE GRAPH // RECRUITER-FOCUSED</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            THE <span className="text-[#FF3548]">ARSENAL</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            Curated engineering competencies spanning Deep Learning, Computer Vision, Backend Architecture, and Distributed Data Systems. Select any node to inspect real project missions, repository source code, and interconnected graph links.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.value);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono tracking-wider transition-all border ${
                  isActive
                    ? 'bg-[#FF3548] border-[#FF3548] text-white shadow-[0_0_15px_rgba(255,48,71,0.35)]'
                    : 'bg-[#121621]/90 border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#8D94A3]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Constellation & Node Inspector Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Technology Nodes (Core Stack + Expandable Additional Technologies) */}
          <div className="lg:col-span-7 bg-[#121621]/80 border border-[#272D3A] rounded-2xl p-5 sm:p-6 relative backdrop-blur-sm shadow-xl">
            
            {/* Header / Dynamic Counter */}
            <div className="flex items-center justify-between mb-4 border-b border-[#272D3A]/60 pb-3">
              <span className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider flex items-center gap-2">
                <Share2 size={13} className="text-[#FF3548]" />
                <span>
                  {showAdditional ? 'All Technology Nodes' : 'Core Technology Stack'} ({showAdditional ? (coreSkills.length + additionalSkills.length) : coreSkills.length} of {SKILLS.length})
                </span>
              </span>
              <span className="text-[11px] font-mono text-[#75E5ED]">Click node to inspect</span>
            </div>

            {/* 1. Core Technology Stack (Primary initial view: ~20 technologies) */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#C6CBD5] mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3548]" />
                  <span>Core Production Technologies ({coreSkills.length})</span>
                </span>
                <span className="text-[10px] text-[#8D94A3]">Primary Focus</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {coreSkills.map(skill => renderSkillCard(skill, true))}
              </div>
            </div>

            {/* 2. Additional Technologies Collapsible Section (Preserves remaining 19 records) */}
            <div className="mt-5 pt-4 border-t border-[#272D3A]/60">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowAdditional(!showAdditional);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#07080C]/70 hover:bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3] text-xs font-mono text-[#C6CBD5] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Layers size={13} className="text-[#75E5ED] group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold text-white">Additional Technologies</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#121621] border border-[#272D3A] text-[#8D94A3]">
                    +{additionalSkills.length} nodes
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#8D94A3] group-hover:text-white">
                  <span className="text-[11px]">{showAdditional ? 'Hide' : 'Expand View'}</span>
                  {showAdditional ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {showAdditional && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3.5">
                      {additionalSkills.map(skill => renderSkillCard(skill, false))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Graph Legend */}
            <div className="mt-5 pt-3.5 border-t border-[#272D3A]/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8D94A3] gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF3548]" /> Selected Node
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#75E5ED]" /> Connected Skills
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8D94A3]/50" /> Other Nodes
                </span>
              </div>
              <div>Matrix: Interactive</div>
            </div>
          </div>

          {/* Right: Focused Node Inspector */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#121621] border border-[#272D3A] rounded-2xl p-6 sm:p-7 relative shadow-2xl backdrop-blur-md"
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="text-xs font-mono text-[#FF3548] tracking-widest uppercase flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>NODE INSPECTOR</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[11px] font-mono border ${getLevelBadgeClass(activeSkill.level)}`}>
                    {activeSkill.level}
                  </span>
                </div>

                {/* Technology Title & Category */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {activeSkill.name}
                    </h3>
                    {activeSkill.isCore && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FF3548]/15 text-[#FF3548] border border-[#FF3548]/30">
                        CORE STACK
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-[#8D94A3]">
                    CATEGORY: <span className="text-[#C6CBD5]">{activeSkill.category}</span>
                  </div>
                </div>

                <p className="text-sm text-[#C6CBD5] leading-relaxed mb-6 font-light">
                  {activeSkill.description}
                </p>

                {/* Connected Technologies */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Share2 size={12} className="text-[#75E5ED]" />
                    <span>Connected Technology Matrix ({activeSkill.relatedSkillIds.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.relatedSkillIds.map((relId) => {
                      const relSkill = SKILLS.find(s => s.id === relId);
                      if (!relSkill) return null;
                      return (
                        <button
                          key={relId}
                          onClick={() => handleSelectSkill(relId)}
                          className="px-2.5 py-1 rounded-lg bg-[#07080C] hover:bg-[#1A2030] border border-[#272D3A] hover:border-[#75E5ED] text-xs font-mono text-[#75E5ED] transition-colors flex items-center gap-1 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#75E5ED] group-hover:scale-125 transition-transform" />
                          <span>{relSkill.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actual Real Project Deployments */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Compass size={12} className="text-[#FF3548]" />
                    <span>Verified Project Deployments</span>
                  </div>
                  <div className="space-y-2">
                    {activeSkill.projectsUsed.map((projName, idx) => {
                      const projectData = findProjectData(projName);
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#07080C]/80 border border-[#272D3A] text-xs font-mono text-[#F5F6F8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#8D94A3]/50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {projectData && (
                              <span className="text-[10px] text-[#FF3548] font-bold bg-[#FF3548]/10 px-1.5 py-0.5 rounded border border-[#FF3548]/30">
                                {projectData.missionNumber}
                              </span>
                            )}
                            <span className="font-medium text-white">{projName}</span>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                            {projectData?.githubUrl && (
                              <a
                                href={projectData.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#121621] border border-[#272D3A] hover:border-[#75E5ED] text-[11px] text-[#75E5ED] hover:text-white transition-colors"
                                title="View GitHub Repository"
                              >
                                <GithubIcon size={11} />
                                <span>Code</span>
                                <ExternalLink size={9} />
                              </a>
                            )}
                            <a
                              href="#missions"
                              onClick={() => soundManager.playClick()}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#121621] border border-[#272D3A] hover:border-[#FF3548] text-[11px] text-[#8D94A3] hover:text-[#FF3548] transition-colors"
                              title="Jump to Mission Details"
                            >
                              <span>Mission</span>
                              <ExternalLink size={9} />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Special Certification Integration for Azure AI */}
                {activeSkill.id === 'azure-ai' && (
                  <div className="mb-4 p-3 rounded-xl bg-[#FF3548]/10 border border-[#FF3548]/30 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-white">
                      <Award size={14} className="text-[#FF3548]" />
                      <span>Earned Microsoft AI-900 Credential</span>
                    </div>
                    <a
                      href="#certifications"
                      onClick={() => soundManager.playClick()}
                      className="text-[11px] font-mono text-[#FF3548] hover:underline flex items-center gap-1"
                    >
                      <span>View Certifications</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                )}

                {/* Engineering Hygiene Note */}
                <div className="pt-4 border-t border-[#272D3A]/60 text-[11px] font-mono text-[#8D94A3]">
                  * Categorized strictly by actual production usage and real GitHub repositories; zero inflated ratings.
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
