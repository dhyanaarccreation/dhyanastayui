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

import {
  influencerProfile,
  curatorIdentity,
  curatedStays as riyaCuratedStays,
  itineraries as riyaItineraries,
  type ItineraryDay,
} from "./influencer-data";

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
}

function countExperienceStops(days: ItineraryDay[]) {
  return days.reduce((sum, d) => sum + d.stops.filter((s) => s.type === "Experience").length, 0);
}

const riyaPublished = riyaItineraries.filter((it) => it.status === "Published");

export const travelCurators: TravelCuratorSummary[] = [
  {
    handle: curatorIdentity.handle,
    name: influencerProfile.name,
    creatorName: influencerProfile.creatorName,
    avatar: influencerProfile.avatar,
    region: curatorIdentity.region,
    travelStyle: influencerProfile.contentCategories.slice(0, 3),
    isRealPerson: false,
    stats: {
      staysCount: riyaCuratedStays.length,
      experiencesCount: riyaPublished.reduce((sum, it) => sum + countExperienceStops(it.days), 0),
      itinerariesCount: riyaPublished.length,
      followers: influencerProfile.audienceSize,
      itineraryCopies: riyaItineraries.reduce((sum, it) => sum + it.copies, 0),
      bookings: riyaItineraries.reduce((sum, it) => sum + it.bookingsFromCopies, 0),
    },
    hasFullGuide: true,
  },
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
    handle: "arjuntrails",
    name: "Arjun Trails",
    creatorName: "@arjuntrails",
    avatar: "https://i.pravatar.cc/150?img=13",
    region: "Tamil Nadu",
    travelStyle: ["Nature", "Adventure", "Road Trips"],
    isRealPerson: false,
    stats: { staysCount: 12, experiencesCount: 18, itinerariesCount: 6, followers: "842K", itineraryCopies: 2_480, bookings: 286 },
    hasFullGuide: false,
  },
  {
    handle: "mayawanders",
    name: "Maya Wanders",
    creatorName: "@mayawanders",
    avatar: "https://i.pravatar.cc/150?img=45",
    region: "South India",
    travelStyle: ["Slow Travel", "Luxury", "Wellness"],
    isRealPerson: false,
    stats: { staysCount: 16, experiencesCount: 21, itinerariesCount: 7, followers: "1.2M", itineraryCopies: 3_120, bookings: 342 },
    hasFullGuide: false,
  },
  {
    handle: "karthikonroute",
    name: "Karthik On Route",
    creatorName: "@karthikonroute",
    avatar: "https://i.pravatar.cc/150?img=51",
    region: "Tamil Nadu / Kerala",
    travelStyle: ["Adventure", "Road Trips", "Nature"],
    isRealPerson: false,
    stats: { staysCount: 14, experiencesCount: 19, itinerariesCount: 6, followers: "674K", itineraryCopies: 1_840, bookings: 198 },
    hasFullGuide: false,
  },
  {
    handle: "nilaeatsandtravels",
    name: "Nila Eats & Travels",
    creatorName: "@nilaeatsandtravels",
    avatar: "https://i.pravatar.cc/150?img=44",
    region: "Tamil Nadu",
    travelStyle: ["Food", "Culture", "Travel"],
    isRealPerson: false,
    stats: { staysCount: 11, experiencesCount: 17, itinerariesCount: 5, followers: "512K", itineraryCopies: 1_420, bookings: 176 },
    hasFullGuide: false,
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
