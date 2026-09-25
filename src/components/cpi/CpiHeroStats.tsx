import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShieldCheck, DollarSign, Calendar, Info } from 'lucide-react';
import { CpiLatest } from '../../types/cpi';
import { calculatePurchasingPower } from '../../utils/cpiUtils';

interface CpiHeroStatsProps {
  latest: CpiLatest;
  coreYoY?: number;
  coreIndex?: number;
  dataLastUpdated: string;
  onOpenBreakdown: () => void;
}

export const CpiHeroStats: React.FC<CpiHeroStatsProps> = ({
  latest,
  coreYoY = 2.10,
  coreIndex = 102.81,
  dataLastUpdated,
  onOpenBreakdown,
}) => {
  const purchasingPower = calculatePurchasingPower(latest.value, 100);
  const isMomPositive = latest.momPercent >= 0;
  const isYoyPositive = latest.yoyPercent >= 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f141f] shadow-xs">
      {/* Background Subtle Ambience / Scrim */}
      <div className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-25 overflow-hidden">
        <img
          src="/src/assets/images/singapore_financial_skyline_1790326092088.jpg"
          alt="Singapore Financial District"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0f141f] dark:via-[#0f141f]/80 dark:to-transparent" />
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Top Header Row with Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              <span>National Macroeconomic Benchmark</span>
              <span aria-hidden="true">·</span>
              <span>SingStat TableBuilder M213751</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Singapore Consumer Price Index
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Monthly measure of price change across the representative Singapore household consumption basket.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-900/80 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 self-start sm:self-auto">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              <span>Vintage:</span>
              <strong className="text-neutral-900 dark:text-white font-mono">{latest.period}</strong>
            </div>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">|</span>
            <div>
              <span>Updated:</span>{' '}
              <span className="font-mono text-neutral-900 dark:text-white">{dataLastUpdated}</span>
            </div>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">|</span>
            <div>
              <span>Base Year:</span>{' '}
              <span className="font-mono text-neutral-900 dark:text-white font-semibold">2024 = 100</span>
            </div>
          </div>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Headline CPI */}
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="font-medium">Headline All Items Index</span>
              <span className="text-[11px] font-mono">2024 = 100</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-900 dark:text-white tracking-tight tabular-nums">
                {latest.value.toFixed(3)}
              </span>
              <span className="text-xs font-medium text-neutral-500">pts</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-neutral-500">MoM:</span>
              <span className={`inline-flex items-center font-mono font-semibold ${isMomPositive ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {isMomPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {isMomPositive ? `+${latest.momPercent.toFixed(2)}%` : `${latest.momPercent.toFixed(2)}%`}
              </span>
              <span className="text-neutral-400 dark:text-neutral-600">({latest.momChange > 0 ? `+${latest.momChange.toFixed(3)}` : latest.momChange.toFixed(3)})</span>
            </div>
          </div>

          {/* Card 2: Year-on-Year Inflation */}
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="font-medium">YoY Headline Inflation</span>
              <span className="text-[11px] text-neutral-400">vs {latest.yoyPeriod}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight tabular-nums ${isYoyPositive ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {isYoyPositive ? `+${latest.yoyPercent.toFixed(2)}%` : `${latest.yoyPercent.toFixed(2)}%`}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Annual trajectory:</span>
              <span className="font-mono text-neutral-700 dark:text-neutral-300">
                +{latest.yoyChange.toFixed(3)} pts vs 2025
              </span>
            </div>
          </div>

          {/* Card 3: MAS Core Inflation */}
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                MAS Core Inflation
              </span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Policy Gauge</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-900 dark:text-white tracking-tight tabular-nums">
                +{coreYoY.toFixed(2)}%
              </span>
              <span className="text-xs font-mono text-neutral-500">YoY</span>
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate" title="Excludes accommodation and private road transport">
              Excl. Accom &amp; Transport · Index {coreIndex.toFixed(2)}
            </div>
          </div>

          {/* Card 4: Real Purchasing Power */}
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
              <span className="font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                Real Purchasing Power
              </span>
              <span className="text-[11px] text-neutral-400">Base $100</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-900 dark:text-white tracking-tight tabular-nums">
                ${purchasingPower.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-neutral-500">SGD</span>
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Purchasing power of $100 SGD in 2024 terms
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
