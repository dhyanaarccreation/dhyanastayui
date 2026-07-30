// ============================================
// VAKSANA FARMS — partner property content
// A single working organic farm with four individually bookable stays
// (PICO, COOP, TANG, LUMA — see the four hidden `properties` entries in
// mock-data.ts). This file holds only the farm-level content; each
// accommodation's own bookable data lives in mock-data.ts so it keeps
// working through the existing stay/booking flow unmodified.
// ============================================

import { properties, reviews, type Property, type Review } from "./mock-data";

const VAKSANA_UNIT_SLUGS = ["vaksana-pico", "vaksana-coop", "vaksana-tang", "vaksana-luma"] as const;

/** The four bookable Vaksana Farms units, in display order. */
export function getVaksanaAccommodations(): Property[] {
  return VAKSANA_UNIT_SLUGS.map((slug) => properties.find((p) => p.slug === slug)).filter(
    (p): p is Property => Boolean(p)
  );
}

/** Reviews across all four units, pooled as a single farm-level reviews section. */
export function getVaksanaReviews(): Review[] {
  const unitIds = new Set(getVaksanaAccommodations().map((p) => p.id));
  return reviews.filter((r) => unitIds.has(r.propertyId));
}

export const vaksanaFarms = {
  name: "Vaksana Farms",
  tagline: "Organic Farm Stay",
  location: { city: "Tindivanam", state: "Tamil Nadu" },
  rating: 4.85,
  reviewCount: 165,
  unitsLabel: "4 Unique Stays",
  acres: "14 Acres",
  oneLiner: "Reconnect with nature through organic farming, sustainable living and beautiful farm stays.",
  cardDescription:
    "A working organic farm turned into four individually designed stays — from a one-room orchard cabin to a glass-walled villa with a private plunge pool.",
  heroImage: "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1600&auto=format&fit=crop",
  description:
    "Vaksana Farms is a working organic farm outside Tindivanam, reimagined as a small collection of stays rather than a single property. Guests share the same orchards, animals, and farm-to-table kitchen the family has run for years — just from four very different rooms.",
  story:
    "Vaksana began as a single family's citrus and vegetable farm nearly two decades ago. When the third generation took over, they didn't want to sell the land or turn it into a resort — instead, they built four small, distinct stays into the working farm itself, so guests could wake up to the same mornings the family always has.",
  mission: "To share a working organic farm with travelers without changing a single thing about how it runs.",
  vision: "A future where farm stays regenerate the land they sit on, not just visit it.",
  aboutImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
  quickHighlights: [
    "Organic Farming",
    "Sustainable Living",
    "14 Acres",
    "Family Owned",
    "Farm to Table",
    "Animal Sanctuary",
  ],
  nearbyPlaces: [
    { name: "Tindivanam Town", distance: "8 km" },
    { name: "Mahabalipuram Beach", distance: "45 km" },
    { name: "Puducherry", distance: "60 km" },
    { name: "Chennai Airport", distance: "110 km" },
  ],
  travelInfo: "Roughly a 2-hour drive from Chennai — the farm arranges pickup from Tindivanam town on request.",
  experiences: [
    {
      name: "Organic Farming",
      icon: "Sprout",
      description: "Get hands-on planting, weeding and harvesting in the working vegetable beds with the farm team.",
      image: "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Farm-to-Table",
      icon: "CookingPot",
      description: "A shared meal cooked entirely from what's growing on the farm that week, served family-style.",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Animal Interaction",
      icon: "Bird",
      description: "Morning feeding rounds with the farm's ducks, hens and grazing animals — open to all ages.",
      image: "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Camping",
      icon: "Flame",
      description: "An open-fire dinner and stargazing session out in the fields, away from every light.",
      image: "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
  ],
};

/** Per-unit "Best For" / stay type / availability copy for the Available Stays carousel. */
export const vaksanaUnitDetails: Record<string, { type: string; bestFor: string; status: string }> = {
  "vaksana-pico": { type: "Studio Cabin", bestFor: "Solo travelers & couples", status: "Available" },
  "vaksana-coop": { type: "Family Cottage", bestFor: "Families with kids", status: "Available" },
  "vaksana-tang": { type: "Farmhouse", bestFor: "Groups & extended family", status: "Available" },
  "vaksana-luma": { type: "Glass Villa", bestFor: "Couples seeking privacy", status: "Few dates left" },
};
