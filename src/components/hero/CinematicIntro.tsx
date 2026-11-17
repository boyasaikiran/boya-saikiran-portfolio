import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, FastForward, Sparkles } from 'lucide-react';
import { soundManager } from '../../audio/soundEffects';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Fast track for reduced motion preferences
      setStage(4);
    }
  }, []);

  // Stage progression timer sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),   // Small red light emergence
      setTimeout(() => setStage(2), 1600),  // Geometric web structure awakens
      setTimeout(() => setStage(3), 2600),  // Atmospheric particles & title reveals
      setTimeout(() => setStage(4), 3600),  // Subtitle, roles & Enter button ready
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleToggleAudio = () => {
    const newMuted = soundManager.toggleMute();
    setIsAudioMuted(newMuted);
  };

  const handleEnterWorld = () => {
    soundManager.playClick();
    soundManager.playChime(660, 'sine', 0.4);
    onComplete();
  };

  const handleSkip = () => {
    soundManager.playClick();
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080C] overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.08,
        filter: 'blur(10px)',
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      {/* Top Floating Controls Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#C6CBD5] bg-[#121621]/80 border border-[#272D3A] hover:border-[#E32636] transition-all"
          aria-label={isAudioMuted ? "Enable ambient audio" : "Mute audio"}
        >
          {isAudioMuted ? <VolumeX size={14} className="text-[#8D94A3]" /> : <Volume2 size={14} className="text-[#FF3548] animate-pulse" />}
          <span>{isAudioMuted ? "Sound: Off" : "Ambient: Live"}</span>
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#8D94A3] hover:text-[#F5F6F8] bg-[#121621]/40 border border-[#272D3A]/60 hover:border-[#8D94A3] transition-all"
        >
          <span>Skip Intro</span>
          <FastForward size={13} />
        </button>
      </div>

      {/* Stage 1: The Emergent Red Spark Core */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            className="absolute pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="w-4 h-4 rounded-full bg-[#FF3548] shadow-[0_0_60px_20px_#E32636]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Geometric Web Structure SVG Canvas */}
      {stage >= 2 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.65, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="w-[850px] h-[850px] max-w-[90vw] max-h-[90vh]" viewBox="0 0 400 400" fill="none">
            {/* Concentric Polygonal Web Rings */}
            {[40, 75, 115, 155, 190].map((r, i) => (
              <polygon
                key={i}
                points={`
                  ${200 + r * Math.cos(0)},${200 + r * Math.sin(0)}
                  ${200 + r * Math.cos(Math.PI/4)},${200 + r * Math.sin(Math.PI/4)}
                  ${200 + r * Math.cos(Math.PI/2)},${200 + r * Math.sin(Math.PI/2)}
                  ${200 + r * Math.cos(3*Math.PI/4)},${200 + r * Math.sin(3*Math.PI/4)}
                  ${200 + r * Math.cos(Math.PI)},${200 + r * Math.sin(Math.PI)}
                  ${200 + r * Math.cos(5*Math.PI/4)},${200 + r * Math.sin(5*Math.PI/4)}
                  ${200 + r * Math.cos(3*Math.PI/2)},${200 + r * Math.sin(3*Math.PI/2)}
                  ${200 + r * Math.cos(7*Math.PI/4)},${200 + r * Math.sin(7*Math.PI/4)}
                `}
                stroke={i % 2 === 0 ? "#E32636" : "#272D3A"}
                strokeWidth={i === 0 ? "1.5" : "1"}
                strokeOpacity={i % 2 === 0 ? 0.45 : 0.3}
                strokeDasharray={i % 2 === 1 ? "4 4" : "none"}
              />
            ))}
            {/* Radial Web Rays */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
              const angle = (idx * Math.PI) / 4;
              return (
                <line
                  key={idx}
                  x1="200"
                  y1="200"
                  x2={200 + 195 * Math.cos(angle)}
                  y2={200 + 195 * Math.sin(angle)}
                  stroke="#FF3548"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
              );
            })}
          </svg>
        </motion.div>
      )}

      {/* Stage 3 & 4: Typography and Call to Action */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#E32636]/10 border border-[#E32636]/30 text-[#FF3548] text-xs font-mono tracking-widest uppercase"
          >
            <Sparkles size={12} />
            <span>Interactive Space Initialized</span>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xs md:text-sm font-mono tracking-[0.35em] text-[#8D94A3] uppercase mb-2">
              System Online
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-3">
              THE WEB OF <span className="text-[#FF3548]">IDEAS</span>
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FF3548] to-transparent mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider text-[#C6CBD5] mb-6">
              BOYA SAIKIRAN
            </h3>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono tracking-wider text-[#8D94A3] mb-8">
              <span className="text-[#C6CBD5]">AI / ML ENGINEER IN PROGRESS</span>
              <span className="text-[#E32636]">•</span>
              <span className="text-[#C6CBD5]">COMPUTER VISION ENTHUSIAST</span>
              <span className="text-[#E32636]">•</span>
              <span className="text-[#C6CBD5]">SOFTWARE DEVELOPER</span>
            </div>

            <p className="text-sm italic text-[#8D94A3] max-w-md mb-8">
              &ldquo;Every idea connects. Every connection builds something extraordinary.&rdquo;
            </p>

            <motion.button
              onClick={handleEnterWorld}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#E32636] hover:bg-[#FF3548] text-white font-medium text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_-5px_#E32636]"
              aria-label="Enter Boya Saikiran's World"
            >
              <span>ENTER MY WORLD</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              
              {/* Outer pulsing ring */}
              <span className="absolute -inset-1 rounded-full border border-[#FF3548] opacity-40 animate-ping pointer-events-none" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Bottom Coordinates & System Metadata */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-[#8D94A3]/60 z-20">
        <div>SYS: KITS // 2023-2027</div>
        <div className="hidden sm:block">STATUS: READY FOR CONNECTIONS</div>
        <div>LAT: 10.9352° N // 76.7441° E</div>
      </div>
    </motion.div>
  );
};
