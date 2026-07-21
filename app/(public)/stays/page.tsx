"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Map as MapIcon,
  ChevronDown,
  X,
  Star,
  Users,
  Sparkles,
  Check,
} from "lucide-react";
import { properties, categories } from "@/lib/mock-data";
import PropertyCard from "@/app/components/PropertyCard";

type PriceBucket = "any" | "under-5k" | "5k-10k" | "10k-20k" | "above-20k";
type SortKey = "recommended" | "price-low" | "price-high" | "rating";

const priceBuckets: { key: PriceBucket; label: string; test: (price: number) => boolean }[] = [
  { key: "any", label: "Any price", test: () => true },
  { key: "under-5k", label: "Under ₹5,000", test: (p) => p < 5000 },
  { key: "5k-10k", label: "₹5,000 – ₹10,000", test: (p) => p >= 5000 && p <= 10000 },
  { key: "10k-20k", label: "₹10,000 – ₹20,000", test: (p) => p > 10000 && p <= 20000 },
  { key: "above-20k", label: "Above ₹20,000", test: (p) => p > 20000 },
];

const ratingOptions = [4.5, 4, 0]; // 0 = "Any"
const stateOptions = ["Tamil Nadu", "Kerala", "Karnataka", "Goa", "Pondicherry"];
const amenityOptions = ["Wi-Fi", "Pool", "Kitchen", "Pet Friendly", "Parking", "Campfire", "AC", "BBQ"];

