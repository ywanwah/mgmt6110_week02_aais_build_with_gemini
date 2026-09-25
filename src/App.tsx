import React, { useState, useEffect, useCallback } from 'react';
import { CpiHeader } from './components/cpi/CpiHeader';
import { CpiHeroStats } from './components/cpi/CpiHeroStats';
import { CpiTrendChart } from './components/cpi/CpiTrendChart';
import { CpiCategoriesTable } from './components/cpi/CpiCategoriesTable';
import { CpiPersonalCalculator } from './components/cpi/CpiPersonalCalculator';
import { CpiHistoricalLedger } from './components/cpi/CpiHistoricalLedger';
import { CpiHealthModal } from './components/cpi/CpiHealthModal';
import { CpiFooter } from './components/cpi/CpiFooter';
import { initialCpiData } from './data/singstatData';
import { CpiApiResponse, CpiViewTab } from './types/cpi';
import { exportCpiToCsv, downloadJson } from './utils/cpiUtils';
import { AlertCircle, Check, ArrowRight, TrendingUp, TrendingDown, Layers, ShieldCheck } from 'lucide-react';

export default function App() {
  const [cpiData, setCpiData] = useState<CpiApiResponse>(initialCpiData);
  const [activeTab, setActiveTab] = useState<CpiViewTab>('overview');
  const [isHealthModalOpen, setIsHealthModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Set default dark mode for institutional look
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Fetch CPI data from /api/cpi
  const loadCpiData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    try {
      const res = await fetch('/api/cpi');
      if (res.ok) {
        const json = await res.json();
        if (json && !json.empty && json.latest) {
          // Merge with initial rich categories if backend only returns basic subset
          setCpiData({
            ...initialCpiData,
            ...json,
            categories: json.categories && json.categories.length >= 8 ? json.categories : initialCpiData.categories,
            recentMonthly: json.recentMonthly && json.recentMonthly.length > 0 ? json.recentMonthly : initialCpiData.recentMonthly,
          });
          setLastUpdatedTime(new Date().toLocaleTimeString());
          if (isManualRefresh) showToast('SingStat data refreshed successfully');
        }
      }
    } catch (err) {
      console.warn('Could not fetch from /api/cpi, using local SingStat dataset:', err);
    } finally {
      if (isManualRefresh) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCpiData();
  }, [loadCpiData]);

  // Quick movers for overview preview
  const topMovers = [...cpiData.categories]
    .filter((c) => c.seriesNo !== 'MAS.CORE')
    .sort((a, b) => Math.abs(b.yoyPercent) - Math.abs(a.yoyPercent))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#080c14] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors selection:bg-red-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold shadow-lg animate-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Institutional Top Bar */}
      <CpiHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHealthModal={() => setIsHealthModalOpen(true)}
        onExportCsv={() => {
          exportCpiToCsv(cpiData);
          showToast('Downloaded CPI Historical CSV');
        }}
        onExportJson={() => {
          downloadJson(cpiData, 'singstat_cpi_data.json');
          showToast('Exported SingStat JSON');
        }}
        onRefresh={() => loadCpiData(true)}
        isRefreshing={isRefreshing}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        lastUpdatedTime={lastUpdatedTime}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Tab 1: Overview & Macro Trends */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Primary KPI Ribbon */}
            <CpiHeroStats
              latest={cpiData.latest}
              dataLastUpdated={cpiData.dataLastUpdated}
              onOpenBreakdown={() => setActiveTab('breakdown')}
            />

            {/* Interactive Trend Chart */}
            <CpiTrendChart data={cpiData.recentMonthly} />

            {/* Overview Quick Drill-down Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Top Inflation Drivers */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0f141f] border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                      Top Price Volatility Drivers
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Largest annual price swings across major consumption groups
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('breakdown')}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                  {topMovers.map((m) => {
                    const isUp = m.yoyPercent >= 0;
                    return (
                      <div key={m.seriesNo} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex flex-col">
                          <span className="font-semibold text-neutral-900 dark:text-white">
                            {m.name}
                          </span>
                          <span className="text-[11px] text-neutral-400 font-mono">
                            Index: {m.value.toFixed(3)} · Weight: {m.weight ? `${m.weight}%` : '—'}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`font-mono font-bold ${isUp ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {isUp ? `+${m.yoyPercent.toFixed(2)}%` : `${m.yoyPercent.toFixed(2)}%`} YoY
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            {m.momPercent >= 0 ? `+${m.momPercent.toFixed(2)}%` : `${m.momPercent.toFixed(2)}%`} MoM
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: MAS Policy & Living Standard Gauge */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0f141f] border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                        Monetary Policy &amp; Living Costs
                      </h3>
                      <p className="text-xs text-neutral-500">
                        MAS S$NEER Policy Framework alignment &amp; household simulation
                      </p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    The Monetary Authority of Singapore (MAS) manages the exchange rate (S$NEER) rather than interest rates to stabilize domestic prices. Current MAS Core Inflation stands at <strong className="text-neutral-900 dark:text-white font-mono">+2.10% YoY</strong>, within the central bank's medium-term price stability target band of 1.5% to 2.5%.
                  </p>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>MAS Medium-Term Target:</span>
                      <span className="font-mono text-neutral-900 dark:text-white font-medium">1.5% – 2.5%</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-500">
                      <span>Current Core Position:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Within Target Range</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('calculator')}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
                >
                  <span>Simulate Your Household's Personal Inflation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Detailed Expenditure Categories */}
        {activeTab === 'breakdown' && (
          <div className="animate-in fade-in duration-200">
            <CpiCategoriesTable
              categories={cpiData.categories}
              latestPeriod={cpiData.latest.period}
            />
          </div>
        )}

        {/* Tab 3: Personal Inflation Simulator */}
        {activeTab === 'calculator' && (
          <div className="animate-in fade-in duration-200">
            <CpiPersonalCalculator headlineYoY={cpiData.latest.yoyPercent} />
          </div>
        )}

        {/* Tab 4: Historical Monthly Ledger */}
        {activeTab === 'ledger' && (
          <div className="animate-in fade-in duration-200">
            <CpiHistoricalLedger data={cpiData} />
          </div>
        )}

      </main>

      {/* Official Footnote & Attribution Footer */}
      <CpiFooter
        footnote={cpiData.footnote}
        dataLastUpdated={cpiData.dataLastUpdated}
      />

      {/* SingStat API Health Diagnostics Modal */}
      <CpiHealthModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />

    </div>
  );
}
