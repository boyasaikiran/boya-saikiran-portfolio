import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, FastForward, Play, Pause, RotateCcw, Sparkles, Terminal } from 'lucide-react';
import { soundManager } from '../../audio/soundEffects';
import { speechService, type SpeechCaption } from '../../services/speechService';

interface CinematicIntroProps {
  onComplete: () => void;
}

const INTRO_SCRIPT = [
  "Hey! Wait a second!",
  "Welcome to The Web of Ideas!",
  "I'm Mini Sai, your little guide.",
  "And this world belongs to one curious developer — Boya Saikiran.",
  "He's an Artificial Intelligence and Machine Learning student who loves building intelligent systems, exploring computer vision, and turning crazy ideas into real projects.",
  "From AI experiments to computer vision missions, there's a lot waiting for you here.",
  "So, are you ready to explore his world?",
  "Hold tight... let's get connected!"
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [swungIn, setSwungIn] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [currentCaption, setCurrentCaption] = useState<SpeechCaption>({
    text: "Welcome to The Web of Ideas...",
    index: 0,
    total: INTRO_SCRIPT.length,
  });
  const [readyToEnter, setReadyToEnter] = useState(false);
  const [webShotToButton, setWebShotToButton] = useState(false);

  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const miniSaiRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setSwungIn(true);
      setHasLanded(true);
      setReadyToEnter(true);
    }
  }, []);

  // Scene 1: Arrival Web-Swing sequence
  useEffect(() => {
    const t1 = setTimeout(() => {
      setSwungIn(true);
      soundManager.playChime(440, 'triangle', 0.2);
    }, 400);

    const t2 = setTimeout(() => {
      setHasLanded(true);
      soundManager.playChime(220, 'sine', 0.3);
      setIsWaving(true);
    }, 1400);

    const t3 = setTimeout(() => {
      setIsWaving(false);
      startSpeechSequence();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      speechService.stop();
    };
  }, []);

  const startSpeechSequence = (unmuteFirst = false) => {
    if (unmuteFirst) {
      setIsAudioMuted(false);
      speechService.setMuted(false);
    }
    setSpeechActive(true);
    setIsPaused(false);

    speechService.speakScript(
      INTRO_SCRIPT,
      (caption) => {
        setCurrentCaption(caption);
        // Play subtle futuristic syllable hum
        soundManager.playChime(320 + caption.index * 25, 'sine', 0.05);
      },
      () => {
        // Speech concluded: Mini Sai prepares web shoot to Enter button
        setReadyToEnter(true);
        triggerWebShotToButton();
      }
    );
  };

  const triggerWebShotToButton = () => {
    setTimeout(() => {
      setWebShotToButton(true);
      soundManager.playClick();
      soundManager.playChime(880, 'sine', 0.4);
    }, 300);
  };

  const handleToggleSound = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    speechService.setMuted(nextMuted);
  };

  const handleTogglePause = () => {
    if (isPaused) {
      speechService.resume();
      setIsPaused(false);
    } else {
      speechService.pause();
      setIsPaused(true);
    }
  };

  const handleReplaySpeech = () => {
    soundManager.playClick();
    speechService.stop();
    setReadyToEnter(false);
    setWebShotToButton(false);
    startSpeechSequence();
  };

  const handleEnterWorld = () => {
    speechService.stop();
    soundManager.playClick();
    soundManager.playChime(660, 'sine', 0.4);
    onComplete();
  };

  const handleSkip = () => {
    speechService.stop();
    soundManager.playClick();
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#07080C] px-4 py-6 sm:py-10 overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      {/* Background Web Geometry & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-[#E32636]/10 blur-[180px]" />
        
        {/* Subtle SVG Spider-Web Overlay */}
        <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="150" fill="none" stroke="#FF3548" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="500" cy="500" r="280" fill="none" stroke="#FF3548" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="500" cy="500" r="420" fill="none" stroke="#FF3548" strokeWidth="1" strokeDasharray="8 12" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
            <line
              key={deg}
              x1="500"
              y1="500"
              x2={500 + 480 * Math.cos((deg * Math.PI) / 180)}
              y2={500 + 480 * Math.sin((deg * Math.PI) / 180)}
              stroke="#272D3A"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* Top Floating Controls Bar */}
      <div className="relative z-30 w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Audio Mute/Unmute */}
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#C6CBD5] bg-[#121621] border border-[#272D3A] hover:border-[#FF3548] transition-all"
            aria-label={isAudioMuted ? "Enable Voice Audio" : "Mute Voice Audio"}
          >
            {isAudioMuted ? <VolumeX size={14} className="text-[#8D94A3]" /> : <Volume2 size={14} className="text-[#FF3548] animate-pulse" />}
            <span>{isAudioMuted ? "Sound: Off" : "Voice: Live"}</span>
          </button>

          {/* Pause / Resume Speech */}
          {speechActive && (
            <button
              onClick={handleTogglePause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#C6CBD5] bg-[#121621] border border-[#272D3A] hover:border-[#75E5ED] transition-all"
            >
              {isPaused ? <Play size={12} className="text-[#75E5ED]" /> : <Pause size={12} />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>
          )}

          {/* Replay Speech */}
          <button
            onClick={handleReplaySpeech}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#8D94A3] hover:text-white bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3] transition-all"
          >
            <RotateCcw size={12} />
            <span>Replay</span>
          </button>
        </div>

        {/* Skip Intro */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#8D94A3] hover:text-[#F5F6F8] bg-[#121621] border border-[#272D3A] hover:border-[#FF3548] transition-all"
        >
          <span>Skip Intro</span>
          <FastForward size={13} />
        </button>
      </div>

      {/* Main Center Stage: Mini Sai Arrival & Web Swing */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center max-w-4xl w-full my-auto">
        
        {/* Animated Red Web Filament From Top (Scene 1) */}
        {!hasLanded && (
          <motion.div
            className="absolute top-0 w-[2px] bg-gradient-to-b from-[#FF3548] to-[#FFFFFF] shadow-[0_0_12px_#FF3548]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '45vh', opacity: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}

        {/* Mini Sai Hero Character with Web Swing Transition */}
        <motion.div
          ref={miniSaiRef}
          className="relative flex flex-col items-center select-none"
          initial={{ y: -400, rotate: -25, scale: 0.7, opacity: 0 }}
          animate={
            swungIn
              ? hasLanded
                ? { y: 0, rotate: 0, scale: 1, opacity: 1 }
                : { y: 80, rotate: 10, scale: 0.92, opacity: 1 }
              : { y: -400, rotate: -25, scale: 0.7, opacity: 0 }
          }
          transition={{
            type: "spring",
            damping: 14,
            stiffness: 90,
            mass: 1.1,
          }}
        >
          {/* Mini Sai Character Asset Container */}
          <div className="relative w-48 sm:w-56 h-auto">
            {/* Cyber Ledge Perch: positioned exactly where his hips sit (~59% from top) */}
            <div className="absolute top-[59%] left-1/2 -translate-x-1/2 w-56 sm:w-64 h-3.5 rounded-full bg-[#121621] border border-[#272D3A] shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center justify-center z-0">
              <span className="w-40 sm:w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FF3548] to-transparent shadow-[0_0_10px_#FF3548]" />
            </div>

            {/* Landing Impact Ring at seating level */}
            {hasLanded && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-[56%] left-1/2 -translate-x-1/2 w-48 h-8 rounded-full border border-[#FF3548] pointer-events-none z-0"
              />
            )}

            {/* Mini Sai Character Image (z-10 so his legs dangle naturally IN FRONT of the ledge) */}
            <img
              src="/mini-sai.png"
              alt="Mini Sai - 3D Cartoon Interactive Developer Mascot"
              className={`relative z-10 w-full h-auto object-contain filter drop-shadow-[0_10px_35px_rgba(255,53,72,0.35)] transition-transform duration-300 ${
                isWaving ? 'animate-bounce' : 'hover:scale-105'
              }`}
              draggable={false}
            />

            {/* Glowing Hand Energy Flare when Shooting Web */}
            {webShotToButton && (
              <div className="absolute top-[48%] right-[22%] w-5 h-5 rounded-full bg-[#FFFFFF] shadow-[0_0_20px_6px_#FF3548] animate-ping z-20" />
            )}
          </div>
        </motion.div>

        {/* Live Synchronized Speech Captions Card (Scene 3 & 4) */}
        <AnimatePresence mode="wait">
          {hasLanded && (
            <motion.div
              key={currentCaption.index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-6 max-w-xl mx-auto px-6 py-4 rounded-2xl bg-[#121621]/90 border border-[#272D3A] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-center relative"
            >
              {/* Speaker Indicator Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#07080C] border border-[#272D3A] text-[10px] font-mono text-[#FF3548] uppercase tracking-wider mb-2">
                <Terminal size={10} />
                <span>MINI SAI // GUIDE [{currentCaption.index + 1} / {currentCaption.total}]</span>
              </div>

              {/* Caption Text */}
              <p className="text-sm sm:text-base font-medium text-[#F5F6F8] leading-relaxed">
                &ldquo;{currentCaption.text}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls & Enter My World Call to Action (Scene 5) */}
      <div className="relative z-30 w-full max-w-md mx-auto flex flex-col items-center gap-3">
        {/* SVG Web Strand from Mini Sai to Enter Button */}
        {webShotToButton && (
          <svg className="absolute -top-16 inset-x-0 w-full h-20 pointer-events-none z-10" overflow="visible">
            <path
              d="M 220 0 Q 230 40 220 70"
              fill="none"
              stroke="#FF3548"
              strokeWidth="2.5"
              className="animate-pulse"
              filter="drop-shadow(0 0 6px #FF3548)"
            />
          </svg>
        )}

        <button
          ref={enterButtonRef}
          onClick={handleEnterWorld}
          className={`group relative flex items-center justify-center gap-3 w-full py-3.5 px-8 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(227,38,54,0.4)] ${
            readyToEnter
              ? 'bg-[#E32636] hover:bg-[#FF3548] text-white ring-2 ring-[#FF3548] ring-offset-2 ring-offset-[#07080C] scale-105'
              : 'bg-[#121621] hover:bg-[#E32636] text-[#C6CBD5] hover:text-white border border-[#272D3A] hover:border-[#FF3548]'
          }`}
        >
          <Sparkles size={16} className="text-[#75E5ED] group-hover:rotate-45 transition-transform" />
          <span className="font-bold">ENTER MY WORLD</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {isAudioMuted && (
          <button
            onClick={() => startSpeechSequence(true)}
            className="text-[11px] font-mono text-[#75E5ED] hover:underline"
          >
            🔊 Click to enable sound and hear Mini Sai speak
          </button>
        )}
      </div>
    </motion.div>
  );
};
