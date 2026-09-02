import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  Star,
  Bell,
  Share2,
  Maximize2,
  Layers,
  BarChart2,
  LineChart as LineChartIcon,
  ShieldCheck,
  Globe,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { MarketItem, PricePoint } from '../types';

interface MarketDetailModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isStarred: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

type Timeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL';
type ChartType = 'area' | 'candlestick';

export const MarketDetailModal: React.FC<MarketDetailModalProps> = ({
  item,
  onClose,
  isStarred,
  onToggleWatchlist,
}) => {
  if (!item) return null;

  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [showSMA, setShowSMA] = useState(false);
  const [showRSI, setShowRSI] = useState(false);
  const [hoverPoint, setHoverPoint] = useState<PricePoint | null>(null);
  const [activeTab, setActiveTab] = useState<'chart' | 'orderbook' | 'news'>('chart');
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>('');
  const [alertSaved, setAlertSaved] = useState<boolean>(false);

  const isPositive = item.change >= 0;
  const priceHistory = item.history[timeframe] || item.history['1D'];

  // Min and Max for charting
  const prices = priceHistory.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const chartWidth = 640;
  const chartHeight = 260;
  const paddingX = 20;
  const paddingY = 24;

  const getCoordinates = (index: number, price: number) => {
    const x = paddingX + (index / (priceHistory.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((price - minPrice) / priceRange) * (chartHeight - paddingY * 2);
    return { x, y };
  };

  const points = priceHistory.map((p, i) => {
    const { x, y } = getCoordinates(i, p.price);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${chartWidth - paddingX},${chartHeight - 4} L ${paddingX},${chartHeight - 4} Z`;

  // Mock SMA 5
  const smaPoints = priceHistory.map((_, i) => {
    const start = Math.max(0, i - 4);
    const slice = priceHistory.slice(start, i + 1);
    const avg = slice.reduce((sum, curr) => sum + curr.price, 0) / slice.length;
    const { x, y } = getCoordinates(i, avg);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const smaPathD = `M ${smaPoints.join(' L ')}`;

  const currentDisplayedPoint = hoverPoint || priceHistory[priceHistory.length - 1];

  // Mock Order Book data
  const orderBookBids = [
    { price: item.price * 0.9995, size: '24.5k', total: '24.5k' },
    { price: item.price * 0.999, size: '42.1k', total: '66.6k' },
    { price: item.price * 0.998, size: '89.0k', total: '155.6k' },
    { price: item.price * 0.997, size: '120.4k', total: '276.0k' },
    { price: item.price * 0.996, size: '210.2k', total: '486.2k' },
  ];

  const orderBookAsks = [
    { price: item.price * 1.0005, size: '18.2k', total: '18.2k' },
    { price: item.price * 1.001, size: '36.8k', total: '55.0k' },
    { price: item.price * 1.002, size: '74.5k', total: '129.5k' },
    { price: item.price * 1.003, size: '145.0k', total: '274.5k' },
    { price: item.price * 1.004, size: '190.5k', total: '465.0k' },
  ];

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertTargetPrice) {
      setAlertSaved(true);
      setTimeout(() => setAlertSaved(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#191b24] w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2e303a] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 md:p-6 border-b border-[#E0E3EB] dark:border-[#2e303a] flex items-center justify-between bg-[#faf8ff] dark:bg-[#232632]/50">
          <div className="flex items-center gap-3 md:gap-4">
            {item.badgeNumber ? (
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
                  item.badgeColor === 'red' ? 'bg-[#F23645]' : 'bg-[#004ee8]'
                } text-white flex items-center justify-center font-bold text-sm md:text-base font-['JetBrains_Mono'] shadow-sm`}
              >
                {item.badgeNumber}
              </div>
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#f3f2ff] dark:bg-[#2e303a] text-[#2962ff] dark:text-[#88b0ff] flex items-center justify-center font-bold text-sm md:text-base font-['JetBrains_Mono'] border border-[#E0E3EB] dark:border-[#383b48]">
                {item.symbol.substring(0, 3)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Hanken_Grotesk'] text-xl md:text-2xl font-bold text-[#191b24] dark:text-white">
                  {item.name}
                </h2>
                <span className="font-['JetBrains_Mono'] text-xs font-semibold px-2 py-0.5 rounded bg-[#f3f2ff] dark:bg-[#2e303a] text-[#5a5e6b] dark:text-[#c3c6d5]">
                  {item.symbol}
                </span>
                <span className="hidden sm:inline-block text-xs text-[#787B86]">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-[#787B86] mt-0.5">{item.sector || 'Market Benchmark'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(item.symbol)}
              className={`p-2 rounded-full border transition-colors ${
                isStarred
                  ? 'bg-amber-400/10 border-amber-400/30 text-amber-500'
                  : 'border-[#E0E3EB] dark:border-[#383b48] text-[#787B86] hover:text-[#191b24] dark:hover:text-white'
              }`}
              title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#787B86] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6 space-y-6">
          {/* Price Overview Banner */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#E0E3EB] dark:border-[#2e303a]">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-['JetBrains_Mono'] text-3xl md:text-4xl font-bold text-[#191b24] dark:text-white">
                  ${currentDisplayedPoint.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <div
                  className={`inline-flex items-center gap-1 font-['JetBrains_Mono'] font-bold text-sm px-2.5 py-1 rounded-md ${
                    isPositive ? 'bg-[#089981]/10 text-[#089981]' : 'bg-[#F23645]/10 text-[#F23645]'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>
                    {isPositive ? '+' : ''}
                    {item.change.toFixed(2)} ({isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="text-xs text-[#787B86] mt-1 flex items-center gap-2 font-['JetBrains_Mono']">
                <span>Time: {currentDisplayedPoint.time}</span>
                <span>•</span>
                <span>Vol: {item.volume}</span>
                {item.marketCap && (
                  <>
                    <span>•</span>
                    <span>Cap: {item.marketCap}</span>
                  </>
                )}
              </div>
            </div>

            {/* Timeframe Bar */}
            <div className="flex items-center gap-1 bg-[#f3f2ff] dark:bg-[#232632] p-1 rounded-xl border border-[#E0E3EB] dark:border-[#383b48] self-start sm:self-auto">
              {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold font-['JetBrains_Mono'] transition-all ${
                    timeframe === tf
                      ? 'bg-[#2962ff] text-white shadow-sm'
                      : 'text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#191b24] dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Controls & Technical Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartType(chartType === 'area' ? 'candlestick' : 'area')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0E3EB] dark:border-[#383b48] bg-white dark:bg-[#232632] text-[#191b24] dark:text-[#ededfa] hover:border-[#2962ff]"
              >
                {chartType === 'area' ? <LineChartIcon className="w-3.5 h-3.5" /> : <BarChart2 className="w-3.5 h-3.5" />}
                <span className="capitalize">{chartType} View</span>
              </button>

              <button
                onClick={() => setShowSMA(!showSMA)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  showSMA
                    ? 'bg-[#0049db] text-white border-[#0049db]'
                    : 'border-[#E0E3EB] dark:border-[#383b48] text-[#787B86] hover:text-[#191b24] dark:hover:text-white'
                }`}
              >
                SMA (5)
              </button>

              <button
                onClick={() => setShowRSI(!showRSI)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  showRSI
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-[#E0E3EB] dark:border-[#383b48] text-[#787B86] hover:text-[#191b24] dark:hover:text-white'
                }`}
              >
                RSI (14)
              </button>
            </div>

            <div className="text-xs text-[#787B86] font-mono">
              High: ${maxPrice.toFixed(2)} | Low: ${minPrice.toFixed(2)}
            </div>
          </div>

          {/* Interactive SVG Chart Canvas */}
          <div className="relative bg-[#faf8ff] dark:bg-[#15171f] rounded-2xl border border-[#E0E3EB] dark:border-[#2e303a] p-2 md:p-4 overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto cursor-crosshair select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
                const index = Math.min(
                  priceHistory.length - 1,
                  Math.max(0, Math.floor(ratio * priceHistory.length))
                );
                setHoverPoint(priceHistory[index]);
              }}
              onMouseLeave={() => setHoverPoint(null)}
            >
              <defs>
                <linearGradient id="modal-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isPositive ? '#089981' : '#F23645'} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={isPositive ? '#089981' : '#F23645'} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0.25, 0.5, 0.75].map((pct, i) => {
                const y = paddingY + pct * (chartHeight - paddingY * 2);
                const gridPrice = maxPrice - pct * priceRange;
                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.08"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={chartWidth - paddingX - 4}
                      y={y - 4}
                      textAnchor="end"
                      fontSize="9"
                      fill="#787B86"
                      fontFamily="JetBrains Mono"
                    >
                      ${gridPrice.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Area & Line */}
              {chartType === 'area' ? (
                <>
                  <path d={areaD} fill="url(#modal-area-grad)" />
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isPositive ? '#089981' : '#F23645'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                /* Candlestick Mode */
                priceHistory.map((p, i) => {
                  const { x, y } = getCoordinates(i, p.price);
                  const openY = getCoordinates(i, p.open || p.price * 0.998).y;
                  const highY = getCoordinates(i, p.high || p.price * 1.002).y;
                  const lowY = getCoordinates(i, p.low || p.price * 0.996).y;
                  const isCandleGreen = (p.price >= (p.open || p.price));
                  const candleColor = isCandleGreen ? '#089981' : '#F23645';

                  return (
                    <g key={i}>
                      {/* High-Low Wick */}
                      <line x1={x} y1={highY} x2={x} y2={lowY} stroke={candleColor} strokeWidth="1.2" />
                      {/* Open-Close Body */}
                      <rect
                        x={x - 3}
                        y={Math.min(y, openY)}
                        width="6"
                        height={Math.max(2, Math.abs(y - openY))}
                        fill={candleColor}
                        rx="1"
                      />
                    </g>
                  );
                })
              )}

              {/* Optional SMA Overlay */}
              {showSMA && (
                <path
                  d={smaPathD}
                  fill="none"
                  stroke="#2962ff"
                  strokeWidth="1.8"
                  strokeDasharray="3 3"
                />
              )}

              {/* Hover Crosshair */}
              {hoverPoint && (
                <g>
                  {(() => {
                    const idx = priceHistory.findIndex((p) => p.time === hoverPoint.time);
                    if (idx === -1) return null;
                    const { x, y } = getCoordinates(idx, hoverPoint.price);
                    return (
                      <>
                        <line
                          x1={x}
                          y1={paddingY}
                          x2={x}
                          y2={chartHeight - paddingY}
                          stroke="#2962ff"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="5"
                          fill="#2962ff"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      </>
                    );
                  })()}
                </g>
              )}
            </svg>

            {/* Optional RSI Oscillator Sub-pane */}
            {showRSI && (
              <div className="mt-2 pt-2 border-t border-[#E0E3EB] dark:border-[#2e303a] flex items-center justify-between text-[11px] font-mono text-[#787B86]">
                <span>RSI (14): <strong className="text-purple-600">58.4</strong> (Neutral)</span>
                <span>Overbought: 70 | Oversold: 30</span>
              </div>
            )}
          </div>

          {/* Sub-tabs: Key Statistics & Orderbook / News */}
          <div className="flex border-b border-[#E0E3EB] dark:border-[#2e303a]">
            {[
              { id: 'chart', label: 'Key Statistics' },
              { id: 'orderbook', label: 'Live Depth & Order Book' },
              { id: 'news', label: 'Latest News & Signals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#2962ff] text-[#2962ff] dark:text-blue-400'
                    : 'border-transparent text-[#787B86] hover:text-[#191b24] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Key Statistics */}
          {activeTab === 'chart' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#faf8ff] dark:bg-[#232632] p-3 rounded-xl border border-[#E0E3EB] dark:border-[#383b48]">
                <div className="text-[11px] text-[#787B86] font-['JetBrains_Mono']">24H High</div>
                <div className="font-['JetBrains_Mono'] font-bold text-sm text-[#191b24] dark:text-white mt-0.5">
                  ${item.high24h.toLocaleString()}
                </div>
              </div>

              <div className="bg-[#faf8ff] dark:bg-[#232632] p-3 rounded-xl border border-[#E0E3EB] dark:border-[#383b48]">
                <div className="text-[11px] text-[#787B86] font-['JetBrains_Mono']">24H Low</div>
                <div className="font-['JetBrains_Mono'] font-bold text-sm text-[#191b24] dark:text-white mt-0.5">
                  ${item.low24h.toLocaleString()}
                </div>
              </div>

              <div className="bg-[#faf8ff] dark:bg-[#232632] p-3 rounded-xl border border-[#E0E3EB] dark:border-[#383b48]">
                <div className="text-[11px] text-[#787B86] font-['JetBrains_Mono']">P/E Ratio</div>
                <div className="font-['JetBrains_Mono'] font-bold text-sm text-[#191b24] dark:text-white mt-0.5">
                  {item.peRatio ? item.peRatio.toFixed(1) : 'N/A'}
                </div>
              </div>

              <div className="bg-[#faf8ff] dark:bg-[#232632] p-3 rounded-xl border border-[#E0E3EB] dark:border-[#383b48]">
                <div className="text-[11px] text-[#787B86] font-['JetBrains_Mono']">Div Yield</div>
                <div className="font-['JetBrains_Mono'] font-bold text-sm text-[#191b24] dark:text-white mt-0.5">
                  {item.dividendYield ? `${item.dividendYield}%` : '0.00%'}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Order Book */}
          {activeTab === 'orderbook' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-['JetBrains_Mono']">
              {/* Bids */}
              <div className="bg-[#faf8ff] dark:bg-[#232632] p-3.5 rounded-xl border border-[#E0E3EB] dark:border-[#383b48]">
                <div className="text-xs font-bold text-[#089981] mb-2 flex justify-between">
                  <span>Bids (Buyers)</span>
                  <span>Size (Total)</span>
                </div>
                <div className="space-y-1.5">
                  {orderBookBids.map((bid, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-[#089981] font-semibold">${bid.price.toFixed(2)}</span>
                      <span className="text-[#787B86]">{bid.size} ({bid.total})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div className="bg-[#faf8ff] dark:bg-[#232632] p-3.5 rounded-xl border border-[#E0E3EB] dark:border-[#383b48]">
                <div className="text-xs font-bold text-[#F23645] mb-2 flex justify-between">
                  <span>Asks (Sellers)</span>
                  <span>Size (Total)</span>
                </div>
                <div className="space-y-1.5">
                  {orderBookAsks.map((ask, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-[#F23645] font-semibold">${ask.price.toFixed(2)}</span>
                      <span className="text-[#787B86]">{ask.size} ({ask.total})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: News */}
          {activeTab === 'news' && (
            <div className="space-y-2.5">
              {item.news.map((n) => (
                <div
                  key={n.id}
                  className="p-3 bg-[#faf8ff] dark:bg-[#232632] rounded-xl border border-[#E0E3EB] dark:border-[#383b48] flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-xs md:text-sm text-[#191b24] dark:text-white">
                      {n.title}
                    </h4>
                    <div className="text-[11px] text-[#787B86] mt-1 flex items-center gap-2">
                      <span>{n.source}</span>
                      <span>•</span>
                      <span>{n.time}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                      n.sentiment === 'bullish'
                        ? 'bg-[#089981]/10 text-[#089981]'
                        : n.sentiment === 'bearish'
                        ? 'bg-[#F23645]/10 text-[#F23645]'
                        : 'bg-gray-500/10 text-gray-500'
                    }`}
                  >
                    {n.sentiment}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Price Alert Bar */}
          <form
            onSubmit={handleSaveAlert}
            className="p-3.5 bg-[#f3f2ff] dark:bg-[#232632] rounded-xl border border-[#E0E3EB] dark:border-[#383b48] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#2962ff]" />
              <span className="font-semibold text-[#191b24] dark:text-white">
                Set Price Alert for {item.symbol}:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="any"
                value={alertTargetPrice}
                onChange={(e) => setAlertTargetPrice(e.target.value)}
                placeholder={`Target ($${item.price.toFixed(2)})`}
                className="px-3 py-1.5 bg-white dark:bg-[#191b24] border border-[#E0E3EB] dark:border-[#383b48] rounded-lg text-xs font-mono text-[#191b24] dark:text-white w-32 focus:outline-none focus:border-[#2962ff]"
              />
              <button
                type="submit"
                className="bg-[#2962ff] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#0049db] transition-colors"
              >
                {alertSaved ? 'Saved!' : 'Alert Me'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
