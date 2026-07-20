"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Map as MapIcon,
  ChevronDown,
} from "lucide-react";
import { properties, categories } from "@/lib/mock-data";
import PropertyCard from "@/app/components/PropertyCard";

export default function StaysDiscoveryPage() {
  const [showMap, setShowMap] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="bg-background min-h-screen">
      {/* Search & Filter Header */}
      <div className="sticky top-[72px] z-40 bg-background border-b border-border py-5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-auto md:flex-1 max-w-xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle"
              />
              <input
                type="text"
                placeholder="Search by destination, property name, or theme..."
                className="w-full pl-11 pr-4 py-3 bg-surface rounded-full text-sm text-foreground placeholder-muted shadow-organic focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-surface rounded-full text-sm text-foreground shadow-organic hover:-translate-y-0.5 transition-all">
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                  showMap
                    ? "bg-primary text-primary-foreground shadow-organic"
                    : "bg-surface text-foreground shadow-organic hover:-translate-y-0.5"
                }`}
              >
                <MapIcon size={16} />
                {showMap ? "Hide Map" : "Show Map"}
              </button>
            </div>
          </div>

          {/* Categories Carousel */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface border-border text-muted hover:text-foreground"
              }`}
            >
              All Stays
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface border-border text-muted hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Results Grid */}
          <div className={`flex-1 transition-all ${showMap ? "lg:w-3/5" : "w-full"}`}>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="heading-organic text-xl text-foreground">
                {properties.length} curated stays found
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Sort by:</span>
                <button className="flex items-center gap-2 text-sm text-foreground font-medium hover:text-primary">
                  Recommended <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div
              className={`grid gap-6 ${
                showMap
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface text-muted shadow-organic hover:text-foreground transition-colors disabled:opacity-50">
                  {"<"}
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold shadow-organic">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface text-muted shadow-organic hover:text-foreground transition-colors">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface text-muted shadow-organic hover:text-foreground transition-colors">
                  3
                </button>
                <span className="text-subtle">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface text-muted shadow-organic hover:text-foreground transition-colors">
                  {">"}
                </button>
              </div>
            </div>
          </div>

          {/* Map View */}
          {showMap && (
            <div className="hidden lg:block lg:w-2/5 animate-fade-in-up">
              <div className="sticky top-[160px] h-[calc(100vh-180px)] rounded-[28px] overflow-hidden bg-surface shadow-organic flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="w-16 h-16 rounded-full bg-sage/12 text-sage flex items-center justify-center mx-auto mb-4">
                    <MapIcon size={26} />
                  </span>
                  <h3 className="text-lg font-medium text-foreground mb-2">Interactive Map</h3>
                  <p className="text-sm text-muted">
                    Map integration (Google Maps / Mapbox) placeholder.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
