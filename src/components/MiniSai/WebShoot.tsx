import React, { useMemo } from 'react';
import { useMiniSai } from '../../context/MiniSaiContext';

export const WebShoot: React.FC = () => {
  const { webTarget, mascotPos, state } = useMiniSai();

  const isVisible = webTarget !== null && (state === 'SHOOTING' || state === 'WEB_IMPACT' || state === 'NAVIGATING');
  const isImpact = state === 'WEB_IMPACT' || state === 'NAVIGATING';

  const pathData = useMemo(() => {
    if (!webTarget) return null;

    const x1 = mascotPos.x;
    const y1 = mascotPos.y;
    const x2 = webTarget.x;
    const y2 = webTarget.y;

    // Curved parabolic trajectory
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Natural sag or arc based on vertical and horizontal distance
    const arcHeight = Math.min(60, dist * 0.15);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 - arcHeight;

    const mainPath = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;

    // Side branching filament paths for technological web feel
    const branch1 = `M ${x1} ${y1} Q ${midX - 15} ${midY - 10} ${x2 - 8} ${y2 - 6}`;
    const branch2 = `M ${x1} ${y1} Q ${midX + 15} ${midY + 10} ${x2 + 8} ${y2 + 6}`;

    return {
      main: mainPath,
      branch1,
      branch2,
      dist,
      targetX: x2,
      targetY: y2,
    };
  }, [webTarget, mascotPos]);

  if (!isVisible || !pathData) return null;

  return (
    <svg
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[100]"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        {/* Web Neon Glow Filter */}
        <filter id="webGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#FF3548" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#E32636" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Outer Web Glow Tracer */}
      <path
        d={pathData.main}
        fill="none"
        stroke="#E32636"
        strokeWidth="5"
        strokeOpacity="0.5"
        filter="url(#webGlow)"
        className="web-strand-glow"
        strokeDasharray={pathData.dist}
        strokeDashoffset={state === 'SHOOTING' ? pathData.dist * 0.15 : 0}
        style={{
          transition: 'stroke-dashoffset 0.22s cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
      />

      {/* Delicate Micro-Filament 1 */}
      <path
        d={pathData.branch1}
        fill="none"
        stroke="#FF3548"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeDasharray={pathData.dist}
        strokeDashoffset={state === 'SHOOTING' ? pathData.dist * 0.25 : 0}
        style={{
          transition: 'stroke-dashoffset 0.25s ease-out',
        }}
      />

      {/* Delicate Micro-Filament 2 */}
      <path
        d={pathData.branch2}
        fill="none"
        stroke="#75E5ED"
        strokeWidth="1"
        strokeOpacity="0.35"
        strokeDasharray={pathData.dist}
        strokeDashoffset={state === 'SHOOTING' ? pathData.dist * 0.25 : 0}
        style={{
          transition: 'stroke-dashoffset 0.25s ease-out',
        }}
      />

      {/* Core Glowing Technological Strand */}
      <path
        d={pathData.main}
        fill="none"
        stroke="url(#webGradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray={pathData.dist}
        strokeDashoffset={state === 'SHOOTING' ? pathData.dist * 0.05 : 0}
        style={{
          transition: 'stroke-dashoffset 0.2s cubic-bezier(0.1, 0.9, 0.2, 1)',
        }}
      />

      {/* Target Impact Node & Burst Effect */}
      {isImpact && (
        <g transform={`translate(${pathData.targetX}, ${pathData.targetY})`}>
          {/* Expanding Energy Shockwave Ring 1 */}
          <circle
            cx="0"
            cy="0"
            r="16"
            fill="none"
            stroke="#FF3548"
            strokeWidth="1.5"
            className="animate-ping"
            style={{ animationDuration: '0.6s' }}
          />

          {/* Secondary Cyan Resonance Ring */}
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="#E32636"
            fillOpacity="0.4"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* Web Spoke Anchor Lines */}
          {[-45, 0, 45, 90, 135, 180, 225, 270].map((angle, idx) => (
            <line
              key={idx}
              x1="0"
              y1="0"
              x2={Math.cos((angle * Math.PI) / 180) * 14}
              y2={Math.sin((angle * Math.PI) / 180) * 14}
              stroke="#FF3548"
              strokeWidth="1"
              strokeOpacity="0.75"
            />
          ))}

          {/* Center Anchor Core */}
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
        </g>
      )}
    </svg>
  );
};
