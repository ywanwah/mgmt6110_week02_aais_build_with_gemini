import React from 'react';
import { X, Shield, BookOpen, Activity, Lock, HelpCircle } from 'lucide-react';

interface InfoModalProps {
  topic: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  const getContent = () => {
    switch (topic) {
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <BookOpen className="w-5 h-5 text-[#2962ff]" />,
          body: (
            <div className="space-y-3 text-xs text-[#5a5e6b] dark:text-[#c3c6d5] leading-relaxed">
              <p>
                FinancialHub provides financial market data, index tracking, order routing simulators, and analytics tools for informational and analytical purposes.
              </p>
              <p>
                Market data is sourced directly from major global exchanges including NYSE, NASDAQ, CME, LSE, and TSE. Quotes are updated in real-time or subject to regulatory dissemination delays where applicable.
              </p>
              <p>
                Trading in financial instruments, equities, futures, and digital assets carries inherent risk. Users are responsible for evaluating market conditions and risks.
              </p>
            </div>
          ),
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Lock className="w-5 h-5 text-[#089981]" />,
          body: (
            <div className="space-y-3 text-xs text-[#5a5e6b] dark:text-[#c3c6d5] leading-relaxed">
              <p>
                Your privacy and data security are paramount. FinancialHub adheres strictly to institutional data protection standards.
              </p>
              <p>
                All API keys, custom watchlists, and alert thresholds are stored in your secure client environment. We do not sell user data to third-party brokers.
              </p>
            </div>
          ),
        };
      case 'status':
        return {
          title: 'System & Exchange Feed Status',
          icon: <Activity className="w-5 h-5 text-[#089981]" />,
          body: (
            <div className="space-y-3 text-xs text-[#5a5e6b] dark:text-[#c3c6d5]">
              <div className="flex items-center justify-between p-2.5 bg-[#f3f2ff] dark:bg-[#232632] rounded-lg">
                <span className="font-semibold text-[#191b24] dark:text-white">US Equities (NASDAQ / NYSE)</span>
                <span className="text-[#089981] font-bold font-mono">Operational (0.4ms)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#f3f2ff] dark:bg-[#232632] rounded-lg">
                <span className="font-semibold text-[#191b24] dark:text-white">Crypto 24/7 Spot & Futures Feed</span>
                <span className="text-[#089981] font-bold font-mono">Operational (1.2ms)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#f3f2ff] dark:bg-[#232632] rounded-lg">
                <span className="font-semibold text-[#191b24] dark:text-white">CME Futures & Forex Stream</span>
                <span className="text-[#089981] font-bold font-mono">Operational (0.8ms)</span>
              </div>
            </div>
          ),
        };
      case 'help':
        return {
          title: 'Help Center & Documentation',
          icon: <HelpCircle className="w-5 h-5 text-[#2962ff]" />,
          body: (
            <div className="space-y-3 text-xs text-[#5a5e6b] dark:text-[#c3c6d5] leading-relaxed">
              <p>
                <strong>Keyboard Shortcuts:</strong> Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-[10px]">Ctrl+K</kbd> or <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded font-mono text-[10px]">Cmd+K</kbd> anywhere to open instant ticker search.
              </p>
              <p>
                <strong>Interactive Charts:</strong> Hover over any chart point to inspect timestamped price values. Switch between Candlestick and Area mode.
              </p>
              <p>
                <strong>Live Ticks:</strong> Toggle live tick simulation in the header to observe real-time bid-ask volatility.
              </p>
            </div>
          ),
        };
      case 'cookies':
        return {
          title: 'Cookie Preferences',
          icon: <Shield className="w-5 h-5 text-[#2962ff]" />,
          body: (
            <p className="text-xs text-[#5a5e6b] dark:text-[#c3c6d5] leading-relaxed">
              FinancialHub uses essential local storage tokens to preserve your dark/light theme preferences and customized watchlists. No tracking beacons are used.
            </p>
          ),
        };
      default:
        return {
          title: topic.charAt(0).toUpperCase() + topic.slice(1),
          icon: <Shield className="w-5 h-5 text-[#2962ff]" />,
          body: (
            <p className="text-xs text-[#5a5e6b] dark:text-[#c3c6d5] leading-relaxed">
              Explore FinancialHub&apos;s institutional tools, community trading ideas, and broker routing integrations.
            </p>
          ),
        };
    }
  };

  const content = getContent();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#191b24] w-full max-w-md rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2e303a] p-6 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E3EB] dark:border-[#2e303a] mb-4">
          <div className="flex items-center gap-2.5">
            {content.icon}
            <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#191b24] dark:text-white">
              {content.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#787B86] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{content.body}</div>

        <div className="mt-6 pt-4 border-t border-[#E0E3EB] dark:border-[#2e303a] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2962ff] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#0049db] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
