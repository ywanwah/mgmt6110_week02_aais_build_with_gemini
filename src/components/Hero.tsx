import React, { useState } from 'react';
import {
  ChevronDown,
  TrendingUp,
  Activity,
  Pause,
  Play,
  Layers,
  Download,
  Gauge,
  Sliders,
  BarChart3,
  Flame,
} from 'lucide-react';
import { MarketCategory, MarketItem } from '../types';

interface HeroProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  isLiveUpdating: boolean;
  onToggleLive: () => void;
  activeViewMode: 'dashboard' | 'heatmap' | 'watchlist' | 'macro';
  onSelectViewMode: (mode: 'dashboard' | 'heatmap' | 'watchlist' | 'macro') => void;
  items: MarketItem[];
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onSelectCategory,
  isLiveUpdating,
  onToggleLive,
  activeViewMode,
  onSelectViewMode,
  items,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const marketViews: { label: string; cat: MarketCategory; desc: string }[] = [
    { label: 'US Equities & Major Indices', cat: 'US stocks', desc: 'S&P 500, Nasdaq 100, Dow 30, Big Tech' },
    { label: 'World Stock Markets', cat: 'World stocks', desc: 'FTSE, DAX, Nikkei 225, Hang Seng' },
    { label: 'Cryptocurrency 24/7', cat: 'Crypto', desc: 'Bitcoin, Ethereum, Solana, Altcoins' },
    { label: 'Commodities & Energy Futures', cat: 'Futures', desc: 'Crude Oil, Gold, Silver, Natural Gas' },
    { label: 'Foreign Exchange (Forex)', cat: 'Forex', desc: 'EUR/USD, GBP/USD, USD/JPY' },
    { label: 'Macroeconomic Releases', cat: 'Economy', desc: 'Fed Rates, CPI Inflation, GDP, Yields' },
  ];

  const handleExportCSV = () => {
    const headers = ['Symbol,Name,Category,Price,Change,ChangePercent,Volume,High24h,Low24h'];
    const rows = items.map(
      (i) =>
        `"${i.symbol}","${i.name}","${i.category}",${i.price},${i.change},${i.changePercent},"${i.volume}",${i.high24h},${i.low24h}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `financialhub_markets_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Breadth statistics calculation
  const totalInCat = items.filter((i) => i.category === selectedCategory);
  const advancing = totalInCat.filter((i) => i.change >= 0).length;
  const declining = totalInCat.filter((i) => i.change < 0).length;
  const advancePercent = totalInCat.length > 0 ? (advancing / totalInCat.length) * 100 : 60;

  return (
    <section className="pt-6 pb-4 max-w-[1440px] mx-auto px-3 md:px-6">
      {/* Top Institutional Telemetry & Market Breadth Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {/* Metric 1: Market Session */}
        <div className="bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] p-2.5 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[10px] text-[#787b86] font-['JetBrains_Mono'] uppercase tracking-wider font-semibold">
              NYSE / NASDAQ
            </div>
            <div className="text-xs font-bold text-[#089981] flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse" />
              <span>Regular Session Open</span>
            </div>
          </div>
          <span className="text-[11px] font-['JetBrains_Mono'] text-[#787b86]">09:30-16:00 EST</span>
        </div>

        {/* Metric 2: Market Breadth */}
        <div className="bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] p-2.5 rounded-xl flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] uppercase font-semibold text-[#787b86]">
            <span>Market Breadth ({selectedCategory})</span>
            <span>
              <strong className="text-[#089981]">{advancing}</strong> : <strong className="text-[#f23645]">{declining}</strong>
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#f23645]/40 rounded-full overflow-hidden mt-1.5 flex">
            <div
              className="h-full bg-[#089981] rounded-full transition-all duration-300"
              style={{ width: `${advancePercent}%` }}
            />
          </div>
        </div>

        {/* Metric 3: VIX Volatility Index */}
        <div className="bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] p-2.5 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[10px] text-[#787b86] font-['JetBrains_Mono'] uppercase tracking-wider font-semibold">
              CBOE Volatility (VIX)
            </div>
            <div className="text-xs font-bold font-['JetBrains_Mono'] text-[#131722] dark:text-white mt-0.5">
              14.28 <span className="text-[#089981] font-semibold text-[11px]">-3.18%</span>
            </div>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#089981]/10 text-[#089981] font-bold">
            LOW RISK
          </span>
        </div>

        {/* Metric 4: Fear & Greed Index */}
        <div className="bg-white dark:bg-[#12151e] border border-[#e0e3eb] dark:border-[#202533] p-2.5 rounded-xl flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[10px] text-[#787b86] font-['JetBrains_Mono'] uppercase tracking-wider font-semibold flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500" />
              <span>Fear & Greed Index</span>
            </div>
            <div className="text-xs font-bold font-['JetBrains_Mono'] text-amber-500 mt-0.5">
              68 <span className="text-[11px] font-normal text-[#787b86]">(Greed)</span>
            </div>
          </div>
          {/* Live Tick Simulator Toggle Button */}
          <button
            onClick={onToggleLive}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-['JetBrains_Mono'] font-bold transition-all flex items-center gap-1 ${
              isLiveUpdating
                ? 'bg-[#089981]/10 text-[#089981] border-[#089981]/30 hover:bg-[#089981]/20'
                : 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20'
            }`}
            title="Toggle Live Ticks"
          >
            {isLiveUpdating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isLiveUpdating ? 'LIVE' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Title & Desk Dropdown + Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-[#e0e3eb] dark:border-[#202533]">
        {/* Title + Desk Selector */}
        <div className="relative inline-block">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="group flex items-center gap-2 text-left focus:outline-none"
              id="hero-title-dropdown"
            >
              <h1 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-extrabold tracking-tight text-[#131722] dark:text-white select-none">
                Markets, everywhere
              </h1>
              <ChevronDown
                className={`w-6 h-6 text-[#131722] dark:text-white transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-[#2962ff]' : 'group-hover:translate-y-0.5'
                }`}
              />
            </button>

            <span className="text-xs font-['JetBrains_Mono'] text-[#2962ff] bg-[#2962ff]/10 border border-[#2962ff]/20 px-2 py-0.5 rounded font-bold uppercase hidden sm:inline-block">
              {selectedCategory}
            </span>
          </div>

          {/* Desk Dropdown */}
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)} />
              <div className="absolute left-0 mt-2 w-[340px] sm:w-[400px] bg-white dark:bg-[#1a1e2b] rounded-xl shadow-2xl border border-[#d8dce6] dark:border-[#2a2f40] p-2.5 z-30 text-left animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#787b86] uppercase tracking-wider border-b border-[#d8dce6] dark:border-[#2a2f40] mb-1 flex items-center justify-between font-mono">
                  <span>Switch Market Desk</span>
                  <span className="text-[10px] text-[#2962ff]">Real-Time Data</span>
                </div>
                <div className="space-y-1 max-h-[360px] overflow-y-auto">
                  {marketViews.map((item) => {
                    const isSelected = selectedCategory === item.cat;
                    return (
                      <button
                        key={item.cat}
                        onClick={() => {
                          onSelectCategory(item.cat);
                          setDropdownOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-lg text-left transition-colors flex items-start justify-between ${
                          isSelected
                            ? 'bg-[#2962ff] text-white shadow-sm'
                            : 'hover:bg-[#f0f3fa] dark:hover:bg-[#232738] text-[#131722] dark:text-[#d1d4dc]'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-xs">{item.label}</div>
                          <div
                            className={`text-[11px] mt-0.5 ${
                              isSelected ? 'text-blue-100' : 'text-[#787b86]'
                            }`}
                          >
                            {item.desc}
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
                            ACTIVE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* View Switchers & Export Toolbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {/* Mode 1: Market Stream Grid */}
          <button
            onClick={() => onSelectViewMode('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'dashboard'
                ? 'bg-[#2962ff] text-white shadow-sm'
                : 'bg-[#f0f3fa] dark:bg-[#1a1e2b] text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white border border-[#d8dce6] dark:border-[#2a2f40]'
            }`}
            id="view-mode-dashboard-btn"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Market Stream</span>
          </button>

          {/* Mode 2: Sector Heatmap */}
          <button
            onClick={() => onSelectViewMode('heatmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'heatmap'
                ? 'bg-[#2962ff] text-white shadow-sm'
                : 'bg-[#f0f3fa] dark:bg-[#1a1e2b] text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white border border-[#d8dce6] dark:border-[#2a2f40]'
            }`}
            id="view-mode-heatmap-btn"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Heatmap</span>
          </button>

          {/* Mode 3: Watchlist */}
          <button
            onClick={() => onSelectViewMode('watchlist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'watchlist'
                ? 'bg-[#2962ff] text-white shadow-sm'
                : 'bg-[#f0f3fa] dark:bg-[#1a1e2b] text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white border border-[#d8dce6] dark:border-[#2a2f40]'
            }`}
            id="view-mode-watchlist-btn"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Watchlist</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="p-1.5 px-2.5 rounded-lg border border-[#d8dce6] dark:border-[#2a2f40] bg-[#f0f3fa] dark:bg-[#1a1e2b] text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
            title="Export Market Data to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>
    </section>
  );
};
