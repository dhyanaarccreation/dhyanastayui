"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  BadgeCheck,
  Sparkles,
  Star,
  Camera,
  PlayCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Users,
  Compass,
} from "lucide-react";
import {
  influencerProfile,
  curatorIdentity,
  curatedStays,
  itineraries,
} from "@/lib/influencer-data";
import {
  getCuratorByHandle,
  vjSiddhuProfile,
  vjSiddhuCuratedStays,
  vjSiddhuItineraries,
  DEMO_DATA_NOTICE,
} from "@/lib/travel-guides-data";
import CuratorAvatar from "@/app/components/CuratorAvatar";

// ============================================
// PUBLIC — "Travel with [Curator]" storefront
// A Dhyana Travel Curator's public page: their
// curated stay collection and copyable day-by-day
// itineraries. This is what travellers see when
// they follow a curator's link from Instagram/YouTube.
//
// Routes per-handle: Riya Malhotra (the original,
// fully-built curator) and VJ Siddhu (the newest)
// each render their own full page below. Any other
// handle in the travel-guides directory renders a
// "guide coming soon" state — real profile/stats,
// no fabricated stays or itineraries. Unknown
// handles render a not-found state.
// ============================================

export default function TravelWithCuratorPage() {
  const params = useParams();
  const handle = params?.handle as string;

  if (handle === curatorIdentity.handle) return <RiyaCuratorPage />;
  if (handle === vjSiddhuProfile.handle) return <VjSiddhuCuratorPage />;

  const curator = getCuratorByHandle(handle);
  if (curator) return <GuideComingSoonPage curator={curator} />;
  return <CuratorNotFoundPage />;
}

