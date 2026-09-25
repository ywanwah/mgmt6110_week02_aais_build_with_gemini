import React from 'react';
import { Calendar, TrendingUp, TrendingDown, ArrowRight, DollarSign, BarChart3, AlertCircle, Percent, Activity } from 'lucide-react';
import { EconomicIndicator } from '../types';
import { Sparkline } from './Sparkline';

interface EconomySectionProps {
  indicators: EconomicIndicator[];
  onSelectIndicator?: (indicator: EconomicIndicator) => void;
}

export const EconomySection: React.FC<EconomySectionProps> = ({ indicators }) => {
  return (
    <div className="space-y-4 max-w-[1440px] mx-auto">
      {/* Top Macro Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Fed Policy Benchmark */}
        <div className="bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#787b86] mb-1.5 font-['JetBrains_Mono']">
            <span className="font-bold uppercase">Fed Policy Benchmark</span>
            <span className="bg-[#089981]/15 text-[#089981] px-2 py-0.5 rounded font-bold">Easing Cycle</span>
          </div>
          <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#131722] dark:text-white">
            4.50% - 4.75%
          </div>
          <p className="text-xs text-[#787b86] mt-1 font-['Inter']">
            FOMC Target Rate (82% probability of 25bps cut on next decision)
          </p>
        </div>

        {/* US Headline CPI */}
        <div className="bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#787b86] mb-1.5 font-['JetBrains_Mono']">
            <span className="font-bold uppercase">US Headline CPI (YoY)</span>
            <span className="bg-amber-500/15 text-amber-500 px-2 py-0.5 rounded font-bold">+2.6% YoY</span>
          </div>
          <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#131722] dark:text-white">
            2.60%
          </div>
          <p className="text-xs text-[#787b86] mt-1 font-['Inter']">
            Core CPI steady at 3.3%, shelter components easing gradually
          </p>
        </div>

        {/* 10Y-2Y Yield Curve Spread */}
        <div className="bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-[11px] text-[#787b86] mb-1.5 font-['JetBrains_Mono']">
            <span className="font-bold uppercase">10Y-2Y Yield Curve</span>
            <span className="bg-[#089981]/15 text-[#089981] px-2 py-0.5 rounded font-bold">Normalizing</span>
          </div>
          <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#089981]">
            +14 bps
          </div>
          <p className="text-xs text-[#787b86] mt-1 font-['Inter']">
            Dis-inversion steepening signaling economic growth stabilization
          </p>
        </div>
      </div>

      {/* Detailed Macro Indicators Table */}
      <div className="bg-white dark:bg-[#12151e] rounded-xl border border-[#e0e3eb] dark:border-[#202533] shadow-xs overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-[#e0e3eb] dark:border-[#202533] flex items-center justify-between bg-[#fafbfe] dark:bg-[#151924]">
          <div>
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#131722] dark:text-white">
              Key Macroeconomic Data Releases & Fed Watch
            </h3>
            <p className="text-xs text-[#787b86]">Central bank decisions, labor prints, inflation gauges & bond yields</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e0e3eb] dark:border-[#202533] bg-[#f0f3fa] dark:bg-[#161a26] text-[10px] font-['JetBrains_Mono'] text-[#787b86] uppercase tracking-wider">
                <th className="py-2.5 px-4">Indicator & Country</th>
                <th className="py-2.5 px-4 text-right">Actual</th>
                <th className="py-2.5 px-4 text-right">Forecast</th>
                <th className="py-2.5 px-4 text-right">Previous</th>
                <th className="py-2.5 px-4 text-center">Impact Level</th>
                <th className="py-2.5 px-4 text-center">Trend Sparkline</th>
                <th className="py-2.5 px-4 text-right">Release Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#202533] text-xs font-['Inter']">
              {indicators.map((ind) => (
                <tr key={ind.id} className="hover:bg-[#f0f3fa]/80 dark:hover:bg-[#1a1e2b] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-xs text-[#131722] dark:text-white">{ind.name}</div>
                    <div className="text-[11px] text-[#787b86] font-mono">{ind.country}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-['JetBrains_Mono'] font-bold text-xs text-[#131722] dark:text-white">
                    {ind.currentValue}
                  </td>
                  <td className="py-3 px-4 text-right font-['JetBrains_Mono'] text-xs text-[#787b86]">
                    {ind.forecastValue}
                  </td>
                  <td className="py-3 px-4 text-right font-['JetBrains_Mono'] text-xs text-[#787b86]">
                    {ind.previousValue}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        ind.impact === 'High'
                          ? 'bg-[#f23645]/15 text-[#f23645]'
                          : ind.impact === 'Medium'
                          ? 'bg-amber-500/15 text-amber-500'
                          : 'bg-blue-500/15 text-blue-500'
                      }`}
                    >
                      {ind.impact}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center">
                      <Sparkline
                        data={ind.sparkline}
                        isPositive={ind.trend !== 'down'}
                        width={85}
                        height={20}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-[11px] text-[#787b86] font-['JetBrains_Mono']">
                    {ind.releaseDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
