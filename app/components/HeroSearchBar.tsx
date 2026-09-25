"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CalendarDays, Minus, Plus, Search, Users } from "lucide-react";
import { useSearchQuery } from "@/lib/useSearchQuery";

interface HeroSearchBarProps {
  /** Where the Search button routes to. Defaults to the homepage's stays grid. */
  searchHref?: string;
}

// The capsule spans the full container width (a sibling of the hero grid, not
// a child of its left column), so all four segments share a single row once
// there is room for them. They need ~665px together, which the 80%
// container only clears from ~860px up — hence the arbitrary breakpoint
// rather than md. Below that they stack into one column.
//
// Radius: `rounded-full` is a true pill on the short, wide single-row shape.
// On the tall mobile stack the same class computes a ~90px corner that eats
// into the first row's own text, so mobile keeps a fixed radius instead.
const CAPSULE_TREATMENT =
  "bg-surface border border-[var(--surface-border)] rounded-[28px] min-[860px]:rounded-full overflow-hidden " +
  "shadow-[var(--shadow-soft)]";

// A thin gradient line — never a background/card. Horizontal between the
// stacked rows on mobile, vertical between segments once they share a row.
const DIVIDER =
  "shrink-0 h-px mx-4 bg-gradient-to-r from-transparent via-black/10 to-transparent " +
  "min-[860px]:h-auto min-[860px]:w-px min-[860px]:mx-0 min-[860px]:my-2.5 min-[860px]:self-stretch min-[860px]:bg-gradient-to-b " +
  "min-[860px]:from-transparent min-[860px]:via-black/10 min-[860px]:to-transparent";

const DATE_INPUT_CLASS =
  "bg-transparent border-none shadow-none text-foreground text-[12px] tracking-tight " +
  "focus:outline-none appearance-none [color-scheme:light] w-[76px] " +
  "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute " +
  "[&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full " +
  "[&::-webkit-calendar-picker-indicator]:cursor-pointer relative";

/** Opens the native date picker on click anywhere in the field, not just its
 *  tiny calendar-icon hit target — falls back silently where `showPicker`
 *  isn't supported (the input itself still opens it on direct click there). */
function openPicker(el: HTMLInputElement | null) {
  try {
    el?.showPicker?.();
  } catch {
    // Unsupported / blocked (e.g. not a user gesture in some browsers) —
    // the input is still directly clickable as a fallback.
  }
}

export default function HeroSearchBar({ searchHref = "/#explore-stays" }: HeroSearchBarProps) {
  const { query, setQuery } = useSearchQuery();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  return (
    // Capped well below the container width and centred, so the capsule stays
    // a compact target instead of stretching the full page on wide screens.
    <div className="relative w-full max-w-4xl mx-auto">
      {/* The ONLY element with background/border/shadow/radius in this component. */}
      <div
        role="search"
        aria-label="Search stays"
        className={`relative flex flex-col min-[860px]:flex-row min-[860px]:items-stretch min-[860px]:h-12 animate-fade-in-up ${CAPSULE_TREATMENT}`}
      >
        {/* Location — wired to the shared search context (lib/useSearchQuery.tsx),
            so typing here live-filters the "Explore All Stays" grid below,
            same as the destination detection already does. */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 min-[860px]:py-0 min-[860px]:flex-1 min-[860px]:pl-4 bg-transparent border-none shadow-none">
          <Search size={15} strokeWidth={1.75} className="text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to go?"
            aria-label="Search destination"
            className="w-full bg-transparent border-none shadow-none text-foreground placeholder-subtle text-[12px] tracking-tight focus:outline-none"
          />
        </div>

        <span className={DIVIDER} aria-hidden="true" />

        {/* Check-in / Check-out — real native date pickers; clicking anywhere
            in either field (not just the icon) opens the browser's picker. */}
        <div
          className="flex items-center gap-2 px-4 min-[860px]:px-3 py-2.5 min-[860px]:py-0 bg-transparent border-none shadow-none cursor-pointer"
          onClick={() => openPicker(checkInRef.current)}
        >
          <CalendarDays size={15} strokeWidth={1.75} className="text-muted shrink-0" />
          <input
            ref={checkInRef}
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Check-in date"
            className={DATE_INPUT_CLASS}
          />
          <span className="text-subtle">—</span>
          <input
            ref={checkOutRef}
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              openPicker(checkOutRef.current);
            }}
            aria-label="Check-out date"
            className={DATE_INPUT_CLASS}
          />
        </div>

        <span className={DIVIDER} aria-hidden="true" />

        {/* Guests — a real stepper, no fake dropdown. */}
        <div className="flex items-center gap-2 px-4 min-[860px]:px-3 py-2.5 min-[860px]:py-0 bg-transparent border-none shadow-none">
          <Users size={15} strokeWidth={1.75} className="text-muted shrink-0" />
          <button
            type="button"
            onClick={() => setGuests(Math.max(1, guests - 1))}
            disabled={guests <= 1}
            aria-label="Fewer guests"
            className="w-5 h-5 rounded-full border border-(--surface-border) flex items-center justify-center text-muted disabled:opacity-30 hover:border-primary/40 hover:text-primary transition-colors shrink-0"
          >
            <Minus size={10} />
          </button>
          <span className="text-[12px] text-foreground tracking-tight tabular-nums whitespace-nowrap">
            {guests} {guests === 1 ? "Guest" : "Guests"}
          </span>
          <button
            type="button"
            onClick={() => setGuests(Math.min(16, guests + 1))}
            disabled={guests >= 16}
            aria-label="More guests"
            className="w-5 h-5 rounded-full border border-(--surface-border) flex items-center justify-center text-muted disabled:opacity-30 hover:border-primary/40 hover:text-primary transition-colors shrink-0"
          >
            <Plus size={10} />
          </button>
        </div>

        {/* Search button — the one deliberate accent element, its own orange
            pill sitting inset inside the capsule. */}
        <Link
          href={searchHref}
          className="flex items-center justify-center gap-2 px-4 min-[860px]:px-3 mx-3 mb-3 mt-1 min-[860px]:m-0 py-2.5 min-[860px]:py-0 min-[860px]:h-9 min-[860px]:my-1.5 min-[860px]:mr-1.5 rounded-full bg-primary text-primary-foreground font-semibold text-[12px] tracking-tight whitespace-nowrap shadow-[0_4px_10px_rgba(230,126,34,0.18)] hover:bg-primary-hover hover:shadow-[0_6px_16px_rgba(230,126,34,0.24)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          <Search size={14} />
          Search
        </Link>
      </div>
    </div>
  );
}
