// ============================================
// TRAVEL GUIDES — public multi-curator directory
// Powers the homepage "Explore Travel Guides"
// section and the public /travel-with/[handle]
// pages. Separate from influencer-data.ts, which
// is the *private dashboard* data for the single
// logged-in creator persona (Riya Malhotra) — that
// file is untouched by this one.
//
// IMPORTANT — demo data disclosure:
// Follower counts, itinerary copies, bookings and
// any commission/booking-value figures below are
// mock numbers for UI development only. VJ Siddhu
// is a real public creator; his numbers here are
// NOT his actual performance data. Every screen
// that renders them must show a visible "Demo
// Data" disclaimer alongside — see the
// `isRealPerson` flag and `DEMO_DATA_NOTICE` below.
// ============================================

import { type ItineraryDay, type CuratorTravelStory } from "./influencer-data";

export const DEMO_DATA_NOTICE =
  "Curator stats shown are demo data for product development — not verified performance figures.";

export interface TravelCuratorStats {
  staysCount: number;
  experiencesCount: number;
  itinerariesCount: number;
  followers: string;
  itineraryCopies: number;
  bookings: number;
}

export interface TravelCuratorSummary {
  handle: string;
  name: string;
  creatorName: string; // @handle
  avatar?: string; // omitted => card renders an initials placeholder, never a stand-in photo
  region: string;
  travelStyle: string[];
  isRealPerson: boolean;
  stats: TravelCuratorStats;
  /** false = directory-only card; profile page shows a "guide coming soon" state instead of fabricated content. */
  hasFullGuide: boolean;
  /** Short first-person bio, shown on the "guide coming soon" page for curators who have one. */
  bio?: string;
}

export const travelCurators: TravelCuratorSummary[] = [
  {
    handle: "vjsiddhu_vlogs",
    name: "VJ Siddhu",
    creatorName: "@vjsiddhu_vlogs",
    avatar: "/curators/vj-siddhu-vlogs-logo.jpg",
    region: "Tamil Nadu",
    travelStyle: ["Food", "Lifestyle", "Friends", "Local Travel"],
    isRealPerson: true,
    stats: {
      staysCount: 18,
      experiencesCount: 24,
      itinerariesCount: 8,
      followers: "2.4M",
      itineraryCopies: 4_820,
      bookings: 512,
    },
    hasFullGuide: true,
  },
  {
    handle: "drbro",
    name: "Dr Bro",
    creatorName: "@Dr_Bro",
    avatar: "/curators/dr-bro-logo.jpg",
    region: "India",
    travelStyle: ["Travel Storytelling", "Entrepreneurship", "Culture"],
    isRealPerson: true,
    stats: { staysCount: 9, experiencesCount: 14, itinerariesCount: 4, followers: "—", itineraryCopies: 0, bookings: 0 },
    hasFullGuide: false,
    bio: "I'm Gagan Srinivas, popularly known as Dr Bro — a travel storyteller and entrepreneur shaped by real-world experiences across cultures and countries. My journey from curiosity-driven travel to building a business has been defined by learning, responsibility, and perspective.",
  },
  {
    handle: "naaanveshana",
    name: "Anvesh Chinni",
    creatorName: "@NaaAnveshana",
    avatar: "/curators/anvesh-chinni-naa-anveshana.jpg",
    region: "Global",
    travelStyle: ["Global Travel", "Culture", "Lifestyle"],
    isRealPerson: true,
    stats: { staysCount: 10, experiencesCount: 15, itinerariesCount: 4, followers: "—", itineraryCopies: 0, bookings: 0 },
    hasFullGuide: false,
    bio: "Naa Anveshana is a popular Telugu travel YouTube channel run by global vlogger Anvesh Chinni. He shares global travel experiences, cultural explorations, and international lifestyle vlogs.",
  },
  // ---- Fictional demo personas (no real person represented) — round out
  // the directory to 5 cards with different regions/styles. No avatar
  // path: CuratorAvatar renders its initials-placeholder fallback.
  {
    handle: "wanderwithmeher",
    name: "Meher Kapoor",
    creatorName: "@wanderwithmeher",
    region: "Himachal Pradesh",
    travelStyle: ["Trekking", "Mountains", "Solo Travel", "Photography"],
    isRealPerson: false,
    stats: { staysCount: 6, experiencesCount: 9, itinerariesCount: 3, followers: "—", itineraryCopies: 0, bookings: 0 },
    hasFullGuide: false,
    bio: "I trade city weekends for mountain trailheads — Himachal's homestays, high-altitude treks and the tea-stall conversations in between.",
  },
  {
    handle: "saltandsandtravels",
    name: "Ananya Fernandes",
    creatorName: "@saltandsandtravels",
    region: "Goa",
    travelStyle: ["Beaches", "Backpacking", "Nightlife", "Food"],
    isRealPerson: false,
    stats: { staysCount: 7, experiencesCount: 11, itinerariesCount: 3, followers: "—", itineraryCopies: 0, bookings: 0 },
    hasFullGuide: false,
    bio: "Goa beyond the beach clubs — I map out the quiet coves, the family-run beach shacks and the sunset spots the tour buses skip.",
  },
];

export function getCuratorByHandle(handle: string) {
  return travelCurators.find((c) => c.handle === handle);
}

// ---------- VJ Siddhu — detailed public profile & itinerary ----------
// The one non-Riya curator with a real, built-out /travel-with page.

