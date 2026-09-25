import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, RotateCcw, AlertCircle, DollarSign, PieChart, Sparkles } from 'lucide-react';

interface CpiPersonalCalculatorProps {
  headlineYoY: number; // e.g. 2.35
}

interface BudgetCategory {
  id: string;
  name: string;
  defaultWeight: number;
  inflationYoY: number; // Specific category inflation rate
  description: string;
}

const CATEGORIES: BudgetCategory[] = [
  { id: 'food', name: 'Food & Dining Out', defaultWeight: 21, inflationYoY: 2.26, description: 'Hawker meals, food courts, restaurants & supermarket groceries' },
  { id: 'housing', name: 'Housing & Utilities', defaultWeight: 25, inflationYoY: 2.92, description: 'Rent, maintenance, SP Group electricity tariffs & water bills' },
  { id: 'transport', name: 'Transport & Commute', defaultWeight: 17, inflationYoY: 1.84, description: 'MRT/Bus fares, Grab rides, petrol & car maintenance' },
  { id: 'healthcare', name: 'Healthcare & Wellness', defaultWeight: 7, inflationYoY: 3.45, description: 'GP polyclinics, dental, specialist visits & prescriptions' },
  { id: 'education', name: 'Education & Tuition', defaultWeight: 6, inflationYoY: 2.15, description: 'School/university fees, enrichment courses & books' },
  { id: 'recreation', name: 'Recreation & Travel', defaultWeight: 8, inflationYoY: 1.90, description: 'Overseas flights, hotels, cinemas & streaming services' },
  { id: 'other', name: 'Clothing & Misc Services', defaultWeight: 16, inflationYoY: 2.20, description: 'Apparel, personal grooming, domestic services & insurance' },
];

const PRESETS = [
  {
    name: 'National Average',
    weights: { food: 21, housing: 25, transport: 17, healthcare: 7, education: 6, recreation: 8, other: 16 }
  },
  {
    name: 'Young Professional',
    weights: { food: 32, housing: 30, transport: 15, healthcare: 3, education: 2, recreation: 14, other: 4 }
  },
  {
    name: 'Family with Children',
    weights: { food: 24, housing: 26, transport: 14, healthcare: 6, education: 18, recreation: 6, other: 6 }
  },
  {
    name: 'Senior / Retiree',
    weights: { food: 25, housing: 28, transport: 8, healthcare: 22, education: 0, recreation: 7, other: 10 }
  }
];

