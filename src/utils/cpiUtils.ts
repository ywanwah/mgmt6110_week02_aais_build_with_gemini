import { CpiApiResponse, CpiCategoryItem, MonthlyDataPoint } from '../types/cpi';

export function calculatePurchasingPower(currentCpi: number, baseIndex: number = 100): number {
  if (currentCpi <= 0) return 100;
  return Number(((baseIndex / currentCpi) * 100).toFixed(2));
}

export function exportCpiToCsv(data: CpiApiResponse): void {
  const headers = ['Period', 'CPI_Index_2024_Base', 'MoM_Change_Percent', 'YoY_Inflation_Percent'];
  const rows = data.recentMonthly.map((m) => [
    m.period,
    m.value.toFixed(3),
    m.momPercent !== undefined ? m.momPercent.toFixed(2) : '',
    m.yoyPercent !== undefined ? m.yoyPercent.toFixed(2) : ''
  ]);

  const csvContent = [
    `# Singapore Consumer Price Index (SingStat M213751)`,
    `# Base Year: 2024 = 100.0`,
    `# Source: Singapore Department of Statistics (SingStat)`,
    `# Exported: ${new Date().toISOString()}`,
    headers.join(','),
    ...rows.map((r) => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `singapore_cpi_${data.latest.period.replace(/\s+/g, '_').toLowerCase()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportCategoriesToCsv(categories: CpiCategoryItem[], latestPeriod: string): void {
  const headers = ['Series_No', 'Category_Name', 'Group', 'Weight_Percent', 'Latest_Index', 'MoM_Percent', 'YoY_Percent', 'Notes'];
  const rows = categories.map((c) => [
    `"${c.seriesNo}"`,
    `"${c.name}"`,
    `"${c.group || ''}"`,
    c.weight ?? '',
    c.value.toFixed(3),
    c.momPercent.toFixed(2),
    c.yoyPercent.toFixed(2),
    `"${(c.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [
    `# Singapore CPI Categories & Basket Weights (${latestPeriod})`,
    `# Base Year 2024=100.0 · SingStat`,
    headers.join(','),
    ...rows.map((r) => r.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `singstat_cpi_categories_${latestPeriod.replace(/\s+/g, '_').toLowerCase()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadJson(data: unknown, filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