export const vjSiddhuProfile = {
  handle: "vjsiddhu_vlogs",
  name: "VJ Siddhu",
  creatorName: "@vjsiddhu_vlogs",
  avatar: "/curators/vj-siddhu-vlogs-logo.jpg",
  region: "Tamil Nadu",
  tagline: "Discover the food, stays, hidden places and experiences that make Tamil Nadu worth exploring with your friends.",
  intro:
    "I've explored Tamil Nadu's food streets, heritage towns, hidden beaches and local hangouts — mostly with a car full of friends and no fixed plan. These are the stays, eats and experiences I'd actually send you to.",
  travelStyle: ["Food", "Lifestyle", "Friends", "Local Travel"],
  featuredDestinations: ["Pondicherry", "Chennai", "Mahabalipuram", "Yelagiri", "Kodaikanal", "Ooty"],
};

export const vjSiddhuCuratedStays: {
  id: string;
  propertySlug: string;
  name: string;
  location: string;
  image: string;
  categories: string[];
  note: string;
  price: number;
}[] = [
  {
    id: "vj-cs1",
    propertySlug: "canopy-tiny-house",
    name: "The Canopy Tiny House",
    location: "Auroville, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
    categories: ["Unique", "Friends"],
    note: "First stop for anyone visiting with a group — the campfire deck alone is worth the trip.",
    price: 4_500,
  },
  {
    id: "vj-cs2",
    propertySlug: "vaksana-pico",
    name: "Vaksana Farms — PICO",
    location: "Tindivanam, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
    categories: ["Farm Stay", "Nature"],
    note: "We planned one night and stayed two. Watching the orchard work start at sunrise isn't a gimmick.",
    price: 3_200,
  },
  {
    id: "vj-cs3",
    propertySlug: "heritage-courtyard-villa",
    name: "Heritage Courtyard Villa",
    location: "Karaikudi, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    categories: ["Heritage", "Boutique"],
    note: "Closest thing to time travel in Tamil Nadu — 200-year-old Chettinad architecture, done right.",
    price: 7_200,
  },
];

export const vjSiddhuItineraries: {
  id: string;
  title: string;
  region: string;
  durationLabel: string;
  coverImage: string;
  status: "Published" | "Draft";
  days: ItineraryDay[];
  estimatedCost: string;
  saves: number;
  copies: number;
  bookingsFromCopies: number;
  commissionEarned: string;
}[] = [
  {
    id: "vj-it1",
    title: "3 Days — Pondicherry with VJ Siddhu",
    region: "Pondicherry, Tamil Nadu",
    durationLabel: "3 days",
    coverImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    status: "Published",
    days: [
      {
        day: 1,
        title: "White Town & the Coast",
        summary:
          "We checked into a heritage stay in White Town, walked the old French Quarter with the crew, ate our way through the local food trail, and watched the sunset from the coast.",
        stops: [
          { type: "Stay", label: "Check in — heritage stay in White Town" },
          { type: "Activity", label: "White Town heritage walk" },
          { type: "Food", label: "Local food trail" },
          { type: "Experience", label: "Sunset at the coast" },
        ],
      },
      {
        day: 2,
        title: "Auroville & Cafés",
        summary:
          "Spent the morning exploring Auroville, hopped between our favourite cafés, squeezed in a quick nature activity, then ended with a proper dinner with friends.",
        stops: [
          { type: "Experience", label: "Auroville experience" },
          { type: "Food", label: "Café hopping" },
          { type: "Activity", label: "Nature activity" },
          { type: "Food", label: "Local dinner with friends" },
        ],
      },
      {
        day: 3,
        title: "Beach & Departure",
        summary:
          "Started the day at the beach, picked up a few things from the local shops, soaked in one last property experience, then checked out.",
        stops: [
          { type: "Activity", label: "Beach morning" },
          { type: "Activity", label: "Local shopping" },
          { type: "Experience", label: "Property experience" },
          { type: "Transport", label: "Checkout" },
        ],
      },
    ],
    estimatedCost: "≈₹8,000 per person (demo estimate)",
    saves: 2_140,
    copies: 1_180,
    bookingsFromCopies: 134,
    commissionEarned: "₹2.1L (demo)",
  },
];

// ---------- Travel story — "How I Experienced…" section on the Travel Guide Experience Page ----------
// Demo copy, not verified quotes — see DEMO_DATA_NOTICE above.
export const vjSiddhuTravelStory: CuratorTravelStory = {
  whyThisDestination:
    "Pondicherry is the trip I keep sending my friends on — it's close enough for a weekend and different enough to feel like a proper break.",
  favouriteStay: "The heritage stay in White Town. Chettinad-style architecture and a five-minute walk to everything.",
  favouriteExperience: "Cycling through Auroville with the crew — no fixed plan, just following whichever road looked interesting.",
  favouriteFood: "Whatever's on the local food trail in White Town — the roadside stalls beat the sit-down places every time.",
  whatSurprisedThem: "How different Auroville feels from the rest of Pondicherry — like driving into a completely different pace of life.",
  travelTips: [
    "Go with a group if you can — White Town's cafés are made for it.",
    "Keep Day 2 loose. Auroville rewards wandering more than a fixed schedule.",
    "Save the beach for the last morning, not the first — it's the better way to end the trip.",
  ],
};
