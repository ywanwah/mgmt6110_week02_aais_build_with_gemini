import React, { useState } from 'react';
import { ChevronDown, TrendingUp, Activity, Pause, Play, RefreshCw, Layers } from 'lucide-react';
import { MarketCategory } from '../types';

interface HeroProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  isLiveUpdating: boolean;
  onToggleLive: () => void;
  activeViewMode: 'dashboard' | 'heatmap' | 'watchlist';
  onSelectViewMode: (mode: 'dashboard' | 'heatmap' | 'watchlist') => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onSelectCategory,
  isLiveUpdating,
  onToggleLive,
  activeViewMode,
  onSelectViewMode,
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

  return (
    <section className="pt-10 pb-8 text-center relative max-w-[1280px] mx-auto px-4 md:px-6">
      {/* Top Session Status Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 text-xs text-[#787B86] dark:text-[#9ea2b5]">
        <div className="flex items-center gap-1.5 bg-[#f3f2ff] dark:bg-[#232632] px-3 py-1 rounded-full border border-[#E0E3EB] dark:border-[#383b48]">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-ping" />
          <span className="font-semibold text-[#191b24] dark:text-[#ededfa]">US Markets:</span>
          <span className="text-[#089981] font-medium">Regular Session Open</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 bg-[#f3f2ff] dark:bg-[#232632] px-3 py-1 rounded-full border border-[#E0E3EB] dark:border-[#383b48]">
          <span className="text-[#191b24] dark:text-[#ededfa] font-medium">Tokyo:</span>
          <span>Closed</span>
          <span className="text-[#787B86]">•</span>
          <span className="text-[#191b24] dark:text-[#ededfa] font-medium">London:</span>
          <span>Closed</span>
        </div>

        {/* Live Ticks Toggle */}
        <button
          onClick={onToggleLive}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-all ${
            isLiveUpdating
              ? 'bg-[#089981]/10 text-[#089981] border-[#089981]/30 hover:bg-[#089981]/20'
              : 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20'
          }`}
          title="Toggle live price stream simulation"
        >
          {isLiveUpdating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{isLiveUpdating ? 'Live Ticks (Active)' : 'Ticks (Paused)'}</span>
        </button>
      </div>

      {/* Main Hero Title with Chevron Dropdown */}
      <div className="relative inline-block">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="group flex items-center justify-center gap-2 md:gap-3 text-center mx-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2962ff] rounded-2xl p-2 transition-transform active:scale-[0.99]"
          id="hero-title-dropdown"
        >
          <h1 className="font-['Hanken_Grotesk'] text-[40px] md:text-[64px] font-bold tracking-tight text-[#191b24] dark:text-white leading-[1.1] select-none">
            Markets, everywhere
          </h1>
          <ChevronDown
            className={`w-9 h-9 md:w-12 md:h-12 text-[#191b24] dark:text-white transition-transform duration-300 ${
              dropdownOpen ? 'rotate-180 text-[#2962ff]' : 'group-hover:translate-y-1'
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[340px] sm:w-[420px] bg-white dark:bg-[#232632] rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#383b48] p-3 z-30 text-left animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 text-xs font-bold text-[#787B86] uppercase tracking-wider border-b border-[#E0E3EB] dark:border-[#383b48] mb-1 flex items-center justify-between">
                <span>Switch Market Desk</span>
                <span className="font-normal lowercase text-[11px]">click to explore</span>
              </div>
              <div className="space-y-1 max-h-[380px] overflow-y-auto">
                {marketViews.map((item) => {
                  const isSelected = selectedCategory === item.cat;
                  return (
                    <button
                      key={item.cat}
                      onClick={() => {
                        onSelectCategory(item.cat);
                        setDropdownOpen(false);
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-colors flex items-start justify-between ${
                        isSelected
                          ? 'bg-[#2962ff] text-white shadow-sm'
                          : 'hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a] text-[#191b24] dark:text-[#ededfa]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">{item.label}</div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSelected ? 'text-blue-100' : 'text-[#787B86] dark:text-[#9ea2b5]'
                          }`}
                        >
                          {item.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium mt-0.5">
                          Active
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

      <p className="mt-2 text-[#5a5e6b] dark:text-[#9ea2b5] text-sm md:text-base max-w-xl mx-auto font-['Inter']">
        Track real-time prices, global equities, digital assets, commodities, and macroeconomic indicators with precision.
      </p>

      {/* View Mode Switcher Pills (Dashboard Table, Sector Heatmap, Watchlist) */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => onSelectViewMode('dashboard')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeViewMode === 'dashboard'
              ? 'bg-[#191b24] dark:bg-white text-white dark:text-[#191b24] shadow-sm'
              : 'bg-[#f3f2ff] dark:bg-[#232632] text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white border border-[#E0E3EB] dark:border-[#383b48]'
          }`}
          id="view-mode-dashboard-btn"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Market Stream</span>
        </button>

        <button
          onClick={() => onSelectViewMode('heatmap')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeViewMode === 'heatmap'
              ? 'bg-[#191b24] dark:bg-white text-white dark:text-[#191b24] shadow-sm'
              : 'bg-[#f3f2ff] dark:bg-[#232632] text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white border border-[#E0E3EB] dark:border-[#383b48]'
          }`}
          id="view-mode-heatmap-btn"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Sector Heatmap</span>
        </button>

        <button
          onClick={() => onSelectViewMode('watchlist')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeViewMode === 'watchlist'
              ? 'bg-[#191b24] dark:bg-white text-white dark:text-[#191b24] shadow-sm'
              : 'bg-[#f3f2ff] dark:bg-[#232632] text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white border border-[#E0E3EB] dark:border-[#383b48]'
          }`}
          id="view-mode-watchlist-btn"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>My Watchlist</span>
        </button>
      </div>
    </section>
  );
};
