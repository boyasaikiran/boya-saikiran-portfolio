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

  // Smooth, subtle spring physics for gentle 3D tilt (max ~6-7 degrees)
  const springConfig = { stiffness: 180, damping: 25 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Gentle 3D tilt tracking cursor
  useEffect(() => {
    if (isHovered) return;
    rotateX.set(-mousePos.y * 6);
    rotateY.set(mousePos.x * 6);
  }, [mousePos, isHovered, rotateX, rotateY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rotateX.set(-(y / (rect.height / 2)) * 7);
    rotateY.set((x / (rect.width / 2)) * 7);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(-mousePos.y * 5);
    rotateY.set(mousePos.x * 5);
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Tilt Container (NO black background disks or circular shapes) */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        className="relative cursor-pointer group flex items-center justify-center"
      >
        {/* Subtle, soft radial red glow behind the hexagon (NO solid circular background) */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-[#FF3047]/15 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        {/* Clean Hexagonal Portrait Frame
            Desktop: ~200px wide, ~180px height (within 195-205px target)
            Tablet: ~180px wide, ~162px height
            Mobile: ~155px wide, ~140px height
        */}
        <div className="relative w-[155px] h-[140px] sm:w-[180px] sm:h-[162px] md:w-[200px] md:h-[180px] p-[1.5px] transition-all duration-300">
          
          {/* Inner Clean Hexagonal Image Crop (Pure hexagon, no dark outer disks) */}
          <div
            className="relative w-full h-full overflow-hidden bg-[#08090D]"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          >
            {/* Original Photograph: crisp, centered facial details, zero distortion */}
            <img
              src="/images/profile.png"
              alt="Boya Saikiran Profile Portrait"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.0] group-hover:scale-103 transition-transform duration-500"
              style={{
                objectPosition: 'center 32%',
              }}
            />

            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF3047]/[0.08] via-transparent to-[#08090D]/40 pointer-events-none" />

            {/* Slow, elegant laser scanning beam */}
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3047] to-transparent shadow-[0_0_10px_#FF3047] pointer-events-none z-10"
              animate={{
                top: ['-5%', '105%'],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Thin, elegant SVG Hexagonal Neon Border (#FF3047) with subtle breathing animation */}
          <svg
            className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none z-20 overflow-visible"
            viewBox="0 0 100 100"
          >
            <defs>
              <filter id="hex-neon-glow-refined" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Breathing Outer Soft Neon Glow */}
            <polygon
              points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5"
              fill="none"
              stroke="#FF3047"
              strokeWidth="1.8"
              filter="url(#hex-neon-glow-refined)"
              className="opacity-75 group-hover:opacity-100 transition-opacity duration-300"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.55;0.9;0.55"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </polygon>

            {/* Thin, Precise Inner Neon Line */}
            <polygon
              points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5"
              fill="none"
              stroke="#FF3047"
              strokeWidth="1.1"
              strokeOpacity="0.9"
            />

            {/* Subtle Corner Nodes (6 vertices) */}
            <circle cx="50" cy="1" r="1.5" fill="#FFFFFF" />
            <circle cx="99" cy="25.5" r="1.5" fill="#FF3047" />
            <circle cx="99" cy="74.5" r="1.5" fill="#FF3047" />
            <circle cx="50" cy="99" r="1.5" fill="#FF3047" />
            <circle cx="1" cy="74.5" r="1.5" fill="#FF3047" />
            <circle cx="1" cy="25.5" r="1.5" fill="#FF3047" />
          </svg>
        </div>
      </motion.div>

      {/* Clean "IDENTITY VERIFIED" Pill Badge immediately below portrait */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#121621]/90 border border-[#FF3047]/40 text-[10px] font-mono tracking-widest text-[#FF3047] shadow-[0_0_12px_rgba(255,48,71,0.25)] uppercase mt-2.5 backdrop-blur-sm"
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
