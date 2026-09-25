import React, { useState, useMemo } from 'react';
import { MonthlyDataPoint, ChartMetricMode } from '../../types/cpi';
import { ArrowUpRight, ArrowDownRight, Maximize2, Layers } from 'lucide-react';

interface CpiTrendChartProps {
  data: MonthlyDataPoint[];
}

export const CpiTrendChart: React.FC<CpiTrendChartProps> = ({ data }) => {
  const [metricMode, setMetricMode] = useState<ChartMetricMode>('index');
  const [timeRange, setTimeRange] = useState<'6M' | '1Y' | 'ALL'>('ALL');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

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

      {/* Control Strip: Metric Mode & Time Ranges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Metric Mode Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200/80 dark:border-neutral-800">
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
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full overflow-x-auto select-none">
        <div className="min-w-[560px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
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
                  className={`transition-all ${
                    hoverIndex === i
                      ? 'fill-blue-600 dark:fill-blue-400 stroke-white dark:stroke-neutral-900 stroke-2'
                      : 'fill-blue-500/80 hover:fill-blue-600'
                  }`}
                />
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
                className="text-neutral-400 dark:text-neutral-600"
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
                  className="text-[11px] font-mono fill-neutral-500 dark:fill-neutral-400"
                >
                  {pt.data.period.replace('20', "'")}
                </text>
              );
            })}

            {/* Invisible Hit Zones for Hover */}
            {points.map((pt, i) => {
              const colWidth = innerWidth / (points.length || 1);
              return (
                <rect
                  key={i}
                  x={pt.x - colWidth / 2}
                  y={padding.top}
                  width={colWidth}
                  height={innerHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Summary Footer Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-2 border-t border-neutral-200/80 dark:border-neutral-800/80 text-xs">
        <div>
          <span className="text-neutral-500">18-Month Range Low:</span>
          <div className="font-mono font-semibold text-neutral-900 dark:text-white mt-0.5">
            {periodLow.toFixed(3)}
          </div>
        </div>
        <div>
          <span className="text-neutral-500">18-Month Range High:</span>
          <div className="font-mono font-semibold text-neutral-900 dark:text-white mt-0.5">
            {periodHigh.toFixed(3)}
          </div>
        </div>
        <div>
          <span className="text-neutral-500">Net Level Expansion:</span>
          <div className="font-mono font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
            +{netChange.toFixed(3)} pts ({netPercent > 0 ? `+${netPercent.toFixed(2)}%` : `${netPercent.toFixed(2)}%`})
          </div>
        </div>
        <div>
          <span className="text-neutral-500">Avg Monthly Run Rate:</span>
          <div className="font-mono font-semibold text-neutral-900 dark:text-white mt-0.5">
            +0.18% / month
          </div>
        </div>
      </div>
    </section>
  );
};
