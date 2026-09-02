import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('pro');
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>(['Interactive Brokers']);

  const brokersList = [
    { name: 'Interactive Brokers', icon: '🏛️', status: 'Direct DMA Routing' },
    { name: 'Binance & Crypto API', icon: '🪙', status: '24/7 Spot & Perpetuals' },
    { name: 'Alpaca Trading API', icon: '🦙', status: 'Commission-free Paper/Live' },
    { name: 'Charles Schwab / TD', icon: '📈', status: 'US Equities & Options' },
  ];

  const toggleBroker = (name: string) => {
    if (selectedBrokers.includes(name)) {
      setSelectedBrokers(selectedBrokers.filter((b) => b !== name));
    } else {
      setSelectedBrokers([...selectedBrokers, name]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#191b24] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E0E3EB] dark:border-[#2e303a] p-6 overflow-hidden animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#787B86] hover:text-[#191b24] dark:hover:text-white rounded-full hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a]"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#2962ff]">
              <Zap className="w-6 h-6" />
              <span className="font-['Hanken_Grotesk'] font-bold text-sm tracking-wider uppercase">
                Welcome to FinancialHub
              </span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#191b24] dark:text-white">
              Institutional Market Data & Execution
            </h3>
            <p className="text-xs md:text-sm text-[#787B86]">
              Unlock sub-millisecond Level 2 quotes, order flow analysis, global indices, and multi-asset trading integrations.
            </p>

            <div className="space-y-2.5 pt-2">
              <div
                onClick={() => setSelectedPlan('free')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedPlan === 'free'
                    ? 'border-[#2962ff] bg-[#f3f2ff] dark:bg-[#232632]'
                    : 'border-[#E0E3EB] dark:border-[#2e303a]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm text-[#191b24] dark:text-white">
                    Starter Trader
                  </div>
                  <span className="text-xs font-bold font-mono">$0 / month</span>
                </div>
                <p className="text-xs text-[#787B86] mt-1">Real-time quotes for US stocks, crypto, and basic charting.</p>
              </div>

              <div
                onClick={() => setSelectedPlan('pro')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all relative ${
                  selectedPlan === 'pro'
                    ? 'border-[#2962ff] bg-[#f3f2ff] dark:bg-[#232632]'
                    : 'border-[#E0E3EB] dark:border-[#2e303a]'
                }`}
              >
                <span className="absolute top-3 right-3 text-[10px] bg-[#2962ff] text-white px-2 py-0.5 rounded-full font-bold">
                  RECOMMENDED
                </span>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm text-[#191b24] dark:text-white">
                    Pro Terminal Access
                  </div>
                  <span className="text-xs font-bold font-mono">$29 / month</span>
                </div>
                <p className="text-xs text-[#787B86] mt-1">
                  Full Level 2 order books, custom price alerts, macroeconomic models, and live API webhooks.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-4 bg-[#2962ff] hover:bg-[#0049db] text-white py-3 rounded-full font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Continue Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#191b24] dark:text-white">
              Connect Broker & Data Feeds
            </h3>
            <p className="text-xs text-[#787B86]">
              Select which liquidity venues and brokerages you would like to route orders through.
            </p>

            <div className="space-y-2 pt-2">
              {brokersList.map((broker) => {
                const isSelected = selectedBrokers.includes(broker.name);
                return (
                  <div
                    key={broker.name}
                    onClick={() => toggleBroker(broker.name)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-[#2962ff] bg-[#f3f2ff] dark:bg-[#232632]'
                        : 'border-[#E0E3EB] dark:border-[#2e303a]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{broker.icon}</span>
                      <div>
                        <div className="font-semibold text-xs text-[#191b24] dark:text-white">
                          {broker.name}
                        </div>
                        <div className="text-[11px] text-[#787B86]">{broker.status}</div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#2962ff] text-white' : 'border border-[#787B86]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#787B86]">
              <ShieldCheck className="w-4 h-4 text-[#089981]" />
              <span>All connections use end-to-end 256-bit encrypted API keys.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-2.5 rounded-full border border-[#E0E3EB] dark:border-[#383b48] text-xs font-semibold hover:bg-[#f3f2ff] dark:hover:bg-[#2e303a]"
              >
                Back
              </button>
              <button
                onClick={onClose}
                className="w-2/3 bg-[#2962ff] hover:bg-[#0049db] text-white py-2.5 rounded-full text-xs font-semibold transition-colors"
              >
                Launch FinancialHub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
