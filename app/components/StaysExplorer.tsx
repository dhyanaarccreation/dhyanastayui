"use client";

import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Home,
  Sprout,
  Heart,
  Crown,
  Leaf,
  Landmark,
  Laptop,
  HeartHandshake,
  Users,
  PawPrint,
  Mountain,
  Castle,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import { properties, categories, type Property } from "@/lib/mock-data";
import { useUserLocationContext } from "@/lib/UserLocationContext";
import { useSearchQuery } from "@/lib/useSearchQuery";
import CategoryTile from "@/app/components/CategoryTile";
import PropertyGrid from "@/app/components/PropertyGrid";
import VaksanaFarmsCard from "@/app/components/VaksanaFarmsCard";

// ============================================
// STAYS EXPLORER — a static "Explore All Stays" heading
// (never toggles with the picked destination) sits above
// search + a single geolocation-detected location indicator
// and category chips, each their own row, above the
// always-visible property grid. Filters/Sort live next to
// the result count instead. The active destination now comes
// from the visitor's detected city (see lib/useUserLocation.ts)
// rather than a hardcoded pill list — falling back to "no
// destination" (full catalog) when that city has no curated
// stays, or to a manual pick if geolocation is denied/fails.
// Embedded directly in the homepage's Explore section —
// there is no standalone /stays page.
// ============================================

// Listings exclude properties superseded by a partner spotlight card (e.g.
// Vaksana Farms' individual units) — those stay reachable by direct link,
// just not browsable in the general catalog.
const visibleProperties = properties.filter((p) => !p.hidden);

// Cities the manual "Set location" fallback can offer — derived straight
// from the live property catalog (not a curated/editorial list), so every
// option is guaranteed to have at least one result.
export const CITY_OPTIONS = Array.from(new Set(visibleProperties.map((p) => p.location.city))).sort();

// Maps each category's existing `icon` field (a lucide-react component
// name) to the actual component — the carousel shows a small icon instead
// of a photo, reusing the icon names already present in the category data.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Home,
  Sprout,
  Heart,
  Crown,
  Leaf,
  Landmark,
  Laptop,
  HeartHandshake,
  Users,
  PawPrint,
  Mountain,
  Castle,
};

// A distinct, always-on icon color per category (independent of the
// active/selected state, which is shown via the chip's border instead).
const CATEGORY_ICON_COLORS: Record<string, string> = {
  "tiny-houses": "text-orange-500",
  "farm-stays": "text-green-600",
  "wellness-retreats": "text-pink-500",
  "luxury-villas": "text-amber-500",
  "eco-stays": "text-emerald-600",
  "heritage-homes": "text-amber-800",
  workations: "text-blue-500",
  "couple-escapes": "text-rose-500",
  "family-holidays": "text-violet-500",
  "pet-friendly": "text-teal-500",
  "adventure-camps": "text-lime-600",
  "boutique-resorts": "text-indigo-500",
};

type PriceBucket = "any" | "under-5k" | "5k-10k" | "10k-20k" | "above-20k";
type SortKey = "recommended" | "price-low" | "price-high" | "rating";

const priceBuckets: { key: PriceBucket; label: string; test: (price: number) => boolean }[] = [
  { key: "any", label: "Any price", test: () => true },
  { key: "under-5k", label: "Under ₹5,000", test: (p) => p < 5000 },
  { key: "5k-10k", label: "₹5,000 – ₹10,000", test: (p) => p >= 5000 && p <= 10000 },
  { key: "10k-20k", label: "₹10,000 – ₹20,000", test: (p) => p > 10000 && p <= 20000 },
  { key: "above-20k", label: "Above ₹20,000", test: (p) => p > 20000 },
];

// Property types are derived straight from the live property catalog, so
// every filter option is guaranteed to have at least one result.
const typeOptions = Array.from(new Set(visibleProperties.map((p) => p.category))).sort();

