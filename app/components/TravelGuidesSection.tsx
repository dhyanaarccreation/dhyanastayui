"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, User } from "lucide-react";
import { travelCurators, DEMO_DATA_NOTICE } from "@/lib/travel-guides-data";
import CuratorAvatar from "./CuratorAvatar";
import HorizontalScrollRow from "./HorizontalScrollRow";
import ImageCard from "./cards/ImageCard";

// ============================================
// HOMEPAGE — Explore Travel Guides
// "Travel with people who have explored it."
// Search by destination or Dhyana Travel Curator,
// then browse curator cards into their public
// /travel-with/[handle] storefront (curated stays
// + copyable itineraries — already built).
// ============================================

export default function TravelGuidesSection() {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [curatorQuery, setCuratorQuery] = useState("");

  const visible = useMemo(() => {
    const dq = destinationQuery.trim().toLowerCase();
    const cq = curatorQuery.trim().toLowerCase();
    return travelCurators.filter((c) => {
      const matchesDestination = !dq || c.region.toLowerCase().includes(dq);
      const matchesCurator =
        !cq ||
        c.name.toLowerCase().includes(cq) ||
        c.creatorName.toLowerCase().includes(cq);
      return matchesDestination && matchesCurator;
    });
  }, [destinationQuery, curatorQuery]);

  return (
    <section id="travel-guides" className="py-5 md:py-7 bg-background scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header — heading left, both search boxes right, single row (matches Destinations) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <span className="text-[13px] font-semibold text-sage uppercase tracking-widest">
              Travel Guides
            </span>
            <h2 className="heading-organic text-base sm:text-lg lg:text-[22px] leading-[1.05] text-foreground mt-1.5">
              Explore Travel Guides
            </h2>
          </div>

          {/* Search — destination + curator */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="relative sm:w-56">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                type="text"
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.target.value)}
                placeholder="Search destination"
                aria-label="Search destination — Travel Guides"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-surface rounded-full text-sm text-foreground placeholder-subtle shadow-organic focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
            </div>
            <div className="relative sm:w-56">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                type="text"
                value={curatorQuery}
                onChange={(e) => setCuratorQuery(e.target.value)}
                placeholder="Search influencer / creator"
                aria-label="Search travel curator — Travel Guides"
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-surface rounded-full text-sm text-foreground placeholder-subtle shadow-organic focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
            </div>
          </div>
        </div>

        {/* Curator cards — sized to match the Explore Stays cards (aspect-ratio image + compact info row).
            Single row, horizontally scrollable at every screen size — matches
            the Explore All Stays row instead of wrapping to further rows. */}
        {visible.length > 0 ? (
          <HorizontalScrollRow label="travel guides">
            {visible.map((c) => (
              <ImageCard
                key={c.handle}
                href={`/travel-with/${c.handle}`}
                alt={c.name}
                hoverVideoSrc="/motion-video.mp4"
                imageNode={
                  <CuratorAvatar
                    name={c.name}
                    avatar={c.avatar}
                    className="absolute inset-0 w-full h-full object-cover text-3xl group-hover:scale-105 transition-transform duration-500"
                  />
                }
                title={c.name}
                titleClassName="text-[13px] sm:text-[15px] line-clamp-2"
                subtitle={c.creatorName}
                subtitleClassName="text-[10px] sm:text-[13px]"
                meta={
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={9} className="shrink-0" /> {c.region}
                  </span>
                }
                metaClassName="text-[8px] sm:text-[10px]"
                className="shrink-0 w-[45vw] sm:w-56 lg:w-64 snap-start"
              />
            ))}
          </HorizontalScrollRow>
        ) : (
          <div className="text-center py-14">
            <Search size={24} className="text-subtle mx-auto mb-3" />
            <p className="text-sm text-subtle">
              No travel curator matches yet — more curators join every month.
            </p>
          </div>
        )}

        <p className="text-center text-[11px] text-subtle mt-6 max-w-xl mx-auto">
          {DEMO_DATA_NOTICE}
        </p>
      </div>
    </section>
  );
}
