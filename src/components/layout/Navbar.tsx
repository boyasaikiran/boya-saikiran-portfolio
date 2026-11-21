import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Terminal, FileText, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { soundManager } from '../../audio/soundEffects';
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, RESUME_URL } from '../../data/developerActivity';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'origin', label: 'Origin' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'missions', label: 'Missions' },
  { id: 'journey', label: 'Journey' },
  { id: 'achievements', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Monitor scroll for styling and section spying
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionElements = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const newMuted = soundManager.toggleMute();
    setIsAudioMuted(newMuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07080C]/85 backdrop-blur-md border-b border-[#272D3A]/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Geometric Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548] rounded-md"
          aria-label="The Web of Ideas - Boya Saikiran Home"
        >
          {/* Animated SVG Geometric Web Node Icon */}
          <div className="relative w-8 h-8 rounded-lg bg-[#121621] border border-[#272D3A] flex items-center justify-center group-hover:border-[#E32636] transition-colors">
            <svg className="w-5 h-5 text-[#FF3548] group-hover:rotate-45 transition-transform duration-500" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="#FF3548" />
              <polygon points="12,2 22,12 12,22 2,12" stroke="#FF3548" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="#C6CBD5" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="#C6CBD5" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#75E5ED]" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-white font-mono flex items-center gap-1.5">
              <span>SAIKIRAN</span>
              <span className="text-[#FF3548] text-xs">●</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#8D94A3] uppercase">
              The Web of Ideas
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121621]/60 border border-[#272D3A]/60 px-3 py-1.5 rounded-full backdrop-blur-sm" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative px-3.5 py-1 text-xs font-mono tracking-wider transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548] ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-[#8D94A3] hover:text-[#F5F6F8]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-[#E32636]/20 border border-[#E32636]/60 shadow-[0_0_12px_rgba(227,38,54,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-[#121621] border border-[#272D3A] text-[#8D94A3] hover:text-[#F5F6F8] hover:border-[#E32636] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
            title={isAudioMuted ? "Enable Ambient Audio" : "Mute Audio"}
            aria-label={isAudioMuted ? "Enable Ambient Audio" : "Mute Audio"}
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#FF3548]" />}
          </button>

          {/* GitHub link */}
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#121621] border border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#8D94A3] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={15} />
          </a>

          {/* LinkedIn link */}
          <a
            href={LINKEDIN_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#121621] border border-[#272D3A] text-[#8D94A3] hover:text-[#75E5ED] hover:border-[#75E5ED] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={15} />
          </a>

          {/* Resume PDF quick link */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#121621] border border-[#272D3A] text-[#C6CBD5] hover:text-white hover:border-[#FF3548] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
            title="Open Resume PDF"
            aria-label="Open Resume PDF"
          >
            <FileText size={12} className="text-[#FF3548]" />
            <span>RESUME</span>
          </a>

          {/* Terminal / Contact quick trigger */}
          <button
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#E32636]/15 border border-[#E32636]/40 text-[#FF3548] hover:bg-[#E32636] hover:text-white transition-all shadow-[0_0_15px_rgba(227,38,54,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
          >
            <Terminal size={12} />
            <span>CONNECT</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-[#121621] border border-[#272D3A] text-[#8D94A3] hover:text-white"
            aria-label={isAudioMuted ? "Enable Audio" : "Mute Audio"}
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#FF3548]" />}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-[#121621] border border-[#272D3A] text-[#C6CBD5] hover:text-white hover:border-[#E32636] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#07080C]/95 backdrop-blur-xl border-b border-[#272D3A] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-mono tracking-wider flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-[#E32636]/15 text-[#FF3548] border border-[#E32636]/30 font-medium'
                      : 'text-[#8D94A3] hover:text-white hover:bg-[#121621]'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3548]" />}
                </button>
              ))}

              <div className="pt-4 border-t border-[#272D3A] flex items-center justify-around">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#C6CBD5] hover:text-[#FF3548]"
                >
                  <FileText size={14} className="text-[#FF3548]" />
                  <span>Resume PDF</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-[#8D94A3] hover:text-white"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-[#8D94A3] hover:text-[#75E5ED]"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
