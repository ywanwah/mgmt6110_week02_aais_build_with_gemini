import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronDown, ChevronRight, Download, Filter, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { CpiCategoryItem } from '../../types/cpi';
import { exportCategoriesToCsv } from '../../utils/cpiUtils';

interface CpiCategoriesTableProps {
  categories: CpiCategoryItem[];
  latestPeriod: string;
}

type FilterMode = 'all' | 'high' | 'moderate' | 'deflation' | 'weight';
type SortField = 'name' | 'weight' | 'value' | 'momPercent' | 'yoyPercent';
type SortOrder = 'asc' | 'desc';

export const CpiCategoriesTable: React.FC<CpiCategoriesTableProps> = ({ categories, latestPeriod }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [sortField, setSortField] = useState<SortField>('weight');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null);

  const toggleExpand = (seriesNo: string) => {
    setExpandedSeries((prev) => (prev === seriesNo ? null : seriesNo));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder(field === 'name' ? 'asc' : 'desc');
    }
  };

  // Filter & Search
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      // Search
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.seriesNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.group && c.group.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Filter Mode
      if (filterMode === 'high') return c.yoyPercent > 2.0;
      if (filterMode === 'moderate') return c.yoyPercent >= 0 && c.yoyPercent <= 2.0;
      if (filterMode === 'deflation') return c.yoyPercent < 0;
      if (filterMode === 'weight') return (c.weight ?? 0) >= 5.0;
      return true;
    });
  }, [categories, searchQuery, filterMode]);

  // Sort
  const sortedCategories = useMemo(() => {
    return [...filteredCategories].sort((a, b) => {
      let valA: string | number = a[sortField] ?? 0;
      let valB: string | number = b[sortField] ?? 0;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? (Number(valA) - Number(valB)) : (Number(valB) - Number(valA));
    });
  }, [filteredCategories, sortField, sortOrder]);

  return (
    <section className="bg-white dark:bg-[#0f141f] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs transition-colors">
      
      {/* Header and Action Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              Key Expenditure Categories &amp; Basket Breakdown
            </h2>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs font-mono text-neutral-500">{sortedCategories.length} items</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Granular price changes and weighting patterns derived from the Household Expenditure Survey (HES 2023).
          </p>
        </div>

        <button
          onClick={() => exportCategoriesToCsv(categories, latestPeriod)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Table CSV</span>
        </button>
      </div>

      {/* Controls: Search & Segmented Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search groceries, transport, housing, rent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200/80 dark:border-neutral-800 overflow-x-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilterMode('high')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterMode === 'high'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Rising (&gt;2% YoY)
          </button>
          <button
            onClick={() => setFilterMode('moderate')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterMode === 'moderate'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Moderate (0-2%)
          </button>
          <button
            onClick={() => setFilterMode('deflation')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterMode === 'deflation'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Deflating (&lt;0%)
          </button>
          <button
            onClick={() => setFilterMode('weight')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filterMode === 'weight'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            High Weight (&ge;5%)
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900/80 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-200 dark:border-neutral-800 select-none">
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-3 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Expenditure Category</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('weight')}
                className="py-3 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Basket Weight</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('value')}
                className="py-3 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Latest Index</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('momPercent')}
                className="py-3 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>MoM Change</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('yoyPercent')}
                className="py-3 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>YoY Inflation</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-700 dark:text-neutral-300">
            {sortedCategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-neutral-400">
                  No expenditure categories matched "{searchQuery}".
                </td>
              </tr>
            ) : (
              sortedCategories.map((cat) => {
                const isExpanded = expandedSeries === cat.seriesNo;
                const isMomUp = cat.momPercent >= 0;
                const isYoyUp = cat.yoyPercent >= 0;

                return (
                  <React.Fragment key={cat.seriesNo}>
                    <tr
                      onClick={() => toggleExpand(cat.seriesNo)}
                      className="cursor-pointer hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      {/* Name & Series Column */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <div className="flex flex-col">
                            <span className="font-semibold text-neutral-900 dark:text-white">
                              {cat.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                              <span className="font-mono">{cat.seriesNo}</span>
                              {cat.group && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>{cat.group}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Weight Column */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-mono font-medium text-neutral-800 dark:text-neutral-200 tabular-nums">
                            {cat.weight !== undefined ? `${cat.weight.toFixed(1)}%` : '—'}
                          </span>
                          {cat.weight !== undefined && (
                            <div className="w-16 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800 mt-1 overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${Math.min(100, (cat.weight / 25) * 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Latest Index Column */}
                      <td className="py-3 px-3 text-right font-mono font-semibold text-neutral-900 dark:text-white tabular-nums">
                        {cat.value.toFixed(3)}
                      </td>

                      {/* MoM Change Column */}
                      <td className="py-3 px-3 text-right font-mono font-semibold tabular-nums">
                        <span className={isMomUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                          {isMomUp ? `+${cat.momPercent.toFixed(2)}%` : `${cat.momPercent.toFixed(2)}%`}
                        </span>
                      </td>

                      {/* YoY Change Column */}
                      <td className="py-3 px-3 text-right font-mono font-bold tabular-nums">
                        <div className="flex flex-col items-end">
                          <span className={isYoyUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                            {isYoyUp ? `+${cat.yoyPercent.toFixed(2)}%` : `${cat.yoyPercent.toFixed(2)}%`}
                          </span>
                          <div className="w-12 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800 mt-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isYoyUp ? 'bg-rose-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(100, Math.abs(cat.yoyPercent) * 20)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Drawer Row */}
                    {isExpanded && (
                      <tr className="bg-neutral-50/50 dark:bg-neutral-900/50">
                        <td colSpan={5} className="p-4 border-t border-neutral-100 dark:border-neutral-800">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="md:col-span-2">
                              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                                Item Scope &amp; Methodology:
                              </span>
                              <p className="text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                                {cat.notes || 'Official sub-index published under Singapore Department of Statistics TableBuilder resource M213751 (2024=100).'}
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
                              <span className="font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                                Base Index Comparison:
                              </span>
                              <div className="flex justify-between items-center text-neutral-500">
                                <span>2024 Base Level:</span>
                                <span className="font-mono">100.000</span>
                              </div>
                              <div className="flex justify-between items-center text-neutral-500 mt-1">
                                <span>Change from Base:</span>
                                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                                  {cat.value >= 100 ? `+${(cat.value - 100).toFixed(3)}` : (cat.value - 100).toFixed(3)} pts
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </section>
  );
};
