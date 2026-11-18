import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Compass, Cpu, Layers, Sparkles, Terminal } from 'lucide-react';
import { soundManager } from '../../audio/soundEffects';

const ThreeWebScene = lazy(() =>
  import('./ThreeWebScene').then((module) => ({ default: module.ThreeWebScene }))
);

export const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#07080C] bg-web-lattice">
      
      {/* 1. Deep 3D Interactive Web Canvas Background (Placed behind portrait so zero lines cross face!) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 lg:opacity-50">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <div className="w-96 h-96 rounded-full border border-[#FF3548]/30 animate-pulse" />
          </div>
        }>
          <ThreeWebScene mousePos={mousePos} offset={[-0.9, 0, 0]} />
        </Suspense>
      </div>

      {/* 2. Cyber Ambient Lighting Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E32636]/10 rounded-full blur-[140px] pointer-events-none z-[1]" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#FF3548]/12 rounded-full blur-[130px] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E32636]/[0.015] to-transparent pointer-events-none animate-scanline z-[1]" />

      {/* 3. Real Developer Portrait: Boya Saikiran (In FRONT of 3D Web Canvas - crystal-clear face & suit!) */}
      <div className="absolute right-0 bottom-0 top-16 md:top-20 w-full sm:w-[520px] md:w-[640px] lg:w-[740px] xl:w-[860px] h-[calc(100%-4rem)] pointer-events-none z-[2] flex items-end justify-end overflow-hidden">
        <div className="relative w-full h-full flex items-end justify-end">
          <img
            src="/hero-portrait-clean.png"
            alt="Boya Saikiran - Cyber Developer Portrait"
            className="w-full h-full object-cover sm:object-contain object-bottom-right lg:scale-105 xl:scale-110 origin-bottom-right filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_10px_40px_rgba(255,53,72,0.2)] transition-transform duration-700"
          />
          {/* Subtle cyber red energetic aura around styled hair and shoulders */}
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#FF3548]/20 rounded-full blur-[90px] pointer-events-none mix-blend-screen" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center text-center lg:items-start lg:text-left my-auto w-full">
        
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121621]/90 border border-[#272D3A] text-xs font-mono text-[#C6CBD5] mb-6 shadow-[0_0_20px_rgba(0,0,0,0.4)] backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF3548] animate-pulse" />
          <span className="text-[#8D94A3]">KARUNYA CSE (AI &amp; ML)</span>
          <span className="text-[#272D3A]">|</span>
          <span className="text-[#75E5ED]">BATCH 2023–2027</span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl lg:max-w-3xl"
        >
          <div className="text-xs sm:text-sm font-mono tracking-[0.4em] text-[#8D94A3] uppercase mb-3 flex items-center justify-center lg:justify-start gap-3">
            <span className="w-8 h-[1px] bg-[#272D3A]" />
            <span>Interactive Developer Portfolio</span>
            <span className="w-8 h-[1px] bg-[#272D3A] lg:hidden" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-4">
            THE WEB OF <span className="text-[#FF3548] inline-block hover:scale-105 transition-transform duration-300">IDEAS</span>
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-[#C6CBD5] mb-6">
            BOYA SAIKIRAN
          </div>

          <p className="text-base sm:text-lg md:text-xl text-[#8D94A3] max-w-2xl mx-auto lg:mx-0 mb-8 font-light leading-relaxed">
            &ldquo;Every idea connects. Every connection builds something extraordinary.&rdquo;
          </p>
        </motion.div>

        {/* Triple Focus Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-10 text-xs font-mono"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#121621]/90 border border-[#272D3A] text-[#F5F6F8] backdrop-blur-sm">
            <Cpu size={14} className="text-[#FF3548]" />
            <span>AI / ML Engineer in Progress</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#121621]/90 border border-[#272D3A] text-[#F5F6F8] backdrop-blur-sm">
            <Layers size={14} className="text-[#75E5ED]" />
            <span>Computer Vision Enthusiast</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#121621]/90 border border-[#272D3A] text-[#F5F6F8] backdrop-blur-sm">
            <Terminal size={14} className="text-[#C6CBD5]" />
            <span>Software Developer</span>
          </div>
        </motion.div>

        {/* Primary Call to Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
        >
          <button
            onClick={() => scrollToSection('missions')}
            className="group relative flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#E32636] hover:bg-[#FF3548] text-white text-xs sm:text-sm font-mono tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(227,38,54,0.4)]"
          >
            <Compass size={15} className="group-hover:rotate-45 transition-transform" />
            <span>EXPLORE MISSIONS</span>
          </button>

          <button
            onClick={() => scrollToSection('arsenal')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#121621]/90 hover:bg-[#1A2030] text-[#C6CBD5] hover:text-white border border-[#272D3A] hover:border-[#8D94A3] text-xs sm:text-sm font-mono tracking-wider uppercase transition-all duration-300 backdrop-blur-sm"
          >
            <Sparkles size={15} className="text-[#75E5ED]" />
            <span>SKILL ARSENAL</span>
          </button>

          <button
            onClick={() => scrollToSection('origin')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-[#121621]/60 text-[#8D94A3] hover:text-[#F5F6F8] text-xs sm:text-sm font-mono tracking-wider uppercase transition-colors"
          >
            <span>ORIGIN STORY</span>
            <ArrowDown size={14} />
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry Ticker */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="border-t border-[#272D3A]/60 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8D94A3]">
          
          <div className="flex items-center gap-4">
            <span className="text-[#C6CBD5] font-semibold">CORE ARCHITECTURES:</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#121621] border border-[#272D3A] text-[#FF3548]">Swin-Tiny</span>
              <span className="px-2 py-0.5 rounded bg-[#121621] border border-[#272D3A] text-[#C6CBD5]">PyTorch</span>
              <span className="px-2 py-0.5 rounded bg-[#121621] border border-[#272D3A] text-[#75E5ED]">FAISS</span>
              <span className="px-2 py-0.5 rounded bg-[#121621] border border-[#272D3A] text-[#C6CBD5]">EfficientNet</span>
              <span className="px-2 py-0.5 rounded bg-[#121621] border border-[#272D3A] text-[#C6CBD5]">MediaPipe</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#75E5ED] animate-ping" />
            <span>LOCATION: TAMIL NADU, INDIA</span>
          </div>

        </div>
      </div>
    </section>
  );
};
