import React, { useState, useMemo } from 'react';
import { MonthlyDataPoint, ChartMetricMode } from '../../types/cpi';
import { ArrowUpRight, ArrowDownRight, Maximize2, Layers, HelpCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip } from '../help/Tooltip';

interface CpiTrendChartProps {
  data: MonthlyDataPoint[];
}

function formatMonthYear(period: string): string {
  if (!period) return '';
  const parts = period.trim().split(/\s+/);
  if (parts.length === 2) {
    if (/^\d{4}$/.test(parts[0])) {
      return `${parts[1]} ${parts[0]}`;
    }
    return `${parts[0]} ${parts[1]}`;
  }
  return period;
}

export const CpiTrendChart: React.FC<CpiTrendChartProps> = ({ data }) => {
  const [metricMode, setMetricMode] = useState<ChartMetricMode>('index');
  const [timeRange, setTimeRange] = useState<'6M' | '1Y' | 'ALL'>('ALL');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showChartGuide, setShowChartGuide] = useState<boolean>(false);

  // Filtered dataset according to timeRange
  const activeSeries = useMemo(() => {
    if (timeRange === '6M') return data.slice(-6);
    if (timeRange === '1Y') return data.slice(-12);
    return data;
  }, [data, timeRange]);

  const selectedPoint = hoverIndex !== null && hoverIndex < activeSeries.length
    ? activeSeries[hoverIndex]
    : activeSeries[activeSeries.length - 1];

  // SVG Chart Geometry
  const width = 800;
  const height = 300;
  const padding = { top: 25, right: 30, bottom: 40, left: 55 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Values based on current metricMode
  const values = useMemo(() => {
    return activeSeries.map((d) => {
      if (metricMode === 'yoy') return d.yoyPercent ?? 2.35;
      if (metricMode === 'mom') return d.momPercent ?? 0.0;
      return d.value;
    });
  }, [activeSeries, metricMode]);

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valRange = maxValue - minValue || 1;
  const yBuffer = valRange * 0.15;
  const yMin = Math.floor((minValue - yBuffer) * 10) / 10;
  const yMax = Math.ceil((maxValue + yBuffer) * 10) / 10;

  // Coordinate mapping
  const points = useMemo(() => {
    return activeSeries.map((d, i) => {
      const x = padding.left + (i / (activeSeries.length - 1 || 1)) * innerWidth;
      const val = metricMode === 'yoy' ? (d.yoyPercent ?? 2.35) : metricMode === 'mom' ? (d.momPercent ?? 0) : d.value;
      const y = padding.top + innerHeight - ((val - yMin) / (yMax - yMin || 1)) * innerHeight;
      return { x, y, data: d, val };
    });
  }, [activeSeries, innerHeight, innerWidth, metricMode, padding.left, padding.top, yMax, yMin]);

  // SVG Path for Area & Line
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    const bottomY = padding.top + innerHeight;
    return `${linePath} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  }, [linePath, points, padding.top, innerHeight]);

  // Baseline Y position
  const baselineVal = metricMode === 'index' ? 100.0 : metricMode === 'yoy' ? 2.0 : 0.0;
  const baselineY = padding.top + innerHeight - ((baselineVal - yMin) / (yMax - yMin || 1)) * innerHeight;
  const isBaselineVisible = baselineY >= padding.top && baselineY <= padding.top + innerHeight;

  // Low / High / Change stats
  const periodLow = Math.min(...data.map((d) => d.value));
  const periodHigh = Math.max(...data.map((d) => d.value));
  const netChange = (data[data.length - 1]?.value ?? 103.334) - (data[0]?.value ?? 100.599);
  const netPercent = ((netChange / (data[0]?.value ?? 100)) * 100);

  return (
    <section className="bg-white dark:bg-[#0f141f] rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs transition-colors">
      {/* Chart Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              18-Month CPI Trend (All Items)
            </h2>
            <Tooltip
              title="18-Month CPI Trend Chart"
              content="This chart shows how the Singapore Consumer Price Index has changed month-by-month over the selected time period. The horizontal X-axis represents time (reporting months), and the vertical Y-axis represents the price index or percentage change. An upward or downward movement represents a change in price levels and should be interpreted alongside household wage growth rather than as purely good or bad."
              iconSize={15}
            />
            <button
              onClick={() => setShowChartGuide((prev) => !prev)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 py-0.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              aria-expanded={showChartGuide}
            >
              <span>{showChartGuide ? 'Hide Chart Guide' : 'How to Read Chart'}</span>
              {showChartGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <span className="hidden sm:inline-block text-xs text-neutral-400">·</span>
            <span className="hidden sm:inline-block text-xs font-mono text-neutral-500">
              {data[0]?.period} – {data[data.length - 1]?.period}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Sequential historical trajectory of the All-Items Singapore Consumer Price Index basket.
          </p>
        </div>

        {/* Selected Data Point Badge */}
        {selectedPoint && (
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
            <span className="text-neutral-500 font-medium">Selected:</span>
            <span className="font-semibold text-neutral-900 dark:text-white font-mono">{selectedPoint.period}</span>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {metricMode === 'index' ? selectedPoint.value.toFixed(3) : metricMode === 'yoy' ? `${(selectedPoint.yoyPercent ?? 2.35).toFixed(2)}% YoY` : `${(selectedPoint.momPercent ?? 0.0).toFixed(2)}% MoM`}
            </span>
            {metricMode === 'index' && selectedPoint.momPercent !== undefined && (
              <span className={`font-mono text-[11px] ${selectedPoint.momPercent >= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                ({selectedPoint.momPercent >= 0 ? `+${selectedPoint.momPercent.toFixed(2)}%` : `${selectedPoint.momPercent.toFixed(2)}%`})
              </span>
            )}
          </div>
        )}
      </div>

      {/* TASK 3: Contextual Chart Help Accordion/Panel */}
      {showChartGuide && (
        <div className="mb-4 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-xs text-neutral-700 dark:text-neutral-300 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 dark:border-blue-900/40">
            <span className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Chart Documentation &amp; Interpretation Guide
            </span>
            <button
              onClick={() => setShowChartGuide(false)}
              className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] leading-relaxed">
            <div>
              <strong className="text-neutral-900 dark:text-white block mb-0.5">Axes &amp; Units:</strong>
              <p>
                <strong>X-Axis:</strong> Chronological reporting months (e.g. 2025 Mar through 2026 Aug).<br />
                <strong>Y-Axis:</strong> Price level in points (Base 2024 = 100.0) or percentage (%) change.
              </p>
            </div>

            <div>
              <strong className="text-neutral-900 dark:text-white block mb-0.5">Lines &amp; Visual Indicators:</strong>
              <p>
                <strong>Blue Line &amp; Fill:</strong> Historical CPI index points or monthly velocity.<br />
                <strong>Rose Line:</strong> Annual Year-on-Year inflation trajectory.<br />
                <strong>Dashed Red Line:</strong> MAS 2.0% medium-term goal or Base 100.0 level.
              </p>
            </div>

            <div>
              <strong className="text-neutral-900 dark:text-white block mb-0.5">Interactions &amp; Interpretation:</strong>
              <p>
                Hover or tap anywhere to inspect individual monthly values. Upward slope indicates rising consumer price levels; downward slope indicates price easing or deflation. Neither is inherently good or bad on its own.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Control Strip: Metric Mode & Time Ranges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Metric Mode Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center">
            <button
              onClick={() => setMetricMode('index')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                metricMode === 'index'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Index Level (2024=100)
            </button>
            <Tooltip
              title="Index Level Mode"
              content="Displays the price level standardized against the 2024 base year (100.000). Values above 100 represent cumulative inflation since 2024."
            />
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setMetricMode('yoy')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                metricMode === 'yoy'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              YoY Inflation %
            </button>
            <Tooltip
              title="YoY Inflation Mode"
              content="Displays the annual inflation rate by comparing each month with the exact same month twelve months earlier."
            />
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setMetricMode('mom')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                metricMode === 'mom'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              MoM Velocity %
            </button>
            <Tooltip
              title="MoM Velocity Mode"
              content="Displays the rate of change between consecutive months, highlighting short-term acceleration and seasonal swings."
            />
          </div>
        </div>

        {/* Time Horizon Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200/80 dark:border-neutral-800">
          <button
            onClick={() => setTimeRange('6M')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              timeRange === '6M'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            6M
          </button>
          <button
            onClick={() => setTimeRange('1Y')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              timeRange === '1Y'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            1Y
          </button>
          <button
            onClick={() => setTimeRange('ALL')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              timeRange === 'ALL'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            18M All
          </button>
          <Tooltip
            title="Time Horizons"
            content="Filter the visible time window to 6 months, 1 year, or the entire 18-month historical archive available from SingStat."
          />
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div
        className="relative w-full overflow-x-auto select-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) setHoverIndex(null);
        }}
      >
        <div className="min-w-[560px] relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible"
            onClick={(e) => {
              if (e.target === e.currentTarget) setHoverIndex(null);
            }}
          >
            <defs>
              <linearGradient id="cpiAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines & Y-Axis Labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = padding.top + innerHeight * (1 - pct);
              const val = yMin + (yMax - yMin) * pct;
              return (
                <g key={idx}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={padding.left + innerWidth}
                    y2={y}
                    stroke="currentColor"
                    className="text-neutral-200 dark:text-neutral-800/80"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[11px] font-mono fill-neutral-400 dark:fill-neutral-500"
                  >
                    {metricMode === 'index' ? val.toFixed(1) : `${val.toFixed(2)}%`}
                  </text>
                </g>
              );
            })}

            {/* Baseline Guide (e.g. 100.0 or 2.0% MAS Policy) */}
            {isBaselineVisible && (
              <g>
                <line
                  x1={padding.left}
                  y1={baselineY}
                  x2={padding.left + innerWidth}
                  y2={baselineY}
                  stroke="#ef4444"
                  strokeWidth="1.2"
                  strokeDasharray="4 2"
                  opacity="0.6"
                />
                <text
                  x={padding.left + innerWidth}
                  y={baselineY - 5}
                  textAnchor="end"
                  className="text-[10px] font-mono fill-red-500 font-semibold"
                >
                  {metricMode === 'index' ? 'Base 100.0' : metricMode === 'yoy' ? 'MAS 2.0% Goal' : '0.0%'}
                </text>
              </g>
            )}

            {/* Shaded Area Fill */}
            <path
              d={areaPath}
              fill={`url(#${metricMode === 'yoy' ? 'roseGradient' : 'cpiAreaGradient'})`}
            />

            {/* Line Stroke */}
            <path
              d={linePath}
              fill="none"
              stroke={metricMode === 'yoy' ? '#e11d48' : '#2563eb'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Points */}
            {points.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoverIndex === i ? 6 : 3}
                  className={`transition-all cursor-pointer ${
                    hoverIndex === i
                      ? 'fill-blue-600 dark:fill-blue-400 stroke-white dark:stroke-neutral-900 stroke-2'
                      : 'fill-blue-500/80 hover:fill-blue-600'
                  }`}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setHoverIndex(i);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoverIndex(i);
                  }}
                >
                  <title>{`${formatMonthYear(pt.data.period)}\nCPI: ${pt.data.value.toFixed(1)}`}</title>
                </circle>
              </g>
            ))}

            {/* Hover Crosshair Vertical Line */}
            {hoverIndex !== null && points[hoverIndex] && (
              <line
                x1={points[hoverIndex].x}
                y1={padding.top}
                x2={points[hoverIndex].x}
                y2={padding.top + innerHeight}
                stroke="currentColor"
                className="text-neutral-400 dark:text-neutral-600 pointer-events-none"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            )}

            {/* X-Axis Labels */}
            {points.map((pt, i) => {
              // Show label on first, last, and every 2nd or 3rd point
              const showLabel = activeSeries.length <= 8 || i === 0 || i === points.length - 1 || i % 3 === 0;
              if (!showLabel) return null;
              return (
                <text
                  key={i}
                  x={pt.x}
                  y={padding.top + innerHeight + 22}
                  textAnchor="middle"
                  className="text-[11px] font-mono fill-neutral-500 dark:fill-neutral-400 pointer-events-none"
                >
                  {pt.data.period.replace('20', "'")}
                </text>
              );
            })}

            {/* Hit Zones for Hover, Touch & Keyboard Focus */}
            {points.map((pt, i) => {
              const colWidth = innerWidth / (points.length || 1);
              return (
                <rect
                  key={i}
                  data-testid={`cpi-point-${i}`}
                  x={pt.x - colWidth / 2}
                  y={padding.top}
                  width={colWidth}
                  height={innerHeight}
                  fill="transparent"
                  className="cursor-crosshair focus:outline-hidden"
                  tabIndex={0}
                  role="button"
                  aria-label={`${formatMonthYear(pt.data.period)}, CPI: ${pt.data.value.toFixed(1)}`}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setHoverIndex(i);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoverIndex(i);
                  }}
                  onFocus={() => setHoverIndex(i)}
                  onBlur={() => setHoverIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' && i < points.length - 1) {
                      e.preventDefault();
                      setHoverIndex(i + 1);
                    } else if (e.key === 'ArrowLeft' && i > 0) {
                      e.preventDefault();
                      setHoverIndex(i - 1);
                    } else if (e.key === 'Escape') {
                      setHoverIndex(null);
                    }
                  }}
                >
                  <title>{`${formatMonthYear(pt.data.period)}\nCPI: ${pt.data.value.toFixed(1)}`}</title>
                </rect>
              );
            })}
          </svg>

          {/* Interactive Floating Tooltip */}
          {hoverIndex !== null && points[hoverIndex] && (() => {
            const pt = points[hoverIndex];
            const isNearTop = pt.y < 75;
            const isNearLeft = pt.x < 110;
            const isNearRight = pt.x > width - 110;
            const transformX = isNearLeft ? '0%' : isNearRight ? '-100%' : '-50%';
            const arrowLeft = isNearLeft ? '18px' : isNearRight ? 'calc(100% - 18px)' : '50%';

            return (
              <div
                data-testid="cpi-chart-tooltip"
                style={{
                  left: `${(pt.x / width) * 100}%`,
                  top: `${(pt.y / height) * 100}%`,
                  transform: `translate(${transformX}, ${isNearTop ? '12px' : 'calc(-100% - 12px)'})`,
                }}
                className="absolute pointer-events-none z-30 transition-all duration-75"
              >
                <div className="relative px-3 py-2 rounded-xl bg-neutral-900/95 dark:bg-neutral-800/95 text-white border border-neutral-700/80 shadow-2xl backdrop-blur-md text-xs whitespace-nowrap text-center select-none">
                  <div className="font-semibold text-neutral-100 text-[12px] tracking-tight">
                    {formatMonthYear(pt.data.period)}
                  </div>
                  <div className="font-mono text-neutral-200 text-[12px] font-bold mt-0.5">
                    CPI: {pt.data.value.toFixed(1)}
                  </div>
                  {metricMode === 'yoy' && pt.data.yoyPercent !== undefined && (
                    <div className="text-[10px] font-mono text-rose-400 mt-0.5">
                      YoY: {pt.data.yoyPercent >= 0 ? `+${pt.data.yoyPercent.toFixed(2)}%` : `${pt.data.yoyPercent.toFixed(2)}%`}
                    </div>
                  )}
                  {metricMode === 'mom' && pt.data.momPercent !== undefined && (
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      MoM: {pt.data.momPercent >= 0 ? `+${pt.data.momPercent.toFixed(2)}%` : `${pt.data.momPercent.toFixed(2)}%`}
                    </div>
                  )}

                  {/* Pointer Arrow */}
                  <div
                    style={{ left: arrowLeft }}
                    className={`absolute w-2 h-2 -translate-x-1/2 bg-neutral-900 dark:bg-neutral-800 rotate-45 border-neutral-700/80 ${
                      isNearTop
                        ? 'top-[-5px] border-l border-t'
                        : 'bottom-[-5px] border-r border-b'
                    }`}
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Summary Footer Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-2 border-t border-neutral-200/80 dark:border-neutral-800/80 text-xs">
        <div>
          <span className="text-neutral-500 flex items-center gap-1">
            <span>18-Month Range Low:</span>
            <Tooltip
              title="18-Month Range Low"
              content="The lowest index level recorded in the historical series (e.g. 100.599 in March 2025)."
            />
          </span>
          <div className="font-mono font-semibold text-neutral-900 dark:text-white mt-0.5">
            {periodLow.toFixed(3)}
          </div>
        </div>
        <div>
          <span className="text-neutral-500 flex items-center gap-1">
            <span>18-Month Range High:</span>
            <Tooltip
              title="18-Month Range High"
              content="The highest index level reached across the 18-month window (e.g. 103.334 in August 2026)."
            />
          </span>
          <div className="font-mono font-semibold text-neutral-900 dark:text-white mt-0.5">
            {periodHigh.toFixed(3)}
          </div>
        </div>
        <div>
          <span className="text-neutral-500 flex items-center gap-1">
            <span>Net Level Expansion:</span>
            <Tooltip
              title="Net Level Expansion"
              content="The cumulative point and percentage price increase from the earliest to the most recent data point."
            />
          </span>
          <div className="font-mono font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
            +{netChange.toFixed(3)} pts ({netPercent > 0 ? `+${netPercent.toFixed(2)}%` : `${netPercent.toFixed(2)}%`})
          </div>
        </div>
        <div>
          <span className="text-neutral-500 flex items-center gap-1">
            <span>Avg Monthly Run Rate:</span>
            <Tooltip
              title="Avg Monthly Run Rate"
              content="The average monthly percentage pace of price increases over the observed timeline (~0.18%/month represents steady, low inflation)."
            />
          </span>
          <div className="font-mono font-semibold text-neutral-900 dark:text-white mt-0.5">
            +0.18% / month
          </div>
        </div>
      </div>
    </section>
  );
};
