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
  Layers
} from 'lucide-react';
import { SKILLS } from '../../data/skills';
import type { SkillCategory } from '../../types';
import { soundManager } from '../../audio/soundEffects';

const CATEGORIES: { label: string; value: SkillCategory | 'ALL'; icon: React.ReactNode }[] = [
  { label: 'All Technologies', value: 'ALL', icon: <Layers size={14} /> },
  { label: 'Computer Vision', value: 'COMPUTER VISION', icon: <Eye size={14} /> },
  { label: 'AI & Machine Learning', value: 'AI AND MACHINE LEARNING', icon: <Cpu size={14} /> },
  { label: 'Programming', value: 'PROGRAMMING', icon: <Terminal size={14} /> },
  { label: 'Web Development', value: 'WEB DEVELOPMENT', icon: <Globe size={14} /> },
  { label: 'Tools & Platforms', value: 'TOOLS AND PLATFORMS', icon: <Wrench size={14} /> },
];

export const ArsenalSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'ALL'>('ALL');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('swin-transformer');

  const filteredSkills = selectedCategory === 'ALL'
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedCategory);

  const activeSkill = SKILLS.find(s => s.id === selectedSkillId) || SKILLS[0];

  const handleSelectSkill = (id: string) => {
    soundManager.playClick();
    soundManager.playHover();
    setSelectedSkillId(id);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Hands-on Experience':
        return 'bg-[#E32636]/15 border-[#E32636]/40 text-[#FF3548]';
      case 'Used in Projects':
        return 'bg-[#75E5ED]/15 border-[#75E5ED]/40 text-[#75E5ED]';
      case 'Familiar':
      default:
        return 'bg-[#C6CBD5]/15 border-[#C6CBD5]/40 text-[#C6CBD5]';
    }
  };

  return (
    <section id="arsenal" className="relative py-28 bg-[#07080C] border-t border-[#272D3A]/60 overflow-hidden bg-web-lattice">
      
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#E32636]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#75E5ED]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3">
            <Cpu size={13} />
            <span>KNOWLEDGE GRAPH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            THE <span className="text-[#FF3548]">ARSENAL</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            An interconnected constellation of engineering skills, deep learning frameworks, and software tools. 
            Select any node to inspect relationship links, real project implementations, and architectural applications.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.value);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all border ${
                  isActive
                    ? 'bg-[#E32636] border-[#FF3548] text-white shadow-[0_0_15px_rgba(227,38,54,0.3)]'
                    : 'bg-[#121621] border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#8D94A3]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Constellation & Inspector Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main: Interactive Constellation Nodes Grid */}
          <div className="lg:col-span-7 bg-[#121621]/80 border border-[#272D3A] rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#272D3A]/60 pb-3">
              <span className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider flex items-center gap-2">
                <Share2 size={13} className="text-[#FF3548]" />
                <span>Interconnected Technology Nodes ({filteredSkills.length})</span>
              </span>
              <span className="text-[11px] font-mono text-[#75E5ED]">Click node to inspect</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredSkills.map((skill) => {
                const isSelected = skill.id === selectedSkillId;
                const isRelatedToActive = activeSkill.relatedSkillIds.includes(skill.id);

                return (
                  <button
                    key={skill.id}
                    onClick={() => handleSelectSkill(skill.id)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1A2030] border-[#FF3548] shadow-[0_0_15px_rgba(255,53,72,0.25)] ring-1 ring-[#FF3548]'
                        : isRelatedToActive
                        ? 'bg-[#121621] border-[#75E5ED]/50 hover:border-[#75E5ED]'
                        : 'bg-[#07080C]/80 border-[#272D3A] hover:bg-[#121621] hover:border-[#8D94A3]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <span className={`text-xs font-bold transition-colors ${
                        isSelected ? 'text-[#FF3548]' : isRelatedToActive ? 'text-[#75E5ED]' : 'text-white group-hover:text-[#FF3548]'
                      }`}>
                        {skill.name}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#FF3548] animate-ping" />
                      )}
                      {isRelatedToActive && !isSelected && (
                        <span className="text-[10px] font-mono text-[#75E5ED]">LINK</span>
                      )}
                    </div>

                    <div className="text-[10px] font-mono text-[#8D94A3] truncate">
                      {skill.category}
                    </div>

                    <div className="mt-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono border ${getLevelBadgeClass(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Constellation Legend */}
            <div className="mt-4 pt-3 border-t border-[#272D3A]/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8D94A3] gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF3548]" /> Active
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#75E5ED]" /> Related
                </span>
              </div>
              <div>Connection Matrix: Dynamic</div>
            </div>
          </div>

          {/* Right: Selected Node Detail & Graph Connections */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#121621] border border-[#272D3A] rounded-2xl p-6 sm:p-7 relative shadow-xl"
              >
                {/* Node Top Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="text-xs font-mono text-[#FF3548] tracking-widest uppercase">
                    NODE INSPECTOR // {activeSkill.category}
                  </div>
                  <span className={`px-2.5 py-1 rounded text-xs font-mono border ${getLevelBadgeClass(activeSkill.level)}`}>
                    {activeSkill.level}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {activeSkill.name}
                </h3>

                <p className="text-sm text-[#C6CBD5] leading-relaxed mb-6">
                  {activeSkill.description}
                </p>

                {/* Related Connected Skills */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Share2 size={12} className="text-[#75E5ED]" />
                    <span>Connected Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.relatedSkillIds.map((relId) => {
                      const relSkill = SKILLS.find(s => s.id === relId);
                      if (!relSkill) return null;
                      return (
                        <button
                          key={relId}
                          onClick={() => handleSelectSkill(relId)}
                          className="px-2.5 py-1 rounded-lg bg-[#07080C] hover:bg-[#1A2030] border border-[#272D3A] hover:border-[#75E5ED] text-xs font-mono text-[#75E5ED] transition-colors flex items-center gap-1"
                        >
                          <span>{relSkill.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Projects Where Technology Was Used */}
                <div>
                  <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#FF3548]" />
                    <span>Utilized In Project Missions</span>
                  </div>
                  <div className="space-y-2">
                    {activeSkill.projectsUsed.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-[#07080C]/70 border border-[#272D3A] text-xs font-mono text-[#F5F6F8] flex items-center justify-between"
                      >
                        <span>{proj}</span>
                        <a
                          href="#missions"
                          onClick={() => soundManager.playClick()}
                          className="text-[#8D94A3] hover:text-[#FF3548] transition-colors"
                          title="View Missions"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accuracy Note */}
                <div className="mt-6 pt-4 border-t border-[#272D3A]/60 text-[11px] font-mono text-[#8D94A3]">
                  * Categorized strictly by actual project usage and hands-on coursework; no arbitrary percentage ratings.
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
