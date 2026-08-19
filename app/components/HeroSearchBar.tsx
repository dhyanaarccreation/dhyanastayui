import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, Search, Users } from "lucide-react";

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
          className="flex items-center justify-center gap-2 px-8 py-5 md:py-0 md:my-2.5 md:mr-2.5 rounded-[22px] bg-primary text-primary-foreground font-semibold text-base tracking-tight whitespace-nowrap shadow-[0_4px_10px_rgba(230,126,34,0.18)] hover:bg-primary-hover hover:shadow-[0_6px_16px_rgba(230,126,34,0.24)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          <Search size={17} />
          Search
        </Link>
      </div>
    </div>
  );
}
