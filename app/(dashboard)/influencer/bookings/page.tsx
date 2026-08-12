"use client";

import { CalendarCheck, ShieldOff } from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { attributedBookings } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Bookings
// Bookings attributed to this influencer's promo
// code / links. No traveller personal information
// is shown — booking ID, property, dates, value,
// commission and status only.
// ============================================

const statusTone = (s: string) => (s === "Confirmed" || s === "Completed" ? "sage" : s === "Cancelled" ? "terracotta" : "muted");

export default function InfluencerBookingsPage() {
  const totalCommission = attributedBookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + Number(b.commission.replace(/[₹,]/g, "")), 0);

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Bookings"
        subtitle="Every booking attributed to your promo code or tracking links — traveller details stay private."
      />

      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-4 py-3">
        <ShieldOff size={14} className="text-subtle shrink-0 mt-0.5" />
        <p className="text-xs text-muted">
          Guest names, contact details and other traveller information are not shared with partners — only booking-level attribution data.
        </p>
      </div>

      <SectionCard title="Attributed Bookings" icon={CalendarCheck}>
        <ul className="divide-y divide-surface-hover">
          {attributedBookings.map((b) => (
            <li key={b.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {b.id} <span className="text-subtle font-normal">· {b.property}</span>
                </p>
                <p className="text-xs text-subtle mt-0.5">
                  Booked {b.bookingDate} · Travel {b.travelDate}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 text-right">
                <div>
                  <p className="text-[10px] text-subtle uppercase tracking-wider">Value</p>
                  <p className="text-sm font-semibold text-foreground tabular-nums">{b.value}</p>
                </div>
                <div>
                  <p className="text-[10px] text-subtle uppercase tracking-wider">Commission</p>
                  <p className="text-sm font-semibold text-sage tabular-nums">{b.commission}</p>
                </div>
                <StatusPill tone={statusTone(b.status)}>{b.status}</StatusPill>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-surface-hover">
          <p className="text-xs text-muted">Total commission from confirmed &amp; completed bookings</p>
          <span className="text-sm font-bold text-foreground tabular-nums">₹{totalCommission.toLocaleString("en-IN")}</span>
        </div>
      </SectionCard>
    </div>
  );
}