export const CpiPersonalCalculator: React.FC<CpiPersonalCalculatorProps> = ({ headlineYoY }) => {
  const [monthlySpend, setMonthlySpend] = useState<number>(5000);
  const [weights, setWeights] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    CATEGORIES.forEach((c) => {
      init[c.id] = c.defaultWeight;
    });
    return init;
  });

  const totalWeight = useMemo(() => {
    return Object.values(weights).reduce((a: number, b: number) => a + b, 0);
  }, [weights]);

  // Compute weighted personal inflation
  const personalInflationYoY = useMemo(() => {
    if (totalWeight <= 0) return headlineYoY;
    const weightedSum = CATEGORIES.reduce((acc, cat) => {
      const w = weights[cat.id] || 0;
      return acc + (w / totalWeight) * cat.inflationYoY;
    }, 0);
    return Number(weightedSum.toFixed(2));
  }, [weights, totalWeight, headlineYoY]);

  // Difference vs National
  const inflationDelta = Number((personalInflationYoY - headlineYoY).toFixed(2));
  const extraMonthlyCost = Number(((monthlySpend * personalInflationYoY) / 100).toFixed(2));
  const nationalExtraCost = Number(((monthlySpend * headlineYoY) / 100).toFixed(2));
  const monthlyCostDelta = Number((extraMonthlyCost - nationalExtraCost).toFixed(2));

  const handleSliderChange = (id: string, val: number) => {
    setWeights((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(100, val))
    }));
  };

  const applyPreset = (presetWeights: Record<string, number>) => {
    setWeights({ ...presetWeights });
  };

  const resetDefaults = () => {
    const init: Record<string, number> = {};
    CATEGORIES.forEach((c) => {
      init[c.id] = c.defaultWeight;
    });
    setWeights(init);
    setMonthlySpend(5000);
  };

  return (
    <section className="bg-white dark:bg-[#0f141f] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs transition-colors">
      
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              Personal Inflation Rate Simulator
            </h2>
            <span className="text-xs text-neutral-400">·</span>
            <span className="text-xs font-mono text-neutral-500">Custom Household Modeling</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Compare your actual living costs against the official Headline CPI based on your household's specific spending basket.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Weights</span>
        </button>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <span className="text-xs text-neutral-500 font-medium shrink-0">Profile Presets:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset.weights)}
            className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors whitespace-nowrap"
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Configuration Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Monthly Budget Input */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="monthly-budget-input" className="text-xs font-semibold text-neutral-900 dark:text-white">
                Household Monthly Expenditure (SGD)
              </label>
              <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white tabular-nums">
                ${monthlySpend.toLocaleString()} SGD
              </span>
            </div>
            <input
              id="monthly-budget-input"
              type="range"
              min={1000}
              max={25000}
              step={250}
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
              <span>$1,000</span>
              <span>$10,000</span>
              <span>$25,000</span>
            </div>
          </div>

          {/* Individual Category Sliders */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-neutral-500">
              <span>Expenditure Category</span>
              <span>Share of Budget (%)</span>
            </div>

            {CATEGORIES.map((cat) => {
              const currentVal = weights[cat.id] || 0;
              const normalizedPct = totalWeight > 0 ? ((currentVal / totalWeight) * 100).toFixed(1) : '0';

              return (
                <div key={cat.id} className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/30">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      {cat.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-neutral-400">
                        cat rate: +{cat.inflationYoY.toFixed(2)}%
                      </span>
                      <span className="font-mono font-bold text-xs text-neutral-900 dark:text-white tabular-nums w-12 text-right">
                        {normalizedPct}%
                      </span>
                    </div>
                  </div>
                  
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={1}
                    value={currentVal}
                    onChange={(e) => handleSliderChange(cat.id, Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-neutral-400 mt-1 truncate">
                    {cat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results & Side-by-Side Comparison Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 sticky top-24">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">
              Simulation Outcome
            </span>
            
            <div className="mb-4">
              <span className="text-xs text-neutral-500">Your Household's Personal Inflation Rate:</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-neutral-900 dark:text-white tabular-nums">
                  +{personalInflationYoY.toFixed(2)}%
                </span>
                <span className="text-xs text-neutral-500">YoY</span>
              </div>
            </div>

            {/* Comparison Pill */}
            <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs mb-5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-neutral-500">National Headline CPI:</span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                  +{headlineYoY.toFixed(2)}% YoY
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Variance vs National:</span>
                <span className={`font-mono font-bold ${inflationDelta > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {inflationDelta > 0 ? `+${inflationDelta.toFixed(2)}% higher` : `${Math.abs(inflationDelta).toFixed(2)}% lower`}
                </span>
              </div>
            </div>

            {/* Estimated Additional Monthly Expense */}
            <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <div>
                <span className="text-xs text-neutral-500">Additional Cost to Maintain Living Standard:</span>
                <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white tabular-nums mt-0.5">
                  +${extraMonthlyCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} SGD <span className="text-xs font-normal text-neutral-500">/ mo</span>
                </div>
              </div>

              {monthlyCostDelta !== 0 && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Based on your spending mix, you are paying approximately{' '}
                  <strong className="text-neutral-900 dark:text-white font-mono">
                    {monthlyCostDelta > 0 ? `+$${monthlyCostDelta.toFixed(2)}` : `-$${Math.abs(monthlyCostDelta).toFixed(2)}`}
                  </strong>{' '}
                  {monthlyCostDelta > 0 ? 'more' : 'less'} per month compared to the Singapore median consumption basket.
                </p>
              )}
            </div>

            {/* Recommendation Insight */}
            <div className="mt-5 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200">
              <span className="font-semibold block mb-0.5">Household Budget Tip:</span>
              Categories with the steepest current price momentum are Healthcare (+3.45% YoY) and Housing & Utilities (+2.92% YoY).
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
