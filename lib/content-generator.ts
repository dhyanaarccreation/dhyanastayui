// ============================================
// STAY CONTENT GENERATOR
// A reusable enrichment layer that derives display
// content (hero video, editorial story, curated
// experience tags, location guides) purely from a
// property's existing `category` and `location` —
// never hand-authored per property. Add a new stay
// to `properties` in mock-data.ts and it is fully
// enriched automatically; no UI component or content
// file needs to be touched.
//
// Swapping mock data for a real API later only means
// replacing `properties` in mock-data.ts (or the
// category/city maps below) with data fetched from a
// backend — `enrichProperty` and every consumer of it
// stay exactly the same.
// ============================================

import { experiences, type Property } from "./mock-data";

export interface CuratedExperienceTag {
  /** Stable id (slugified name) — always present, used as the "add to
   *  reservation" cart key regardless of whether a real listing backs it. */
  id: string;
  name: string;
  icon: string; // lucide-react icon name, resolved by the UI layer
  description: string;
  image: string;
  price: number;
  duration: string;
  included: string[];
  /** Set only when this tag's name exactly matches a real bookable listing
   *  in `experiences` — lets the UI show that listing's real video/host/
   *  description instead of the merely-generated ones. */
  experienceId?: string;
}

export interface LocationGuide {
  title: string;
  slug: string;
}

export interface StoryTimelineEntry {
  label: string;
  text: string;
}

export interface EnrichedProperty extends Property {
  heroVideo: string;
  generatedStory: string;
  curatedExperiences: CuratedExperienceTag[];
  blogRecommendations: LocationGuide[];
  storyTimeline: StoryTimelineEntry[];
}

// ------------------------------------------------
// 1. HERO VIDEO — by category
// ------------------------------------------------

const CATEGORY_HERO_VIDEOS: Record<string, string> = {
  "Tiny House": "https://assets.mixkit.co/videos/27017/27017-720.mp4",
  "Farm Stay": "https://assets.mixkit.co/videos/4075/4075-720.mp4",
  "Wellness Retreat": "https://assets.mixkit.co/videos/43733/43733-720.mp4",
  "Luxury Villa": "https://assets.mixkit.co/videos/4045/4045-720.mp4",
  "Eco Stay": "https://assets.mixkit.co/videos/529/529-720.mp4",
  "Heritage Home": "https://assets.mixkit.co/videos/17242/17242-720.mp4",
  "Beach House": "https://assets.mixkit.co/videos/5016/5016-720.mp4",
  "Adventure Camp": "https://assets.mixkit.co/videos/47311/47311-720.mp4",
};

// Shown for any category not yet mapped above — keeps the system safe for
// future stay categories without ever throwing or rendering nothing.
const DEFAULT_HERO_VIDEO = "https://assets.mixkit.co/videos/529/529-720.mp4";

export function getHeroVideo(category: string): string {
  return CATEGORY_HERO_VIDEOS[category] ?? DEFAULT_HERO_VIDEO;
}

// ------------------------------------------------
// 2. STORY — generated from name + category + location
// ------------------------------------------------

const CATEGORY_STORY_THEME: Record<string, string> = {
  "Tiny House": "those who've decided that less space means more life",
  "Farm Stay": "guests who want their holiday to smell like turned soil and woodsmoke",
  "Wellness Retreat": "anyone whose nervous system could use a long exhale",
  "Luxury Villa": "travellers who want the view to do most of the talking",
  "Eco Stay": "guests happy to trade a few conveniences for total quiet",
  "Heritage Home": "those drawn to old buildings with better stories than most new ones",
  "Beach House": "anyone who measures a good day by how close the sea got",
  "Adventure Camp": "guests who'd rather chase a sunrise than sleep through one",
};

const DEFAULT_STORY_THEME = "travellers looking for somewhere that isn't like everywhere else";

