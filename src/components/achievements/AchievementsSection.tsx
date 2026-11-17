import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/certifications';
import { soundManager } from '../../audio/soundEffects';

export const AchievementsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { label: 'All Credentials (12)', value: 'ALL' },
    { label: 'AI & Deep Learning', value: 'AI & Deep Learning' },
    { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
    { label: 'Core Engineering', value: 'Core Engineering' },
    { label: 'Cybersecurity & Systems', value: 'Cybersecurity & Systems' },
  ];

  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    const matchesCat = selectedCategory === 'ALL' || cert.category === selectedCategory;
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skillsLearned.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="achievements" className="relative py-28 bg-[#0D1018] border-t border-[#272D3A]/60 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#E32636]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#75E5ED]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3">
            <Award size={13} />
            <span>ACCREDITED COMPETENCIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            CREDENTIALS &amp; <span className="text-[#FF3548]">ACHIEVEMENTS</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            Verified academic certifications, technical training bootcamps, and specialized industry credentials 
            spanning vision language models, deep learning, containerization, and cyber-physical systems.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((c) => {
              const isActive = selectedCategory === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(c.value);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all border ${
                    isActive
                      ? 'bg-[#E32636] border-[#FF3548] text-white shadow-[0_0_12px_rgba(227,38,54,0.3)]'
                      : 'bg-[#121621] border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#8D94A3]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D94A3]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search credentials or skills..."
              className="w-full bg-[#121621] border border-[#272D3A] focus:border-[#FF3548] rounded-full pl-9 pr-4 py-1.5 text-xs font-mono text-white placeholder-[#8D94A3] focus:outline-none transition-colors"
            />
          </div>

        </div>

        {/* Credentials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3] rounded-2xl p-6 flex flex-col justify-between group transition-colors shadow-lg"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-[#FF3548] uppercase tracking-wider">
                    {cert.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#75E5ED] text-[11px]">
                    <ShieldCheck size={12} />
                    <span>{cert.date}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#FF3548] transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div className="text-xs font-mono text-[#C6CBD5] mb-4">
                  Issuer: <span className="text-white font-medium">{cert.issuer}</span>
                </div>

                {/* Competencies Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skillsLearned.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#07080C] border border-[#272D3A] text-[10px] font-mono text-[#8D94A3]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Badge Footer */}
              <div className="pt-3 border-t border-[#272D3A]/60 flex items-center justify-between text-[11px] font-mono text-[#8D94A3]">
                <span className="flex items-center gap-1 text-[#C6CBD5]">
                  <CheckCircle2 size={12} className="text-[#FF3548]" />
                  <span>Verified Curriculum</span>
                </span>
                <span className="text-[#8D94A3]">ID: On File</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote on Credential Accuracy */}
        <div className="mt-10 p-4 rounded-xl bg-[#121621]/40 border border-[#272D3A]/40 text-center text-xs font-mono text-[#8D94A3] max-w-xl mx-auto">
          * Strictly presents verified coursework and completions without fabricated certificate links or synthetic IDs.
        </div>

      </div>
    </section>
  );
};
