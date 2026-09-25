import React, { useState, useEffect } from 'react';
import {
  Search,
  Globe,
  User,
  Moon,
  Sun,
  Bell,
  Check,
  Volume2,
  VolumeX,
  Clock,
  Terminal,
  Keyboard,
  ShieldCheck,
} from 'lucide-react';
import { soundFX } from '../utils/sound';

interface HeaderProps {
  onOpenSearch: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGetStarted: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  activeNav,
  onSelectNav,
  darkMode,
  onToggleDarkMode,
  onOpenGetStarted,
  watchlistCount,
  onOpenWatchlist,
  onOpenShortcuts,
}) => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC'
      );
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.playTick('up');
  };

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'JA', name: '日本語' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'ES', name: 'Español' },
    { code: 'ZH', name: '中文 (简体)' },
  ];

  return (
    <header className="bg-white dark:bg-[#12151e] border-b border-[#e0e3eb] dark:border-[#202533] w-full sticky top-0 z-40 transition-colors duration-150">
      <div className="flex justify-between items-center h-[60px] px-3 md:px-6 w-full max-w-[1440px] mx-auto">
        {/* Left: Logo & Pro Terminal Badge & Search */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => onSelectNav('Markets')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            id="header-brand-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2962ff] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              FH
            </div>
            <div className="flex flex-col">
              <span className="font-['Hanken_Grotesk'] text-lg md:text-xl text-[#131722] dark:text-white font-bold tracking-tight leading-none">
                FinancialHub
              </span>
              <span className="text-[9px] font-['JetBrains_Mono'] text-[#2962ff] dark:text-[#5d8aff] font-bold tracking-widest uppercase mt-0.5">
                PRO TERMINAL
              </span>
            </div>
          </button>

          {/* Quick Search Trigger Input */}
          <div
            onClick={onOpenSearch}
            className="relative hidden md:flex items-center cursor-pointer group"
            id="header-search-trigger"
          >
            <Search className="absolute left-3 w-3.5 h-3.5 text-[#787b86] group-hover:text-[#2962ff] transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search ticker, index, macro..."
              className="pl-9 pr-14 py-1.5 bg-[#f0f3fa] dark:bg-[#1a1e2b] border border-[#d8dce6] dark:border-[#2a2f40] rounded-lg text-xs text-[#131722] dark:text-[#d1d4dc] cursor-pointer focus:outline-none focus:border-[#2962ff] w-56 lg:w-64 transition-all group-hover:border-[#2962ff]"
            />
            <span className="absolute right-2 text-[#787b86] font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 border border-[#d8dce6] dark:border-[#2a2f40] bg-white dark:bg-[#12151e] rounded font-semibold">
              Ctrl+K
            </span>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-6 h-full">
          {['Markets', 'Screener', 'Heatmap', 'Economics', 'Brokers', 'Research'].map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => onSelectNav(item)}
                className={`font-['Inter'] text-xs font-semibold tracking-wide transition-colors relative flex items-center h-full px-1 ${
                  isActive
                    ? 'text-[#2962ff] dark:text-[#5d8aff] font-bold'
                    : 'text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white'
                }`}
                id={`nav-item-${item.toLowerCase()}`}
              >
                <span>{item}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2962ff] dark:bg-[#5d8aff] rounded-t" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Telemetry & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Live UTC Clock */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#f0f3fa] dark:bg-[#1a1e2b] px-2.5 py-1 rounded-md border border-[#d8dce6] dark:border-[#2a2f40] text-[11px] font-['JetBrains_Mono'] text-[#6a6d78] dark:text-[#8e92a0]">
            <Clock className="w-3.5 h-3.5 text-[#2962ff]" />
            <span className="font-semibold text-[#131722] dark:text-white">{currentTime || '00:00:00 UTC'}</span>
          </div>

          {/* Sound FX Audio Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-[#2962ff]/10 border-[#2962ff]/30 text-[#2962ff]'
                : 'border-transparent text-[#6a6d78] dark:text-[#8e92a0] hover:bg-[#f0f3fa] dark:hover:bg-[#1a1e2b]'
            }`}
            title={soundEnabled ? 'Terminal Audio Muted' : 'Enable Terminal Audio Ticks'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Shortcuts Modal trigger */}
          <button
            onClick={onOpenShortcuts}
            className="p-2 text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1a1e2b] transition-colors"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-2 text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1a1e2b] transition-colors"
            title="Watchlist Drawer"
            id="header-watchlist-btn"
          >
            <Bell className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#2962ff] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1a1e2b] transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="header-theme-toggle"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-1.5 px-2 text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1a1e2b] transition-colors flex items-center gap-1 text-xs font-mono font-bold"
              id="header-lang-btn"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang}</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#1a1e2b] rounded-xl shadow-xl border border-[#d8dce6] dark:border-[#2a2f40] py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#787b86] border-b border-[#d8dce6] dark:border-[#2a2f40]">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs text-[#131722] dark:text-[#d1d4dc] hover:bg-[#f0f3fa] dark:hover:bg-[#232738] flex items-center justify-between"
                  >
                    <span>{lang.name}</span>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#2962ff]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connect Broker / Pro Access */}
          <button
            onClick={onOpenGetStarted}
            className="bg-[#2962ff] hover:bg-[#1e53e5] active:scale-95 text-white font-['Inter'] text-xs py-1.5 px-4 rounded-lg transition-all font-semibold shadow-sm flex items-center gap-1.5"
            id="header-get-started-btn"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Connect Broker</span>
          </button>
        </div>
      </div>
    </header>
  );
};
