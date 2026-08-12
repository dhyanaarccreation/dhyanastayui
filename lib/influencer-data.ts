// ============================================
// INFLUENCER DASHBOARD — shared mock data
// Powers Dashboard, Campaigns, Content, Promo &
// Links, Bookings, Analytics, Earnings, Marketing
// Assets, Messages and Profile — all under
// app/(dashboard)/influencer/.
// ============================================

export const influencerProfile = {
  id: "INF-1042",
  name: "Riya Malhotra",
  creatorName: "@riyatravels",
  bio: "Slow-travel storyteller — farm stays, wellness retreats and the odd rooftop sunset. Based in Bengaluru, shooting all over the South.",
  avatar: "https://i.pravatar.cc/150?img=47",
  location: "Bengaluru, Karnataka",
  contentCategories: ["Travel", "Wellness", "Photography", "Sustainable Travel"],
  languages: ["English", "Hindi", "Kannada"],
  audienceLocation: "72% India · 14% UAE · 9% UK",
  audienceSize: "248,000",
  verificationStatus: "Approved" as "Applied" | "Under Review" | "Approved" | "Active",
  socials: [
    { platform: "Instagram", handle: "@riyatravels", followers: "182k" },
    { platform: "YouTube", handle: "Riya Malhotra Travels", followers: "66k" },
  ],
  contact: { email: "riya@creatorbox.in", phone: "+91 98450 22110" },
  payoutAccount: { bank: "HDFC Bank", accountMasked: "···· 4821", verified: true },
};

// ---------- Core funnel metrics (Dashboard first screen) ----------
export const coreMetrics = {
  totalReach: 248_000,
  clicks: 9_420,
  leads: 1_180,
  bookings: 92,
  cancelledBookings: 6,
  conversionRate: 9.8, // % clicks -> leads
  revenueGenerated: 1_842_000, // ₹
  commissionEarned: 184_200, // ₹
  pendingCommission: 22_400,
  approvedCommission: 14_800,
  paidCommission: 147_000,
  pendingPayout: 22_400,
  paidPayout: 147_000,
  seedBallsGenerated: 4_600,
};

export const topContent = [
  { id: "tc1", title: "3 days at Nila Wellness Retreat (Reel)", platform: "Instagram", reach: "84.2k", clicks: 1_240 },
  { id: "tc2", title: "Auroville farm stay walkthrough", platform: "YouTube", reach: "41.6k", clicks: 860 },
  { id: "tc3", title: "Why I keep returning to Dhyana Stays", platform: "Instagram", reach: "38.1k", clicks: 610 },
];

// ---------- Promo code ----------
export const promoCode = {
  code: "RIYATRAVEL10",
  discount: "10% off booking value",
  commissionRate: "10% of eligible booking revenue",
  validity: "Jan 1 – Dec 31, 2026",
  campaign: "Always-on creator code",
  uses: 164,
  bookingConversions: 92,
  revenueGenerated: "₹18.4L",
};

// ---------- Referral links & QR ----------
export const referralLinks = [
  { id: "rl1", label: "General referral link", url: "dhyana.in/r/riyatravels", clicks: 4_120, conversions: 41 },
  { id: "rl2", label: "Nila Wellness Retreat", url: "dhyana.in/stays/nila-wellness-retreat?ref=riyatravels", clicks: 2_860, conversions: 33 },
  { id: "rl3", label: "Auroville Eco Cottages", url: "dhyana.in/stays/auroville-eco-cottages?ref=riyatravels", clicks: 1_540, conversions: 12 },
  { id: "rl4", label: "Monsoon Wellness campaign", url: "dhyana.in/c/monsoon-wellness?ref=riyatravels", clicks: 900, conversions: 6 },
];

// ---------- Campaigns ----------
export type CampaignStatus = "Available" | "Invited" | "Accepted" | "Active" | "Completed";

export const campaigns: {
  id: string;
  name: string;
  brief: string;
  targetProperty: string;
  offer: string;
  requiredContent: string;
  deadline: string;
  status: CampaignStatus;
  performance?: string;
}[] = [
  {
    id: "cm1",
    name: "Monsoon Wellness Week",
    brief: "Showcase a 3-night Ayurveda retreat — highlight the treatments, forest setting and food.",
    targetProperty: "Nila Wellness Retreat",
    offer: "Complimentary 3N stay + 15% audience discount",
    requiredContent: "1 Reel + 3 Stories + 1 blog post",
    deadline: "Aug 25, 2026",
    status: "Active",
    performance: "38.1k reach so far",
  },
  {
    id: "cm2",
    name: "Auroville Heritage Trail",
    brief: "A weekend exploring Auroville's architecture, farms and craft studios.",
    targetProperty: "Auroville Eco Cottages",
    offer: "Complimentary 2N stay",
    requiredContent: "1 YouTube video",
    deadline: "Sep 10, 2026",
    status: "Invited",
  },
  {
    id: "cm3",
    name: "Founders Circle Launch",
    brief: "Introduce the invite-only membership tier to a premium-travel audience.",
    targetProperty: "Platform-wide",
    offer: "₹15,000 flat fee + 12% campaign commission",
    requiredContent: "2 Instagram posts",
    deadline: "Sep 30, 2026",
    status: "Available",
  },
  {
    id: "cm4",
    name: "Weekend Escapes 15%",
    brief: "General promo push for the weekend discount campaign.",
    targetProperty: "Platform-wide",
    offer: "15% audience discount",
    requiredContent: "1 Story series",
    deadline: "Jul 15, 2026",
    status: "Completed",
    performance: "₹2.1L revenue attributed",
  },
];

