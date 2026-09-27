import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Download, FileText, Calendar, ArrowUpRight, ArrowDownRight, Layers, HelpCircle, Info, ChevronDown } from 'lucide-react';
import { MonthlyDataPoint, CpiApiResponse } from '../../types/cpi';
import { exportCpiToCsv, downloadJson } from '../../utils/cpiUtils';
import { Tooltip } from '../help/Tooltip';

interface CpiHistoricalLedgerProps {
  data: CpiApiResponse;
}

export const CpiHistoricalLedger: React.FC<CpiHistoricalLedgerProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState<'all' | '2026' | '2025'>('all');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExportMenuOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExportMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExportMenuOpen]);

  const filteredHistory = useMemo(() => {
    const list = [...data.recentMonthly].reverse(); // Most recent first
    if (selectedYear === 'all') return list;
    return list.filter((item) => item.period.startsWith(selectedYear));
  }, [data.recentMonthly, selectedYear]);

  return (
    <section className="bg-white dark:bg-[#0f141f] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs transition-colors">
      
      {/* Header and Download Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              Historical Monthly Index Ledger
            </h2>
            <Tooltip
              title="Historical Monthly Ledger"
              content="Chronological archive of all monthly Consumer Price Index prints published under SingStat TableBuilder M213751. Each record includes index points, MoM velocity, YoY rate, and real purchasing power."
              iconSize={15}
            />
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs font-mono text-neutral-500">Resource M213751</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Full chronological archive of the monthly Consumer Price Index (2024=100) from the Singapore Department of Statistics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Primary Action: Download CSV */}
          <button
            onClick={() => exportCpiToCsv(data)}
            title="Download complete historical dataset as CSV (recommended for Excel / spreadsheet users)"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-100 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg border border-neutral-300/90 dark:border-neutral-600 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
            <span>Download CSV</span>
          </button>

          {/* Secondary Action: More export options dropdown */}
          <div className="relative" ref={exportMenuRef}>
            <button
              type="button"
              onClick={() => setIsExportMenuOpen((prev) => !prev)}
              aria-expanded={isExportMenuOpen}
              aria-haspopup="true"
              title="More export options (developer and machine-readable formats)"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/80 rounded-lg border border-neutral-200/80 dark:border-neutral-700/80 transition-colors"
            >
              <span>More export options</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-150 ${
                  isExportMenuOpen ? 'rotate-180 text-neutral-700 dark:text-neutral-200' : ''
                }`}
              />
            </button>

            {isExportMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#131b29] rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-2 z-30 animate-in fade-in zoom-in-95 duration-100"
              >
                <div className="px-2 pt-1 pb-1.5 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Secondary Export Formats
                </div>
                <button
                  role="menuitem"
                  onClick={() => {
                    downloadJson(data, 'singstat_cpi_archive.json');
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group flex items-start gap-2.5"
                >
                  <FileText className="w-4 h-4 mt-0.5 text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                      <span>JSON — for developers/data tools</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        .json
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Machine-readable format mainly intended for developers and data tools. Most users should use CSV.
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Year Filter Controls */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-neutral-500 font-medium">Filter Year:</span>
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200/80 dark:border-neutral-800">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedYear === 'all'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            All Years ({data.recentMonthly.length})
          </button>
          <button
            onClick={() => setSelectedYear('2026')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedYear === '2026'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            2026
          </button>
          <button
            onClick={() => setSelectedYear('2025')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedYear === '2025'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            2025
          </button>
        </div>
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900/80 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-200 dark:border-neutral-800 select-none">
              <th className="py-3 px-3">
                <div className="flex items-center gap-1">
                  <span>Reporting Period</span>
                  <Tooltip
                    title="Reporting Period"
                    content="Monthly release date published by SingStat."
                  />
                </div>
              </th>
              <th className="py-3 px-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>CPI Level (2024=100)</span>
                  <Tooltip
                    title="CPI Level"
                    content="Standardized index value relative to the base year benchmark of 100.000."
                  />
                </div>
              </th>
              <th className="py-3 px-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>MoM Change %</span>
                  <Tooltip
                    title="MoM Change %"
                    content="Monthly rate of price change from the previous month."
                  />
                </div>
              </th>
              <th className="py-3 px-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>YoY Inflation Rate</span>
                  <Tooltip
                    title="YoY Inflation Rate"
                    content="Annual inflation rate compared to the same month in the prior calendar year."
                  />
                </div>
              </th>
              <th className="py-3 px-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span>Real $100 Purchasing Power</span>
                  <Tooltip
                    title="Real Purchasing Power"
                    content="The equivalent purchasing value of $100 SGD in base year terms (computed as $100 / (CPI / 100))."
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-700 dark:text-neutral-300">
            {filteredHistory.map((item) => {
              const mom = item.momPercent ?? 0;
              const yoy = item.yoyPercent ?? 0;
              const purchasingPower = (100 / item.value) * 100;
              const isMomUp = mom >= 0;
              const isYoyUp = yoy >= 0;

              return (
                <tr key={item.period} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white font-mono">
                    {item.period}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900 dark:text-white tabular-nums">
                    {item.value.toFixed(3)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold tabular-nums">
                    <span className={isMomUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                      {isMomUp ? `+${mom.toFixed(2)}%` : `${mom.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold tabular-nums">
                    <span className={isYoyUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                      {isYoyUp ? `+${yoy.toFixed(2)}%` : `${yoy.toFixed(2)}%`}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-neutral-600 dark:text-neutral-400 tabular-nums">
                    ${purchasingPower.toFixed(2)} SGD
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

