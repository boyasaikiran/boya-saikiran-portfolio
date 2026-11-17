import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2.5px] z-50 pointer-events-none bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-[#E32636] via-[#FF3548] to-[#75E5ED] shadow-[0_0_8px_#E32636] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
