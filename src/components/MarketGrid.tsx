import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { MarketCategory, MarketItem } from '../types';
import { Sparkline } from './Sparkline';

interface MarketGridProps {
  category: MarketCategory;
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  watchlistSymbols: string[];
  onToggleWatchlist: (symbol: string) => void;
  recentTickMap: Record<string, 'up' | 'down'>;
}

type SortField = 'symbol' | 'price' | 'changePercent' | 'volume';
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
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'gainers' | 'losers' | 'volume'>('all');
  const [sortField, setSortField] = useState<SortField>('changePercent');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

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
    <div className="bg-white dark:bg-[#1f222e] rounded-2xl border border-[#E0E3EB] dark:border-[#2e303a] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Table Toolbar Controls */}
      <div className="p-4 md:p-5 border-b border-[#E0E3EB] dark:border-[#2e303a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Sub-tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Instruments' },
            { id: 'gainers', label: 'Top Gainers' },
            { id: 'losers', label: 'Top Losers' },
            { id: 'volume', label: 'Most Active' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTabFilter === tab.id
                  ? 'bg-[#2962ff] text-white shadow-sm'
                  : 'text-[#5a5e6b] dark:text-[#c3c6d5] hover:bg-[#f3f2ff] dark:hover:bg-[#282c3b] hover:text-[#191b24] dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Search Box within table */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[#787B86]" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Filter ${category}...`}
            className="pl-9 pr-4 py-1.5 bg-[#f3f2ff] dark:bg-[#232632] border border-[#E0E3EB] dark:border-[#383b48] rounded-full text-xs text-[#191b24] dark:text-[#ededfa] focus:outline-none focus:border-[#2962ff] focus:ring-1 focus:ring-[#2962ff] w-full md:w-56"
          />
        </div>
      </div>

      {/* Dense Financial Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E0E3EB] dark:border-[#2e303a] bg-[#faf8ff] dark:bg-[#232632]/60 text-[11px] font-['JetBrains_Mono'] text-[#787B86] uppercase tracking-wider select-none">
              <th className="py-3 px-4 w-10"></th>
              <th
                onClick={() => handleSort('symbol')}
                className="py-3 px-4 cursor-pointer hover:text-[#191b24] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Symbol & Name</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('price')}
                className="py-3 px-4 text-right cursor-pointer hover:text-[#191b24] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Last Price</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th
                onClick={() => handleSort('changePercent')}
                className="py-3 px-4 text-right cursor-pointer hover:text-[#191b24] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>24h Change</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 text-right hidden sm:table-cell">24h Range (L / H)</th>
              <th
                onClick={() => handleSort('volume')}
                className="py-3 px-4 text-right hidden md:table-cell cursor-pointer hover:text-[#191b24] dark:hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Volume / Cap</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3 px-4 text-center hidden lg:table-cell w-36">24h Trend</th>
              <th className="py-3 px-4 text-right w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2e303a] text-sm">
            {sortedItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#787B86]">
                  No instruments found matching your filter criteria.
                </td>
              </tr>
            ) : (
              sortedItems.map((item) => {
                const isPositive = item.change >= 0;
                const isStarred = watchlistSymbols.includes(item.symbol);
                const tick = recentTickMap[item.id];

                // Calculate price position in 24h range
                const rangeDiff = item.high24h - item.low24h;
                const rangePos = rangeDiff > 0 ? ((item.price - item.low24h) / rangeDiff) * 100 : 50;

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`hover:bg-[#faf8ff] dark:hover:bg-[#282c3b] transition-colors cursor-pointer group ${
                      tick === 'up'
                        ? 'bg-[#089981]/5'
                        : tick === 'down'
                        ? 'bg-[#F23645]/5'
                        : ''
                    }`}
                  >
                    {/* Watchlist Star Column */}
                    <td
                      className="py-3.5 px-4 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(item.symbol);
                      }}
                    >
                      <button
                        className="text-[#c3c5d8] hover:text-amber-400 transition-colors p-1"
                        title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isStarred
                              ? 'fill-amber-400 text-amber-400'
                              : 'hover:fill-amber-400/30'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Symbol & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {item.badgeNumber ? (
                          <div
                            className={`w-8 h-8 rounded-full ${
                              item.badgeColor === 'red' ? 'bg-[#F23645]' : 'bg-[#004ee8]'
                            } text-white flex items-center justify-center font-bold text-[10px] font-['JetBrains_Mono'] shrink-0`}
                          >
                            {item.badgeNumber}
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-[#f3f2ff] dark:bg-[#2e303a] text-[#2962ff] dark:text-[#88b0ff] flex items-center justify-center font-bold text-xs font-['JetBrains_Mono'] shrink-0 border border-[#E0E3EB] dark:border-[#383b48]">
                            {item.symbol.substring(0, 3)}
                          </div>
                        )}
                        <div>
                          <div className="font-['JetBrains_Mono'] font-bold text-[#191b24] dark:text-white group-hover:text-[#2962ff] transition-colors flex items-center gap-1.5">
                            <span>{item.symbol}</span>
                            {item.sector && (
                              <span className="text-[10px] font-normal font-sans bg-[#f3f2ff] dark:bg-[#2e303a] px-1.5 py-0.2 rounded text-[#787B86]">
                                {item.sector}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#787B86] truncate max-w-[160px] sm:max-w-[240px]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Last Price */}
                    <td className="py-3.5 px-4 text-right">
                      <div
                        className={`font-['JetBrains_Mono'] font-semibold text-sm transition-colors duration-300 ${
                          tick === 'up'
                            ? 'text-[#089981] font-bold'
                            : tick === 'down'
                            ? 'text-[#F23645] font-bold'
                            : 'text-[#191b24] dark:text-white'
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
                    <td className="py-3.5 px-4 text-right">
                      <div
                        className={`inline-flex items-center gap-1 font-['JetBrains_Mono'] font-semibold text-xs px-2.5 py-1 rounded-md ${
                          isPositive
                            ? 'bg-[#089981]/10 text-[#089981]'
                            : 'bg-[#F23645]/10 text-[#F23645]'
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>
                          {isPositive ? '+' : ''}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </td>

                    {/* 24h Range Bar */}
                    <td className="py-3.5 px-4 text-right hidden sm:table-cell">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center justify-between w-28 text-[11px] font-['JetBrains_Mono'] text-[#787B86]">
                          <span>{item.low24h > 100 ? item.low24h.toFixed(0) : item.low24h.toFixed(2)}</span>
                          <span>{item.high24h > 100 ? item.high24h.toFixed(0) : item.high24h.toFixed(2)}</span>
                        </div>
                        <div className="w-28 h-1.5 bg-[#e1e1ee] dark:bg-[#383b48] rounded-full overflow-hidden mt-1 relative">
                          <div
                            className="h-full bg-[#2962ff] rounded-full"
                            style={{ width: `${Math.max(5, Math.min(95, rangePos))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Volume / Cap */}
                    <td className="py-3.5 px-4 text-right hidden md:table-cell">
                      <div className="font-['JetBrains_Mono'] text-xs text-[#191b24] dark:text-[#ededfa]">
                        {item.volume}
                      </div>
                      {item.marketCap && (
                        <div className="text-[11px] text-[#787B86] font-['JetBrains_Mono']">
                          Cap: {item.marketCap}
                        </div>
                      )}
                    </td>

                    {/* Sparkline */}
                    <td className="py-3.5 px-4 hidden lg:table-cell text-center">
                      <div className="flex justify-center">
                        <Sparkline
                          data={item.sparkline}
                          isPositive={isPositive}
                          width={110}
                          height={28}
                        />
                      </div>
                    </td>

                    {/* Action Arrow */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="p-1.5 rounded-lg text-[#787B86] group-hover:text-[#2962ff] group-hover:bg-[#f3f2ff] dark:group-hover:bg-[#2e303a] transition-all inline-flex">
                        <ChevronRight className="w-4 h-4" />
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
