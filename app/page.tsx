import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ServicesSection, { SpotlightSection } from "./components/ServicesSection";
import DestinationsSection from "./components/DestinationsSection";
import {
  Search,
  Star,
  ArrowRight,
  MapPin,
  Users,
  Quote,
  CalendarDays,
  Sparkles,
  Bot,
  Clock,
  Leaf,
  Heart,
  ShieldCheck,
} from "lucide-react";
import {
  categories,
  experiences,
  testimonials,
  blogPosts,
} from "@/lib/mock-data";

// ============================================
// HERO SECTION — Organic Minimalism
// ============================================
function HeroSection() {
  const features = [
    { icon: ShieldCheck, label: "Architect Curated" },
    { icon: Heart, label: "Loved by Guests" },
    { icon: Leaf, label: "Sustainably Built" },
  ];

  return (
    <section className="relative bg-background pt-32 md:pt-40 pb-10 overflow-hidden">
      {/* Decorative soft blobs */}
      <div className="absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full bg-sage/15 blur-3xl pointer-events-none" />
      <div className="absolute top-24 -right-32 w-[380px] h-[380px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: copy */}
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface shadow-organic mb-6">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
              India&apos;s Premier Curated Stays
            </span>
          </span>

          <h1 className="heading-organic text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 max-w-xl">
            Stays You&apos;ll Fall In Love With{" "}
            <span className="text-primary">From the First Glance</span>
          </h1>

          <p className="text-muted text-base lg:text-lg max-w-lg mb-8 leading-relaxed">
            Architect-inspected properties, warm local hospitality, and
            experiences designed to feel like home — curated across India&apos;s
            most beautiful destinations.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link
              href="/stays"
              className="px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-organic hover:bg-primary-hover hover:-translate-y-0.5 transition-all"
            >
              Explore Stays
            </Link>
            <Link
              href="/traveller/ai-planner"
              className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-surface border border-sage text-sage rounded-full hover:bg-sage hover:text-white transition-all"
            >
              <Sparkles size={16} />
              Plan My Trip with AI
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-2.5">
                <span className="w-11 h-11 rounded-full bg-sage/12 text-sage flex items-center justify-center">
                  <f.icon size={18} />
                </span>
                <span className="text-xs font-medium text-foreground leading-tight">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: organic blob image */}
        <div className="relative animate-fade-in">
          <div className="relative rounded-[40px] rounded-tr-[120px] overflow-hidden shadow-organic aspect-[4/5] max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1400&auto=format&fit=crop"
              alt="A curated Dhyana Stays property nestled in nature"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* floating badge */}
          <div className="absolute bottom-6 -left-2 sm:left-4 bg-surface rounded-[24px] shadow-organic px-5 py-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-sage/15 text-sage flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">
                100% Curated
              </p>
              <p className="text-[11px] text-muted">Every stay inspected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating search bar */}
      <div className="relative max-w-4xl mx-auto px-6 mt-16 lg:mt-20">
        <div className="bg-surface rounded-[28px] shadow-organic p-2 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-stretch gap-2">
            <div className="flex-1 flex items-center gap-3 px-5 py-3 rounded-[18px] bg-background">
              <Search size={18} className="text-subtle shrink-0" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full bg-transparent text-foreground placeholder-subtle text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-[18px] bg-background">
              <CalendarDays size={18} className="text-subtle shrink-0" />
              <span className="text-sm text-subtle whitespace-nowrap">
                Check-in — Check-out
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-[18px] bg-background">
              <Users size={18} className="text-subtle shrink-0" />
              <span className="text-sm text-subtle">Guests</span>
            </div>
            <Link
              href="/stays"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-[18px] hover:bg-primary-hover transition-colors whitespace-nowrap"
            >
              <Search size={16} />
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// AI TRIP PLANNER SECTION
// ============================================
function AiPlannerSection() {
  const promptChips = [
    "Peaceful farm stay near Auroville for 2 days",
    "Family weekend under ₹15,000",
    "Pet-friendly stay with a pool",
  ];
  const preview = [
    { time: "6:30 AM", title: "Sunrise yoga at the stay", state: "done" },
    { time: "11:00 AM", title: "Matrimandir & Auroville tour", state: "now" },
    { time: "4:30 PM", title: "Cycle to Serenity Beach", state: "next" },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="rounded-[32px] bg-sage overflow-hidden shadow-organic">
          <div className="grid lg:grid-cols-2 gap-10 items-center p-8 md:p-12">
            {/* Left: pitch + prompt */}
            <div>
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest flex items-center gap-1.5">
                <Bot size={14} /> AI Trip Planner
              </span>
              <h2 className="heading-organic text-3xl lg:text-5xl text-white mt-3">
                Tell Us the Trip. We Build the Plan.
              </h2>
              <p className="text-white/80 mt-4 leading-relaxed max-w-lg">
                Describe your dream trip in one line — the AI shortlists stays that
                match your preferences, builds a day-by-day itinerary, tracks you
                through the trip, reschedules when you run late, and keeps SOS help
                one tap away.
              </p>

              {/* Prompt input (opens the planner) */}
              <Link
                href="/traveller/ai-planner"
                className="mt-7 flex items-center gap-3 rounded-[20px] bg-white p-2 pl-5 shadow-organic hover:-translate-y-0.5 transition-all group"
              >
                <Sparkles size={16} className="text-sage shrink-0" />
                <span className="flex-1 text-sm text-neutral-500 truncate">
                  Describe your dream trip — &ldquo;quiet mountain cabin for two, fast wifi…&rdquo;
                </span>
                <span className="px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-2xl group-hover:bg-primary-hover transition-colors whitespace-nowrap">
                  Plan with AI
                </span>
              </Link>
              <div className="flex flex-wrap gap-2 mt-4">
                {promptChips.map((c) => (
                  <Link
                    key={c}
                    href="/traveller/ai-planner"
                    className="px-3.5 py-1.5 text-xs text-white/85 border border-white/25 rounded-full hover:bg-white/10 transition-colors"
                  >
                    &ldquo;{c}&rdquo;
                  </Link>
                ))}
              </div>
              <p className="text-[11px] text-white/60 mt-5 flex items-center gap-1.5">
                <Bot size={11} />
                Also available on every page — tap the AI Planner button at the bottom right.
              </p>
            </div>

            {/* Right: live itinerary preview */}
            <div className="relative">
              <div className="rounded-[24px] bg-white shadow-organic p-5 max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-neutral-800">Auroville Escape · Day 2</p>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-sage uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" /> Live tracking
                  </span>
                </div>
                {preview.map((p, i) => (
                  <div key={p.title} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                          p.state === "done"
                            ? "bg-neutral-100 text-neutral-400"
                            : p.state === "now"
                            ? "bg-sage text-white"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {i + 1}
                      </span>
                      {i < preview.length - 1 && <span className="w-px flex-1 bg-neutral-200 my-1" />}
                    </div>
                    <div className={`pb-4 ${p.state === "done" ? "opacity-50" : ""}`}>
                      <p className="text-[10px] text-neutral-400 tabular-nums flex items-center gap-1">
                        <Clock size={9} /> {p.time}
                        {p.state === "now" && (
                          <span className="ml-1 text-[8px] font-bold uppercase text-sage bg-sage/15 px-1.5 py-0.5 rounded-full">Now</span>
                        )}
                      </p>
                      <p className="text-sm text-neutral-800 font-medium mt-0.5">{p.title}</p>
                    </div>
                  </div>
                ))}
                <div className="rounded-[14px] bg-terracotta/10 px-3.5 py-2.5 text-[11px] text-neutral-500">
                  Running 30 min late — <span className="text-terracotta font-semibold">auto-rescheduled</span> your beach ride &amp; dinner.
                </div>
              </div>
              {/* floating chip */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary shadow-organic text-xs font-semibold text-primary-foreground whitespace-nowrap">
                <Sparkles size={12} /> 96% match with your preferences
              </div>
            </div>
          </div>
        </div>
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
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-xs font-semibold text-sage uppercase tracking-widest">
              Explore
            </span>
            <h2 className="heading-organic text-3xl lg:text-5xl text-foreground mt-2">
              Find Your Perfect Escape
            </h2>
          </div>
          <Link
            href="/stays"
            className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 stagger-children">
          {categories.slice(0, 12).map((cat) => (
            <Link
              key={cat.slug}
              href={`/stays?category=${cat.slug}`}
              className="group p-6 rounded-[28px] bg-surface card-hover text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  src={iconMap[cat.icon]}
                  alt=""
                  aria-hidden="true"
                  className="w-14 h-14 object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:rotate-[-4deg]"
                />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-subtle">{cat.count} stays</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXPERIENCES SECTION
// ============================================
function ExperiencesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-xs font-semibold text-sage uppercase tracking-widest">
              Beyond Stays
            </span>
            <h2 className="heading-organic text-3xl lg:text-5xl text-foreground mt-2">
              Curated Experiences
            </h2>
            <p className="text-muted mt-3 max-w-lg">
              Yoga at dawn, pottery with local artisans, farm-to-table cooking —
              your stay is just the beginning.
            </p>
          </div>
          <Link
            href="/experiences"
            className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline"
          >
            All Experiences <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="group rounded-[28px] overflow-hidden bg-surface card-hover"
            >
              <div className="relative h-48 overflow-hidden bg-surface-hover">
                <img loading="lazy"
                  src={exp.image}
                  alt={exp.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-wider bg-white/85 backdrop-blur-sm text-sage rounded-full">
                    {exp.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {exp.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted mb-3">
                  <MapPin size={12} />
                  {exp.location}
                  <span className="text-border">·</span>
                  {exp.duration}
                </div>
                <p className="text-xs text-subtle line-clamp-2 mb-4">
                  {exp.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star
                      size={12}
                      className="text-primary fill-primary"
                    />
                    <span className="text-xs font-medium text-foreground">
                      {exp.rating}
                    </span>
                    <span className="text-xs text-subtle">
                      ({exp.reviewCount})
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    ₹{exp.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


// ============================================
// TESTIMONIALS SECTION
// ============================================
function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-sage uppercase tracking-widest">
            Guest Stories
          </span>
          <h2 className="heading-organic text-3xl lg:text-5xl text-foreground mt-2">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-[28px] bg-surface card-hover relative"
            >
              <Quote
                size={32}
                className="text-sage/20 absolute top-6 right-6"
              />
              <div className="flex items-center gap-3 mb-6">
                <img loading="lazy"
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {t.name}
                  </h4>
                  <p className="text-xs text-subtle">{t.location}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-primary fill-primary"
                  />
                ))}
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">
                &ldquo;{t.comment}&rdquo;
              </p>
              <p className="text-xs text-subtle">
                Stayed at{" "}
                <span className="text-sage font-medium">{t.stayName}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// BLOG SECTION
// ============================================
function BlogSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-xs font-semibold text-sage uppercase tracking-widest">
              Stories & Inspiration
            </span>
            <h2 className="heading-organic text-3xl lg:text-5xl text-foreground mt-2">
              From the Journal
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline"
          >
            All Articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-[28px] overflow-hidden bg-surface card-hover"
            >
              <div className="relative h-44 overflow-hidden bg-surface-hover">
                <img loading="lazy"
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-medium text-sage uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-sm font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-subtle line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-subtle">
                  <span>{post.date}</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* For Hosts */}
          <div className="relative rounded-[32px] overflow-hidden p-10 lg:p-14 bg-primary shadow-organic group">
            <div className="relative z-10">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                For Property Owners
              </span>
              <h3 className="heading-organic text-2xl lg:text-4xl text-white mt-3 mb-4">
                List Your Stay
              </h3>
              <p className="text-sm text-white/85 mb-8 max-w-sm leading-relaxed">
                Join India&apos;s most prestigious curated stays network. Our
                architecture team will inspect, score, and elevate your property.
              </p>
              <Link
                href="/host/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold text-sm rounded-full shadow-organic hover:-translate-y-0.5 transition-all"
              >
                Apply as Host <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* For Investors */}
          <div className="relative rounded-[32px] overflow-hidden p-10 lg:p-14 bg-sage shadow-organic group">
            <div className="relative z-10">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                For Investors
              </span>
              <h3 className="heading-organic text-2xl lg:text-4xl text-white mt-3 mb-4">
                Invest in Hospitality
              </h3>
              <p className="text-sm text-white/85 mb-8 max-w-sm leading-relaxed">
                Fractional ownership of curated stays with transparent ROI
                tracking, professional management, and monthly revenue
                distribution.
              </p>
              <Link
                href="/investor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sage font-semibold text-sm rounded-full shadow-organic hover:-translate-y-0.5 transition-all"
              >
                Explore Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
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
        <SpotlightSection />
        <AiPlannerSection />
        <CategoriesSection />
        <ServicesSection />
        <DestinationsSection />
        <ExperiencesSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