// ---------- Content submissions ----------
export type ContentStatus = "Draft" | "Submitted" | "Review" | "Approved" | "Published";

export const contentSubmissions: {
  id: string;
  title: string;
  type: "Instagram Post" | "Reel" | "YouTube Video" | "Story" | "Blog" | "Photographs";
  campaign: string;
  url: string;
  status: ContentStatus;
  submittedOn: string;
}[] = [
  { id: "ct1", title: "Sunrise yoga deck — Nila Wellness", type: "Reel", campaign: "Monsoon Wellness Week", url: "https://instagram.com/reel/xyz123", status: "Published", submittedOn: "Jul 20" },
  { id: "ct2", title: "Ayurveda treatment room tour", type: "Story", campaign: "Monsoon Wellness Week", url: "https://instagram.com/stories/highlights/abc", status: "Approved", submittedOn: "Jul 26" },
  { id: "ct3", title: "3 days at Nila Wellness Retreat", type: "Blog", campaign: "Monsoon Wellness Week", url: "https://riyatravels.blog/nila-wellness", status: "Review", submittedOn: "Aug 02" },
  { id: "ct4", title: "Auroville farm walkthrough — draft", type: "YouTube Video", campaign: "Auroville Heritage Trail", url: "", status: "Draft", submittedOn: "—" },
];

// ---------- Booking attribution (no traveller PII) ----------
export const attributedBookings = [
  { id: "DHY-8471", property: "Nila Wellness Retreat", bookingDate: "Jul 18", travelDate: "Aug 14 – 17", value: "₹28,500", commission: "₹2,850", status: "Confirmed" },
  { id: "DHY-8455", property: "Auroville Eco Cottages", bookingDate: "Jul 22", travelDate: "Aug 05 – 07", value: "₹14,200", commission: "₹1,420", status: "Confirmed" },
  { id: "DHY-8402", property: "Nila Wellness Retreat", bookingDate: "Jul 10", travelDate: "Jul 20 – 23", value: "₹31,000", commission: "₹3,100", status: "Completed" },
  { id: "DHY-8390", property: "Stone Valley Villa", bookingDate: "Jul 05", travelDate: "Jul 12 – 14", value: "₹19,800", commission: "₹1,980", status: "Cancelled" },
];

// ---------- Commission rule (view-only for influencer) ----------
export const commissionRule = {
  model: "Performance Tier" as const,
  description: "Commission rate increases with confirmed bookings this quarter.",
  tiers: [
    { range: "0 – 10 bookings", rate: "8%" },
    { range: "11 – 25 bookings", rate: "10%" },
    { range: "26+ bookings", rate: "12%" },
  ],
  currentTier: "11 – 25 bookings",
  currentRate: "10%",
};

// ---------- Earnings & payouts ----------
export const earningsHistory = [
  { id: "eh1", label: "Nila Wellness Retreat · DHY-8402", amount: "+₹3,100", status: "Paid", date: "Jul 24" },
  { id: "eh2", label: "Campaign bonus · Monsoon Wellness Week", amount: "+₹5,000", status: "Paid", date: "Jul 20" },
  { id: "eh3", label: "Auroville Eco Cottages · DHY-8455", amount: "+₹1,420", status: "Approved", date: "Jul 22" },
  { id: "eh4", label: "Nila Wellness Retreat · DHY-8471", amount: "+₹2,850", status: "Pending", date: "Jul 18" },
  { id: "eh5", label: "Stone Valley Villa · DHY-8390 (cancelled)", amount: "₹0", status: "Cancelled", date: "Jul 05" },
];

export const payoutHistory = [
  { id: "po1", amount: "₹42,000", requestedOn: "Jul 01", status: "Paid" },
  { id: "po2", amount: "₹38,500", requestedOn: "Jun 01", status: "Paid" },
  { id: "po3", amount: "₹22,400", requestedOn: "Aug 01", status: "Processing" },
];

export const minimumPayoutThreshold = 5_000; // ₹

