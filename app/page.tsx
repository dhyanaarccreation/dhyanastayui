import { Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import DestinationsSection from "./components/DestinationsSection";
import Footer from "./components/Footer";
import HeroSearchBar from "./components/HeroSearchBar";
import Navbar from "./components/Navbar";
import SeedBallMissionSection from "./components/SeedBallMissionSection";
import StaysExplorer from "./components/StaysExplorer";
import TravelGuidesSection from "./components/TravelGuidesSection";

// ============================================
// HERO SECTION — Organic Minimalism
// ============================================
function HeroSection() {
  // Top padding clears the fixed header (59px mobile / 73px from lg) and then
  // adds breathing room above the hero that grows with the viewport.
  return (
    <section className="relative bg-background pt-[80px] sm:pt-[88px] lg:pt-[104px] xl:pt-[112px] pb-5 md:pb-7 overflow-hidden">
      {/* Decorative soft blobs */}
      <div className="absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full bg-sage/15 blur-3xl pointer-events-none" />
      <div className="absolute top-24 -right-32 w-[380px] h-[380px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Hero content — copy on the left, video on the right. The search bar is
          a sibling below, so it spans the full container width. */}
      <div className="relative container-page grid lg:grid-cols-[1.35fr_1fr] gap-7 lg:gap-10 items-center">
        {/* ============================================
            LEFT: HERO TEXT
        ============================================ */}
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-surface shadow-organic mb-3">
            <Sparkles size={12} className="text-primary" />

            <span className="text-[9px] sm:text-[10px] font-semibold text-foreground tracking-wide uppercase">
              India&apos;s Premier Curated Stays
            </span>
          </span>

          <h1 className="heading-organic text-xl leading-[1.2] sm:text-2xl lg:text-3xl xl:text-[2rem] text-foreground mb-3 max-w-xl">
            Stays You&apos;ll Fall In Love With{" "}
            <span className="text-primary">From the First Glance</span>
          </h1>

          <p className="text-muted text-[13px] sm:text-sm max-w-lg mb-5 leading-relaxed">
            Architect-inspected properties, warm local hospitality, and
            experiences designed to feel like home — curated across India&apos;s
            most beautiful destinations.
          </p>
        </div>

        {/* ============================================
            RIGHT: PLAYABLE VIDEO
        ============================================ */}
        <div className="relative w-full lg:max-w-[500px] lg:ml-auto animate-fade-in">
          <div className="w-full h-36 sm:h-44 lg:h-[240px] overflow-hidden rounded-[28px] shadow-organic">
            <video
              src="/motion-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Search bar spans the full container width, below the hero grid. */}
      <div className="relative container-page mt-6 lg:mt-8">
        <HeroSearchBar />
      </div>

    </section>
  );
}

// ============================================
// AI TRIP PLANNER SECTION
// ============================================
function AiPlannerSection() {
  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="container-page">
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
              Describe your trip in one line — get a day-by-day itinerary, built
              by AI.
            </p>
          </div>

          <span className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold bg-white text-sage rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors whitespace-nowrap shrink-0">
            <Sparkles size={13} />
            Plan with AI
          </span>
        </Link>
      </div>
    </section>
  );
}

// ============================================
// EXPLORE STAYS SECTION — heading is owned by
// StaysExplorer itself, so nothing is rendered
// here besides the explorer.
// ============================================
function ExploreStaysSection() {
  return (
    <section
      id="explore-stays"
      className="py-5 md:py-7 bg-background scroll-mt-12"
    >
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

        <DestinationsSection />

        <SeedBallMissionSection />
      </main>

      <Footer />
    </>
  );
}
