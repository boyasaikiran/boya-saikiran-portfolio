export type MiniSaiState = 
  | 'IDLE' 
  | 'HOVER' 
  | 'PREPARING' 
  | 'SHOOTING' 
  | 'WEB_IMPACT' 
  | 'NAVIGATING' 
  | 'POPUP_OPEN';

export interface WebTargetInfo {
  x: number;
  y: number;
  sectionId?: string;
  label?: string;
}

export interface MiniSaiContextType {
  state: MiniSaiState;
  setState: (state: MiniSaiState) => void;
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  webTarget: WebTargetInfo | null;
  mascotPos: { x: number; y: number };
  setMascotPos: (pos: { x: number; y: number }) => void;
  shootWebTo: (
    target: HTMLElement | { x: number; y: number },
    sectionId?: string,
    onComplete?: () => void
  ) => void;
}
