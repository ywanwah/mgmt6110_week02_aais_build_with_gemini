import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketCategory, MarketItem } from '../types';
import { Sparkline } from './Sparkline';

interface IndicesBarProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  recentTickMap: Record<string, 'up' | 'down'>;
}

export const IndicesBar: React.FC<IndicesBarProps> = ({
  selectedCategory,
  onSelectCategory,
  items,
  onSelectItem,
  recentTickMap,
}) => {
  const categories: MarketCategory[] = [
    'US stocks',
    'World stocks',
    'Crypto',
    'Futures',
    'Forex',
    'Economy',
  ];

  // Primary 3 Index Cards
  const sp500 = items.find((i) => i.id === 'sp500') || items[0];
  const nasdaq100 = items.find((i) => i.id === 'nasdaq100') || items[1];
  const dow30 = items.find((i) => i.id === 'dow30') || items[2];

  const primaryCards = [
    {
      item: sp500,
      badgeText: '500',
      badgeBg: 'bg-[#F23645]',
      label: 'S&P 500',
    },
    {
      item: nasdaq100,
      badgeText: '100',
      badgeBg: 'bg-[#004ee8]',
      label: 'Nasdaq 100',
    },
    {
      item: dow30,
      badgeText: '30',
      badgeBg: 'bg-[#004ee8]',
      label: 'Dow 30',
    },
  ];

  return (
    <section className="mb-10 max-w-[1280px] mx-auto px-4 md:px-6">
      {/* Header Row: Indices title + Category Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2
          onClick={() => onSelectCategory('US stocks')}
          className="font-['Hanken_Grotesk'] text-2xl md:text-[28px] font-semibold text-[#191b24] dark:text-white flex items-center cursor-pointer hover:opacity-80 transition-opacity tracking-tight"
          id="indices-section-title"
        >
          <span>Indices</span>
          <ChevronRight className="w-6 h-6 ml-1 text-[#787B86]" />
        </h2>

        {/* Market Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none bg-[#f3f2ff] dark:bg-[#232632] p-1 rounded-full border border-[#E0E3EB] dark:border-[#383b48]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm whitespace-nowrap transition-all duration-150 font-medium ${
                  isSelected
                    ? 'bg-[#191b24] dark:bg-white text-white dark:text-[#191b24] shadow-sm'
                    : 'text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10'
                }`}
                id={`category-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* The 3 Highlight Cards matching the exact layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {primaryCards.map(({ item, badgeText, badgeBg, label }) => {
          if (!item) return null;
          const isPositive = item.change >= 0;
          const tick = recentTickMap[item.id];

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`bg-white dark:bg-[#1f222e] border border-[#E0E3EB] dark:border-[#2e303a] rounded-xl p-4 flex flex-col justify-between hover:bg-[#faf8ff] dark:hover:bg-[#282c3b] hover:border-[#2962ff]/40 transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)] group relative overflow-hidden ${
                tick === 'up'
                  ? 'ring-2 ring-[#089981]/50'
                  : tick === 'down'
                  ? 'ring-2 ring-[#F23645]/50'
                  : ''
              }`}
              id={`index-card-${item.id}`}
            >
              {/* Top Row: Badge + Name + Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${badgeBg} text-white flex items-center justify-center font-bold text-xs shadow-sm font-['JetBrains_Mono']`}
                  >
                    {badgeText}
                  </div>
                  <div>
                    <span className="font-['Inter'] text-sm font-semibold text-[#191b24] dark:text-white group-hover:text-[#2962ff] transition-colors">
                      {label}
                    </span>
                    <p className="text-[11px] text-[#787B86] font-['JetBrains_Mono']">
                      {item.symbol} • {item.sector || 'Index'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-['JetBrains_Mono'] text-base font-bold text-[#191b24] dark:text-white transition-colors duration-300 ${
                      tick === 'up'
                        ? 'text-[#089981]'
                        : tick === 'down'
                        ? 'text-[#F23645]'
                        : ''
                    }`}
                  >
                    {item.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`inline-flex items-center gap-0.5 text-xs font-semibold font-['JetBrains_Mono'] ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}
                      {item.change.toFixed(2)} ({isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Sparkline & Range Summary */}
              <div className="mt-3 pt-3 border-t border-[#f3f2ff] dark:border-[#2e303a] flex items-center justify-between">
                <div className="text-[11px] text-[#787B86] flex flex-col font-['JetBrains_Mono']">
                  <span>
                    L: {item.low24h.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                  </span>
                  <span>
                    H: {item.high24h.toLocaleString('en-US', { maximumFractionDigits: 1 })}
                  </span>
                </div>

                <div className="w-[120px] h-[32px] flex items-center justify-end">
                  <Sparkline
                    data={item.sparkline}
                    isPositive={isPositive}
                    width={110}
                    height={30}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
