import { useState, useEffect, useRef, useCallback } from 'react';
import { useMiniSai } from '../../context/MiniSaiContext';

export const useMiniSaiAnimation = () => {
  const { state, setState, setMascotPos } = useMiniSai();
  const characterRef = useRef<HTMLDivElement>(null);
  const [headTilt, setHeadTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update mascot screen coordinates for SVG web shooting
  const updateMascotPosition = useCallback(() => {
    if (characterRef.current) {
      const rect = characterRef.current.getBoundingClientRect();
      // Mini Sai's hand/chest is around 55% from left and 45% from top of his container
      setMascotPos({
        x: rect.left + rect.width * 0.55,
        y: rect.top + rect.height * 0.45,
      });
    }
  }, [setMascotPos]);

  useEffect(() => {
    updateMascotPosition();
    window.addEventListener('resize', updateMascotPosition, { passive: true });
    window.addEventListener('scroll', updateMascotPosition, { passive: true });

    return () => {
      window.removeEventListener('resize', updateMascotPosition);
      window.removeEventListener('scroll', updateMascotPosition);
    };
  }, [updateMascotPosition]);

  // Subtle head / eye orientation tracking towards mouse cursor
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!characterRef.current) return;
        const rect = characterRef.current.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - charCenterX;
        const deltaY = e.clientY - charCenterY;

        // Clamp rotation angles to subtle natural bounds (-8deg to +8deg)
        const angleX = Math.max(-8, Math.min(8, (deltaX / window.innerWidth) * 16));
        const angleY = Math.max(-6, Math.min(6, (deltaY / window.innerHeight) * 12));

        setHeadTilt({ x: angleX, y: angleY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseEnter = () => {
    if (state === 'IDLE') {
      setState('HOVER');
    }
  };

  const handleMouseLeave = () => {
    if (state === 'HOVER') {
      setState('IDLE');
    }
  };

  return {
    characterRef,
    state,
    headTilt,
    handleMouseEnter,
    handleMouseLeave,
    updateMascotPosition,
  };
};
