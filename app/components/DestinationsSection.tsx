"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ArrowRight, MapPin } from "lucide-react";
import { destinations } from "@/lib/mock-data";

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

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-xs font-semibold text-sage uppercase tracking-widest">
            Destinations
          </span>
          <h2 className="heading-organic text-3xl lg:text-5xl text-foreground mt-2">
            Where Will You Go?
          </h2>

          {/* Search tab */}
          <div className="relative w-full max-w-md mt-7">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a destination or state…"
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-full text-sm text-foreground placeholder-subtle shadow-organic focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
            />
          </div>
          <p className="text-xs text-subtle mt-3">
            {visible.length} of {destinations.length} destinations
          </p>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {visible.map((dest, i) => (
              <Link
                key={dest.name}
                href={`/stays?destination=${dest.name.toLowerCase()}`}
                className={`group relative rounded-[28px] overflow-hidden card-hover ${
                  i === 0 ? "lg:row-span-2 min-h-[320px]" : "min-h-[200px]"
                }`}
              >
                {/* Background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-white/70 mt-1">
                    {dest.state} · {dest.properties} properties
                  </p>
                </div>
                {/* Arrow */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/70 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
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
