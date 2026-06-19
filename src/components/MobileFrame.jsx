import React, { useEffect, useState } from 'react';

export default function MobileFrame({ children }) {
  const [time, setTime] = useState('17:40');

  useEffect(() => {
    // Keep clock updated
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-dvh bg-slate-900 flex items-center justify-center p-0 md:p-6 overflow-x-hidden font-sans relative">
      {/* Decorative premium glow backgrounds for desktop */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none hidden md:block"></div>

      {/* Main simulated phone container */}
      <div className="relative w-full max-w-md md:h-[880px] h-dvh bg-white md:rounded-[48px] md:shadow-2xl flex flex-col overflow-hidden border-0 md:border-[10px] border-slate-900 transition-all duration-300">
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative min-h-0">
          {children}
        </div>

      </div>
    </div>
  );
}
