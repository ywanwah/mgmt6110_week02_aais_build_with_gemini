import React, { useState } from 'react';
import { Search, Globe, User, Moon, Sun, Bell, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGetStarted: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
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
}) => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'JA', name: '日本語' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'ES', name: 'Español' },
    { code: 'ZH', name: '中文 (简体)' },
  ];

  return (
    <header className="bg-white dark:bg-[#191b24] border-b border-[#E0E3EB] dark:border-[#2e303a] w-full sticky top-0 z-40 transition-colors duration-200">
      <div className="flex justify-between items-center h-[72px] px-4 md:px-6 w-full max-w-[1280px] mx-auto">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => onSelectNav('Markets')}
            className="font-['Hanken_Grotesk'] text-2xl md:text-[28px] text-[#191b24] dark:text-white font-bold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-1.5"
            id="header-brand-logo"
          >
            <span>FinancialHub</span>
          </button>

          <div
            onClick={onOpenSearch}
            className="relative hidden md:flex items-center cursor-pointer group"
            id="header-search-trigger"
          >
            <Search className="absolute left-3.5 w-4 h-4 text-[#787B86] group-hover:text-[#2962ff] transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search (e.g. AAPL, BTC, S&P 500)"
              className="pl-10 pr-16 py-2 bg-[#f3f2ff] dark:bg-[#232632] border border-[#E0E3EB] dark:border-[#383b48] rounded-full text-sm text-[#191b24] dark:text-[#ededfa] cursor-pointer focus:outline-none focus:border-[#2962ff] focus:ring-1 focus:ring-[#2962ff] w-64 lg:w-72 transition-all group-hover:border-[#2962ff]"
            />
            <span className="absolute right-3 text-[#787B86] dark:text-[#a0a3b1] font-['JetBrains_Mono'] text-[11px] px-1.5 py-0.5 border border-[#E0E3EB] dark:border-[#383b48] bg-white dark:bg-[#191b24] rounded">
              Ctrl+K
            </span>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8 h-full">
          {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => onSelectNav(item)}
                className={`font-['Inter'] text-sm font-medium transition-colors relative flex items-center h-full ${
                  isActive
                    ? 'text-[#0049db] dark:text-[#88b0ff] font-bold'
                    : 'text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white'
                }`}
                id={`nav-item-${item.toLowerCase()}`}
              >
                <span>{item}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0049db] dark:bg-[#88b0ff] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Watchlist Quick Access */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-2 text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a] transition-colors"
            title="Open Watchlist"
            id="header-watchlist-btn"
          >
            <Bell className="w-5 h-5" />
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#2962ff] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language Menu Toggle */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-2 text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a] transition-colors flex items-center gap-1"
              id="header-lang-btn"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-semibold">{currentLang}</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#232632] rounded-xl shadow-xl border border-[#E0E3EB] dark:border-[#383b48] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-xs font-semibold text-[#787B86] border-b border-[#E0E3EB] dark:border-[#383b48]">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs text-[#191b24] dark:text-[#ededfa] hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a] flex items-center justify-between"
                  >
                    <span>{lang.name}</span>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#2962ff]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a] transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="header-theme-toggle"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Profile User Icon */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a] transition-colors"
              id="header-user-btn"
            >
              <User className="w-5 h-5" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#232632] rounded-xl shadow-xl border border-[#E0E3EB] dark:border-[#383b48] py-2 z-50 animate-in fade-in duration-100">
                <div className="px-4 py-2 border-b border-[#E0E3EB] dark:border-[#383b48]">
                  <p className="text-xs font-semibold text-[#191b24] dark:text-white">Pro Trader Account</p>
                  <p className="text-[11px] text-[#787B86] font-mono">tier: premium_live</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onOpenWatchlist();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#191b24] dark:text-[#ededfa] hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a]"
                  >
                    My Watchlist & Alerts
                  </button>
                  <button
                    onClick={() => {
                      onOpenGetStarted();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-[#191b24] dark:text-[#ededfa] hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a]"
                  >
                    Exchange API Keys
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Get Started Button */}
          <button
            onClick={onOpenGetStarted}
            className="bg-[#2962ff] hover:bg-[#0049db] active:scale-95 text-white font-['Inter'] text-sm py-2 px-5 rounded-full transition-all font-medium shadow-sm hover:shadow-md"
            id="header-get-started-btn"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
