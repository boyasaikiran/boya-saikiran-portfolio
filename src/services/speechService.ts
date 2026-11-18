/**
 * Mini Sai Speech & Voice Engine
 * Handles Text-to-Speech (TTS) via SpeechSynthesis and Speech-to-Text (STT) via SpeechRecognition.
 */

export interface SpeechCaption {
  text: string;
  index: number;
  total: number;
}

export type SpeechCallback = (caption: SpeechCaption) => void;

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isMuted: boolean = false;
  private isPaused: boolean = false;
  private isSpeaking: boolean = false;
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Prefer youthful / clear English voices
    const preferred = voices.find(
      v =>
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David') || v.name.includes('Alex')) &&
        v.lang.startsWith('en')
    );

    const fallbackEn = voices.find(v => v.lang.startsWith('en'));
    this.selectedVoice = preferred || fallbackEn || voices[0];
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (!this.synth || this.isMuted) {
      if (onStart) onStart();
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel(); // Cancel any lingering utterances

    const utterance = new SpeechSynthesisUtterance(text);
    if (!this.selectedVoice) this.initVoices();
    if (this.selectedVoice) utterance.voice = this.selectedVoice;

    // Slightly higher pitch & natural cadence for youthful mini character
    utterance.pitch = 1.15;
    utterance.rate = 1.02;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Mini Sai TTS speech error:', e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public speakScript(
    sentences: string[],
    onSentenceChange?: (caption: SpeechCaption) => void,
    onComplete?: () => void
  ): void {
    if (!this.synth || this.isMuted || sentences.length === 0) {
      // Simulate timed captions if audio is muted or unavailable
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < sentences.length) {
          if (onSentenceChange) {
            onSentenceChange({ text: sentences[idx], index: idx, total: sentences.length });
          }
          idx++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 3200);
      return;
    }

    this.synth.cancel();
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= sentences.length) {
        this.isSpeaking = false;
        if (onComplete) onComplete();
        return;
      }

      const text = sentences[currentIndex];
      if (onSentenceChange) {
        onSentenceChange({ text, index: currentIndex, total: sentences.length });
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (!this.selectedVoice) this.initVoices();
      if (this.selectedVoice) utterance.voice = this.selectedVoice;

      utterance.pitch = 1.18;
      utterance.rate = 1.04;

      utterance.onend = () => {
        currentIndex++;
        // Short natural breathing gap between sentences
        setTimeout(playNext, 180);
      };

      utterance.onerror = () => {
        currentIndex++;
        playNext();
      };

      this.isSpeaking = true;
      this.synth?.speak(utterance);
    };

    playNext();
  }

  public pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
    }
  }

  /**
   * Browser Speech-To-Text Recognition
   */
  public startListening(
    onResult: (transcript: string) => void,
    onError?: (err: string) => void,
    onEnd?: () => void
  ): boolean {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return false;
    }

    try {
      if (this.recognition) {
        this.recognition.abort();
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        if (onError) onError(event.error || 'Speech recognition error');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      this.isListening = false;
      if (onError) onError(e.message || 'Speech recognition failed');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
