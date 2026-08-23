"use client";

import { useMemo, useState } from "react";
import { Search, Navigation, MapPin } from "lucide-react";
import { destinations } from "@/lib/mock-data";
import ImageCard from "./cards/ImageCard";

// ============================================
// HOMEPAGE DESTINATIONS
// Search-as-you-type over a growing destination
// list — the grid below re-flows to match.
// ============================================

export default function DestinationsSection() {
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(
      (d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
    );
  }, [search]);

  // First 5 form the featured grid (tall lead card + 4). Everything after
  // that scrolls horizontally instead of adding more static rows — keeps
  // the section's height fixed regardless of how many destinations exist.
  const featured = visible.slice(0, 5);
  const rest = visible.slice(5);

  return (
    <section className="py-8 md:py-14 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3 sm:mb-6 lg:mb-10">
          <div>
            <span className="text-xs font-semibold text-sage uppercase tracking-widest">
              Destinations
            </span>
            <h2 className="heading-organic text-base sm:text-lg lg:text-[22px] text-foreground mt-1 sm:mt-2">
              Where Will You Go?
            </h2>
          </div>

          {/* Search tab */}
          <div className="w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by destination"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-surface rounded-full text-sm text-foreground placeholder-subtle shadow-organic focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
            </div>
            <p className="text-xs text-subtle mt-2 sm:text-right">
              {visible.length} of {destinations.length} destinations
            </p>
          </div>
        </div>

        {visible.length > 0 ? (
          <>
            <div className="relative">
              <div
                className={`flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth scrollbar-hide gap-2.5 sm:gap-4 -mx-6 px-6 pb-1 sm:grid sm:grid-cols-2 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:snap-none stagger-children ${
                  featured.length > 2 ? "lg:grid-cols-3" : ""
                }`}
              >
                {featured.map((dest, i) => (
                  <ImageCard
                    key={dest.name}
                    href="/#explore-stays"
                    image={dest.image}
                    alt={dest.name}
                    title={`${dest.name},`}
                    subtitle={dest.state}
                    meta={`${dest.properties} properties`}
                    actionLabel="Directions"
                    actionIcon={Navigation}
                    actionIconClassName="-rotate-[20deg]"
                    titleLayout="row"
                    size="fill"
                    className={`shrink-0 w-[160px] snap-start sm:w-auto sm:shrink ${
                      i === 0 && featured.length > 2
                        ? "min-h-[150px] sm:min-h-[320px] lg:row-span-2"
                        : "min-h-[150px] sm:min-h-[200px] lg:min-h-[280px]"
                    }`}
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent sm:hidden" />
            </div>

            {/* Remaining destinations — always horizontally scrollable so
                the section never grows past this height, at any screen size. */}
            {rest.length > 0 && (
              <div className="relative mt-2.5 sm:mt-4">
                <div className="flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth scrollbar-hide gap-2.5 sm:gap-4 -mx-6 px-6 sm:mx-0 sm:px-0 pb-1">
                  {rest.map((dest) => (
                    <ImageCard
                      key={dest.name}
                      href="/#explore-stays"
                      image={dest.image}
                      alt={dest.name}
                      title={`${dest.name},`}
                      subtitle={dest.state}
                      meta={`${dest.properties} properties`}
                      actionLabel="Directions"
                      actionIcon={Navigation}
                      actionIconClassName="-rotate-[20deg]"
                      titleLayout="row"
                      size="fill"
                      className="shrink-0 w-[160px] sm:w-[220px] min-h-[150px] sm:min-h-[180px] snap-start"
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <MapPin size={28} className="text-subtle mx-auto mb-3" />
            <p className="text-sm text-subtle">No destination matches &ldquo;{search}&rdquo; yet — more are added every month.</p>
          </div>
        )}
      </div>
    </section>
  );
}
