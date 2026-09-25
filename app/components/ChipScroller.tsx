"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// A single-line, horizontally scrollable strip of filter chips with bare
// chevrons on either side. The chevrons are flex siblings of the scroller
// rather than overlays, so chips never slide underneath them, and each one
// only appears while there is somewhere to scroll in that direction. The
// gradients fade whichever edge can still scroll, so a part-clipped chip
// reads as "continues" instead of as a rendering bug.
export default function ChipScroller({
  children,
  label,
  className = "",
  contentClassName = "gap-3",
}: {
  children: ReactNode;
  /** Used in the chevrons' aria-labels, e.g. "categories". */
  label: string;
  /** Applied to the outer wrapper — e.g. `container-page`. */
  className?: string;
  /** Layout classes for the scrolling strip itself (gap, justify…). Replaces
   *  the default gap rather than sitting alongside it, since two competing
   *  gap utilities resolve by CSS order, not class-string order. */
  contentClassName?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScroll({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  // Re-check after layout/content changes (e.g. the chip set changing).
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // Wired up as a native listener (not JSX onWheel) so preventDefault actually
  // takes effect — React's synthetic wheel handler is passive.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const chevron =
    "shrink-0 w-5 h-7 flex items-center justify-center text-subtle hover:text-primary transition-colors";
  const fade = "pointer-events-none absolute top-0 bottom-0 w-8 z-10";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {canScroll.left && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label={`Show previous ${label}`}
          className={chevron}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      <div className="relative flex-1 min-w-0">
        <div
          ref={scrollerRef}
          onScroll={update}
          className={`flex items-center py-1 overflow-x-auto scrollbar-hide ${contentClassName}`}
        >
          {children}
        </div>

        {canScroll.left && (
          <div className={`${fade} left-0 bg-gradient-to-r from-background via-background/70 to-transparent`} />
        )}
        {canScroll.right && (
          <div className={`${fade} right-0 bg-gradient-to-l from-background via-background/70 to-transparent`} />
        )}
      </div>

      {canScroll.right && (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label={`Show more ${label}`}
          className={chevron}
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
