# Dhyana Stays — Business Section (portable export)

Everything needed to lift the **Business** nav section (`/business`) into another Next.js project.
Source: `dhyanastayui` repo, exported 2026-09-25. All code below is copied verbatim from the working tree.

## What the section is

| # | Route | Source file | Notes |
|---|-------|-------------|-------|
| 1 | `/business` | `app/(public)/business/page.tsx` | Hub: hero, 5 tabs (Host & List / Invest / Consultancy / Influencers / Careers), rolling ads carousel, rule-based chatbot, embeds ContactSection |
| 2 | `/business/apply-influencer` | `app/(public)/business/apply-influencer/page.tsx` | Influencer application flow, linked from the Influencers tab and chatbot |
| 3 | (component) | `app/components/ContactSection.tsx` | Contact block embedded at the bottom of `/business` |
| 4 | (styles) | `app/globals.css` (extract) | Theme tokens + custom classes the pages rely on |

The navbar itself has **no Business-specific code** — it renders `navLinks` from `lib/mock-data.ts`, where Business is just one entry:

```ts
export const navLinks = [
  { label: "Explore Stay", href: "/" },
  { label: "Experiences", href: "/experiences" },
  { label: "Business", href: "/business" },
];
```

## Requirements in the target project

- Next.js App Router (source project: `next 16.2.10`, `react 19.2.4`)
- Tailwind CSS **v4** (`tailwindcss` + `@tailwindcss/postcss`) — the pages use theme-token classes (`bg-primary`, `text-muted`, `bg-surface`, …) defined through `@theme inline`, so v3 will not work as-is
- `lucide-react` (`npm i lucide-react`)
- Path alias `@/*` → project root (ContactSection is imported as `@/app/components/ContactSection`)

## Setup steps

1. **CSS** — add the block in section A to your global stylesheet. If you already have `@import "tailwindcss";`, don't duplicate it. If your project already defines tokens with the same names, merge instead of overwriting.
2. **Fonts** — section B: load Inter + Playfair Display in the root layout with the exact CSS variable names `--font-inter` / `--font-playfair` (headings use `.heading-display`, which reads `--font-playfair`).
3. **Dark mode (optional)** — tokens switch on a `.dark` class on `<html>` (the source app uses `next-themes` with `attribute="class"`). Without it, the light theme is used.
4. **Files** — create the three files in sections C, D, E at the paths shown (or adjust paths and the ContactSection import).
5. **Nav link** — point your navbar's Business item at `/business`.
6. **Retarget outbound links** — the CTAs point at routes that live in the source app, outside this section. Recreate them or change the `href`s:
   `/become-a-host`, `/consultancy/architecture`, `/consultancy/hospitality`, `/careers`, `/contact`
   (the chatbot answers in `business/page.tsx` reuse the same hrefs).

Content is all hard-coded in the page files (tab cards, investment models, tiers, rolling-ad copy + Unsplash image URLs, chatbot answers) — no API, no `lib/` imports, no shared context. The ad images are remote Unsplash URLs loaded with plain `<img>`, so no `next.config` image domains are needed.

---

## A. CSS — add to your global stylesheet

Extracted from `app/globals.css` (tokens, dark theme, base body, and the custom classes the section uses: `.scrollbar-hide`, `.heading-display`, `.animate-fade-in` / `.animate-fade-in-up` / `.stagger-children`, `.card-hover`, `.shadow-organic`).

