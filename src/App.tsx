import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IndicesBar } from './components/IndicesBar';
import { MarketGrid } from './components/MarketGrid';
import { EconomySection } from './components/EconomySection';
import { MarketHeatmap } from './components/MarketHeatmap';
import { MarketDetailModal } from './components/MarketDetailModal';
import { CommandPalette } from './components/CommandPalette';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';
import { InfoModal } from './components/InfoModal';
import { Footer } from './components/Footer';
import { MarketCategory, MarketItem } from './types';
import { initialMarketItems, mockEconomicIndicators } from './data/mockMarketData';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('US stocks');
  const [activeNav, setActiveNav] = useState<string>('Markets');
  const [activeViewMode, setActiveViewMode] = useState<'dashboard' | 'heatmap' | 'watchlist'>('dashboard');
  const [items, setItems] = useState<MarketItem[]>(initialMarketItems);
  const [isLiveUpdating, setIsLiveUpdating] = useState<boolean>(true);
  const [recentTickMap, setRecentTickMap] = useState<Record<string, 'up' | 'down'>>({});
  
  // Modals & Panels
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [legalTopic, setLegalTopic] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Watchlist persisted state
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fh_watchlist');
      return saved ? JSON.parse(saved) : ['SPX', 'NDX', 'NVDA', 'BTC/USD'];
    } catch {
      return ['SPX', 'NDX', 'NVDA', 'BTC/USD'];
    }
  });

  const toggleWatchlist = (symbol: string) => {
    setWatchlistSymbols((prev) => {
      const next = prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol];
      try {
        localStorage.setItem('fh_watchlist', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Dark Mode Sync
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

  // Live price tick simulation loop
  useEffect(() => {
    if (!isLiveUpdating) return;

    const interval = setInterval(() => {
      // Pick 1 to 3 random items to tick
      const count = Math.floor(Math.random() * 2) + 1;
      const targetIndices: number[] = [];
      while (targetIndices.length < count) {
        const r = Math.floor(Math.random() * items.length);
        if (!targetIndices.includes(r)) targetIndices.push(r);
      }

      const updatedTicks: Record<string, 'up' | 'down'> = {};

      setItems((prevItems) =>
        prevItems.map((item, idx) => {
          if (!targetIndices.includes(idx)) return item;

          const deltaPercent = (Math.random() - 0.48) * 0.003;
          const priceChange = item.price * deltaPercent;
          const newPrice = Math.max(0.01, item.price + priceChange);
          const newChange = item.change + priceChange;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          const direction: 'up' | 'down' = priceChange >= 0 ? 'up' : 'down';
          updatedTicks[item.id] = direction;

          // Update sparkline
          const newSparkline = [...item.sparkline.slice(1), newPrice];

          // Update 1D history last point
          const hist1D = [...(item.history['1D'] || [])];
          if (hist1D.length > 0) {
            const lastPoint = hist1D[hist1D.length - 1];
            hist1D[hist1D.length - 1] = {
              ...lastPoint,
              price: parseFloat(newPrice.toFixed(2)),
              high: Math.max(lastPoint.high || newPrice, newPrice),
              low: Math.min(lastPoint.low || newPrice, newPrice),
            };
          }

          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            high24h: Math.max(item.high24h, newPrice),
            low24h: Math.min(item.low24h, newPrice),
            sparkline: newSparkline,
            history: {
              ...item.history,
              '1D': hist1D,
            },
          };
        })
      );

      setRecentTickMap(updatedTicks);
      setTimeout(() => {
        setRecentTickMap({});
      }, 700);
    }, 2400);

    return () => clearInterval(interval);
  }, [isLiveUpdating, items.length]);

  // Keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#13151c] text-[#191b24] dark:text-[#ededfa] font-['Inter'] flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        activeNav={activeNav}
        onSelectNav={(nav) => {
          setActiveNav(nav);
          if (nav !== 'Markets') {
            setLegalTopic(nav.toLowerCase());
          }
        }}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        watchlistCount={watchlistSymbols.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-6 pb-16">
        {/* Hero Headline */}
        <Hero
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveViewMode('dashboard');
          }}
          isLiveUpdating={isLiveUpdating}
          onToggleLive={() => setIsLiveUpdating(!isLiveUpdating)}
          activeViewMode={activeViewMode}
          onSelectViewMode={setActiveViewMode}
        />

        {/* Indices Highlight Bar with the 3 exact cards */}
        <IndicesBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveViewMode('dashboard');
          }}
          items={items}
          onSelectItem={setSelectedItem}
          recentTickMap={recentTickMap}
        />

        {/* View Mode Switching */}
        {activeViewMode === 'dashboard' && (
          selectedCategory === 'Economy' ? (
            <EconomySection indicators={mockEconomicIndicators} />
          ) : (
            <MarketGrid
              category={selectedCategory}
              items={items}
              onSelectItem={setSelectedItem}
              watchlistSymbols={watchlistSymbols}
              onToggleWatchlist={toggleWatchlist}
              recentTickMap={recentTickMap}
            />
          )
        )}

        {activeViewMode === 'heatmap' && (
          <MarketHeatmap
            items={items}
            onSelectItem={setSelectedItem}
          />
        )}

        {activeViewMode === 'watchlist' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#191b24] dark:text-white">
                My Personalized Watchlist ({watchlistSymbols.length})
              </h3>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-xs bg-[#2962ff] text-white px-3.5 py-1.5 rounded-full font-semibold hover:bg-[#0049db] transition-colors"
              >
                + Add Symbol
              </button>
            </div>
            <MarketGrid
              category={selectedCategory}
              items={items.filter((i) => watchlistSymbols.includes(i.symbol))}
              onSelectItem={setSelectedItem}
              watchlistSymbols={watchlistSymbols}
              onToggleWatchlist={toggleWatchlist}
              recentTickMap={recentTickMap}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenLegal={(topic) => setLegalTopic(topic)} />

      {/* Modals & Slide-over Drawers */}
      <MarketDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isStarred={selectedItem ? watchlistSymbols.includes(selectedItem.symbol) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={items}
        onSelectItem={(item) => {
          setSelectedItem(item);
          setIsSearchOpen(false);
        }}
        watchlistSymbols={watchlistSymbols}
        onToggleWatchlist={toggleWatchlist}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistSymbols={watchlistSymbols}
        items={items}
        onSelectItem={setSelectedItem}
        onRemoveFromWatchlist={toggleWatchlist}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />

      <InfoModal
        topic={legalTopic}
        onClose={() => setLegalTopic(null)}
      />
    </div>
  );
}
