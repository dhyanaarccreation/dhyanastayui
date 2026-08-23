"use client";

import { useState } from "react";
import { Star, MessageSquare, Send, CheckCircle2, Clock } from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// PROPERTY HOST — Reviews
// View guest reviews across properties and
// reply to the ones still awaiting a response.
// ============================================

interface Review {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  rating: number;
  text: string;
  date: string;
  replied: boolean;
  reply?: string;
}

const initialReviews: Review[] = [
  {
    id: "REV-241",
    guest: "Meera Krishnan",
    avatar: "https://i.pravatar.cc/150?img=41",
    property: "Canopy Tiny House",
    rating: 5,
    text: "Absolutely loved the deck at sunset — the whole place felt like it was designed for slowing down. Vikram checked in on us without ever being intrusive. Would come back in a heartbeat.",
    date: "Aug 6, 2026",
    replied: true,
    reply: "Thank you so much, Meera! So glad the deck delivered — hope to host you again soon.",
  },
  {
    id: "REV-238",
    guest: "Rahul Nair",
    avatar: "https://i.pravatar.cc/150?img=53",
    property: "Stone Valley Farm",
    rating: 4,
    text: "Great stay overall, the farm tour was a highlight for the kids. Only gripe is the hot water took a while to kick in on the first morning.",
    date: "Aug 3, 2026",
    replied: false,
  },
  {
    id: "REV-233",
    guest: "Aditya Menon",
    avatar: "https://i.pravatar.cc/150?img=15",
    property: "Stone Valley Farm",
    rating: 5,
    text: "Second time staying here and it keeps getting better. The new bonfire spot by the barn was a great touch for the evenings.",
    date: "Jul 27, 2026",
    replied: true,
    reply: "So happy to have you back, Aditya! The bonfire spot has been a hit with everyone this season.",
  },
  {
    id: "REV-229",
    guest: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=5",
    property: "Canopy Tiny House",
    rating: 3,
    text: "Lovely design and location, but we felt the WiFi was too patchy for the two work calls we had scheduled. Worth flagging for other remote-working guests.",
    date: "Jul 21, 2026",
    replied: false,
  },
  {
    id: "REV-224",
    guest: "Divya Nair",
    avatar: "https://i.pravatar.cc/150?img=32",
    property: "Canopy Tiny House",
    rating: 5,
    text: "Best tiny house stay we've had in Tamil Nadu. Spotless, private, and the outdoor bathtub under the canopy is a must-try.",
    date: "Jul 14, 2026",
    replied: false,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-primary fill-primary" : "text-surface-hover fill-surface-hover"}
        />
      ))}
    </div>
  );
}

export default function HostReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const pending = reviews.filter((r) => !r.replied);
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStar = reviews.filter((r) => r.rating === 5).length;

  const handleDraftChange = (id: string, value: string) =>
    setDrafts((prev) => ({ ...prev, [id]: value }));

  const handleReply = (id: string) => {
    const text = drafts[id]?.trim();
    if (!text) return;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, replied: true, reply: text } : r))
    );
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Reviews"
        subtitle="See what guests are saying about your properties and reply directly from here."
      />

      <StatGrid
        stats={[
          { label: "Average Rating", value: `${avgRating} / 5`, delta: `${reviews.length} reviews`, icon: Star },
          { label: "5-Star Reviews", value: String(fiveStar), delta: `${Math.round((fiveStar / reviews.length) * 100)}% of total`, icon: CheckCircle2 },
          { label: "Awaiting Reply", value: String(pending.length), delta: pending.length ? "needs a response" : "all caught up", icon: Clock },
          { label: "Reply Rate", value: `${Math.round(((reviews.length - pending.length) / reviews.length) * 100)}%`, delta: "across all properties", icon: MessageSquare },
        ]}
      />

      <SectionCard title="Guest Reviews" icon={MessageSquare}>
        <ul className="divide-y divide-surface-hover">
          {reviews.map((r) => (
            <li key={r.id} className="px-5 py-5">
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={r.avatar} alt={r.guest} className="w-11 h-11 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.guest}</p>
                      <p className="text-[11px] text-subtle">{r.property} · {r.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stars rating={r.rating} />
                      <StatusPill tone={r.replied ? "sage" : "terracotta"}>
                        {r.replied ? "Replied" : "Awaiting reply"}
                      </StatusPill>
                    </div>
                  </div>
                  <p className="text-sm text-muted mt-2.5 leading-relaxed">{r.text}</p>

                  {r.replied && r.reply && (
                    <div className="mt-3 ml-2 pl-3 border-l-2 border-sage/40 bg-sage/5 rounded-r-lg py-2 pr-3">
                      <p className="text-[11px] font-semibold text-sage flex items-center gap-1">
                        <CheckCircle2 size={11} /> Your reply
                      </p>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{r.reply}</p>
                    </div>
                  )}

                  {!r.replied && (
                    <div className="mt-3 space-y-2">
                      <textarea
                        value={drafts[r.id] ?? ""}
                        onChange={(e) => handleDraftChange(r.id, e.target.value)}
                        placeholder={`Write a reply to ${r.guest.split(" ")[0]}…`}
                        rows={2}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-subtle focus:outline-none focus:border-primary resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleReply(r.id)}
                          disabled={!drafts[r.id]?.trim()}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Send size={12} /> Submit Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
