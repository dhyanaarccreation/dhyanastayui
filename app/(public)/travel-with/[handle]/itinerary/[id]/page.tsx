"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Clock,
  IndianRupee,
  Heart,
  Home,
  Sparkles,
  UtensilsCrossed,
  Ticket,
  Car,
  ChevronRight,
  ChevronDown,
  Map as MapIcon,
  BadgeCheck,
  Users,
  Quote,
  Lightbulb,
  ArrowRight,
  Film,
} from "lucide-react";
import {
  influencerProfile,
  curatorIdentity,
  itineraries,
  curatedStays,
  riyaTravelStory,
  type StopType,
  type ItineraryDay,
  type ItineraryStop,
  type CuratorTravelStory,
} from "@/lib/influencer-data";
import {
  vjSiddhuProfile,
  vjSiddhuItineraries,
  vjSiddhuCuratedStays,
  vjSiddhuTravelStory,
  DEMO_DATA_NOTICE,
} from "@/lib/travel-guides-data";
import { buildAIPlannerHref } from "@/lib/planner-link";
import TripVideoCard, { type VideoPlatform } from "@/app/components/TripVideoCard";

// ============================================
// PUBLIC — Travel Guide Experience Page
// "Come and experience {region} through the eyes
// of this Travel Curator." The traveller watches
// the trip (day-by-day video journey), reads the
// curator's own story, then explores the structured
// itinerary — each stop connected back to its video —
// before opening the AI Planner to make it their own.
//
// Resolves both the curator and the itinerary from
// the URL (handle + id) — each curator has their own
// itineraries + curated-stays list + travel story.
// ============================================

interface RecommendedStay {
  id: string;
  propertySlug: string;
  name: string;
  location: string;
  image: string;
  price: number;
}

interface PublicItinerary {
  id: string;
  title: string;
  region: string;
  durationLabel: string;
  coverImage: string;
  days: ItineraryDay[];
  estimatedCost: string;
  saves: number;
}

interface CuratorContext {
  displayName: string;
  handle: string;
  avatar?: string;
  intro: string;
  itineraries: PublicItinerary[];
  curatedStays: RecommendedStay[];
  story: CuratorTravelStory;
  instagramUrl?: string;
  youtubeUrl?: string;
  isRealPerson: boolean;
}

const stopIcon: Record<StopType, typeof Home> = {
  Stay: Home,
  Experience: Sparkles,
  Food: UtensilsCrossed,
  Activity: Ticket,
  Transport: Car,
};

const stopDuration: Record<StopType, string> = {
  Stay: "Overnight stay",
  Experience: "~2–3 hrs",
  Food: "~1 hr",
  Activity: "~1.5–2 hrs",
  Transport: "~30–45 min",
};

const curatorContexts: Record<string, CuratorContext> = {
  [curatorIdentity.handle]: {
    displayName: influencerProfile.name,
    handle: curatorIdentity.handle,
    avatar: influencerProfile.avatar,
    intro: influencerProfile.bio,
    itineraries,
    curatedStays,
    story: riyaTravelStory,
    instagramUrl: "https://www.instagram.com/riyatravels",
    youtubeUrl: "https://www.youtube.com/@riyamalhotratravels",
    isRealPerson: false,
  },
  [vjSiddhuProfile.handle]: {
    displayName: vjSiddhuProfile.name,
    handle: vjSiddhuProfile.handle,
    avatar: vjSiddhuProfile.avatar,
    intro: vjSiddhuProfile.intro,
    itineraries: vjSiddhuItineraries,
    curatedStays: vjSiddhuCuratedStays,
    story: vjSiddhuTravelStory,
    instagramUrl: "https://www.instagram.com/vjsiddhu_vlogs",
    isRealPerson: true,
  },
};

const dayPlatform = (idx: number): VideoPlatform => (idx % 2 === 0 ? "youtube" : "instagram");

function dayHighlights(day: ItineraryDay): StopType[] {
  const seen = new Set<StopType>();
  const list: StopType[] = [];
  day.stops.forEach((s) => {
    if (!seen.has(s.type)) {
      seen.add(s.type);
      list.push(s.type);
    }
  });
  return list;
}

function matchStay(stop: ItineraryStop, stays: RecommendedStay[]): RecommendedStay | undefined {
  if (stop.type !== "Stay") return undefined;
  return stays.find((s) => stop.label.includes(s.name));
}

