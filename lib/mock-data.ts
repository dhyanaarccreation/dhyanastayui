// ============================================
// DHYANA STAYS — Mock Data
// Complete mock dataset for all Phase 1 screens
// ============================================

export interface Property {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  story: string;
  category: string;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: { lat: number; lng: number };
  };
  images: string[];
  /** Extended photo set shown in the gallery modal — always 6–8 images, distinct per stay. */
  galleryImages: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  area: string;
  amenities: string[];
  highlights: string[];
  host: {
    name: string;
    avatar: string;
    since: string;
    responseRate: string;
    responseTime: string;
    bio: string;
    verified: boolean;
    languages: string[];
  };
  houseRules: string[];
  cancellationPolicy: string;
  badges: string[];
  isFeatured: boolean;
  isTrending: boolean;
  sustainability: string[];
  /** Excluded from the /stays listing grid & filter facets, but still reachable
   *  directly by slug (e.g. a partner property's individual units, browsed via
   *  their own landing page rather than the general catalog). */
  hidden?: boolean;
  /** Handle of the Dhyana Travel Curator (see travel-guides-data.ts) who stayed
   *  here and filmed it — shows their logo as a badge on the stay card. */
  curatedBy?: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  travelType: string;
  images?: string[];
  hostReply?: string;
}

