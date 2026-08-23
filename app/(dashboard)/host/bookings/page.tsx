"use client";

import { useState } from "react";
import { CalendarDays, Users, Clock, LogIn, LogOut, History } from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

type BookingStatus = "Confirmed" | "Checked-in" | "Completed" | "Cancelled";

interface Booking {
  id: string;
  guest: string;
  avatar: string;
  property: string;
  dates: string;
  guests: number;
  amount: string;
  status: BookingStatus;
}

const initialBookings: Booking[] = [
  { id: "bk1", guest: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=5", property: "The Canopy Tiny House", dates: "Jul 24 – 28", guests: 2, amount: "₹18,000", status: "Confirmed" },
  { id: "bk2", guest: "Aditya & Family", avatar: "https://i.pravatar.cc/150?img=15", property: "Stone Valley Farm Stay", dates: "Jul 18 – 19", guests: 5, amount: "₹13,600", status: "Checked-in" },
  { id: "bk3", guest: "Meera Krishnan", avatar: "https://i.pravatar.cc/150?img=41", property: "The Canopy Tiny House", dates: "Jul 11 – 14", guests: 2, amount: "₹13,500", status: "Completed" },
  { id: "bk4", guest: "Rahul Nair", avatar: "https://i.pravatar.cc/150?img=53", property: "Stone Valley Farm Stay", dates: "Jul 03 – 06", guests: 3, amount: "₹20,400", status: "Completed" },
  { id: "bk5", guest: "Sneha Reddy", avatar: "https://i.pravatar.cc/150?img=23", property: "The Canopy Tiny House", dates: "Jun 27 – 29", guests: 2, amount: "₹9,000", status: "Cancelled" },
  { id: "bk6", guest: "Karthik Iyer", avatar: "https://i.pravatar.cc/150?img=32", property: "Stone Valley Farm Stay", dates: "Jun 14 – 16", guests: 4, amount: "₹15,200", status: "Completed" },
];

const toneForStatus = (status: BookingStatus) =>
  status === "Confirmed" ? ("sage" as const) :
  status === "Checked-in" ? ("primary" as const) :
  status === "Cancelled" ? ("terracotta" as const) :
  ("muted" as const);

// Today's arrivals/departures — driven off the same booking records so the
// action buttons here and in the main list always agree.
const todaySchedule = [
  { bookingId: "bk2", action: "checkout" as const, sub: "Stone Valley Farm Stay · today 11:00 AM" },
  { bookingId: "bk1", action: "checkin" as const, sub: "The Canopy Tiny House · Jul 24, 2:00 PM" },
];

const historyFilters = ["All", "Completed", "Cancelled"] as const;

export default function HostBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [historyFilter, setHistoryFilter] = useState<(typeof historyFilters)[number]>("All");

  const handleCheckIn = (id: string) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Checked-in" } : b)));

  const handleCheckOut = (id: string) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Completed" } : b)));

  const upcomingGuests = bookings.filter((b) => b.status === "Confirmed" || b.status === "Checked-in");
  const historyBookings = bookings
    .filter((b) => b.status === "Completed" || b.status === "Cancelled")
    .filter((b) => historyFilter === "All" || b.status === historyFilter);

  return (
    <div className="space-y-4 pb-12">
      <PageHeader
        title="Bookings"
        subtitle="Current, upcoming and past reservations across your properties."
      />

      <StatGrid
        stats={[
          { label: "Active Bookings", value: String(bookings.filter((b) => b.status === "Checked-in").length), icon: CalendarDays },
          { label: "Upcoming This Month", value: String(upcomingGuests.length), delta: "next: Jul 24" },
          { label: "Guests Hosted", value: "148", delta: "lifetime", icon: Users },
          { label: "Cancellation Rate", value: "3.2%", delta: "below avg" },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming guests */}
        <SectionCard title="Upcoming Guests" icon={CalendarDays} className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[620px]">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-subtle border-b border-surface-hover">
                  <th className="px-5 py-3 font-semibold">Guest</th>
                  <th className="px-3 py-3 font-semibold">Dates</th>
                  <th className="px-3 py-3 font-semibold">Guests</th>
                  <th className="px-3 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-hover">
                {upcomingGuests.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.avatar} alt={b.guest} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-sm text-foreground font-medium">{b.guest}</p>
                          <p className="text-[11px] text-subtle">{b.property}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-xs text-muted whitespace-nowrap">{b.dates}</td>
                    <td className="px-3 py-3.5 text-xs text-muted">{b.guests}</td>
                    <td className="px-3 py-3.5 text-sm text-foreground font-medium tabular-nums">{b.amount}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col items-end gap-1.5">
                        <StatusPill tone={toneForStatus(b.status)}>{b.status}</StatusPill>
                        {b.status === "Confirmed" && (
                          <button
                            onClick={() => handleCheckIn(b.id)}
                            className="flex items-center gap-1 px-3 py-1 text-[11px] font-semibold bg-sage text-white rounded-full hover:opacity-90 transition-opacity"
                          >
                            <LogIn size={11} /> Check-in
                          </button>
                        )}
                        {b.status === "Checked-in" && (
                          <button
                            onClick={() => handleCheckOut(b.id)}
                            className="flex items-center gap-1 px-3 py-1 text-[11px] font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                          >
                            <LogOut size={11} /> Check-out
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {upcomingGuests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-sm text-subtle">
                      No upcoming guests — everyone has checked out.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Today's schedule */}
        <SectionCard title="Check-in / Check-out" icon={Clock}>
          <ul className="divide-y divide-surface-hover">
            {todaySchedule.map((s) => {
              const booking = bookings.find((b) => b.id === s.bookingId);
              if (!booking) return null;
              const isCheckin = s.action === "checkin";
              const done = isCheckin ? booking.status !== "Confirmed" : booking.status === "Completed";
              return (
                <li key={s.bookingId + s.action} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {isCheckin ? "Check-in" : "Check-out"} · {booking.guest}
                      </p>
                      <p className="text-xs text-muted mt-0.5">{s.sub}</p>
                    </div>
                    {done ? (
                      <StatusPill tone="sage">Done</StatusPill>
                    ) : (
                      <button
                        onClick={() => (isCheckin ? handleCheckIn(booking.id) : handleCheckOut(booking.id))}
                        className={`flex items-center gap-1 px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${
                          isCheckin
                            ? "bg-sage text-white hover:opacity-90"
                            : "bg-primary text-primary-foreground hover:bg-primary-hover"
                        }`}
                      >
                        {isCheckin ? <LogIn size={11} /> : <LogOut size={11} />}
                        {isCheckin ? "Check-in" : "Check-out"}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="px-5 pb-4 text-[11px] text-subtle">
            Guests receive automated check-in instructions 24h before arrival.
          </p>
        </SectionCard>
      </div>

      {/* Booking history */}
      <SectionCard title="Booking History" icon={History}>
        <div className="px-5 pt-4 flex gap-2 flex-wrap">
          {historyFilters.map((f) => (
            <button
              key={f}
              onClick={() => setHistoryFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                historyFilter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left min-w-[620px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-subtle border-b border-surface-hover">
                <th className="px-5 py-3 font-semibold">Guest</th>
                <th className="px-3 py-3 font-semibold">Property</th>
                <th className="px-3 py-3 font-semibold">Dates</th>
                <th className="px-3 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-hover">
              {historyBookings.map((b) => (
                <tr key={b.id} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.avatar} alt={b.guest} className="w-8 h-8 rounded-full object-cover" />
                      <p className="text-sm text-foreground font-medium">{b.guest}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-xs text-muted">{b.property}</td>
                  <td className="px-3 py-3.5 text-xs text-muted whitespace-nowrap">{b.dates}</td>
                  <td className="px-3 py-3.5 text-sm text-foreground font-medium tabular-nums">{b.amount}</td>
                  <td className="px-5 py-3.5 text-right">
                    <StatusPill tone={toneForStatus(b.status)}>{b.status}</StatusPill>
                  </td>
                </tr>
              ))}
              {historyBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-subtle">
                    No bookings in this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
