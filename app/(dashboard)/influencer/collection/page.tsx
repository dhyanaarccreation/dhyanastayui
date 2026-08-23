"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Plus,
  X,
  BookOpen,
  Bookmark,
  Copy,
  IndianRupee,
  Eye,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowUp,
  ArrowDown,
  Send,
  EyeOff,
  Files,
  Home,
  UtensilsCrossed,
  Ticket,
  Car,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";
import {
  curatorIdentity,
  curatedStays as initialCuratedStays,
  curatedStaysProgress,
  itineraries as initialItineraries,
  type StayCategory,
  type StopType,
} from "@/lib/influencer-data";
import { properties } from "@/lib/mock-data";

const stopIcon: Record<StopType, typeof Home> = {
  Stay: Home,
  Experience: Sparkles,
  Food: UtensilsCrossed,
  Activity: Ticket,
  Transport: Car,
};

// ============================================
// INFLUENCER — My Collection
// The core of the Dhyana Travel Curator model:
// a curated stay collection (min. 10 properties)
// and day-by-day itineraries travellers can copy.
// Feeds the public /travel-with/[handle] page.
// ============================================

const allCategories: StayCategory[] = ["Boutique", "Luxury", "Farm Stay", "Nature", "Couple", "Family", "Unique"];

export default function InfluencerCollectionPage() {
  const [curatedStays, setCuratedStays] = useState(initialCuratedStays);
  const [itineraries, setItineraries] = useState(initialItineraries);
  const [addOpen, setAddOpen] = useState(false);
  const [addSearch, setAddSearch] = useState("");
  const [expandedItinerary, setExpandedItinerary] = useState<string | null>(null);

  const progress = curatedStays.length;
  const required = curatedStaysProgress.required;
  const progressPct = Math.min(100, Math.round((progress / required) * 100));
  const isActivated = progress >= required;

  const alreadyAddedSlugs = new Set(curatedStays.map((s) => s.propertySlug));
  const addableProperties = properties.filter(
    (p) => !alreadyAddedSlugs.has(p.slug) && p.name.toLowerCase().includes(addSearch.toLowerCase())
  );

  const addStay = (slug: string, name: string, city: string, state: string, image: string, price: number) => {
    setCuratedStays((prev) => [
      {
        id: `cs${Date.now()}`,
        propertySlug: slug,
        name,
        location: `${city}, ${state}`,
        image,
        categories: ["Unique"],
        note: "",
        addedOn: "Just now",
        price,
        featured: false,
        order: prev.length > 0 ? Math.max(...prev.map((s) => s.order)) + 1 : 0,
      },
      ...prev,
    ]);
  };

  const removeStay = (id: string) => setCuratedStays((prev) => prev.filter((s) => s.id !== id));

  const sortedStays = [...curatedStays].sort((a, b) => a.order - b.order);

  const moveStay = (id: string, direction: -1 | 1) => {
    setCuratedStays((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((s) => s.id === id);
      const swapIdx = idx + direction;
      if (idx === -1 || swapIdx < 0 || swapIdx >= sorted.length) return prev;
      const a = sorted[idx];
      const b = sorted[swapIdx];
      return prev.map((s) => {
        if (s.id === a.id) return { ...s, order: b.order };
        if (s.id === b.id) return { ...s, order: a.order };
        return s;
      });
    });
  };

  const toggleFeatured = (id: string) =>
    setCuratedStays((prev) => prev.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s)));

  const setItineraryStatus = (id: string, status: "Published" | "Draft") =>
    setItineraries((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));

  const duplicateItinerary = (id: string) => {
    setItineraries((prev) => {
      const source = prev.find((it) => it.id === id);
      if (!source) return prev;
      const copy = { ...source, id: `it${Date.now()}`, title: `${source.title} (copy)`, status: "Draft" as const, saves: 0, copies: 0, bookingsFromCopies: 0, commissionEarned: "₹0" };
      return [copy, ...prev];
    });
  };

  const totalSaves = itineraries.reduce((sum, it) => sum + it.saves, 0);
  const totalCopies = itineraries.reduce((sum, it) => sum + it.copies, 0);
  const totalItineraryBookings = itineraries.reduce((sum, it) => sum + it.bookingsFromCopies, 0);

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="My Collection"
        subtitle="Your curated stay collection and shareable itineraries — the foundation of your Dhyana Travel Curator page."
        action={{ label: "View my public page", href: `/travel-with/${curatorIdentity.handle}`, icon: ExternalLink }}
      />

      {/* Curator identity + region + activation progress */}
      <div className="bg-gradient-to-r from-sage/15 via-surface to-surface border border-sage/25 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage flex items-center gap-1.5">
              <Sparkles size={12} /> {curatorIdentity.title}
            </p>
            <p className="text-2xl font-bold text-foreground mt-2 flex items-center gap-2">
              <MapPin size={18} className="text-sage" /> {curatorIdentity.region}
            </p>
            <p className="text-sm text-muted mt-1">{curatorIdentity.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {curatorIdentity.roles.map((r) => (
                <span key={r} className="text-[11px] px-2.5 py-1 rounded-full bg-surface-hover text-muted border border-border">
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div className="md:w-72">
            <div className="flex justify-between text-xs text-muted mb-1.5">
              <span>{progress} of {required} curated stays</span>
              <span>{isActivated ? "Activated" : `${required - progress} to go`}</span>
            </div>
            <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sage to-primary transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[11px] text-subtle mt-2">
              {isActivated
                ? "Minimum requirement met — your curator page is live and bookable."
                : "Curate at least 10 stays to activate your public curator page."}
            </p>
          </div>
        </div>
      </div>

      <StatGrid
        stats={[
          { label: "Curated Stays", value: String(curatedStays.length), delta: curatorIdentity.region, icon: Bookmark },
          { label: "Itineraries", value: String(itineraries.length), delta: `${itineraries.filter((i) => i.status === "Published").length} published`, icon: BookOpen },
          { label: "Itinerary Saves & Copies", value: `${totalSaves.toLocaleString("en-IN")} / ${totalCopies}`, delta: "saves / copies", icon: Copy },
          { label: "Bookings from Itineraries", value: String(totalItineraryBookings), delta: "copy → customise → book", icon: IndianRupee },
        ]}
      />

      {/* Curated stays manager */}
      <SectionCard title="My Curated Stays" icon={Bookmark}>
        <div className="px-5 pt-4">
          <button
            onClick={() => setAddOpen((v) => !v)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
          >
            <Plus size={13} /> Add a stay to my collection
          </button>
          {addOpen && (
            <div className="mt-3 rounded-xl border border-border bg-background p-3.5">
              <input
                value={addSearch}
                onChange={(e) => setAddSearch(e.target.value)}
                placeholder="Search properties by name…"
                className="w-full text-sm bg-surface border border-border rounded-lg px-3.5 py-2 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors mb-2.5"
              />
              <div className="max-h-56 overflow-y-auto divide-y divide-surface-hover">
                {addableProperties.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addStay(p.slug, p.name, p.location.city, p.location.state, p.images[0], p.price)}
                    className="w-full flex items-center gap-3 py-2.5 text-left hover:bg-surface-hover transition-colors rounded-lg px-1.5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-subtle">{p.location.city}, {p.location.state}</p>
                    </div>
                    <Plus size={14} className="text-primary shrink-0" />
                  </button>
                ))}
                {addableProperties.length === 0 && (
                  <p className="text-xs text-subtle py-4 text-center">No matching properties.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {sortedStays.map((s, i) => (
            <div key={s.id} className={`rounded-2xl border overflow-hidden group ${s.featured ? "border-primary/50 ring-1 ring-primary/20" : "border-border"} bg-background`}>
              <div className="relative h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
                {s.featured && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wider">
                    <Star size={9} className="fill-current" /> Featured
                  </span>
                )}
                <button
                  onClick={() => removeStay(s.id)}
                  aria-label={`Remove ${s.name}`}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">{s.name}</p>
                  <span className="text-xs font-semibold text-foreground shrink-0 tabular-nums">₹{s.price.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[11px] text-subtle flex items-center gap-1 mt-0.5">
                  <MapPin size={10} /> {s.location}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {s.categories.map((c) => (
                    <span key={c} className="text-[9px] px-2 py-0.5 rounded-full bg-sage/10 text-sage font-medium">{c}</span>
                  ))}
                </div>
                {s.note && <p className="text-xs text-muted mt-2 italic line-clamp-2">&ldquo;{s.note}&rdquo;</p>}

                <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-surface-hover">
                  <button
                    onClick={() => toggleFeatured(s.id)}
                    className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${s.featured ? "text-primary" : "text-subtle hover:text-foreground"}`}
                  >
                    <Star size={12} className={s.featured ? "fill-current" : ""} /> {s.featured ? "Featured" : "Feature"}
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveStay(s.id, -1)}
                      disabled={i === 0}
                      aria-label={`Move ${s.name} up`}
                      className="w-6 h-6 rounded-full border border-border text-subtle hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <ArrowUp size={11} />
                    </button>
                    <button
                      onClick={() => moveStay(s.id, 1)}
                      disabled={i === sortedStays.length - 1}
                      aria-label={`Move ${s.name} down`}
                      className="w-6 h-6 rounded-full border border-border text-subtle hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <ArrowDown size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="px-5 pb-4 text-[11px] text-subtle flex flex-wrap gap-x-1">
          Available categories: {allCategories.join(" · ")}
        </p>
      </SectionCard>

      {/* Itineraries */}
      <SectionCard title="My Itineraries" icon={BookOpen} action={{ label: "Create itinerary", href: "/influencer/itinerary-builder" }}>
        <ul className="divide-y divide-surface-hover">
          {itineraries.map((it) => {
            const expanded = expandedItinerary === it.id;
            const activitiesCount = it.days.reduce((sum, d) => sum + d.stops.length, 0);
            return (
              <li key={it.id}>
                <div className="flex items-center gap-3 px-5 py-4">
                  <button
                    onClick={() => setExpandedItinerary(expanded ? null : it.id)}
                    className="flex items-center gap-3 flex-1 min-w-0 text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.coverImage} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-foreground truncate">{it.title}</p>
                        <StatusPill tone={it.status === "Published" ? "sage" : "muted"}>{it.status}</StatusPill>
                      </div>
                      <p className="text-xs text-subtle mt-0.5">{it.region} · {it.durationLabel} · {activitiesCount} activities · {it.estimatedCost}</p>
                      <p className="text-[11px] text-muted mt-1 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1"><Eye size={10} /> {it.saves.toLocaleString("en-IN")} saves</span>
                        <span className="flex items-center gap-1"><Copy size={10} /> {it.copies} copies</span>
                        <span className="flex items-center gap-1"><IndianRupee size={10} /> {it.commissionEarned} earned</span>
                      </p>
                    </div>
                    {expanded ? <ChevronUp size={16} className="text-subtle shrink-0" /> : <ChevronDown size={16} className="text-subtle shrink-0" />}
                  </button>
                </div>
                <div className="flex items-center gap-2 px-5 pb-4 flex-wrap">
                  <Link
                    href={`/travel-with/${curatorIdentity.handle}/itinerary/${it.id}`}
                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors"
                  >
                    <Eye size={11} /> Preview
                  </Link>
                  {it.status === "Draft" ? (
                    <button
                      onClick={() => setItineraryStatus(it.id, "Published")}
                      className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-semibold bg-sage text-white rounded-full hover:opacity-90 transition-opacity"
                    >
                      <Send size={11} /> Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => setItineraryStatus(it.id, "Draft")}
                      className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors"
                    >
                      <EyeOff size={11} /> Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => duplicateItinerary(it.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors"
                  >
                    <Files size={11} /> Duplicate
                  </button>
                </div>
                {expanded && (
                  <div className="px-5 pb-5 pl-5">
                    <div className="space-y-3">
                      {it.days.map((d) => (
                        <div key={d.day} className="rounded-xl bg-background border border-border p-3.5">
                          <p className="text-xs font-semibold text-foreground">Day {d.day} — {d.title}</p>
                          <ul className="mt-1.5 space-y-1.5">
                            {d.stops.map((stop, si) => {
                              const StopIcon = stopIcon[stop.type];
                              return (
                                <li key={si} className="text-xs text-muted flex items-start gap-1.5">
                                  <StopIcon size={11} className="text-sage mt-0.5 shrink-0" />
                                  <span>
                                    <span className="text-[9px] font-semibold uppercase tracking-wider text-subtle mr-1.5">{stop.type}</span>
                                    {stop.label}
                                    {stop.notes && <span className="block text-[11px] text-subtle italic mt-0.5">{stop.notes}</span>}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-subtle mt-3">
                      {it.bookingsFromCopies} bookings came from travellers who copied and customised this itinerary.
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          You earn commission whenever a traveller copies, customises, and books from one of your itineraries — not just from direct promo-code clicks.
        </p>
      </SectionCard>

      <div className="rounded-xl border border-dashed border-border bg-background p-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted">
          Your public curator page shows every published itinerary and your full curated stay collection.
        </p>
        <Link
          href={`/travel-with/${curatorIdentity.handle}`}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-sage text-white rounded-full hover:opacity-90 transition-opacity shrink-0"
        >
          <ExternalLink size={12} /> Preview public page
        </Link>
      </div>
    </div>
  );
}