// ============================================
// RIYA MALHOTRA — original curator page (unchanged
// from the first Travel Guides build; only moved
// into its own function so this file can route by
// handle instead of always rendering her data).
// ============================================
function RiyaCuratorPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(itineraries[0]?.id ?? null);

  const publishedItineraries = itineraries.filter((it) => it.status === "Published");

  const copyItinerary = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sage/15 via-background to-primary/5 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={influencerProfile.avatar}
              alt={influencerProfile.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-background shadow-organic"
            />
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/15 text-sage text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles size={11} /> {curatorIdentity.title}
              </span>
              <h1 className="heading-organic text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2 flex items-center gap-2 flex-wrap">
                Travel with {influencerProfile.name}
                <BadgeCheck size={20} className="text-sage" />
              </h1>
              <p className="text-sm text-muted mt-1.5 flex items-center gap-1.5">
                <MapPin size={13} /> {curatorIdentity.region}
              </p>
              <p className="text-sm text-muted mt-2 max-w-xl leading-relaxed">{curatorIdentity.tagline}</p>
              <div className="flex flex-wrap items-center gap-2.5 mt-3">
                {influencerProfile.socials.map((s) => (
                  <span key={s.platform} className="flex items-center gap-1.5 text-xs text-muted bg-surface border border-border rounded-full px-3 py-1.5">
                    {s.platform === "Instagram" ? <Camera size={12} /> : <PlayCircle size={12} />} {s.handle} · {s.followers}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        {/* My Stays */}
        <section className="py-10 sm:py-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-sage uppercase tracking-widest flex items-center gap-1.5">
                <Bookmark size={12} /> My Stays
              </span>
              <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-1.5">
                {curatedStays.length} Curated Stays in {curatorIdentity.region.split(" & ")[0]} & Beyond
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {curatedStays.map((s) => (
              <Link
                key={s.id}
                href={`/stays/${s.propertySlug}`}
                className="group rounded-2xl overflow-hidden bg-surface border border-border card-hover"
              >
                <div className="relative h-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{s.name}</p>
                  <p className="text-[11px] text-subtle flex items-center gap-1 mt-0.5"><MapPin size={10} /> {s.location}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.categories.map((c) => (
                      <span key={c} className="text-[9px] px-2 py-0.5 rounded-full bg-sage/10 text-sage font-medium">{c}</span>
                    ))}
                  </div>
                  {s.note && <p className="text-xs text-muted mt-2 italic line-clamp-2">&ldquo;{s.note}&rdquo;</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* My Itineraries */}
        <section className="py-10 sm:py-14 border-t border-border">
          <span className="text-xs font-semibold text-sage uppercase tracking-widest">My Itineraries</span>
          <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-1.5 mb-6">
            Ready-Made Trips You Can Copy &amp; Customise
          </h2>

          <div className="space-y-4">
            {publishedItineraries.map((it) => {
              const expanded = expandedId === it.id;
              const justCopied = copiedId === it.id;
              return (
                <div key={it.id} className="rounded-2xl border border-border bg-surface overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-36 sm:h-auto shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.coverImage} alt={it.title} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-base font-semibold text-foreground">{it.title}</p>
                          <p className="text-xs text-subtle mt-0.5 flex items-center gap-1.5">
                            <MapPin size={11} /> {it.region} · {it.durationLabel}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <Users size={11} /> {it.saves.toLocaleString("en-IN")} travellers saved this
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 mt-4">
                        <button
                          onClick={() => copyItinerary(it.id)}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                        >
                          {justCopied ? <Check size={13} /> : <Copy size={13} />}
                          {justCopied ? "Copied to your trips" : "Copy This Itinerary"}
                        </button>
                        <button
                          onClick={() => setExpandedId(expanded ? null : it.id)}
                          className="flex items-center gap-1 px-4 py-2 text-xs font-medium border border-border text-muted rounded-full hover:text-foreground transition-colors"
                        >
                          {expanded ? "Hide days" : "View day-by-day"}
                          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {expanded && (
                    <div className="px-5 pb-5 grid sm:grid-cols-3 gap-3">
                      {it.days.map((d) => (
                        <div key={d.day} className="rounded-xl bg-background border border-border p-3.5">
                          <p className="text-xs font-semibold text-foreground">Day {d.day} — {d.title}</p>
                          <ul className="mt-1.5 space-y-1">
                            {d.stops.map((stop, si) => (
                              <li key={si} className="text-xs text-muted flex items-start gap-1.5">
                                <span className="text-subtle mt-0.5">→</span>
                                <span>
                                  <span className="text-[9px] font-semibold uppercase tracking-wider text-subtle mr-1">{stop.type}</span>
                                  {stop.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {publishedItineraries.length === 0 && (
              <p className="text-sm text-subtle text-center py-10">No published itineraries yet — check back soon.</p>
            )}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-sage p-8 sm:p-10 text-center">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Star size={12} /> Curated by {influencerProfile.name}
          </p>
          <h3 className="heading-organic text-xl sm:text-2xl text-white mt-2">
            Every stay here is hand-picked. Every itinerary is trip-tested.
          </h3>
          <Link
            href="/#explore-stays"
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 text-sm font-semibold bg-white text-sage rounded-full shadow-organic hover:-translate-y-0.5 transition-all"
          >
            Explore All Dhyana Stays
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================
// VJ SIDDHU — Tamil Nadu curator page.
// Same shape as Riya's page, plus a featured-
// destinations strip his trust-building profile
// needs.
// ============================================
function VjSiddhuCuratorPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(vjSiddhuItineraries[0]?.id ?? null);

  const copyItinerary = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const p = vjSiddhuProfile;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sage/15 via-background to-primary/5 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <CuratorAvatar
              name={p.name}
              avatar={p.avatar}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-background shadow-organic text-2xl"
            />
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/15 text-sage text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles size={11} /> Dhyana Travel Curator
              </span>
              <h1 className="heading-organic text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2 flex items-center gap-2 flex-wrap">
                Explore Tamil Nadu with {p.name}
                <BadgeCheck size={20} className="text-sage" />
              </h1>
              <p className="text-sm text-muted mt-1.5 flex items-center gap-1.5">
                <MapPin size={13} /> {p.region} · {p.creatorName}
              </p>
              <p className="text-sm text-muted mt-2 max-w-xl leading-relaxed">{p.intro}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.travelStyle.map((s) => (
                  <span key={s} className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border text-muted font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        {/* Featured destinations */}
        <section className="pt-10 sm:pt-14 pb-10 sm:pb-14 border-b border-border">
          <span className="text-xs font-semibold text-sage uppercase tracking-widest flex items-center gap-1.5">
            <Compass size={12} /> Featured Destinations
          </span>
          <div className="flex flex-wrap gap-2 mt-3">
            {p.featuredDestinations.map((d) => (
              <span key={d} className="px-3 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-medium">{d}</span>
            ))}
          </div>
        </section>

        {/* Handpicked stays */}
        <section className="py-10 sm:py-14">
          <div className="mb-6">
            <span className="text-xs font-semibold text-sage uppercase tracking-widest flex items-center gap-1.5">
              <Bookmark size={12} /> My Handpicked Stays
            </span>
            <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-1.5">
              Stays I Actually Recommend
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vjSiddhuCuratedStays.map((s) => (
              <Link
                key={s.id}
                href={`/stays/${s.propertySlug}`}
                className="group rounded-2xl overflow-hidden bg-surface border border-border card-hover"
              >
                <div className="relative h-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{s.name}</p>
                  <p className="text-[11px] text-subtle flex items-center gap-1 mt-0.5"><MapPin size={10} /> {s.location}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.categories.map((c) => (
                      <span key={c} className="text-[9px] px-2 py-0.5 rounded-full bg-sage/10 text-sage font-medium">{c}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted mt-2 italic line-clamp-2">&ldquo;{s.note}&rdquo;</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Itineraries */}
        <section className="py-10 sm:py-14 border-t border-border">
          <span className="text-xs font-semibold text-sage uppercase tracking-widest">My Travel Guides</span>
          <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-1.5 mb-6">
            Ready-Made Trips You Can Copy &amp; Customise
          </h2>

          <div className="space-y-4">
            {vjSiddhuItineraries.map((it) => {
              const expanded = expandedId === it.id;
              const justCopied = copiedId === it.id;
              return (
                <div key={it.id} className="rounded-2xl border border-border bg-surface overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-36 sm:h-auto shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.coverImage} alt={it.title} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-base font-semibold text-foreground">{it.title}</p>
                          <p className="text-xs text-subtle mt-0.5 flex items-center gap-1.5">
                            <MapPin size={11} /> {it.region} · {it.durationLabel}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-muted">
                          <Users size={11} /> {it.saves.toLocaleString("en-IN")} travellers saved this
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 mt-4">
                        <button
                          onClick={() => copyItinerary(it.id)}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                        >
                          {justCopied ? <Check size={13} /> : <Copy size={13} />}
                          {justCopied ? "Copied to your trips" : `Copy ${p.name}'s Trip`}
                        </button>
                        <button
                          onClick={() => setExpandedId(expanded ? null : it.id)}
                          className="flex items-center gap-1 px-4 py-2 text-xs font-medium border border-border text-muted rounded-full hover:text-foreground transition-colors"
                        >
                          {expanded ? "Hide days" : "View day-by-day"}
                          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {expanded && (
                    <div className="px-5 pb-5 grid sm:grid-cols-3 gap-3">
                      {it.days.map((d) => (
                        <div key={d.day} className="rounded-xl bg-background border border-border p-3.5">
                          <p className="text-xs font-semibold text-foreground">Day {d.day} — {d.title}</p>
                          <ul className="mt-1.5 space-y-1">
                            {d.stops.map((stop, si) => (
                              <li key={si} className="text-xs text-muted flex items-start gap-1.5">
                                <span className="text-subtle mt-0.5">→</span>
                                <span>
                                  <span className="text-[9px] font-semibold uppercase tracking-wider text-subtle mr-1">{stop.type}</span>
                                  {stop.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-sage p-8 sm:p-10 text-center">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Star size={12} /> Curated by {p.name}
          </p>
          <h3 className="heading-organic text-xl sm:text-2xl text-white mt-2">
            Every stay here is hand-picked. Every itinerary is trip-tested.
          </h3>
          <Link
            href="/#explore-stays"
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 text-sm font-semibold bg-white text-sage rounded-full shadow-organic hover:-translate-y-0.5 transition-all"
          >
            Explore All Dhyana Stays
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DIRECTORY-ONLY CURATORS (Arjun Trails, Maya
// Wanders, Karthik On Route, Nila Eats & Travels)
// — real profile summary, honest "coming soon"
// state instead of fabricated stays/itineraries.
// ============================================
function GuideComingSoonPage({ curator }: { curator: NonNullable<ReturnType<typeof getCuratorByHandle>> }) {
  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-gradient-to-br from-sage/15 via-background to-primary/5 border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <CuratorAvatar
              name={curator.name}
              avatar={curator.avatar}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-background shadow-organic text-2xl"
            />
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/15 text-sage text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles size={11} /> Dhyana Travel Curator
              </span>
              <h1 className="heading-organic text-2xl sm:text-3xl text-foreground mt-2">{curator.name}</h1>
              <p className="text-sm text-muted mt-1.5 flex items-center gap-1.5">
                <MapPin size={13} /> {curator.region} · {curator.creatorName}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {curator.travelStyle.map((s) => (
                  <span key={s} className="text-[10px] px-2.5 py-1 rounded-full bg-surface border border-border text-muted font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 lg:px-8 py-14 sm:py-20 text-center">
        <p className="text-xs font-semibold text-sage uppercase tracking-widest">Full Travel Guide</p>
        <h2 className="heading-organic text-xl sm:text-2xl text-foreground mt-2">
          {curator.name}&apos;s curated stays and itineraries are coming soon
        </h2>
        <p className="text-sm text-subtle mt-3 max-w-md mx-auto leading-relaxed">
          This curator&apos;s handpicked stays, experiences and copyable trip guides haven&apos;t been published yet.
        </p>
        <p className="text-[11px] text-subtle mt-6">{DEMO_DATA_NOTICE}</p>
        <Link
          href="/#travel-guides"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-organic hover:bg-primary-hover transition-colors"
        >
          Explore Other Travel Guides
        </Link>
      </div>
    </div>
  );
}

function CuratorNotFoundPage() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="text-sm text-subtle">We couldn&apos;t find that Travel Curator.</p>
        <Link
          href="/#travel-guides"
          className="inline-flex items-center gap-2 mt-5 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-organic hover:bg-primary-hover transition-colors"
        >
          Explore Travel Guides
        </Link>
      </div>
    </div>
  );
}
