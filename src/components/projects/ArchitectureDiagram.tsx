import React from 'react';
import { Layers, Cpu, Search, ArrowRight } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="bg-[#07080C] border border-[#272D3A] rounded-xl p-5 my-6 overflow-x-auto">
      <div className="text-xs font-mono text-[#FF3548] tracking-widest uppercase mb-4 flex items-center gap-2">
        <Layers size={14} />
        <span>DEEP METRIC ARCHITECTURE PIPELINE // 24KIDS422</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 min-w-[650px] text-center">
        
        {/* Step 1: Input Perspectives */}
        <div className="flex-1 bg-[#121621] border border-[#272D3A] p-3 rounded-lg">
          <div className="text-[11px] font-mono text-[#75E5ED] mb-1">01. INPUT DATA</div>
          <div className="text-xs font-bold text-white mb-1">Multi-View Feeds</div>
          <div className="text-[10px] text-[#8D94A3] font-mono">
            Satellite (90°)<br />
            Drone (45°)<br />
            Ground Street (0°)
          </div>
        </div>

        <ArrowRight size={16} className="text-[#FF3548] shrink-0 hidden md:block" />

        {/* Step 2: Backbone */}
        <div className="flex-1 bg-[#121621] border border-[#E32636]/60 p-3 rounded-lg shadow-[0_0_15px_rgba(227,38,54,0.15)]">
          <div className="text-[11px] font-mono text-[#FF3548] mb-1 flex items-center justify-center gap-1">
            <Cpu size={12} />
            <span>02. BACKBONE</span>
          </div>
          <div className="text-xs font-bold text-white mb-1">Swin-Tiny ViT</div>
          <div className="text-[10px] text-[#8D94A3] font-mono">
            Shifted Windows<br />
            Hierarchical Attention<br />
            Multi-Scale Features
          </div>
        </div>

        <ArrowRight size={16} className="text-[#FF3548] shrink-0 hidden md:block" />

        {/* Step 3: Metric Projection */}
        <div className="flex-1 bg-[#121621] border border-[#272D3A] p-3 rounded-lg">
          <div className="text-[11px] font-mono text-[#75E5ED] mb-1">03. EMBEDDING</div>
          <div className="text-xs font-bold text-white mb-1">256-D Metric Space</div>
          <div className="text-[10px] text-[#8D94A3] font-mono">
            Triplet Margin Loss<br />
            Hard Negative Mining<br />
            L2 Unit Normalization
          </div>
        </div>

        <ArrowRight size={16} className="text-[#FF3548] shrink-0 hidden md:block" />

        {/* Step 4: FAISS Vector Index */}
        <div className="flex-1 bg-[#121621] border border-[#272D3A] p-3 rounded-lg">
          <div className="text-[11px] font-mono text-[#75E5ED] mb-1 flex items-center justify-center gap-1">
            <Search size={12} />
            <span>04. RETRIEVAL</span>
          </div>
          <div className="text-xs font-bold text-white mb-1">FAISS IndexFlatIP</div>
          <div className="text-[10px] text-[#8D94A3] font-mono">
            Sub-50ms Search<br />
            Top-1 &amp; Top-5 Matches<br />
            Grad-CAM Saliency
          </div>
        </div>

      </div>

      <div className="mt-4 pt-3 border-t border-[#272D3A]/60 flex items-center justify-between text-[10px] font-mono text-[#8D94A3]">
        <span>Dataset: University-1652 Benchmark (1,652 Buildings / 72 Campuses)</span>
        <span className="text-[#FF3548]">Target Vector: 256-Dim</span>
      </div>
    </div>
  );
};
