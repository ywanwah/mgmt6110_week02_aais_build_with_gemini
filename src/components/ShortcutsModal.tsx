import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K', desc: 'Open Universal Command / Ticker Search' },
    { key: '?', desc: 'Open Keyboard Shortcuts Reference' },
    { key: '1 - 6', desc: 'Switch Market Desk (US Equities, World, Crypto, Futures, FX, Macro)' },
    { key: 'Space', desc: 'Toggle Live Market Data Tick Stream' },
    { key: 'M', desc: 'Toggle Sound FX Audio Ticks' },
    { key: 'D', desc: 'Toggle Dark / Light Mode' },
    { key: 'Esc', desc: 'Close any active modal or search bar' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#12151e] w-full max-w-md rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#202533] p-5 animate-in zoom-in-95 duration-150 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e3eb] dark:border-[#202533]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#2962ff]/10 text-[#2962ff]">
              <Keyboard className="w-4 h-4" />
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131722] dark:text-white">
              Terminal Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#787b86] hover:text-[#131722] dark:hover:text-white rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-[#e0e3eb] dark:divide-[#202533] my-3">
          {shortcuts.map((sc, i) => (
            <div key={i} className="py-2 flex items-center justify-between text-xs">
              <span className="text-[#6a6d78] dark:text-[#8e92a0]">{sc.desc}</span>
              <kbd className="px-2 py-0.5 rounded bg-[#f0f3fa] dark:bg-[#1a1e2b] border border-[#d8dce6] dark:border-[#2a2f40] text-[#131722] dark:text-[#d1d4dc] font-mono font-bold text-[11px]">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-1.5 rounded-lg bg-[#2962ff] text-white text-xs font-semibold hover:bg-[#1e53e5] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
