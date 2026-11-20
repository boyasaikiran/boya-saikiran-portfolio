import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface FuturisticHexProfileProps {
  className?: string;
}

export const FuturisticHexProfile: React.FC<FuturisticHexProfileProps> = ({ className = '' }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max 12deg subtle 3D tilt
    setTilt({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Tilt Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ perspective: 600, transformStyle: 'preserve-3d' }}
        className="relative cursor-pointer group"
      >
        {/* Outer Pulsing Radial Glow Backdrop */}
        <div className="absolute -inset-2 rounded-full bg-[#FF3047]/20 blur-xl opacity-75 group-hover:opacity-100 animate-pulse pointer-events-none transition-opacity duration-500" />

        {/* Outer Hexagonal Frame Wrapper */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 p-[2px]">
          
          {/* Inner Hexagonal Image Container */}
          <div
            className="relative w-full h-full overflow-hidden bg-[#07080C]"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          >
            {/* Base Profile Photograph */}
            <img
              src="/images/profile.png"
              alt="Boya Saikiran Profile Portrait"
              loading="eager"
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] group-hover:scale-105 transition-transform duration-500"
            />

            {/* Subtle Cyan-Red Cyberpunk Tint Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF3047]/10 via-transparent to-[#07080C]/40 pointer-events-none" />

            {/* Futuristic Vertical Scanning-Line Animation */}
            <motion.div
              className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#FF3047] to-transparent shadow-[0_0_12px_#FF3047] pointer-events-none z-10"
              animate={{
                top: ['-5%', '105%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Fine Cyber Scanlines Texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF3047]/[0.03] to-transparent pointer-events-none animate-scanline" />
          </div>

          {/* SVG Hexagonal Thin Red Neon Border & Corner Brackets */}
          <svg
            className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none z-20 overflow-visible"
            viewBox="0 0 100 100"
          >
            <defs>
              <filter id="hex-neon-glow" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Pulsing Outer Neon Glow Line */}
            <polygon
              points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5"
              fill="none"
              stroke="#FF3047"
              strokeWidth="1.8"
              filter="url(#hex-neon-glow)"
              className="animate-pulse opacity-90"
            />

            {/* Crisp Inner Neon Line */}
            <polygon
              points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5"
              fill="none"
              stroke="#FF3047"
              strokeWidth="1"
              strokeOpacity="0.9"
            />

            {/* Sci-Fi Corner Nodes & Vertex Markers */}
            <circle cx="50" cy="1" r="1.5" fill="#FF3047" className="animate-ping" />
            <circle cx="50" cy="1" r="1.8" fill="#FFFFFF" />
            <circle cx="99" cy="25.5" r="1.8" fill="#FF3047" />
            <circle cx="99" cy="74.5" r="1.8" fill="#FF3047" />
            <circle cx="50" cy="99" r="1.8" fill="#FF3047" />
            <circle cx="1" cy="74.5" r="1.8" fill="#FF3047" />
            <circle cx="1" cy="25.5" r="1.8" fill="#FF3047" />
          </svg>
        </div>
      </motion.div>

      {/* Futuristic "IDENTITY VERIFIED" Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#121621]/95 border border-[#FF3047]/60 text-[10px] font-mono tracking-widest text-[#FF3047] shadow-[0_0_14px_rgba(255,48,71,0.35)] uppercase mt-2.5 backdrop-blur-md group-hover:border-[#FF3047] transition-colors"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3047] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF3047]" />
        </span>
        <ShieldCheck size={11} className="text-[#FF3047]" />
        <span className="font-semibold">IDENTITY VERIFIED</span>
      </motion.div>
    </div>
  );
};
