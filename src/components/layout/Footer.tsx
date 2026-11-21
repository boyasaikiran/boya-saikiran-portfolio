import React from 'react';
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, OWNER_EMAIL, RESUME_URL } from '../../data/developerActivity';
import { soundManager } from '../../audio/soundEffects';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#07080C] border-t border-[#272D3A] py-16 overflow-hidden">
      
      {/* Background Subtle Crimson Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#E32636]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 3-Column Clean Structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mb-12 items-start">
          
          {/* Column 1: Identity & Profiles */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wider font-mono">
              BOYA SAIKIRAN
            </h3>

            <div className="text-sm font-mono text-[#FF3548]">
              The Web of Ideas
            </div>

            <div className="text-xs sm:text-sm text-[#8D94A3] font-light">
              AI/ML Engineer &middot; Computer Vision
            </div>

            <div className="pt-2 text-xs font-mono text-[#8D94A3] flex flex-wrap items-center gap-2">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                GitHub
              </a>
              <span className="text-[#272D3A]">&middot;</span>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="hover:text-[#75E5ED] transition-colors underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-[#272D3A]">&middot;</span>
              <a
                href={`mailto:${OWNER_EMAIL}`}
                onClick={() => soundManager.playClick()}
                className="hover:text-[#FF3548] transition-colors underline-offset-4 hover:underline"
              >
                Email
              </a>
            </div>
          </div>

          {/* Column 2: EXPLORE Navigation */}
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <div className="text-white font-bold uppercase tracking-widest text-xs mb-3 text-[#C6CBD5]">
              EXPLORE
            </div>
            
            <ul className="space-y-2 text-[#8D94A3]">
              <li>
                <button
                  onClick={() => handleNavClick('hero')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('origin')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('arsenal')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('missions')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('journey')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('achievements')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Certifications
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: QUICK ACCESS */}
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <div className="text-white font-bold uppercase tracking-widest text-xs mb-3 text-[#C6CBD5]">
              QUICK ACCESS
            </div>

            <ul className="space-y-2 text-[#8D94A3]">
              <li>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="hover:text-[#FF3548] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Download Resume</span>
                  <span className="text-[10px] text-[#FF3548]">&darr;</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Me
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="hover:text-[#75E5ED] transition-colors cursor-pointer text-left inline-flex items-center gap-1 text-xs text-[#8D94A3]"
                >
                  <span>Back to Top &uarr;</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-[#272D3A]/60 text-center text-xs font-mono text-[#8D94A3]">
          <div>
            &copy; {CURRENT_YEAR} Boya Saikiran
          </div>
        </div>

      </div>
    </footer>
  );
};
