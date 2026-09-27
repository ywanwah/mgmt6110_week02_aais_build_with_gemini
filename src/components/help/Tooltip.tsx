import React, { useState, useRef, useEffect, useId } from 'react';
import { Info, X } from 'lucide-react';

export interface TooltipProps {
  content: string | React.ReactNode;
  title?: string;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  iconSize?: number;
  inline?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  title,
  className = '',
  side = 'top',
  align = 'center',
  iconSize = 13,
  inline = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        tooltipRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  // Alignment styling
  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  }[align];

  const sideClasses = {
    top: `bottom-full mb-2 ${alignClasses}`,
    bottom: `top-full mt-2 ${alignClasses}`,
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }[side];

  return (
    <span
      className={`relative ${inline ? 'inline-flex items-center' : 'flex'} ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        onFocus={() => setIsOpen(true)}
        onBlur={(e) => {
          // If moving focus to tooltip itself, keep it open
          if (!tooltipRef.current?.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
          }
        }}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-expanded={isOpen}
        aria-label={title ? `Information about ${title}` : 'Help information'}
        className="inline-flex items-center justify-center p-0.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <Info
          style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
          className="shrink-0"
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={`absolute z-50 w-72 max-w-[85vw] p-3 rounded-xl bg-neutral-900/95 dark:bg-neutral-800/95 text-white shadow-xl backdrop-blur-md border border-neutral-700/80 text-xs font-normal leading-relaxed animate-in fade-in zoom-in-95 duration-150 pointer-events-auto ${sideClasses}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2 pb-1.5 mb-1.5 border-b border-neutral-700/60">
            <span className="font-semibold text-neutral-100 text-[11px] tracking-wide flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
              {title || 'Financial Explanation'}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white rounded p-0.5 transition-colors sm:hidden"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="text-neutral-300 text-[11px] space-y-1">
            {typeof content === 'string' ? <p>{content}</p> : content}
          </div>

          {/* Pointer Arrow */}
          <div
            className={`absolute w-2 h-2 bg-neutral-900 dark:bg-neutral-800 rotate-45 border-neutral-700/80 ${
              side === 'top'
                ? 'bottom-[-5px] border-r border-b ' +
                  (align === 'center'
                    ? 'left-1/2 -translate-x-1/2'
                    : align === 'start'
                    ? 'left-3'
                    : 'right-3')
                : side === 'bottom'
                ? 'top-[-5px] border-l border-t ' +
                  (align === 'center'
                    ? 'left-1/2 -translate-x-1/2'
                    : align === 'start'
                    ? 'left-3'
                    : 'right-3')
                : side === 'left'
                ? 'right-[-5px] top-1/2 -translate-y-1/2 border-r border-t'
                : 'left-[-5px] top-1/2 -translate-y-1/2 border-l border-b'
            }`}
          />
        </div>
      )}
    </span>
  );
};
