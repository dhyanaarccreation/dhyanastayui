"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Clock,
  IndianRupee,
  Copy,
  Check,
  Heart,
  Home,
  Sparkles,
  UtensilsCrossed,
  Ticket,
  Car,
  ChevronRight,
  Map as MapIcon,
  BadgeCheck,
} from "lucide-react";
import {
  influencerProfile,
  curatorIdentity,
  itineraries,
  curatedStays,
  type StopType,
} from "@/lib/influencer-data";

// ============================================
// PUBLIC — single itinerary detail page
// The traveller-facing view of one curated
// itinerary: day-by-day plan, recommended stays,
// a map placeholder, and Copy/Book/Save CTAs.
// ============================================

const stopIcon: Record<StopType, typeof Home> = {
  Stay: Home,
  Experience: Sparkles,
  Food: UtensilsCrossed,
  Activity: Ticket,
  Transport: Car,
};

export default function PublicItineraryPage() {
  const params = useParams();
  const itineraryId = params?.id as string;
  const itinerary = itineraries.find((it) => it.id === itineraryId) || itineraries[0];

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const recommendedStays = curatedStays.filter((s) =>
    itinerary.days.some((d) => d.stops.some((stop) => stop.type === "Stay" && stop.label.includes(s.name)))
  );
  const fallbackStays = recommendedStays.length > 0 ? recommendedStays : curatedStays.slice(0, 3);

  const copyItinerary = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs text-subtle">
          <Link href={`/travel-with/${curatorIdentity.handle}`} className="hover:text-foreground transition-colors">
            Travel with {influencerProfile.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-muted truncate">{itinerary.title}</span>
        </div>
      </div>

      {/* Cover + header */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 mt-4">
        <div className="relative h-56 sm:h-80 rounded-[28px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={itinerary.coverImage} alt={itinerary.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <Link
              href={`/travel-with/${curatorIdentity.handle}`}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-medium mb-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={influencerProfile.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
              Curated by {influencerProfile.name} <BadgeCheck size={11} className="text-sage" />
            </Link>
            <h1 className="heading-organic text-xl sm:text-3xl text-white">{itinerary.title}</h1>
            <p className="text-white/80 text-sm mt-1.5 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={13} /> {itinerary.region}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {itinerary.durationLabel}</span>
              <span className="flex items-center gap-1"><IndianRupee size={13} /> {itinerary.estimatedCost}</span>
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 mt-5">
          <button
            onClick={copyItinerary}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-organic hover:bg-primary-hover transition-colors"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied to your trips" : "Copy This Itinerary"}
          </button>
          <Link
            href="/#explore-stays"
            className="px-5 py-2.5 text-sm font-semibold bg-sage text-white rounded-full shadow-organic hover:opacity-90 transition-opacity"
          >
            Book This Trip
          </Link>
          <button
            onClick={() => setSaved((v) => !v)}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium rounded-full border transition-colors ${
              saved ? "bg-terracotta/10 border-terracotta/40 text-terracotta" : "border-border text-muted hover:text-foreground"
            }`}
          >
            <Heart size={15} className={saved ? "fill-current" : ""} /> {saved ? "Saved" : "Save Itinerary"}
          </button>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_320px] gap-8 mt-10">
        {/* Day-by-day */}
        <div>
          <p className="text-xs font-semibold text-sage uppercase tracking-widest mb-4">Day-by-Day Itinerary</p>
          <div className="space-y-4">
            {itinerary.days.map((d) => (
              <div key={d.day} className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-foreground">Day {d.day} — {d.title}</p>
                <div className="mt-3 space-y-2.5">
                  {d.stops.map((stop, i) => {
                    const Icon = stopIcon[stop.type];
                    return (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-sage/10 text-sage flex items-center justify-center shrink-0">
                          <Icon size={13} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm text-foreground">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle mr-1.5">{stop.type}</span>
                            {stop.label}
                          </p>
                          {stop.notes && <p className="text-xs text-subtle italic mt-0.5">{stop.notes}</p>}
                        </div>
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
          <p className="text-xs font-semibold text-sage uppercase tracking-widest mb-4">Recommended Stays</p>
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
              Copy this itinerary to your own trip planner, customise the dates and stays, then book directly — {influencerProfile.name} earns a small commission that keeps their curated content going.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
