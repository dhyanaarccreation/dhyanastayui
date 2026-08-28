"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CalendarDays, Minus, Plus, Search, Users } from "lucide-react";
import { useSearchQuery } from "@/lib/useSearchQuery";

interface HeroSearchBarProps {
  /** Where the Search button routes to. Defaults to the homepage's stays grid. */
  searchHref?: string;
}

// Radius: `rounded-full` on the wide single-row desktop shape gives a true
// semicircular cap (correct — the box is short and wide). The same
// `rounded-full` on the narrow, tall mobile stack computes a ~170px corner
// radius that clips the first row's own text, so mobile uses a large fixed
// radius instead — still fully rounded, just sized to the box it's on.
const CAPSULE_TREATMENT =
  "bg-white border border-[var(--surface-border)] rounded-[40px] md:rounded-full overflow-hidden " +
  "shadow-[var(--shadow-soft)]";

// A thin gradient line — horizontal between stacked rows on mobile,
// vertical between row segments at md+. Never a background/card.
const DIVIDER =
  "bg-transparent shrink-0 " +
  "h-px w-auto mx-6 bg-gradient-to-r from-transparent via-black/10 to-transparent " +
  "md:h-auto md:w-px md:mx-0 md:my-4 md:self-stretch md:bg-gradient-to-b md:from-transparent md:via-black/10 md:to-transparent";

const DATE_INPUT_CLASS =
  "bg-transparent border-none shadow-none text-[#3a3630] text-sm md:text-[15px] tracking-tight " +
  "focus:outline-none appearance-none [color-scheme:light] w-[108px] " +
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
    <div className="relative max-w-6xl mx-auto px-6 mt-1 sm:mt-1.5">
      {/* The ONLY element with background/border/shadow/radius in this component. */}
      <div
        role="search"
        aria-label="Search stays"
        className={`relative flex flex-col md:flex-row md:items-stretch md:h-19 animate-fade-in-up ${CAPSULE_TREATMENT}`}
      >
        {/* Location — wired to the shared search context (lib/useSearchQuery.tsx),
            so typing here live-filters the "Explore All Stays" grid below,
            same as the destination detection already does. */}
        <div className="flex items-center gap-3 px-6 py-5 md:py-0 md:flex-[1.4] bg-transparent border-none shadow-none">
          <Search size={18} strokeWidth={1.75} className="text-[#777] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to go?"
            aria-label="Search destination"
            className="w-full bg-transparent border-none shadow-none text-[#3a3630] placeholder-[#8a8a8a] text-base tracking-tight rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>

        <span className={DIVIDER} aria-hidden="true" />

        {/* Check-in / Check-out — real native date pickers; clicking anywhere
            in either field (not just the icon) opens the browser's picker. */}
        <div
          className="flex items-center gap-2 px-6 py-5 md:py-0 md:min-w-55 bg-transparent border-none shadow-none cursor-pointer"
          onClick={() => openPicker(checkInRef.current)}
        >
          <CalendarDays size={18} strokeWidth={1.75} className="text-[#777] shrink-0" />
          <input
            ref={checkInRef}
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Check-in date"
            className={DATE_INPUT_CLASS}
          />
          <span className="text-[#aaa]">—</span>
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
        <div className="flex items-center gap-2.5 px-6 py-5 md:py-0 md:min-w-42 bg-transparent border-none shadow-none">
          <Users size={18} strokeWidth={1.75} className="text-[#777] shrink-0" />
          <button
            type="button"
            onClick={() => setGuests(Math.max(1, guests - 1))}
            disabled={guests <= 1}
            aria-label="Fewer guests"
            className="w-6 h-6 rounded-full border border-(--surface-border) flex items-center justify-center text-[#777] disabled:opacity-30 hover:border-primary/40 hover:text-primary transition-colors shrink-0"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm md:text-[15px] text-[#3a3630] tracking-tight tabular-nums whitespace-nowrap">
            {guests} {guests === 1 ? "Guest" : "Guests"}
          </span>
          <button
            type="button"
            onClick={() => setGuests(Math.min(16, guests + 1))}
            disabled={guests >= 16}
            aria-label="More guests"
            className="w-6 h-6 rounded-full border border-(--surface-border) flex items-center justify-center text-[#777] disabled:opacity-30 hover:border-primary/40 hover:text-primary transition-colors shrink-0"
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Search button — the one deliberate accent element, its own orange
            pill sitting inset inside the capsule. */}
        <Link
          href={searchHref}
          className="flex items-center justify-center gap-2 px-8 py-5 md:py-0 md:my-2.5 md:mr-2.5 rounded-[22px] bg-primary text-primary-foreground font-semibold text-base tracking-tight whitespace-nowrap shadow-[0_4px_10px_rgba(230,126,34,0.18)] hover:bg-primary-hover hover:shadow-[0_6px_16px_rgba(230,126,34,0.24)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          <Search size={17} />
          Search
        </Link>
      </div>
    </div>
  );
}