const CATEGORY_STORY_DETAILS: Record<string, string[]> = {
  "Tiny House": [
    "Every surface earns its place — a fold-down desk, a window seat for the first light, a kitchen sized for two hands and one pot.",
    "Mornings begin with birdsong through thin walls and end with stars visible from the bed, the whole structure barely bigger than the view it frames.",
    "Nothing here is wasted — not the light, not the timber, not the silence that settles in once the day's errands are done.",
  ],
  "Farm Stay": [
    "Breakfast comes from whatever was picked that morning, and afternoons drift between the fields, the kitchen, and a hammock that's seen better decades.",
    "The rhythm follows the land, not a clock — feeding times, harvest hours, a fire lit the moment the sun drops.",
    "Guests leave with dirt under their nails and a new opinion about where food actually comes from.",
  ],
  "Wellness Retreat": [
    "Days unfold slowly here — a stretch at sunrise, a treatment before lunch, silence whenever it's wanted and conversation whenever it isn't.",
    "The practitioners here trained for decades before they ever touched a guest, and it shows in how unhurried every session feels.",
    "Nothing about the schedule is rigid except the commitment to leaving you calmer than you arrived.",
  ],
  "Luxury Villa": [
    "Glass walls blur the line between the living room and the landscape, and the pool seems to spill straight into the hills beyond it.",
    "A private chef handles dinner while the light changes over the valley, and there is, deliberately, very little else to plan.",
    "Every detail was considered by an architect who clearly believes restraint is its own kind of luxury.",
  ],
  "Eco Stay": [
    "Power comes from the sun, water from the rain, and the nights are dark enough that the stars actually look like something.",
    "Built entirely by hand from bamboo and reclaimed wood, it asks very little of the land it sits on.",
    "There's no minibar here, just a stargazing deck and the kind of silence that takes a day or two to fully hear.",
  ],
  "Heritage Home": [
    "Hand-painted tiles and carved wooden columns survive from a life the house lived long before it became a stay.",
    "Restoration took years and hundreds of artisans, and the result feels less renovated than quietly continued.",
    "Every courtyard corner has a history the host is happy to tell over a slow cup of filter coffee.",
  ],
  "Beach House": [
    "Mornings start on sand still cool from the night, and evenings end on the same veranda watching the tide pull back out.",
    "Salt air moves straight through the open-plan rooms, and the walk to the water takes less time than making coffee.",
    "It was rebuilt plank by plank from what was already there, close enough to the shore to hear it from bed.",
  ],
  "Adventure Camp": [
    "Days start with a guided trek and end around the same fire, canvas walls the only thing between camp and the hills.",
    "It's deliberately simple — good trails, hot coffee, and guides who know this coffee estate better than most maps do.",
    "Nothing about it is fancy, which is exactly the point for the people who keep coming back.",
  ],
};

const DEFAULT_STORY_DETAILS = [
  "Every detail was chosen to suit the place it sits in rather than a catalogue of what a stay is supposed to have.",
  "It rewards the kind of traveller happy to slow down and let the surroundings set the pace of the day.",
  "There's little to do here on purpose — mostly good light, good quiet, and somewhere unhurried to be.",
];

const STORY_CLOSERS = [
  "It's the kind of place guests remember long after they've forgotten which hotel they stayed in the week before.",
  "Book it for a weekend and you'll likely find yourself planning the next trip back before you've even checked out.",
  "It's a small, deliberate world of its own — and it tends to stay with people well after they've left it.",
];

/** Small deterministic hash so the same stay always gets the same story variant, while different stays vary. */
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function generateStory(
  name: string,
  category: string,
  city: string,
  state?: string
): string {
  const theme = CATEGORY_STORY_THEME[category] ?? DEFAULT_STORY_THEME;
  const details = CATEGORY_STORY_DETAILS[category] ?? DEFAULT_STORY_DETAILS;

  const seed = hashString(`${name}-${category}-${city}`);
  const detail = details[seed % details.length];
  const closer = STORY_CLOSERS[Math.floor(seed / details.length) % STORY_CLOSERS.length];

  const place = state && state !== city ? `${city}, ${state}` : city;
  const opener = `${name} sits in ${place}, ${article(category)} ${category.toLowerCase()} built for ${theme}.`;

  return `${opener} ${detail} ${closer}`;
}

/**
 * A short 3-step story timeline for the "About This Stay" modal — composed
 * from the category theme already used above plus the property's own real
 * host/review fields, so it's never hand-authored per property and
 * is naturally different for every stay.
 */
