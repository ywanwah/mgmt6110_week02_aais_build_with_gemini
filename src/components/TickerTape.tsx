import React from 'react';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';
import { MarketItem } from '../types';

interface TickerTapeProps {
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  recentTickMap: Record<string, 'up' | 'down'>;
}

export const TickerTape: React.FC<TickerTapeProps> = ({
  items,
  onSelectItem,
  recentTickMap,
}) => {
  // Major benchmark instruments for ticker ribbon
  const ribbonItems = items.slice(0, 10);
  const repeatedItems = [...ribbonItems, ...ribbonItems];

  return (
    <div className="w-full bg-[#10131c] text-[#d1d4dc] border-b border-[#232733] h-8 text-[11px] font-['JetBrains_Mono'] overflow-hidden flex items-center relative z-30 select-none">
      {/* Live Badge */}
      <div className="bg-[#191c28] px-2.5 h-full flex items-center gap-1.5 border-r border-[#2a2e3d] shrink-0 z-10 shadow-md">
        <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse" />
        <span className="font-bold text-white tracking-wider text-[10px] uppercase">LIVE STREAM</span>
      </div>

      {/* Infinite scrolling ticker */}
      <div className="overflow-hidden flex-1 h-full flex items-center">
        <div className="animate-ticker flex items-center whitespace-nowrap">
          {repeatedItems.map((item, idx) => {
            const isPositive = item.change >= 0;
            const tick = recentTickMap[item.id];

            return (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => onSelectItem(item)}
                className={`inline-flex items-center gap-2 px-4 h-8 cursor-pointer hover:bg-[#202533] border-r border-[#1f2330] transition-colors ${
                  tick === 'up'
                    ? 'bg-[#089981]/20'
                    : tick === 'down'
                    ? 'bg-[#f23645]/20'
                    : ''
                }`}
                title={`Click to open ${item.name} terminal`}
              >
                <span className="font-bold text-white">{item.symbol}</span>
                <span className="font-semibold text-[#f0f3fa]">
                  {item.price > 100
                    ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : item.price.toFixed(4)}
                </span>
                <span
                  className={`flex items-center gap-0.5 font-bold ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Telemetry */}
      <div className="hidden lg:flex items-center gap-2 px-3 h-full bg-[#191c28] border-l border-[#2a2e3d] shrink-0 text-[10px] text-[#787b86]">
        <span>DMA LATENCY: <strong className="text-[#089981]">0.8ms</strong></span>
        <span>•</span>
        <span>FEED: <strong className="text-white">NYSE/CME/CRYPTO</strong></span>
      </div>
    </div>
  );
};