export interface Experience {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  image: string;
  location: string;
  gallery?: string[];
  video?: string;
  host?: { name: string; role: string; avatar: string };
  included?: string[];
  groupSize?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  /** Real per-post paragraphs — when present, the blog detail page renders
   *  these instead of its generic fallback body. */
  body?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
  stayName: string;
  category: "guest-stays" | "experiences" | "investors";
  propertySlug?: string;
  experienceId?: string;
  helpfulCount?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

// ============================================
// PROPERTIES
// ============================================

export const properties: Property[] = [
  {
    id: "1",
    name: "The Canopy Tiny House",
    slug: "canopy-tiny-house",
    tagline: "Where the forest floor becomes your living room",
    description: "Perched among ancient mango trees, The Canopy is a minimalist tiny house designed for those who crave silence, stars, and the gentle rustling of leaves. Every corner of this 280 sq ft retreat is thoughtfully crafted to maximize natural light and airflow.",
    story: "Built by a retired architect who believed that the most profound luxury is simplicity, The Canopy was designed over three years using locally sourced teak and recycled steel. The structure sits on stilts to preserve the forest floor beneath, allowing wildlife to pass freely underneath.",
    category: "Tiny House",
    location: { city: "Auroville", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.0059, lng: 79.8105 } },
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1681295692638-97ace05f56b4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 4500,
    originalPrice: 5500,
    rating: 4.9,
    reviewCount: 128,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: "280 sq ft",
    amenities: ["Wi-Fi", "Kitchen", "Outdoor Shower", "Campfire", "Organic Farm", "Yoga Deck", "Cycling", "Bird Watching"],
    highlights: ["Architect-designed", "Forest immersion", "Zero waste", "Organic breakfast"],
    host: { name: "Arjun Menon", avatar: "https://i.pravatar.cc/150?img=12", since: "2022", responseRate: "98%", responseTime: "< 1 hour", bio: "Architect and nature lover. I believe great stays are born from respecting the land.", verified: true, languages: ["English", "Tamil", "Hindi"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Quiet hours: 10 PM – 7 AM", "Pets welcome with notice"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in. 50% refund for cancellations 3-7 days before. No refund within 3 days.",
    badges: ["Curated Stay", "Eco Certified", "Design Excellence"],
    isFeatured: true,
    isTrending: true,
    sustainability: ["Solar powered", "Rainwater harvesting", "Organic farm", "Zero single-use plastic"],
    curatedBy: "vjsiddhu_vlogs",
  },
  {
    id: "2",
    name: "Stone Valley Farm Stay",
    slug: "stone-valley-farm-stay",
    tagline: "Where agriculture meets architecture",
    description: "A stunning farm stay nestled between granite boulders and cashew plantations. Stone Valley offers an authentic farming experience wrapped in contemporary design — think exposed stone walls, floor-to-ceiling glass, and a farm-to-table kitchen.",
    story: "What started as a family cashew farm three generations ago has been reimagined into a hospitality destination that celebrates agriculture. The original stone walls have been preserved and integrated into the new architecture.",
    category: "Farm Stay",
    location: { city: "Kodaikanal", state: "Tamil Nadu", country: "India", coordinates: { lat: 10.2381, lng: 77.4892 } },
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 6800,
    rating: 4.8,
    reviewCount: 94,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    area: "1,200 sq ft",
    amenities: ["Wi-Fi", "Kitchen", "Swimming Pool", "BBQ", "Organic Farm", "Campfire", "Parking", "Pet Friendly"],
    highlights: ["Heritage stone walls", "Farm-to-table dining", "Swimming pool", "Family friendly"],
    host: { name: "Priya Shankar", avatar: "https://i.pravatar.cc/150?img=25", since: "2021", responseRate: "95%", responseTime: "< 2 hours", bio: "Third-generation farmer turning our family land into unforgettable experiences.", verified: true, languages: ["English", "Tamil"] },
    houseRules: ["Check-in: 3:00 PM", "Check-out: 11:00 AM", "No smoking", "Quiet hours: 10 PM – 6 AM"],
    cancellationPolicy: "Free cancellation up to 14 days before check-in.",
    badges: ["Curated Stay", "Family Friendly"],
    isFeatured: true,
    isTrending: false,
    sustainability: ["Organic farming", "Solar water heater", "Composting"],
    // Superseded on the /stays listing by the Vaksana Farms partner card —
    // the individual property page still works if linked to directly.
    hidden: true,
  },
  {
    id: "3",
    name: "Nila Wellness Retreat",
    slug: "nila-wellness-retreat",
    tagline: "Heal. Breathe. Transform.",
    description: "An Ayurvedic wellness retreat set on the banks of the Nila river. This sustainably built bamboo-and-laterite complex offers yoga halls, meditation gardens, Ayurvedic treatment rooms, and riverside villas designed for deep healing.",
    story: "Founded by a couple who left corporate careers to pursue their passion for traditional healing, Nila was built entirely using local materials — bamboo, laterite, and palm thatch — following ancient Vastu principles.",
    category: "Wellness Retreat",
    location: { city: "Palakkad", state: "Kerala", country: "India", coordinates: { lat: 10.7867, lng: 76.6548 } },
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 8500,
    rating: 4.95,
    reviewCount: 67,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: "900 sq ft",
    amenities: ["Yoga Hall", "Meditation Garden", "Ayurvedic Spa", "Organic Kitchen", "River Access", "Library", "Wi-Fi"],
    highlights: ["Ayurvedic treatments", "Riverside location", "Yoga sessions", "Digital detox"],
    host: { name: "Dr. Lakshmi Nair", avatar: "https://i.pravatar.cc/150?img=26", since: "2020", responseRate: "99%", responseTime: "< 30 min", bio: "Ayurvedic physician & wellness architect. Every stay here is a journey inward.", verified: true, languages: ["English", "Malayalam", "Hindi"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 10:00 AM", "No alcohol", "No smoking", "Silence zone after 9 PM"],
    cancellationPolicy: "Free cancellation up to 10 days before check-in.",
    badges: ["Curated Stay", "Wellness Certified", "Eco Certified", "Signature Stay"],
    isFeatured: true,
    isTrending: true,
    sustainability: ["Bamboo construction", "Solar energy", "Rainwater harvesting", "Zero waste kitchen", "Native landscaping"],
    curatedBy: "drbro",
  },
  {
    id: "4",
    name: "The Glass Pavilion",
    slug: "glass-pavilion",
    tagline: "Luxury framed by the Western Ghats",
    description: "A stunning glass-walled villa offering 270° views of the Western Ghats. Designed by an award-winning architect, this luxurious 3-bedroom retreat features an infinity pool, private chef service, and floor-to-ceiling windows that blur the line between indoors and nature.",
    story: "The Glass Pavilion was conceived as an experiment in transparent architecture — the idea that a building should frame the landscape rather than obstruct it.",
    category: "Luxury Villa",
    location: { city: "Wayanad", state: "Kerala", country: "India", coordinates: { lat: 11.6854, lng: 76.1320 } },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638884896143-f1b2501e9a61?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1661773031258-9bd959928118?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1649511125503-3b23dc239c96?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 18500,
    originalPrice: 22000,
    rating: 4.85,
    reviewCount: 42,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    area: "2,400 sq ft",
    amenities: ["Infinity Pool", "Private Pool", "Bathtub", "Private Chef", "Wi-Fi", "AC", "Home Theatre", "BBQ", "Wine Cellar", "Parking", "Gym"],
    highlights: ["270° mountain views", "Infinity pool", "Private chef", "Award-winning design"],
    host: { name: "Rahul & Meera Kapoor", avatar: "https://i.pravatar.cc/150?img=13", since: "2023", responseRate: "100%", responseTime: "< 1 hour", bio: "We design luxury that respects nature. Every stay should be a masterpiece.", verified: true, languages: ["English", "Hindi", "Malayalam"] },
    houseRules: ["Check-in: 3:00 PM", "Check-out: 12:00 PM", "No parties", "Pool rules apply"],
    cancellationPolicy: "Free cancellation up to 21 days before check-in. 50% refund for 7-21 days.",
    badges: ["Curated Stay", "Signature Stay", "Luxury Collection"],
    isFeatured: true,
    isTrending: true,
    sustainability: ["Solar panels", "Natural ventilation"],
    curatedBy: "naaanveshana",
  },
  {
    id: "5",
    name: "Bamboo Nest Eco Stay",
    slug: "bamboo-nest-eco-stay",
    tagline: "Live like nature intended",
    description: "A cluster of elevated bamboo cabins connected by wooden walkways through a dense spice plantation. Each cabin is designed to be completely off-grid while offering surprising comfort — handwoven mattresses, solar-heated showers, and stargazing decks.",
    story: "Bamboo Nest was built by a community of local artisans using traditional construction techniques. No machine-cut wood was used — every joint is hand-carved.",
    category: "Eco Stay",
    location: { city: "Munnar", state: "Kerala", country: "India", coordinates: { lat: 10.0889, lng: 77.0595 } },
    images: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 3200,
    rating: 4.7,
    reviewCount: 156,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: "200 sq ft",
    amenities: ["Stargazing Deck", "Organic Meals", "Spice Garden", "Guided Trek", "Campfire", "Bird Watching"],
    highlights: ["100% off-grid", "Handcrafted bamboo", "Spice plantation", "Stargazing"],
    host: { name: "Thomas Kurien", avatar: "https://i.pravatar.cc/150?img=14", since: "2019", responseRate: "92%", responseTime: "< 3 hours", bio: "Conservationist and storyteller. My stays are built by the community, for the community.", verified: true, languages: ["English", "Malayalam"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No plastic allowed", "Respect wildlife"],
    cancellationPolicy: "Free cancellation up to 5 days before check-in.",
    badges: ["Curated Stay", "Eco Certified", "Community Built"],
    isFeatured: false,
    isTrending: true,
    sustainability: ["100% off-grid", "Bamboo construction", "No plastic", "Community built", "Native landscaping"],
    curatedBy: "naaanveshana",
  },
  {
    id: "6",
    name: "Heritage Courtyard Villa",
    slug: "heritage-courtyard-villa",
    tagline: "A 200-year-old story, retold for today",
    description: "A meticulously restored 200-year-old Chettinad mansion with original hand-painted tiles, carved wooden columns, and a central courtyard. Modern comforts have been seamlessly integrated while preserving every historical detail.",
    story: "This villa was almost demolished before an architect-conservationist stepped in to save it. Three years and 400 artisans later, it stands as a testament to Chettinad heritage.",
    category: "Heritage Home",
    location: { city: "Karaikudi", state: "Tamil Nadu", country: "India", coordinates: { lat: 10.0735, lng: 78.7811 } },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1688820661462-a44e4b2770e8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1650847821830-2c24e212213f?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 7200,
    rating: 4.9,
    reviewCount: 83,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    area: "3,500 sq ft",
    amenities: ["Courtyard", "Heritage Kitchen", "Library", "Wi-Fi", "AC", "Garden", "Cooking Class", "Heritage Walk"],
    highlights: ["200-year-old mansion", "Original tile work", "Chettinad cooking class", "Heritage architecture"],
    host: { name: "Vijay Raghavan", avatar: "https://i.pravatar.cc/150?img=15", since: "2021", responseRate: "96%", responseTime: "< 1 hour", bio: "Architecture conservationist. I believe old buildings have stories worth saving.", verified: true, languages: ["English", "Tamil", "Hindi"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No smoking", "Photography welcome"],
    cancellationPolicy: "Free cancellation up to 14 days before check-in.",
    badges: ["Curated Stay", "Heritage Certified", "Signature Stay"],
    isFeatured: true,
    isTrending: false,
    sustainability: ["Restored heritage", "Natural ventilation", "Rainwater harvesting"],
    curatedBy: "vjsiddhu_vlogs",
  },
  {
    id: "7",
    name: "Sunset Shore Beach House",
    slug: "sunset-shore-beach-house",
    tagline: "Where the tide meets your doorstep",
    description: "A thatched-roof beach house steps from the Arabian Sea, built for slow mornings on the sand and long, unhurried sunsets. Open-plan living spills onto a private veranda facing the water.",
    story: "Once a fisherman's cottage, Sunset Shore was rebuilt plank by plank using reclaimed wood and local laterite, keeping the original footprint so the dunes around it were never disturbed.",
    category: "Beach House",
    location: { city: "Goa", state: "Goa", country: "India", coordinates: { lat: 15.2993, lng: 74.1240 } },
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1455279145601-37efa82b5c95?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1650847821830-2c24e212213f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 9500,
    originalPrice: 11000,
    rating: 4.75,
    reviewCount: 71,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    area: "1,400 sq ft",
    amenities: ["Wi-Fi", "Public Pool", "Bathtub", "AC", "Beach Access", "BBQ", "Parking", "Home Theatre"],
    highlights: ["Beachfront location", "Private veranda", "Sunset views", "5-minute walk to the shacks"],
    host: { name: "Ines D'Souza", avatar: "https://i.pravatar.cc/150?img=32", since: "2022", responseRate: "97%", responseTime: "< 2 hours", bio: "Goan by birth, host by heart. I want every guest to slow down the way this coast taught me to.", verified: true, languages: ["English", "Konkani", "Hindi"] },
    houseRules: ["Check-in: 3:00 PM", "Check-out: 11:00 AM", "No loud music after 10 PM", "No outside guests at the pool"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    badges: ["Curated Stay", "Beachfront"],
    isFeatured: false,
    isTrending: true,
    sustainability: ["Reclaimed wood construction", "Solar water heater", "Dune conservation"],
    curatedBy: "drbro",
  },
  {
    id: "8",
    name: "Whispering Pines Adventure Camp",
    slug: "whispering-pines-adventure-camp",
    tagline: "Pitch a tent, chase a sunrise",
    description: "A cluster of walk-in safari tents set in a pine and coffee estate above Coorg, built for trekkers and campfire people. Days start with guided treks and end with everyone around the same fire.",
    story: "Started by two trekking guides who got tired of guests having nowhere to stay after a trek, Whispering Pines keeps things deliberately simple — canvas, firewood, and good trails.",
    category: "Adventure Camp",
    location: { city: "Coorg", state: "Karnataka", country: "India", coordinates: { lat: 12.4244, lng: 75.7382 } },
    images: [
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 2200,
    rating: 4.6,
    reviewCount: 103,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: "120 sq ft",
    amenities: ["Wi-Fi", "Bonfire", "Guided Trek", "Common Bathrooms", "Parking"],
    highlights: ["Guided sunrise treks", "Nightly bonfire", "Coffee estate setting", "Budget-friendly"],
    host: { name: "Kiran & Deepak", avatar: "https://i.pravatar.cc/150?img=51", since: "2021", responseRate: "94%", responseTime: "< 3 hours", bio: "Trekking guides first, hosts second. We'll get you up for the sunrise if it kills us.", verified: true, languages: ["English", "Kannada", "Hindi"] },
    houseRules: ["Check-in: 12:00 PM", "Check-out: 10:00 AM", "No AC — pack for the hills", "Lights out at the campfire by 11 PM"],
    cancellationPolicy: "Free cancellation up to 3 days before check-in.",
    badges: ["Curated Stay", "Budget Friendly"],
    isFeatured: false,
    isTrending: false,
    sustainability: ["Solar lighting", "No single-use plastic", "Local guide employment"],
  },
  // ------------------------------------------------
  // Vaksana Farms — partner property. Four individually bookable units on
  // one working organic farm, browsed via /vaksana-farms rather than the
  // general catalog (each still opens the standard stay/booking flow).
  // ------------------------------------------------
  {
    id: "9",
    name: "Vaksana Farms — PICO",
    slug: "vaksana-pico",
    tagline: "A quiet one-room retreat at the edge of the orchard",
    description: "PICO is the smallest and quietest stay on Vaksana Farms — a single-room cabin with just enough: a comfortable bed, a reading nook, and a private deck overlooking the orchard. Built for travelers who want to slow down completely.",
    story: "PICO was the first cabin built on the farm, originally meant as a tool shed before the founders realised the view was too good to waste on equipment.",
    category: "Farm Stay",
    location: { city: "Tindivanam", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.2350, lng: 79.6537 } },
    images: [
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 3200,
    rating: 4.8,
    reviewCount: 41,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: "180 sq ft",
    amenities: ["Wi-Fi", "Organic Farm", "Campfire", "Parking"],
    highlights: ["Orchard-edge cabin", "Private deck", "Farm-to-table meals", "Total quiet"],
    host: { name: "Vaksana Farms Team", avatar: "https://i.pravatar.cc/150?img=68", since: "2022", responseRate: "97%", responseTime: "< 2 hours", bio: "A family-run organic farm collective hosting travelers across four uniquely designed stays on our working farmland.", verified: true, languages: ["English", "Tamil"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Quiet hours: 9 PM – 7 AM"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    badges: ["Curated Stay", "Partner Property"],
    isFeatured: false,
    isTrending: false,
    sustainability: ["Organic farming", "Solar lighting", "Composting"],
    hidden: true,
  },
  {
    id: "10",
    name: "Vaksana Farms — COOP",
    slug: "vaksana-coop",
    tagline: "Wake up to the sound of the farmyard",
    description: "Set beside Vaksana's chicken coops and grazing paddocks, COOP is a rustic two-bedroom cottage built for families who want their mornings to start with animal sounds instead of alarms. Kids can help with feeding rounds right outside the door.",
    story: "COOP takes its name — and its neighbours — literally. It was built as a family cottage right beside the farm's original coop, so guests wake up to the same sounds the farmers do.",
    category: "Farm Stay",
    location: { city: "Tindivanam", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.2350, lng: 79.6537 } },
    images: [
      "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 4800,
    rating: 4.7,
    reviewCount: 58,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    area: "450 sq ft",
    amenities: ["Wi-Fi", "Organic Farm", "Kitchen", "Campfire", "Parking", "Pet Friendly"],
    highlights: ["Beside the animal enclosures", "Family friendly", "Farm chores for kids", "Home-cooked meals"],
    host: { name: "Vaksana Farms Team", avatar: "https://i.pravatar.cc/150?img=68", since: "2022", responseRate: "97%", responseTime: "< 2 hours", bio: "A family-run organic farm collective hosting travelers across four uniquely designed stays on our working farmland.", verified: true, languages: ["English", "Tamil"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Supervise children near animals"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    badges: ["Curated Stay", "Family Friendly", "Partner Property"],
    isFeatured: false,
    isTrending: false,
    sustainability: ["Organic farming", "Composting", "Rainwater harvesting"],
    hidden: true,
  },
  {
    id: "11",
    name: "Vaksana Farms — TANG",
    slug: "vaksana-tang",
    tagline: "A bright farmhouse ringed by citrus trees",
    description: "Surrounded by a working citrus orchard, TANG is a bright three-bedroom farmhouse built for groups who want space, shared meals, and orchard views from every window. The wraparound veranda is where most evenings end up.",
    story: "Named for the tangerine grove it sits inside, TANG was the farm's original homestead before Vaksana opened its doors to guests — the citrus trees are original too.",
    category: "Farm Stay",
    location: { city: "Tindivanam", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.2350, lng: 79.6537 } },
    images: [
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 7200,
    rating: 4.85,
    reviewCount: 37,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    area: "1,100 sq ft",
    amenities: ["Wi-Fi", "Kitchen", "Organic Farm", "BBQ", "Campfire", "Parking", "Pet Friendly"],
    highlights: ["Citrus orchard views", "Wraparound veranda", "Group friendly", "Shared farm-to-table dinners"],
    host: { name: "Vaksana Farms Team", avatar: "https://i.pravatar.cc/150?img=68", since: "2022", responseRate: "97%", responseTime: "< 2 hours", bio: "A family-run organic farm collective hosting travelers across four uniquely designed stays on our working farmland.", verified: true, languages: ["English", "Tamil"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Quiet hours: 10 PM – 7 AM"],
    cancellationPolicy: "Free cancellation up to 10 days before check-in.",
    badges: ["Curated Stay", "Family Friendly", "Partner Property"],
    isFeatured: false,
    isTrending: false,
    sustainability: ["Organic farming", "Solar water heater", "Composting", "Rainwater harvesting"],
    hidden: true,
  },
  {
    id: "12",
    name: "Vaksana Farms — LUMA",
    slug: "vaksana-luma",
    tagline: "Glass-walled farm living with a private plunge pool",
    description: "The most private stay on Vaksana Farms — a glass-walled two-bedroom villa with its own plunge pool, built for travelers who want farm life without giving up quiet luxury. Floor-to-ceiling windows keep the orchard in view from every room.",
    story: "LUMA — Latin for light — was designed to bring the outside in, with glass walls that turn the surrounding farmland into a living backdrop at every hour.",
    category: "Farm Stay",
    location: { city: "Tindivanam", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.2350, lng: 79.6537 } },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 9500,
    rating: 4.95,
    reviewCount: 29,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    area: "900 sq ft",
    amenities: ["Wi-Fi", "Private Pool", "AC", "Kitchen", "Organic Farm", "Parking"],
    highlights: ["Private plunge pool", "Glass-walled design", "Orchard views", "Premium privacy"],
    host: { name: "Vaksana Farms Team", avatar: "https://i.pravatar.cc/150?img=68", since: "2022", responseRate: "97%", responseTime: "< 2 hours", bio: "A family-run organic farm collective hosting travelers across four uniquely designed stays on our working farmland.", verified: true, languages: ["English", "Tamil"] },
    houseRules: ["Check-in: 3:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Pool rules apply"],
    cancellationPolicy: "Free cancellation up to 14 days before check-in.",
    badges: ["Curated Stay", "Signature Stay", "Partner Property"],
    isFeatured: false,
    isTrending: false,
    sustainability: ["Organic farming", "Solar panels", "Natural ventilation"],
    hidden: true,
  },
  {
    id: "13",
    name: "The Banyan Loft",
    slug: "banyan-loft",
    tagline: "A treetop loft wrapped in banyan roots",
    description: "Raised on stilts beneath a century-old banyan, this compact loft has a single wraparound window wall that puts you eye-level with the canopy. Mornings mean birdsong and filtered light; nights mean total quiet broken only by cicadas.",
    story: "Built by a local carpentry collective as a proof-of-concept for low-impact treetop living, the loft uses reclaimed teak beams and a lightweight steel frame that leaves the banyan's roots completely undisturbed.",
    category: "Loft",
    location: { city: "Auroville", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.0086, lng: 79.8129 } },
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1681295692638-97ace05f56b4?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1681295692638-97ace05f56b4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 5200,
    rating: 4.85,
    reviewCount: 41,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: "320 sq ft",
    amenities: ["Wi-Fi", "Kitchen", "Outdoor Shower", "Campfire", "Yoga Deck", "Cycling"],
    highlights: ["Treetop views", "Banyan-root architecture", "Private deck", "Organic breakfast"],
    host: { name: "Divya Krishnan", avatar: "https://i.pravatar.cc/150?img=39", since: "2023", responseRate: "97%", responseTime: "< 1 hour", bio: "Carpenter and community-build organizer. This loft is the first of a series of low-impact treetop stays we're building.", verified: true, languages: ["English", "Tamil"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Quiet hours: 10 PM – 7 AM"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in. 50% refund for cancellations 3-7 days before. No refund within 3 days.",
    badges: ["Curated Stay", "Eco Certified"],
    isFeatured: false,
    isTrending: true,
    sustainability: ["Solar powered", "Rainwater harvesting", "Zero single-use plastic"],
  },
  {
    id: "14",
    name: "Earthscape Cob Cottage",
    slug: "earthscape-cob-cottage",
    tagline: "Hand-sculpted earth walls, cool through the hottest afternoons",
    description: "Built from cob — a mix of clay, sand, and straw — this one-room cottage stays naturally cool without air conditioning even in peak summer. Curved walls, built-in earth furniture, and a small organic kitchen garden out front give it a handmade, storybook feel.",
    story: "The owner trained in natural building techniques across Auroville's earth-construction community before spending a year hand-sculpting this cottage with a small team, mixing every batch of cob on site.",
    category: "Eco Cottage",
    location: { city: "Auroville", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.0031, lng: 79.8087 } },
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1650847821830-2c24e212213f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 3800,
    rating: 4.75,
    reviewCount: 33,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    area: "350 sq ft",
    amenities: ["Wi-Fi", "Kitchen", "Organic Farm", "Campfire", "Parking"],
    highlights: ["Hand-built cob walls", "Natural cooling", "Organic garden", "Quiet lane setting"],
    host: { name: "Selvam Raja", avatar: "https://i.pravatar.cc/150?img=56", since: "2021", responseRate: "96%", responseTime: "< 2 hours", bio: "Natural builder trained in Auroville's earth-construction community. I host guests in the same cottage I built by hand.", verified: true, languages: ["English", "Tamil"] },
    houseRules: ["Check-in: 3:00 PM", "Check-out: 10:00 AM", "No smoking indoors", "Quiet hours: 10 PM – 6 AM"],
    cancellationPolicy: "Free cancellation up to 14 days before check-in.",
    badges: ["Curated Stay", "Eco Certified"],
    isFeatured: false,
    isTrending: false,
    sustainability: ["Natural building materials", "Passive cooling", "Organic farm", "Composting toilet"],
  },
  {
    id: "15",
    name: "Solar Studio at Auroville",
    slug: "solar-studio-auroville",
    tagline: "A light-filled studio powered entirely by the sun",
    description: "A minimalist studio a short cycle from the Matrimandir, designed around passive solar principles with a rooftop array that covers 100% of its power needs. Clean lines, a private entrance, and a small breakfast nook make it an easy base for exploring the community on foot or bike.",
    story: "Designed by a resident architect as a personal experiment in off-grid living, the studio has run entirely on rooftop solar since it was completed, with a battery bank that carries it through cloudy days.",
    category: "Studio",
    location: { city: "Auroville", state: "Tamil Nadu", country: "India", coordinates: { lat: 12.0072, lng: 79.8151 } },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
    ],
    price: 4100,
    rating: 4.8,
    reviewCount: 27,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: "300 sq ft",
    amenities: ["Wi-Fi", "Kitchen", "AC", "Parking", "Yoga Deck"],
    highlights: ["100% solar powered", "Minimalist design", "Walk to Matrimandir", "Private entrance"],
    host: { name: "Karthik Subramaniam", avatar: "https://i.pravatar.cc/150?img=61", since: "2022", responseRate: "99%", responseTime: "< 1 hour", bio: "Architect and long-time Auroville resident. I designed this studio as an experiment in fully off-grid living.", verified: true, languages: ["English", "Tamil", "French"] },
    houseRules: ["Check-in: 2:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Quiet hours: 10 PM – 7 AM"],
    cancellationPolicy: "Free cancellation up to 7 days before check-in. 50% refund for cancellations 3-7 days before. No refund within 3 days.",
    badges: ["Curated Stay", "Eco Certified"],
    isFeatured: false,
    isTrending: false,
    sustainability: ["Solar powered", "Energy efficient design", "Zero single-use plastic"],
  },
];

// ============================================
// CATEGORIES
// ============================================

export const categories = [
  { name: "Tiny Houses", icon: "Home", count: 24, slug: "tiny-houses", description: "Minimalist living, maximum experience", image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=400&auto=format&fit=crop" },
  { name: "Farm Stays", icon: "Sprout", count: 38, slug: "farm-stays", description: "Connect with the land", image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=400&auto=format&fit=crop" },
  { name: "Wellness Retreats", icon: "Heart", count: 15, slug: "wellness-retreats", description: "Heal body and soul", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=400&auto=format&fit=crop" },
  { name: "Luxury Villas", icon: "Crown", count: 12, slug: "luxury-villas", description: "Uncompromising elegance", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=400&auto=format&fit=crop" },
  { name: "Eco Stays", icon: "Leaf", count: 29, slug: "eco-stays", description: "Sustainable luxury", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=400&auto=format&fit=crop" },
  { name: "Heritage Homes", icon: "Landmark", count: 18, slug: "heritage-homes", description: "Stories in stone", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=400&auto=format&fit=crop" },
  { name: "Workations", icon: "Laptop", count: 21, slug: "workations", description: "Work from paradise", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop" },
  { name: "Couple Escapes", icon: "HeartHandshake", count: 27, slug: "couple-escapes", description: "Romance redefined", image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=400&auto=format&fit=crop" },
  { name: "Family Holidays", icon: "Users", count: 33, slug: "family-holidays", description: "Memories for generations", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop" },
  { name: "Pet Friendly", icon: "PawPrint", count: 16, slug: "pet-friendly", description: "Bring your fur baby", image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=400&auto=format&fit=crop" },
  { name: "Adventure Camps", icon: "Mountain", count: 11, slug: "adventure-camps", description: "Thrill seekers welcome", image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?q=80&w=400&auto=format&fit=crop" },
  { name: "Boutique Resorts", icon: "Castle", count: 8, slug: "boutique-resorts", description: "Intimate grandeur", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=400&auto=format&fit=crop" },
];

// ============================================
// DESTINATIONS
// ============================================

export const destinations = [
  { slug: "auroville", name: "Auroville", state: "Tamil Nadu", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop", properties: 12 },
  { slug: "pondicherry", name: "Pondicherry", state: "Pondicherry", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop", properties: 14 },
];

// ============================================
// REVIEWS
// ============================================

export const reviews: Review[] = [
  { id: "r1", propertyId: "1", userName: "Ananya Sharma", avatar: "https://i.pravatar.cc/150?img=32", rating: 5, date: "2026-06-15", comment: "The Canopy is everything the photos promise and more. Waking up to birdsong and coffee brewed on a wood stove — this is the real luxury. Arjun's attention to detail is extraordinary.", travelType: "Couple", images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop"] },
  { id: "r2", propertyId: "1", userName: "Rohan Desai", avatar: "https://i.pravatar.cc/150?img=16", rating: 5, date: "2026-05-28", comment: "I came here to disconnect and I succeeded completely. The zero-waste approach is genuine — not performative. Best decision of 2026.", travelType: "Solo", hostReply: "Thank you, Rohan! Your respect for our ecosystem made you the perfect guest." },
  { id: "r3", propertyId: "2", userName: "Deepika Menon", avatar: "https://i.pravatar.cc/150?img=33", rating: 5, date: "2026-06-01", comment: "Our kids loved the farm experience! Milking cows, picking cashews, and swimming in the natural pool. Priya made us feel like family.", travelType: "Family" },
  { id: "r4", propertyId: "3", userName: "Kavitha Reddy", avatar: "https://i.pravatar.cc/150?img=34", rating: 5, date: "2026-05-10", comment: "I've been to wellness retreats across the world — Bali, Thailand, Sedona. Nila rivals them all at a fraction of the cost. The Ayurvedic treatments were life-changing.", travelType: "Solo" },
  { id: "r5", propertyId: "4", userName: "Amit & Neha Joshi", avatar: "https://i.pravatar.cc/150?img=17", rating: 5, date: "2026-04-22", comment: "The infinity pool overlooking the Ghats at sunrise is a memory we'll carry forever. Worth every rupee.", travelType: "Couple" },
  { id: "r6", propertyId: "9", userName: "Meera Iyer", avatar: "https://i.pravatar.cc/150?img=45", rating: 5, date: "2026-06-20", comment: "PICO is exactly what it promises — small, quiet, and honest. I spent three days doing almost nothing and it was perfect.", travelType: "Solo" },
  { id: "r7", propertyId: "10", userName: "The Chandran Family", avatar: "https://i.pravatar.cc/150?img=48", rating: 5, date: "2026-05-30", comment: "Our kids fed the ducks every single morning and didn't want to leave. COOP is built for exactly this kind of family trip.", travelType: "Family" },
  { id: "r8", propertyId: "11", userName: "Arvind & friends", avatar: "https://i.pravatar.cc/150?img=52", rating: 4.8, date: "2026-06-05", comment: "Six of us stayed at TANG and it never felt cramped. The wraparound veranda dinners were the highlight of the whole trip.", travelType: "Group" },
  { id: "r9", propertyId: "12", userName: "Priyanka Rao", avatar: "https://i.pravatar.cc/150?img=47", rating: 5, date: "2026-06-12", comment: "LUMA is genuinely luxurious without losing the farm feeling — waking up to orchard views through glass walls, then a private plunge pool at sunset.", travelType: "Couple" },
];

// ============================================
// EXPERIENCES
// ============================================

export const experiences: Experience[] = [
  {
    id: "e1",
    name: "Sunrise Yoga at Auroville",
    category: "Wellness",
    description: "Begin your day with a guided yoga session overlooking the Matrimandir at golden hour. We move through a slow, breath-led vinyasa sequence as the sun comes up over the amphitheatre, then close with 15 minutes of silent meditation. No experience needed — mats, blocks and water are provided.",
    price: 800,
    duration: "1.5 hours",
    rating: 4.9,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=800&auto=format&fit=crop",
    location: "Auroville",
    gallery: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Kavitha Ram", role: "Certified Hatha & Vinyasa instructor · 8 years", avatar: "https://i.pravatar.cc/150?img=45" },
    included: ["Guided vinyasa sequence", "Yoga mat & props", "Herbal tea after class", "Meditation cushion"],
    groupSize: "Up to 12 people",
  },
  {
    id: "e2",
    name: "Farm-to-Table Cooking Class",
    category: "Food",
    description: "Harvest ingredients from an organic farm and cook a traditional South Indian meal with a master chef. You'll pick vegetables straight off the vine, learn to grind a fresh masala on a stone grinder, and plate a full meal you'll then sit down and eat together.",
    price: 1500,
    duration: "3 hours",
    rating: 4.8,
    reviewCount: 32,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
    location: "Kodaikanal",
    gallery: [
      "https://images.unsplash.com/photo-1607301405390-d831c242f59b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    host: { name: "Chef Elena", role: "Farm cuisine specialist · Stone Valley kitchen", avatar: "https://i.pravatar.cc/150?img=44" },
    included: ["Farm harvest walk", "Hands-on cooking session", "Full meal & recipe card", "Apron to keep"],
    groupSize: "Up to 8 people",
  },
  {
    id: "e3",
    name: "Western Ghats Trek",
    category: "Adventure",
    description: "A guided trek through pristine shola fogitrests with a naturalist who knows every bird and butterfly. The trail climbs gently through montane grassland before dropping into a cloud forest — expect waterfalls, wild elephant tracks, and views across three states on a clear day.",
    price: 1200,
    duration: "5 hours",
    rating: 4.7,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    location: "Munnar",
    gallery: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Joseph Varghese", role: "Naturalist & trek guide · 12 years", avatar: "https://i.pravatar.cc/150?img=52" },
    included: ["Naturalist-led trek", "Packed trail lunch", "First-aid & safety gear", "Binoculars for the group"],
    groupSize: "Up to 10 people",
  },
  {
    id: "e4",
    name: "Pottery Workshop",
    category: "Culture",
    description: "Shape clay on a traditional wheel with a fourth-generation potter in a riverside studio. You'll learn to centre the clay, pull a basic form, and glaze a piece to take home once it's fired — no prior experience necessary, just a willingness to get your hands messy.",
    price: 600,
    duration: "2 hours",
    rating: 4.6,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    location: "Auroville",
    gallery: [
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    host: { name: "Murugan K.", role: "Fourth-generation potter · Auroville studio", avatar: "https://i.pravatar.cc/150?img=53" },
    included: ["Wheel-throwing session", "Clay & glazing materials", "Firing & pickup (7 days)", "Apron provided"],
    groupSize: "Up to 6 people",
  },
  {
    id: "e5",
    name: "Spice Plantation Tour",
    category: "Nature",
    description: "Walk through a working spice plantation learning about pepper, cardamom, and vanilla cultivation. Your guide will show you how each spice grows, let you taste it fresh off the vine, and explain the harvest calendar that's shaped this region's economy for centuries.",
    price: 500,
    duration: "2 hours",
    rating: 4.8,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=800&auto=format&fit=crop",
    location: "Wayanad",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Beena Thomas", role: "Plantation owner · 3rd generation", avatar: "https://i.pravatar.cc/150?img=49" },
    included: ["Guided plantation walk", "Fresh spice tastings", "Take-home spice sampler", "Filter coffee"],
    groupSize: "Up to 15 people",
  },
  {
    id: "e6",
    name: "Night Photography Safari",
    category: "Photography",
    description: "Capture the Milky Way and nocturnal wildlife with a professional astrophotographer. We head to a dark-sky spot away from any light pollution, set up tripods, and shoot long-exposure star trails while listening for owls and civets in the coffee estate around us.",
    price: 2000,
    duration: "4 hours",
    rating: 4.9,
    reviewCount: 14,
    image: "https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=800&auto=format&fit=crop",
    location: "Coorg",
    gallery: [
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    host: { name: "Arjun Iyer", role: "Astrophotographer & guide", avatar: "https://i.pravatar.cc/150?img=68" },
    included: ["Tripod & camera settings guidance", "Dark-sky location transport", "Hot coffee & snacks", "RAW editing tips"],
    groupSize: "Up to 6 people",
  },
  {
    id: "e7",
    name: "Ayurvedic Massage & Herbal Bath Ritual",
    category: "Wellness",
    description: "A traditional Kerala Ayurvedic therapy session tailored to your dosha, followed by a warm herbal steam bath. The house physician reviews your constitution first, then two therapists work in synchronised strokes with medicated oils pressed from herbs grown on the property.",
    price: 1800,
    duration: "2 hours",
    rating: 4.9,
    reviewCount: 37,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
    location: "Palakkad",
    gallery: [
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Dr. Lakshmi Nair", role: "Ayurvedic physician · Nila Wellness", avatar: "https://i.pravatar.cc/150?img=47" },
    included: ["Dosha consultation", "Synchronised Abhyanga massage", "Herbal steam bath", "Post-therapy herbal tea"],
    groupSize: "1 person",
  },
  {
    id: "e8",
    name: "Chettinad Spice Trail & Feast",
    category: "Food",
    description: "Explore a centuries-old spice trading town and cook a fiery Chettinad meal from scratch. You'll visit a family-run spice grinder, learn to roast and blend a Chettinad masala, and finish with a banana-leaf feast shared with the family that hosts you.",
    price: 1400,
    duration: "3.5 hours",
    rating: 4.7,
    reviewCount: 24,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop",
    location: "Pondicherry",
    gallery: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    host: { name: "Meena Akka", role: "Home cook · Chettinad kitchen, 4th generation", avatar: "https://i.pravatar.cc/150?img=29" },
    included: ["Spice market walk", "Hands-on masala grinding", "Banana-leaf feast", "Recipe booklet"],
    groupSize: "Up to 10 people",
  },
  {
    id: "e9",
    name: "Backwater Kayaking at Dawn",
    category: "Adventure",
    description: "Paddle a two-person kayak through narrow backwater canals as the mist lifts off the water. Your guide threads you past coconut groves, toddy tappers heading out for the morning harvest, and villages that only wake once the sun's fully up.",
    price: 900,
    duration: "2.5 hours",
    rating: 4.8,
    reviewCount: 41,
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=800&auto=format&fit=crop",
    location: "Alleppey",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Vinod P.", role: "Backwater kayak guide · 9 years", avatar: "https://i.pravatar.cc/150?img=59" },
    included: ["Two-person kayak & gear", "Life jacket & dry bag", "Guided canal route", "Fresh coconut water stop"],
    groupSize: "Up to 8 people (pairs)",
  },
  {
    id: "e10",
    name: "Bharatanatyam Dance Immersion",
    category: "Culture",
    description: "Learn the foundational adavus of Bharatanatyam from a trained classical dancer, then watch a short recital set to live nagaswaram music. The session closes with a short lesson in the mudras (hand gestures) used to tell stories through the form.",
    price: 750,
    duration: "2 hours",
    rating: 4.6,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1688820661462-a44e4b2770e8?q=80&w=800&auto=format&fit=crop",
    location: "Pondicherry",
    gallery: [
      "https://images.unsplash.com/photo-1630663129615-a2331ed88ab6?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    host: { name: "Revathi Krishnan", role: "Bharatanatyam dancer & teacher · 15 years", avatar: "https://i.pravatar.cc/150?img=38" },
    included: ["Basic adavu lesson", "Live recital", "Mudra storytelling session", "Traditional refreshments"],
    groupSize: "Up to 12 people",
  },
  {
    id: "e11",
    name: "Birdwatching Trail in the Western Ghats",
    category: "Nature",
    description: "A slow, early-morning walk through shola forest edge and coffee estate with a birder who can call in a Malabar trogon from fifty metres. Bring your own binoculars or borrow ours — expect hornbills, flycatchers, and if you're lucky, a Nilgiri wood-pigeon.",
    price: 700,
    duration: "3 hours",
    rating: 4.8,
    reviewCount: 33,
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=800&auto=format&fit=crop",
    location: "Coorg",
    gallery: [
      "https://images.unsplash.com/photo-1660294534711-75a9474fecb0?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Suresh Kumar", role: "Birding guide · Western Ghats specialist", avatar: "https://i.pravatar.cc/150?img=61" },
    included: ["Early-morning guided walk", "Binoculars (if needed)", "Bird checklist for the region", "Filter coffee at the estate"],
    groupSize: "Up to 8 people",
  },
  {
    id: "e12",
    name: "Golden Hour Tea Estate Shoot",
    category: "Photography",
    description: "Photograph rolling tea estates at first light with a local photographer who knows exactly which ridge catches the best mist. We shoot from three vantage points as pickers start their day, then review compositions together over breakfast.",
    price: 1300,
    duration: "3 hours",
    rating: 4.9,
    reviewCount: 18,
    image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=800&auto=format&fit=crop",
    location: "Munnar",
    gallery: [
      "https://images.unsplash.com/photo-1522747776116-64ee03be1dad?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    host: { name: "Nikhil Varma", role: "Landscape photographer · Munnar estates", avatar: "https://i.pravatar.cc/150?img=65" },
    included: ["Three-location shoot route", "Composition & light guidance", "Breakfast review session", "Estate access permit"],
    groupSize: "Up to 5 people",
  },
  {
    id: "e13",
    name: "Auroville Botanical Garden Nature Walk",
    category: "Nature",
    description: "A slow, guided walk through Auroville's native tree nursery and botanical garden with a naturalist who's spent years restoring this once-barren plateau into forest. You'll learn how the community regreened the land tree by tree, taste a few edible leaves along the way, and finish with herbal tea grown on site.",
    price: 450,
    duration: "1.5 hours",
    rating: 4.7,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop",
    location: "Auroville",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Meena Balasubramanian", role: "Naturalist guide · Auroville Botanical Garden, 6 years", avatar: "https://i.pravatar.cc/150?img=41" },
    included: ["Guided garden walk", "Native plant identification", "Herbal tea tasting", "Seed packet to take home"],
    groupSize: "Up to 15 people",
  },
  {
    id: "e14",
    name: "Sound Healing & Meditation Circle",
    category: "Wellness",
    description: "An evening sound bath with Tibetan and crystal singing bowls, followed by a guided breathwork and meditation session in an open-air dome. Lie back on a mat as layered tones wash over the space — many first-timers say it's the deepest rest they've had in months.",
    price: 700,
    duration: "1 hour",
    rating: 4.8,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    location: "Auroville",
    gallery: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    host: { name: "Devika Suresh", role: "Sound therapist & meditation facilitator · 5 years", avatar: "https://i.pravatar.cc/150?img=42" },
    included: ["Crystal bowl sound bath", "Guided breathwork", "Meditation cushion & blanket", "Herbal tea after session"],
    groupSize: "Up to 20 people",
  },
  {
    id: "e15",
    name: "Upcycled Craft & Bamboo Workshop",
    category: "Culture",
    description: "Learn traditional bamboo weaving from a craftsman whose family has worked with the material for generations. You'll strip and split bamboo by hand, weave a simple basket or tray, and take your finished piece home the same day.",
    price: 550,
    duration: "2 hours",
    rating: 4.6,
    reviewCount: 15,
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=800&auto=format&fit=crop",
    location: "Auroville",
    gallery: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    ],
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    host: { name: "Ravi Kannan", role: "Bamboo craftsman · Auroville workshop collective", avatar: "https://i.pravatar.cc/150?img=54" },
    included: ["Bamboo weaving basics", "All materials provided", "Finished piece to take home", "Light refreshments"],
    groupSize: "Up to 8 people",
  },
];

// ============================================
// BLOG POSTS
// ============================================

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "Why Tiny Houses Are the Future of Sustainable Travel", excerpt: "Discover how minimalist architecture is revolutionizing the hospitality industry and why travellers are choosing less over more.", category: "Architecture", author: "Dhyana Editorial", date: "2026-06-28", readTime: "6 min", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop", slug: "tiny-houses-future" },
  { id: "b2", title: "The Art of Farm-to-Table: A Journey Through South Indian Kitchens", excerpt: "From tamarind groves to coconut toddy, explore how India's farm stays are redefining culinary tourism.", category: "Food & Culture", author: "Priya Shankar", date: "2026-06-15", readTime: "8 min", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop", slug: "farm-to-table-south-india" },
  { id: "b3", title: "Designing for Peace: Architecture That Heals", excerpt: "How spatial design, natural materials, and biophilic principles create environments that actively promote wellness.", category: "Wellness", author: "Dr. Lakshmi Nair", date: "2026-05-30", readTime: "7 min", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop", slug: "architecture-that-heals" },
  { id: "b4", title: "Investing in Curated Stays: A New Asset Class", excerpt: "Why fractional hospitality investment is becoming the smartest alternative investment for millennials.", category: "Investment", author: "Dhyana Investment Team", date: "2026-05-15", readTime: "10 min", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1200&auto=format&fit=crop", slug: "investing-curated-stays" },
  {
    id: "b5",
    title: "Matrimandir Guide",
    excerpt: "The spiritual heart of Auroville — a golden sphere ringed by twelve gardens, and how to actually get inside.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-08-10",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
    slug: "matrimandir-guide",
    body: [
      "Known as the spiritual heart of Auroville, the Matrimandir is a massive golden metallic sphere surrounded by twelve beautifully manicured gardens, each built around a different human quality — sincerity, courage, generosity, and so on.",
      "The viewpoint is free and open to all, reached via a scenic 10–15 minute shaded walk from the Visitors Centre. It's the easiest way to take in the sphere's scale and the gardens around it.",
      "Entering the Inner Chamber for silent meditation is a separate, more involved step. You'll need to book a text or email pass several days in advance — plan this early if a meditation session inside is the priority of your visit, not an afterthought.",
    ],
  },
  {
    id: "b6",
    title: "SVARAM Sound Garden",
    excerpt: "An open-air musical park where every installation is built to be touched, played, and felt.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-08-05",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1688820661462-a44e4b2770e8?q=80&w=1200&auto=format&fit=crop",
    slug: "svaram-sound-garden",
    body: [
      "SVARAM's Sound Garden is an open-air, interactive musical park where you're encouraged to touch, play, and experiment with sound installations made from stone, wood, and bamboo — nothing here is behind glass.",
      "Step inside the tubular bells to feel their dual vibrations resonate through your whole body, or try the 'humming stones', tuned to generate calming, healing frequencies.",
      "Entrance runs roughly ₹150 to ₹300 per person, and it's an easy, playful way to spend an hour whether or not you're the musical type.",
    ],
  },
  {
    id: "b7",
    title: "Sound Therapy & Healing",
    excerpt: "Nada Yoga and individualized sound healing journeys at Auroville's SVARAM Atelier and Quiet Healing Centre.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-07-28",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
    slug: "sound-therapy-healing",
    body: [
      "Auroville is well known for its targeted sonic therapies. Spaces like the SVARAM Atelier offer Nada Yoga and individualized sound healing journeys built around acoustic vibration.",
      "Sessions use these vibrations to calm the nervous system — many guests describe it as the deepest rest they've had in months.",
      "Sound therapies aren't a walk-in experience: appointments need to be booked at least a week in advance, so build this into your itinerary early rather than trying to arrange it on arrival.",
    ],
  },
  {
    id: "b8",
    title: "Auroville Bamboo Centre",
    excerpt: "A vocational and research centre dedicated entirely to the many uses of bamboo, with hands-on workshops for visitors.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-07-20",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1200&auto=format&fit=crop",
    slug: "auroville-bamboo-centre",
    body: [
      "The Auroville Bamboo Centre is a holistic vocational and research centre dedicated to the diverse uses of bamboo — from construction to craft.",
      "They run regular experiential workshops, ranging from one-day geodesic dome builds to five-day hands-on construction courses, open to anyone curious about natural building.",
      "You don't have to sign up for a course to visit — the centre also sells locally crafted bamboo wares if you'd rather just browse and take a piece home.",
    ],
  },
  {
    id: "b9",
    title: "Auroville Earth Institute",
    excerpt: "A world-renowned centre for sustainable architecture, teaching how to build with Compressed Stabilized Earth Blocks.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-07-14",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
    slug: "auroville-earth-institute",
    body: [
      "The Auroville Earth Institute is a world-renowned facility specializing in sustainable architecture and eco-friendly building techniques.",
      "They teach how to build safe, low-carbon habitats using Compressed Stabilized Earth Blocks (CSEB) — a technique now used across India and beyond.",
      "The Institute frequently partners with the Bamboo Centre to run collective Earth & Bamboo workshops, a good option if you want to see both natural-building traditions in one visit.",
    ],
  },
  {
    id: "b10",
    title: "Auroville Visitors Centre",
    excerpt: "The essential first stop for any traveller arriving in Auroville — exhibitions, boutiques, cycle rentals, and your Matrimandir pass.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-07-08",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    slug: "auroville-visitors-centre",
    body: [
      "The Visitors Centre is the essential first stop for any traveller arriving in the community, and most first visits to Auroville start here.",
      "It features educational video screenings and detailed exhibitions outlining Auroville's history, alongside boutiques selling artisan handicrafts made within the community.",
      "It's also where you rent a cycle for the day and, importantly, where you collect your free Matrimandir viewpoint pass — worth doing first thing so the rest of your day isn't built around it.",
    ],
  },
  {
    id: "b11",
    title: "Tree Top Kafe",
    excerpt: "India's first elevated treehouse café, built carefully around the Mama Khaya tree with a sky deck 19 metres up.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-07-02",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
    slug: "tree-top-kafe",
    body: [
      "Built carefully around the spectacular Mama Khaya tree, the Tree Top Kafe is India's first elevated treehouse dining spot — an eco-conscious build that leaves the tree untouched.",
      "It has two levels to choose from: a main deck 13 metres high and a sky deck at 19 metres, both offering pristine, panoramic forest views.",
      "The menu leans fresh and organic — fruit bowls and local coffees are the highlights. There's a ₹300 cover charge per person, with ₹200 of it redeemable against your food bill.",
    ],
  },
  {
    id: "b12",
    title: "Sadhana Forest",
    excerpt: "An off-grid, zero-waste ecological community rewilding the region's indigenous Tropical Dry Evergreen Forest.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-06-25",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    slug: "sadhana-forest",
    body: [
      "Sadhana Forest is a vibrant ecological community focused on slow rewilding, water conservation, and replanting the region's indigenous Tropical Dry Evergreen Forest.",
      "It welcomes both eco-conscious day visitors and long-term volunteers who want to witness off-grid, zero-waste living up close, not just hear about it.",
      "The campus runs a completely vegan ecosystem, and there's a small, peaceful Tea Hut if you'd rather just sit with the quiet for a while before heading back.",
    ],
  },
  {
    id: "b13",
    title: "Solitude Farm & Cafe",
    excerpt: "A farm-to-table permaculture centre with free Saturday tours, weekend workshops, and thalis grown on-site.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-06-18",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop",
    slug: "solitude-farm-cafe",
    body: [
      "Solitude Farm & Cafe is a lively farm-to-table initiative and permaculture centre that champions local, organic food security.",
      "A free farm tour runs every Saturday, or you can sign up for a more intensive weekend permaculture workshop if you want to actually get your hands in the soil.",
      "The on-site cafe serves organic thalis made from what's harvested that day, alongside vegan smoothies and crisp millet dosas — a good lunch stop even if you skip the tour.",
    ],
  },
  {
    id: "b14",
    title: "Savitri Bhavan",
    excerpt: "A tranquil museum and library dedicated to the spiritual teachings of Sri Aurobindo and the Mother.",
    category: "Auroville Guide",
    author: "Dhyana Editorial",
    date: "2026-06-10",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    slug: "savitri-bhavan",
    body: [
      "Savitri Bhavan is a tranquil educational centre and museum focused on the core spiritual teachings of Sri Aurobindo and the Mother.",
      "The building itself is beautifully structured, housing a library, a silent meditation auditorium, and a gallery of ethereal paintings inspired by Sri Aurobindo's epic poem Savitri.",
      "It's one of the quieter stops in Auroville — worth building in unhurried time rather than treating it as a quick add-on to a busier day.",
    ],
  },
  {
    id: "b15",
    title: "French Quarter",
    excerpt: "Mustard-yellow colonial mansions, cascading bougainvillea, and cobblestone streets in Pondicherry's White Town.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-08-18",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    slug: "french-quarter",
    body: [
      "Pondicherry's French Quarter, still known locally as White Town, is where mustard-yellow colonial mansions sit behind cascading bougainvillea along quiet cobblestone streets.",
      "It's best explored on foot or bicycle — the lanes are narrow and walkable, and reward slow wandering far more than a fixed route ever would.",
      "Come for the European-meets-Tamil architecture and heritage photography, then let a café crawl through the Quarter's boutique coffee shops fill the rest of the afternoon.",
    ],
  },
  {
    id: "b16",
    title: "Paradise Beach",
    excerpt: "Golden sand and blue water reached only by a scenic ferry ride through the backwaters — rated 4.3 by 27K+ visitors.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-08-14",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    slug: "paradise-beach",
    body: [
      "Paradise Beach is reached only by a scenic ferry ride through the backwaters from Chunnambar Boat House — there's no road access, which keeps the golden sand and blue water noticeably less crowded than Pondicherry's town beaches.",
      "Rated 4.3 by over 27,000 visitors, it's a popular half-day trip built around beach volleyball and water sports rather than a quiet solo stretch of sand.",
      "Stick around into the evening for the upscale coastal dining near the boat house — most visitors pair the ferry crossing with a proper meal rather than rushing straight back.",
    ],
  },
  {
    id: "b17",
    title: "Sri Aurobindo Ashram",
    excerpt: "A world-renowned spiritual community founded in 1926, housing the peaceful Samadhi of Sri Aurobindo and The Mother.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-08-09",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    slug: "sri-aurobindo-ashram",
    body: [
      "Founded in 1926, the Sri Aurobindo Ashram is a world-renowned spiritual community built around the teachings of Sri Aurobindo and The Mother.",
      "At its heart is the Samadhi — the peaceful resting place of both — where visitors sit quietly among flowers rather than tour in the usual sense.",
      "Rated 4.4 by nearly 14,000 visitors, it's best suited to quiet meditation and spiritual reflection; the on-site shop also sells the Ashram's own publications if you want to read further afterward.",
    ],
  },
  {
    id: "b18",
    title: "Arulmigu Manakula Vinayagar Temple",
    excerpt: "An ancient Ganesha temple in White Town, famed for its vibrant wall paintings and a majestic golden chariot.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-08-04",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    slug: "arulmigu-manakula-vinayagar-temple",
    body: [
      "This ancient Ganesha temple in White Town is one of Pondicherry's most visited religious sites, rated 4.7 by close to 28,000 visitors.",
      "It's known for its vibrant, densely painted walls and a majestic golden chariot that's paraded through the streets during festivals.",
      "Morning prayers are the best time to visit, when the temple is at its most active — worth the detour for the architecture and cultural heritage even if you're just passing through White Town.",
    ],
  },
  {
    id: "b19",
    title: "Basilica of the Sacred Heart of Jesus",
    excerpt: "A 100-year-old Gothic revival church near the railway station, known for its brilliant stained-glass windows.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-07-30",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    slug: "basilica-of-the-sacred-heart-of-jesus",
    body: [
      "A century-old Gothic revival church on South Boulevard near the railway station, the Basilica of the Sacred Heart of Jesus is rated 4.6 by over 13,000 visitors.",
      "Its brilliant stained-glass windows are the highlight — the light through them changes the whole interior depending on the time of day you visit.",
      "It draws peace seekers and history buffs as much as regular worshippers, and is worth the detour for anyone who appreciates classic European ecclesiastical design.",
    ],
  },
  {
    id: "b20",
    title: "Pondicherry Museum",
    excerpt: "Bronze and stone statues from the Chola and Pallava eras, alongside artifacts from the ancient Roman trade site at Arikamedu.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-07-25",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=1200&auto=format&fit=crop",
    slug: "pondicherry-museum",
    body: [
      "The Pondicherry Museum in White Town holds a rare collection of bronze and stone statues from the Chola and Pallava eras, rated 4.1 by roughly 8,700 visitors.",
      "Its most distinctive holdings are artifacts recovered from Arikamedu, an ancient Roman trade site nearby — a reminder of just how far back Pondicherry's coastal trade history goes.",
      "It's a compact museum, best suited to history enthusiasts who want to understand the region's maritime past rather than a full afternoon activity.",
    ],
  },
  {
    id: "b21",
    title: "Promenade Beach",
    excerpt: "A 1.5-km beachfront lined with historic statues, including the Mahatma Gandhi Memorial — car-free every evening after 6 PM.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-07-20",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    slug: "promenade-beach",
    body: [
      "Promenade Beach — locally called Rock Beach — is a 1.5-km beachfront stretch lined with historic statues, including the prominent Mahatma Gandhi Memorial, rated 4.5 by nearly 44,000 visitors.",
      "The seafront road closes to vehicle traffic after 6:00 PM, turning the whole stretch into a pedestrian promenade for the evening.",
      "It's less a beach for swimming and more a place for a sunset stroll — come for the golden hour and stay for the street food stalls that set up along the road.",
    ],
  },
  {
    id: "b22",
    title: "Eden Beach",
    excerpt: "A Blue Flag-certified shoreline in Chinna Veerampattinam, known for clean sand and dramatic morning sunrises.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-07-15",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    slug: "eden-beach",
    body: [
      "Eden Beach holds the prestigious international Blue Flag certification, one of the clearest signs of how clean and well-managed its shoreline is, rated 4.6 by over 10,000 visitors.",
      "It sits a little further out in Chinna Veerampattinam, away from the town beaches, which keeps it noticeably quieter.",
      "Mornings here are the highlight — dramatic sunrises over a clean stretch of sand — and there's fresh seafood nearby if you stay through lunch.",
    ],
  },
  {
    id: "b23",
    title: "Auroville Day Trip",
    excerpt: "An experimental township for human unity and sustainable living, built around the golden-domed Matrimandir — an easy trip from Pondicherry.",
    category: "Pondicherry Guide",
    author: "Dhyana Editorial",
    date: "2026-07-10",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
    slug: "auroville-day-trip",
    body: [
      "Auroville, the experimental township dedicated to human unity and sustainable living, is an easy day trip from Pondicherry and centres around the spectacular golden-domed Matrimandir.",
      "It's less a single sight than an ongoing experiment in community living — come for wellness workshops, eco-architecture tours, and a look at how an international community actually organizes itself day to day.",
      "For a fuller visit — including where to stay and what else is nearby — it's worth treating Auroville as its own trip rather than a rushed half-day stop tacked onto Pondicherry.",
    ],
  },
];

// ============================================
// TESTIMONIALS
// ============================================

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Meera Krishnan", avatar: "https://i.pravatar.cc/150?img=35", location: "Mumbai", rating: 5, comment: "Dhyana Stays has completely changed how my family travels. Every property feels handpicked, authentic, and deeply connected to its surroundings. We've booked four stays in the last year.", stayName: "Stone Valley Farm Stay", category: "guest-stays", propertySlug: "stone-valley-farm-stay", helpfulCount: 24 },
  { id: "t2", name: "Aditya Rao", avatar: "https://i.pravatar.cc/150?img=18", location: "Bangalore", rating: 5, comment: "As an architect, I'm extremely particular about design. Dhyana's curated collection genuinely maintains a standard I rarely see on other platforms. The inspection process makes a real difference.", stayName: "The Glass Pavilion", category: "guest-stays", propertySlug: "glass-pavilion", helpfulCount: 19 },
  { id: "t3", name: "Sunita & Raj Malhotra", avatar: "https://i.pravatar.cc/150?img=36", location: "Delhi", rating: 5, comment: "We invested in a Dhyana property through their split investment model. The transparency in reporting and the quality of the operations team gives us complete confidence in our investment.", stayName: "the Split Investment Program", category: "investors", helpfulCount: 15 },
  { id: "t4", name: "Kabir Malhotra", avatar: "https://i.pravatar.cc/150?img=12", location: "Pune", rating: 5, comment: "The sunrise yoga session at Auroville was unlike anything I'd done before — quiet, unhurried, and led by someone who actually knew what she was doing. I've booked two more sessions since.", stayName: "Sunrise Yoga at Auroville", category: "experiences", experienceId: "e1", helpfulCount: 11 },
  { id: "t5", name: "Priya Nair", avatar: "https://i.pravatar.cc/150?img=47", location: "Kochi", rating: 4, comment: "Nila Wellness Retreat was exactly the reset I needed. The staff remembered my name by day two, the food was incredible, and the silence at night was the best part of the whole trip.", stayName: "Nila Wellness Retreat", category: "guest-stays", propertySlug: "nila-wellness-retreat", helpfulCount: 17 },
  { id: "t6", name: "Farhan Sheikh", avatar: "https://i.pravatar.cc/150?img=52", location: "Hyderabad", rating: 5, comment: "Joined the Joint Investment model on a new property last year and the quarterly reports have been detailed and on time, every time. This is the first hospitality investment I've made that felt genuinely transparent.", stayName: "the Joint Investment Program", category: "investors", helpfulCount: 9 },
  { id: "t7", name: "Ananya Iyer", avatar: "https://i.pravatar.cc/150?img=41", location: "Chennai", rating: 5, comment: "The farm-to-table cooking class at Stone Valley is worth booking on its own, even without staying the night. Chef Elena walked us through the kitchen garden before we cooked, so every ingredient had a story.", stayName: "Farm-to-Table Cooking Class", category: "experiences", experienceId: "e2", helpfulCount: 21 },
  { id: "t8", name: "Rohan & Divya Shah", avatar: "https://i.pravatar.cc/150?img=15", location: "Ahmedabad", rating: 5, comment: "Bamboo Nest completely won over our kids — treehouse living, real trails, zero screens. We're already planning our next trip back for the monsoon season.", stayName: "Bamboo Nest Eco Stay", category: "guest-stays", propertySlug: "bamboo-nest-eco-stay", helpfulCount: 13 },
  { id: "t9", name: "Devika Menon", avatar: "https://i.pravatar.cc/150?img=29", location: "Coimbatore", rating: 4, comment: "Heritage Courtyard Villa was full of small, thoughtful touches — handwritten welcome notes, local snacks, a host who actually sat down and told us the property's history over chai.", stayName: "Heritage Courtyard Villa", category: "guest-stays", propertySlug: "heritage-courtyard-villa", helpfulCount: 8 },
];

// Total guest stories/reviews collected across the platform — used by the
// testimonials carousel's trailing "N more guest stories" CTA card.
export const totalGuestStoryCount = 21;

// ============================================
// FAQ
// ============================================

export const faqItems: FAQItem[] = [
  { question: "What makes Dhyana Stays different from other booking platforms?", answer: "Every property on Dhyana Stays is personally inspected and scored across architecture, hospitality, sustainability, safety, and guest experience. We don't list every stay — we curate unforgettable experiences. Each property must pass a comprehensive quality inspection before being published.", category: "General" },
  { question: "How does the curated inspection process work?", answer: "Our expert inspectors evaluate every property across 7 categories: Architecture, Interior Design, Hospitality, Cleanliness, Sustainability, Safety, and Guest Experience. Properties scoring below 70/100 are not approved. Approved stays receive quality badges based on their scores.", category: "General" },
  { question: "What is the cancellation policy?", answer: "Cancellation policies vary by property. Most stays offer free cancellation up to 7-14 days before check-in. Each property's specific policy is clearly displayed on its listing page and during the booking process.", category: "Bookings" },
  { question: "How does the Split Investment model work?", answer: "Each curated hospitality project is divided into investment units. Investors purchase one or more units and receive proportional revenue share from bookings. Dhyana Stays handles all operations including design, construction, marketing, and guest management.", category: "Investment" },
  { question: "Can I list my property on Dhyana Stays?", answer: "Yes! Apply as a host through our platform. You'll need to complete KYC verification, submit property details and photos, and pass our Curated Stay Inspection. Only properties meeting our quality standards are published.", category: "Hosting" },
  { question: "What payment methods are accepted?", answer: "We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking, and Wallets. All payments are processed securely through Razorpay.", category: "Payments" },
  { question: "Do you offer experiences beyond accommodation?", answer: "Absolutely! Dhyana Stays offers curated local experiences including yoga sessions, cooking classes, farm tours, adventure activities, cycling tours, and more. You can add these during booking or book separately.", category: "Experiences" },
  { question: "Is there a loyalty program?", answer: "Yes! Our rewards program lets you earn points for bookings, reviews, referrals, and completing your profile. Points can be redeemed for discounts on future bookings. Premium membership offers additional benefits.", category: "Rewards" },
];

// ============================================
// STATS
// ============================================

export const platformStats = {
  totalStays: 312,
  totalGuests: 28400,
  totalDestinations: 45,
  averageRating: 4.82,
  sustainableStays: 187,
  countries: 1,
};

// ============================================
// NAVIGATION
// ============================================

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Experiences", href: "/experiences" },
  { label: "Business", href: "/business" },
];

// ============================================
// HOMEPAGE SERVICES HUB (tabbed section)
// ============================================

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  veg: boolean;
  pricePerPlate: number;
  serves: string;
  cooks: { name: string; avatar: string; specialty: string }[];
  story?: string;
}

export const foodMenu: FoodItem[] = [
  {
    id: "f1",
    name: "Chettinad Home Thali",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    cuisine: "South Indian",
    veg: true,
    pricePerPlate: 350,
    serves: "1 person",
    cooks: [
      { name: "Meena Akka", avatar: "https://i.pravatar.cc/150?img=47", specialty: "Chettinad" },
      { name: "Raju Anna", avatar: "https://i.pravatar.cc/150?img=59", specialty: "Village style" },
    ],
    story: "A recipe passed down four generations in Meena Akka's family — the same stone-ground spice mix her grandmother used in a Karaikudi kitchen.",
  },
  {
    id: "f2",
    name: "Farm Harvest Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    cuisine: "Organic · Farm to Table",
    veg: true,
    pricePerPlate: 420,
    serves: "1 person",
    cooks: [
      { name: "Chef Elena", avatar: "https://i.pravatar.cc/150?img=44", specialty: "Continental" },
      { name: "Priya Shankar", avatar: "https://i.pravatar.cc/150?img=25", specialty: "Farm cuisine" },
    ],
    story: "Whatever's ready in the Stone Valley kitchen garden that morning goes in the bowl — the menu genuinely changes with the harvest.",
  },
  {
    id: "f3",
    name: "Auroville Breakfast Basket",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
    cuisine: "Continental · Bakes",
    veg: true,
    pricePerPlate: 280,
    serves: "1 person",
    cooks: [
      { name: "Marc D", avatar: "https://i.pravatar.cc/150?img=13", specialty: "Sourdough & bakes" },
      { name: "Meena Akka", avatar: "https://i.pravatar.cc/150?img=47", specialty: "Filter coffee" },
    ],
    story: "Marc's sourdough starter has been alive since 2019 — baked fresh every morning in a wood-fired oven he built himself.",
  },
  {
    id: "f4",
    name: "Dum Biryani Pot (Family)",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    cuisine: "Hyderabadi",
    veg: false,
    pricePerPlate: 950,
    serves: "3–4 persons",
    cooks: [
      { name: "Raju Anna", avatar: "https://i.pravatar.cc/150?img=59", specialty: "Dum biryani" },
      { name: "Chef Imran", avatar: "https://i.pravatar.cc/150?img=68", specialty: "Nizami dishes" },
    ],
    story: "Sealed with dough and slow-cooked over embers for 40 minutes — Chef Imran trained under a Nizami kitchen in old Hyderabad.",
  },
  {
    id: "f5",
    name: "Kerala Sadya (Banana Leaf)",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80",
    cuisine: "Kerala · Traditional",
    veg: true,
    pricePerPlate: 380,
    serves: "1 person",
    cooks: [
      { name: "Lakshmi Warrier", avatar: "https://i.pravatar.cc/150?img=32", specialty: "Kerala sadya" },
      { name: "Chef Sudhakaran", avatar: "https://i.pravatar.cc/150?img=51", specialty: "Onam specials" },
    ],
    story: "A 12-dish feast served on a fresh banana leaf, the way Lakshmi's mother made it for every Onam back home in Palakkad.",
  },
  {
    id: "f6",
    name: "Goan Fish Curry & Rice",
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800&q=80",
    cuisine: "Goan · Coastal",
    veg: false,
    pricePerPlate: 480,
    serves: "1 person",
    cooks: [
      { name: "Fernando D'Souza", avatar: "https://i.pravatar.cc/150?img=15", specialty: "Goan seafood" },
    ],
    story: "Fernando buys the catch himself at the Malim jetty before sunrise — the curry never sees a freezer.",
  },
  {
    id: "f7",
    name: "Coorg Pandi Curry",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80",
    cuisine: "Coorg · Kodava",
    veg: false,
    pricePerPlate: 520,
    serves: "1 person",
    cooks: [
      { name: "Appachu Kalappa", avatar: "https://i.pravatar.cc/150?img=53", specialty: "Kodava cuisine" },
    ],
    story: "Made with kachampuli, the sour-smoked vinegar unique to Coorg — a Kodava wedding-feast recipe from Appachu's family.",
  },
  {
    id: "f8",
    name: "Ayurvedic Wellness Thali",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    cuisine: "Sattvic · Ayurvedic",
    veg: true,
    pricePerPlate: 340,
    serves: "1 person",
    cooks: [
      { name: "Dr. Anjali Menon", avatar: "https://i.pravatar.cc/150?img=48", specialty: "Ayurvedic diet planning" },
    ],
    story: "Balanced by an Ayurvedic doctor for your dosha, not just your taste buds — no onion, no garlic, cooked in cold-pressed coconut oil.",
  },
];

export interface EventPlanner {
  id: string;
  name: string;
  type: string;
  image: string;
  rating: number;
  eventsDone: number;
  startingPrice: number;
  tags: string[];
  description?: string;
  gallery?: string[];
  packages?: { name: string; price: number; guests: string; includes: string[] }[];
  brochures?: { title: string; note: string }[];
  testimonials?: { name: string; location: string; avatar: string; comment: string; eventType: string }[];
}

export const eventPlanners: EventPlanner[] = [
  {
    id: "ep1",
    name: "Saffron Knots",
    type: "Wedding Planners",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    rating: 4.9,
    eventsDone: 140,
    startingPrice: 150000,
    tags: ["Destination weddings", "Farm venues", "Decor & rituals"],
    description: "Saffron Knots has planned 140+ weddings across Dhyana's curated farm stays and heritage properties — from intimate courtyard ceremonies to four-day destination celebrations. Every plan covers venue styling, vendor coordination, and rituals, handled by a team that lives on-site through the whole event.",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    ],
    packages: [
      { name: "Intimate Ceremony", price: 150000, guests: "Up to 50 guests", includes: ["Venue styling & decor", "Day-of coordination", "Rituals setup"] },
      { name: "Classic Wedding", price: 350000, guests: "Up to 200 guests", includes: ["Full planning & vendor management", "Catering coordination", "Photography tie-up", "3-day decor build"] },
      { name: "Grand Destination", price: 750000, guests: "Up to 400 guests", includes: ["Multi-day itinerary", "Venue sourcing across regions", "Full vendor & guest logistics", "Dedicated on-site team"] },
    ],
    brochures: [
      { title: "Saffron Knots — Wedding Packages 2026", note: "Pricing, inclusions & timelines" },
      { title: "Saffron Knots — Portfolio Lookbook", note: "40 past weddings, styled by season" },
    ],
    testimonials: [
      { name: "Ritu & Karthik", location: "Chennai", avatar: "https://i.pravatar.cc/150?img=20", comment: "They handled everything — we just showed up. The farm venue styling looked exactly like the moodboard we'd sent, down to the flowers.", eventType: "Classic Wedding" },
      { name: "Meera Iyer", location: "Bangalore", avatar: "https://i.pravatar.cc/150?img=23", comment: "Our families are spread across three cities and Saffron Knots coordinated all the travel and stays too, not just the wedding day.", eventType: "Grand Destination" },
    ],
  },
  {
    id: "ep2",
    name: "Hushh Surprises",
    type: "Surprise Events",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    rating: 4.8,
    eventsDone: 320,
    startingPrice: 4500,
    tags: ["Proposals", "Birthdays", "Candlelight setups"],
    description: "320+ surprises pulled off without a single leak. Hushh Surprises specialises in proposal setups, surprise birthdays and candlelight dinners at Dhyana properties — booked secretly, built while you're both at dinner, ready by the time you walk back to the room.",
    gallery: [
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&q=80",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    ],
    packages: [
      { name: "Candlelight Proposal", price: 4500, guests: "For 2", includes: ["Private candlelight setup", "Photo of the moment", "1-hour hold on the space"] },
      { name: "Surprise Birthday", price: 12000, guests: "Up to 20 guests", includes: ["Decor & balloon styling", "Cake coordination", "Music & lighting"] },
      { name: "Full Celebration Takeover", price: 28000, guests: "Up to 50 guests", includes: ["Venue booking within the property", "Decor, catering & entertainment", "Dedicated event runner on the day"] },
    ],
    brochures: [
      { title: "Hushh Surprises — Setup Styles Guide", note: "12 themes, pricing per guest count" },
    ],
    testimonials: [
      { name: "Arjun Nair", location: "Kochi", avatar: "https://i.pravatar.cc/150?img=15", comment: "I was terrified she'd figure it out but the team snuck the whole setup in during our sunset walk. Perfect timing, zero stress.", eventType: "Candlelight Proposal" },
      { name: "Divya Sharma", location: "Pune", avatar: "https://i.pravatar.cc/150?img=29", comment: "Booked a surprise birthday for my dad's 60th — they matched the decor to his favourite football club colours without me even asking twice.", eventType: "Surprise Birthday" },
    ],
  },
  {
    id: "ep3",
    name: "Gather & Grow",
    type: "Retreat & Corporate",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    rating: 4.7,
    eventsDone: 95,
    startingPrice: 35000,
    tags: ["Team offsites", "Wellness retreats", "Workshops"],
    description: "Gather & Grow runs team offsites and wellness retreats at farm and heritage properties — half-day workshops to multi-day corporate retreats, with facilitation, catering and logistics handled end to end so HR teams don't have to chase five vendors.",
    gallery: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
      "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?w=800&q=80",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    ],
    packages: [
      { name: "Half-Day Offsite", price: 35000, guests: "Up to 20 people", includes: ["Workshop facilitation", "Meeting space setup", "Working lunch"] },
      { name: "Full Wellness Retreat", price: 85000, guests: "Up to 30 people", includes: ["2-day itinerary", "Yoga & mindfulness sessions", "All meals included", "Evening activities"] },
      { name: "Multi-Day Corporate Retreat", price: 180000, guests: "Up to 60 people", includes: ["3-day full logistics", "Facilitation & team activities", "Accommodation coordination", "Dedicated retreat manager"] },
    ],
    brochures: [
      { title: "Gather & Grow — Corporate Retreat Guide", note: "Formats, pricing & sample agendas" },
    ],
    testimonials: [
      { name: "Sandeep Rao", location: "HR Lead, Chennai", avatar: "https://i.pravatar.cc/150?img=33", comment: "First offsite where I didn't have to manage five different vendors myself. Gather & Grow ran the whole two days and the team feedback was the best we've had.", eventType: "Full Wellness Retreat" },
    ],
  },
];

export interface LocalEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  venue: string;
  price: number;
  spotsLeft: number;
  kind: string;
}

export const localEvents: LocalEvent[] = [
  {
    id: "le1",
    title: "Terracotta Pottery Workshop",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    date: "Sat, Jul 25",
    venue: "Auroville · 2.1 km",
    price: 850,
    spotsLeft: 6,
    kind: "Workshop",
  },
  {
    id: "le2",
    title: "Sunrise Beach Yoga Circle",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    date: "Sun, Jul 26",
    venue: "Serenity Beach · 4 km",
    price: 300,
    spotsLeft: 12,
    kind: "Wellness",
  },
  {
    id: "le3",
    title: "Full Moon Folk Concert",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    date: "Fri, Jul 31",
    venue: "Adishakti Theatre · 3.5 km",
    price: 600,
    spotsLeft: 30,
    kind: "Music",
  },
  {
    id: "le4",
    title: "Chettinad Cooking Class",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    date: "Wed, Jul 29",
    venue: "Stone Valley Farm · 1 km",
    price: 1200,
    spotsLeft: 4,
    kind: "Workshop",
  },
];

export interface RentalVehicle {
  id: string;
  name: string;
  type: string;
  image: string;
  pricePerDay: number;
  features: string[];
}

export const rentalVehicles: RentalVehicle[] = [
  {
    id: "rv1",
    name: "Vespa ZX 125",
    type: "Scooter",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    pricePerDay: 450,
    features: ["2 helmets", "Unlimited km", "Doorstep delivery"],
  },
  {
    id: "rv2",
    name: "Royal Enfield Classic 350",
    type: "Motorcycle",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    pricePerDay: 900,
    features: ["Touring ready", "Full tank", "24×7 assist"],
  },
  {
    id: "rv3",
    name: "Mahindra Thar 4×4",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    pricePerDay: 3200,
    features: ["Self-drive", "Insurance incl.", "Hill ready"],
  },
  {
    id: "rv4",
    name: "City Trail Bicycle",
    type: "Bicycle",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80",
    pricePerDay: 150,
    features: ["Helmet", "Lock & lights", "Free map"],
  },
];

export interface Hostel {
  id: string;
  name: string;
  location: string;
  image: string;
  bedPrice: number;
  rating: number;
  perks: string[];
}

export const hostels: Hostel[] = [
  {
    id: "h1",
    name: "Wander Nest Auroville",
    location: "Auroville, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    bedPrice: 499,
    rating: 4.6,
    perks: ["Female dorm", "Lockers", "Free Wi-Fi"],
  },
  {
    id: "h2",
    name: "Backpacker's Barn",
    location: "Kodaikanal, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    bedPrice: 449,
    rating: 4.5,
    perks: ["Bonfire nights", "Café", "Trek desk"],
  },
  {
    id: "h3",
    name: "The Common Room",
    location: "Pondicherry",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    bedPrice: 599,
    rating: 4.7,
    perks: ["Co-work space", "AC dorms", "Breakfast"],
  },
];
