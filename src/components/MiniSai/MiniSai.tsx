import React from 'react';
import { useMiniSai } from '../../context/MiniSaiContext';
import { useMiniSaiAnimation } from './useMiniSaiAnimation';
import './MiniSai.css';

interface MiniSaiProps {
  className?: string;
}

export const MiniSai: React.FC<MiniSaiProps> = ({ className = '' }) => {
  const { openPopup } = useMiniSai();
  const {
    characterRef,
    state,
    headTilt,
    handleMouseEnter,
    handleMouseLeave,
  } = useMiniSaiAnimation();

  const isShooting = state === 'SHOOTING' || state === 'WEB_IMPACT';
  const isPreparing = state === 'PREPARING';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openPopup();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPopup();
    }
  };

  return (
    <div
      ref={characterRef}
      className={`mini-sai-wrapper select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Mini Sai Interactive Mascot. Click to open message."
      title="Mini Sai - Click to interact"
    >
      {/* Speech Hint on Hover */}
      <div className="mini-sai-speech-hint">
        <span>Click Me!</span>
      </div>

      {/* Cyber Ledge Perch Accent */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-[#121621] border border-[#272D3A] shadow-md pointer-events-none">
        <span className="absolute top-0 left-2 right-2 h-[1px] bg-[#FF3548]/70" />
      </div>

      {/* Character Graphic */}
      <div
        className={`mini-sai-character ${
          isShooting
            ? 'mini-sai-shooting'
            : isPreparing
            ? 'mini-sai-preparing'
            : 'mini-sai-idle'
        }`}
        style={{
          transform: `perspective(400px) rotateY(${headTilt.x}deg) rotateX(${-headTilt.y}deg)`,
        }}
      >
        <img
          src="/mini-sai.png"
          alt="Mini Sai - 3D Cartoon Developer Mascot"
          className="h-full w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          draggable={false}
        />

        {/* Dynamic Energy Discharge at Hand during Web-Shoot */}
        {isShooting && <div className="mini-sai-hand-flash" />}
      </div>
    </div>
  );
};
