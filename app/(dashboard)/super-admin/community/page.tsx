"use client";

import { useState } from "react";
import {
  Headphones,
  Siren,
  ShieldAlert,
  MessageCircle,
  Sparkles,
  Check,
  X,
  FileWarning,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// SUPER ADMIN — Community & Reviews
// Support/complaint oversight, SOS monitoring,
// and platform-wide review & reputation control.
// ============================================

const initialTickets = [
  { id: "t1", who: "Kavya Suresh", type: "Guest Issue", subject: "AC not working — The Canopy Tiny House", severity: "High" },
  { id: "t2", who: "Vikram Patel", type: "Host Issue", subject: "Payout delayed for booking DHY-8412", severity: "Medium" },
  { id: "t3", who: "Imran Khan", type: "Complaint", subject: "Host unresponsive for 48 hours", severity: "High" },
];

const sosIncidents = [
  { id: "s1", location: "The Glasshouse in the Pines", type: "Medical emergency", status: "Team dispatched", time: "6 min ago" },
];

const initialReviews = [
  { id: "r1", property: "Stone Valley Villa", excerpt: "“Contains guest phone number in the text…”", flag: "Personal info", aiSentiment: "Neutral" },
  { id: "r2", property: "Old Mill Guesthouse", excerpt: "“Abusive language directed at host…”", flag: "Abusive", aiSentiment: "Negative" },
  { id: "r3", property: "Bamboo Nest Eco Stay", excerpt: "“Suspiciously generic, posted 8 times this week…”", flag: "Possible fake", aiSentiment: "Positive" },
];

const testimonials = [
  { id: "tm1", guest: "Ananya R.", quote: "Best farm stay we've ever booked — the seed ball drive made it unforgettable.", rating: 5 },
  { id: "tm2", guest: "Karthik M.", quote: "Smooth check-in, spotless property, incredible hospitality.", rating: 5 },
];

export default function SuperAdminCommunityPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [reviews, setReviews] = useState(initialReviews);
  const [pendingTestimonials, setPendingTestimonials] = useState(testimonials);

  const resolveTicket = (id: string) => setTickets((p) => p.filter((t) => t.id !== id));
  const moderateReview = (id: string) => setReviews((p) => p.filter((r) => r.id !== id));
  const decideTestimonial = (id: string) => setPendingTestimonials((p) => p.filter((t) => t.id !== id));

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Community & Reviews"
        subtitle="Support escalations, SOS monitoring, and everything guarding platform trust — reviews, testimonials and fake-review detection."
      />

      <StatGrid
        stats={[
          { label: "Open Tickets", value: "14", delta: "3 urgent", icon: Headphones },
          { label: "Live SOS Alerts", value: String(sosIncidents.length), delta: "response en route", icon: Siren },
          { label: "Flagged Reviews", value: String(reviews.length), delta: "awaiting moderation", icon: ShieldAlert },
          { label: "Reviews Collected", value: "1,340", delta: "+6% MoM", icon: MessageCircle },
        ]}
      />

      <SectionCard title="Support & Complaints" icon={Headphones}>
        <ul className="divide-y divide-surface-hover">
          {tickets.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{t.subject}</p>
                <p className="text-xs text-subtle mt-0.5">{t.who} · {t.type}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <StatusPill tone={t.severity === "High" ? "terracotta" : "primary"}>{t.severity}</StatusPill>
                <button
                  onClick={() => resolveTicket(t.id)}
                  className="px-3 py-1.5 text-xs font-medium border border-sage/40 text-sage rounded-full hover:bg-sage hover:text-white transition-colors"
                >
                  Resolve
                </button>
              </div>
            </li>
          ))}
          {tickets.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">Queue is clear.</li>}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          Live chat, concierge support and community moderation route here when escalated.
        </p>
      </SectionCard>

      <SectionCard title="SOS & Emergency Monitoring" icon={Siren}>
        <ul className="divide-y divide-surface-hover">
          {sosIncidents.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.type} — {s.location}</p>
                <p className="text-xs text-subtle mt-0.5">{s.time}</p>
              </div>
              <StatusPill tone="terracotta">{s.status}</StatusPill>
            </li>
          ))}
          {sosIncidents.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">No active incidents.</li>}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          Full live tracking and response team assignment lives in the SOS Manager dashboard.
        </p>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Review Moderation" icon={FileWarning}>
          <ul className="divide-y divide-surface-hover">
            {reviews.map((r) => (
              <li key={r.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{r.property}</span>
                  <StatusPill tone="terracotta">{r.flag}</StatusPill>
                </div>
                <p className="text-xs text-muted italic mb-2">{r.excerpt}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] text-subtle flex items-center gap-1">
                    <Sparkles size={10} /> AI sentiment: {r.aiSentiment}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moderateReview(r.id)}
                      className="px-3 py-1.5 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => moderateReview(r.id)}
                      className="px-3 py-1.5 text-xs font-medium border border-terracotta/30 text-terracotta rounded-full hover:bg-terracotta/10 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
            {reviews.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">No flagged reviews.</li>}
          </ul>
        </SectionCard>

        <SectionCard title="Testimonial Approvals" icon={MessageCircle}>
          <ul className="divide-y divide-surface-hover">
            {pendingTestimonials.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t.guest}</p>
                  <p className="text-xs text-muted italic mt-0.5 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => decideTestimonial(t.id)}
                    aria-label="Approve testimonial"
                    className="w-8 h-8 rounded-full border border-sage/40 text-sage hover:bg-sage hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Check size={13} />
                  </button>
                  <button
                    onClick={() => decideTestimonial(t.id)}
                    aria-label="Reject testimonial"
                    className="w-8 h-8 rounded-full border border-border text-muted hover:text-terracotta hover:border-terracotta/40 flex items-center justify-center transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>
              </li>
            ))}
            {pendingTestimonials.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">Queue is clear.</li>}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Community guidelines apply automatically — flagged language routes to Review Moderation instead.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
