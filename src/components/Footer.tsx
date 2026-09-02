import React from 'react';

interface FooterProps {
  onOpenLegal: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const footerLinks = [
    { label: 'Terms of Service', topic: 'terms' },
    { label: 'Privacy Policy', topic: 'privacy' },
    { label: 'Help Center', topic: 'help' },
    { label: 'Cookies', topic: 'cookies' },
    { label: 'Status', topic: 'status' },
  ];

  return (
    <footer className="bg-white dark:bg-[#191b24] border-t border-[#E0E3EB] dark:border-[#2e303a] transition-colors duration-200 mt-16">
      <div className="w-full py-12 px-4 md:px-6 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Name */}
        <div className="font-['Hanken_Grotesk'] text-2xl md:text-[28px] text-[#191b24] dark:text-white font-bold tracking-tight">
          FinancialHub
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onOpenLegal(link.topic)}
              className="text-[#5a5e6b] dark:text-[#c3c6d5] hover:text-[#0049db] dark:hover:text-[#88b0ff] transition-colors font-['Inter'] text-sm"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Copyright notice */}
        <div className="text-[#5a5e6b] dark:text-[#9ea2b5] font-['Inter'] text-xs text-center md:text-right">
          © 2024 FinancialHub Markets Inc. Data provided by major exchanges.
        </div>
      </div>
    </footer>
  );
};