export function getStoryTimeline(property: Property): StoryTimelineEntry[] {
  const theme = CATEGORY_STORY_THEME[property.category] ?? DEFAULT_STORY_THEME;
  return [
    { label: "Concept", text: `Designed for ${theme}.` },
    {
      label: property.host.since,
      text: `Opened by ${property.host.name}, welcoming guests ever since.`,
    },
    {
      label: "Today",
      text: `${property.reviewCount}+ guests have stayed here.`,
    },
  ];
}

// ------------------------------------------------
// 3. CURATED EXPERIENCES — by category
// ------------------------------------------------

// Small pool of verified cover photos, shared across categories by theme
// (e.g. one campfire photo works for both a farm bonfire and a beach
// bonfire) rather than sourcing a fully unique image per experience.
const EXPERIENCE_IMAGE_POOL = {
  pottery: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  yoga: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1200&auto=format&fit=crop",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
  cooking: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200&auto=format&fit=crop",
  kayak: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
  trek: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  bird: "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=1200&auto=format&fit=crop",
  natureWalk: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop",
  nightPhoto: "https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=1200&auto=format&fit=crop",
  goldenHour: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=1200&auto=format&fit=crop",
  heritage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  feast: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
  music: "https://images.unsplash.com/photo-1688820661462-a44e4b2770e8?q=80&w=1200&auto=format&fit=crop",
  poolVilla: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
  farmland: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
  cycling: "https://images.unsplash.com/photo-1681295692638-97ace05f56b4?q=80&w=1200&auto=format&fit=crop",
  surf: "https://images.unsplash.com/photo-1455279145601-37efa82b5c95?q=80&w=1200&auto=format&fit=crop",
  stars: "https://images.unsplash.com/photo-1742626157111-59f3f1019a8a?q=80&w=1200&auto=format&fit=crop",
  bonfire: "https://images.unsplash.com/photo-1758272960816-6126b6607596?q=80&w=1200&auto=format&fit=crop",
  tractor: "https://images.unsplash.com/photo-1761839257961-4dce65b72d99?q=80&w=1200&auto=format&fit=crop",
  cafe: "https://images.unsplash.com/photo-1701432936092-c854d7bc0f43?q=80&w=1200&auto=format&fit=crop",
  duck: "https://images.unsplash.com/photo-1670494264392-8bfb0200a775?q=80&w=1200&auto=format&fit=crop",
  seafood: "https://images.unsplash.com/photo-1650847821830-2c24e212213f?q=80&w=1200&auto=format&fit=crop",
  movieNight: "https://images.unsplash.com/photo-1649511125503-3b23dc239c96?q=80&w=1200&auto=format&fit=crop",
  farmField: "https://images.unsplash.com/photo-1699548891120-06abb3217cde?q=80&w=1200&auto=format&fit=crop",
  cocktail: "https://images.unsplash.com/photo-1638884896143-f1b2501e9a61?q=80&w=1200&auto=format&fit=crop",
  bbq: "https://images.unsplash.com/photo-1661773031258-9bd959928118?q=80&w=1200&auto=format&fit=crop",
} as const;

// A handful of tag names exactly match a real bookable listing (e.g. "Pottery
// Workshop" → experiences[e4]) — those borrow its real price/duration so the
// two never disagree. Every other tag still needs a price to be addable to a
// reservation, so one is derived deterministically from its name (stable
// across renders) rather than hand-typed for every one of ~50 generated tags.
const PRICE_TIERS: { price: number; duration: string }[] = [
  { price: 350, duration: "1 hr" },
  { price: 550, duration: "1.5 hrs" },
  { price: 800, duration: "2 hrs" },
  { price: 1200, duration: "3 hrs" },
  { price: 1800, duration: "Half day" },
];

function derivedPricing(name: string): { price: number; duration: string } {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PRICE_TIERS[hash % PRICE_TIERS.length];
}