export default function PublicItineraryPage() {
  const params = useParams();
  const handleParam = params?.handle as string;
  const itineraryId = params?.id as string;

  const ctx = curatorContexts[handleParam] ?? curatorContexts[curatorIdentity.handle];
  const itinerary = ctx.itineraries.find((it) => it.id === itineraryId) || ctx.itineraries[0];

  const [saved, setSaved] = useState(false);
  const [openStop, setOpenStop] = useState<string | null>(null);

  const recommendedStays = ctx.curatedStays.filter((s) =>
    itinerary.days.some((d) => d.stops.some((stop) => stop.type === "Stay" && stop.label.includes(s.name)))
  );
  const fallbackStays = recommendedStays.length > 0 ? recommendedStays : ctx.curatedStays.slice(0, 3);
  const aiPlannerHref = buildAIPlannerHref(ctx.displayName, ctx.handle, itinerary);
  const cityName = itinerary.region.split(/[,&]/)[0].trim();

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs text-subtle">
          <Link href={`/travel-with/${ctx.handle}`} className="hover:text-foreground transition-colors">
            Travel with {ctx.displayName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-muted truncate">{itinerary.title}</span>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 mt-4">
        <div className="relative h-64 sm:h-96 rounded-[28px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={itinerary.coverImage} alt={itinerary.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium mb-2.5">
              {ctx.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ctx.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-sage flex items-center justify-center text-[8px] font-bold">
                  {ctx.displayName.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
              )}
              Travel Guide by {ctx.displayName} <BadgeCheck size={11} className="text-sage" />
            </span>
            <h1 className="heading-organic text-xl sm:text-3xl text-white">{itinerary.title}</h1>
            <p className="text-white/80 text-sm mt-1.5 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={13} /> {itinerary.region}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {itinerary.durationLabel}</span>
              <span className="flex items-center gap-1"><IndianRupee size={13} /> {itinerary.estimatedCost}</span>
            </p>
          </div>
        </div>

        {/* Influencer profile bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5">
          <div className="flex items-center gap-3 min-w-0">
            {ctx.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={ctx.avatar} alt={ctx.displayName} className="w-11 h-11 rounded-full object-cover border border-border shrink-0" />
            ) : (
              <span className="w-11 h-11 rounded-full bg-sage/15 text-sage flex items-center justify-center text-sm font-bold shrink-0">
                {ctx.displayName.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </span>
            )}
            <p className="text-sm text-muted italic leading-snug min-w-0">
              Explore how {ctx.displayName} experienced {cityName} — from the stay and local food to the places they explored.
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-muted shrink-0">
            <Users size={13} /> {itinerary.saves.toLocaleString("en-IN")} travellers saved this guide
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 mt-4">
          <Link
            href={aiPlannerHref}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-organic hover:bg-primary-hover transition-colors"
          >
            <Sparkles size={15} /> Open in AI Planner
          </Link>
          <button
            onClick={() => setSaved((v) => !v)}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-full border transition-colors ${
              saved ? "bg-terracotta/10 border-terracotta/40 text-terracotta" : "border-border text-muted hover:text-foreground"
            }`}
          >
            <Heart size={15} className={saved ? "fill-current" : ""} /> {saved ? "Saved" : "Save Guide"}
          </button>
        </div>
      </div>

      {/* ================= EXPERIENCE THE TRIP ================= */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 mt-14">
        <div className="flex items-end justify-between gap-3 flex-wrap mb-7">
          <div>
            <span className="text-xs font-semibold text-sage uppercase tracking-widest flex items-center gap-1.5">
              <Film size={12} /> Experience the Trip
            </span>
            <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-1.5">
              Watch how {ctx.displayName} explored {itinerary.region}
            </h2>
          </div>
          <p className="text-xs text-subtle max-w-xs">
            See the trip first, day by day — then explore the itinerary behind it.
          </p>
        </div>

        <div className="space-y-8">
          {itinerary.days.map((d, idx) => {
            const platform = dayPlatform(idx);
            const profileUrl = platform === "instagram" ? ctx.instagramUrl : ctx.youtubeUrl;
            const highlights = dayHighlights(d);
            return (
              <div key={d.day} id={`day-${d.day}-video`} className="flex gap-4 sm:gap-6 scroll-mt-20">
                {/* Timeline rail */}
                <div className="hidden sm:flex flex-col items-center shrink-0 pt-1.5">
                  <span className="w-9 h-9 rounded-full bg-sage text-white text-xs font-bold flex items-center justify-center">
                    {String(d.day).padStart(2, "0")}
                  </span>
                  {idx < itinerary.days.length - 1 && <span className="w-px flex-1 bg-border mt-2" />}
                </div>

                <div className="flex-1 min-w-0 pb-1">
                  <p className="text-[11px] font-semibold text-sage uppercase tracking-widest sm:hidden mb-2">
                    Day {String(d.day).padStart(2, "0")}
                  </p>
                  <p className="text-base font-semibold text-foreground mb-3">Day {d.day} — {d.title}</p>

                  <div className="grid sm:grid-cols-[1fr_260px] gap-5">
                    <TripVideoCard
                      label={`Day ${d.day} — ${d.title}`}
                      thumbnail={itinerary.coverImage}
                      platform={platform}
                      curatorName={ctx.displayName}
                      profileUrl={profileUrl}
                    />
                    <div className="min-w-0">
                      {d.summary && <p className="text-sm text-muted leading-relaxed">{d.summary}</p>}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {highlights.map((type) => {
                          const Icon = stopIcon[type];
                          return (
                            <span
                              key={type}
                              className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-sage/10 text-sage font-medium"
                            >
                              <Icon size={10} /> {type}
                            </span>
                          );
                        })}
                      </div>
                      <a
                        href={`#day-${d.day}-itinerary`}
                        className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-primary hover:underline"
                      >
                        Explore Day {d.day} <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= INFLUENCER'S STORY ================= */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 mt-16">
        <span className="text-xs font-semibold text-sage uppercase tracking-widest">Their Story</span>
        <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-1.5 mb-6">
          How {ctx.displayName} Experienced {cityName}
        </h2>

        <div className="rounded-2xl bg-surface border border-border p-6 sm:p-8">
          <Quote size={22} className="text-sage/40 mb-2" />
          <p className="text-base sm:text-lg text-foreground leading-relaxed">{ctx.story.whyThisDestination}</p>

          <div className="grid sm:grid-cols-3 gap-4 mt-7">
            <div className="rounded-xl bg-background border border-border p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-subtle mb-1.5">Favourite Stay</p>
              <p className="text-sm text-muted leading-relaxed">{ctx.story.favouriteStay}</p>
            </div>
            <div className="rounded-xl bg-background border border-border p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-subtle mb-1.5">Favourite Experience</p>
              <p className="text-sm text-muted leading-relaxed">{ctx.story.favouriteExperience}</p>
            </div>
            <div className="rounded-xl bg-background border border-border p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-subtle mb-1.5">Favourite Food</p>
              <p className="text-sm text-muted leading-relaxed">{ctx.story.favouriteFood}</p>
            </div>
          </div>

          <div className="rounded-xl bg-sage/10 border border-sage/25 p-4 mt-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sage mb-1.5">What Surprised Them</p>
            <p className="text-sm text-foreground leading-relaxed">{ctx.story.whatSurprisedThem}</p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-subtle mb-3 flex items-center gap-1.5">
              <Lightbulb size={12} className="text-primary" /> Travel Tips
            </p>
            <ul className="space-y-2">
              {ctx.story.travelTips.map((tip, i) => (
                <li key={i} className="text-sm text-muted flex items-start gap-2">
                  <span className="text-primary mt-0.5">·</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {ctx.isRealPerson && <p className="text-[11px] text-subtle mt-3">{DEMO_DATA_NOTICE}</p>}
      </div>

      {/* ================= COMPLETE ITINERARY ================= */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_320px] gap-8 mt-16">
        <div>
          <span className="text-xs font-semibold text-sage uppercase tracking-widest">Complete Itinerary</span>
          <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-1.5 mb-6">
            {ctx.displayName}&rsquo;s {cityName} Journey
          </h2>

          <div className="space-y-4">
            {itinerary.days.map((d) => (
              <div key={d.day} id={`day-${d.day}-itinerary`} className="rounded-2xl border border-border bg-surface p-5 scroll-mt-20">
                <p className="text-sm font-semibold text-foreground">Day {d.day} — {d.title}</p>
                <div className="mt-3 space-y-1.5">
                  {d.stops.map((stop, i) => {
                    const Icon = stopIcon[stop.type];
                    const key = `${d.day}-${i}`;
                    const isOpen = openStop === key;
                    const relatedStay = matchStay(stop, ctx.curatedStays);
                    return (
                      <div key={i} className="rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenStop(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          className="w-full flex items-start gap-2.5 py-2 text-left hover:bg-background/60 rounded-xl transition-colors px-1"
                        >
                          <span className="w-7 h-7 rounded-lg bg-sage/10 text-sage flex items-center justify-center shrink-0">
                            <Icon size={13} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-foreground">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle mr-1.5">{stop.type}</span>
                              {stop.label}
                            </p>
                            {stop.notes && <p className="text-xs text-subtle italic mt-0.5">{stop.notes}</p>}
                          </div>
                          <ChevronDown
                            size={14}
                            className={`text-subtle shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {isOpen && (
                          <div className="ml-9 mr-1 mb-2.5 rounded-xl bg-background border border-border p-3.5 flex gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={relatedStay?.image ?? itinerary.coverImage}
                              alt=""
                              className="w-16 h-16 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0 text-xs text-muted space-y-1">
                              <p className="text-foreground leading-relaxed">
                                {stop.notes ?? `Part of Day ${d.day} — ${d.title}, curated by ${ctx.displayName}.`}
                              </p>
                              <p className="flex items-center gap-1"><MapPin size={10} /> {itinerary.region}</p>
                              <p className="flex items-center gap-1"><Clock size={10} /> {stopDuration[stop.type]}</p>
                              {relatedStay && (
                                <Link
                                  href={`/stays/${relatedStay.propertySlug}`}
                                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                                >
                                  <Home size={10} /> {relatedStay.name} <ArrowRight size={10} />
                                </Link>
                              )}
                              <a href={`#day-${d.day}-video`} className="inline-flex items-center gap-1 text-sage font-medium hover:underline">
                                <Film size={10} /> Watch this in the Day {d.day} video
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-sage uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <MapIcon size={12} /> Route Map
            </p>
            <div className="h-56 rounded-2xl bg-surface border border-border flex items-center justify-center">
              <div className="text-center">
                <MapIcon size={24} className="text-subtle mx-auto mb-2" />
                <p className="text-xs text-subtle">Interactive map (Google Maps / Mapbox) placeholder.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended stays */}
        <aside>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-sage uppercase tracking-widest mb-4">
            <Sparkles size={11} /> Inspired by {ctx.displayName}&rsquo;s guide
          </span>
          <p className="text-xs font-semibold text-sage uppercase tracking-widest mb-4 sm:hidden">Recommended Stays</p>
          <div className="space-y-3">
            {fallbackStays.map((s) => (
              <Link
                key={s.id}
                href={`/stays/${s.propertySlug}`}
                className="group flex gap-3 rounded-2xl bg-surface border border-border p-2.5 hover:border-primary/40 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{s.name}</p>
                  <p className="text-[11px] text-subtle flex items-center gap-1 mt-0.5"><MapPin size={10} /> {s.location}</p>
                  <p className="text-xs font-semibold text-foreground mt-1">₹{s.price.toLocaleString("en-IN")}<span className="text-[10px] font-normal text-subtle">/night</span></p>
                </div>
              </Link>
            ))}
          </div>

          <div className="rounded-2xl bg-sage/10 border border-sage/25 p-4 mt-5">
            <p className="text-xs text-foreground leading-relaxed">
              Open this guide in the AI Planner to personalise the dates, budget and stays, then book directly — {ctx.displayName} earns a small commission that keeps their curated content going.
            </p>
          </div>
          <Link
            href="/#explore-stays"
            className="block text-center mt-3 px-5 py-2.5 text-xs font-semibold border border-border rounded-full text-muted hover:text-foreground hover:border-border-light transition-colors"
          >
            Or book this trip as-is
          </Link>
        </aside>
      </div>

      {/* ================= FINAL CTA ================= */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 mt-16">
        <div className="rounded-2xl bg-sage p-8 sm:p-10 text-center">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles size={12} /> From Inspiration to Your Own Trip
          </p>
          <h3 className="heading-organic text-xl sm:text-2xl text-white mt-2">
            Don&rsquo;t just read the itinerary — make this trip yours.
          </h3>
          <p className="text-white/75 text-sm mt-2 max-w-md mx-auto">
            The AI Planner keeps {ctx.displayName}&rsquo;s best picks and personalises the rest — dates, budget, pace and who&rsquo;s coming.
          </p>
          <Link
            href={aiPlannerHref}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 text-sm font-semibold bg-white text-sage rounded-full shadow-organic hover:-translate-y-0.5 transition-all"
          >
            <Sparkles size={15} /> Make This Trip Yours
          </Link>
        </div>
      </div>
    </div>
  );
}
