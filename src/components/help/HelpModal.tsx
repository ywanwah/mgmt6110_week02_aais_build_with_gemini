import React, { useState, useEffect, useId } from 'react';
import {
  X,
  Search,
  BookOpen,
  Compass,
  Palette,
  Clock,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight,
  BarChart3,
  Sliders,
  FileSpreadsheet,
  Activity,
  Check,
  MessageCircleQuestion,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { GLOSSARY_ITEMS, GlossaryItem } from './GlossaryData';
import { FAQ_ITEMS, FaqItem } from './FaqData';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: HelpTabId;
}

export type HelpTabId =
  | 'about'
  | 'navigation'
  | 'colors'
  | 'periods'
  | 'glossary'
  | 'faq'
  | 'interpretation';

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<HelpTabId>(initialTab);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('All');
  const [expandedGlossaryId, setExpandedGlossaryId] = useState<string | null>(null);

  // FAQ state
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('inflation-savings');

  // Sync initial tab when opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'CPI & Inflation Metrics', 'Household Economics', 'Policy & Governance', 'Chart & Data Metrics'];
  const faqCategories = ['All', 'Personal Finances & Savings', 'Understanding CPI', 'Policy & Economic Concepts', 'App & Calculations'];

  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = selectedGlossaryCategory === 'All' || item.category === selectedGlossaryCategory;
    const matchesQuery =
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.shortTooltip.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(glossarySearch.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedFaqCategory === 'All' || item.category === selectedFaqCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.shortAnswer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.detailedAnswer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.keyTakeaway.toLowerCase().includes(faqSearch.toLowerCase()) ||
      (item.relatedTerms && item.relatedTerms.some((t) => t.toLowerCase().includes(faqSearch.toLowerCase())));
    return matchesCategory && matchesQuery;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0f141f] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-900 dark:text-neutral-100 transition-colors"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 id="help-modal-title" className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                Help &amp; Documentation Guide
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Guide to Singapore Consumer Price Index (CPI) metrics &amp; terminal tools
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Help Modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/30 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'about'
                ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. About App</span>
          </button>
          <button
            onClick={() => setActiveTab('navigation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'navigation'
                ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>2. How to Navigate</span>
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'colors'
                ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>3. Colours &amp; Indicators</span>
          </button>
          <button
            onClick={() => setActiveTab('periods')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'periods'
                ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>4. Time Periods</span>
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'glossary'
                ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>5. Financial Glossary</span>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'faq'
                ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            <span>6. Frequently Asked Questions</span>
          </button>
          <button
            onClick={() => setActiveTab('interpretation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'interpretation'
                ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>7. How to Interpret</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          
          {/* TAB 1: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">
                  About Singapore CPI Terminal &amp; Spending Simulator
                </h3>
                <p className="text-xs text-blue-800/80 dark:text-blue-300 leading-relaxed">
                  This terminal provides an institutional overview of consumer price index inflation and household cost-of-living dynamics in Singapore. It consumes official monthly data published by the Singapore Department of Statistics (SingStat TableBuilder Resource M213751, Base Year 2024 = 100.0) and empowers users to explore both macro economic trends and their personal household financial impact.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white mb-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span>Macro Trends &amp; Core Gauges</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Track the official Headline All Items Index, Year-on-Year inflation rates, MAS Core Inflation, and real dollar purchasing power across an 18-month interactive historical timeline.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white mb-2">
                    <Layers className="w-4 h-4 text-emerald-500" />
                    <span>Granular Basket Breakdown</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Inspect individual expenditure categories from groceries, public transit, and housing utilities to medical fees, with exact weights derived from the Household Expenditure Survey.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-white mb-2">
                    <Sliders className="w-4 h-4 text-purple-500" />
                    <span>Personal Simulator</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Customize your household’s monthly expenditure and budget allocations to compute your true personal inflation rate and estimate additional monthly living costs.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                <span className="font-semibold text-neutral-900 dark:text-white block">Official Attribution:</span>
                <p>
                  Data provided by the Singapore Department of Statistics under the{' '}
                  <a
                    href="https://data.gov.sg/open-data-licence"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-600 dark:text-blue-400 font-medium"
                  >
                    Singapore Open Data Licence
                  </a>
                  . New CPI releases occur monthly around the 23rd of each calendar month.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: NAVIGATION GUIDE */}
          {activeTab === 'navigation' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Follow these simple steps to navigate the terminal and analyze Singapore inflation metrics:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Step 1 — Review Headline Macro Indicators
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      On the <strong>Overview &amp; Trends</strong> tab, review the top four KPI cards: <em>Headline All Items Index (pts)</em>, <em>YoY Headline Inflation (%)</em>, <em>MAS Core Inflation (%)</em>, and <em>Real $100 Purchasing Power</em>. Click the ⓘ icon beside any metric for an instant definition.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Step 2 — Interact with the 18-Month Trend Chart
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Explore the interactive SVG chart. Toggle between <strong>Index Level (2024=100)</strong>, <strong>YoY Inflation %</strong>, and <strong>MoM Velocity %</strong>. Switch the time window between <strong>6M</strong>, <strong>1Y</strong>, and <strong>18M All</strong>. Hover or tap along any point on the chart to inspect that specific month’s index and rate.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Step 3 — Drill into Expenditure Categories
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Navigate to the <strong>Expenditure Categories</strong> tab. Use the search bar to find items like <em>groceries</em>, <em>transport</em>, or <em>rent</em>. Filter rows by <em>Rising (&gt;2%)</em>, <em>Moderate (0-2%)</em>, <em>Deflating (&lt;0%)</em>, or <em>High Weight (&ge;5%)</em>. Click any table row to expand detailed item notes and base index comparison.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Step 4 — Simulate Your Household’s Personal Inflation
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Switch to the <strong>Personal Simulator</strong> tab. Adjust your estimated monthly budget in SGD, or choose a preset like <em>Young Professional</em>, <em>Family with Children</em>, or <em>Senior / Retiree</em>. Modify individual sliders to see your personal inflation rate, delta variance against the national rate, and extra monthly cost in SGD.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Step 5 — View Historical Ledger &amp; Export Data
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Check the <strong>Historical Ledger</strong> tab for full chronological records. Click <strong>Export CSV</strong> or <strong>Export JSON</strong> at any time to download the complete raw dataset for your own spreadsheet analysis.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    6
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Step 6 — Check API Health Diagnostics
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Click the green pulsing <strong>API Health</strong> button in the top navigation bar to test live upstream connectivity to the SingStat TableBuilder server, view upstream HTTP status, and inspect response latency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLOURS & INDICATORS */}
          {activeTab === 'colors' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300">
                <span className="font-bold block mb-1">Key Context: Inflation Colour Coding</span>
                Unlike stock markets where green means rising share prices, in consumer inflation and macroeconomic cost-of-living dashboards, price increases directly raise household expenditures.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span>Rose / Red (+% Positive Inflation)</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Indicates that prices or rates have increased relative to the comparison period (e.g., +2.30% YoY). For a consumer, this indicates higher out-of-pocket costs for that good or service. This describes price movement only and should not be interpreted as an investment recommendation.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span>Emerald / Green (-% Negative Change / Deflation)</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Indicates that prices have decreased relative to the preceding period (e.g., -0.45% MoM), or that an indicator is within the MAS target range. This signifies lower costs for consumers in that category.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Blue (Benchmark &amp; Core Indicators)</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Identifies official baseline metrics, such as the MAS Core Inflation rate, active chart lines, selected filters, and personal simulator outputs.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 border border-dashed border-red-700" />
                    <span>Dashed Red Line (MAS 2.0% Goal / Base 100.0)</span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Drawn on the trend chart as an economic reference horizon. In index mode, it marks 100.0 (the 2024 base level). In YoY mode, it represents the midpoint of the central bank's medium-term price stability corridor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TIME PERIODS */}
          {activeTab === 'periods' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                The terminal uses standardized macroeconomic abbreviations for time windows and statistical comparison baselines:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white block">MoM</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Month-on-Month</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Compares current month prices with the immediately preceding calendar month (e.g. August 2026 vs July 2026).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white block">YoY</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Year-on-Year</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Compares prices with the identical month 12 months earlier (e.g. August 2026 vs August 2025), removing regular seasonal distortions.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white block">6M</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Six-Month Horizon</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Filters the interactive chart to the most recent 6 consecutive months for analyzing recent price momentum.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white block">1Y</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">One-Year Horizon</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Filters the chart to the past 12 consecutive months of historical CPI readings.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white block">18M / ALL</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Full 18-Month Archive</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Displays all 18 months of official verified data spanning March 2025 through August 2026.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                  <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white block">2024 = 100</span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Base Year Standardization</span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    The reference benchmark where the general price level of the consumer basket is calibrated to 100.000.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FINANCIAL & ECONOMIC GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search terms (e.g. CPI, Headline, Core, Purchasing Power, S$NEER)..."
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedGlossaryCategory(cat)}
                      className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                        selectedGlossaryCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredGlossary.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No financial or economic terms matched "{glossarySearch}".
                </div>
              ) : (
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                  {filteredGlossary.map((item) => {
                    const isExpanded = expandedGlossaryId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="p-4 bg-white dark:bg-neutral-900/50 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
                      >
                        <div
                          onClick={() => setExpandedGlossaryId(isExpanded ? null : item.id)}
                          className="flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                              {item.term}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-mono">
                              {item.category}
                            </span>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 text-neutral-400 transition-transform ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </div>

                        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                          {item.shortTooltip}
                        </p>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2 text-xs">
                            <div>
                              <strong className="text-neutral-700 dark:text-neutral-300 block mb-0.5">
                                What does it measure?
                              </strong>
                              <p className="text-neutral-500 dark:text-neutral-400">
                                {item.measures}
                              </p>
                            </div>
                            <div>
                              <strong className="text-neutral-700 dark:text-neutral-300 block mb-0.5">
                                How should it be interpreted?
                              </strong>
                              <p className="text-neutral-500 dark:text-neutral-400">
                                {item.interpretation}
                              </p>
                            </div>
                            {item.contextNote && (
                              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/80 text-[11px] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                                <strong>Context note: </strong> {item.contextNote}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: FREQUENTLY ASKED QUESTIONS */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Introduction Banner */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircleQuestion className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200">
                    Frequently Asked Questions about Inflation &amp; CPI
                  </h3>
                  <p className="text-xs text-blue-800/80 dark:text-blue-300 leading-relaxed mt-0.5">
                    Clear, everyday answers to common inquiries about real purchasing power, savings preservation, basket differences, central bank policy, and terminal calculations.
                  </p>
                </div>
              </div>

              {/* Search and Category Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search questions (e.g. savings, personal experience, deflation, MAS)..."
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* FAQ Category Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                  {faqCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFaqCategory(cat)}
                      className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                        selectedFaqCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion List */}
              {filteredFaqs.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No questions matched "{faqSearch}". Try searching for terms like "savings", "cash", "experience", or "deflation".
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFaqs.map((faq) => {
                    const isExpanded = expandedFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                          isExpanded
                            ? 'border-blue-300 dark:border-blue-800/80 bg-blue-50/20 dark:bg-blue-950/10 shadow-xs'
                            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                          aria-expanded={isExpanded}
                          className="w-full text-left p-4 flex items-start justify-between gap-3 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-xl"
                        >
                          <div className="space-y-1 pr-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                {faq.category}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                              {faq.question}
                            </h4>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                              {faq.shortAnswer}
                            </p>
                          </div>
                          <div
                            className={`p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white shrink-0 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 border-t border-neutral-100 dark:border-neutral-800/80 text-xs space-y-3 animate-in fade-in duration-150">
                            <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                              {faq.detailedAnswer}
                            </div>

                            {/* Key Takeaway Box */}
                            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5">
                              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                              <div className="text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed">
                                <strong className="font-semibold block mb-0.5">Key Takeaway:</strong>
                                {faq.keyTakeaway}
                              </div>
                            </div>

                            {/* Related Glossary Terms Chips */}
                            {faq.relatedTerms && faq.relatedTerms.length > 0 && (
                              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-neutral-500">
                                <span className="font-medium">Related concepts:</span>
                                <div className="flex flex-wrap gap-1">
                                  {faq.relatedTerms.map((term) => (
                                    <button
                                      key={term}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setGlossarySearch(term);
                                        setActiveTab('glossary');
                                      }}
                                      className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium text-[10px]"
                                    >
                                      {term} &rarr;
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: HOW TO INTERPRET */}
          {activeTab === 'interpretation' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Economic indicators should not be simplistically categorized as purely "good" or "bad". Interpretation depends on context, wage movements, and individual consumption habits:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    1. Index Level vs. Inflation Rate
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    The <strong>Index Level</strong> (e.g. 103.334) measures the accumulated price level relative to 2024=100. The <strong>Inflation Rate</strong> (e.g. +2.30% YoY) measures the <em>velocity</em> at which prices are rising. A slowing inflation rate (disinflation) means prices are still rising, but at a gentler pace; it does not mean prices are dropping.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    2. Headline vs. MAS Core Inflation
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Headline CPI reflects the entire consumption basket. However, MAS monitors Core Inflation because accommodation (which includes non-cash owner-occupied imputed rents) and private vehicle transport (driven by COE bidding and quota supply) can swing wildly due to administrative policies rather than broad demand pressures.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    3. Real Purchasing Power
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    When CPI rises, the real purchasing power of cash savings decreases (e.g. $100 SGD in 2024 is equivalent to ~$96.77 of goods today). However, if household salaries increase by 3.5% over the same period while inflation is 2.3%, real household purchasing power actually expands.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    4. Personal Inflation vs. National Average
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    The national headline CPI is a weighted median across all resident households. If you do not own a car or have already paid off your mortgage, your lived inflation may be lower than the headline rate. Conversely, if your family spends heavily on food delivery, healthcare, or tuition, you will experience higher localized inflation.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 text-xs">
          <span className="text-neutral-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[10px]">ESC</kbd> to close
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
