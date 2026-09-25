import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, Star, ArrowRight } from 'lucide-react';
import { MarketItem } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  watchlistSymbols: string[];
  onToggleWatchlist: (symbol: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
  watchlistSymbols,
  onToggleWatchlist,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.symbol.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.sector && item.sector.toLowerCase().includes(q))
    );
  });

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      onSelectItem(filteredItems[selectedIndex]);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#12151e] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#202533] overflow-hidden animate-in zoom-in-95 duration-100 flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Bar Input */}
        <div className="relative flex items-center p-3 sm:p-4 border-b border-[#e0e3eb] dark:border-[#202533] bg-[#f8f9fd] dark:bg-[#161a26]">
          <Search className="w-4 h-4 text-[#787b86] ml-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search all indices, stocks, crypto, commodities, forex..."
            className="w-full pl-3 pr-8 py-1 bg-transparent text-xs sm:text-sm text-[#131722] dark:text-white placeholder-[#787b86] focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#787b86] hover:text-[#131722] dark:hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[#f0f3fa] dark:divide-[#1a1e2b]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#787b86] font-mono">
              No market instruments found matching &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isPositive = item.change >= 0;
              const isStarred = watchlistSymbols.includes(item.symbol);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-2.5 sm:p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#f0f3fa] dark:bg-[#1a1e2b]'
                      : 'hover:bg-[#f8f9fd] dark:hover:bg-[#161a26]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.badgeNumber ? (
                      <div
                        className={`w-7 h-7 rounded-md ${
                          item.badgeColor === 'red' ? 'bg-[#f23645]' : 'bg-[#2962ff]'
                        } text-white flex items-center justify-center font-bold text-[10px] font-['JetBrains_Mono']`}
                      >
                        {item.badgeNumber}
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-md bg-white dark:bg-[#12151e] border border-[#d8dce6] dark:border-[#2a2f40] text-[#2962ff] dark:text-[#5d8aff] flex items-center justify-center font-bold text-[11px] font-['JetBrains_Mono']">
                        {item.symbol.substring(0, 3)}
                      </div>
                    )}
                    <div>
                      <div className="font-['JetBrains_Mono'] font-bold text-xs text-[#131722] dark:text-white flex items-center gap-1.5">
                        <span>{item.symbol}</span>
                        <span className="text-[9px] font-sans font-normal text-[#787b86] bg-white dark:bg-[#12151e] px-1 py-0.2 rounded border border-[#d8dce6] dark:border-[#2a2f40]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#787b86] truncate max-w-[180px] sm:max-w-[320px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#131722] dark:text-white">
                        ${item.price > 100 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.price.toFixed(4)}
                      </div>
                      <div
                        className={`text-[10px] font-['JetBrains_Mono'] font-bold flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(item.symbol);
                      }}
                      className="p-1.5 text-[#c3c6d5] dark:text-[#41475c] hover:text-amber-400"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          isStarred ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#f8f9fd] dark:bg-[#161a26] border-t border-[#e0e3eb] dark:border-[#202533] flex items-center justify-between text-[10px] text-[#787b86] px-4 font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>•</span>
            <span>↵ Select</span>
            <span>•</span>
            <span>ESC Close</span>
          </div>
          <span>{items.length} Instruments Loaded</span>
        </div>
      </div>
    </div>
  );
};
