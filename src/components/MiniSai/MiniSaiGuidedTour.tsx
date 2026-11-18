import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { useMiniSai } from '../../context/MiniSaiContext';

export const MiniSaiGuidedTour: React.FC = () => {
  const { activeTour, currentTourStepIndex, nextTourStep, prevTourStep, stopTour } = useMiniSai();

  if (!activeTour) return null;

  const currentStep = activeTour.steps[currentTourStepIndex];
  if (!currentStep) return null;

  const isLast = currentTourStepIndex === activeTour.steps.length - 1;
  const isFirst = currentTourStepIndex === 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92vw] max-w-xl rounded-2xl bg-[#0D1018]/95 border border-[#272D3A] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(227,38,54,0.3)] backdrop-blur-xl p-4 sm:p-5"
        role="region"
        aria-label="Guided Tour Navigator"
      >
        {/* Top Glowing Red Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3548] to-transparent" />

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-[#E32636]/15 text-[#FF3548]">
              <Compass size={14} />
            </div>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {activeTour.name} [{currentTourStepIndex + 1} / {activeTour.steps.length}]
            </span>
          </div>

          <button
            onClick={stopTour}
            className="p-1 rounded-md text-[#8D94A3] hover:text-white hover:bg-[#121621] transition-colors"
            aria-label="Exit Tour"
          >
            <X size={15} />
          </button>
        </div>

        <h4 className="text-sm font-bold text-[#FF3548] font-mono mb-1">
          {currentStep.title}
        </h4>

        <p className="text-xs text-[#C6CBD5] leading-relaxed mb-4">
          {currentStep.description}
        </p>

        {/* Tour Navigation Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-[#272D3A]/60">
          <button
            onClick={prevTourStep}
            disabled={isFirst}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#C6CBD5] hover:text-white disabled:opacity-40 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {activeTour.steps.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentTourStepIndex
                    ? 'w-5 bg-[#FF3548]'
                    : 'bg-[#272D3A]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTourStep}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E32636] hover:bg-[#FF3548] text-xs font-mono text-white transition-colors shadow-sm font-semibold"
          >
            <span>{isLast ? 'Complete Tour' : 'Next Stop'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
