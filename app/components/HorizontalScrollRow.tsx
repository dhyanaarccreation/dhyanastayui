"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Single-row, horizontally scrollable card strip with prev/next arrow
// buttons that fade in only once there's somewhere to scroll to. Shared by
// any homepage section that used to wrap onto further rows (stays, travel
// guides, ...) so they all get identical scroll/arrow behavior.
export default function HorizontalScrollRow({
  children,
  label,
  rowClassName = "flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory",
}: {
  children: ReactNode;
  /** Used in the arrow buttons' aria-labels, e.g. "stays" → "Show next stays". */
  label: string;
  rowClassName?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  // Re-check after layout/content changes (e.g. a filter or search changing
  // how many cards exist, which changes whether there's overflow at all).
  useEffect(() => {
    updateScrollState();
  });

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={scrollerRef} onScroll={updateScrollState} className={rowClassName}>
        {children}
      </div>

      {canScrollPrev && (
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label={`Show previous ${label}`}
          className="hidden sm:flex absolute left-0 top-[calc(50%-8px)] -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border shadow-organic items-center justify-center text-foreground hover:text-primary transition-colors z-10"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {canScrollNext && (
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label={`Show next ${label}`}
          className="hidden sm:flex absolute right-0 top-[calc(50%-8px)] -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-surface border border-border shadow-organic items-center justify-center text-foreground hover:text-primary transition-colors z-10"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
