import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, VolumeX, X, Compass, Sparkles, Terminal, FileText } from 'lucide-react';
import { useMiniSai } from '../../context/MiniSaiContext';

export const MiniSaiAssistant: React.FC = () => {
  const {
    isAssistantOpen,
    closeAssistant,
    chatMessages,
    sendMessage,
    isVoiceListening,
    startVoiceInput,
    stopVoiceInput,
    isSpeechMuted,
    toggleSpeechMute,
    startTour,
    state,
  } = useMiniSai();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAssistantOpen]);

  // Focus input on open
  useEffect(() => {
    if (isAssistantOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isAssistantOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleChipClick = (chipText: string) => {
    sendMessage(chipText);
  };

  const handleToggleVoice = () => {
    if (isVoiceListening) {
      stopVoiceInput();
    } else {
      startVoiceInput();
    }
  };

  return (
    <AnimatePresence>
      {isAssistantOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl bg-[#0D1018]/95 border border-[#272D3A] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(227,38,54,0.2)] backdrop-blur-xl flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mini Sai Interactive Assistant"
        >
          {/* Top Neon Border Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#FF3548] via-[#75E5ED] to-[#E32636]" />

          {/* Header Bar */}
          <div className="px-4 py-3 bg-[#121621] border-b border-[#272D3A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-[#07080C] border border-[#272D3A] flex items-center justify-center overflow-hidden">
                <img src="/mini-sai.png" alt="Mini Sai" className="w-8 h-8 object-contain" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#75E5ED] ring-1 ring-[#121621]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF3548] uppercase tracking-wider">
                  <Terminal size={10} />
                  <span>Autonomous Guide</span>
                </div>
                <h4 className="text-xs font-bold text-white font-mono">
                  MINI SAI // ASSISTANT
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Tour trigger */}
              <button
                onClick={() => startTour('overview')}
                className="p-1.5 rounded-lg bg-[#07080C] border border-[#272D3A] text-[#C6CBD5] hover:text-[#75E5ED] hover:border-[#75E5ED] transition-colors"
                title="Start Guided Tour"
                aria-label="Start Guided Tour"
              >
                <Compass size={14} />
              </button>

              {/* Speech Mute Toggle */}
              <button
                onClick={toggleSpeechMute}
                className="p-1.5 rounded-lg bg-[#07080C] border border-[#272D3A] text-[#C6CBD5] hover:text-[#FF3548] hover:border-[#FF3548] transition-colors"
                title={isSpeechMuted ? "Unmute Voice" : "Mute Voice"}
                aria-label={isSpeechMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isSpeechMuted ? <VolumeX size={14} className="text-[#8D94A3]" /> : <Volume2 size={14} className="text-[#FF3548]" />}
              </button>

              {/* Close Button */}
              <button
                onClick={closeAssistant}
                className="p-1.5 rounded-lg bg-[#07080C] border border-[#272D3A] text-[#8D94A3] hover:text-white hover:border-[#FF3548] transition-colors"
                aria-label="Close Assistant"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-[#272D3A]">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs font-sans leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E32636] text-white rounded-br-none shadow-[0_4px_15px_rgba(227,38,54,0.3)]'
                      : 'bg-[#121621] text-[#F5F6F8] border border-[#272D3A] rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Follow-up suggestions */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pl-1">
                    {msg.followUps.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(chip)}
                        className="px-2.5 py-1 rounded-full bg-[#07080C] border border-[#272D3A] hover:border-[#FF3548] text-[10px] font-mono text-[#C6CBD5] hover:text-white transition-colors"
                      >
                        {chip} ↗
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Speaking / Thinking Indicator */}
            {state === 'THINKING' && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#8D94A3] bg-[#121621] px-3 py-1.5 rounded-full w-fit border border-[#272D3A]">
                <Sparkles size={12} className="text-[#FF3548] animate-spin" />
                <span>Mini Sai is thinking...</span>
              </div>
            )}

            {state === 'SPEAKING' && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#75E5ED] bg-[#121621] px-3 py-1.5 rounded-full w-fit border border-[#272D3A] animate-pulse">
                <Volume2 size={12} />
                <span>Speaking response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-3 py-2 bg-[#07080C]/80 border-t border-[#272D3A]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono text-[#8D94A3]">
            <button
              onClick={() => handleChipClick("I'm a recruiter. Tell me about Sai.")}
              className="px-2.5 py-1 rounded-md bg-[#121621] border border-[#272D3A] hover:border-[#75E5ED] text-[#C6CBD5] hover:text-white whitespace-nowrap"
            >
              👔 Recruiter Briefing
            </button>
            <button
              onClick={() => handleChipClick("Show AI projects")}
              className="px-2.5 py-1 rounded-md bg-[#121621] border border-[#272D3A] hover:border-[#FF3548] text-[#C6CBD5] hover:text-white whitespace-nowrap"
            >
              🚀 AI Projects
            </button>
            <button
              onClick={() => handleChipClick("Open resume")}
              className="px-2.5 py-1 rounded-md bg-[#121621] border border-[#272D3A] hover:border-[#FF3548] text-[#C6CBD5] hover:text-white whitespace-nowrap flex items-center gap-1"
            >
              <FileText size={10} className="text-[#FF3548]" />
              <span>Resume PDF</span>
            </button>
            <button
              onClick={() => handleChipClick("Contact Sai")}
              className="px-2.5 py-1 rounded-md bg-[#121621] border border-[#272D3A] hover:border-[#8D94A3] text-[#C6CBD5] hover:text-white whitespace-nowrap"
            >
              ✉️ Contact Coordinates
            </button>
          </div>

          {/* Input Box & Voice Trigger */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#121621] border-t border-[#272D3A] flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2 rounded-xl border transition-all ${
                isVoiceListening
                  ? 'bg-[#FF3548] text-white border-[#FF3548] animate-pulse shadow-[0_0_15px_#FF3548]'
                  : 'bg-[#07080C] text-[#8D94A3] border-[#272D3A] hover:text-white hover:border-[#FF3548]'
              }`}
              title={isVoiceListening ? "Listening... click to stop" : "Speak to Mini Sai"}
              aria-label={isVoiceListening ? "Listening... click to stop" : "Speak to Mini Sai"}
            >
              {isVoiceListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isVoiceListening ? "Listening to your voice..." : "Ask Mini Sai anything..."}
              className="flex-1 bg-[#07080C] border border-[#272D3A] focus:border-[#FF3548] rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-[#8D94A3] focus:outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-[#E32636] hover:bg-[#FF3548] disabled:opacity-40 disabled:hover:bg-[#E32636] text-white transition-colors"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
