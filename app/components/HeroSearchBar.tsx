import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, Search, Users } from "lucide-react";

interface HeroSearchBarProps {
  /** Where the Search button routes to. Defaults to the homepage's stays grid. */
  searchHref?: string;
}

// Literal "premium ceramic" palette per design spec — a single, unconditional
// treatment on the OUTER capsule only. Every child below is a plain,
// unstyled layout box (bg-transparent/border-none/shadow-none) — there is
// exactly one element in this component with a background, border, shadow,
// or border-radius.
//
// Radius: `rounded-full` on the wide single-row desktop shape gives a true
// semicircular cap (correct — the box is short and wide). The same
// `rounded-full` on the narrow, tall mobile stack computes a ~170px corner
// radius that clips the first row's own text, so mobile uses a large fixed
// radius instead — still fully rounded, just sized to the box it's on.
// Shadow bumped slightly over the original spec (.08/.05/.04 → .11/.07/.05)
// now that the page background is pure white — the capsule needs a touch
// more definition to still read as "floating" without a tinted page behind it.
const CAPSULE_TREATMENT =
  "bg-[linear-gradient(145deg,#FFFFFF,#F7F3EC)] border border-white/85 rounded-[40px] md:rounded-full overflow-hidden " +
  "shadow-[0_35px_60px_rgba(0,0,0,.11),0_18px_28px_rgba(0,0,0,.07),0_8px_12px_rgba(0,0,0,.05),-10px_-10px_20px_rgba(255,255,255,.95),inset_0_1px_1px_rgba(255,255,255,.9)] " +
  "before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[45%] before:rounded-t-[40px] md:before:rounded-t-full before:bg-gradient-to-b before:from-white/80 before:to-transparent before:pointer-events-none";

// A thin gradient line — horizontal between stacked rows on mobile,
// vertical between row segments at md+. Never a background/card.
const DIVIDER =
  "bg-transparent shrink-0 " +
  "h-px w-auto mx-6 bg-gradient-to-r from-transparent via-black/10 to-transparent " +
  "md:h-auto md:w-px md:mx-0 md:my-4 md:self-stretch md:bg-gradient-to-b md:from-transparent md:via-black/10 md:to-transparent";

function Segment({
  icon: Icon,
  label,
  widthClass,
}: {
  icon: LucideIcon;
  label: string;
  widthClass: string;
}) {
  return (
    <div className={`flex items-center gap-3 px-6 py-5 md:py-0 bg-transparent border-none shadow-none ${widthClass}`}>
      <Icon size={18} strokeWidth={1.75} className="text-[#777] shrink-0" />
      <span className="text-sm md:text-[15px] text-[#777] tracking-tight whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function HeroSearchBar({ searchHref = "/#explore-stays" }: HeroSearchBarProps) {
  return (
    <div className="relative max-w-6xl mx-auto px-6 mt-1 sm:mt-1.5">
      {/* The ONLY element with background/border/shadow/radius in this component. */}
      <div
        role="search"
        aria-label="Search stays"
        className={`relative flex flex-col md:flex-row md:items-stretch md:h-[84px] animate-fade-in-up ${CAPSULE_TREATMENT}`}
      >
        {/* Location */}
        <div className="flex items-center gap-3 px-6 py-5 md:py-0 md:flex-[1.4] bg-transparent border-none shadow-none">
          <Search size={18} strokeWidth={1.75} className="text-[#777] shrink-0" />
          <input
            type="text"
            placeholder="Where do you want to go?"
            aria-label="Search destination"
            className="w-full bg-transparent border-none shadow-none text-[#3a3630] placeholder-[#8a8a8a] text-base tracking-tight rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>

        <span className={DIVIDER} aria-hidden="true" />

        {/* Check-in / Check-out */}
        <Segment icon={CalendarDays} label="Check-in — Check-out" widthClass="md:min-w-[190px]" />

        <span className={DIVIDER} aria-hidden="true" />

        {/* Guests */}
        <Segment icon={Users} label="Guests" widthClass="md:min-w-[130px]" />

        {/* Search button — the one deliberate accent element, its own orange
            pill sitting inset inside the capsule. */}
        <Link
          href={searchHref}
          className="flex items-center justify-center gap-2 px-8 py-5 md:py-0 md:my-2.5 md:mr-2.5 rounded-[22px] bg-[linear-gradient(180deg,#F59A4A,#E78337)] text-white font-semibold text-base tracking-tight whitespace-nowrap shadow-[0_18px_30px_rgba(231,131,55,.35),0_8px_12px_rgba(0,0,0,.08),inset_0_1px_rgba(255,255,255,.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          <Search size={17} />
          Search
        </Link>
      </div>
    </div>
  );
}
