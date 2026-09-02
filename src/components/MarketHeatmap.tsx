import React, { useState } from 'react';
import { MarketItem } from '../types';
import { TrendingUp, TrendingDown, Layers, Grid } from 'lucide-react';

interface MarketHeatmapProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({ items, onSelectItem }) => {
  const [filterSector, setFilterSector] = useState<string>('all');

  // Group items by category or sector
  const sectors = ['all', 'US stocks', 'World stocks', 'Crypto', 'Futures', 'Forex'];

  const filteredItems = filterSector === 'all'
    ? items
    : items.filter((i) => i.category === filterSector);

  const getBgColor = (changePercent: number) => {
    if (changePercent >= 3) return 'bg-[#089981] text-white';
    if (changePercent >= 1.5) return 'bg-[#089981]/85 text-white';
    if (changePercent > 0) return 'bg-[#089981]/70 text-white';
    if (changePercent === 0) return 'bg-gray-500 text-white';
    if (changePercent > -1.5) return 'bg-[#F23645]/70 text-white';
    if (changePercent > -3) return 'bg-[#F23645]/85 text-white';
    return 'bg-[#F23645] text-white';
  };

  return (
    <div className="bg-white dark:bg-[#1f222e] rounded-2xl border border-[#E0E3EB] dark:border-[#2e303a] p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#191b24] dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2962ff]" />
            <span>Market Heatmap & Sector Performance</span>
          </h3>
          <p className="text-xs text-[#787B86]">Visual performance weighted by 24h market price delta</p>
        </div>

        {/* Sector Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setFilterSector(sec)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                filterSector === sec
                  ? 'bg-[#2962ff] text-white shadow-sm'
                  : 'bg-[#f3f2ff] dark:bg-[#232632] text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Grid Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 min-h-[360px]">
        {filteredItems.map((item) => {
          const isPositive = item.changePercent >= 0;
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`${getBgColor(
                item.changePercent
              )} rounded-xl p-3.5 flex flex-col justify-between cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-150 min-h-[100px] select-none`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-['JetBrains_Mono'] font-bold text-sm tracking-tight leading-tight">
                    {item.symbol}
                  </div>
                  <div className="text-[11px] opacity-90 truncate max-w-[110px]">
                    {item.name}
                  </div>
                </div>
                {item.badgeNumber && (
                  <span className="text-[10px] bg-black/25 px-1.5 py-0.5 rounded font-mono font-bold">
                    {item.badgeNumber}
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline justify-between border-t border-white/20 pt-1.5">
                <span className="font-['JetBrains_Mono'] text-xs font-medium opacity-95">
                  {item.price > 100 ? item.price.toLocaleString() : item.price.toFixed(2)}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs font-bold">
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Heatmap Legend */}
      <div className="mt-6 pt-4 border-t border-[#E0E3EB] dark:border-[#2e303a] flex flex-wrap items-center justify-between text-xs text-[#787B86] gap-3">
        <div className="flex items-center gap-1.5">
          <span>Legend:</span>
          <span className="px-2 py-0.5 rounded bg-[#F23645] text-white font-mono text-[10px]">&lt; -3%</span>
          <span className="px-2 py-0.5 rounded bg-[#F23645]/70 text-white font-mono text-[10px]">-1.5%</span>
          <span className="px-2 py-0.5 rounded bg-gray-500 text-white font-mono text-[10px]">0%</span>
          <span className="px-2 py-0.5 rounded bg-[#089981]/70 text-white font-mono text-[10px]">+1.5%</span>
          <span className="px-2 py-0.5 rounded bg-[#089981] text-white font-mono text-[10px]">&gt; +3%</span>
        </div>
        <div>Click any block to launch full analytical chart</div>
      </div>
    </div>
  );
};
