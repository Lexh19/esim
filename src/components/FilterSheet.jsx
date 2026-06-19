import React, { useState, useEffect } from 'react';

export default function FilterSheet({ 
  isOpen, 
  onClose, 
  title, 
  options, 
  selectedValue, 
  onApply, 
  defaultOption 
}) {
  const [localVal, setLocalVal] = useState(selectedValue);

  // Sync state when sheet opens
  useEffect(() => {
    if (isOpen) {
      setLocalVal(selectedValue);
    }
  }, [isOpen, selectedValue]);

  if (!isOpen) return null;

  const handleReset = () => {
    setLocalVal(defaultOption);
  };

  const handleApply = () => {
    onApply(localVal);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end select-none">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Bottom Sheet Drawer */}
      <div className="relative bg-white rounded-t-3xl shadow-xl z-10 w-full flex flex-col max-h-[85%] transition-transform duration-300 animate-slide-up pb-4">
        
        {/* Pull Indicator / Drag Bar */}
        <div className="w-full flex justify-center py-3 shrink-0">
          <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
        </div>

        {/* Sheet Header */}
        <div className="flex justify-between items-center px-6 pb-4 border-b border-slate-100 shrink-0">
          <h3 className="font-bold text-slate-800 text-base">{title}</h3>
          <button 
            onClick={handleReset}
            className="text-brand font-semibold text-sm hover:underline cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Options List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
          {options.map((option) => {
            const isSelected = localVal === option;
            return (
              <button
                key={option}
                onClick={() => setLocalVal(option)}
                className="w-full flex justify-between items-center text-left py-2 group cursor-pointer"
              >
                <span className={`text-sm transition-colors ${
                  isSelected ? 'font-bold text-slate-900' : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {option}
                </span>
                
                {/* Custom Radio Button */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? 'border-brand' : 'border-slate-300'
                }`}>
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-brand"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="px-6 pt-2 pb-4 shrink-0">
          <button
            onClick={handleApply}
            className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-colors cursor-pointer text-sm shadow-sm"
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
