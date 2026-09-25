import React, { useState } from 'react';
import { MarketItem } from '../types';
import { Layers, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface MarketHeatmapProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({ items, onSelectItem }) => {
  const [filterSector, setFilterSector] = useState<string>('all');

  const sectors = ['all', 'US stocks', 'World stocks', 'Crypto', 'Futures', 'Forex'];

  const filteredItems = filterSector === 'all'
    ? items
    : items.filter((i) => i.category === filterSector);

  const getHeatmapColor = (changePercent: number) => {
    if (changePercent >= 3) return 'bg-[#089981] hover:bg-[#077d69] text-white';
    if (changePercent >= 1.5) return 'bg-[#089981]/85 hover:bg-[#089981] text-white';
    if (changePercent > 0) return 'bg-[#089981]/65 hover:bg-[#089981]/85 text-white';
    if (changePercent === 0) return 'bg-[#3b4154] text-white';
    if (changePercent > -1.5) return 'bg-[#f23645]/65 hover:bg-[#f23645]/85 text-white';
    if (changePercent > -3) return 'bg-[#f23645]/85 hover:bg-[#f23645] text-white';
    return 'bg-[#f23645] hover:bg-[#d62837] text-white';
  };

  return (
    <div className="bg-white dark:bg-[#12151e] rounded-xl border border-[#e0e3eb] dark:border-[#202533] p-4 sm:p-5 shadow-xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#e0e3eb] dark:border-[#202533]">
        <div>
          <h3 className="font-['Hanken_Grotesk'] text-base md:text-lg font-bold text-[#131722] dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2962ff]" />
            <span>Market Treemap & Performance Heatmap</span>
          </h3>
          <p className="text-xs text-[#787b86]">Visual performance weighted by 24h market price delta</p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setFilterSector(sec)}
              className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-colors ${
                filterSector === sec
                  ? 'bg-[#2962ff] text-white shadow-xs'
                  : 'bg-[#f0f3fa] dark:bg-[#161a26] text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Grid Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 min-h-[340px]">
        {filteredItems.map((item) => {
          const isPositive = item.changePercent >= 0;
          const isMega = item.marketCap && (item.marketCap.includes('T') || item.symbol === 'BTC/USD');

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`${getHeatmapColor(
                item.changePercent
              )} ${isMega ? 'sm:col-span-2 sm:row-span-2 p-4' : 'p-3'} rounded-xl flex flex-col justify-between cursor-pointer hover:scale-[1.01] hover:shadow-lg transition-all duration-150 select-none border border-black/10`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-['JetBrains_Mono'] font-bold text-sm tracking-tight leading-tight">
                    {item.symbol}
                  </div>
                  <div className="text-[10px] opacity-90 truncate max-w-[120px]">
                    {item.name}
                  </div>
                </div>
                {item.sector && (
                  <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded font-mono font-medium truncate max-w-[80px]">
                    {item.sector}
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline justify-between border-t border-white/20 pt-1.5 font-['JetBrains_Mono']">
                <span className="text-xs font-semibold opacity-95">
                  {item.price > 100 ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.price.toFixed(4)}
                </span>
                <span className="text-xs font-bold">
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Heatmap Legend */}
      <div className="mt-4 pt-3 border-t border-[#e0e3eb] dark:border-[#202533] flex flex-wrap items-center justify-between text-xs text-[#787b86] gap-2">
        <div className="flex items-center gap-1">
          <span className="font-mono text-[11px]">Performance:</span>
          <span className="px-2 py-0.5 rounded bg-[#f23645] text-white font-mono text-[10px]">&lt; -3%</span>
          <span className="px-2 py-0.5 rounded bg-[#f23645]/75 text-white font-mono text-[10px]">-1.5%</span>
          <span className="px-2 py-0.5 rounded bg-[#3b4154] text-white font-mono text-[10px]">0%</span>
          <span className="px-2 py-0.5 rounded bg-[#089981]/75 text-white font-mono text-[10px]">+1.5%</span>
          <span className="px-2 py-0.5 rounded bg-[#089981] text-white font-mono text-[10px]">&gt; +3%</span>
        </div>
        <div className="font-mono text-[11px]">Click any block to launch full analytical chart</div>
      </div>
    </div>
  );
};
