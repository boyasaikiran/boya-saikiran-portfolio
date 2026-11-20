import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface FuturisticHexProfileProps {
  className?: string;
  mousePos?: { x: number; y: number };
}

export const FuturisticHexProfile: React.FC<FuturisticHexProfileProps> = ({ 
  className = '',
  mousePos = { x: 0, y: 0 }
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth spring physics for 3D holographic tilt
  const springConfig = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Subtle 3D tilt responding to mouse coordinates
  useEffect(() => {
    if (isHovered) return;
    rotateX.set(-mousePos.y * 10);
    rotateY.set(mousePos.x * 10);
  }, [mousePos, isHovered, rotateX, rotateY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotateX.set(-(y / (rect.height / 2)) * 14);
    rotateY.set((x / (rect.width / 2)) * 14);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(-mousePos.y * 8);
    rotateY.set(mousePos.x * 8);
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Holographic Tilt Card */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          perspective: 900,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.03 }}
        className="relative cursor-pointer group flex items-center justify-center"
      >
        {/* Layer 1: Strong but Soft Radial Red Glow Aura Behind Portrait */}
        <div className="absolute -inset-10 sm:-inset-16 rounded-full bg-gradient-to-r from-[#FF3047]/35 via-[#E32636]/45 to-[#FF3047]/35 blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 animate-pulse pointer-events-none" />
        
        {/* Layer 2: Holographic Optical Backing Ambient Disc */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-[#FF3047]/25 bg-[#07080C]/85 pointer-events-none shadow-[0_0_40px_rgba(255,48,71,0.25)]" />

        {/* Layer 3: Significantly Increased Hexagonal Portrait Dimensions
            Mobile: 175px wide (~160px tall) -> within 165-185px target
            Tablet: 200px wide (~185px tall) -> within 190-210px target
            Desktop: 232px wide (~214px tall) -> within 220-240px wide & 200-220px height target
        */}
        <div className="relative w-[175px] h-[160px] sm:w-[200px] sm:h-[185px] md:w-[230px] md:h-[212px] lg:w-[236px] lg:h-[218px] p-[2.5px] transition-all duration-300">
          
          {/* Inner Hexagonal Image Container */}
          <div
            className="relative w-full h-full overflow-hidden bg-[#07080C] shadow-[inset_0_0_25px_rgba(0,0,0,0.95)]"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          >
            {/* Pristine Original Photograph (1024x1024 source, perfectly centered on face) */}
            <img
              src="/images/profile.png"
              alt="Boya Saikiran Profile Portrait"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover filter contrast-[1.06] brightness-[1.0] group-hover:scale-105 transition-transform duration-700"
              style={{
                objectPosition: 'center 32%',
              }}
            />

            {/* Subtle Holographic Vignette & Cyberpunk Tint Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF3047]/10 via-transparent to-[#07080C]/50 pointer-events-none" />

            {/* Slow High-Intensity Laser Scanning Beam Animation (Requirement: slow scanning beam) */}
            <motion.div
              className="absolute inset-x-0 h-[3.5px] bg-gradient-to-r from-transparent via-[#FFFFFF] to-transparent shadow-[0_0_15px_#FF3047,0_0_30px_#FF3047] pointer-events-none z-10"
              animate={{
                top: ['-10%', '110%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Trailing Holographic Scan Wash */}
            <motion.div
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-[#FF3047]/15 to-transparent pointer-events-none z-10"
              animate={{
                top: ['-25%', '100%'],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Fine Cyber Scanline Grid Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF3047]/[0.025] to-transparent pointer-events-none animate-scanline" />
          </div>

          {/* SVG Hexagonal Animated Breathing Neon Border & Corner Vertex Indicators */}
          <svg
            className="absolute -inset-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] pointer-events-none z-20 overflow-visible"
            viewBox="0 0 100 100"
          >
            <defs>
              <filter id="hex-neon-glow-large" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer Breathing Crimson Glow Polygon */}
            <polygon
              points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5"
              fill="none"
              stroke="#FF3047"
              strokeWidth="2.5"
              filter="url(#hex-neon-glow-large)"
              className="opacity-85 group-hover:opacity-100 transition-opacity duration-300"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.65;1;0.65"
                dur="3s"
                repeatCount="indefinite"
              />
            </polygon>

            {/* Sharp Core Neon Border */}
            <polygon
              points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5"
              fill="none"
              stroke="#FF3047"
              strokeWidth="1.4"
              strokeOpacity="0.95"
            />

            {/* Glowing Corner Nodes & Vertex Markers */}
            <circle cx="50" cy="1" r="2.2" fill="#FFFFFF" />
            <circle cx="50" cy="1" r="4.5" fill="#FF3047" opacity="0.6">
              <animate attributeName="r" values="3;5.5;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
            </circle>

            <circle cx="99" cy="25.5" r="2.2" fill="#FF3047" />
            <circle cx="99" cy="74.5" r="2.2" fill="#FF3047" />
            <circle cx="50" cy="99" r="2.2" fill="#FF3047" />
            <circle cx="1" cy="74.5" r="2.2" fill="#FF3047" />
            <circle cx="1" cy="25.5" r="2.2" fill="#FF3047" />

            {/* Corner Sci-Fi Bracket Ticks */}
            <line x1="42" y1="1" x2="58" y2="1" stroke="#FF3047" strokeWidth="2" />
            <line x1="42" y1="99" x2="58" y2="99" stroke="#FF3047" strokeWidth="2" />
          </svg>
        </div>
      </motion.div>

      {/* Futuristic "IDENTITY VERIFIED" Status Badge (Immediately below portrait) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#121621]/95 border border-[#FF3047]/60 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FF3047] shadow-[0_0_16px_rgba(255,48,71,0.4)] uppercase mt-3 backdrop-blur-md hover:border-[#FF3047] transition-all"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3047] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3047]" />
        </span>
        <ShieldCheck size={12} className="text-[#FF3047]" />
        <span className="font-semibold">IDENTITY VERIFIED</span>
      </motion.div>
    </div>
  );
};
