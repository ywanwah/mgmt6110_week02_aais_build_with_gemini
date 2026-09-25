import React, { useState, useMemo } from 'react';
import { Download, FileText, Calendar, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { MonthlyDataPoint, CpiApiResponse } from '../../types/cpi';
import { exportCpiToCsv, downloadJson } from '../../utils/cpiUtils';

interface CpiHistoricalLedgerProps {
  data: CpiApiResponse;
}

export const CpiHistoricalLedger: React.FC<CpiHistoricalLedgerProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState<'all' | '2026' | '2025'>('all');

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
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs font-mono text-neutral-500">Resource M213751</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Full chronological archive of the monthly Consumer Price Index (2024=100) from the Singapore Department of Statistics.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => exportCpiToCsv(data)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
          <button
            onClick={() => downloadJson(data, 'singstat_cpi_archive.json')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
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
              <th className="py-3 px-3">Reporting Period</th>
              <th className="py-3 px-3 text-right">CPI Level (2024=100)</th>
              <th className="py-3 px-3 text-right">MoM Change %</th>
              <th className="py-3 px-3 text-right">YoY Inflation Rate</th>
              <th className="py-3 px-3 text-right">Real $100 Purchasing Power</th>
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
