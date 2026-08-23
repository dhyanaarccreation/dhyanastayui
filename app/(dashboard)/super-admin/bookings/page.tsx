"use client";

import { useState } from "react";
import {
  CalendarDays,
  AlertTriangle,
  Users,
  BarChart3,
  Compass,
  Check,
  X,
  Ticket,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// SUPER ADMIN — Bookings & Experiences
// Platform-wide booking oversight (monitoring,
// disputes, group bookings) and the experience
// marketplace (workshops, activities, providers).
// ============================================

type BookingStatus = "Confirmed" | "Pending" | "Disputed" | "Cancelled" | "Completed";

const initialBookings = [
  { id: "DHY-8471", guest: "Kavya Suresh", property: "The Canopy Tiny House", dates: "Aug 14 – 16", amount: "₹9,000", status: "Confirmed" as BookingStatus },
  { id: "DHY-8465", guest: "Imran Khan", property: "Stone Valley Villa", dates: "Aug 20 – 23", amount: "₹28,400", status: "Pending" as BookingStatus },
  { id: "DHY-8458", guest: "Family group · 12 guests", property: "Whistling Pines Homestead", dates: "Sep 02 – 05", amount: "₹64,000", status: "Confirmed" as BookingStatus },
  { id: "DHY-8442", guest: "Neeta Pillai", property: "Old Mill Guesthouse", dates: "Jul 28 – 30", amount: "₹12,750", status: "Disputed" as BookingStatus },
  { id: "DHY-8430", guest: "Rohan Mehta", property: "Nila Wellness Retreat", dates: "Jul 18 – 22", amount: "₹34,000", status: "Completed" as BookingStatus },
];

const disputes = [
  { id: "d1", booking: "DHY-8442", issue: "Guest claims property didn't match listing photos", raisedBy: "Guest", sla: "4h left" },
  { id: "d2", booking: "DHY-8399", issue: "Host disputes damage deposit deduction", raisedBy: "Host", sla: "1d left" },
];

const experienceCategories = [
  "Workshops", "Adventure", "Wellness", "Yoga", "Photography", "Farming", "Festivals", "Music", "Local Tours",
];

const pendingExperiences = [
  { id: "e1", name: "Pottery & Clay Workshop", category: "Workshops", provider: "Auroville Craft Collective", price: "₹1,200" },
  { id: "e2", name: "Sunrise Trek — Yelagiri Hills", category: "Adventure", provider: "Trailblazers Co.", price: "₹800" },
  { id: "e3", name: "Sound Healing Session", category: "Wellness", provider: "Nila Wellness Retreat", price: "₹1,500" },
  { id: "e4", name: "Organic Farm Harvest Day", category: "Farming", provider: "Vaksana Farms", price: "₹600" },
];

const experienceProviders = [
  { id: "p1", name: "Auroville Craft Collective", experiences: 4, rating: 4.8, status: "Active" },
  { id: "p2", name: "Trailblazers Co.", experiences: 7, rating: 4.6, status: "Active" },
  { id: "p3", name: "Meena's Kitchen", experiences: 2, rating: 4.9, status: "Active" },
  { id: "p4", name: "Solo Adventure Rentals", experiences: 1, rating: 3.9, status: "Under review" },
];

export default function SuperAdminBookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [experiences, setExperiences] = useState(pendingExperiences);

  const cancelBooking = (id: string) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" as BookingStatus } : b)));
  const confirmBooking = (id: string) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Confirmed" as BookingStatus } : b)));

  const decideExperience = (id: string) => setExperiences((prev) => prev.filter((e) => e.id !== id));

  const statusTone = (s: BookingStatus) =>
    s === "Confirmed" || s === "Completed" ? "sage" : s === "Pending" ? "primary" : s === "Disputed" ? "terracotta" : "muted";

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Bookings & Experiences"
        subtitle="Platform-wide booking oversight, dispute resolution, and the curated experience marketplace."
      />

      <StatGrid
        stats={[
          { label: "Active Bookings", value: "1,284", delta: "+6% WoW", icon: CalendarDays },
          { label: "Group Bookings", value: "42", delta: "this month", icon: Users },
          { label: "Open Disputes", value: String(disputes.length), delta: "1 SLA at risk", icon: AlertTriangle },
          { label: "Avg Booking Value", value: "₹18,400", delta: "+4% MoM", icon: BarChart3 },
        ]}
      />

      <SectionCard title="Booking Monitor" icon={CalendarDays}>
        <ul className="divide-y divide-surface-hover">
          {bookings.map((b) => (
            <li key={b.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {b.id} <span className="text-subtle font-normal">· {b.guest}</span>
                </p>
                <p className="text-xs text-subtle mt-0.5">{b.property} · {b.dates}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-sm font-semibold text-foreground tabular-nums">{b.amount}</span>
                <StatusPill tone={statusTone(b.status)}>{b.status}</StatusPill>
                {b.status === "Pending" && (
                  <button
                    onClick={() => confirmBooking(b.id)}
                    className="px-3 py-1.5 text-xs font-medium border border-sage/40 text-sage rounded-full hover:bg-sage hover:text-white transition-colors"
                  >
                    Confirm
                  </button>
                )}
                {(b.status === "Confirmed" || b.status === "Pending") && (
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="px-3 py-1.5 text-xs font-medium border border-border text-muted rounded-full hover:text-terracotta hover:border-terracotta/40 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          Calendar view, timeline and modification history are available per booking on the property record.
        </p>
      </SectionCard>

      <SectionCard title="Booking Disputes" icon={AlertTriangle}>
        <ul className="divide-y divide-surface-hover">
          {disputes.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">
                  {d.booking} · {d.issue}
                </p>
                <p className="text-xs text-subtle mt-0.5">Raised by {d.raisedBy}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <StatusPill tone="terracotta">{d.sla}</StatusPill>
                <button className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors">
                  Resolve
                </button>
              </div>
            </li>
          ))}
          {disputes.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">No open disputes.</li>}
        </ul>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Experience Approvals" icon={Compass}>
          <p className="px-5 pt-4 text-xs text-muted">
            {experienceCategories.join(" · ")}
          </p>
          <ul className="divide-y divide-surface-hover mt-2">
            {experiences.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-subtle mt-0.5">{e.provider} · {e.category} · {e.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => decideExperience(e.id)}
                    aria-label={`Approve ${e.name}`}
                    className="w-8 h-8 rounded-full border border-sage/40 text-sage hover:bg-sage hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Check size={13} />
                  </button>
                  <button
                    onClick={() => decideExperience(e.id)}
                    aria-label={`Reject ${e.name}`}
                    className="w-8 h-8 rounded-full border border-border text-muted hover:text-terracotta hover:border-terracotta/40 flex items-center justify-center transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>
              </li>
            ))}
            {experiences.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">Queue is clear.</li>}
          </ul>
        </SectionCard>

        <SectionCard title="Experience Providers" icon={Ticket}>
          <ul className="divide-y divide-surface-hover">
            {experienceProviders.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-subtle mt-0.5">{p.experiences} experiences · {p.rating}★</p>
                </div>
                <StatusPill tone={p.status === "Active" ? "sage" : "primary"}>{p.status}</StatusPill>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Ticket validation and per-slot booking capacity are managed from each experience listing.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
