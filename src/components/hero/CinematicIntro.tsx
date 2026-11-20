import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, FastForward, Sparkles } from 'lucide-react';
import { soundManager } from '../../audio/soundEffects';
import { FuturisticHexProfile } from './FuturisticHexProfile';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle subtle mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setStage(5);
    }
  }, []);

  // Cinematic 4.5-second sequence progression
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),   // Stage 1: Emergent Crimson Core
      setTimeout(() => setStage(2), 1400),  // Stage 2: Geometric Web Network & Particles Awaken
      setTimeout(() => setStage(3), 2400),  // Stage 3: System Online & THE WEB OF IDEAS Title
      setTimeout(() => setStage(4), 3200),  // Stage 4: Prominent Hexagonal Portrait & Identity Verified
      setTimeout(() => setStage(5), 4100),  // Stage 5: Boya Saikiran, Roles & Enter Button Ready
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
      onMouseMove={handleMouseMove}
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
      <div className="absolute top-5 sm:top-6 left-5 sm:left-6 right-5 sm:right-6 flex items-center justify-between z-30">
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#C6CBD5] bg-[#121621]/80 border border-[#272D3A] hover:border-[#FF3047] transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm"
          aria-label={isAudioMuted ? "Enable ambient audio" : "Mute audio"}
        >
          {isAudioMuted ? <VolumeX size={14} className="text-[#8D94A3]" /> : <Volume2 size={14} className="text-[#FF3047] animate-pulse" />}
          <span>{isAudioMuted ? "Sound: Off" : "Ambient: Live"}</span>
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#8D94A3] hover:text-[#F5F6F8] bg-[#121621]/40 border border-[#272D3A]/60 hover:border-[#8D94A3] transition-all backdrop-blur-sm"
        >
          <span>Skip Intro</span>
          <FastForward size={13} />
        </button>
      </div>

      {/* Stage 1: The Emergent Red Spark Core */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            className="absolute pointer-events-none z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <div className="w-4 h-4 rounded-full bg-[#FF3047] shadow-[0_0_80px_25px_#FF3047]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Interactive Spider-Web Network with Parallax & Flowing Particles */}
      {stage >= 2 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <svg className="w-[900px] h-[900px] max-w-[95vw] max-h-[95vh]" viewBox="0 0 400 400" fill="none">
            {/* Concentric Polygonal Web Rings */}
            {[40, 75, 115, 155, 195].map((r, i) => (
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
                stroke={i % 2 === 0 ? "#FF3047" : "#272D3A"}
                strokeWidth={i === 0 ? "1.5" : "1"}
                strokeOpacity={i % 2 === 0 ? 0.45 : 0.3}
                strokeDasharray={i % 2 === 1 ? "4 4" : "none"}
              />
            ))}

            {/* Radial Web Rays with Defined Path IDs for Particle Flow */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
              const angle = (idx * Math.PI) / 4;
              const x2 = 200 + 195 * Math.cos(angle);
              const y2 = 200 + 195 * Math.sin(angle);
              return (
                <g key={idx}>
                  <line
                    x1="200"
                    y1="200"
                    x2={x2}
                    y2={y2}
                    stroke="#FF3047"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                  />
                  {/* Invisible guide path for particle animation */}
                  <path
                    id={`ray-${idx}`}
                    d={`M 200 200 L ${x2} ${y2}`}
                    fill="none"
                  />
                  {/* Small Glowing Energy Data Particles Travelling Outward */}
                  <circle r="1.8" fill="#FF3047">
                    <animateMotion
                      dur={`${2.2 + (idx % 3) * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${idx * 0.3}s`}
                    >
                      <mpath href={`#ray-${idx}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* Animated Connection Nodes on Middle Polygon Ring */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
              const angle = (idx * Math.PI) / 4;
              const r = 115;
              const cx = 200 + r * Math.cos(angle);
              const cy = 200 + r * Math.sin(angle);
              return (
                <g key={`node-${idx}`}>
                  <circle cx={cx} cy={cy} r="2.5" fill="#FF3047" opacity="0.8">
                    <animate attributeName="r" values="2;3.5;2" dur={`${2 + (idx % 2)}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + (idx % 2)}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={cx} cy={cy} r="1.2" fill="#FFFFFF" />
                </g>
              );
            })}
          </svg>
        </motion.div>
      )}

      {/* Reduced Background Opacity Layer Behind Important Content */}
      <div className="absolute inset-0 bg-radial-gradient from-[#07080C]/90 via-[#07080C]/65 to-transparent pointer-events-none z-10" />

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl my-auto">
        
        {/* Stage 2+: System Initialization Pill */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 mb-2 sm:mb-3 px-3.5 py-1 rounded-full bg-[#FF3047]/10 border border-[#FF3047]/30 text-[#FF3047] text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(255,48,71,0.2)]"
          >
            <Sparkles size={12} className="animate-spin-slow" />
            <span>Interactive Space Initialized</span>
          </motion.div>
        )}

        {/* Stage 3+: System Online & THE WEB OF IDEAS Headline */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[11px] sm:text-xs font-mono tracking-[0.35em] text-[#8D94A3] uppercase mb-1">
              System Online
            </h2>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 sm:mb-3 leading-tight">
              THE WEB OF <span className="text-[#FF3047] inline-block hover:scale-105 transition-transform duration-300">IDEAS</span>
            </h1>
          </motion.div>
        )}

        {/* Stage 4+: Prominent 20-25% Larger Hexagonal Profile Portrait & Identity Verified */}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="my-2 sm:my-3.5"
          >
            <FuturisticHexProfile mousePos={mousePos} />
          </motion.div>
        )}

        {/* Stage 5+: Name, Roles, Quote & Enter Button */}
        {stage >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#FF3047] to-transparent mx-auto mb-2.5" />
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider text-[#C6CBD5] mb-2 sm:mb-3">
              BOYA SAIKIRAN
            </h3>

            {/* Specialization Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-mono tracking-wider text-[#8D94A3] mb-4 sm:mb-6 max-w-xl">
              <span className="text-[#C6CBD5]">AI / ML ENGINEER IN PROGRESS</span>
              <span className="text-[#FF3047]">•</span>
              <span className="text-[#C6CBD5]">COMPUTER VISION ENTHUSIAST</span>
              <span className="text-[#FF3047]">•</span>
              <span className="text-[#C6CBD5]">SOFTWARE DEVELOPER</span>
            </div>

            <p className="text-xs sm:text-sm italic text-[#8D94A3] max-w-md mb-6 leading-relaxed hidden xs:block">
              &ldquo;Every idea connects. Every connection builds something extraordinary.&rdquo;
            </p>

            {/* Futuristic "ENTER MY WORLD" Call to Action Button */}
            <motion.button
              onClick={handleEnterWorld}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-3 px-8 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#E32636] hover:bg-[#FF3047] text-white font-medium text-xs sm:text-sm font-mono tracking-wider uppercase transition-all shadow-[0_0_35px_-5px_#FF3047] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3047]"
              aria-label="Enter Boya Saikiran's World"
            >
              <span>ENTER MY WORLD</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              
              {/* Outer Pulsing Glow Beacon */}
              <span className="absolute -inset-1 rounded-full border border-[#FF3047] opacity-40 animate-ping pointer-events-none" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Bottom Coordinates & System Telemetry Metadata */}
      <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8D94A3]/60 z-30">
        <div>SYS: KITS // 2023-2027</div>
        <div className="hidden sm:block">STATUS: READY FOR CONNECTIONS</div>
        <div>LAT: 10.9352° N // 76.7441° E</div>
      </div>
    </motion.div>
  );
};
