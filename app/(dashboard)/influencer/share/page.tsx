"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  User,
  BookOpen,
  Ticket,
  Bookmark,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/app/components/DashboardUI";
import { curatorIdentity, influencerProfile, itineraries, promoCode } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Share & Promote
// One place to copy every shareable link and grab
// a ready-made preview card for social posts.
// ============================================

function CopyRow({ icon: Icon, label, value }: { icon: typeof Copy; label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <li className="flex items-center justify-between gap-3 px-5 py-3.5">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon size={14} />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-foreground truncate">{label}</p>
          <p className="text-xs text-subtle truncate font-mono">{value}</p>
        </div>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors shrink-0"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
}

export default function InfluencerSharePage() {
  const publishedItineraries = itineraries.filter((it) => it.status === "Published");

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Share & Promote"
        subtitle="Copy links to your profile, itineraries and promo code — or grab a ready-made card for social."
      />

      <SectionCard title="Your Links" icon={Share2}>
        <ul className="divide-y divide-surface-hover">
          <CopyRow icon={User} label="Curator profile link" value={`dhyana.in/travel-with/${curatorIdentity.handle}`} />
          <CopyRow icon={Bookmark} label="Stay collection link" value={`dhyana.in/travel-with/${curatorIdentity.handle}#stays`} />
          <CopyRow icon={Ticket} label="Promo code" value={promoCode.code} />
        </ul>
      </SectionCard>

      <SectionCard title="Itinerary Links" icon={BookOpen}>
        <ul className="divide-y divide-surface-hover">
          {publishedItineraries.map((it) => (
            <CopyRow
              key={it.id}
              icon={BookOpen}
              label={it.title}
              value={`dhyana.in/travel-with/${curatorIdentity.handle}/itinerary/${it.id}`}
            />
          ))}
          {publishedItineraries.length === 0 && (
            <li className="px-5 py-6 text-center text-sm text-subtle">Publish an itinerary to get a shareable link.</li>
          )}
        </ul>
      </SectionCard>

      <SectionCard title="Share-Ready Preview Cards" icon={Share2}>
        <p className="px-5 pt-4 text-xs text-muted">
          Drop these straight into a Story, post caption or bio link — sized for social sharing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 p-5">
          <div className="rounded-2xl overflow-hidden border border-border bg-background">
            <div className="relative h-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={influencerProfile.avatar} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="text-white text-sm font-semibold">Travel with {influencerProfile.name}</p>
                <p className="text-white/75 text-[11px]">{curatorIdentity.region} · Dhyana Travel Curator</p>
              </div>
            </div>
          </div>
          {publishedItineraries.slice(0, 1).map((it) => (
            <div key={it.id} className="rounded-2xl overflow-hidden border border-border bg-background">
              <div className="relative h-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <p className="text-white text-sm font-semibold">{it.title}</p>
                  <p className="text-white/75 text-[11px]">{it.durationLabel} · Copy this itinerary</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