// One concrete "what's included" line per icon, so a generated tag without a
// real matching listing still reads as a real, bookable experience instead
// of a bare description — same reasoning as `derivedPricing` above.
const INCLUDED_BY_ICON: Record<string, string> = {
  Palette: "Materials & glazing included",
  Bike: "Bike & helmet provided",
  Sunrise: "Mat & props provided",
  Music2: "Instruments/singing bowls provided",
  Coffee: "Tastings included",
  Sprout: "Tools & gloves provided",
  Bird: "Binoculars provided",
  Flame: "Ingredients & firewood included",
  Sparkles: "All treatment products included",
  Wind: "Cushions & blankets provided",
  TreePine: "Trail snacks included",
  UtensilsCrossed: "Full course menu included",
  ChefHat: "Ingredients & recipe card included",
  GlassWater: "Tasting flight included",
  Hammer: "Tools & materials provided",
  CookingPot: "Ingredients included",
  Moon: "Telescope provided",
  Mountain: "Trekking gear provided",
  Landmark: "Guided commentary included",
  Utensils: "Tastings included",
  BookOpen: "Light refreshments included",
  Waves: "Board & gear provided",
  Fish: "Tastings included",
  Croissant: "Tastings included",
  Camera: "Camera tips & guidance included",
  Footprints: "Local host guide included",
  Sun: "Warm drinks included",
  ShoppingBag: "Local recommendations included",
};

function derivedIncluded(icon: string): string[] {
  return [INCLUDED_BY_ICON[icon] ?? "Guided by your host", "Beginner-friendly, no experience needed"];
}

function exp(
  name: string,
  icon: string,
  description: string,
  image: keyof typeof EXPERIENCE_IMAGE_POOL
): CuratedExperienceTag {
  const realMatch = experiences.find((e) => e.name === name);
  const pricing = realMatch ? { price: realMatch.price, duration: realMatch.duration } : derivedPricing(name);
  return {
    id: slugify(name),
    name,
    icon,
    description,
    image: EXPERIENCE_IMAGE_POOL[image],
    experienceId: realMatch?.id,
    included: realMatch?.included ?? derivedIncluded(icon),
    ...pricing,
  };
}