```css
@import "tailwindcss";

/* ============================================
   DHYANA STAYS — Design System Tokens
   Premium Hospitality Theme (Light & Dark)
   ============================================ */

@theme inline {
  --color-background: var(--color-bg-primary);
  --color-surface: var(--color-bg-secondary);
  --color-surface-hover: var(--color-bg-tertiary);
  --color-border: var(--color-border);
  --color-border-subtle: var(--color-border-subtle);

  --color-foreground: var(--color-text-primary);
  --color-muted: var(--color-text-secondary);
  --color-subtle: var(--color-text-tertiary);

  --color-primary: var(--color-gold);
  --color-primary-hover: var(--color-gold-dark);
  --color-primary-dark: var(--color-gold-dark);
  --color-primary-foreground: #FFFFFF; /* Organic Minimalism: white text on the creamy-green CTA */

  --color-sage: var(--color-sage-base);
  --color-terracotta: var(--color-terracotta-base);

  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);

  /* Soft 3D Surface system — see tokens below (also exposed as
     rounded-card / rounded-panel Tailwind utilities) */
  --radius-card: var(--radius-card);
  --radius-panel: var(--radius-panel);

  /* Premium immersive-image card radius (destination/property/experience/
     curator cards) — see .ImageCard system, app/components/cards/ImageCard.tsx */
  --radius-card-lg: var(--radius-card-lg);
}

:root {
  /* LIGHT MODE — soft neutral gray page canvas; white cards float on top,
     separated by their own border + shadow (see .ImageCard etc.) */
  --color-bg-primary: #F0F0F0;   /* Page background */
  --color-bg-secondary: #FFFFFF; /* Cards — pure white, pops against the page */
  --color-bg-tertiary: #F5F4F2;  /* Hover / alt bands — barely-there neutral, no longer beige */

  --color-border: #ECECEC;
  --color-border-subtle: #F0EFED;
  --color-border-light: #DCDCDC; /* Light Gray */

  --color-text-primary: #2B2B2B;   /* Dark Charcoal */
  --color-text-secondary: #686868; /* Soft Gray — darkened from #777777 for WCAG AA contrast (4.5:1+) */
  --color-text-tertiary: #6D685D;  /* darkened from #9A958A for WCAG AA contrast (4.5:1+) */

  /* Forest Green — primary CTA (token keeps its legacy "gold" name) */
  --color-gold: #2E6F40;
  --color-gold-light: #DDEDE2;
  --color-gold-dark: #235430; /* hover — a shade darker, per spec */

  /* Forest Green accent + warm rust alert tone */
  --color-sage-base: #4E6E58;
  --color-terracotta-base: #C0503A;

  /* ---- Soft 3D Surface system ----
     One shared depth language for every card/pill/panel on the site:
     clean white surfaces, a barely-there border, and a soft, realistic
     multi-layer shadow instead of a single flat one. Components should
     reach for --shadow-soft/--shadow-hover (or the .soft-3d-surface /
     .soft-3d-pill classes) rather than inventing their own shadow values. */
  --surface: var(--color-bg-secondary);
  --surface-border: rgba(30, 30, 30, 0.07);

  --shadow-soft:
    0 2px 5px rgba(0, 0, 0, 0.04),
    0 8px 20px rgba(0, 0, 0, 0.06),
    0 18px 35px rgba(0, 0, 0, 0.04);
  --shadow-hover:
    0 4px 8px rgba(0, 0, 0, 0.05),
    0 12px 26px rgba(0, 0, 0, 0.08),
    0 22px 40px rgba(0, 0, 0, 0.05);

  /* Lighter variant for small pills/buttons */
  --shadow-soft-pill:
    0 2px 5px rgba(0, 0, 0, 0.04),
    0 6px 14px rgba(0, 0, 0, 0.05);
  --shadow-hover-pill:
    0 4px 8px rgba(0, 0, 0, 0.05),
    0 8px 18px rgba(0, 0, 0, 0.07);

  --radius-card: 18px;
  --radius-panel: 20px;
  --radius-card-lg: 34px;

  /* Property cards specifically want more visible depth than the general
     --shadow-soft/--shadow-hover pair used for navbar/search/pills — a
     tighter dark core directly under the card plus a wider soft falloff,
     not just one layer. Scoped to its own tokens so nothing else that
     already uses --shadow-soft/--shadow-hover changes. */
  --shadow-card:
    0 2px 3px rgba(0, 0, 0, 0.04),
    0 6px 10px rgba(0, 0, 0, 0.06),
    0 14px 24px rgba(0, 0, 0, 0.08),
    0 24px 40px rgba(0, 0, 0, 0.05);
  --shadow-card-hover:
    0 3px 5px rgba(0, 0, 0, 0.05),
    0 9px 15px rgba(0, 0, 0, 0.07),
    0 18px 30px rgba(0, 0, 0, 0.10),
    0 28px 45px rgba(0, 0, 0, 0.06);

  /* Double-layer 3D — a visible second physical edge behind the main
     surface (not just a shadow). Scoped to its own tokens; only used by
     .soft-3d-double, applied to the 4 hero-area surfaces (spotlight card,
     main search bar, explore-stays search/location controls, AI Planner
     button) — not property cards or anything else. */
  --shadow-double:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 18px 28px rgba(0, 0, 0, 0.08);
  --soft-3d-double-border: rgba(35, 35, 35, 0.10);
  --soft-3d-double-layer-border: rgba(35, 35, 35, 0.07);
  --soft-3d-double-layer-bg: rgba(255, 255, 255, 0.75);
  --soft-3d-double-cast: rgba(0, 0, 0, 0.10);
}

.dark {
  /* DARK MODE — same organic, warm palette at night (no cold blue/black) */
  --color-bg-primary: #21190F;   /* Warm dark charcoal-brown */
  --color-bg-secondary: #2B2118; /* Floating surface */
  --color-bg-tertiary: #34281C;  /* Hover elevation */

  --color-border: #3D2F22;
  --color-border-subtle: #2B2118;
  --color-border-light: #4A3A2A;

  --color-text-primary: #F6F1E8;   /* Cream */
  --color-text-secondary: #B7AFA0; /* Warm muted gray */
  --color-text-tertiary: #999084;  /* lightened from #8A8175 for WCAG AA contrast (4.5:1+) */

  /* Forest Green — primary CTA, same tone reads well on dark surfaces too */
  --color-gold: #2E6F40;
  --color-gold-light: #DDEDE2;
  --color-gold-dark: #235430;

  /* Forest Green accent + warm rust alert tone */
  --color-sage-base: #6E9478;
  --color-terracotta-base: #D97057;

  /* Soft 3D Surface system — dark mode: borders recede to transparent,
     depth comes entirely from a larger, darker ambient shadow instead
     (matches the existing .card-hover/.shadow-organic dark treatment). */
  --surface-border: transparent;
  --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.3);
  --shadow-hover: 0 16px 40px rgba(0, 0, 0, 0.35);
  --shadow-soft-pill: 0 8px 20px rgba(0, 0, 0, 0.28);
  --shadow-hover-pill: 0 12px 28px rgba(0, 0, 0, 0.32);
  --shadow-card: 0 14px 36px rgba(0, 0, 0, 0.35);
  --shadow-card-hover: 0 20px 48px rgba(0, 0, 0, 0.4);

  /* Double-layer 3D — dark mode: the second edge becomes a faint light
     hairline instead of a white layer, cast shadow deepens instead of
     relying on a border to read as physical thickness. */
  --shadow-double: 0 14px 34px rgba(0, 0, 0, 0.32);
  --soft-3d-double-border: transparent;
  --soft-3d-double-layer-border: rgba(255, 255, 255, 0.08);
  --soft-3d-double-layer-bg: rgba(255, 255, 255, 0.04);
  --soft-3d-double-cast: rgba(0, 0, 0, 0.45);
}

body {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-inter, 'Inter', system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hide scrollbar but keep scrollability (category carousels) */
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.heading-display {
  font-family: var(--font-playfair, 'Playfair Display', serif);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
}

/* Staggered children animation */
.stagger-children > * {
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}
.stagger-children > *:nth-child(1) { animation-delay: 0.05s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.15s; }

.card-hover {
  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow-soft);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

/* Organic Minimalism — shared floating shadow, now the "Medium" elevation tier */
.shadow-organic {
  box-shadow: var(--shadow-soft);
}
```

## B. Fonts — root layout (`app/layout.tsx`)

