import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SpotlightSection } from "./components/ServicesSection";
import DestinationsSection from "./components/DestinationsSection";
import SeedBallMissionSection from "./components/SeedBallMissionSection";
import StaysExplorer from "./components/StaysExplorer";
import HeroSearchBar from "./components/HeroSearchBar";
import TravelGuidesSection from "./components/TravelGuidesSection";
import { ArrowRight, Sparkles, Bot } from "lucide-react";
import { categories } from "@/lib/mock-data";

// ============================================
// HERO SECTION — Organic Minimalism
// ============================================
function HeroSection() {
  return (
    <section className="relative bg-background pt-20 lg:pt-24 pb-3 md:pb-4 overflow-hidden">
      {/* Decorative soft blobs */}
      <div className="absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full bg-sage/15 blur-3xl pointer-events-none" />
      <div className="absolute top-24 -right-32 w-[380px] h-[380px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-4 sm:gap-6 items-start">
        {/* Left: copy */}
        <div className="lg:col-span-3 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-surface shadow-organic mb-2 sm:mb-3">
            <Sparkles size={12} className="text-primary" />
            <span className="text-[10px] sm:text-xs font-semibold text-foreground tracking-wide uppercase">
              India&apos;s Premier Curated Stays
            </span>
          </span>

          <h1 className="heading-organic text-2xl leading-[1.15] sm:text-3xl lg:text-4xl text-foreground mb-1.5 sm:mb-2 max-w-xl">
            Stays You&apos;ll Fall In Love With{" "}
            <span className="text-primary">From the First Glance</span>
          </h1>

          <p className="text-muted text-xs sm:text-sm max-w-lg mb-2 sm:mb-3 leading-relaxed">
            Architect-inspected properties, warm local hospitality, and
            experiences designed to feel like home — curated across India&apos;s
            most beautiful destinations.
          </p>
        </div>

        {/* Right: sponsored ad slider (replaces the old static image) */}
        <div className="lg:col-span-2 relative animate-fade-in">
          <SpotlightSection embedded />
        </div>
      </div>

      {/* Floating search bar */}
      <HeroSearchBar />
    </section>
  );
}

// ============================================
// AI TRIP PLANNER SECTION
// ============================================
function AiPlannerSection() {
  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <Link
          href="/traveller/ai-planner"
          className="group flex items-center gap-3 sm:gap-4 rounded-2xl bg-sage px-4 py-3.5 sm:px-6 sm:py-4 shadow-organic hover:-translate-y-0.5 transition-all"
        >
          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
            <Bot size={18} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 flex-wrap">
              New · AI Trip Planner
              <span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                Try it
              </span>
            </p>
            <p className="text-[11px] sm:text-xs text-white/75 mt-0.5 truncate">
              Describe your trip in one line — get a day-by-day itinerary, built by AI.
            </p>
          </div>
          <span className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold bg-white text-sage rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors whitespace-nowrap shrink-0">
            <Sparkles size={13} /> Plan with AI
          </span>
        </Link>
      </div>
    </section>
  );
}

// ============================================
// CATEGORIES SECTION
// ============================================
function CategoriesSection() {
  // 3D emoji renders (Microsoft Fluent 3D, MIT licensed) — one per category,
  // swapped in for the old flat line icons.
  const fluent3d = "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets";
  const iconMap: Record<string, string> = {
    Home: `${fluent3d}/House/3D/house_3d.png`,
    Sprout: `${fluent3d}/Seedling/3D/seedling_3d.png`,
    Heart: `${fluent3d}/Lotus/3D/lotus_3d.png`,
    Crown: `${fluent3d}/Crown/3D/crown_3d.png`,
    Leaf: `${fluent3d}/Herb/3D/herb_3d.png`,
    Landmark: `${fluent3d}/Classical building/3D/classical_building_3d.png`,
    Laptop: `${fluent3d}/Laptop/3D/laptop_3d.png`,
    HeartHandshake: `${fluent3d}/Two hearts/3D/two_hearts_3d.png`,
    Users: `${fluent3d}/People hugging/3D/people_hugging_3d.png`,
    PawPrint: `${fluent3d}/Paw prints/3D/paw_prints_3d.png`,
    Mountain: `${fluent3d}/Camping/3D/camping_3d.png`,
    Castle: `${fluent3d}/Castle/3D/castle_3d.png`,
  };

  return (
    <section className="py-8 md:py-14 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-3 sm:mb-5 lg:mb-14">
          <div>
            <span className="text-xs font-semibold text-sage uppercase tracking-widest">
              Explore
            </span>
            <h2 className="heading-organic text-lg sm:text-2xl lg:text-4xl text-foreground mt-1 sm:mt-2">
              Find Your Perfect Escape
            </h2>
          </div>
          <Link
            href="/#explore-stays"
            className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth scrollbar-hide gap-2.5 sm:gap-4 -mx-6 px-6 pb-1 sm:grid sm:grid-cols-3 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:snap-none md:grid-cols-4 lg:grid-cols-6 stagger-children">
            {categories.slice(0, 12).map((cat) => (
              <Link
                key={cat.slug}
                href="/#explore-stays"
                className="group shrink-0 w-[92px] snap-start sm:w-auto sm:shrink p-2.5 sm:p-6 rounded-2xl sm:rounded-[28px] bg-surface card-hover text-center"
              >
                <div className="w-9 h-9 sm:w-16 sm:h-16 mx-auto mb-1.5 sm:mb-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    loading="lazy"
                    src={iconMap[cat.icon]}
                    alt=""
                    aria-hidden="true"
                    className="w-8 h-8 sm:w-14 sm:h-14 object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:rotate-[-4deg]"
                  />
                </div>
                <h3 className="text-[11px] sm:text-sm font-medium text-foreground mb-0.5 sm:mb-1 leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-subtle">{cat.count} stays</p>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent sm:hidden" />
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXPLORE STAYS SECTION — search, filters &
// results grid, embedded directly on the
// homepage. There is no standalone /stays
// listing page — this is the only place to
// browse stays.
// ============================================
function ExploreStaysSection() {
  return (
    <section id="explore-stays" className="py-5 md:py-7 bg-background scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-1.5 sm:mb-2 lg:mb-3">
        <span className="text-xs font-semibold text-sage uppercase tracking-widest">
          Browse
        </span>
        <h2 className="heading-organic text-xl sm:text-2xl lg:text-4xl text-foreground mt-0.5 sm:mt-1">
          Explore All Stays
        </h2>
      </div>
      <StaysExplorer />
    </section>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExploreStaysSection />
        <TravelGuidesSection />
        <AiPlannerSection />
        <CategoriesSection />
        <DestinationsSection />
        <SeedBallMissionSection />
      </main>
      <Footer />
    </>
  );
}
