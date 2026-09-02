import React from 'react';
import { X, Trash2, TrendingUp, TrendingDown, Star, ExternalLink, Plus } from 'lucide-react';
import { MarketItem } from '../types';
import { Sparkline } from './Sparkline';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  onOpenSearch: () => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  items,
  onSelectItem,
  onRemoveFromWatchlist,
  onOpenSearch,
}) => {
  if (!isOpen) return null;

  const watchedItems = items.filter((item) => watchlistSymbols.includes(item.symbol));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#191b24] w-full max-w-md h-full shadow-2xl border-l border-[#E0E3EB] dark:border-[#2e303a] flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E0E3EB] dark:border-[#2e303a] flex items-center justify-between bg-[#faf8ff] dark:bg-[#232632]">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#191b24] dark:text-white">
              My Watchlist ({watchedItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787B86] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-[#2e303a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {watchedItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Star className="w-12 h-12 text-[#c3c5d8] mx-auto mb-3 opacity-50" />
              <h4 className="font-semibold text-sm text-[#191b24] dark:text-white">
                Your watchlist is empty
              </h4>
              <p className="text-xs text-[#787B86] mt-1 mb-4">
                Star instruments to track price movements, volatility, and set custom alerts.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="bg-[#2962ff] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#0049db] transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Instruments</span>
              </button>
            </div>
          ) : (
            watchedItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="bg-[#faf8ff] dark:bg-[#232632] p-3.5 rounded-xl border border-[#E0E3EB] dark:border-[#383b48] hover:border-[#2962ff] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-[#2962ff]/10 text-[#2962ff] font-bold text-xs font-mono flex items-center justify-center">
                        {item.symbol.substring(0, 3)}
                      </div>
                      <div>
                        <div className="font-['JetBrains_Mono'] font-bold text-xs text-[#191b24] dark:text-white">
                          {item.symbol}
                        </div>
                        <div className="text-[11px] text-[#787B86] truncate max-w-[130px]">
                          {item.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#191b24] dark:text-white">
                          ${item.price > 100 ? item.price.toLocaleString() : item.price.toFixed(2)}
                        </div>
                        <div
                          className={`text-[10px] font-['JetBrains_Mono'] font-bold flex items-center justify-end gap-0.5 ${
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
                          onRemoveFromWatchlist(item.symbol);
                        }}
                        className="p-1 text-[#787B86] hover:text-[#F23645] rounded transition-colors"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#E0E3EB] dark:border-[#383b48] flex items-center justify-between">
                    <span className="text-[10px] text-[#787B86] font-mono">Vol: {item.volume}</span>
                    <Sparkline
                      data={item.sparkline}
                      isPositive={isPositive}
                      width={80}
                      height={20}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Button */}
        {watchedItems.length > 0 && (
          <div className="p-4 border-t border-[#E0E3EB] dark:border-[#2e303a] bg-[#faf8ff] dark:bg-[#232632]">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full py-2 px-4 rounded-xl border border-[#2962ff] text-[#2962ff] font-semibold text-xs hover:bg-[#2962ff] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add More Instruments</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
