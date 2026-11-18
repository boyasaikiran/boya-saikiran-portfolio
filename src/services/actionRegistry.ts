import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, RESUME_URL } from '../data/developerActivity';
import { soundManager } from '../audio/soundEffects';

export type PortfolioActionType =
  | 'NAVIGATE_TO_SECTION'
  | 'SCROLL_TO_ELEMENT'
  | 'OPEN_PROJECT'
  | 'OPEN_RESUME'
  | 'OPEN_LINKEDIN'
  | 'OPEN_GITHUB'
  | 'OPEN_CONTACT'
  | 'START_GUIDED_TOUR'
  | 'STOP_GUIDED_TOUR';

export interface ActionPayload {
  type: PortfolioActionType;
  sectionId?: string;
  projectId?: string;
  tourId?: string;
}

export class ActionRegistry {
  private static instance: ActionRegistry;

  public static getInstance(): ActionRegistry {
    if (!ActionRegistry.instance) {
      ActionRegistry.instance = new ActionRegistry();
    }
    return ActionRegistry.instance;
  }

  public executeAction(
    payload: ActionPayload,
    webShootFn?: (target: HTMLElement | { x: number; y: number }, sectionId?: string) => void
  ): boolean {
    soundManager.playClick();

    switch (payload.type) {
      case 'NAVIGATE_TO_SECTION': {
        const id = payload.sectionId || 'hero';
        const el = document.getElementById(id);
        if (el) {
          if (webShootFn) {
            webShootFn(el, id);
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          return true;
        }
        return false;
      }

      case 'OPEN_PROJECT': {
        const missionsEl = document.getElementById('missions');
        if (missionsEl) {
          if (webShootFn) {
            webShootFn(missionsEl, 'missions');
          } else {
            missionsEl.scrollIntoView({ behavior: 'smooth' });
          }
          return true;
        }
        return false;
      }

      case 'OPEN_RESUME': {
        window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
        return true;
      }

      case 'OPEN_LINKEDIN': {
        window.open(LINKEDIN_PROFILE_URL, '_blank', 'noopener,noreferrer');
        return true;
      }

      case 'OPEN_GITHUB': {
        window.open(GITHUB_PROFILE_URL, '_blank', 'noopener,noreferrer');
        return true;
      }

      case 'OPEN_CONTACT': {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          if (webShootFn) {
            webShootFn(contactEl, 'contact');
          } else {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          }
          return true;
        }
        return false;
      }

      default:
        return false;
    }
  }
}

export const actionRegistry = ActionRegistry.getInstance();