// Curated amenity facets — basics like Wi-Fi are assumed on every property
// and left out; AC/Non-AC are a paired positive/negative test.
const amenityOptions: { key: string; label: string; test: (p: Property) => boolean }[] = [
  { key: "ac", label: "AC", test: (p) => p.amenities.includes("AC") },
  { key: "non-ac", label: "Non-AC", test: (p) => !p.amenities.includes("AC") },
  { key: "private-pool", label: "Private Pool", test: (p) => p.amenities.includes("Private Pool") },
  { key: "public-pool", label: "Public Pool", test: (p) => p.amenities.includes("Public Pool") },
  { key: "swimming-pool", label: "Swimming Pool", test: (p) => p.amenities.includes("Swimming Pool") },
  { key: "infinity-pool", label: "Infinity Pool", test: (p) => p.amenities.includes("Infinity Pool") },
  { key: "bathtub", label: "Bathtub", test: (p) => p.amenities.includes("Bathtub") },
  { key: "home-theatre", label: "Home Theatre", test: (p) => p.amenities.includes("Home Theatre") },
  { key: "private-chef", label: "Private Chef", test: (p) => p.amenities.includes("Private Chef") },
  { key: "gym", label: "Gym", test: (p) => p.amenities.includes("Gym") },
  { key: "ayurvedic-spa", label: "Ayurvedic Spa", test: (p) => p.amenities.includes("Ayurvedic Spa") },
  { key: "pet-friendly", label: "Pet Friendly", test: (p) => p.amenities.includes("Pet Friendly") },
];