export default function StaysDiscoveryPage() {
  const [showMap, setShowMap] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("recommended");
  const [sortOpen, setSortOpen] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceBucket, setPriceBucket] = useState<PriceBucket>("any");
  const [minRating, setMinRating] = useState(0);
  const [minGuests, setMinGuests] = useState(1);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [trendingOnly, setTrendingOnly] = useState(false);

  const toggleState = (s: string) =>
    setSelectedStates((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const toggleAmenity = (a: string) =>
    setSelectedAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  const clearFilters = () => {
    setPriceBucket("any");
    setMinRating(0);
    setMinGuests(1);
    setSelectedStates([]);
    setSelectedAmenities([]);
    setTrendingOnly(false);
  };

  const activeFilterCount =
    (priceBucket !== "any" ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (minGuests > 1 ? 1 : 0) +
    selectedStates.length +
    selectedAmenities.length +
    (trendingOnly ? 1 : 0);

  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name;
  const priceTest = priceBuckets.find((b) => b.key === priceBucket)!.test;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = properties.filter((p) => {
      const matchesCategory =
        activeCategory === "all" ||
        (activeCategoryName && activeCategoryName.toLowerCase().includes(p.category.toLowerCase()));
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.state.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      const matchesPrice = priceTest(p.price);
      const matchesRating = p.rating >= minRating;
      const matchesGuests = p.maxGuests >= minGuests;
      const matchesState = selectedStates.length === 0 || selectedStates.includes(p.location.state);
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) => p.amenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase())));
      const matchesTrending = !trendingOnly || p.isTrending;
      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesRating &&
        matchesGuests &&
        matchesState &&
        matchesAmenities &&
        matchesTrending
      );
    });

    if (sortBy === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [search, activeCategory, activeCategoryName, priceTest, minRating, minGuests, selectedStates, selectedAmenities, trendingOnly, sortBy]);

  const sortLabels: Record<SortKey, string> = {
    recommended: "Recommended",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    rating: "Top Rated",
  };

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by destination, property name, or theme..."
                className="w-full pl-11 pr-4 py-3 bg-surface rounded-full text-sm text-foreground placeholder-muted shadow-organic focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setFiltersOpen(true)}
                className={`relative flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeFilterCount > 0
                    ? "bg-primary text-primary-foreground shadow-organic"
                    : "bg-surface text-foreground shadow-organic hover:-translate-y-0.5"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white/25 text-[11px] font-bold flex items-center justify-center tabular-nums">
                    {activeFilterCount}
                  </span>
                )}
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
                {filtered.length} curated {filtered.length === 1 ? "stay" : "stays"} found
              </h1>
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-2 text-sm text-foreground font-medium hover:text-primary"
                >
                  Sort by: {sortLabels[sortBy]} <ChevronDown size={14} className={sortOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-surface shadow-organic p-1.5 z-20 animate-fade-in">
                    {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSortBy(key);
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-left transition-colors ${
                          sortBy === key ? "bg-primary/10 text-primary font-medium" : "text-muted hover:bg-surface-hover hover:text-foreground"
                        }`}
                      >
                        {sortLabels[key]}
                        {sortBy === key && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {priceBucket !== "any" && (
                  <FilterChip label={priceBuckets.find((b) => b.key === priceBucket)!.label} onClear={() => setPriceBucket("any")} />
                )}
                {minRating > 0 && <FilterChip label={`${minRating}+ rating`} onClear={() => setMinRating(0)} />}
                {minGuests > 1 && <FilterChip label={`${minGuests}+ guests`} onClear={() => setMinGuests(1)} />}
                {selectedStates.map((s) => (
                  <FilterChip key={s} label={s} onClear={() => toggleState(s)} />
                ))}
                {selectedAmenities.map((a) => (
                  <FilterChip key={a} label={a} onClear={() => toggleAmenity(a)} />
                ))}
                {trendingOnly && <FilterChip label="Trending only" onClear={() => setTrendingOnly(false)} />}
                <button onClick={clearFilters} className="text-xs text-primary hover:underline ml-1">
                  Clear all
                </button>
              </div>
            )}

            {filtered.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  showMap
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Sparkles size={28} className="text-subtle mx-auto mb-3" />
                <p className="text-sm text-subtle">No stays match your filters yet.</p>
                <button onClick={clearFilters} className="text-sm text-primary hover:underline mt-2">
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination Placeholder */}
            {filtered.length > 0 && (
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
            )}
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

      {/* ================= FILTERS DRAWER ================= */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setFiltersOpen(false)}>
          <aside
            className="absolute inset-y-0 right-0 w-full sm:w-[400px] bg-background shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface">
              <p className="text-sm font-semibold text-foreground">Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</p>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
              {/* Price */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">Price per night</p>
                <div className="flex flex-wrap gap-2">
                  {priceBuckets.map((b) => (
                    <button
                      key={b.key}
                      onClick={() => setPriceBucket(b.key)}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                        priceBucket === b.key ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border text-muted hover:text-foreground"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">Minimum rating</p>
                <div className="flex flex-wrap gap-2">
                  {ratingOptions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                        minRating === r ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border text-muted hover:text-foreground"
                      }`}
                    >
                      {r > 0 ? (
                        <>
                          <Star size={11} className={minRating === r ? "fill-white" : "fill-primary text-primary"} /> {r}+
                        </>
                      ) : (
                        "Any"
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">Guests</p>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-surface">
                  <span className="flex items-center gap-2 text-sm text-foreground">
                    <Users size={15} className="text-subtle" /> {minGuests === 1 ? "Any" : `${minGuests}+ guests`}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMinGuests((g) => Math.max(1, g - 1))}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-sm tabular-nums text-foreground">{minGuests}</span>
                    <button
                      onClick={() => setMinGuests((g) => Math.min(12, g + 1))}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* State */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">Region</p>
                <div className="flex flex-wrap gap-2">
                  {stateOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleState(s)}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                        selectedStates.includes(s) ? "bg-sage text-white border-sage" : "bg-surface border-border text-muted hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">Amenities</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {amenityOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-colors text-left ${
                        selectedAmenities.includes(a) ? "border-sage bg-sage/10 text-foreground" : "border-border bg-surface text-muted hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          selectedAmenities.includes(a) ? "bg-sage border-sage text-white" : "border-border-light"
                        }`}
                      >
                        {selectedAmenities.includes(a) && <Check size={11} />}
                      </span>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending only */}
              <button
                onClick={() => setTrendingOnly((v) => !v)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                  trendingOnly ? "border-primary/50 bg-primary/5" : "border-border bg-surface"
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Sparkles size={14} className="text-primary" /> Trending stays only
                </span>
                <span className={`relative inline-flex w-9 h-5 rounded-full transition-colors shrink-0 ${trendingOnly ? "bg-primary" : "bg-surface-hover border border-border"}`}>
                  <span className={`absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow transition-all ${trendingOnly ? "left-[19px]" : "left-[3px]"}`} />
                </span>
              </button>
            </div>

            <div className="p-5 border-t border-border bg-surface flex items-center gap-3">
              <button onClick={clearFilters} className="flex-1 py-3 text-sm font-medium text-muted hover:text-foreground border border-border rounded-full transition-colors">
                Clear all
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex-1 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
              >
                Show {filtered.length} stays
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-surface shadow-organic text-xs text-foreground">
      {label}
      <button onClick={onClear} aria-label={`Remove ${label} filter`} className="p-0.5 rounded-full hover:bg-surface-hover text-subtle hover:text-foreground transition-colors">
        <X size={11} />
      </button>
    </span>
  );
}
