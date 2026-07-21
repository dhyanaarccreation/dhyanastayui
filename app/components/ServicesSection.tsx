"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Home,
  Utensils,
  PartyPopper,
  CalendarDays,
  Bike,
  Backpack,
  ArrowRight,
  Star,
  MapPin,
  Minus,
  Plus,
  Leaf,
  ChefHat,
  Ticket,
  ShieldCheck,
  Megaphone,
  Sparkles,
  BadgePercent,
} from "lucide-react";
import {
  properties,
  foodMenu,
  eventPlanners,
  localEvents,
  rentalVehicles,
  hostels,
} from "@/lib/mock-data";
import PropertyCard from "./PropertyCard";

// ============================================
// HOMEPAGE SERVICES HUB
// Replaces the single "Featured Stays" block with
// a tabbed hub so new visitors can see every
// Dhyana service at a glance.
// ============================================

const tabs = [
  { key: "stays", label: "Curated Stays", icon: Home },
  { key: "food", label: "Curated Food", icon: Utensils },
  { key: "planners", label: "Event Planners", icon: PartyPopper },
  { key: "events", label: "Events & Workshops", icon: CalendarDays },
  { key: "vehicles", label: "Vehicle Rentals", icon: Bike },
  { key: "hostels", label: "Hostels & Budget", icon: Backpack },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const viewAll: Record<TabKey, { href: string; label: string }> = {
  stays: { href: "/stays", label: "View all stays" },
  food: { href: "/food", label: "Explore curated food" },
  planners: { href: "/event-planners", label: "All event planners" },
  events: { href: "/experiences", label: "All events & workshops" },
  vehicles: { href: "/bike-rental", label: "All rentals" },
  hostels: { href: "/stays?category=hostels", label: "All budget stays" },
};

export default function ServicesSection() {
  const [tab, setTab] = useState<TabKey>("stays");
  // Food pre-booking state: quantity + chosen cook per dish
  const [qty, setQty] = useState<Record<string, number>>({});
  const [cook, setCook] = useState<Record<string, string>>({});

  const getQty = (id: string) => qty[id] ?? 1;
  const changeQty = (id: string, d: number) =>
    setQty((p) => ({ ...p, [id]: Math.min(20, Math.max(1, getQty(id) + d)) }));

  const featured = properties.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
      <div className="rounded-[32px] bg-surface-hover p-6 md:p-10 lg:p-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-sage uppercase tracking-widest">
              One platform · Every experience
            </span>
            <h2 className="heading-organic text-3xl lg:text-5xl text-foreground mt-2">
              Explore Dhyana Services
            </h2>
            <p className="text-muted mt-3 max-w-lg">
              Stays, food, events, rides and budget beds — everything curated,
              inspected and bookable in one place.
            </p>
          </div>
          <Link
            href={viewAll[tab].href}
            className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline shrink-0"
          >
            {viewAll[tab].label} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-10 -mx-1 px-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                tab === key
                  ? "bg-primary text-primary-foreground border-primary shadow-organic"
                  : "bg-surface border-border text-muted hover:text-foreground hover:border-border-light"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* ============ STAYS ============ */}
        {tab === "stays" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* ============ FOOD (pre-book: qty + cook) ============ */}
        {tab === "food" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {foodMenu.map((f) => (
              <div
                key={f.id}
                className="rounded-[28px] overflow-hidden bg-surface card-hover flex flex-col"
              >
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy"
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                    {f.veg && <Leaf size={10} className="text-sage" />}
                    {f.cuisine}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {f.name}
                    </p>
                    <p className="text-sm font-bold text-foreground whitespace-nowrap">
                      ₹{f.pricePerPlate}
                    </p>
                  </div>
                  <p className="text-xs text-subtle mt-0.5">
                    Serves {f.serves}
                  </p>

                  {/* Choose your cook */}
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-subtle mt-3 mb-1.5 flex items-center gap-1">
                    <ChefHat size={11} /> Choose your cook
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {f.cooks.map((c) => {
                      const selected = (cook[f.id] ?? f.cooks[0].name) === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() =>
                            setCook((p) => ({ ...p, [f.id]: c.name }))
                          }
                          title={c.specialty}
                          className={`flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full border text-xs transition-colors ${
                            selected
                              ? "border-sage bg-sage/15 text-foreground"
                              : "border-border text-muted hover:border-border-light"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img loading="lazy"
                            src={c.avatar}
                            alt={c.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          {c.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quantity + pre-book */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-hover">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => changeQty(f.id, -1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full border border-border text-muted hover:text-foreground hover:border-border-light flex items-center justify-center transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-foreground tabular-nums">
                        {getQty(f.id)}
                      </span>
                      <button
                        onClick={() => changeQty(f.id, 1)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full border border-border text-muted hover:text-foreground hover:border-border-light flex items-center justify-center transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <Link
                      href="/food"
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
                    >
                      Pre-book · ₹{f.pricePerPlate * getQty(f.id)}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============ EVENT PLANNERS ============ */}
        {tab === "planners" && (
          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {eventPlanners.map((ep) => (
              <div
                key={ep.id}
                className="rounded-[28px] overflow-hidden bg-surface card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy"
                    src={ep.image}
                    alt={ep.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-white/85 backdrop-blur-sm text-sage rounded-full">
                    {ep.type}
                  </span>
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                    <Star size={11} className="text-primary fill-primary" />
                    {ep.rating}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-base font-semibold text-foreground">
                      {ep.name}
                    </p>
                    <ShieldCheck size={14} className="text-sage" />
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {ep.eventsDone}+ events curated with Dhyana
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {ep.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-hover">
                    <p className="text-xs text-muted">
                      From{" "}
                      <span className="text-sm font-bold text-foreground">
                        ₹{ep.startingPrice.toLocaleString("en-IN")}
                      </span>
                    </p>
                    <Link
                      href={`/event-planners/${ep.id}`}
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      View &amp; Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============ LOCAL EVENTS & WORKSHOPS ============ */}
        {tab === "events" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {localEvents.map((le) => (
              <div
                key={le.id}
                className="rounded-[28px] overflow-hidden bg-surface card-hover"
              >
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy"
                    src={le.image}
                    alt={le.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-background/85 backdrop-blur-sm text-foreground rounded-full">
                    {le.date}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-1 text-[10px] font-medium bg-primary/90 text-primary-foreground rounded-full">
                    {le.kind}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {le.title}
                  </p>
                  <p className="text-xs text-muted mt-1 flex items-center gap-1">
                    <MapPin size={10} /> {le.venue}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-hover">
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        ₹{le.price}
                      </p>
                      <p className="text-[10px] text-terracotta font-medium">
                        {le.spotsLeft} spots left
                      </p>
                    </div>
                    <Link
                      href="/experiences"
                      className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
                    >
                      <Ticket size={12} /> Book spot
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============ VEHICLE RENTALS ============ */}
        {tab === "vehicles" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {rentalVehicles.map((rv) => (
              <div
                key={rv.id}
                className="rounded-[28px] overflow-hidden bg-surface card-hover"
              >
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy"
                    src={rv.image}
                    alt={rv.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                    {rv.type}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground">
                    {rv.name}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {rv.features.map((ft) => (
                      <li
                        key={ft}
                        className="text-xs text-muted flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-sage" />
                        {ft}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-hover">
                    <p className="text-xs text-muted">
                      <span className="text-sm font-bold text-foreground">
                        ₹{rv.pricePerDay}
                      </span>
                      /day
                    </p>
                    <Link
                      href="/bike-rental"
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
                    >
                      Reserve
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============ HOSTELS & BUDGET ============ */}
        {tab === "hostels" && (
          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {hostels.map((h) => (
              <div
                key={h.id}
                className="rounded-[28px] overflow-hidden bg-surface card-hover"
              >
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy"
                    src={h.image}
                    alt={h.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-sage/90 text-white rounded-full">
                    Budget friendly
                  </span>
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs bg-background/80 backdrop-blur-sm text-foreground rounded-full">
                    <Star size={11} className="text-primary fill-primary" />
                    {h.rating}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-base font-semibold text-foreground">
                    {h.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                    <MapPin size={11} /> {h.location}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {h.perks.map((pk) => (
                      <span
                        key={pk}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-muted"
                      >
                        {pk}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-hover">
                    <p className="text-xs text-muted">
                      Beds from{" "}
                      <span className="text-sm font-bold text-foreground">
                        ₹{h.bedPrice}
                      </span>
                      /night
                    </p>
                    <Link
                      href="/stays?category=hostels"
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
                    >
                      Book a bed
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile view-all */}
        <div className="mt-8 md:hidden">
          <Link
            href={viewAll[tab].href}
            className="flex items-center justify-center gap-2 text-sm text-primary"
          >
            {viewAll[tab].label} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}

// ============================================
// SPOTLIGHT AD SLOT (Module 24 — Marketing)
// A dedicated promoted space. When a partner has
// booked the slot it shows their showcase; when
// empty it falls back to AI suggestions.
// ============================================

interface SponsoredSlot {
  partner: string;
  headline: string;
  copy: string;
  offer: string;
  image: string;
  href: string;
}

// Empty the array to see the AI-suggestions fallback.
// Multiple ads play in rotation, sliding right → left.
const sponsoredAds: SponsoredSlot[] = [
  {
    partner: "Nila Wellness Retreat",
    headline: "Monsoon Wellness Week",
    copy: "Seven days of Ayurveda, yoga and forest silence in Palakkad — curated by Dr. Lakshmi Nair. Early birds save 20%.",
    offer: "20% off · Jul 20 – Aug 31",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80",
    href: "/stays/nila-wellness-retreat",
  },
  {
    partner: "Dhyana Curated Stays",
    headline: "Weekend Escapes Sale",
    copy: "Fifteen percent off architect-inspected villas, tiny houses and farm stays across Tamil Nadu — this month only.",
    offer: "15% off · Fri–Sun stays",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    href: "/stays",
  },
  {
    partner: "Meena's Kitchen · Auroville",
    headline: "Pre-book the Chettinad Feast",
    copy: "Wood-fired thalis cooked to order by Meena Akka — pick your cook, pick your quantity, served at your stay.",
    offer: "FOODIE15 · 15% off",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
    href: "/food",
  },
  {
    partner: "Saffron Knots Events",
    headline: "Destination Weddings, Curated",
    copy: "Heritage courtyards, farm lawns and beach decks — 140+ weddings planned across Dhyana properties.",
    offer: "Free venue visit",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    href: "/experiences",
  },
];

export function SpotlightSection() {
  const suggestions = [...properties]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Sliding ads: track moves right → left, one ad every 5s
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (sponsoredAds.length < 2) return;
    const t = setInterval(() => setSlide((i) => (i + 1) % sponsoredAds.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="pt-28 md:pt-32 pb-4 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {sponsoredAds.length > 0 ? (
          /* ---- Sponsored ads: right-to-left slider ---- */
          <div className="relative rounded-[32px] overflow-hidden shadow-organic">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {sponsoredAds.map((ad) => (
                <div key={ad.headline} className="relative w-full shrink-0 min-h-[300px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy"
                    src={ad.image}
                    alt={ad.headline}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
                  <div className="relative p-8 md:p-12 max-w-xl">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white/90 rounded-full border border-white/20">
                        <Megaphone size={11} /> Spotlight · Sponsored
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                        <BadgePercent size={11} /> {ad.offer}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 uppercase tracking-widest mb-1">
                      {ad.partner}
                    </p>
                    <h3 className="heading-organic text-3xl md:text-4xl text-white">
                      {ad.headline}
                    </h3>
                    <p className="text-sm text-white/80 mt-3 leading-relaxed">
                      {ad.copy}
                    </p>
                    <Link
                      href={ad.href}
                      className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                    >
                      Explore <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 right-6 z-10 flex items-center gap-2">
              {sponsoredAds.map((ad, i) => (
                <button
                  key={ad.headline}
                  onClick={() => setSlide(i)}
                  aria-label={`Show ad ${i + 1}: ${ad.headline}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slide ? "w-6 bg-primary" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
            <span className="absolute top-4 right-6 z-10 text-[9px] font-semibold uppercase tracking-wider text-white/60 tabular-nums">
              Ad {slide + 1}/{sponsoredAds.length}
            </span>
          </div>
        ) : (
          /* ---- Fallback: AI suggestions fill the slot ---- */
          <div className="rounded-[32px] bg-surface-hover shadow-organic p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={15} className="text-sage" />
              <p className="text-sm font-semibold text-foreground">
                Suggested for you
              </p>
              <span className="text-[10px] text-subtle uppercase tracking-wider">
                AI picked · based on your preferences
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {suggestions.map((p) => (
                <Link
                  key={p.id}
                  href={`/stays/${p.slug}`}
                  className="flex gap-3 rounded-[18px] bg-surface p-2.5 shadow-organic hover:-translate-y-0.5 transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy"
                    src={p.images[0]}
                    alt={p.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted flex items-center gap-1">
                      <Star size={10} className="text-primary fill-primary" />
                      {p.rating} · {p.location.city}
                    </p>
                    <p className="text-xs text-foreground font-semibold mt-1">
                      ₹{p.price.toLocaleString("en-IN")}/night
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
