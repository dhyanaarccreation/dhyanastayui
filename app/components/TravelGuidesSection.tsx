"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Search, Sparkles, User } from "lucide-react";
import { travelCurators, DEMO_DATA_NOTICE } from "@/lib/travel-guides-data";
import CuratorAvatar from "./CuratorAvatar";

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
    <section id="travel-guides" className="py-8 md:py-14 bg-background scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 lg:mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage uppercase tracking-widest">
            <Sparkles size={12} /> Travel Guides
          </span>
          <h2 className="heading-organic text-xl sm:text-2xl lg:text-4xl text-foreground mt-1.5 sm:mt-2">
            Explore Travel Guides
          </h2>
          <p className="text-sm sm:text-base font-semibold text-primary mt-2">
            Travel with people who have explored it.
          </p>
          <p className="text-xs sm:text-sm text-muted max-w-xl mt-2 leading-relaxed">
            Discover handpicked stays, local experiences and ready-made
            itineraries curated by Dhyana Travel Curators.
          </p>
        </div>

        {/* Search — destination + curator */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="relative flex-1">
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
          <div className="relative flex-1">
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

        {/* Curator cards */}
        {visible.length > 0 ? (
          <div className="flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth scrollbar-hide gap-4 -mx-6 px-6 pb-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:snap-none stagger-children">
            {visible.map((c) => (
              <Link
                key={c.handle}
                href={`/travel-with/${c.handle}`}
                className="group shrink-0 w-[290px] snap-start sm:w-auto rounded-2xl sm:rounded-[28px] overflow-hidden bg-surface card-hover"
              >
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <CuratorAvatar
                    name={c.name}
                    avatar={c.avatar}
                    className="absolute inset-0 w-full h-full object-cover text-3xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-wider text-sage">
                    Dhyana Travel Curator
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{c.name}</h3>
                    <p className="text-xs text-white/75">{c.creatorName}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="flex items-center gap-1 text-xs text-subtle mb-3">
                    <MapPin size={12} /> {c.region}
                  </p>
                  <div className="flex items-center gap-3.5 text-xs text-muted mb-3.5">
                    <span><strong className="text-foreground">{c.stats.staysCount}</strong> Stays</span>
                    <span><strong className="text-foreground">{c.stats.experiencesCount}</strong> Experiences</span>
                    <span><strong className="text-foreground">{c.stats.itinerariesCount}</strong> Itineraries</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.travelStyle.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[9px] font-medium text-sage/90 bg-sage/[0.08] rounded-full border border-sage/15"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Explore Guide <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
