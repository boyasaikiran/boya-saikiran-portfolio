import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Milestone, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Building2,
  Sparkles
} from 'lucide-react';
import { TIMELINE } from '../../data/timeline';
import type { TimelineCategory } from '../../types';
import { soundManager } from '../../audio/soundEffects';

export const JourneySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filterOptions = [
    { label: 'All Milestones (11)', value: 'ALL' },
    { label: 'Education & Training', value: 'EDUCATION' },
    { label: 'Internships & Research', value: 'INTERNSHIP' },
    { label: 'Leadership', value: 'LEADERSHIP' },
    { label: 'Hackathons', value: 'HACKATHON' },
    { label: 'Web Dev & Experience', value: 'WEB DEVELOPMENT' },
  ];

  const filteredItems = selectedFilter === 'ALL'
    ? TIMELINE
    : TIMELINE.filter(item => {
        if (selectedFilter === 'EDUCATION') return item.category === 'EDUCATION' || item.category === 'VOCATIONAL TRAINING';
        if (selectedFilter === 'INTERNSHIP') return item.category === 'INTERNSHIP' || item.category === 'RECOGNITION';
        return item.category === selectedFilter;
      });

  const getCategoryIcon = (cat: TimelineCategory) => {
    switch (cat) {
      case 'EDUCATION':
        return <GraduationCap size={16} className="text-[#75E5ED]" />;
      case 'INTERNSHIP':
        return <Briefcase size={16} className="text-[#FF3548]" />;
      case 'LEADERSHIP':
        return <Award size={16} className="text-[#FF3548]" />;
      case 'HACKATHON':
        return <Code size={16} className="text-[#75E5ED]" />;
      case 'VOCATIONAL TRAINING':
        return <Building2 size={16} className="text-[#C6CBD5]" />;
      case 'WEB DEVELOPMENT':
        return <Code size={16} className="text-[#C6CBD5]" />;
      case 'RECOGNITION':
      default:
        return <Sparkles size={16} className="text-[#FF3548]" />;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    if (status.includes('Completed') || status.includes('Certified')) {
      return 'bg-[#75E5ED]/10 text-[#75E5ED] border-[#75E5ED]/30';
    }
    if (status.includes('Leadership') || status.includes('In Progress')) {
      return 'bg-[#E32636]/10 text-[#FF3548] border-[#E32636]/30';
    }
    if (status.includes('Selected')) {
      return 'bg-[#C6CBD5]/10 text-[#F5F6F8] border-[#C6CBD5]/30';
    }
    return 'bg-[#121621] text-[#8D94A3] border-[#272D3A]';
  };

  return (
    <section id="journey" className="relative py-28 bg-[#07080C] border-t border-[#272D3A]/60 overflow-hidden bg-web-lattice">
      
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#E32636]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#75E5ED]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3">
            <Milestone size={13} />
            <span>CHRONOLOGICAL VERIFIED PATH</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            THE <span className="text-[#FF3548]">JOURNEY</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            A chronological timeline of academic achievements, research internships, departmental leadership, 
            hackathon sprints, and professional training milestones.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
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

        {/* Timeline Vertical Spine Container */}
        <div className="relative pl-6 sm:pl-10 space-y-10">
          
          {/* Central Vertical Glowing Line */}
          <div className="absolute left-[11px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#E32636] via-[#FF3548] to-[#75E5ED]/50" />

          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Spine Node Dot */}
              <div className="absolute -left-[23px] sm:-left-[31px] top-4 w-6 h-6 rounded-full bg-[#07080C] border-2 border-[#FF3548] flex items-center justify-center shadow-[0_0_12px_#FF3548] group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Milestone Card */}
              <div className="bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3] rounded-2xl p-6 transition-all duration-200 shadow-lg">
                
                {/* Card Top Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#07080C] border border-[#272D3A]">
                      {getCategoryIcon(item.category)}
                    </span>
                    <span className="text-xs font-mono text-[#FF3548] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${getStatusBadgeStyle(item.statusTag)}`}>
                      {item.statusTag}
                    </span>
                    <span className="text-xs font-mono text-[#8D94A3] flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Organization */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[#FF3548] transition-colors">
                  {item.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#75E5ED] mb-3">
                  <span className="flex items-center gap-1">
                    <Building2 size={13} />
                    <span>{item.organization}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#8D94A3]">
                    <MapPin size={13} />
                    <span>{item.location}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#C6CBD5] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Key Highlights */}
                {item.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-[#272D3A]/60">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-mono text-[#8D94A3]">
                        <CheckCircle2 size={13} className="text-[#FF3548] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
