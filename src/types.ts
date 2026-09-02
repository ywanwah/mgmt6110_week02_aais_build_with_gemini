export type MarketCategory = 'US stocks' | 'World stocks' | 'Crypto' | 'Futures' | 'Forex' | 'Economy';

export interface PricePoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
}

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  badgeNumber?: number | string;
  badgeColor?: 'red' | 'blue' | 'green' | 'amber';
  high24h: number;
  low24h: number;
  volume: string;
  marketCap?: string;
  sparkline: number[];
  history: {
    '1D': PricePoint[];
    '5D': PricePoint[];
    '1M': PricePoint[];
    '6M': PricePoint[];
    '1Y': PricePoint[];
    'ALL': PricePoint[];
  };
  sector?: string;
  peRatio?: number;
  dividendYield?: number;
  beta?: number;
  description: string;
  news: {
    id: string;
    title: string;
    source: string;
    time: string;
    sentiment: 'bullish' | 'bearish' | 'neutral';
  }[];
}

export interface EconomicIndicator {
  id: string;
  name: string;
  country: string;
  currentValue: string;
  previousValue: string;
  forecastValue: string;
  releaseDate: string;
  impact: 'High' | 'Medium' | 'Low';
  trend: 'up' | 'down' | 'neutral';
  sparkline: number[];
  unit: string;
  description: string;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: string;
  targetAlertPrice?: number;
}
