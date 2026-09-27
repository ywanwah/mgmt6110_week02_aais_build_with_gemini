import React, { useState, useRef, useEffect, useLayoutEffect, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
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

interface TooltipCoords {
  top: number;
  left: number;
  placedSide: 'top' | 'bottom';
  arrowLeft: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  title,
  className = '',
  side = 'top',
  iconSize = 14,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<TooltipCoords | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const tooltipId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();

    // If trigger element has no dimensions, do nothing
    if (triggerRect.width === 0 && triggerRect.height === 0) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const edgeMargin = 12; // Min margin from screen edges
    const gap = 8; // Spacing between trigger and tooltip

    // Measure or estimate tooltip dimensions
    const tooltipEl = tooltipRef.current;
    const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 288;
    const tooltipHeight = tooltipEl ? tooltipEl.offsetHeight : 120;

    // Determine vertical placement: prefer 'top', but flip to 'bottom' if space is insufficient
    let placedSide: 'top' | 'bottom' = side === 'bottom' ? 'bottom' : 'top';
    const spaceAbove = triggerRect.top;
    const spaceBelow = viewportHeight - triggerRect.bottom;

    if (placedSide === 'top') {
      if (spaceAbove < tooltipHeight + gap + edgeMargin && spaceBelow > spaceAbove) {
        placedSide = 'bottom';
      }
    } else {
      if (spaceBelow < tooltipHeight + gap + edgeMargin && spaceAbove > spaceBelow) {
        placedSide = 'top';
      }
    }

    let top = 0;
    if (placedSide === 'top') {
      top = triggerRect.top - tooltipHeight - gap;
    } else {
      top = triggerRect.bottom + gap;
    }

    // Clamp top to viewport bounds
    top = Math.max(edgeMargin, Math.min(viewportHeight - tooltipHeight - edgeMargin, top));

    // Center horizontally over the trigger
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    let left = triggerCenter - tooltipWidth / 2;

    // Clamp horizontally so it stays inside viewport
    left = Math.max(edgeMargin, Math.min(viewportWidth - tooltipWidth - edgeMargin, left));

    // Arrow pointer position relative to tooltip box
    const arrowLeft = Math.max(16, Math.min(tooltipWidth - 16, triggerCenter - left));

    setCoords({
      top,
      left,
      placedSide,
      arrowLeft,
    });
  }, [side]);

  // Update position on mount / when isOpen changes
  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition, content, title]);

  // Keep tooltip aligned on window resize or scroll in any parent container
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      if (!triggerRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const isOffScreen =
        triggerRect.bottom < 0 ||
        triggerRect.top > window.innerHeight ||
        triggerRect.right < 0 ||
        triggerRect.left > window.innerWidth;

      if (isOffScreen) {
        setIsOpen(false);
      } else {
        updatePosition();
      }
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen, updatePosition]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        tooltipRef.current?.contains(target)
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

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 120);
  };

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <span
      className={`inline-flex items-center justify-center leading-none align-middle shrink-0 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        onPointerDown={(e) => e.stopPropagation()}
        onFocus={() => setIsOpen(true)}
        onBlur={(e) => {
          if (!tooltipRef.current?.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
          }
        }}
        aria-describedby={isOpen ? tooltipId : undefined}
        aria-expanded={isOpen}
        aria-label={title ? `Information about ${title}` : 'Help information'}
        className={`inline-flex items-center justify-center p-0.5 rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 shrink-0 ${
          isOpen
            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 ring-1 ring-blue-300 dark:ring-blue-800'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
        }`}
      >
        <Info
          style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
          className="shrink-0"
          aria-hidden="true"
        />
      </button>

      {isOpen && mounted && createPortal(
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          style={{
            position: 'fixed',
            top: coords ? `${coords.top}px` : '-9999px',
            left: coords ? `${coords.left}px` : '-9999px',
            visibility: coords ? 'visible' : 'hidden',
          }}
          className="z-[9999] w-72 max-w-[calc(100vw-24px)] p-3 rounded-xl bg-neutral-900/95 dark:bg-neutral-800/95 text-white shadow-2xl backdrop-blur-md border border-neutral-700/80 text-xs font-normal leading-relaxed animate-in fade-in zoom-in-95 duration-150 pointer-events-auto select-text"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-start justify-between gap-2 pb-1.5 mb-1.5 border-b border-neutral-700/60">
            <span className="font-semibold text-neutral-100 text-[11px] tracking-wide flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              <span>{title || 'Financial Explanation'}</span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-neutral-400 hover:text-white rounded p-0.5 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-neutral-300 text-[11px] leading-relaxed space-y-1">
            {typeof content === 'string' ? <p>{content}</p> : content}
          </div>

          {/* Pointer Arrow */}
          {coords && (
            <div
              style={{ left: `${coords.arrowLeft}px` }}
              className={`absolute w-2 h-2 -translate-x-1/2 bg-neutral-900 dark:bg-neutral-800 rotate-45 border-neutral-700/80 ${
                coords.placedSide === 'top'
                  ? 'bottom-[-5px] border-r border-b'
                  : 'top-[-5px] border-l border-t'
              }`}
            />
          )}
        </div>,
        document.body
      )}
    </span>
  );
};
