import React from 'react';
import { Calendar, TrendingUp, TrendingDown, ArrowRight, DollarSign, BarChart3, AlertCircle } from 'lucide-react';
import { EconomicIndicator } from '../types';
import { Sparkline } from './Sparkline';

interface EconomySectionProps {
  indicators: EconomicIndicator[];
  onSelectIndicator?: (indicator: EconomicIndicator) => void;
}

export const EconomySection: React.FC<EconomySectionProps> = ({ indicators }) => {
  return (
    <div className="space-y-6">
      {/* Overview Macro Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1f222e] border border-[#E0E3EB] dark:border-[#2e303a] rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-[#787B86] mb-2">
            <span className="font-semibold uppercase font-['JetBrains_Mono']">Fed Policy Benchmark</span>
            <span className="bg-[#089981]/10 text-[#089981] px-2 py-0.5 rounded-full font-semibold">Easing Cycle</span>
          </div>
          <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#191b24] dark:text-white">
            4.50% - 4.75%
          </div>
          <p className="text-xs text-[#787B86] mt-1">Next FOMC Decision: Dec 18, 2024 (78% probability of 25bps cut)</p>
        </div>

        <div className="bg-white dark:bg-[#1f222e] border border-[#E0E3EB] dark:border-[#2e303a] rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-[#787B86] mb-2">
            <span className="font-semibold uppercase font-['JetBrains_Mono']">US Headline CPI</span>
            <span className="bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-semibold">+2.6% YoY</span>
          </div>
          <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#191b24] dark:text-white">
            2.60%
          </div>
          <p className="text-xs text-[#787B86] mt-1">Core CPI steady at 3.3%, services disinflation progressing</p>
        </div>

        <div className="bg-white dark:bg-[#1f222e] border border-[#E0E3EB] dark:border-[#2e303a] rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-[#787B86] mb-2">
            <span className="font-semibold uppercase font-['JetBrains_Mono']">10Y-2Y Yield Curve</span>
            <span className="bg-[#089981]/10 text-[#089981] px-2 py-0.5 rounded-full font-semibold">Dis-inverted</span>
          </div>
          <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#089981]">
            +14 bps
          </div>
          <p className="text-xs text-[#787B86] mt-1">Steepening curve signaling economic normalization</p>
        </div>
      </div>

      {/* Detailed Macro Indicators Table */}
      <div className="bg-white dark:bg-[#1f222e] rounded-2xl border border-[#E0E3EB] dark:border-[#2e303a] shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-[#E0E3EB] dark:border-[#2e303a] flex items-center justify-between">
          <div>
            <h3 className="font-['Hanken_Grotesk'] text-base md:text-lg font-bold text-[#191b24] dark:text-white">
              Key Macroeconomic Data Releases
            </h3>
            <p className="text-xs text-[#787B86]">Global economic indicators, central bank releases, and inflation metrics</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] dark:border-[#2e303a] bg-[#faf8ff] dark:bg-[#232632]/60 text-[11px] font-['JetBrains_Mono'] text-[#787B86] uppercase tracking-wider">
                <th className="py-3 px-4">Indicator & Country</th>
                <th className="py-3 px-4 text-right">Actual</th>
                <th className="py-3 px-4 text-right">Forecast</th>
                <th className="py-3 px-4 text-right">Previous</th>
                <th className="py-3 px-4 text-center">Impact</th>
                <th className="py-3 px-4 text-center">Historical Trend</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2e303a] text-sm font-['Inter']">
              {indicators.map((ind) => (
                <tr key={ind.id} className="hover:bg-[#faf8ff] dark:hover:bg-[#282c3b] transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#191b24] dark:text-white">{ind.name}</div>
                    <div className="text-xs text-[#787B86]">{ind.country}</div>
                  </td>
                  <td className="py-4 px-4 text-right font-['JetBrains_Mono'] font-bold text-[#191b24] dark:text-white">
                    {ind.currentValue}
                  </td>
                  <td className="py-4 px-4 text-right font-['JetBrains_Mono'] text-[#787B86]">
                    {ind.forecastValue}
                  </td>
                  <td className="py-4 px-4 text-right font-['JetBrains_Mono'] text-[#787B86]">
                    {ind.previousValue}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        ind.impact === 'High'
                          ? 'bg-[#F23645]/10 text-[#F23645]'
                          : ind.impact === 'Medium'
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-blue-500/10 text-blue-600'
                      }`}
                    >
                      {ind.impact}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center">
                      <Sparkline
                        data={ind.sparkline}
                        isPositive={ind.trend !== 'down'}
                        width={90}
                        height={24}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-xs text-[#787B86] font-['JetBrains_Mono']">
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