const CATEGORY_EXPERIENCES: Record<string, CuratedExperienceTag[]> = {
  "Tiny House": [
    exp("Pottery Workshop", "Palette", "Shape clay on a wheel with a local potter in a quiet studio.", "pottery"),
    exp("Sunrise Cycling", "Bike", "Ride quiet forest trails around the property as the light comes up.", "cycling"),
    exp("Morning Yoga", "Sunrise", "A slow, breath-led session on a wooden deck framed by trees.", "yoga"),
    exp("Sound Healing", "Music2", "A Tibetan singing-bowl session that settles the nervous system.", "spa"),
    exp("Auroville Café Trail", "Coffee", "A walking tour of the best hidden cafés and bakeries nearby.", "cafe"),
    exp("Organic Farm Walk", "Sprout", "Wander a working organic farm and taste what's in season.", "farmland"),
  ],
  "Farm Stay": [
    exp("Duck Feeding", "Bird", "Feed the resident ducks at the farm pond, a favourite with kids.", "duck"),
    exp("Tractor Ride", "Sprout", "A bumpy, joyful tractor ride around the fields and orchard.", "tractor"),
    exp("Bonfire Dinner", "Flame", "Dinner cooked over an open fire under the stars.", "bonfire"),
    exp("Village Breakfast", "Coffee", "A home-cooked breakfast with a local family using farm produce.", "cooking"),
    exp("Fruit Picking", "Sprout", "Pick seasonal fruit straight from the trees with the farm team.", "farmField"),
    exp("Organic Farming", "Sprout", "Get hands-on planting and weeding in the organic vegetable beds.", "natureWalk"),
  ],
  "Wellness Retreat": [
    exp("Sound Healing", "Music2", "A Tibetan singing-bowl session under open skies that settles the nervous system.", "stars"),
    exp("Ayurveda Massage", "Sparkles", "A traditional Kerala Ayurvedic massage using warm medicated oils.", "spa"),
    exp("Yoga Flow", "Sunrise", "A dynamic vinyasa flow session on the riverside deck.", "yoga"),
    exp("Meditation", "Wind", "Guided silent meditation among the property's gardens.", "natureWalk"),
    exp("Herbal Tea Ceremony", "Coffee", "A quiet herbal tea ceremony using herbs grown on the property.", "cafe"),
    exp("Forest Walk", "TreePine", "A slow guided walk through the surrounding forest and gardens.", "bird"),
  ],
  "Luxury Villa": [
    exp("Private Infinity Pool Dinner", "UtensilsCrossed", "A private candlelit dinner served poolside as the hills fade into dusk.", "poolVilla"),
    exp("Private Chef Experience", "ChefHat", "A personal chef designs and cooks a multi-course menu just for you.", "cooking"),
    exp("In-Villa Spa", "Sparkles", "A therapist brings the full spa treatment straight to your villa.", "spa"),
    exp("Wine Tasting", "GlassWater", "A guided tasting flight of Indian and imported wines on the terrace.", "cocktail"),
    exp("BBQ Night", "Flame", "A live grill station and BBQ spread under the open sky.", "bbq"),
    exp("Movie Under the Stars", "Sparkles", "A private outdoor screening with blankets, popcorn and the night sky.", "movieNight"),
  ],
  "Eco Stay": [
    exp("Nature Trail", "TreePine", "A guided trail through the property's forest and stream.", "natureWalk"),
    exp("Bird Watching", "Bird", "An early walk spotting hornbills, flycatchers and the odd trogon.", "bird"),
    exp("Bamboo Workshop", "Hammer", "Learn how the property's bamboo cabins are hand-built and joined.", "pottery"),
    exp("Organic Cooking", "CookingPot", "Cook a simple organic meal using produce from the on-site garden.", "cooking"),
    exp("Stargazing", "Moon", "Telescope stargazing from the property's dark-sky deck.", "stars"),
    exp("Forest Trek", "Mountain", "A half-day trek through shola forest with a naturalist guide.", "trek"),
  ],
  "Heritage Home": [
    exp("Heritage Walk", "Landmark", "A guided walk through the property's original architecture and courtyards.", "heritage"),
    exp("Traditional Cooking", "CookingPot", "Cook a traditional regional meal using recipes passed down through generations.", "feast"),
    exp("Local Food Tour", "Utensils", "A tasting tour of the town's best local eateries and street food.", "seafood"),
    exp("Handloom Workshop", "Hammer", "Watch and try your hand at traditional handloom weaving.", "music"),
    exp("Pottery Workshop", "Palette", "Shape clay on a wheel with a local potter, a regional tradition.", "pottery"),
    exp("Storytelling Evening", "BookOpen", "An evening of folk stories and legends around a lantern-lit courtyard.", "bonfire"),
  ],
  "Beach House": [
    exp("Surfing Lessons", "Waves", "A beginner-friendly surf lesson with a local instructor and board included.", "surf"),
    exp("Kayaking", "Waves", "Paddle a two-person kayak along the calm morning coastline.", "kayak"),
    exp("Beach Bonfire", "Flame", "An evening bonfire on the sand with music and grilled snacks.", "bonfire"),
    exp("Seafood Trail", "Fish", "Sample the best seafood shacks along the coast with a local guide.", "seafood"),
    exp("French Café Walk", "Croissant", "A walking tour of the French Quarter's best cafés and bakeries.", "cafe"),
    exp("Sunrise Photography Walk", "Camera", "Photograph the coastline at first light with a local photographer.", "goldenHour"),
  ],
  "Adventure Camp": [
    exp("Guided Sunrise Trek", "Mountain", "A guided trek up to a ridge viewpoint timed for sunrise.", "trek"),
    exp("Campfire Storytelling", "Flame", "Stories and songs around the nightly campfire.", "bonfire"),
    exp("Night Photography Safari", "Camera", "Shoot the Milky Way and nocturnal wildlife with a guide.", "nightPhoto"),
    exp("Birdwatching Trail", "Bird", "An early walk through the coffee estate spotting hornbills and flycatchers.", "bird"),
    exp("Coffee Estate Walk", "Coffee", "A walk through the working coffee estate with tastings along the way.", "cafe"),
    exp("Stargazing Night", "Moon", "Telescope stargazing from camp, far from any light pollution.", "stars"),
  ],
};

