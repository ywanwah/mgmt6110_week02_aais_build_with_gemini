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
      item.category.toLowerCase().includes(q)
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1f222e] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2e303a] overflow-hidden animate-in zoom-in-95 duration-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Bar Input */}
        <div className="relative flex items-center p-4 border-b border-[#E0E3EB] dark:border-[#2e303a]">
          <Search className="w-5 h-5 text-[#787B86] ml-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search all indices, stocks, crypto, commodities..."
            className="w-full pl-3 pr-8 py-1 bg-transparent text-sm md:text-base text-[#191b24] dark:text-white placeholder-[#787B86] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#787B86] hover:text-[#191b24] dark:hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[#f3f2ff] dark:divide-[#2e303a]/50">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#787B86]">
              No instruments found matching &quot;{query}&quot;
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
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#f3f2ff] dark:bg-[#282c3b]'
                      : 'hover:bg-[#faf8ff] dark:hover:bg-[#282c3b]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.badgeNumber ? (
                      <div
                        className={`w-7 h-7 rounded-full ${
                          item.badgeColor === 'red' ? 'bg-[#F23645]' : 'bg-[#004ee8]'
                        } text-white flex items-center justify-center font-bold text-[10px] font-['JetBrains_Mono']`}
                      >
                        {item.badgeNumber}
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-md bg-white dark:bg-[#232632] border border-[#E0E3EB] dark:border-[#383b48] text-[#2962ff] flex items-center justify-center font-bold text-[11px] font-['JetBrains_Mono']">
                        {item.symbol.substring(0, 3)}
                      </div>
                    )}
                    <div>
                      <div className="font-['JetBrains_Mono'] font-bold text-xs md:text-sm text-[#191b24] dark:text-white flex items-center gap-1.5">
                        <span>{item.symbol}</span>
                        <span className="text-[10px] font-sans font-normal text-[#787B86] bg-white dark:bg-[#232632] px-1.5 py-0.2 rounded border border-[#E0E3EB] dark:border-[#383b48]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#787B86] truncate max-w-[200px] sm:max-w-[320px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#191b24] dark:text-white">
                        ${item.price > 100 ? item.price.toLocaleString() : item.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] font-['JetBrains_Mono'] font-semibold flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
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
                      className="p-1.5 text-[#c3c5d8] hover:text-amber-400"
                    >
                      <Star
                        className={`w-4 h-4 ${
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
        <div className="p-2.5 bg-[#faf8ff] dark:bg-[#232632] border-t border-[#E0E3EB] dark:border-[#2e303a] flex items-center justify-between text-[11px] text-[#787B86] px-4 font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>•</span>
            <span>↵ Select</span>
            <span>•</span>
            <span>ESC Close</span>
          </div>
          <span>Total instruments: {items.length}</span>
        </div>
      </div>
    </div>
  );
};
