export interface CpiLatest {
  period: string;
  value: number;
  unit: string;
  momPercent: number;
  yoyPercent: number;
  momChange: number;
  yoyChange: number;
  prevPeriod: string;
  yoyPeriod: string;
}

export interface MonthlyDataPoint {
  period: string;
  value: number;
  momPercent?: number;
  yoyPercent?: number;
}

export interface CpiCategoryItem {
  seriesNo: string;
  name: string;
  group?: string;
  value: number;
  unit: string;
  momPercent: number;
  yoyPercent: number;
  weight?: number; // e.g., per 1,000 or percentage (100%)
  history?: number[];
  notes?: string;
}

export interface CpiApiResponse {
  empty: boolean;
  resourceId: string;
  title: string;
  frequency: string;
  baseYear: string;
  datasource: string;
  dataLastUpdated: string;
  footnote: string;
  latest: CpiLatest;
  recentMonthly: MonthlyDataPoint[];
  categories: CpiCategoryItem[];
}

export interface ApiHealthStatus {
  keyConfigured: boolean;
  upstreamAnswered: boolean;
  upstreamStatus: number;
  ok: boolean;
  message: string;
  latencyMs?: number;
  checkedAt?: string;
}

export type CpiViewTab = 'overview' | 'breakdown' | 'calculator' | 'ledger';
export type ChartMetricMode = 'index' | 'yoy' | 'mom';
