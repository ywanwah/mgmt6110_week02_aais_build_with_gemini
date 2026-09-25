import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from 'lucide-react';
import { MarketCategory, MarketItem } from '../types';
import { Sparkline } from './Sparkline';

interface MarketGridProps {
  category: MarketCategory;
  items: MarketItem[];
  onSelectItem: (item: MarketItem, initialAction?: 'buy' | 'sell') => void;
  watchlistSymbols: string[];
  onToggleWatchlist: (symbol: string) => void;
  recentTickMap: Record<string, 'up' | 'down'>;
}

type SortField = 'symbol' | 'price' | 'changePercent' | 'volume' | 'marketCap';
type SortOrder = 'asc' | 'desc';

export const MarketGrid: React.FC<MarketGridProps> = ({
  category,
  items,
  onSelectItem,
  watchlistSymbols,
  onToggleWatchlist,
  recentTickMap,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'gainers' | 'losers' | 'volume' | 'megacap'>('all');
  const [sortField, setSortField] = useState<SortField>('changePercent');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isCompactDensity, setIsCompactDensity] = useState(false);

  // Filter by category
  let categoryItems = items.filter((item) => item.category === category);

  // Filter by search
  if (filterQuery.trim()) {
    const q = filterQuery.toLowerCase();
    categoryItems = categoryItems.filter(
      (item) =>
        item.symbol.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.sector && item.sector.toLowerCase().includes(q))
    );
  }

  // Filter by tab
  if (activeTabFilter === 'gainers') {
    categoryItems = categoryItems.filter((item) => item.changePercent > 0);
  } else if (activeTabFilter === 'losers') {
    categoryItems = categoryItems.filter((item) => item.changePercent < 0);
  } else if (activeTabFilter === 'megacap') {
    categoryItems = categoryItems.filter((item) => item.marketCap && (item.marketCap.includes('T') || item.marketCap.includes('B')));
  }

  // Sort
  const sortedItems = [...categoryItems].sort((a, b) => {
    let result = 0;
    if (sortField === 'symbol') {
      result = a.symbol.localeCompare(b.symbol);
    } else if (sortField === 'price') {
      result = a.price - b.price;
    } else if (sortField === 'changePercent') {
      result = a.changePercent - b.changePercent;
    } else if (sortField === 'volume') {
      const volA = parseFloat(a.volume.replace(/[^0-9.]/g, '')) || 0;
      const volB = parseFloat(b.volume.replace(/[^0-9.]/g, '')) || 0;
      result = volA - volB;
    }
    return sortOrder === 'desc' ? -result : result;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white dark:bg-[#12151e] rounded-xl border border-[#e0e3eb] dark:border-[#202533] shadow-xs overflow-hidden">
      {/* Table Toolbar Controls */}
      <div className="p-3 md:p-4 border-b border-[#e0e3eb] dark:border-[#202533] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#fafbfe] dark:bg-[#151924]">
        {/* Left Sub-tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Instruments' },
            { id: 'gainers', label: 'Top Gainers' },
            { id: 'losers', label: 'Top Losers' },
            { id: 'volume', label: 'Most Active' },
            { id: 'megacap', label: 'Mega Cap' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabFilter(tab.id as any)}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTabFilter === tab.id
                  ? 'bg-[#2962ff] text-white shadow-xs'
                  : 'text-[#6a6d78] dark:text-[#8e92a0] hover:bg-white dark:hover:bg-[#1f2433] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Search Box & Density Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center flex-1 md:flex-initial">
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-[#787b86]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`Filter ${category}...`}
              className="pl-8 pr-3 py-1 bg-white dark:bg-[#1a1e2b] border border-[#d8dce6] dark:border-[#2a2f40] rounded-md text-xs text-[#131722] dark:text-[#d1d4dc] focus:outline-none focus:border-[#2962ff] w-full md:w-48"
            />
          </div>

          <button
            onClick={() => setIsCompactDensity(!isCompactDensity)}
            className="p-1.5 px-2 rounded-md border border-[#d8dce6] dark:border-[#2a2f40] bg-white dark:bg-[#1a1e2b] text-[11px] font-['JetBrains_Mono'] text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white transition-colors"
            title="Toggle table row density"
          >
            {isCompactDensity ? 'COMPACT' : 'DEFAULT'}
          </button>
        </div>
      </div>

      {/* Dense Institutional Financial Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e0e3eb] dark:border-[#202533] bg-[#f0f3fa] dark:bg-[#161a26] text-[10px] font-['JetBrains_Mono'] text-[#787b86] uppercase tracking-wider select-none">
              <th className="py-2.5 px-3 w-8"></th>
              <th
                onClick={() => handleSort('symbol')}
                className="py-2.5 px-3 cursor-pointer hover:text-[#131722] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Symbol / Security</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('price')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-[#131722] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Last Price</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('changePercent')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-[#131722] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>24H Change</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-right hidden sm:table-cell">Bid / Ask Spread</th>
              <th className="py-2.5 px-3 text-right hidden md:table-cell">24H Range (L / H)</th>
              <th
                onClick={() => handleSort('volume')}
                className="py-2.5 px-3 text-right hidden lg:table-cell cursor-pointer hover:text-[#131722] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Volume / Cap</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-center hidden xl:table-cell w-32">24H Trend</th>
              <th className="py-2.5 px-3 text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#202533] text-xs font-['Inter']">
            {sortedItems.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#787b86] font-mono">
                  No market instruments found matching criteria.
                </td>
              </tr>
            ) : (
              sortedItems.map((item) => {
                const isPositive = item.change >= 0;
                const isStarred = watchlistSymbols.includes(item.symbol);
                const tick = recentTickMap[item.id];

                // Range calculations
                const rangeDiff = item.high24h - item.low24h;
                const rangePos = rangeDiff > 0 ? ((item.price - item.low24h) / rangeDiff) * 100 : 50;

                // Simulated Bid/Ask spread for pro realism
                const spreadOffset = item.price * 0.0003;
                const bidPrice = item.price - spreadOffset;
                const askPrice = item.price + spreadOffset;

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`hover:bg-[#f0f3fa]/80 dark:hover:bg-[#1a1e2b] transition-colors cursor-pointer group ${
                      tick === 'up'
                        ? 'bg-[#089981]/10'
                        : tick === 'down'
                        ? 'bg-[#f23645]/10'
                        : ''
                    }`}
                  >
                    {/* Watchlist Star */}
                    <td
                      className={`px-3 text-center ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(item.symbol);
                      }}
                    >
                      <button
                        className="text-[#c3c6d5] dark:text-[#41475c] hover:text-amber-400 transition-colors p-0.5"
                        title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            isStarred
                              ? 'fill-amber-400 text-amber-400'
                              : 'hover:fill-amber-400/30'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Symbol & Name */}
                    <td className={`px-3 ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}>
                      <div className="flex items-center gap-2.5">
                        {item.badgeNumber ? (
                          <div
                            className={`w-7 h-7 rounded-md ${
                              item.badgeColor === 'red' ? 'bg-[#f23645]' : 'bg-[#2962ff]'
                            } text-white flex items-center justify-center font-bold text-[10px] font-['JetBrains_Mono'] shrink-0`}
                          >
                            {item.badgeNumber}
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-md bg-[#f0f3fa] dark:bg-[#1a1e2b] text-[#2962ff] dark:text-[#5d8aff] flex items-center justify-center font-bold text-[11px] font-['JetBrains_Mono'] shrink-0 border border-[#d8dce6] dark:border-[#2a2f40]">
                            {item.symbol.substring(0, 3)}
                          </div>
                        )}
                        <div>
                          <div className="font-['JetBrains_Mono'] font-bold text-xs text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors flex items-center gap-1">
                            <span>{item.symbol}</span>
                            {item.sector && (
                              <span className="text-[9px] font-normal font-sans bg-[#f0f3fa] dark:bg-[#1a1e2b] px-1 py-0.2 rounded text-[#787b86]">
                                {item.sector}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#787b86] truncate max-w-[150px] sm:max-w-[200px]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Last Price with tick flash */}
                    <td className={`px-3 text-right ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}>
                      <div
                        className={`font-['JetBrains_Mono'] font-bold text-xs transition-colors duration-200 ${
                          tick === 'up'
                            ? 'text-[#089981]'
                            : tick === 'down'
                            ? 'text-[#f23645]'
                            : 'text-[#131722] dark:text-white'
                        }`}
                      >
                        {item.price > 100
                          ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                          : item.price > 1
                          ? item.price.toFixed(4)
                          : item.price.toFixed(5)}
                      </div>
                    </td>

                    {/* 24h Change */}
                    <td className={`px-3 text-right ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}>
                      <div
                        className={`inline-flex items-center gap-0.5 font-['JetBrains_Mono'] font-bold text-[11px] px-2 py-0.5 rounded ${
                          isPositive
                            ? 'bg-[#089981]/10 text-[#089981]'
                            : 'bg-[#f23645]/10 text-[#f23645]'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        <span>
                          {isPositive ? '+' : ''}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>

                    {/* Bid / Ask Spread */}
                    <td className={`px-3 text-right hidden sm:table-cell ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}>
                      <div className="font-['JetBrains_Mono'] text-[11px] text-[#787b86]">
                        <span className="text-[#089981] font-semibold">
                          {bidPrice > 100 ? bidPrice.toFixed(2) : bidPrice.toFixed(4)}
                        </span>
                        <span className="mx-1">/</span>
                        <span className="text-[#f23645] font-semibold">
                          {askPrice > 100 ? askPrice.toFixed(2) : askPrice.toFixed(4)}
                        </span>
                      </div>
                    </td>

                    {/* 24h Range Bar */}
                    <td className={`px-3 text-right hidden md:table-cell ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center justify-between w-24 text-[10px] font-['JetBrains_Mono'] text-[#787b86]">
                          <span>{item.low24h > 100 ? item.low24h.toFixed(0) : item.low24h.toFixed(2)}</span>
                          <span>{item.high24h > 100 ? item.high24h.toFixed(0) : item.high24h.toFixed(2)}</span>
                        </div>
                        <div className="w-24 h-1 bg-[#e0e3eb] dark:bg-[#202533] rounded-full overflow-hidden mt-0.5 relative">
                          <div
                            className={`h-full rounded-full ${
                              isPositive ? 'bg-[#089981]' : 'bg-[#f23645]'
                            }`}
                            style={{ width: `${Math.max(5, Math.min(95, rangePos))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Volume / Cap */}
                    <td className={`px-3 text-right hidden lg:table-cell ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}>
                      <div className="font-['JetBrains_Mono'] text-xs font-semibold text-[#131722] dark:text-[#d1d4dc]">
                        {item.volume}
                      </div>
                      {item.marketCap && (
                        <div className="text-[10px] text-[#787b86] font-['JetBrains_Mono']">
                          {item.marketCap}
                        </div>
                      )}
                    </td>

                    {/* Sparkline */}
                    <td className={`px-3 hidden xl:table-cell text-center ${isCompactDensity ? 'py-1' : 'py-2'}`}>
                      <div className="flex justify-center">
                        <Sparkline
                          data={item.sparkline}
                          isPositive={isPositive}
                          width={90}
                          height={22}
                        />
                      </div>
                    </td>

                    {/* Quick Trade BUY / SELL buttons */}
                    <td className={`px-3 text-center ${isCompactDensity ? 'py-1.5' : 'py-2.5'}`}>
                      <div className="flex items-center justify-center gap-1 opacity-90 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectItem(item, 'buy');
                          }}
                          className="px-2 py-1 rounded bg-[#089981]/15 hover:bg-[#089981] text-[#089981] hover:text-white font-['JetBrains_Mono'] text-[10px] font-bold transition-colors"
                          title={`Quick Buy ${item.symbol}`}
                        >
                          BUY
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectItem(item, 'sell');
                          }}
                          className="px-2 py-1 rounded bg-[#f23645]/15 hover:bg-[#f23645] text-[#f23645] hover:text-white font-['JetBrains_Mono'] text-[10px] font-bold transition-colors"
                          title={`Quick Sell ${item.symbol}`}
                        >
                          SELL
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