const DEFAULT_EXPERIENCES: CuratedExperienceTag[] = [
  exp("Local Walking Tour", "Footprints", "A guided walk through the neighbourhood with a local host.", "natureWalk"),
  exp("Sunset Viewing", "Sun", "A quiet spot to watch the sunset with a warm drink.", "goldenHour"),
  exp("Home-Cooked Meal", "CookingPot", "A home-style meal cooked with local, seasonal ingredients.", "cooking"),
  exp("Photography Walk", "Camera", "A guided walk to the best photo spots nearby.", "nightPhoto"),
  exp("Stargazing", "Moon", "A relaxed evening spotting stars away from city lights.", "stars"),
  exp("Local Market Visit", "ShoppingBag", "Browse a nearby local market with a host who knows every stall.", "cafe"),
];

export function getCuratedExperiences(category: string): CuratedExperienceTag[] {
  return CATEGORY_EXPERIENCES[category] ?? DEFAULT_EXPERIENCES;
}

// ------------------------------------------------
// 4. BLOG RECOMMENDATIONS — by location (city)
// ------------------------------------------------

const CITY_BLOG_GUIDES: Record<string, string[]> = {
  Auroville: [
    "Hidden Cafes",
    "Matrimandir Guide",
    "Cycling Routes",
    "SVARAM Sound Garden",
    "Sound Therapy & Healing",
    "Auroville Bamboo Centre",
    "Auroville Earth Institute",
    "Auroville Visitors Centre",
    "Tree Top Kafe",
    "Sadhana Forest",
    "Solitude Farm & Cafe",
    "Savitri Bhavan",
  ],
  Pondicherry: [
    "French Quarter",
    "Paradise Beach",
    "Weekend Guide",
    "Sri Aurobindo Ashram",
    "Arulmigu Manakula Vinayagar Temple",
    "Basilica of the Sacred Heart of Jesus",
    "Pondicherry Museum",
    "Promenade Beach",
    "Eden Beach",
    "Auroville Day Trip",
  ],
  Coorg: ["Coffee Estate Guide", "Waterfalls", "Local Cuisine"],
  Kodaikanal: ["Lake Walks & Boating", "Best Viewpoints", "Homestay Food Trail"],
  Palakkad: ["Ayurveda 101", "Nila River Guide", "Temple Trail"],
  Wayanad: ["Wildlife Sanctuary Guide", "Tea & Spice Trail", "Trekking Routes"],
  Munnar: ["Tea Estate Guide", "Best Sunrise Points", "Waterfall Trail"],
  Karaikudi: ["Chettinad Mansion Trail", "Antique Shopping Guide", "Local Food Guide"],
  Goa: ["Beach Shack Guide", "Sunset Points", "Flea Market Guide"],
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Any city without a hand-tuned guide list still gets three sensible, on-brand guides. */
function defaultGuides(city: string): string[] {
  return [`Hidden Gems of ${city}`, `${city} Travel Guide`, `Best Time to Visit ${city}`];
}

export function getBlogRecommendations(city: string): LocationGuide[] {
  const titles = CITY_BLOG_GUIDES[city] ?? defaultGuides(city);
  return titles.map((title) => ({ title, slug: slugify(title) }));
}

// ------------------------------------------------
// ENRICHMENT — composes all of the above for one property
// ------------------------------------------------

export function enrichProperty(property: Property): EnrichedProperty {
  return {
    ...property,
    heroVideo: getHeroVideo(property.category),
    generatedStory: generateStory(
      property.name,
      property.category,
      property.location.city,
      property.location.state
    ),
    curatedExperiences: getCuratedExperiences(property.category),
    blogRecommendations: getBlogRecommendations(property.location.city),
    storyTimeline: getStoryTimeline(property),
  };
}

// ------------------------------------------------
// 5. MEDIA REEL — tabbed cards for the Stay Details hero.
// There is only one real video asset per category today
// (`heroVideo` above), so every "video" card below reuses
// that same real file across varied real property photos
// rather than inventing new external URLs. Swap in a real
// per-clip video list later by setting `videoSrc` per item —
// every consumer of `StayReelTab`/`StayReelItem` stays the same.
// ------------------------------------------------

export interface StayReelItem {
  id: string;
  title: string;
  caption?: string;
  thumbnail: string;
  /** Present only when a real, playable local video asset backs this card. */
  videoSrc?: string;
  /** Present only when a real YouTube video (watch/share link) backs this
   *  card — takes priority over `videoSrc` and embeds inline via `lib/youtube`. */
  youtubeUrl?: string;
}

export interface StayReelTab {
  key: string;
  label: string;
  items: StayReelItem[];
}

const FOOD_ICONS = new Set([
  "Coffee",
  "CookingPot",
  "ChefHat",
  "Utensils",
  "UtensilsCrossed",
  "Fish",
  "Croissant",
]);

/** Derives the tabbed media reel for a stay from data that already exists on
 *  the property — real photos, the real per-category hero video, and real
 *  curated-experience content — never hand-authored per property. */
export function getStayReel(property: Property, enriched: EnrichedProperty): StayReelTab[] {
  const photos = property.galleryImages.length ? property.galleryImages : property.images;
  const video = enriched.heroVideo;
  const pick = (i: number) => photos[i % photos.length];

  const withVideo = (titles: string[]): StayReelItem[] =>
    titles.map((title, i) => ({ id: `${title}-${i}`, title, thumbnail: pick(i), videoSrc: video }));

  const houseTourTitles = property.highlights.length
    ? property.highlights.slice(0, 5)
    : ["Living Space", "Bedroom", "Kitchen", "Outdoor Deck"];

  const aroundTitles = property.amenities.length
    ? property.amenities.slice(0, 5)
    : ["Garden", "Common Areas", "Nearby Trails"];

  const foodExperiences = enriched.curatedExperiences.filter((e) => FOOD_ICONS.has(e.icon));
  const foodTitles = foodExperiences.length
    ? foodExperiences.map((e) => e.name)
    : ["Morning Coffee", "Local Flavours", "Dining Deck"];

  return [
    { key: "overview", label: "Overview", items: withVideo(["Full Walkthrough", "First Look", "Property Overview", "Arrival"]) },
    { key: "house-tour", label: "House Tour", items: withVideo(houseTourTitles) },
    { key: "around-the-stay", label: "Around the Stay", items: withVideo(aroundTitles) },
    {
      key: "experiences",
      label: "Experiences",
      items: enriched.curatedExperiences.map((e, i) => ({
        id: `exp-${i}`,
        title: e.name,
        caption: e.description,
        thumbnail: e.image,
      })),
    },
    { key: "food", label: "Food & Dining", items: withVideo(foodTitles) },
    { key: "morning", label: "Morning", items: withVideo(["Sunrise", "Morning Light", "Breakfast Hour"]) },
    { key: "evening", label: "Evening", items: withVideo(["Golden Hour", "Sunset", "Night Sky"]) },
  ];
}

// ------------------------------------------------
// 6. STAY ROOMS — "Choose Your Space" selector cards.
// The platform has no per-room booking entity today (a stay is booked as a
// single whole, one price, one Reserve action) — these are illustrative
// space cards only, built from the property's own photos and maxGuests.
// `price` is a fixed per-room demo figure that DOES drive the Reserve
// card's displayed price (see StayMediaExperience's selectedRoom state) —
// booking itself still proceeds as a single whole-property reservation.
// ------------------------------------------------

export interface StayRoom {
  id: string;
  name: string;
  category: "Rooms" | "Suites" | "Private Spaces";
  guests: number;
  bedType: string;
  image: string;
  price: number;
}

const ROOM_TEMPLATES: { name: string; category: StayRoom["category"]; price: number }[] = [
  { name: "Garden Room", category: "Rooms", price: 3500 },
  { name: "Forest Room", category: "Rooms", price: 4000 },
  { name: "Loft Suite", category: "Suites", price: 5000 },
  { name: "Pool Suite", category: "Private Spaces", price: 6500 },
];

const ROOM_GUEST_STEPS = [2, 2, 3, 4];

export function getStayRooms(property: Property): StayRoom[] {
  const photos = property.galleryImages.length ? property.galleryImages : property.images;
  return ROOM_TEMPLATES.map((template, i) => ({
    id: `${property.id}-space-${i}`,
    name: template.name,
    category: template.category,
    guests: Math.min(property.maxGuests, ROOM_GUEST_STEPS[i]),
    bedType: "1 King Bed",
    image: photos[i % photos.length],
    price: template.price,
  }));
}
