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
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { MarketItem, PricePoint } from '../types';
import { soundFX } from '../utils/sound';

interface MarketDetailModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isStarred: boolean;
  onToggleWatchlist: (symbol: string) => void;
  initialAction?: 'buy' | 'sell';
}

type Timeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL';
type ChartType = 'area' | 'candlestick';

export const MarketDetailModal: React.FC<MarketDetailModalProps> = ({
  item,
  onClose,
  isStarred,
  onToggleWatchlist,
  initialAction = 'buy',
}) => {
  if (!item) return null;

  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showRSI, setShowRSI] = useState(true);
  const [hoverPoint, setHoverPoint] = useState<PricePoint | null>(null);
  const [activeTab, setActiveTab] = useState<'trade' | 'orderbook' | 'news' | 'stats'>('trade');

  // Trade ticket state
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>(initialAction);
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [orderQuantity, setOrderQuantity] = useState<string>('10');
  const [limitPrice, setLimitPrice] = useState<string>(item.price.toFixed(2));
  const [leverage, setLeverage] = useState<number>(1);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Price alert state
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>('');
  const [alertSaved, setAlertSaved] = useState<boolean>(false);

  const isPositive = item.change >= 0;
  const priceHistory = item.history[timeframe] || item.history['1D'];

  // Min and Max for charting
  const prices = priceHistory.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const chartWidth = 620;
  const chartHeight = 250;
  const paddingX = 24;
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

  // Moving averages
  const smaPoints = priceHistory.map((_, i) => {
    const start = Math.max(0, i - 4);
    const slice = priceHistory.slice(start, i + 1);
    const avg = slice.reduce((sum, curr) => sum + curr.price, 0) / slice.length;
    const { x, y } = getCoordinates(i, avg);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const smaPathD = `M ${smaPoints.join(' L ')}`;

  // Bollinger Bands
  const bollingerUpperPoints = priceHistory.map((_, i) => {
    const start = Math.max(0, i - 4);
    const slice = priceHistory.slice(start, i + 1);
    const avg = slice.reduce((sum, curr) => sum + curr.price, 0) / slice.length;
    const stdDev = Math.sqrt(slice.reduce((s, c) => s + Math.pow(c.price - avg, 2), 0) / slice.length) || 1;
    const { x, y } = getCoordinates(i, avg + stdDev * 1.8);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const bollingerLowerPoints = priceHistory.map((_, i) => {
    const start = Math.max(0, i - 4);
    const slice = priceHistory.slice(start, i + 1);
    const avg = slice.reduce((sum, curr) => sum + curr.price, 0) / slice.length;
    const stdDev = Math.sqrt(slice.reduce((s, c) => s + Math.pow(c.price - avg, 2), 0) / slice.length) || 1;
    const { x, y } = getCoordinates(i, avg - stdDev * 1.8);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const currentDisplayedPoint = hoverPoint || priceHistory[priceHistory.length - 1];

  // Simulated Order Book
  const orderBookBids = [
    { price: item.price * 0.9996, size: '42.50', total: '42.50', depthPct: 45 },
    { price: item.price * 0.9991, size: '86.10', total: '128.60', depthPct: 75 },
    { price: item.price * 0.9984, size: '145.20', total: '273.80', depthPct: 90 },
    { price: item.price * 0.9975, size: '210.00', total: '483.80', depthPct: 100 },
  ];

  const orderBookAsks = [
    { price: item.price * 1.0004, size: '38.20', total: '38.20', depthPct: 40 },
    { price: item.price * 1.0009, size: '72.80', total: '111.00', depthPct: 68 },
    { price: item.price * 1.0018, size: '124.50', total: '235.50', depthPct: 85 },
    { price: item.price * 1.0028, size: '198.00', total: '433.50', depthPct: 98 },
  ];

  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(orderQuantity) || 1;
    const executedPrice = orderType === 'market' ? item.price : parseFloat(limitPrice) || item.price;
    const totalNotional = (qty * executedPrice).toFixed(2);
    
    soundFX.playOrderFill();
    setOrderNotification(
      `DMA Order Executed: ${orderSide.toUpperCase()} ${qty} ${item.symbol} @ $${executedPrice.toFixed(2)} (Notional: $${totalNotional})`
    );

    setTimeout(() => {
      setOrderNotification(null);
    }, 4500);
  };

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertTargetPrice) {
      setAlertSaved(true);
      setTimeout(() => setAlertSaved(false), 3000);
    }
  };

  const totalCost = (parseFloat(orderQuantity) || 0) * (orderType === 'limit' ? parseFloat(limitPrice) || item.price : item.price);
  const marginRequired = (totalCost / leverage).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#12151e] w-full max-w-5xl max-h-[94vh] rounded-2xl shadow-2xl border border-[#e0e3eb] dark:border-[#202533] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3 md:p-5 border-b border-[#e0e3eb] dark:border-[#202533] flex items-center justify-between bg-[#f8f9fd] dark:bg-[#161a26]">
          <div className="flex items-center gap-3">
            {item.badgeNumber ? (
              <div
                className={`w-10 h-10 rounded-xl ${
                  item.badgeColor === 'red' ? 'bg-[#f23645]' : 'bg-[#2962ff]'
                } text-white flex items-center justify-center font-bold text-sm font-['JetBrains_Mono'] shadow-sm`}
              >
                {item.badgeNumber}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#2962ff]/10 text-[#2962ff] dark:text-[#5d8aff] flex items-center justify-center font-bold text-sm font-['JetBrains_Mono'] border border-[#2962ff]/20">
                {item.symbol.substring(0, 3)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Hanken_Grotesk'] text-lg md:text-xl font-bold text-[#131722] dark:text-white">
                  {item.name}
                </h2>
                <span className="font-['JetBrains_Mono'] text-xs font-bold px-2 py-0.5 rounded bg-[#f0f3fa] dark:bg-[#1a1e2b] text-[#2962ff] dark:text-[#5d8aff] border border-[#d8dce6] dark:border-[#2a2f40]">
                  {item.symbol}
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono text-[#787b86]">
                  {item.category} • {item.sector || 'Equities'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#787b86] font-['JetBrains_Mono'] mt-0.5">
                <span>VOL: <strong className="text-[#131722] dark:text-[#d1d4dc]">{item.volume}</strong></span>
                <span>•</span>
                <span>BETA: <strong className="text-[#131722] dark:text-[#d1d4dc]">{item.beta || '1.02'}</strong></span>
                {item.marketCap && (
                  <>
                    <span>•</span>
                    <span>MCAP: <strong className="text-[#131722] dark:text-[#d1d4dc]">{item.marketCap}</strong></span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(item.symbol)}
              className={`p-2 rounded-lg border transition-colors ${
                isStarred
                  ? 'bg-amber-400/10 border-amber-400/30 text-amber-500'
                  : 'border-[#d8dce6] dark:border-[#2a2f40] text-[#787b86] hover:text-[#131722] dark:hover:text-white hover:bg-[#f0f3fa] dark:hover:bg-[#1a1e2b]'
              }`}
              title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#787b86] hover:text-[#131722] dark:hover:text-white rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#1a1e2b] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Order Confirmation Toast */}
        {orderNotification && (
          <div className="bg-[#089981] text-white px-4 py-2 text-xs font-['JetBrains_Mono'] font-bold flex items-center justify-between animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{orderNotification}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
              SETTLED
            </span>
          </div>
        )}

        {/* Modal Main Multi-Pane Body */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-5 space-y-4">
          {/* Top Price Banner + Crosshair HUD */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-[#e0e3eb] dark:border-[#202533]">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-['JetBrains_Mono'] text-2xl sm:text-3xl font-bold text-[#131722] dark:text-white">
                  ${currentDisplayedPoint.price > 100
                    ? currentDisplayedPoint.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : currentDisplayedPoint.price.toFixed(4)}
                </span>
                <div
                  className={`inline-flex items-center gap-1 font-['JetBrains_Mono'] font-bold text-xs sm:text-sm px-2.5 py-0.5 rounded ${
                    isPositive ? 'bg-[#089981]/15 text-[#089981]' : 'bg-[#f23645]/15 text-[#f23645]'
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

              {/* Crosshair HUD details */}
              <div className="text-[11px] text-[#787b86] mt-1 flex flex-wrap items-center gap-2 font-['JetBrains_Mono']">
                <span>TIME: <strong className="text-[#131722] dark:text-[#d1d4dc]">{currentDisplayedPoint.time}</strong></span>
                <span>•</span>
                <span>O: <strong className="text-[#131722] dark:text-[#d1d4dc]">{currentDisplayedPoint.open || currentDisplayedPoint.price}</strong></span>
                <span>•</span>
                <span>H: <strong className="text-[#131722] dark:text-[#d1d4dc]">{currentDisplayedPoint.high || currentDisplayedPoint.price}</strong></span>
                <span>•</span>
                <span>L: <strong className="text-[#131722] dark:text-[#d1d4dc]">{currentDisplayedPoint.low || currentDisplayedPoint.price}</strong></span>
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-1 bg-[#f0f3fa] dark:bg-[#161a26] p-1 rounded-lg border border-[#e0e3eb] dark:border-[#202533] self-start sm:self-auto">
              {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold font-['JetBrains_Mono'] transition-all ${
                    timeframe === tf
                      ? 'bg-[#2962ff] text-white shadow-xs'
                      : 'text-[#6a6d78] dark:text-[#8e92a0] hover:text-[#131722] dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart & Order Execution Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left 7 Columns: Chart Canvas & Indicators */}
            <div className="lg:col-span-7 flex flex-col space-y-2">
              {/* Technical Indicator Switches */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setChartType(chartType === 'area' ? 'candlestick' : 'area')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#d8dce6] dark:border-[#2a2f40] bg-white dark:bg-[#1a1e2b] text-[#131722] dark:text-[#d1d4dc] font-mono text-[11px] hover:border-[#2962ff]"
                  >
                    {chartType === 'area' ? <LineChartIcon className="w-3 h-3" /> : <BarChart2 className="w-3 h-3" />}
                    <span>{chartType.toUpperCase()}</span>
                  </button>

                  <button
                    onClick={() => setShowSMA(!showSMA)}
                    className={`px-2 py-1 rounded-md border text-[11px] font-mono font-bold transition-colors ${
                      showSMA
                        ? 'bg-[#2962ff]/15 text-[#2962ff] border-[#2962ff]'
                        : 'border-[#d8dce6] dark:border-[#2a2f40] text-[#787b86]'
                    }`}
                  >
                    SMA (5)
                  </button>

                  <button
                    onClick={() => setShowBollinger(!showBollinger)}
                    className={`px-2 py-1 rounded-md border text-[11px] font-mono font-bold transition-colors ${
                      showBollinger
                        ? 'bg-amber-500/15 text-amber-500 border-amber-500'
                        : 'border-[#d8dce6] dark:border-[#2a2f40] text-[#787b86]'
                    }`}
                  >
                    BOLL (20,2)
                  </button>

                  <button
                    onClick={() => setShowRSI(!showRSI)}
                    className={`px-2 py-1 rounded-md border text-[11px] font-mono font-bold transition-colors ${
                      showRSI
                        ? 'bg-purple-600/15 text-purple-500 border-purple-500'
                        : 'border-[#d8dce6] dark:border-[#2a2f40] text-[#787b86]'
                    }`}
                  >
                    RSI (14)
                  </button>
                </div>

                <div className="text-[11px] text-[#787b86] font-mono hidden sm:block">
                  H: ${maxPrice.toFixed(2)} | L: ${minPrice.toFixed(2)}
                </div>
              </div>

              {/* Chart SVG Container */}
              <div className="relative bg-[#f8f9fd] dark:bg-[#0e1017] rounded-xl border border-[#e0e3eb] dark:border-[#202533] p-2 overflow-hidden shadow-inner">
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
                    <linearGradient id="modal-pro-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.0" />
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
                          fill="#787b86"
                          fontFamily="JetBrains Mono"
                        >
                          ${gridPrice.toFixed(2)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Bollinger Bands Overlay */}
                  {showBollinger && (
                    <>
                      <path
                        d={`M ${bollingerUpperPoints.join(' L ')}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <path
                        d={`M ${bollingerLowerPoints.join(' L ')}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    </>
                  )}

                  {/* Area & Line */}
                  {chartType === 'area' ? (
                    <>
                      <path d={areaD} fill="url(#modal-pro-area-grad)" />
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isPositive ? '#089981' : '#f23645'}
                        strokeWidth="2.2"
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
                      const isCandleGreen = p.price >= (p.open || p.price);
                      const candleColor = isCandleGreen ? '#089981' : '#f23645';

                      return (
                        <g key={i}>
                          <line x1={x} y1={highY} x2={x} y2={lowY} stroke={candleColor} strokeWidth="1.2" />
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

                  {/* SMA Overlay */}
                  {showSMA && (
                    <path
                      d={smaPathD}
                      fill="none"
                      stroke="#2962ff"
                      strokeWidth="1.6"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Hover Crosshair & HUD */}
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
                              r="4.5"
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

                {/* RSI Sub-chart */}
                {showRSI && (
                  <div className="mt-1 pt-1.5 border-t border-[#e0e3eb] dark:border-[#202533] flex items-center justify-between text-[10px] font-mono text-[#787b86]">
                    <span>RSI (14): <strong className="text-purple-500">58.4</strong> (Neutral)</span>
                    <span>Overbought: 70 | Oversold: 30</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Interactive Trade Execution & Depth Terminal */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              {/* Tab Switcher for Right Panel */}
              <div className="flex border-b border-[#e0e3eb] dark:border-[#202533] text-xs">
                {[
                  { id: 'trade', label: 'Order Execution' },
                  { id: 'orderbook', label: 'L2 DOM Depth' },
                  { id: 'news', label: 'News Wire' },
                  { id: 'stats', label: 'Financials' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-1.5 px-3 font-semibold border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#2962ff] text-[#2962ff] dark:text-[#5d8aff]'
                        : 'border-transparent text-[#787b86] hover:text-[#131722] dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Order Execution Ticket */}
              {activeTab === 'trade' && (
                <form onSubmit={handleExecuteOrder} className="space-y-3 bg-[#f8f9fd] dark:bg-[#161a26] p-3 rounded-xl border border-[#e0e3eb] dark:border-[#202533]">
                  {/* Buy / Sell Switch */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-[#10131c] rounded-lg border border-[#e0e3eb] dark:border-[#202533]">
                    <button
                      type="button"
                      onClick={() => setOrderSide('buy')}
                      className={`py-1.5 rounded-md text-xs font-bold font-mono transition-all ${
                        orderSide === 'buy'
                          ? 'bg-[#089981] text-white shadow-xs'
                          : 'text-[#787b86] hover:text-[#131722] dark:hover:text-white'
                      }`}
                    >
                      BUY / LONG
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderSide('sell')}
                      className={`py-1.5 rounded-md text-xs font-bold font-mono transition-all ${
                        orderSide === 'sell'
                          ? 'bg-[#f23645] text-white shadow-xs'
                          : 'text-[#787b86] hover:text-[#131722] dark:hover:text-white'
                      }`}
                    >
                      SELL / SHORT
                    </button>
                  </div>

                  {/* Order Type */}
                  <div className="grid grid-cols-3 gap-1 text-[11px] font-mono font-semibold">
                    {['market', 'limit', 'stop'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type as any)}
                        className={`py-1 rounded border text-center uppercase transition-colors ${
                          orderType === type
                            ? 'bg-[#2962ff] text-white border-[#2962ff]'
                            : 'bg-white dark:bg-[#1a1e2b] border-[#d8dce6] dark:border-[#2a2f40] text-[#787b86]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Limit Price Input if Limit Order */}
                  {orderType === 'limit' && (
                    <div>
                      <label className="text-[10px] font-mono text-[#787b86] uppercase">Limit Price ($)</label>
                      <input
                        type="number"
                        step="any"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        className="w-full mt-0.5 px-2.5 py-1.5 bg-white dark:bg-[#12151e] border border-[#d8dce6] dark:border-[#2a2f40] rounded-md text-xs font-mono font-bold text-[#131722] dark:text-white focus:outline-none focus:border-[#2962ff]"
                      />
                    </div>
                  )}

                  {/* Quantity Input */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-[#787b86]">
                      <span>UNITS / SHARES</span>
                      <span>MAX: 10,000</span>
                    </div>
                    <input
                      type="number"
                      step="any"
                      min="1"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 bg-white dark:bg-[#12151e] border border-[#d8dce6] dark:border-[#2a2f40] rounded-md text-xs font-mono font-bold text-[#131722] dark:text-white focus:outline-none focus:border-[#2962ff]"
                    />
                  </div>

                  {/* Leverage Selector */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-[#787b86] mb-1">
                      <span>MARGIN LEVERAGE</span>
                      <span className="font-bold text-[#2962ff]">{leverage}x</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 5, 10, 20].map((lev) => (
                        <button
                          key={lev}
                          type="button"
                          onClick={() => setLeverage(lev)}
                          className={`flex-1 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                            leverage === lev
                              ? 'bg-[#2962ff] text-white border-[#2962ff]'
                              : 'bg-white dark:bg-[#1a1e2b] border-[#d8dce6] dark:border-[#2a2f40] text-[#787b86]'
                          }`}
                        >
                          {lev}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trade Summary Telemetry */}
                  <div className="pt-2 border-t border-[#e0e3eb] dark:border-[#202533] text-[11px] font-mono text-[#787b86] space-y-1">
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <strong className="text-[#131722] dark:text-white">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Required Margin ({leverage}x):</span>
                      <strong className="text-[#089981]">${marginRequired}</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>Est. DMA Slippage:</span>
                      <span>&lt; 0.01%</span>
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    className={`w-full py-2 rounded-lg text-xs font-bold font-mono text-white transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      orderSide === 'buy'
                        ? 'bg-[#089981] hover:bg-[#077d69] active:scale-98'
                        : 'bg-[#f23645] hover:bg-[#d62837] active:scale-98'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>
                      EXECUTE {orderSide.toUpperCase()} {item.symbol}
                    </span>
                  </button>
                </form>
              )}

              {/* Tab 2: L2 Depth of Market */}
              {activeTab === 'orderbook' && (
                <div className="bg-[#f8f9fd] dark:bg-[#161a26] p-3 rounded-xl border border-[#e0e3eb] dark:border-[#202533] space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-[10px] font-bold text-[#787b86] uppercase border-b border-[#e0e3eb] dark:border-[#202533] pb-1">
                    <span>Price ($)</span>
                    <span>Size</span>
                    <span>Total Depth</span>
                  </div>

                  {/* Asks (Sellers) */}
                  <div className="space-y-1">
                    {orderBookAsks.map((ask, i) => (
                      <div key={i} className="relative flex justify-between items-center text-[11px] py-0.5 px-1 rounded overflow-hidden">
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-[#f23645]/15 pointer-events-none"
                          style={{ width: `${ask.depthPct}%` }}
                        />
                        <span className="text-[#f23645] font-bold z-10">${ask.price.toFixed(2)}</span>
                        <span className="text-[#787b86] z-10">{ask.size}</span>
                        <span className="text-[#131722] dark:text-white z-10">{ask.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spread Bar */}
                  <div className="py-1 px-2 bg-white dark:bg-[#10131c] rounded text-[10px] flex items-center justify-between text-[#787b86] border border-[#e0e3eb] dark:border-[#202533]">
                    <span>Spread: <strong>$0.08 (0.01%)</strong></span>
                    <span className="text-[#089981]">DMA ROUTED</span>
                  </div>

                  {/* Bids (Buyers) */}
                  <div className="space-y-1">
                    {orderBookBids.map((bid, i) => (
                      <div key={i} className="relative flex justify-between items-center text-[11px] py-0.5 px-1 rounded overflow-hidden">
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-[#089981]/15 pointer-events-none"
                          style={{ width: `${bid.depthPct}%` }}
                        />
                        <span className="text-[#089981] font-bold z-10">${bid.price.toFixed(2)}</span>
                        <span className="text-[#787b86] z-10">{bid.size}</span>
                        <span className="text-[#131722] dark:text-white z-10">{bid.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: News Wire */}
              {activeTab === 'news' && (
                <div className="space-y-2 max-h-[280px] overflow-y-auto">
                  {item.news.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 bg-[#f8f9fd] dark:bg-[#161a26] rounded-lg border border-[#e0e3eb] dark:border-[#202533] space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-xs text-[#131722] dark:text-white leading-tight">
                          {n.title}
                        </h4>
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            n.sentiment === 'bullish'
                              ? 'bg-[#089981]/15 text-[#089981]'
                              : n.sentiment === 'bearish'
                              ? 'bg-[#f23645]/15 text-[#f23645]'
                              : 'bg-gray-500/15 text-gray-500'
                          }`}
                        >
                          {n.sentiment}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#787b86] font-mono flex items-center gap-1.5">
                        <span>{n.source}</span>
                        <span>•</span>
                        <span>{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Financials & Ratios */}
              {activeTab === 'stats' && (
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-[#f8f9fd] dark:bg-[#161a26] rounded-lg border border-[#e0e3eb] dark:border-[#202533]">
                    <div className="text-[10px] text-[#787b86]">24H HIGH</div>
                    <div className="font-bold text-[#131722] dark:text-white mt-0.5">${item.high24h.toLocaleString()}</div>
                  </div>
                  <div className="p-2 bg-[#f8f9fd] dark:bg-[#161a26] rounded-lg border border-[#e0e3eb] dark:border-[#202533]">
                    <div className="text-[10px] text-[#787b86]">24H LOW</div>
                    <div className="font-bold text-[#131722] dark:text-white mt-0.5">${item.low24h.toLocaleString()}</div>
                  </div>
                  <div className="p-2 bg-[#f8f9fd] dark:bg-[#161a26] rounded-lg border border-[#e0e3eb] dark:border-[#202533]">
                    <div className="text-[10px] text-[#787b86]">P/E RATIO</div>
                    <div className="font-bold text-[#131722] dark:text-white mt-0.5">{item.peRatio || 'N/A'}</div>
                  </div>
                  <div className="p-2 bg-[#f8f9fd] dark:bg-[#161a26] rounded-lg border border-[#e0e3eb] dark:border-[#202533]">
                    <div className="text-[10px] text-[#787b86]">DIV YIELD</div>
                    <div className="font-bold text-[#131722] dark:text-white mt-0.5">{item.dividendYield ? `${item.dividendYield}%` : '0.00%'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Price Alert Bar */}
          <form
            onSubmit={handleSaveAlert}
            className="p-3 bg-[#f0f3fa] dark:bg-[#161a26] rounded-xl border border-[#e0e3eb] dark:border-[#202533] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#2962ff]" />
              <span className="font-semibold text-[#131722] dark:text-white">
                Set Price Alert for {item.symbol}:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="any"
                value={alertTargetPrice}
                onChange={(e) => setAlertTargetPrice(e.target.value)}
                placeholder={`Target Price ($${item.price.toFixed(2)})`}
                className="px-3 py-1 bg-white dark:bg-[#10131c] border border-[#d8dce6] dark:border-[#2a2f40] rounded-md text-xs font-mono text-[#131722] dark:text-white w-40 focus:outline-none focus:border-[#2962ff]"
              />
              <button
                type="submit"
                className="bg-[#2962ff] text-white px-3 py-1 rounded-md font-semibold font-mono hover:bg-[#1e53e5] transition-colors"
              >
                {alertSaved ? 'Saved!' : 'Arm Alert'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
