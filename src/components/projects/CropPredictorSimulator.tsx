import React, { useState } from 'react';
import { Sprout, RefreshCw, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../audio/soundEffects';

interface SoilParams {
  nitrogen: number;      // 0 - 140
  phosphorus: number;    // 5 - 145
  potassium: number;     // 5 - 205
  temperature: number;   // 10 - 45 °C
  humidity: number;      // 15 - 100 %
  ph: number;            // 3.5 - 9.0
  rainfall: number;      // 20 - 300 mm
}

interface CropResult {
  crop: string;
  suitabilityScore: number;
  reason: string;
  waterNeeds: 'High' | 'Moderate' | 'Low';
  optimalSeason: string;
}

export const CropPredictorSimulator: React.FC = () => {
  const [params, setParams] = useState<SoilParams>({
    nitrogen: 85,
    phosphorus: 48,
    potassium: 40,
    temperature: 24,
    humidity: 82,
    ph: 6.5,
    rainfall: 220
  });

  const [prediction, setPrediction] = useState<CropResult>({
    crop: 'Rice',
    suitabilityScore: 96,
    reason: 'High rainfall (>200mm) combined with high humidity (>80%) and moderate nitrogen levels create ideal wetland conditions.',
    waterNeeds: 'High',
    optimalSeason: 'Kharif (Monsoon)'
  });

  const runPrediction = (p: SoilParams) => {
    soundManager.playClick();
    
    // Algorithmic decision tree simulator reflecting agricultural dataset patterns
    let bestCrop = 'Maize';
    let score = 91;
    let reason = 'Balanced NPK ratio and temperate weather provide stable conditions for grain crops.';
    let water: 'High' | 'Moderate' | 'Low' = 'Moderate';
    let season = 'Kharif / Rabi';

    if (p.rainfall > 180 && p.humidity > 75) {
      bestCrop = 'Rice';
      score = 96;
      reason = 'Abundant rainfall (>180mm) with elevated humidity provides ideal flooded paddy soil conditions.';
      water = 'High';
      season = 'Kharif (Monsoon)';
    } else if (p.nitrogen > 100 && p.phosphorus > 60 && p.rainfall < 100) {
      bestCrop = 'Cotton';
      score = 94;
      reason = 'High nutrient density (N > 100, P > 60) with moderate moisture is optimal for fiber growth.';
      water = 'Moderate';
      season = 'Kharif';
    } else if (p.temperature > 28 && p.humidity < 60 && p.rainfall < 80) {
      bestCrop = 'Chickpea';
      score = 92;
      reason = 'Warm temperatures with dry air and moderate moisture favor pulse legumes.';
      water = 'Low';
      season = 'Rabi';
    } else if (p.potassium > 160 && p.phosphorus > 100) {
      bestCrop = 'Apple / Grapes';
      score = 95;
      reason = 'High potassium and phosphorus levels favor perennial fruit tree yields.';
      water = 'Moderate';
      season = 'Spring / Summer';
    } else if (p.ph < 6.0 && p.temperature < 25 && p.rainfall > 150) {
      bestCrop = 'Coffee';
      score = 93;
      reason = 'Slightly acidic soil (pH < 6.0) and high rainfall support highland coffee plantation cultivation.';
      water = 'High';
      season = 'Year-round';
    } else {
      bestCrop = 'Maize';
      score = 89;
      reason = 'Well-balanced soil chemistry and moderate environmental parameters support robust cereal crops.';
      water = 'Moderate';
      season = 'Kharif / Rabi';
    }

    setPrediction({
      crop: bestCrop,
      suitabilityScore: score,
      reason,
      waterNeeds: water,
      optimalSeason: season
    });
  };

  const handleSliderChange = (field: keyof SoilParams, val: number) => {
    const updated = { ...params, [field]: val };
    setParams(updated);
    runPrediction(updated);
  };

  const resetDefaults = () => {
    soundManager.playClick();
    const def: SoilParams = {
      nitrogen: 85,
      phosphorus: 48,
      potassium: 40,
      temperature: 24,
      humidity: 82,
      ph: 6.5,
      rainfall: 220
    };
    setParams(def);
    runPrediction(def);
  };

  return (
    <div className="bg-[#07080C] border border-[#272D3A] rounded-xl p-5 my-6">
      <div className="flex items-center justify-between border-b border-[#272D3A]/60 pb-3 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FF3548] uppercase tracking-wider">
          <Sprout size={15} />
          <span>Interactive Model Simulator (Random Forest Rules)</span>
        </div>
        <button
          onClick={resetDefaults}
          className="flex items-center gap-1 text-[11px] font-mono text-[#8D94A3] hover:text-white transition-colors"
        >
          <RefreshCw size={11} />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Sliders Input Panel */}
        <div className="space-y-3.5 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[#C6CBD5] mb-1">
              <span>Nitrogen (N ratio):</span>
              <span className="text-[#FF3548] font-bold">{params.nitrogen}</span>
            </div>
            <input
              type="range"
              min="0"
              max="140"
              value={params.nitrogen}
              onChange={(e) => handleSliderChange('nitrogen', Number(e.target.value))}
              className="w-full accent-[#E32636] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[#C6CBD5] mb-1">
              <span>Phosphorus (P ratio):</span>
              <span className="text-[#75E5ED] font-bold">{params.phosphorus}</span>
            </div>
            <input
              type="range"
              min="5"
              max="145"
              value={params.phosphorus}
              onChange={(e) => handleSliderChange('phosphorus', Number(e.target.value))}
              className="w-full accent-[#75E5ED] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[#C6CBD5] mb-1">
              <span>Potassium (K ratio):</span>
              <span className="text-[#C6CBD5] font-bold">{params.potassium}</span>
            </div>
            <input
              type="range"
              min="5"
              max="205"
              value={params.potassium}
              onChange={(e) => handleSliderChange('potassium', Number(e.target.value))}
              className="w-full accent-[#C6CBD5] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-[#C6CBD5] mb-1">
                <span>Rainfall (mm):</span>
                <span className="text-[#75E5ED]">{params.rainfall}</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                value={params.rainfall}
                onChange={(e) => handleSliderChange('rainfall', Number(e.target.value))}
                className="w-full accent-[#75E5ED] cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-[#C6CBD5] mb-1">
                <span>Soil pH:</span>
                <span className="text-[#FF3548]">{params.ph}</span>
              </div>
              <input
                type="range"
                min="3.5"
                max="9.0"
                step="0.1"
                value={params.ph}
                onChange={(e) => handleSliderChange('ph', Number(e.target.value))}
                className="w-full accent-[#E32636] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Real-time Recommendation Output Card */}
        <div className="bg-[#121621] border border-[#272D3A] rounded-xl p-5 flex flex-col justify-between h-full">
          <div>
            <div className="text-[11px] font-mono text-[#8D94A3] uppercase tracking-wider mb-2">
              Predicted Optimal Crop
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={24} className="text-[#FF3548]" />
                {prediction.crop}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#E32636]/15 border border-[#E32636]/40 text-[#FF3548] text-xs font-mono font-bold">
                {prediction.suitabilityScore}% Confidence
              </span>
            </div>

            <p className="text-xs text-[#8D94A3] leading-relaxed mb-4">
              {prediction.reason}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#272D3A]/60 text-[11px] font-mono">
            <div>
              <span className="text-[#8D94A3]">Water Needs:</span>{' '}
              <span className="text-[#75E5ED] font-semibold">{prediction.waterNeeds}</span>
            </div>
            <div>
              <span className="text-[#8D94A3]">Season:</span>{' '}
              <span className="text-[#C6CBD5] font-semibold">{prediction.optimalSeason}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
