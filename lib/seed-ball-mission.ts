// ============================================
// 100 Million Seed Ball Mission — campaign mock data
// Shared across the homepage mission section, the
// Traveller Rewards ("My Green Impact") page, and the
// booking confirmation contribution message.
// ============================================

export const seedBallMission = {
  goal: 100_000_000,
  created: 14_286_400,
  distributed: 12_847_320,
  treesEstimated: 3_211_830,
  co2OffsetTons: 96_355,
  statesCovered: 21,
  volunteers: 8_640,
  donationsCollected: 18_420_000, // ₹
  monthlyTarget: 850_000,
  yearlyTarget: 10_000_000,
  /** Seed balls funded per completed booking, from Dhyana Stays' own profits. */
  perBookingContribution: 50,
};

export const topStatesCovered = [
  { state: "Tamil Nadu", seedBalls: 2_140_000 },
  { state: "Karnataka", seedBalls: 1_860_000 },
  { state: "Himachal Pradesh", seedBalls: 1_420_000 },
  { state: "Kerala", seedBalls: 1_210_000 },
  { state: "Rajasthan", seedBalls: 980_000 },
];

export const volunteerStories = [
  {
    name: "Ananya R.",
    role: "Volunteer since 2024",
    avatar: "https://i.pravatar.cc/150?img=47",
    quote: "We dispersed 4,000 seed balls across the Nilgiris in a single weekend — seeing the first saplings this year was unreal.",
  },
  {
    name: "Karthik M.",
    role: "Regional Coordinator, Tamil Nadu",
    avatar: "https://i.pravatar.cc/150?img=12",
    quote: "What started as a college project turned into 40 plantation drives across three districts.",
  },
  {
    name: "Divya S.",
    role: "Corporate CSR Volunteer",
    avatar: "https://i.pravatar.cc/150?img=32",
    quote: "Our whole team flew in for a weekend seed ball drive with Dhyana Stays — it's now an annual tradition.",
  },
];

// Reused from the existing, already-verified farm/nature Unsplash pool used
// elsewhere in the app (mock-data.ts, vaksana-farms.ts) — no new unverified
// image URLs introduced.
export const campaignPhotos = [
  "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=800&auto=format&fit=crop",
];

// ---------- Traveller "My Green Impact" gamification tiers ----------
export type GreenImpactLevel = "seed-supporter" | "green-explorer" | "forest-builder" | "earth-guardian";

export const greenImpactLevels: { key: GreenImpactLevel; label: string; emoji: string; threshold: number }[] = [
  { key: "seed-supporter", label: "Seed Supporter", emoji: "🌱", threshold: 0 },
  { key: "green-explorer", label: "Green Explorer", emoji: "🌿", threshold: 250 },
  { key: "forest-builder", label: "Forest Builder", emoji: "🌳", threshold: 750 },
  { key: "earth-guardian", label: "Earth Guardian", emoji: "🏆", threshold: 2000 },
];

/** Given a traveller's total seed balls, returns their current tier and the next one (if any). */
export function getGreenImpactLevel(seedBalls: number) {
  let current = greenImpactLevels[0];
  for (const level of greenImpactLevels) {
    if (seedBalls >= level.threshold) current = level;
  }
  const next = greenImpactLevels.find((l) => l.threshold > current.threshold);
  return { current, next };
}

// ---------- Buy Seed Balls catalog ----------
export const seedBallPacks = [
  { count: 25, price: 149 },
  { count: 50, price: 279 },
  { count: 100, price: 499 },
  { count: 250, price: 1149 },
  { count: 500, price: 2099 },
];

// ---------- Reward-point → Seed Ball donation add-ons (checkout / rewards) ----------
export const seedBallDonationOptions = [
  { amountInr: 50, seedBalls: 25 },
  { amountInr: 100, seedBalls: 50 },
  { amountInr: 250, seedBalls: 125 },
  { amountInr: 500, seedBalls: 250 },
];

// ---------- Reward Points → Seed Ball conversion (Traveller Rewards) ----------
export const rewardPointConversions = [
  { points: 100, seedBalls: 10 },
  { points: 500, seedBalls: 50 },
  { points: 1000, seedBalls: 100 },
];

// ---------- Responsible dispersal guidelines (shown with Buy Seed Balls) ----------
export const dispersalGuidelines = [
  {
    title: "Suitable locations",
    tip: "Open degraded land, barren hillsides, field bunds and village commons with good sunlight and rain access.",
  },
  {
    title: "Best planting season",
    tip: "Just before or during the monsoon (June–September) so seeds germinate with natural rainfall.",
  },
  {
    title: "Native species only",
    tip: "Every pack uses region-native seeds — neem, tamarind, pongamia, banyan and other local varieties.",
  },
  {
    title: "Places to avoid",
    tip: "Private property without permission, and protected ecosystems where planting is not permitted.",
  },
];

// ---------- Upcoming volunteer campaign events ----------
export const upcomingCampaignEvents = [
  {
    name: "Seed Ball Making Marathon",
    date: "Aug 09, 2026",
    location: "Auroville, Tamil Nadu",
    meetingPoint: "Matrimandir Gate 2",
    volunteers: 120,
    seedBallTarget: 25_000,
  },
  {
    name: "Western Ghats Restoration Ride",
    date: "Aug 23, 2026",
    location: "Coorg, Karnataka",
    meetingPoint: "Madikeri Fort Grounds",
    volunteers: 85,
    seedBallTarget: 40_000,
  },
  {
    name: "School Green Week Drive",
    date: "Sep 05, 2026",
    location: "Dehradun, Uttarakhand",
    meetingPoint: "Clock Tower Junction",
    volunteers: 60,
    seedBallTarget: 15_000,
  },
];
