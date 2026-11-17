import React from 'react';
import { ExternalLink, GitBranch, Terminal } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { 
  GITHUB_PROFILE_URL, 
  LINKEDIN_PROFILE_URL, 
  CURATED_REPOSITORIES, 
  TECHNICAL_DOMAINS 
} from '../../data/developerActivity';
import { soundManager } from '../../audio/soundEffects';

export const DeveloperActivitySection: React.FC = () => {
  return (
    <section id="activity" className="relative py-28 bg-[#07080C] border-t border-[#272D3A]/60 overflow-hidden bg-web-lattice">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#E32636]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3">
            <Terminal size={13} />
            <span>OPEN SOURCE &amp; ENGINEERING REPOSITORIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            DEVELOPER <span className="text-[#FF3548]">ACTIVITY</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8D94A3] max-w-2xl mx-auto leading-relaxed">
            Curated repositories spanning deep learning implementations, multi-perspective computer vision, 
            algorithmic optimization, and security tooling published on GitHub.
          </p>
        </div>

        {/* GitHub Quick Connect Card */}
        <div className="bg-[#121621] border border-[#272D3A] rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-[#07080C] border border-[#272D3A] text-white">
              <GithubIcon size={32} className="text-[#FF3548]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#8D94A3] mb-1">
                <span>GITHUB PROFILE</span>
                <span className="text-[#75E5ED]">● PUBLIC COMMITS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                github.com/boyasaikiran
              </h3>
              <p className="text-xs text-[#8D94A3] mt-1 font-mono">
                Computer Science &amp; Engineering (AI &amp; ML) · Karunya Institute of Technology and Sciences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E32636] hover:bg-[#FF3548] text-white text-xs font-mono tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(227,38,54,0.3)]"
            >
              <GithubIcon size={14} />
              <span>Visit GitHub</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#07080C] hover:bg-[#1A2030] text-[#75E5ED] border border-[#272D3A] hover:border-[#75E5ED] text-xs font-mono tracking-wider uppercase transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Curated Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {CURATED_REPOSITORIES.map((repo, idx) => (
            <div
              key={idx}
              className="bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3] rounded-2xl p-6 flex flex-col justify-between group transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-2 text-xs font-mono text-[#75E5ED]">
                    <GitBranch size={13} />
                    <span>{repo.isOwnerRepo ? 'Owner Repository' : 'Research Studio Repo'}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07080C] text-[#C6CBD5] border border-[#272D3A]">
                    {repo.language}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF3548] transition-colors flex items-center justify-between">
                  <span>{repo.name}</span>
                </h4>

                <p className="text-xs text-[#8D94A3] leading-relaxed mb-4">
                  {repo.description}
                </p>

                {/* Topics / Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-[#07080C] border border-[#272D3A] text-[10px] font-mono text-[#8D94A3]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-[#272D3A]/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8D94A3]">MIT / Academic License</span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#FF3548] hover:underline"
                >
                  <span>Explore Code</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Domains Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECHNICAL_DOMAINS.map((domain, dIdx) => (
            <div
              key={dIdx}
              className="p-5 rounded-xl bg-[#121621]/60 border border-[#272D3A] text-left"
            >
              <div className="text-xs font-mono text-[#FF3548] uppercase tracking-wider mb-2">
                0{dIdx + 1}. DOMAIN FOCUS
              </div>
              <h5 className="text-base font-bold text-white mb-2">
                {domain.title}
              </h5>
              <p className="text-xs text-[#8D94A3] leading-relaxed">
                {domain.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