export default function StaysExplorer() {
  const userLocation = useUserLocationContext();
  const detectedCity = userLocation.city;
  const cityHasStays =
    !!detectedCity && visibleProperties.some((p) => p.location.city.toLowerCase() === detectedCity.toLowerCase());
  // The active destination filter: the detected/manually-picked city, but
  // only when it actually matches a curated stay — otherwise fall through
  // to "no destination" (full catalog) rather than an empty grid.
  const selectedDestination = cityHasStays ? detectedCity : null;
  const showLocationFallbackNotice = userLocation.status !== "detecting" && !!detectedCity && !cityHasStays;

  // Search box lives in the Navbar now — shared here via context so typing
  // there filters this grid live.
  const { query: search } = useSearchQuery();

  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortKey>("recommended");
  const [sortOpen, setSortOpen] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceBucket, setPriceBucket] = useState<PriceBucket>("any");
  const [minGuests, setMinGuests] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenityKeys, setSelectedAmenityKeys] = useState<string[]>([]);
  const [trendingOnly, setTrendingOnly] = useState(false);

  const toggleType = (t: string) =>
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const toggleAmenity = (key: string) =>
    setSelectedAmenityKeys((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]));

  const clearFilters = () => {
    setPriceBucket("any");
    setMinGuests(1);
    setSelectedTypes([]);
    setSelectedAmenityKeys([]);
    setTrendingOnly(false);
  };

  const activeFilterCount =
    (priceBucket !== "any" ? 1 : 0) +
    (minGuests > 1 ? 1 : 0) +
    selectedTypes.length +
    selectedAmenityKeys.length +
    (trendingOnly ? 1 : 0);

  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name;
  const priceTest = priceBuckets.find((b) => b.key === priceBucket)!.test;

  // The Vaksana Farms partner card replaces individual Farm Stay listings —
  // shown only under the Farm Stays category, not on the default view.
  const showVaksanaCard = activeCategory === "farm-stays";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = visibleProperties.filter((p) => {
      // Destination filtering is simply skipped when nothing is selected.
      const matchesDestination =
        !selectedDestination || p.location.city.toLowerCase() === selectedDestination.toLowerCase();
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
      const matchesGuests = p.maxGuests >= minGuests;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.category);
      const matchesAmenities =
        selectedAmenityKeys.length === 0 ||
        selectedAmenityKeys.every((key) => amenityOptions.find((o) => o.key === key)!.test(p));
      const matchesTrending = !trendingOnly || p.isTrending;
      return (
        matchesDestination &&
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesGuests &&
        matchesType &&
        matchesAmenities &&
        matchesTrending
      );
    });

    if (sortBy === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedDestination, search, activeCategory, activeCategoryName, priceTest, minGuests, selectedTypes, selectedAmenityKeys, trendingOnly, sortBy]);

  const sortLabels: Record<SortKey, string> = {
    recommended: "Recommended",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    rating: "Top Rated",
  };

  return (
    <div className="bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section heading — static, never toggles with the picked destination */}
        <div className="mb-5 sm:mb-6">
          <h2 className="heading-organic text-base sm:text-lg lg:text-[22px] leading-[1.05] text-foreground">
            Explore All Stays
          </h2>
        </div>

        {/* Search box + location picker now live in the Navbar (shared via
            context — see lib/useSearchQuery.tsx and lib/UserLocationContext.tsx) */}

        {showLocationFallbackNotice && (
          <p className="mt-2.5 text-xs text-subtle">
            No curated stays found near {detectedCity} yet. Showing all curated stays.
          </p>
        )}

        {/* Category row — small icon + name pills (no photos), replacing
            the old standalone "Find Your Perfect Escape" section. Clicking
            the active tile again resets to "all". Wraps instead of scrolling
            so every category stays visible at once. */}
        <div className="mt-3">
          <div className="flex flex-wrap items-center gap-3 px-0.5 pt-1.5 pb-3">
            {categories.map((cat) => (
              <CategoryTile
                key={cat.slug}
                name={cat.name}
                icon={CATEGORY_ICONS[cat.icon]}
                iconColorClass={CATEGORY_ICON_COLORS[cat.slug] ?? "text-primary"}
                active={activeCategory === cat.slug}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? "all" : cat.slug)}
              />
            ))}
          </div>
        </div>

        {/* Result count + Filters + Sort */}
        <div className="mt-3 sm:mt-4 mb-4 sm:mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {filtered.length + (showVaksanaCard ? 1 : 0)} curated{" "}
            {filtered.length + (showVaksanaCard ? 1 : 0) === 1 ? "stay" : "stays"} found
          </p>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setFiltersOpen(true)}
              className={`relative flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all hover:-translate-y-px ${
                activeFilterCount > 0
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft-pill)] hover:shadow-[var(--shadow-hover-pill)]"
                  : "bg-surface border border-border text-foreground shadow-[var(--shadow-soft-pill)] hover:shadow-[var(--shadow-hover-pill)]"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white/25 text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface border border-border text-xs sm:text-sm text-foreground font-medium shadow-[var(--shadow-soft-pill)] hover:text-primary hover:shadow-[var(--shadow-hover-pill)] hover:-translate-y-px transition-all"
              >
                Sort: {sortLabels[sortBy]} <ChevronDown size={13} className={sortOpen ? "rotate-180 transition-transform" : "transition-transform"} />
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
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {selectedTypes.map((t) => (
              <FilterChip key={t} label={t} onClear={() => toggleType(t)} />
            ))}
            {selectedAmenityKeys.map((key) => (
              <FilterChip key={key} label={amenityOptions.find((o) => o.key === key)!.label} onClear={() => toggleAmenity(key)} />
            ))}
            {priceBucket !== "any" && (
              <FilterChip label={priceBuckets.find((b) => b.key === priceBucket)!.label} onClear={() => setPriceBucket("any")} />
            )}
            {minGuests > 1 && <FilterChip label={`${minGuests}+ guests`} onClear={() => setMinGuests(1)} />}
            {trendingOnly && <FilterChip label="Trending only" onClear={() => setTrendingOnly(false)} />}
            <button onClick={clearFilters} className="text-xs text-primary hover:underline ml-1">
              Clear all
            </button>
          </div>
        )}

        <PropertyGrid
          properties={filtered}
          leading={showVaksanaCard ? <VaksanaFarmsCard /> : undefined}
          emptyMessage={
            selectedDestination
              ? `No curated stays found in ${selectedDestination} yet.`
              : "No curated stays match your search yet."
          }
        />

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
              {/* Property Type */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3 flex items-center gap-1.5">
                  <Home size={12} /> Property Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                        selectedTypes.includes(t) ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border text-muted hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-subtle mb-3">
                  Amenities <span className="normal-case text-subtle/70">· Wi-Fi included everywhere</span>
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {amenityOptions.map((a) => (
                    <button
                      key={a.key}
                      onClick={() => toggleAmenity(a.key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-colors text-left ${
                        selectedAmenityKeys.includes(a.key) ? "border-sage bg-sage/10 text-foreground" : "border-border bg-surface text-muted hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          selectedAmenityKeys.includes(a.key) ? "bg-sage border-sage text-white" : "border-border-light"
                        }`}
                      >
                        {selectedAmenityKeys.includes(a.key) && <Check size={11} />}
                      </span>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

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