```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });

// on <html>:
<html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} antialiased`}>
```

## C. `app/(public)/business/page.tsx`

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ContactSection from "@/app/components/ContactSection";
import {
  Home,
  IndianRupee,
  HardHat,
  Hotel,
  Star,
  Users,
  Briefcase,
  Heart,
  Sparkles,
  Send,
  Bot,
  ArrowRight,
  Check,
  TrendingUp,
  Camera,
  BadgeCheck,
} from "lucide-react";

// ============================================
// BUSINESS HUB — /business
// One door for everyone who wants to build with
// Dhyana: hosts, investors, consultancy clients,
// partners, influencers, careers & volunteers.
// Includes a chatbot for easy redirection.
// ============================================

const tabs = [
  { key: "host", label: "Host & List", icon: Home },
  { key: "invest", label: "Invest", icon: IndianRupee },
  { key: "consultancy", label: "Consultancy", icon: HardHat },
  { key: "influencers", label: "Influencers", icon: Star },
  { key: "careers", label: "Careers", icon: Briefcase },
] as const;
type TabKey = (typeof tabs)[number]["key"];

interface Card {
  icon: typeof Home;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

const cards: Record<TabKey, Card[]> = {
  host: [
    { icon: Home, title: "List your property", desc: "Submit your stay with photos and papers — our systematic checks and a manager call get you approved fast.", cta: "Start listing", href: "/become-a-host" },
    { icon: BadgeCheck, title: "Become a host", desc: "New to hosting? We guide you from first photo to first guest, with quality standards that earn the Curated badge.", cta: "Join as a host", href: "/become-a-host" },
  ],
  invest: [],
  consultancy: [
    { icon: HardHat, title: "Architecture consultancy", desc: "Master plans, drawings, BOQ and site supervision for resorts, tiny houses and eco stays.", cta: "Book architecture", href: "/consultancy/architecture" },
    { icon: Hotel, title: "Hospitality consultancy", desc: "Business plans, revenue models, branding and operations manuals for your property.", cta: "Book hospitality", href: "/consultancy/hospitality" },
  ],
  influencers: [
    { icon: Camera, title: "Influencer program", desc: "Stay free at curated properties, earn on your promo code, and co-create content with our team.", cta: "Apply as influencer", href: "/business/apply-influencer" },
  ],
  careers: [
    { icon: Briefcase, title: "Careers at Dhyana", desc: "Engineering, operations, curation, field inspection — build India's most loved stay platform.", cta: "See open roles", href: "/careers" },
    { icon: Heart, title: "Volunteer with us", desc: "Farm work-exchanges, festival crews and community projects at partner properties.", cta: "Apply to volunteer", href: "/contact" },
  ],
};

const tiers = [
  { name: "Nano", range: "5k – 25k followers", perks: ["1 free stay / quarter", "10% promo code", "Feature on our page"] },
  { name: "Micro", range: "25k – 150k followers", perks: ["Free stay + experiences monthly", "15% promo code + payouts", "Campaign briefs & brand kit"] },
  { name: "Macro", range: "150k+ followers", perks: ["Curated trips, all covered", "Revenue share on campaigns", "Dedicated manager"] },
];

// The three Dhyana investment & partnership models
const investModels = [
  {
    name: "Landowner Partnership",
    tagline: "You own the land. We build the business.",
    forWho: ["Farm owners", "Estate owners", "Hill & beachfront land"],
    points: [
      "You provide the land and fund the development",
      "Dhyana does everything else — feasibility, architecture, branding, marketing, bookings and operations",
      "Your idle land becomes a professionally managed hospitality asset",
    ],
    split: { partners: 70, dhyana: 30, partnersLabel: "You keep ~70%", dhyanaLabel: "Dhyana ~30%" },
  },
  {
    name: "Land Leasing Program",
    tagline: "Lease your land. Earn without developing it.",
    forWho: ["Agricultural land", "Unused family land", "Long-term holders"],
    points: [
      "Submit your property — we inspect and approve suitable sites",
      "Dhyana and its investment partners develop and operate it",
      "You receive lease income with zero operational responsibility",
    ],
    split: null,
    splitNote: "Fixed lease income per agreement — fully passive",
  },
  {
    name: "Joint Investment Partnership",
    tagline: "Land + capital + Dhyana = shared success.",
    forWho: ["Investors with capital", "Landowners", "JV partners"],
    points: [
      "Invest in a unit — we match capital with approved land",
      "Dhyana runs end-to-end: design, construction guidance, tech, marketing and operations",
      "Returns paid as a share of operating revenue, split by your legal agreement",
    ],
    split: { partners: 55, dhyana: 45, partnersLabel: "Landowner + investor 50–60%", dhyanaLabel: "Dhyana 40–50%" },
  },
];

// ---------- Rolling ads ----------
const rollingAds = [
  {
    tag: "Investment",
    headline: "Own a slice of curated hospitality",
    copy: "Three models — partner with your land, lease it, or co-invest capital. Returns paid as a share of operating revenue.",
    cta: "See the models",
    href: "/business",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=75",
  },
  {
    tag: "Why Dhyana",
    headline: "The benefits of being part of Dhyana Stays",
    copy: "Automated payouts, the Curated badge that converts, regional marketing muscle and 24×7 SOS cover for your guests.",
    cta: "Know the perks",
    href: "/become-a-host",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&q=75",
  },
  {
    tag: "Careers",
    headline: "Build India's most loved stay platform",
    copy: "Engineering, curation, field inspection and operations roles across the south — remote-friendly.",
    cta: "See open roles",
    href: "/careers",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=75",
  },
  {
    tag: "Business",
    headline: "Bring your events, kitchen or fleet",
    copy: "Partners earn from every stay around them — event planners, food kitchens and rental fleets plug straight in.",
    cta: "Become a partner",
    href: "/contact",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=75",
  },
];

// ---------- Chatbot (redirection assistant) ----------
interface Answer {
  match: string[];
  text: string;
  cta: string;
  href: string;
}
const answers: Answer[] = [
  { match: ["list", "property", "host"], text: "To list your property, start host onboarding — upload photos and papers, clear our checks, and a manager calls you for approval.", cta: "Start listing", href: "/become-a-host" },
  { match: ["invest", "roi", "return", "plan", "land", "lease"], text: "We have three models: Landowner Partnership (you keep ~70%), Land Leasing (fixed passive income), and Joint Investment (partners share 50–60%, Dhyana takes 40–50% for running everything). All three are on this page under Invest — our desk will map you to the right one.", cta: "Talk to the investment desk", href: "/contact" },
  { match: ["architect", "design", "consult", "build"], text: "Our architecture team does master plans, drawings and BOQ; the hospitality team does business plans and branding. Book either consultancy online.", cta: "Book consultancy", href: "/consultancy/architecture" },
  { match: ["event", "wedding", "planner"], text: "Event planners join as partners — your packages get booked by travellers across our stays. The partner team will onboard you.", cta: "Apply as event partner", href: "/contact" },
  { match: ["bike", "rental", "vehicle", "car"], text: "Rental providers plug their fleet into stay bookings with doorstep delivery. Apply and our partner team takes it from there.", cta: "Apply as rental partner", href: "/contact" },
  { match: ["food", "kitchen", "cook", "restaurant"], text: "Food partners serve pre-booked meals to guests — with named cooks guests can choose. Apply and we'll verify your kitchen.", cta: "Apply as food partner", href: "/contact" },
  { match: ["influencer", "creator", "instagram", "promo"], text: "Our influencer program has Nano, Micro and Macro tiers — free curated stays, promo-code earnings and campaign collabs, tracked in your own dashboard.", cta: "Apply as influencer", href: "/business/apply-influencer" },
  { match: ["job", "career", "hiring", "work"], text: "We're hiring across engineering, operations and curation — and we love field people who know their regions.", cta: "See open roles", href: "/careers" },
  { match: ["volunteer"], text: "Volunteers join farm work-exchanges, festival crews and community projects at partner properties. Tell us your interests.", cta: "Apply to volunteer", href: "/contact" },
];
const fallback: Answer = {
  match: [],
  text: "I can point you to hosting, investing, consultancy, event/bike/food partnerships, the influencer program, careers or volunteering — which one sounds like you?",
  cta: "Contact us instead",
  href: "/contact",
};

interface ChatMsg {
  role: "user" | "bot";
  text: string;
  cta?: string;
  href?: string;
}

export default function BusinessPage() {
  const [tab, setTab] = useState<TabKey>("host");
  const [ad, setAd] = useState(0);
  const [input, setInput] = useState("");

  // Rolling ads — auto-advance every 5s
  useEffect(() => {
    const t = setInterval(() => setAd((i) => (i + 1) % rollingAds.length), 5000);
    return () => clearInterval(t);
  }, []);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "bot", text: "Namaste! I'm the business assistant. Ask me anything — listing a property, investing, partnerships, jobs — and I'll point you to the right door." },
  ]);

  const ask = (q: string) => {
    const query = q.trim();
    if (!query) return;
    const lower = query.toLowerCase();
    const found = answers.find((a) => a.match.some((m) => lower.includes(m))) ?? fallback;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: query },
      { role: "bot", text: found.text, cta: found.cta, href: found.href },
    ]);
    setInput("");
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-16 pb-10 text-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">
          Business with Dhyana
        </span>
        <h1 className="heading-display text-4xl lg:text-6xl text-foreground mt-3">
          One door. Every way to grow with us.
        </h1>
        <p className="text-muted mt-4 max-w-2xl mx-auto">
          Host a stay, invest in a project, book our consultancies, plug in your events,
          bikes or kitchen, create with us as an influencer — or join the team.
        </p>
      </section>

      {/* Tabs */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-start lg:justify-center pb-1 mb-10">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                tab === key
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_4px_16px_rgba(16,185,129,0.25)]"
                  : "bg-surface border-border text-muted hover:text-foreground hover:border-border-light"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Cards for active tab */}
        {cards[tab].length > 0 && (
        <div className={`grid gap-6 stagger-children ${cards[tab].length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : cards[tab].length === 2 ? "md:grid-cols-2" : cards[tab].length === 1 ? "max-w-xl mx-auto" : "md:grid-cols-3"}`}>
          {cards[tab].map((c) => (
            <div key={c.title} className="bg-surface border border-surface-hover hover:border-border rounded-2xl p-6 flex flex-col card-hover">
              <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <c.icon size={20} />
              </span>
              <h2 className="text-base font-semibold text-foreground">{c.title}</h2>
              <p className="text-sm text-muted mt-2 leading-relaxed flex-1">{c.desc}</p>
              <Link
                href={c.href}
                className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
              >
                {c.cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
        )}

        {/* Invest tab: the three Dhyana investment models */}
        {tab === "invest" && (
          <div className="animate-fade-in space-y-12">
            <p className="text-center text-muted max-w-2xl mx-auto -mt-2">
              Not everyone has land, not everyone has capital, and not everyone has hospitality
              expertise. Dhyana connects all three — pick the model that matches what you bring.
            </p>

            {/* Three models */}
            <div className="grid lg:grid-cols-3 gap-6">
              {investModels.map((m, i) => (
                <div
                  key={m.name}
                  className={`rounded-2xl border p-6 flex flex-col ${
                    i === 2 ? "border-primary/50 bg-primary/5" : "border-border bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-subtle">Model {i + 1}</span>
                    {i === 2 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                        <Sparkles size={10} /> Flagship
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mt-1.5">{m.name}</h3>
                  <p className="text-xs text-primary italic mt-0.5">“{m.tagline}”</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {m.forWho.map((w) => (
                      <span key={w} className="text-[10px] px-2.5 py-1 rounded-full bg-surface-hover text-muted">
                        {w}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 space-y-2 flex-1">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2 text-xs text-muted leading-relaxed">
                        <Check size={13} className="text-sage shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>

                  {/* Revenue split */}
                  <div className="mt-5 pt-4 border-t border-surface-hover">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-subtle mb-2">Revenue sharing</p>
                    {m.split ? (
                      <>
                        <div className="flex h-2.5 rounded-full overflow-hidden">
                          <div className="bg-sage" style={{ width: `${m.split.partners}%` }} />
                          <div className="bg-primary" style={{ width: `${m.split.dhyana}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] mt-1.5">
                          <span className="text-sage font-semibold">{m.split.partnersLabel}</span>
                          <span className="text-primary font-semibold">{m.split.dhyanaLabel}</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-foreground font-medium">{m.splitNote}</p>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className={`mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
                      i === 2
                        ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                        : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    Apply for this model <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Development process */}
            <div>
              <h3 className="heading-display text-2xl text-foreground text-center">How a project comes alive</h3>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mt-6 pb-2">
                {["Land evaluation", "Investor matching", "Legal agreements", "Design & planning", "Construction", "Curated inspection", "Platform listing", "Revenue"].map((s, i, arr) => (
                  <div key={s} className="flex items-center gap-2 shrink-0">
                    <div className="rounded-xl bg-surface border border-border px-4 py-3 text-center">
                      <p className="text-[10px] font-bold text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                      <p className="text-xs font-medium text-foreground whitespace-nowrap mt-0.5">{s}</p>
                    </div>
                    {i < arr.length - 1 && <ArrowRight size={13} className="text-subtle shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Why Dhyana + who can apply */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" /> Why partner with Dhyana?
                </h3>
                <ul className="mt-4 grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
                  {["Land evaluation & feasibility", "Architecture & sustainable design", "Branding & photography", "Guest acquisition & marketing", "Operations & revenue management", "Curated quality inspections", "Technology & AI insights", "End-to-end, not just a listing"].map((w) => (
                    <li key={w} className="flex gap-2 text-xs text-muted leading-relaxed">
                      <Check size={13} className="text-sage shrink-0 mt-0.5" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Users size={16} className="text-primary" /> Who can apply?
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Landowners", "Individual investors", "Joint venture partners", "Farm owners", "Resort developers", "Hospitality entrepreneurs", "Tourism property owners", "Real estate investors"].map((w) => (
                    <span key={w} className="text-xs px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {w}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted mt-4 leading-relaxed">
                  Invest in a unit, lease your land, or co-build — returns are paid as a share of
                  operating revenue, on the split your model defines.
                </p>
              </div>
            </div>

            {/* CTA banner */}
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/15 via-surface to-surface p-8 md:p-10 text-center">
              <h3 className="heading-display text-2xl md:text-3xl text-foreground">
                Build Together. Grow Together. Earn Together.
              </h3>
              <p className="text-sm text-muted mt-2 max-w-xl mx-auto">
                Own land, hold capital, or dream of a hospitality business — our investment desk
                will map you to the right model.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 px-7 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
              >
                Start your hospitality journey <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Influencer tab extra: tiers */}
        {tab === "influencers" && (
          <div className="mt-12 animate-fade-in">
            <h3 className="heading-display text-2xl text-foreground text-center">Partner tiers</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {tiers.map((t, i) => (
                <div key={t.name} className={`rounded-2xl border p-6 ${i === 1 ? "border-primary/50 bg-primary/5" : "border-border bg-surface"}`}>
                  <p className="text-lg font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted mt-0.5">{t.range}</p>
                  <ul className="mt-4 space-y-2">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-muted">
                        <Check size={14} className="text-sage shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ---------- Rolling ads ---------- */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 mt-20">
        <div className="relative rounded-3xl overflow-hidden border border-primary/25 h-[300px] md:h-[280px]">
          {rollingAds.map((a, i) => (
            <div
              key={a.tag}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === ad ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={a.image} alt={a.headline} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
              <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12 max-w-xl">
                <span className="self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white/90 rounded-full border border-white/20 mb-3">
                  {a.tag} · Opportunity
                </span>
                <h3 className="heading-display text-2xl md:text-3xl text-white">{a.headline}</h3>
                <p className="text-sm text-white/80 mt-2 leading-relaxed">{a.copy}</p>
                <Link
                  href={a.href}
                  className="self-start inline-flex items-center gap-2 mt-5 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                >
                  {a.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
            {rollingAds.map((a, i) => (
              <button
                key={a.tag}
                onClick={() => setAd(i)}
                aria-label={`Show ad: ${a.tag}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === ad ? "w-6 bg-primary" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
          <span className="absolute top-4 right-6 z-20 text-[9px] font-semibold uppercase tracking-wider text-white/60">
            Rolling ads
          </span>
        </div>
      </section>

      {/* ---------- Business chatbot ---------- */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 mt-20">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles size={13} /> Not sure where to start?
          </span>
          <h2 className="heading-display text-3xl text-foreground mt-2">Ask the business assistant</h2>
        </div>

        <div className="bg-surface border border-border rounded-3xl overflow-hidden">
          <div className="p-5 space-y-4 max-h-[360px] overflow-y-auto">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-sm px-4 py-2.5">{m.text}</p>
                </div>
              ) : (
                <div key={i} className="flex gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-sage/15 text-sage flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={15} />
                  </span>
                  <div className="max-w-[85%]">
                    <p className="rounded-2xl rounded-tl-sm bg-surface-hover text-foreground text-sm px-4 py-2.5">{m.text}</p>
                    {m.cta && m.href && (
                      <Link
                        href={m.href}
                        className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                      >
                        {m.cta} <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Quick chips */}
          <div className="px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {["How do I list my property?", "Minimum investment?", "Apply as influencer", "Food partner", "Jobs at Dhyana"].map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="shrink-0 text-xs text-muted border border-border rounded-full px-3.5 py-1.5 hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="p-4 border-t border-surface-hover flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question — “how do I invest?”, “list my events”…"
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-full text-sm text-foreground placeholder-subtle focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              aria-label="Send"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover transition-colors shrink-0"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
        <p className="text-center text-[11px] text-subtle mt-3 flex items-center justify-center gap-1.5">
          <Users size={11} /> Prefer a human? Our partner team replies within a day — <Link href="#contact" className="text-primary hover:underline">contact us</Link>.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <div className="bg-surface/40 border-t border-surface-hover">
        <ContactSection />
      </div>
    </div>
  );
}
```

## D. `app/(public)/business/apply-influencer/page.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Cake,
  Camera,
  AtSign,
  Link2,
  Users,
  Eye,
  PlayCircle,
  FolderOpen,
  Tag,
  Globe,
  Plane,
  IndianRupee,
  Building2,
  Heart,
  Video,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
  Home,
  LayoutDashboard,
  Clock,
  Star,
  UploadCloud,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s]{7,15}$/;

const steps = [
  { key: 1, label: "Personal", title: "Personal Details", subtitle: "Tell us a little about you." },
  { key: 2, label: "Social Media", title: "Social Media", subtitle: "Your reach and where we can see your work." },
  { key: 3, label: "Creator Details", title: "Creator Details", subtitle: "What you create and how you'd like to collaborate." },
] as const;

const contentCategories = [
  "Travel",
  "Food & Culinary",
  "Lifestyle",
  "Wellness & Yoga",
  "Photography",
  "Fashion & Beauty",
  "Adventure & Outdoors",
  "Comedy & Entertainment",
  "Vlogging",
  "Other",
];

const followerRanges = [
  "Below 5,000",
  "5,000 – 25,000 (Nano)",
  "25,000 – 150,000 (Micro)",
  "150,000+ (Macro)",
];

const travelOptions = [
  "Anytime — fully flexible",
  "Weekends only",
  "Specific months only",
  "Rarely available",
];

const collabOptions = [
  { key: "free-stay", label: "Free Stay", icon: Home },
  { key: "paid", label: "Paid", icon: IndianRupee },
  { key: "affiliate", label: "Affiliate", icon: TrendingUp },
  { key: "brand-ambassador", label: "Brand Ambassador", icon: BadgeCheck },
];

const benefits = [
  { icon: Home, title: "Free Stays", desc: "Curated properties, on us." },
  { icon: IndianRupee, title: "Paid Collaborations", desc: "Campaign fees on top of stays." },
  { icon: LayoutDashboard, title: "Creator Dashboard", desc: "Track collabs, credits and payouts." },
  { icon: Users, title: "Exclusive Community", desc: "Network with fellow creators." },
  { icon: Clock, title: "Review Time: 48 Hours", desc: "Fast, human review — always." },
];

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  igUsername: string;
  igLink: string;
  followers: string;
  avgReelViews: string;
  youtubeLink: string;
  portfolioLink: string;
  bestContent: string;
  category: string;
  bio: string;
  languages: string;
  travelAvailability: string;
  collab: string[];
  chargeReel: string;
  chargeStory: string;
  chargePost: string;
  prevCollabs: string;
  whyJoin: string;
  introVideo: string;
  declaration: boolean;
}

const emptyValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  age: "",
  igUsername: "",
  igLink: "",
  followers: "",
  avgReelViews: "",
  youtubeLink: "",
  portfolioLink: "",
  bestContent: "",
  category: "",
  bio: "",
  languages: "",
  travelAvailability: "",
  collab: [],
  chargeReel: "",
  chargeStory: "",
  chargePost: "",
  prevCollabs: "",
  whyJoin: "",
  introVideo: "",
  declaration: false,
};

type Errors = Partial<Record<keyof FormValues, string>>;

function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
      {children} {optional && <span className="normal-case text-subtle">(optional)</span>}
    </label>
  );
}

function ErrorText({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-terracotta mt-1.5">
      <AlertCircle size={11} /> {error}
    </p>
  );
}

function fieldClass(error?: string) {
  return `w-full pl-10 pr-4 py-3 bg-background border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none transition-colors ${
    error ? "border-terracotta focus:border-terracotta" : "border-border focus:border-primary"
  }`;
}

export default function ApplyInfluencerPage() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step > 1) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setValues((v) => ({ ...v, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setValues((v) => ({ ...v, [name]: value }));
    }
    setErrors((prev) => {
      if (!prev[name as keyof FormValues]) return prev;
      const next = { ...prev };
      delete next[name as keyof FormValues];
      return next;
    });
  };

  const toggleCollab = (key: string) => {
    setValues((v) => ({
      ...v,
      collab: v.collab.includes(key) ? v.collab.filter((c) => c !== key) : [...v.collab, key],
    }));
    setErrors((prev) => {
      if (!prev.collab) return prev;
      const next = { ...prev };
      delete next.collab;
      return next;
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validateStep1 = (): Errors => {
    const e: Errors = {};
    if (!values.fullName.trim()) e.fullName = "Required.";
    if (!values.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(values.email)) e.email = "Enter a valid email address.";
    if (!values.phone.trim()) e.phone = "Phone number is required.";
    else if (!PHONE_RE.test(values.phone)) e.phone = "Enter a valid phone number.";
    if (!values.city.trim()) e.city = "Required.";
    if (!values.age.trim()) e.age = "Required.";
    else if (Number(values.age) < 16 || Number(values.age) > 100) e.age = "Must be between 16 and 100.";
    return e;
  };

  const validateStep2 = (): Errors => {
    const e: Errors = {};
    if (!values.igUsername.trim()) e.igUsername = "Required.";
    if (!values.igLink.trim()) e.igLink = "Required.";
    if (!values.followers) e.followers = "Select your follower range.";
    if (!values.avgReelViews.trim()) e.avgReelViews = "Required.";
    if (!values.portfolioLink.trim()) e.portfolioLink = "Required.";
    if (!values.bestContent.trim()) e.bestContent = "Share at least one link.";
    return e;
  };

  const validateStep3 = (): Errors => {
    const e: Errors = {};
    if (!values.category) e.category = "Select a category.";
    if (!values.bio.trim()) e.bio = "Tell us about yourself.";
    if (!values.languages.trim()) e.languages = "Required.";
    if (!values.travelAvailability) e.travelAvailability = "Select your availability.";
    if (values.collab.length === 0) e.collab = "Pick at least one option.";
    if (!values.whyJoin.trim()) e.whyJoin = "Required.";
    if (!values.declaration) e.declaration = "Please confirm the declaration to continue.";
    return e;
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stepErrors = step === 1 ? validateStep1() : step === 2 ? validateStep2() : validateStep3();
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    if (step < 3) setStep((s) => s + 1);
    else setSubmitted(true);
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-8">
        <Link
          href="/business"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft size={12} /> Back to Business Hub
        </Link>
      </div>

      <div className="py-10 md:py-14 text-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-5">
          <Star size={12} /> Influencer Program
        </div>
        <h1 className="heading-display text-4xl lg:text-5xl text-foreground mb-4">
          Apply as an Influencer
        </h1>
        <p className="text-muted max-w-xl mx-auto text-sm md:text-base">
          Free curated stays, paid collaborations and a creator dashboard — join the DhyanaStays
          creator community in three quick steps.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* Form column */}
          <div className="lg:col-span-2" ref={cardRef}>
            {!submitted ? (
              <div className="bg-surface border border-border rounded-2xl p-6 md:p-10 shadow-organic">
                {/* Step indicator */}
                <div className="flex items-center mb-2">
                  {steps.map((s, i) => (
                    <div key={s.key} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                            step >= s.key
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface-hover text-subtle border border-border"
                          }`}
                        >
                          {step > s.key ? <Check size={16} /> : s.key}
                        </div>
                        <span
                          className={`text-[11px] font-medium whitespace-nowrap ${
                            step >= s.key ? "text-foreground" : "text-subtle"
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 rounded-full mx-3 mb-6 transition-all ${
                            step > s.key ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-8 mb-8">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{steps[step - 1].title}</h2>
                    <p className="text-sm text-muted mt-1">{steps[step - 1].subtitle}</p>
                  </div>
                  <span className="text-xs text-subtle uppercase tracking-wider shrink-0 ml-4">
                    Step {step} of 3
                  </span>
                </div>

                <form className="space-y-6" noValidate onSubmit={handleFormSubmit}>
                  {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label>Full Name</Label>
                          <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              name="fullName"
                              value={values.fullName}
                              onChange={handleChange}
                              placeholder="Your full name"
                              className={fieldClass(errors.fullName)}
                            />
                          </div>
                          <ErrorText error={errors.fullName} />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              className={fieldClass(errors.email)}
                            />
                          </div>
                          <ErrorText error={errors.email} />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label>Phone</Label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              type="tel"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              placeholder="+91 98765 43210"
                              className={fieldClass(errors.phone)}
                            />
                          </div>
                          <ErrorText error={errors.phone} />
                        </div>
                        <div>
                          <Label>City</Label>
                          <div className="relative">
                            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              placeholder="Where you're based"
                              className={fieldClass(errors.city)}
                            />
                          </div>
                          <ErrorText error={errors.city} />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label>Age</Label>
                          <div className="relative">
                            <Cake size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              type="number"
                              min="16"
                              max="100"
                              name="age"
                              value={values.age}
                              onChange={handleChange}
                              placeholder="Your age"
                              className={fieldClass(errors.age)}
                            />
                          </div>
                          <ErrorText error={errors.age} />
                        </div>
                        <div>
                          <Label optional>Profile Photo</Label>
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-surface-hover border border-border flex items-center justify-center overflow-hidden shrink-0">
                              {photoPreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                              ) : (
                                <Camera size={17} className="text-subtle" />
                              )}
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoChange}
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-foreground hover:bg-surface-hover hover:border-border-light transition-all"
                            >
                              <UploadCloud size={15} /> {photoPreview ? "Change" : "Upload"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label>Instagram Username</Label>
                          <div className="relative">
                            <AtSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              name="igUsername"
                              value={values.igUsername}
                              onChange={handleChange}
                              placeholder="yourhandle"
                              className={fieldClass(errors.igUsername)}
                            />
                          </div>
                          <ErrorText error={errors.igUsername} />
                        </div>
                        <div>
                          <Label>Instagram Profile Link</Label>
                          <div className="relative">
                            <Link2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              name="igLink"
                              value={values.igLink}
                              onChange={handleChange}
                              placeholder="instagram.com/yourhandle"
                              className={fieldClass(errors.igLink)}
                            />
                          </div>
                          <ErrorText error={errors.igLink} />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label>Followers</Label>
                          <div className="relative">
                            <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle z-10" />
                            <select
                              name="followers"
                              value={values.followers}
                              onChange={handleChange}
                              className={`${fieldClass(errors.followers)} appearance-none`}
                            >
                              <option value="">Select a range</option>
                              {followerRanges.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </select>
                          </div>
                          <ErrorText error={errors.followers} />
                        </div>
                        <div>
                          <Label>Average Reel Views</Label>
                          <div className="relative">
                            <Eye size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              type="number"
                              min="0"
                              name="avgReelViews"
                              value={values.avgReelViews}
                              onChange={handleChange}
                              placeholder="e.g. 25000"
                              className={fieldClass(errors.avgReelViews)}
                            />
                          </div>
                          <ErrorText error={errors.avgReelViews} />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label optional>YouTube Link</Label>
                          <div className="relative">
                            <PlayCircle size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              name="youtubeLink"
                              value={values.youtubeLink}
                              onChange={handleChange}
                              placeholder="youtube.com/@yourchannel"
                              className={fieldClass()}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Portfolio / Drive Link</Label>
                          <div className="relative">
                            <FolderOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              name="portfolioLink"
                              value={values.portfolioLink}
                              onChange={handleChange}
                              placeholder="Link to your portfolio or drive folder"
                              className={fieldClass(errors.portfolioLink)}
                            />
                          </div>
                          <ErrorText error={errors.portfolioLink} />
                        </div>
                      </div>

                      <div>
                        <Label>Best Content Links</Label>
                        <textarea
                          name="bestContent"
                          value={values.bestContent}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Paste 2–3 links to your best reels or posts, one per line"
                          className={`w-full px-4 py-3 bg-background border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none transition-colors resize-none ${
                            errors.bestContent ? "border-terracotta focus:border-terracotta" : "border-border focus:border-primary"
                          }`}
                        />
                        <ErrorText error={errors.bestContent} />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label>Content Category</Label>
                          <div className="relative">
                            <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle z-10" />
                            <select
                              name="category"
                              value={values.category}
                              onChange={handleChange}
                              className={`${fieldClass(errors.category)} appearance-none`}
                            >
                              <option value="">Select a category</option>
                              {contentCategories.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                          <ErrorText error={errors.category} />
                        </div>
                        <div>
                          <Label>Languages</Label>
                          <div className="relative">
                            <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              name="languages"
                              value={values.languages}
                              onChange={handleChange}
                              placeholder="e.g. English, Hindi, Tamil"
                              className={fieldClass(errors.languages)}
                            />
                          </div>
                          <ErrorText error={errors.languages} />
                        </div>
                      </div>

                      <div>
                        <Label>Short Bio</Label>
                        <textarea
                          name="bio"
                          value={values.bio}
                          onChange={handleChange}
                          rows={3}
                          placeholder="A couple of lines about you and your content"
                          className={`w-full px-4 py-3 bg-background border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none transition-colors resize-none ${
                            errors.bio ? "border-terracotta focus:border-terracotta" : "border-border focus:border-primary"
                          }`}
                        />
                        <ErrorText error={errors.bio} />
                      </div>

                      <div>
                        <Label>Travel Availability</Label>
                        <div className="relative">
                          <Plane size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle z-10" />
                          <select
                            name="travelAvailability"
                            value={values.travelAvailability}
                            onChange={handleChange}
                            className={`${fieldClass(errors.travelAvailability)} appearance-none`}
                          >
                            <option value="">Select your availability</option>
                            {travelOptions.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <ErrorText error={errors.travelAvailability} />
                      </div>

                      <div>
                        <Label>Collaboration Preference</Label>
                        <div className="flex flex-wrap gap-2.5">
                          {collabOptions.map((opt) => {
                            const active = values.collab.includes(opt.key);
                            const Icon = opt.icon;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => toggleCollab(opt.key)}
                                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                                  active
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background text-foreground border-border hover:border-border-light hover:bg-surface-hover"
                                }`}
                              >
                                <Icon size={14} /> {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <ErrorText error={errors.collab} />
                      </div>

                      <div>
                        <Label optional>Expected Charges</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="relative">
                            <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              type="number"
                              min="0"
                              name="chargeReel"
                              value={values.chargeReel}
                              onChange={handleChange}
                              placeholder="Per Reel"
                              className="w-full pl-8 pr-3 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                          <div className="relative">
                            <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              type="number"
                              min="0"
                              name="chargeStory"
                              value={values.chargeStory}
                              onChange={handleChange}
                              placeholder="Per Story"
                              className="w-full pl-8 pr-3 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                          <div className="relative">
                            <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
                            <input
                              type="number"
                              min="0"
                              name="chargePost"
                              value={values.chargePost}
                              onChange={handleChange}
                              placeholder="Per Post"
                              className="w-full pl-8 pr-3 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-subtle mt-1.5">
                          Leave blank if you&apos;re open to free-stay collaborations only.
                        </p>
                      </div>

                      <div>
                        <Label optional>Previous Brand Collaborations</Label>
                        <div className="relative">
                          <Building2 size={16} className="absolute left-3.5 top-4 text-subtle" />
                          <textarea
                            name="prevCollabs"
                            value={values.prevCollabs}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Brands you've worked with, if any"
                            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Why do you want to join DhyanaStays?</Label>
                        <div className="relative">
                          <Heart size={16} className="absolute left-3.5 top-4 text-subtle" />
                          <textarea
                            name="whyJoin"
                            value={values.whyJoin}
                            onChange={handleChange}
                            rows={3}
                            placeholder="What draws you to our stays and community?"
                            className={`w-full pl-10 pr-4 py-3 bg-background border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none transition-colors resize-none ${
                              errors.whyJoin ? "border-terracotta focus:border-terracotta" : "border-border focus:border-primary"
                            }`}
                          />
                        </div>
                        <ErrorText error={errors.whyJoin} />
                      </div>

                      <div>
                        <Label optional>Intro Video Link</Label>
                        <div className="relative">
                          <Video size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
                          <input
                            name="introVideo"
                            value={values.introVideo}
                            onChange={handleChange}
                            placeholder="YouTube or Drive link to a short intro"
                            className={fieldClass()}
                          />
                        </div>
                      </div>

                      <label
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                          errors.declaration ? "border-terracotta" : "border-border hover:border-border-light"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="declaration"
                          checked={values.declaration}
                          onChange={handleChange}
                          className="mt-0.5 w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="text-sm text-muted leading-relaxed">
                          I confirm that all the information provided is accurate, and I agree to
                          DhyanaStays&apos; Influencer Program{" "}
                          <Link href="/terms" className="text-primary hover:underline">
                            terms &amp; conditions
                          </Link>
                          .
                        </span>
                      </label>
                      <ErrorText error={errors.declaration} />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-surface-hover">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-surface-hover transition-all"
                      >
                        <ArrowLeft size={15} /> Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(228,138,74,0.35)] transition-all"
                    >
                      {step < 3 ? "Continue" : "Submit Application"}
                      {step < 3 ? <ArrowRight size={16} /> : <Check size={16} />}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-surface border border-border rounded-2xl p-10 md:p-14 text-center shadow-organic animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-sage/10 border border-sage/20 flex items-center justify-center mx-auto mb-6">
                  <Check size={26} className="text-sage" />
                </div>
                <h3 className="heading-display text-2xl md:text-3xl text-foreground mb-3">
                  Application Submitted
                </h3>
                <p className="text-sm text-muted max-w-md mx-auto mb-2">
                  Thanks{values.fullName ? `, ${values.fullName.split(" ")[0]}` : ""} — our partnerships
                  team reviews every application personally.
                </p>
                <p className="text-sm text-muted max-w-md mx-auto mb-8">
                  Expect to hear back within <span className="text-foreground font-medium">48 hours</span>
                  {values.email ? ` at ${values.email}` : ""}.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/business"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-surface-hover transition-all"
                  >
                    Back to Business Hub
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(228,138,74,0.35)] transition-all"
                  >
                    Explore DhyanaStays <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sticky benefits column — desktop only */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <div className="bg-surface border border-border rounded-2xl p-8 shadow-organic">
              <h3 className="text-lg font-semibold text-foreground mb-1">Why creators choose us</h3>
              <p className="text-sm text-muted mb-6">Everything you get as a DhyanaStays creator partner.</p>
              <div className="space-y-5">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Icon size={17} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{b.title}</div>
                        <div className="text-xs text-muted mt-0.5">{b.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-7 pt-6 border-t border-surface-hover flex items-center gap-2 text-xs text-subtle">
                <ShieldCheck size={14} className="text-sage" /> Verified partner program, no fees to apply.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## E. `app/components/ContactSection.tsx`

```tsx
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

// ============================================
// Shared Contact section — embedded on About Us
// and Business pages instead of a standalone
// top-level Contact page.
// ============================================

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Get in Touch</span>
          <h2 className="heading-display text-lg sm:text-2xl lg:text-3xl text-foreground mt-3">
            Talk to Our Team
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Booking a stay, listing a property, investing, or discussing an architectural project —
            our team replies within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-7">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Email Us</h3>
                  <p className="text-sm text-muted mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:dhyanaarccreation@gmail.com" className="text-sm text-primary hover:underline">
                    dhyanaarccreation@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Call Us</h3>
                  <p className="text-sm text-muted mb-2">Mon-Fri from 9am to 6pm.</p>
                  <a href="tel:+919626689316" className="text-sm text-primary hover:underline block">
                    +91 96266 89316
                  </a>
                  <a href="tel:+919003107819" className="text-sm text-primary hover:underline block">
                    +91 90031 07819
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">HQ Office</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Free Land Book Shop, Next to Green Guest House,<br />
                    Near Auroville, Tamil Nadu – 605101
                  </p>
                  <p className="text-xs text-subtle mt-2">
                    Dhyana Arc Creation LLP · Brand: Dhyana Architects
                  </p>
                </div>
              </div>
            </div>

            {/* Department Emails */}
            <div className="mt-10 pt-8 border-t border-surface-hover">
              <h3 className="text-sm font-medium text-foreground mb-4">Specific Inquiries</h3>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <div className="text-xs text-subtle uppercase tracking-wider mb-1">Company</div>
                  <a href="mailto:dhyanaarccreation@gmail.com" className="text-sm text-muted hover:text-primary">dhyanaarccreation@gmail.com</a>
                </div>
                <div>
                  <div className="text-xs text-subtle uppercase tracking-wider mb-1">Architecture</div>
                  <a href="mailto:dhyanaarchitects@gmail.com" className="text-sm text-muted hover:text-primary">dhyanaarchitects@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface border border-border rounded-2xl p-8">
            {!isSubmitted ? (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSubmitted(true);
                }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Last name"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                    Inquiry Type
                  </label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>General Inquiry</option>
                    <option>Booking Support</option>
                    <option>Hosting with Dhyana</option>
                    <option>Investment Opportunities</option>
                    <option>Architectural Consultancy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-sage/10 border border-sage/20 flex items-center justify-center mb-6">
                  <Mail size={24} className="text-sage" />
                </div>
                <h3 className="heading-display text-2xl text-foreground mb-2">Message Sent</h3>
                <p className="text-sm text-muted mb-8">
                  Thank you for reaching out. A member of our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```
