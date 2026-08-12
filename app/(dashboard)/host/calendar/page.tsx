"use client";

import { useState, type FormEvent } from "react";
import { Ban, CalendarDays, IndianRupee, Lock, TrendingUp, Unlock, X } from "lucide-react";
import { PageHeader, SectionCard } from "@/app/components/DashboardUI";

// July 2026 — the 1st falls on a Wednesday; today is the 18th
const DAYS_IN_MONTH = 31;
const FIRST_DAY_OFFSET = 3; // Su Mo Tu [We]
const TODAY = 18;

const booked = new Set([3, 4, 5, 6, 11, 12, 13, 14, 24, 25, 26, 27, 28]);

type BlockedRange = { id: number; start: number; end: number; reason: string };

const initialBlockedRanges: BlockedRange[] = [
  { id: 1, start: 8, end: 9, reason: "Deep cleaning" },
];

const pricingRules = [
  { label: "Base price (weekdays)", value: "₹4,500 / night" },
  { label: "Weekend multiplier", value: "+20% · Fri & Sat" },
  { label: "Monsoon season rate", value: "₹3,900 · Jul 1 – Sep 15" },
  { label: "Long stay discount", value: "-15% · 7+ nights" },
  { label: "Festive premium", value: "+35% · Dec 20 – Jan 2" },
];

export default function HostCalendarPage() {
  const cells: (number | null)[] = [
    ...Array.from({ length: FIRST_DAY_OFFSET }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];
  const monthDays = cells.filter((d): d is number => d !== null);

  const [closedDays, setClosedDays] = useState<Set<number>>(new Set());
  const [blockedRanges, setBlockedRanges] = useState<BlockedRange[]>(initialBlockedRanges);
  const [nextRangeId, setNextRangeId] = useState(2);
  const [blockStart, setBlockStart] = useState(8);
  const [blockEnd, setBlockEnd] = useState(9);
  const [blockReason, setBlockReason] = useState("");

  const blockedDays = new Set<number>();
  blockedRanges.forEach((r) => {
    for (let d = r.start; d <= r.end; d++) blockedDays.add(d);
  });

  function toggleDay(day: number) {
    if (booked.has(day) || blockedDays.has(day)) return;
    setClosedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }

  function openCalendar() {
    setClosedDays(new Set());
  }

  function closeCalendar() {
    setClosedDays(new Set(monthDays.filter((d) => !booked.has(d) && !blockedDays.has(d))));
  }

  function addBlockedRange(e: FormEvent) {
    e.preventDefault();
    if (blockStart > blockEnd) return;
    setBlockedRanges((prev) => [
      ...prev,
      { id: nextRangeId, start: blockStart, end: blockEnd, reason: blockReason.trim() || "Personal use" },
    ]);
    setNextRangeId((id) => id + 1);
    setBlockReason("");
  }

  function unblockRange(id: number) {
    setBlockedRanges((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Calendar & Pricing"
        subtitle="Availability for The Canopy Tiny House — manage bookings, blocks and rates."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <SectionCard title="July 2026" icon={CalendarDays} className="lg:col-span-2">
          <div className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-xs text-muted">Click an available or closed date to toggle it for booking.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={openCalendar}
                  className="px-3 py-1.5 text-xs font-semibold bg-sage/15 text-sage rounded-full hover:bg-sage/25 transition-colors flex items-center gap-1.5"
                >
                  <Unlock size={13} /> Open Calendar
                </button>
                <button
                  onClick={closeCalendar}
                  className="px-3 py-1.5 text-xs font-semibold bg-terracotta/15 text-terracotta rounded-full hover:bg-terracotta/25 transition-colors flex items-center gap-1.5"
                >
                  <Lock size={13} /> Close Calendar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="py-1">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {cells.map((day, i) => {
                if (day === null) return <span key={`x${i}`} />;
                const isBooked = booked.has(day);
                const isBlockedRange = blockedDays.has(day);
                const isClosed = closedDays.has(day);
                const isToday = day === TODAY;
                const isTogglable = !isBooked && !isBlockedRange;
                return (
                  <div
                    key={day}
                    onClick={isTogglable ? () => toggleDay(day) : undefined}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs border transition-colors ${
                      isBooked
                        ? "bg-primary/15 border-primary/30 text-primary font-semibold"
                        : isBlockedRange
                        ? "bg-terracotta/10 border-terracotta/30 text-terracotta"
                        : isClosed
                        ? "bg-surface-hover border-border text-subtle line-through cursor-pointer"
                        : "bg-background border-border text-muted hover:border-primary/40 cursor-pointer"
                    } ${isToday ? "ring-2 ring-sage" : ""}`}
                  >
                    {day}
                    {isBooked && <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-5 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary/15 border border-primary/30" /> Booked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-terracotta/10 border border-terracotta/30" /> Blocked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-surface-hover border border-border" /> Closed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-background border border-border" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded ring-2 ring-sage" /> Today
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Pricing rules */}
        <div className="space-y-6">
          <SectionCard title="Pricing Rules" icon={IndianRupee} action={{ label: "Edit", href: "/host/calendar" }}>
            <ul className="divide-y divide-surface-hover">
              {pricingRules.map((r) => (
                <li key={r.label} className="px-5 py-3.5">
                  <p className="text-xs text-subtle">{r.label}</p>
                  <p className="text-sm text-foreground font-medium mt-0.5">{r.value}</p>
                </li>
              ))}
            </ul>
          </SectionCard>

          <div className="bg-gradient-to-br from-sage/15 to-surface border border-sage/25 rounded-2xl p-5">
            <p className="text-xs font-semibold text-sage flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingUp size={13} /> Smart pricing tip
            </p>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              Demand around Auroville rises 40% during the Aug 15 long weekend. Raising your rate to ₹5,400 could add ~₹7,200 that week.
            </p>
            <button className="mt-3 text-xs font-medium text-primary hover:underline">Apply suggestion</button>
          </div>
        </div>
      </div>

      {/* Block dates */}
      <SectionCard title="Block Dates" icon={Ban}>
        <div className="p-5 grid md:grid-cols-2 gap-6">
          <form onSubmit={addBlockedRange} className="space-y-3">
            <p className="text-xs text-muted">
              Block a date range for maintenance or personal use — blocked dates won&apos;t accept bookings.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Start (Jul)</span>
                <select
                  value={blockStart}
                  onChange={(e) => setBlockStart(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  {monthDays.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">End (Jul)</span>
                <select
                  value={blockEnd}
                  onChange={(e) => setBlockEnd(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  {monthDays.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Reason</span>
              <input
                type="text"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g. Deep cleaning, personal use"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle"
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
            >
              Block Dates
            </button>
          </form>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Currently blocked</p>
            {blockedRanges.length === 0 ? (
              <p className="text-sm text-muted">No blocked date ranges.</p>
            ) : (
              <ul className="divide-y divide-surface-hover border border-border rounded-xl overflow-hidden">
                {blockedRanges.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        Jul {r.start}{r.start !== r.end ? `–${r.end}` : ""}
                      </p>
                      <p className="text-xs text-subtle mt-0.5">{r.reason}</p>
                    </div>
                    <button
                      onClick={() => unblockRange(r.id)}
                      className="flex items-center gap-1 text-xs font-medium text-terracotta hover:underline shrink-0"
                    >
                      <X size={13} /> Unblock
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
