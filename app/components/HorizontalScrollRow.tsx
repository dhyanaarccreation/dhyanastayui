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
  rowClassName = "flex gap-4 sm:gap-5 overflow-x-auto pt-2 -mt-2 pb-3 -mx-[4.3478%] sm:mx-0 scrollbar-hide snap-x snap-mandatory",
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

  // Below sm the row bleeds out past the page gutter (-mx matches the 4%
  // viewport gutter that .container-page leaves at its 92% mobile width), so a
  // swiped card snaps flush to the screen edge rather than stopping short of
  // it. From sm up the margins reset and the arrows take over.
  //
  // overflow-x:auto makes overflow-y compute as auto too, so anything drawn
  // outside a card is clipped at the scroll box. The small pt/-mt pair gives the
  // 4px hover lift room without shifting the row.
  //
  // One "page" is exactly the set of cards currently in view. Cards are sized
  // so N of them plus their gaps fill clientWidth, which makes a page advance
  // clientWidth + one gap. The browser clamps scrollLeft at the end, so a final
  // partial page lands flush right — a full row of cards, the last one included,
  // rather than one lonely card with dead space beside it.
  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (el.clientWidth + gap), behavior: "smooth" });
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
