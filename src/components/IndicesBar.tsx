import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
      badgeBg: 'bg-[#f23645]',
      label: 'S&P 500',
      vwap: 5988.40,
    },
    {
      item: nasdaq100,
      badgeText: '100',
      badgeBg: 'bg-[#2962ff]',
      label: 'Nasdaq 100',
      vwap: 21150.20,
    },
    {
      item: dow30,
      badgeText: '30',
      badgeBg: 'bg-[#2962ff]',
      label: 'Dow 30',
      vwap: 44260.00,
    },
  ];

  return (
    <section className="mb-6 max-w-[1440px] mx-auto px-3 md:px-6">
      {/* Header Row: Indices title + Category Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <h2
            onClick={() => onSelectCategory('US stocks')}
            className="font-['Hanken_Grotesk'] text-xl md:text-2xl font-bold text-[#131722] dark:text-white flex items-center cursor-pointer hover:text-[#2962ff] transition-colors tracking-tight"
            id="indices-section-title"
          >
            <span>Indices</span>
            <ChevronRight className="w-5 h-5 ml-1 text-[#787b86]" />
          </h2>
          <span className="text-[11px] font-['JetBrains_Mono'] text-[#787b86] hidden md:inline">
            Major Benchmarks & Real-Time Futures
          </span>
        </div>

        {/* Market Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none bg-[#f0f3fa] dark:bg-[#12151e] p-1 rounded-lg border border-[#e0e3eb] dark:border-[#202533]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all duration-150 font-semibold ${
                  isSelected
                    ? 'bg-[#2962ff] text-white shadow-xs'
                    : 'text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white hover:bg-white/80 dark:hover:bg-[#1a1e2b]'
                }`}
                id={`category-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* The 3 Highlight Cards matching PRO styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {primaryCards.map(({ item, badgeText, badgeBg, label, vwap }) => {
          if (!item) return null;
          const isPositive = item.change >= 0;
          const tick = recentTickMap[item.id];

          // 24h range percentage
          const rangeDiff = item.high24h - item.low24h;
          const currentPos = rangeDiff > 0 ? ((item.price - item.low24h) / rangeDiff) * 100 : 50;

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] rounded-xl p-4 flex flex-col justify-between hover:border-[#2962ff] dark:hover:border-[#2962ff] transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md group relative overflow-hidden ${
                tick === 'up'
                  ? 'ring-2 ring-[#089981]/50 bg-[#089981]/5'
                  : tick === 'down'
                  ? 'ring-2 ring-[#f23645]/50 bg-[#f23645]/5'
                  : ''
              }`}
              id={`index-card-${item.id}`}
            >
              {/* Top Row: Badge + Name + Price */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-lg ${badgeBg} text-white flex items-center justify-center font-bold text-xs shadow-xs font-['JetBrains_Mono']`}
                  >
                    {badgeText}
                  </div>
                  <div>
                    <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors flex items-center gap-1">
                      <span>{label}</span>
                      <span className="text-[10px] font-normal text-[#787b86] font-mono">({item.symbol})</span>
                    </div>
                    <p className="text-[10px] text-[#787b86] font-['JetBrains_Mono']">
                      Vol: {item.volume} • VWAP: ${vwap.toFixed(1)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-['JetBrains_Mono'] text-base font-bold transition-colors duration-200 ${
                      tick === 'up'
                        ? 'text-[#089981]'
                        : tick === 'down'
                        ? 'text-[#f23645]'
                        : 'text-[#131722] dark:text-white'
                    }`}
                  >
                    {item.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`inline-flex items-center gap-0.5 text-xs font-bold font-['JetBrains_Mono'] ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}
                      {item.change.toFixed(2)} ({isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Mini Range Bar */}
              <div className="mt-3 pt-2 border-t border-[#f0f3fa] dark:border-[#1a1e2b]">
                <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#787b86] mb-1">
                  <span>L: {item.low24h.toLocaleString('en-US', { maximumFractionDigits: 1 })}</span>
                  <span className="font-semibold text-[#131722] dark:text-[#d1d4dc]">24H Session</span>
                  <span>H: {item.high24h.toLocaleString('en-US', { maximumFractionDigits: 1 })}</span>
                </div>
                <div className="w-full h-1 bg-[#e0e3eb] dark:bg-[#202533] rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isPositive ? 'bg-[#089981]' : 'bg-[#f23645]'
                    }`}
                    style={{ width: `${Math.max(5, Math.min(95, currentPos))}%` }}
                  />
                </div>
              </div>

              {/* Bottom Sparkline & PE/Yield */}
              <div className="mt-2.5 flex items-center justify-between">
                <div className="text-[10px] text-[#787b86] font-['JetBrains_Mono'] flex items-center gap-2">
                  <span>P/E: <strong className="text-[#131722] dark:text-[#d1d4dc]">{item.peRatio || 'N/A'}</strong></span>
                  <span>•</span>
                  <span>Yield: <strong className="text-[#131722] dark:text-[#d1d4dc]">{item.dividendYield ? `${item.dividendYield}%` : '0%'}</strong></span>
                </div>

                <div className="w-[100px] h-[26px] flex items-center justify-end">
                  <Sparkline
                    data={item.sparkline}
                    isPositive={isPositive}
                    width={100}
                    height={26}
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
