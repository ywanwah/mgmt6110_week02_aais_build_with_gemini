import React from 'react';
import { X, Trash2, TrendingUp, TrendingDown, Star, ExternalLink, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#12151e] w-full max-w-md h-full shadow-2xl border-l border-[#e0e3eb] dark:border-[#202533] flex flex-col animate-in slide-in-from-right duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#e0e3eb] dark:border-[#202533] flex items-center justify-between bg-[#f8f9fd] dark:bg-[#161a26]">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131722] dark:text-white">
              Institutional Watchlist ({watchedItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787b86] hover:text-[#131722] dark:hover:text-white rounded-lg hover:bg-white dark:hover:bg-[#1a1e2b]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {watchedItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Star className="w-10 h-10 text-[#c3c6d5] mx-auto mb-3 opacity-40" />
              <h4 className="font-semibold text-sm text-[#131722] dark:text-white">
                Your watchlist is empty
              </h4>
              <p className="text-xs text-[#787b86] mt-1 mb-4">
                Star instruments to track price movements, volatility, and set price alerts.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="bg-[#2962ff] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#1e53e5] transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Search & Add Instruments</span>
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
                  className="bg-[#f8f9fd] dark:bg-[#161a26] p-3 rounded-xl border border-[#e0e3eb] dark:border-[#202533] hover:border-[#2962ff] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-[#2962ff]/10 text-[#2962ff] font-bold text-xs font-mono flex items-center justify-center border border-[#2962ff]/20">
                        {item.symbol.substring(0, 3)}
                      </div>
                      <div>
                        <div className="font-['JetBrains_Mono'] font-bold text-xs text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors">
                          {item.symbol}
                        </div>
                        <div className="text-[10px] text-[#787b86] truncate max-w-[130px]">
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
                          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          <span>
                            {isPositive ? '+' : ''}
                            {item.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFromWatchlist(item.symbol);
                        }}
                        className="p-1 text-[#787b86] hover:text-[#f23645] rounded transition-colors"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-[#e0e3eb] dark:border-[#202533] flex items-center justify-between text-[10px] font-mono text-[#787b86]">
                    <span>VOL: {item.volume}</span>
                    <Sparkline
                      data={item.sparkline}
                      isPositive={isPositive}
                      width={80}
                      height={18}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Button */}
        {watchedItems.length > 0 && (
          <div className="p-3 border-t border-[#e0e3eb] dark:border-[#202533] bg-[#f8f9fd] dark:bg-[#161a26]">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full py-2 px-3 rounded-lg border border-[#2962ff] text-[#2962ff] font-semibold text-xs hover:bg-[#2962ff] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add More Instruments</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
