import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import type { MiniSaiState, WebTargetInfo, MiniSaiContextType } from '../components/MiniSai/types';
import { soundManager } from '../audio/soundEffects';

const MiniSaiContext = createContext<MiniSaiContextType | undefined>(undefined);

export const MiniSaiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MiniSaiState>('IDLE');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [webTarget, setWebTarget] = useState<WebTargetInfo | null>(null);
  const [mascotPos, setMascotPos] = useState<{ x: number; y: number }>({ x: 180, y: 35 });

  const timeoutRefs = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(id => window.clearTimeout(id));
    timeoutRefs.current = [];
  }, []);

  const openPopup = useCallback(() => {
    soundManager.playClick();
    setIsPopupOpen(true);
    setState('POPUP_OPEN');
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setState('IDLE');
  }, []);

  const shootWebTo = useCallback((
    target: HTMLElement | { x: number; y: number },
    sectionId?: string,
    onComplete?: () => void
  ) => {
    clearAllTimeouts();

    let targetX = 0;
    let targetY = 0;

    if ('getBoundingClientRect' in target) {
      const rect = target.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    } else {
      targetX = target.x;
      targetY = target.y;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion fallback: perform navigation immediately
    if (prefersReducedMotion) {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'auto' });
      }
      if (onComplete) onComplete();
      setState('IDLE');
      setWebTarget(null);
      return;
    }

    // 1. Prepare shooting
    setState('PREPARING');
    soundManager.playHover();

    // 2. Launch web strand
    const t1 = window.setTimeout(() => {
      setWebTarget({ x: targetX, y: targetY, sectionId });
      setState('SHOOTING');
      soundManager.playClick();
    }, 80);
    timeoutRefs.current.push(t1);

    // 3. Web impact at target
    const t2 = window.setTimeout(() => {
      setState('WEB_IMPACT');
    }, 280);
    timeoutRefs.current.push(t2);

    // 4. Trigger navigation / scroll
    const t3 = window.setTimeout(() => {
      setState('NAVIGATING');
      if (sectionId) {
        const targetEl = document.getElementById(sectionId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (onComplete) {
        onComplete();
      }
    }, 420);
    timeoutRefs.current.push(t3);

    // 5. Clean up and return to idle
    const t4 = window.setTimeout(() => {
      setWebTarget(null);
      setState('IDLE');
    }, 750);
    timeoutRefs.current.push(t4);

  }, [clearAllTimeouts]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  return (
    <MiniSaiContext.Provider
      value={{
        state,
        setState,
        isPopupOpen,
        openPopup,
        closePopup,
        webTarget,
        mascotPos,
        setMascotPos,
        shootWebTo,
      }}
    >
      {children}
    </MiniSaiContext.Provider>
  );
};

export const useMiniSai = (): MiniSaiContextType => {
  const context = useContext(MiniSaiContext);
  if (!context) {
    throw new Error('useMiniSai must be used within a MiniSaiProvider');
  }
  return context;
};
