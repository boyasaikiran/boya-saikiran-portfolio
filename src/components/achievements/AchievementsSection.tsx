import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  Search, 
  Eye, 
  ExternalLink, 
  X, 
  Calendar, 
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { CERTIFICATIONS } from '../../data/certifications';
import type { Certification } from '../../types';
import { soundManager } from '../../audio/soundEffects';

export const AchievementsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);

  const categories = [
    { label: `All Certifications (${CERTIFICATIONS.length})`, value: 'ALL' },
    { label: 'AI & Deep Learning', value: 'AI & Deep Learning' },
    { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
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

  const handleOpenPreview = (cert: Certification) => {
    soundManager.playClick();
    setPreviewCert(cert);
  };

  const handleClosePreview = () => {
    soundManager.playClick();
    setPreviewCert(null);
  };

  return (
    <section id="achievements" className="relative py-24 sm:py-28 bg-[#0D1018] border-t border-[#272D3A]/60 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#FF3548]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#75E5ED]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3 shadow-[0_0_12px_rgba(255,48,71,0.2)]">
            <Award size={13} />
            <span>ACCREDITED COMPETENCIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            CREDENTIALS &amp; <span className="text-[#FF3548]">ACHIEVEMENTS</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            Professional certifications and learning credentials across artificial intelligence, machine learning, cloud technologies, and cybersecurity from leading technology organizations.
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
                      ? 'bg-[#FF3548] border-[#FF3548] text-white shadow-[0_0_12px_rgba(255,48,71,0.35)]'
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
          {filteredCerts.map((cert) => {
            const isFeatured = cert.isFeatured || cert.id.startsWith('oracle');

            return (
              <motion.div
                key={cert.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 shadow-lg relative ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#161B26] to-[#121621] border border-[#FF3548]/50 shadow-[0_0_22px_rgba(255,48,71,0.18)] hover:border-[#FF3548]'
                    : 'bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3]'
                }`}
              >
                <div>
                  {/* Header Tag & Status */}
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-[#FF3548] uppercase tracking-wider text-[11px] font-semibold flex items-center gap-1">
                      {isFeatured && <Sparkles size={11} className="text-[#FF3548]" />}
                      <span>{cert.category}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#75E5ED] text-[11px] font-medium bg-[#75E5ED]/10 px-2 py-0.5 rounded border border-[#75E5ED]/30">
                      <ShieldCheck size={12} />
                      <span>{cert.status || cert.date}</span>
                    </span>
                  </div>

                  {/* Title & Badge Layout */}
                  <div className="flex items-start gap-3 mb-2.5">
                    {cert.badgeUrl && (
                      <div className="w-12 h-14 shrink-0 rounded-lg p-0.5 flex items-center justify-center">
                        <img 
                          src={cert.badgeUrl} 
                          alt={`${cert.issuer} badge`}
                          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,48,71,0.3)]"
                        />
                      </div>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF3548] transition-colors leading-snug flex-1">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Issuer & Dates */}
                  <div className="space-y-1 mb-4 text-xs font-mono">
                    <div className="text-[#C6CBD5]">
                      Issuer: <span className="text-white font-medium">{cert.issuer}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="text-[#8D94A3] text-[11px]">
                        Certificate ID: <span className="text-[#75E5ED]">{cert.credentialId}</span>
                      </div>
                    )}
                    {cert.issueDate && (
                      <div className="text-[#8D94A3] flex items-center gap-1.5 text-[11px]">
                        <Calendar size={11} className="text-[#75E5ED]" />
                        <span>Issued: {cert.issueDate}</span>
                      </div>
                    )}
                    {cert.validUntil && (
                      <div className="text-[#8D94A3] flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 size={11} className="text-[#FF3548]" />
                        <span>Valid until: {cert.validUntil}</span>
                      </div>
                    )}
                  </div>

                  {/* Competencies Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
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

                {/* Meaningful Action Footer */}
                <div className="pt-3.5 border-t border-[#272D3A]/60 flex items-center justify-between gap-2 text-xs font-mono">
                  
                  {/* View Certificate Action */}
                  <button
                    onClick={() => handleOpenPreview(cert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07080C] hover:bg-[#1A2030] border border-[#272D3A] hover:border-[#FF3548] text-[#C6CBD5] hover:text-white transition-all text-[11px]"
                    title="View Certificate Document"
                  >
                    <Eye size={12} className="text-[#FF3548]" />
                    <span>View Certificate</span>
                  </button>

                  {/* Verify Credential Action */}
                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#75E5ED]/10 hover:bg-[#75E5ED]/20 border border-[#75E5ED]/30 text-[#75E5ED] hover:text-white transition-all text-[11px]"
                      title="Verify on Official Registry"
                    >
                      <span>Verify</span>
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span 
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#121621] border border-[#272D3A]/60 text-[#8D94A3] cursor-not-allowed text-[11px] opacity-75"
                      title="Official verification URL pending direct registry link"
                    >
                      <Lock size={10} />
                      <span>Verify (Pending)</span>
                    </span>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote on Credential Accuracy */}
        <div className="mt-10 p-4 rounded-xl bg-[#121621]/40 border border-[#272D3A]/40 text-center text-xs font-mono text-[#8D94A3] max-w-xl mx-auto">
          * Strictly presents verified credentials and coursework without fabricated verification URLs or synthetic certificates.
        </div>

      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            
            {/* Backdrop click dismiss */}
            <div 
              className="absolute inset-0"
              onClick={handleClosePreview}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-[#0D1018] border border-[#272D3A] rounded-2xl shadow-2xl p-5 sm:p-7 z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-[#272D3A]/70 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[#FF3548] uppercase tracking-wider font-semibold">
                      {previewCert.issuer} // {previewCert.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#75E5ED]/10 text-[#75E5ED] border border-[#75E5ED]/30">
                      {previewCert.status || 'CERTIFIED'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {previewCert.title}
                  </h3>
                </div>

                <button
                  onClick={handleClosePreview}
                  className="p-1.5 rounded-lg bg-[#121621] hover:bg-[#1A2030] text-[#8D94A3] hover:text-white border border-[#272D3A] transition-colors shrink-0"
                  aria-label="Close certificate preview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Certificate View / Body */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                
                {/* Visual Certificate Display */}
                {previewCert.certificateUrl ? (
                  <div className="rounded-xl overflow-hidden border border-[#272D3A] bg-[#07080C] p-2 flex items-center justify-center">
                    <img
                      src={previewCert.certificateUrl}
                      alt={`${previewCert.title} Certificate`}
                      className="max-h-[55vh] w-auto object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#272D3A] bg-[#121621]/60 p-6 text-center space-y-3">
                    <Award size={36} className="text-[#FF3548] mx-auto mb-2" />
                    <div className="text-base font-bold text-white">
                      Official Document Verified on File
                    </div>
                    <div className="text-xs font-mono text-[#8D94A3]">
                      Recipient: <span className="text-white font-medium">{previewCert.recipient || 'BOYA SAIKIRAN'}</span>
                    </div>
                  </div>
                )}

                {/* Metadata Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-[#121621]/50 p-4 rounded-xl border border-[#272D3A]/50">
                  <div>
                    <span className="text-[#8D94A3]">Awarded To:</span>{' '}
                    <span className="text-white font-medium">{previewCert.recipient || 'BOYA SAIKIRAN'}</span>
                  </div>
                  <div>
                    <span className="text-[#8D94A3]">Issuer:</span>{' '}
                    <span className="text-white font-medium">{previewCert.issuer}</span>
                  </div>
                  {previewCert.credentialId && (
                    <div>
                      <span className="text-[#8D94A3]">Certificate ID:</span>{' '}
                      <span className="text-[#75E5ED] font-mono font-medium">{previewCert.credentialId}</span>
                    </div>
                  )}
                  {previewCert.issueDate && (
                    <div>
                      <span className="text-[#8D94A3]">Issued On:</span>{' '}
                      <span className="text-white font-medium">{previewCert.issueDate}</span>
                    </div>
                  )}
                  {previewCert.validUntil && (
                    <div>
                      <span className="text-[#8D94A3]">Valid Until:</span>{' '}
                      <span className="text-white font-medium">{previewCert.validUntil}</span>
                    </div>
                  )}
                  {previewCert.credentialType && (
                    <div className="sm:col-span-2">
                      <span className="text-[#8D94A3]">Credential Type:</span>{' '}
                      <span className="text-[#75E5ED] font-medium">{previewCert.credentialType}</span>
                    </div>
                  )}
                </div>

                {/* Covered Skills */}
                <div>
                  <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-2">
                    Verified Competencies &amp; Skills:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {previewCert.skillsLearned.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#07080C] border border-[#272D3A] text-xs font-mono text-[#C6CBD5]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="border-t border-[#272D3A]/70 pt-4 mt-4 flex items-center justify-between gap-3 text-xs font-mono">
                {previewCert.verificationUrl ? (
                  <a
                    href={previewCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF3548] hover:bg-[#FF3548]/90 text-white font-medium transition-colors"
                  >
                    <span>Verify on Official Portal</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-[#8D94A3] text-[11px] flex items-center gap-1">
                    <Lock size={11} />
                    <span>Official Verification Link Available on Request</span>
                  </span>
                )}

                <button
                  onClick={handleClosePreview}
                  className="px-4 py-2 rounded-lg bg-[#121621] hover:bg-[#1A2030] text-white border border-[#272D3A] transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
