import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useMiniSai } from '../../context/MiniSaiContext';

export const MiniSaiLauncher: React.FC = () => {
  const { isAssistantOpen, openAssistant } = useMiniSai();

  if (isAssistantOpen) return null;

  return (
    <button
      onClick={openAssistant}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#121621]/90 border border-[#272D3A] hover:border-[#FF3548] text-[#F5F6F8] shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(227,38,54,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3548]"
      aria-label="Open Mini Sai Assistant and Voice Guide"
      title="Open Mini Sai Assistant"
    >
      <div className="relative w-7 h-7 rounded-lg bg-[#07080C] border border-[#272D3A] flex items-center justify-center overflow-hidden">
        <img src="/mini-sai.png" alt="Mini Sai" className="w-6 h-6 object-contain" />
        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-[#75E5ED] animate-pulse" />
      </div>

      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono font-bold text-white tracking-wider flex items-center gap-1">
          <span>MINI SAI</span>
          <span className="text-[#FF3548] text-[8px]">●</span>
        </span>
        <span className="text-[9px] font-mono text-[#8D94A3] group-hover:text-[#75E5ED] transition-colors">
          Ask or Tour ↗
        </span>
      </div>

      <div className="p-1 rounded-full bg-[#E32636]/15 text-[#FF3548] group-hover:bg-[#E32636] group-hover:text-white transition-colors ml-0.5">
        <MessageSquare size={12} />
      </div>
    </button>
  );
};
