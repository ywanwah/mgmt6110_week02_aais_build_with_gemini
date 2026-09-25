import React from 'react';
import { Activity, Download, RefreshCw, Sun, Moon, Database } from 'lucide-react';
import { CpiViewTab } from '../../types/cpi';

interface CpiHeaderProps {
  activeTab: CpiViewTab;
  setActiveTab: (tab: CpiViewTab) => void;
  onOpenHealthModal: () => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  lastUpdatedTime: string;
}

export const CpiHeader: React.FC<CpiHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenHealthModal,
  onExportCsv,
  onExportJson,
  onRefresh,
  isRefreshing,
  darkMode,
  toggleDarkMode,
  lastUpdatedTime,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#0c1017]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single text element wordmark with domain metadata */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-red-600 dark:bg-red-700 flex items-center justify-center text-white font-bold text-sm shadow-xs select-none">
              SG
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                  Singapore CPI Terminal
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <span aria-hidden="true">·</span>
                  <span>SingStat Official</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">2024=100</span>
                </span>
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links / Segmented Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900/80 rounded-lg border border-neutral-200/80 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Overview & Trends
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'breakdown'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Expenditure Categories
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Personal Simulator
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'ledger'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Historical Ledger
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* API Health Button matching reference app */}
            <button
              id="open-health-modal"
              onClick={onOpenHealthModal}
              title="Inspect SingStat TableBuilder API Health Diagnostics"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700/80 transition-colors whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden lg:inline">API Health</span>
            </button>

            {/* Export Dropdown / Action */}
            <div className="relative group">
              <button
                onClick={onExportCsv}
                title="Download CSV data"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700/80 transition-colors whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            {/* Refresh Live Data */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title={`Last refreshed at ${lastUpdatedTime}`}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700/80 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700/80 transition-colors"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-neutral-200/60 dark:border-neutral-800 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-1 px-2 font-medium ${activeTab === 'overview' ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600' : 'text-neutral-500'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`py-1 px-2 font-medium ${activeTab === 'breakdown' ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600' : 'text-neutral-500'}`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-1 px-2 font-medium ${activeTab === 'calculator' ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600' : 'text-neutral-500'}`}
          >
            Simulator
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`py-1 px-2 font-medium ${activeTab === 'ledger' ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600' : 'text-neutral-500'}`}
          >
            Ledger
          </button>
        </div>
      </div>
    </header>
  );
};
