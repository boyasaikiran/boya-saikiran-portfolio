import type { GuidedTour } from '../../data/guidedTours';

export type MiniSaiState = 
  | 'IDLE' 
  | 'GREETING'
  | 'HOVER' 
  | 'PREPARING'
  | 'THINKING'
  | 'SPEAKING'
  | 'SHOOTING' 
  | 'WEB_IMPACT' 
  | 'NAVIGATING' 
  | 'POPUP_OPEN'
  | 'ASSISTANT_OPEN'
  | 'GUIDED_TOUR_ACTIVE';

export interface WebTargetInfo {
  x: number;
  y: number;
  sectionId?: string;
  label?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'minisai';
  text: string;
  timestamp: number;
  action?: {
    type: string;
    targetId?: string;
  };
  followUps?: string[];
}

export interface MiniSaiContextType {
  state: MiniSaiState;
  setState: (state: MiniSaiState) => void;
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  isAssistantOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  webTarget: WebTargetInfo | null;
  mascotPos: { x: number; y: number };
  setMascotPos: (pos: { x: number; y: number }) => void;
  shootWebTo: (
    target: HTMLElement | { x: number; y: number },
    sectionId?: string,
    onComplete?: () => void
  ) => void;

  // Conversational Assistant
  chatMessages: ChatMessage[];
  sendMessage: (text: string) => void;
  isVoiceListening: boolean;
  startVoiceInput: () => void;
  stopVoiceInput: () => void;
  isSpeechMuted: boolean;
  toggleSpeechMute: () => void;
  currentCaption: string | null;

  // Guided Tours
  activeTour: GuidedTour | null;
  currentTourStepIndex: number;
  startTour: (tourId?: string) => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  stopTour: () => void;

  // Replay intro
  triggerReplayIntro: () => void;
}
