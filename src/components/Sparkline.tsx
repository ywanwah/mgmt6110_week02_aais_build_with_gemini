import React from 'react';

interface SparklineProps {
  data: number[];
  isPositive: boolean;
  width?: number;
  height?: number;
  showGradient?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  isPositive,
  width = 110,
  height = 36,
  showGradient = true,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const paddingY = 4;
  const usableHeight = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - paddingY - ((val - min) / range) * usableHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const strokeColor = isPositive ? '#089981' : '#F23645';
  const fillGradientId = `spark-grad-${isPositive ? 'up' : 'down'}-${Math.random().toString(36).substring(2, 7)}`;
  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible select-none pointer-events-none">
      <defs>
        <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {showGradient && <path d={areaD} fill={`url(#${fillGradientId})`} />}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
