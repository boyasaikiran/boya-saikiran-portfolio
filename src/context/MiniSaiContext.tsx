import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import type { MiniSaiState, WebTargetInfo, ChatMessage, MiniSaiContextType } from '../components/MiniSai/types';
import { soundManager } from '../audio/soundEffects';
import { speechService } from '../services/speechService';
import { queryPortfolioKnowledge } from '../services/portfolioKnowledge';
import { actionRegistry } from '../services/actionRegistry';
import { GUIDED_TOURS, type GuidedTour } from '../data/guidedTours';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'minisai',
    text: "Hey! I'm Mini Sai, Boya Saikiran's interactive portfolio guide! You can chat with me, ask questions about his AI/ML projects, or ask me to take you on a tour.",
    timestamp: Date.now(),
    followUps: ['Who is Boya Saikiran?', 'Show AI projects', 'Open official resume', 'Take me on a tour'],
  },
];

const MiniSaiContext = createContext<MiniSaiContextType | undefined>(undefined);

export const MiniSaiProvider: React.FC<{
  children: React.ReactNode;
  onReplayIntro?: () => void;
}> = ({ children, onReplayIntro }) => {
  const [state, setState] = useState<MiniSaiState>('IDLE');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [webTarget, setWebTarget] = useState<WebTargetInfo | null>(null);
  const [mascotPos, setMascotPos] = useState<{ x: number; y: number }>({ x: 180, y: 35 });

  // Voice & Assistant State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [isSpeechMuted, setIsSpeechMuted] = useState(false);
  const [currentCaption, setCurrentCaption] = useState<string | null>(null);

  // Guided Tour State
  const [activeTour, setActiveTour] = useState<GuidedTour | null>(null);
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState(0);

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

  const openAssistant = useCallback(() => {
    soundManager.playClick();
    setIsAssistantOpen(true);
    setIsPopupOpen(false);
    setState('ASSISTANT_OPEN');
  }, []);

  const closeAssistant = useCallback(() => {
    speechService.stop();
    setCurrentCaption(null);
    setIsAssistantOpen(false);
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

  // Conversational Assistant Messaging
  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    soundManager.playClick();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sender: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };

    setChatMessages(prev => [...prev, userMsg]);
    setState('THINKING');

    setTimeout(() => {
      const answer = queryPortfolioKnowledge(text);

      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-b`,
        sender: 'minisai',
        text: answer.displayText,
        timestamp: Date.now(),
        action: answer.action ? { type: answer.action.type, targetId: answer.action.targetId } : undefined,
        followUps: answer.followUps,
      };

      setChatMessages(prev => [...prev, botMsg]);
      setState('SPEAKING');

      // Speak response if not muted
      setCurrentCaption(answer.speechText);
      speechService.speak(
        answer.speechText,
        () => setState('SPEAKING'),
        () => {
          setState('ASSISTANT_OPEN');
          setCurrentCaption(null);
        }
      );

      // Execute associated action if any
      if (answer.action) {
        if (answer.action.type === 'NAVIGATE' && answer.action.targetId) {
          const el = document.getElementById(answer.action.targetId);
          if (el) shootWebTo(el, answer.action.targetId);
        } else if (answer.action.type === 'OPEN_RESUME') {
          actionRegistry.executeAction({ type: 'OPEN_RESUME' });
        } else if (answer.action.type === 'START_TOUR') {
          startTour(answer.action.tourId || 'projects');
        }
      }
    }, 450);
  }, [shootWebTo]);

  // Voice Recognition Controls
  const startVoiceInput = useCallback(() => {
    soundManager.playClick();
    setIsVoiceListening(true);
    speechService.startListening(
      (transcript) => {
        setIsVoiceListening(false);
        sendMessage(transcript);
      },
      (err) => {
        setIsVoiceListening(false);
        console.warn('Voice input error:', err);
      },
      () => {
        setIsVoiceListening(false);
      }
    );
  }, [sendMessage]);

  const stopVoiceInput = useCallback(() => {
    speechService.stopListening();
    setIsVoiceListening(false);
  }, []);

  const toggleSpeechMute = useCallback(() => {
    const nextMuted = !isSpeechMuted;
    setIsSpeechMuted(nextMuted);
    speechService.setMuted(nextMuted);
  }, [isSpeechMuted]);

  // Guided Tours Engine
  const startTour = useCallback((tourId = 'overview') => {
    const tour = GUIDED_TOURS[tourId] || GUIDED_TOURS.overview;
    setActiveTour(tour);
    setCurrentTourStepIndex(0);
    setState('GUIDED_TOUR_ACTIVE');
    setIsAssistantOpen(false);
    setIsPopupOpen(false);

    // Jump to first step
    const firstStep = tour.steps[0];
    if (firstStep) {
      const el = document.getElementById(firstStep.sectionId);
      if (el) shootWebTo(el, firstStep.sectionId);
    }
  }, [shootWebTo]);

  const nextTourStep = useCallback(() => {
    if (!activeTour) return;
    if (currentTourStepIndex < activeTour.steps.length - 1) {
      const nextIdx = currentTourStepIndex + 1;
      setCurrentTourStepIndex(nextIdx);
      const step = activeTour.steps[nextIdx];
      const el = document.getElementById(step.sectionId);
      if (el) shootWebTo(el, step.sectionId);
    } else {
      // Completed tour
      setActiveTour(null);
      setState('IDLE');
    }
  }, [activeTour, currentTourStepIndex, shootWebTo]);

  const prevTourStep = useCallback(() => {
    if (!activeTour) return;
    if (currentTourStepIndex > 0) {
      const prevIdx = currentTourStepIndex - 1;
      setCurrentTourStepIndex(prevIdx);
      const step = activeTour.steps[prevIdx];
      const el = document.getElementById(step.sectionId);
      if (el) shootWebTo(el, step.sectionId);
    }
  }, [activeTour, currentTourStepIndex, shootWebTo]);

  const stopTour = useCallback(() => {
    setActiveTour(null);
    setState('IDLE');
  }, []);

  const triggerReplayIntro = useCallback(() => {
    if (onReplayIntro) {
      onReplayIntro();
    }
  }, [onReplayIntro]);

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
        isAssistantOpen,
        openAssistant,
        closeAssistant,
        webTarget,
        mascotPos,
        setMascotPos,
        shootWebTo,
        chatMessages,
        sendMessage,
        isVoiceListening,
        startVoiceInput,
        stopVoiceInput,
        isSpeechMuted,
        toggleSpeechMute,
        currentCaption,
        activeTour,
        currentTourStepIndex,
        startTour,
        nextTourStep,
        prevTourStep,
        stopTour,
        triggerReplayIntro,
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
