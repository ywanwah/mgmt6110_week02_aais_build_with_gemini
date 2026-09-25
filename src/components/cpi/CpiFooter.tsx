import React from 'react';
import { ExternalLink, Database, Shield, BookOpen } from 'lucide-react';

interface CpiFooterProps {
  footnote: string;
  dataLastUpdated: string;
}

export const CpiFooter: React.FC<CpiFooterProps> = ({ footnote, dataLastUpdated }) => {
  return (
    <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#090d14] text-xs text-neutral-500 dark:text-neutral-400 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Footnote & Technical Note */}
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Official Methodology &amp; Weighting Pattern</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-[11px]">
            {footnote}
          </p>
          <div className="mt-2 text-[11px] text-neutral-500 flex flex-wrap items-center gap-3">
            <span>Base Year: 2024 = 100.0</span>
            <span aria-hidden="true">·</span>
            <span>Index Type: Laspeyres Fixed-Basket Formula</span>
            <span aria-hidden="true">·</span>
            <span>Release Schedule: 23rd of every calendar month</span>
            <span aria-hidden="true">·</span>
            <span>Latest Official Update: {dataLastUpdated}</span>
          </div>
        </div>

        {/* Source Attribution & Legal Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Singapore Department of Statistics
            </span>
            <span aria-hidden="true">·</span>
            <span>SingStat TableBuilder API</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            
              href="https://tablebuilder.singstat.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>TableBuilder Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            
              href="https://data.gov.sg/open-data-licence"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <span>Singapore Open Data Licence</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>All rights reserved © 2026</span>
          </div>
        </div>

        {/* Privacy Notice: Microsoft Clarity & Disqus */}
        <p className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          This page uses Microsoft Clarity and Disqus, which use cookies to record how visitors
          use the site and to host comments. By using this page you agree that we and Microsoft
          may collect and use this data. See the{' '}
          <a href="https://www.microsoft.com/privacy/privacystatement" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900 dark:hover:text-white">
            Microsoft Privacy Statement
          </a>
          , the{' '}
          <a href="https://disqus.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900 dark:hover:text-white">
            Disqus privacy policy
          </a>{' '}
          and the{' '}
          <a href="https://disqus.com/data-sharing-settings/" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-900 dark:hover:text-white">
            Disqus data sharing settings
          </a>
          .
        </p>

      </div>
    </footer>
  );
};
