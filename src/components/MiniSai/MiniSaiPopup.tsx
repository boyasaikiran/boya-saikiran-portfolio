import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Compass, User, Mail, Sparkles, Terminal, MessageSquare, RotateCcw } from 'lucide-react';
import { useMiniSai } from '../../context/MiniSaiContext';
import { soundManager } from '../../audio/soundEffects';

export const MiniSaiPopup: React.FC = () => {
  const { isPopupOpen, closePopup, shootWebTo, openAssistant, startTour, triggerReplayIntro } = useMiniSai();
  const popupRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPopupOpen) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      window.addEventListener('keydown', handleKeyDown);
      firstButtonRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen, closePopup]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      // Delay slightly to avoid capturing the trigger click itself
      const timer = setTimeout(() => {
        window.addEventListener('click', handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isPopupOpen, closePopup]);

  const handleAction = (sectionId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const targetButton = e.currentTarget;
    closePopup();

    // Trigger web shot from Mini Sai directly towards the destination section
    const destinationEl = document.getElementById(sectionId);
    if (destinationEl) {
      // Aim web towards top center of destination section
      const rect = destinationEl.getBoundingClientRect();
      const targetPoint = {
        x: window.innerWidth / 2,
        y: Math.max(80, rect.top + 120),
      };
      shootWebTo(targetPoint, sectionId);
    } else {
      shootWebTo(targetButton, sectionId);
    }
  };

  return (
    <AnimatePresence>
      {isPopupOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Mini Sai Interactive Assistant"
        >
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-2xl bg-[#121621] border border-[#272D3A] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(227,38,54,0.2)] overflow-hidden"
          >
            {/* Top Red Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3548] to-transparent" />

            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                closePopup();
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#07080C] border border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#FF3548] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
              aria-label="Close Mini Sai message"
            >
              <X size={15} />
            </button>

            {/* Header with Mini Sai Avatar Badge */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#07080C] border border-[#272D3A] flex items-center justify-center overflow-hidden shadow-inner">
                <img
                  src="/mini-sai.png"
                  alt="Mini Sai Portrait"
                  className="w-10 h-10 object-contain drop-shadow"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#75E5ED] ring-2 ring-[#121621]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FF3548] uppercase tracking-wider">
                  <Terminal size={11} />
                  <span>Interactive Mascot</span>
                </div>
                <h3 className="text-base font-bold text-white font-mono tracking-wide">
                  HEY! I&apos;M MINI SAI.
                </h3>
              </div>
            </div>

            {/* Welcome Message */}
            <p className="text-xs sm:text-sm text-[#C6CBD5] leading-relaxed mb-6 font-sans">
              Welcome to Sai&apos;s world. Where would you like to explore?
            </p>

            {/* Interactive Destination Options */}
            <div className="space-y-2.5">
              <button
                ref={firstButtonRef}
                onClick={(e) => handleAction('missions', e)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#07080C] border border-[#272D3A] hover:border-[#FF3548] text-xs font-mono text-[#F5F6F8] hover:text-white transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#E32636]/15 text-[#FF3548] group-hover:bg-[#E32636] group-hover:text-white transition-colors">
                    <Compass size={14} />
                  </div>
                  <span className="font-semibold tracking-wider">EXPLORE MISSIONS</span>
                </div>
                <span className="text-[10px] text-[#75E5ED] font-mono group-hover:translate-x-0.5 transition-transform">
                  Shoot Web ↗
                </span>
              </button>

              <button
                onClick={(e) => handleAction('origin', e)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#07080C] border border-[#272D3A] hover:border-[#75E5ED] text-xs font-mono text-[#F5F6F8] hover:text-white transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#75E5ED]/15 text-[#75E5ED] group-hover:bg-[#75E5ED] group-hover:text-[#07080C] transition-colors">
                    <User size={14} />
                  </div>
                  <span className="font-semibold tracking-wider">MEET SAI</span>
                </div>
                <span className="text-[10px] text-[#75E5ED] font-mono group-hover:translate-x-0.5 transition-transform">
                  Shoot Web ↗
                </span>
              </button>

              <button
                onClick={(e) => handleAction('contact', e)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#07080C] border border-[#272D3A] hover:border-[#8D94A3] text-xs font-mono text-[#F5F6F8] hover:text-white transition-all group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#C6CBD5]/10 text-[#C6CBD5] group-hover:bg-white group-hover:text-[#07080C] transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="font-semibold tracking-wider">CONTACT ME</span>
                </div>
                <span className="text-[10px] text-[#75E5ED] font-mono group-hover:translate-x-0.5 transition-transform">
                  Shoot Web ↗
                </span>
              </button>
            </div>

            {/* Autonomous Capabilities Bar */}
            <div className="mt-4 pt-3 border-t border-[#272D3A] grid grid-cols-2 gap-2">
              <button
                onClick={() => openAssistant()}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#E32636]/10 border border-[#E32636]/30 hover:bg-[#E32636] text-[11px] font-mono text-[#FF3548] hover:text-white transition-colors"
              >
                <MessageSquare size={13} />
                <span>AI Chat Assistant</span>
              </button>

              <button
                onClick={() => startTour('overview')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#121621] border border-[#272D3A] hover:border-[#75E5ED] text-[11px] font-mono text-[#C6CBD5] hover:text-[#75E5ED] transition-colors"
              >
                <Compass size={13} />
                <span>Guided Tour</span>
              </button>
            </div>

            {/* Replay Cinematic Intro Option */}
            <div className="mt-2 text-center">
              <button
                onClick={() => {
                  closePopup();
                  triggerReplayIntro();
                }}
                className="inline-flex items-center gap-1 text-[10px] font-mono text-[#8D94A3] hover:text-white transition-colors"
              >
                <RotateCcw size={10} />
                <span>Replay Cinematic Intro</span>
              </button>
            </div>

            {/* Footer Telemetry note */}
            <div className="mt-3 pt-2 border-t border-[#272D3A]/60 flex items-center justify-between text-[10px] font-mono text-[#8D94A3]">
              <span className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#FF3548]" />
                <span>Tiny Developer Mascot</span>
              </span>
              <span>ESC TO CLOSE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
