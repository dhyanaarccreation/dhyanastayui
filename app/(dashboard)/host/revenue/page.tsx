"use client";

import { useState } from "react";
import {
  BarChart3,
  Zap,
  Droplets,
  Wifi,
  Users,
  Wrench,
  Receipt,
  Landmark,
  TrendingUp,
  Home,
  Clock,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

const months = [
  { m: "Feb", v: 62 },
  { m: "Mar", v: 78 },
  { m: "Apr", v: 55 },
  { m: "May", v: 70 },
  { m: "Jun", v: 88 },
  { m: "Jul", v: 96 },
];

const bookingRevenue = [
  { property: "Dhyana Villa - Alibaug", bookings: 8, nights: 34, revenue: 70000, share: 48 },
  { property: "Dhyana Cottage - Lonavala", bookings: 5, nights: 21, revenue: 44000, share: 30 },
  { property: "Dhyana Retreat - Mahabaleshwar", bookings: 4, nights: 16, revenue: 32000, share: 22 },
];

const pendingPaymentsSeed = [
  {
    id: "PAY-2481",
    guest: "Karan Mehta",
    property: "Dhyana Villa - Alibaug",
    method: "Bank Transfer",
    amount: "₹18,400",
    expected: "14 Aug",
    status: "processing" as const,
  },
  {
    id: "PAY-2477",
    guest: "Sara Iyer",
    property: "Dhyana Cottage - Lonavala",
    method: "UPI",
    amount: "₹9,200",
    expected: "16 Aug",
    status: "processing" as const,
  },
  {
    id: "PAY-2465",
    guest: "Aditya Rao",
    property: "Dhyana Retreat - Mahabaleshwar",
    method: "Card",
    amount: "₹6,800",
    expected: "11 Aug",
    status: "overdue" as const,
  },
];

const expenses = [
  { icon: Zap, label: "Electricity", amount: "₹6,840" },
  { icon: Droplets, label: "Water", amount: "₹1,120" },
  { icon: Wifi, label: "Internet", amount: "₹1,499" },
  { icon: Users, label: "Housekeeping & labour", amount: "₹14,500" },
  { icon: Wrench, label: "Maintenance & repairs", amount: "₹4,300" },
  { icon: Receipt, label: "Consumables", amount: "₹3,150" },
  { icon: Landmark, label: "Property tax (monthly)", amount: "₹2,083" },
];

export default function HostRevenuePage() {
  const [remindersSent, setRemindersSent] = useState<string[]>([]);

  function sendReminder(id: string) {
    setRemindersSent((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  const totalPending = pendingPaymentsSeed.reduce(
    (sum, p) => sum + Number(p.amount.replace(/[^\d]/g, "")),
    0
  );

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Revenue & Earnings"
        subtitle="Income, occupancy and running costs across your properties."
      />

      <StatGrid
        stats={[
          { label: "Today", value: "₹9,000", delta: "2 active stays" },
          { label: "This Week", value: "₹41,200", delta: "+12% WoW" },
          { label: "This Month", value: "₹1.46L", delta: "+9% MoM", icon: TrendingUp },
          { label: "This Year", value: "₹9.8L", delta: "78% occupancy" },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking revenue by property */}
        <SectionCard title="Booking Revenue · July" icon={Home} className="lg:col-span-2">
          <ul className="divide-y divide-surface-hover">
            {bookingRevenue.map((p) => (
              <li key={p.property} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.property}</p>
                    <p className="text-[11px] text-subtle mt-0.5">
                      {p.bookings} bookings · {p.nights} nights
                    </p>
                  </div>
                  <span className="text-sm font-bold text-foreground tabular-nums shrink-0">
                    ₹{p.revenue.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 rounded-full bg-surface-hover overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sage"
                    style={{ width: `${p.share}%` }}
                  />
                </div>
                <p className="text-[11px] text-subtle mt-1">{p.share}% of this month&apos;s revenue</p>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Pending payments */}
        <SectionCard title="Pending Payments" icon={Clock}>
          <ul className="divide-y divide-surface-hover">
            {pendingPaymentsSeed.map((p) => {
              const sent = remindersSent.includes(p.id);
              const isOverdue = p.status === "overdue";
              return (
                <li key={p.id} className="px-5 py-3.5 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.guest}</p>
                      <p className="text-[11px] text-subtle mt-0.5 truncate">
                        {p.property} · {p.method}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-foreground tabular-nums shrink-0">
                      {p.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <StatusPill tone={isOverdue ? "terracotta" : "primary"}>
                      {isOverdue ? "Overdue" : "Processing"} · exp. {p.expected}
                    </StatusPill>
                    <button
                      onClick={() => sendReminder(p.id)}
                      disabled={sent}
                      className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors ${
                        sent
                          ? "bg-sage/10 text-sage cursor-default"
                          : "bg-primary text-primary-foreground hover:bg-primary-hover"
                      }`}
                    >
                      {sent ? <CheckCircle2 size={12} /> : <Bell size={12} />}
                      {sent ? "Reminder sent" : "Remind"}
                    </button>
                  </div>
                </li>
              );
            })}
            <li className="flex items-center justify-between px-5 py-3.5 bg-surface-hover/50">
              <span className="text-sm font-semibold text-foreground">Total pending</span>
              <span className="text-sm font-bold text-terracotta tabular-nums">
                ₹{totalPending.toLocaleString("en-IN")}
              </span>
            </li>
          </ul>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue bars */}
        <SectionCard title="Monthly Revenue" icon={BarChart3} className="lg:col-span-2">
          <div className="p-6">
            <div className="flex items-end justify-between gap-3 h-48">
              {months.map((b) => (
                <div key={b.m} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[11px] text-muted tabular-nums">₹{Math.round(b.v * 1.52)}k</span>
                  <div
                    className={`w-full max-w-[48px] rounded-t-lg ${
                      b.m === "Jul"
                        ? "bg-gradient-to-t from-primary to-primary-hover"
                        : "bg-surface-hover"
                    }`}
                    style={{ height: `${b.v}%` }}
                  />
                  <span className={`text-xs ${b.m === "Jul" ? "text-primary font-semibold" : "text-subtle"}`}>
                    {b.m}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-subtle mt-4">
              July is tracking to be your best month yet — payout lands on the 1st of next month.
            </p>
          </div>
        </SectionCard>

        {/* Expenses */}
        <SectionCard title="Expenses · July" icon={Receipt}>
          <ul className="divide-y divide-surface-hover">
            {expenses.map((e) => (
              <li key={e.label} className="flex items-center justify-between px-5 py-3">
                <span className="flex items-center gap-2.5 text-sm text-muted">
                  <e.icon size={14} className="text-subtle" />
                  {e.label}
                </span>
                <span className="text-sm text-foreground font-medium tabular-nums">{e.amount}</span>
              </li>
            ))}
            <li className="flex items-center justify-between px-5 py-3.5 bg-surface-hover/50">
              <span className="text-sm font-semibold text-foreground">Total expenses</span>
              <span className="text-sm font-bold text-terracotta tabular-nums">₹33,492</span>
            </li>
            <li className="flex items-center justify-between px-5 py-3.5">
              <span className="text-sm font-semibold text-foreground">Net earnings (Jul)</span>
              <span className="text-sm font-bold text-sage tabular-nums">₹1,12,508</span>
            </li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