// ---------- Marketing assets (link-only, per platform policy) ----------
export const marketingAssets = [
  { id: "ma1", name: "Nila Wellness Retreat — property photo pack", type: "Photos", url: "https://assets.dhyana.in/kits/nila-wellness-photos.zip" },
  { id: "ma2", name: "Brand guidelines & logo kit", type: "Brand Kit", url: "https://assets.dhyana.in/kits/brand-guidelines.pdf" },
  { id: "ma3", name: "Monsoon Wellness Week — campaign poster", type: "Poster", url: "https://assets.dhyana.in/kits/monsoon-wellness-poster.pdf" },
  { id: "ma4", name: "Reel template — 15s property tour", type: "Reel Template", url: "https://assets.dhyana.in/kits/reel-template-tour.mp4" },
  { id: "ma5", name: "Story template — before/after stay", type: "Story Template", url: "https://assets.dhyana.in/kits/story-template.psd" },
  { id: "ma6", name: "Destination image set — Auroville", type: "Destination Images", url: "https://assets.dhyana.in/kits/auroville-images.zip" },
  { id: "ma7", name: "Approved campaign captions", type: "Captions", url: "https://assets.dhyana.in/kits/captions-monsoon.docx" },
];

// ---------- Messages (marketing team communication) ----------
export const messages = [
  { id: "msg1", from: "Aditya Sharma · Marketing", text: "Loved the sunrise yoga reel — approving now. Can you get one more Story before Friday?", time: "2h ago", unread: true },
  { id: "msg2", from: "Dhyana Campaigns", text: "New campaign invite: Auroville Heritage Trail. Brief attached in Campaigns tab.", time: "1d ago", unread: true },
  { id: "msg3", from: "Aditya Sharma · Marketing", text: "Payout of ₹42,000 has been processed — should reflect in 2-3 business days.", time: "3d ago", unread: false },
  { id: "msg4", from: "Dhyana Support", text: "Your KYC documents were verified successfully.", time: "1w ago", unread: false },
];

// ---------- Notifications ----------
export const notifications = [
  { id: "nt1", text: "Campaign approved: Monsoon Wellness Week", time: "2h ago", tone: "sage" as const },
  { id: "nt2", text: "New campaign invite: Auroville Heritage Trail", time: "1d ago", tone: "primary" as const },
  { id: "nt3", text: "Commission generated: ₹2,850 from DHY-8471", time: "2d ago", tone: "sage" as const },
  { id: "nt4", text: "Content revision requested: Ayurveda treatment story", time: "4d ago", tone: "terracotta" as const },
  { id: "nt5", text: "Payout completed: ₹42,000", time: "1w ago", tone: "sage" as const },
];

// ---------- Calendar ----------
export const calendarEvents = [
  { id: "cal1", label: "Content deadline — Monsoon Wellness Week", date: "Aug 20, 2026", type: "Content" },
  { id: "cal2", label: "Campaign expiry — Monsoon Wellness Week", date: "Aug 25, 2026", type: "Campaign" },
  { id: "cal3", label: "Property visit — Auroville Eco Cottages", date: "Sep 05 – 07, 2026", type: "Stay" },
  { id: "cal4", label: "Next payout date", date: "Sep 01, 2026", type: "Payout" },
];

// ---------- Property visit / hosted stay ----------
export const propertyVisits = [
  {
    id: "pv1",
    property: "Auroville Eco Cottages",
    campaign: "Auroville Heritage Trail",
    status: "Approved" as "Invitation" | "Approved" | "Allocated" | "Completed",
    checkIn: "Sep 05, 2026",
    checkOut: "Sep 07, 2026",
    hostContact: "Lakshmi Iyer · +91 98400 11223",
    contentRequirement: "1 YouTube video within 2 weeks of stay",
  },
];

// ---------- Audience analytics (aggregate only, no PII) ----------
export const audienceAnalytics = {
  ageRanges: [
    { range: "18–24", pct: 22 },
    { range: "25–34", pct: 41 },
    { range: "35–44", pct: 24 },
    { range: "45+", pct: 13 },
  ],
  interests: ["Wellness", "Sustainable Travel", "Photography", "Farm Stays", "Architecture"],
  deviceSplit: { mobile: 78, desktop: 22 },
  trafficSources: [
    { source: "Instagram", pct: 61 },
    { source: "YouTube", pct: 24 },
    { source: "Direct / QR", pct: 15 },
  ],
  topDestinationInterest: ["Auroville", "Palakkad", "Coorg", "Munnar"],
};

// ---------- Top performing properties ----------
export const topProperties = [
  { id: "tp1", name: "Nila Wellness Retreat", views: 18_400, clicks: 2_860, saves: 940, bookings: 41, revenue: "₹11.2L", conversionRate: "1.4%" },
  { id: "tp2", name: "Auroville Eco Cottages", views: 9_600, clicks: 1_540, saves: 410, bookings: 12, revenue: "₹3.8L", conversionRate: "0.8%" },
  { id: "tp3", name: "Stone Valley Villa", views: 6_200, clicks: 900, saves: 260, bookings: 6, revenue: "₹2.1L", conversionRate: "0.6%" },
];
