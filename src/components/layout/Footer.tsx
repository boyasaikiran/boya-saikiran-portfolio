import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, OWNER_EMAIL } from '../../data/developerActivity';
import { soundManager } from '../../audio/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07080C] border-t border-[#272D3A] py-14 overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E32636]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Identity Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#121621] border border-[#272D3A] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF3548]" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="#FF3548" />
                  <polygon points="12,2 22,12 12,22 2,12" stroke="#FF3548" strokeWidth="1.5" strokeOpacity="0.7" />
                </svg>
              </div>
              <span className="text-base font-bold text-white font-mono tracking-wider">
                BOYA SAIKIRAN
              </span>
            </div>

            <p className="text-xs text-[#8D94A3] max-w-md leading-relaxed">
              &ldquo;Every idea connects. Every connection builds something extraordinary.&rdquo;
              <br />
              Computer Science and Engineering (AI &amp; ML) · Karunya Institute of Technology and Sciences.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-2.5 rounded-lg bg-[#121621] border border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#8D94A3] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={15} />
              </a>

              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-2.5 rounded-lg bg-[#121621] border border-[#272D3A] text-[#8D94A3] hover:text-[#75E5ED] hover:border-[#75E5ED] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={15} />
              </a>

              <a
                href={`mailto:${OWNER_EMAIL}`}
                onClick={() => soundManager.playClick()}
                className="p-2.5 rounded-lg bg-[#121621] border border-[#272D3A] text-[#8D94A3] hover:text-[#FF3548] hover:border-[#E32636] transition-colors"
                aria-label="Email Boya Saikiran"
              >
                <Terminal size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono">
            <div className="text-white font-bold uppercase tracking-wider mb-3">
              Universe Sectors
            </div>
            <div>
              <a href="#hero" className="text-[#8D94A3] hover:text-white transition-colors">01 // Home Space</a>
            </div>
            <div>
              <a href="#origin" className="text-[#8D94A3] hover:text-white transition-colors">02 // Origin Story</a>
            </div>
            <div>
              <a href="#arsenal" className="text-[#8D94A3] hover:text-white transition-colors">03 // Skill Arsenal</a>
            </div>
            <div>
              <a href="#missions" className="text-[#8D94A3] hover:text-white transition-colors">04 // Project Missions</a>
            </div>
            <div>
              <a href="#journey" className="text-[#8D94A3] hover:text-white transition-colors">05 // Journey Timeline</a>
            </div>
            <div>
              <a href="#achievements" className="text-[#8D94A3] hover:text-white transition-colors">06 // Credentials</a>
            </div>
          </div>

          {/* System Specs Column */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono text-[#8D94A3]">
            <div className="text-white font-bold uppercase tracking-wider mb-3">
              Engine Specifications
            </div>
            <div>STACK: React 19 + TypeScript</div>
            <div>3D CORE: Three.js + R3F</div>
            <div>MOTION: GSAP &amp; Framer Motion</div>
            <div>STYLES: Tailwind CSS Engine</div>
            <div>AUDIO: Web Audio API Procedural</div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121621] border border-[#272D3A] hover:border-[#FF3548] text-white transition-colors"
              >
                <ArrowUp size={13} className="text-[#FF3548]" />
                <span>Return to Summit</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-[#272D3A]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8D94A3]">
          <div>
            © {new Date().getFullYear()} Boya Saikiran. The Web of Ideas. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with focus for AI &amp; Computer Vision</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
