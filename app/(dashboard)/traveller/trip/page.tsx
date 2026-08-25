"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  Ticket as TicketIcon,
  Wallet,
  Wifi,
  Phone,
  ArrowUpRight,
  History,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { SectionCard, StatusPill } from "@/app/components/DashboardUI";
import LiveMapCard from "@/app/components/trip/LiveMapCard";
import TripTimeline from "@/app/components/trip/TripTimeline";
import CurrentActivityHero from "@/app/components/trip/CurrentActivityHero";
import RescheduleBanner from "@/app/components/trip/RescheduleBanner";
import TicketModal from "@/app/components/trip/TicketModal";
import SOSModal from "@/app/components/trip/SOSModal";
import SupportDrawer from "@/app/components/trip/SupportDrawer";
import QuickContactBar from "@/app/components/trip/QuickContactBar";

import {
  activeTrip,
  todayTimeline,
  tomorrowPreview,
  liveLocation,
  tripBookings,
  mockTicket,
  stayDetails,
  foodOrders,
  tripExpense,
  tripNotifications,
  tripActivityHistory,
  hostContact,
  directionsUrl,
  type TimelineActivity,
  type TicketDetails,
} from "@/lib/trip-dashboard-data";

const foodSteps = ["Ordered", "Preparing", "Ready", "Delivered"] as const;

const bookingStatusTone: Record<string, "sage" | "primary" | "terracotta" | "muted"> = {
  Confirmed: "sage",
  "In Progress": "primary",
  Pending: "muted",
  Completed: "muted",
  Cancelled: "terracotta",
};

export default function TravellerTripPage() {
  const [activities, setActivities] = useState<TimelineActivity[]>(todayTimeline);
  const [showReschedule, setShowReschedule] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketDetails>(mockTicket);
  const [sosOpen, setSosOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  function handleSkip(id: string) {
    setActivities((prev) => {
      const idx = prev.findIndex((a) => a.id === id);
      const updated = prev.map((a) => (a.id === id ? { ...a, status: "skipped" as const } : a));
      const nextIdx = updated.findIndex((a, i) => i > idx && (a.status === "upcoming" || a.status === "delayed"));
      if (nextIdx !== -1) updated[nextIdx] = { ...updated[nextIdx], status: "current" };
      return updated;
    });
    setShowReschedule(true);
  }

  function openTicket(details: TicketDetails) {
    setActiveTicket(details);
    setTicketOpen(true);
  }

  function openActivityTicket(activity: TimelineActivity) {
    openTicket({
      bookingId: mockTicket.bookingId,
      title: activity.title,
      date: "Today",
      time: activity.time,
      location: activity.location ?? activeTrip.destination,
      travellerName: mockTicket.travellerName,
      instructions: mockTicket.instructions,
    });
  }

  const current = activities.find((a) => a.status === "current");
  const remainingToday = activities.filter((a) => a.status === "upcoming" || a.status === "delayed");
  const completedCount = activities.filter((a) => a.status === "completed").length;
  const remainingCount = activities.filter((a) => a.status !== "completed" && a.status !== "skipped").length;
  const progressPct = Math.round((completedCount / activities.length) * 100);

  const statTiles = [
    { label: "Leave At", value: liveLocation.recommendedDeparture, icon: Clock },
    { label: "Bookings", value: String(tripBookings.length), icon: TicketIcon },
    { label: "Activities Done", value: `${completedCount}/${activities.length}`, icon: CheckCircle2 },
    { label: "Spent", value: `₹${tripExpense.spent.toLocaleString("en-IN")}`, icon: Wallet },
  ];

  return (
    <div className="space-y-5 pb-16">
      {/* Trip header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            Day {activeTrip.currentDay} of {activeTrip.totalDays}
          </p>
          <h1 className="heading-display text-2xl sm:text-3xl text-foreground">{activeTrip.name}</h1>
        </div>

        <div className="relative shrink-0">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors"
          >
            <Bell size={16} />
            {tripNotifications.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-terracotta border-2 border-background" />
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-xs font-semibold text-foreground">Trip Notifications</p>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-surface-hover">
                {tripNotifications.map((n) => (
                  <div key={n.id} className="px-4 py-3">
                    <p className="text-xs text-foreground">{n.message}</p>
                    <p className="text-[11px] text-subtle mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statTiles.map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-xl px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-muted">{s.label}</p>
              <s.icon size={13} className="text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground mt-1 tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Live status line */}
      <div className="bg-surface border border-border rounded-2xl px-5 py-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <StatusPill tone="sage">🟢 Currently at {current?.title ?? liveLocation.currentLabel}</StatusPill>
        <span className="text-muted">Next: <span className="text-foreground font-medium">{liveLocation.nextLabel}</span></span>
        <span className="text-muted ml-auto">Leave at <span className="text-primary font-semibold">{liveLocation.recommendedDeparture}</span></span>
      </div>

      {/* Instant access: contacts + ticket */}
      <div className="grid lg:grid-cols-4 gap-5">
        <SectionCard title="Quick Contacts" icon={Phone} className="lg:col-span-3">
          <div className="p-4">
            <QuickContactBar onOpenSupport={() => setSupportOpen(true)} onOpenSOS={() => setSosOpen(true)} />
          </div>
        </SectionCard>

        <SectionCard title="Show My Ticket" icon={TicketIcon}>
          <div className="p-4">
            <p className="text-sm font-medium text-foreground">{mockTicket.title}</p>
            <p className="text-xs text-muted mb-2">{mockTicket.date} · {mockTicket.time}</p>
            <StatusPill tone="sage">🟢 Confirmed</StatusPill>
            <button
              onClick={() => openTicket(mockTicket)}
              className="w-full mt-2.5 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
            >
              Show Ticket
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Hero: current activity + map */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <CurrentActivityHero activity={current} onSkip={handleSkip} />
        </div>
        <LiveMapCard location={liveLocation} />
      </div>

      {showReschedule && (
        <RescheduleBanner onAccept={() => setShowReschedule(false)} onKeep={() => setShowReschedule(false)} />
      )}

      {/* Dense info row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Today's Timeline">
          <div className="max-h-64 overflow-y-auto">
            <TripTimeline activities={activities} />
          </div>
        </SectionCard>

        <SectionCard title="Upcoming">
          <div className="max-h-64 overflow-y-auto divide-y divide-surface-hover">
            {remainingToday.map((a) => (
              <button
                key={a.id}
                onClick={() => openActivityTicket(a)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-surface-hover transition-colors"
              >
                <span className="text-xs text-foreground">
                  <span className="text-muted">{a.time}</span> — {a.title}
                </span>
                <ArrowUpRight size={12} className="text-subtle shrink-0" />
              </button>
            ))}
            <div className="px-4 py-2 bg-surface-hover/50">
              <p className="text-[10px] uppercase tracking-wider text-subtle">Tomorrow</p>
            </div>
            {tomorrowPreview.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="text-xs text-muted">
                  <span className="text-subtle">{a.time}</span> — {a.title}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="My Bookings" action={{ label: "View all", href: "/traveller/bookings" }}>
          <div className="max-h-64 overflow-y-auto divide-y divide-surface-hover">
            {tripBookings.slice(0, 4).map((b) => (
              <div key={b.id} className="px-4 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-foreground truncate">{b.title}</p>
                  <StatusPill tone={bookingStatusTone[b.status]}>{b.status}</StatusPill>
                </div>
                <p className="text-[11px] text-subtle mt-0.5">{b.category} · {b.date}, {b.time}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Trip Progress */}
      <div className="bg-surface border border-border rounded-2xl px-5 py-3.5 flex items-center gap-4">
        <p className="text-xs text-muted whitespace-nowrap">Day {activeTrip.currentDay} / {activeTrip.totalDays}</p>
        <div className="h-2 flex-1 rounded-full bg-surface-hover overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-xs text-muted whitespace-nowrap">{completedCount} done · {remainingCount} left</p>
      </div>

      {/* Stay / Food / Budget */}
      <div className="grid lg:grid-cols-3 gap-5">
        <SectionCard title="Your Stay">
          <div className="p-4">
            <div className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stayDetails.image} alt={stayDetails.propertyName} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{stayDetails.propertyName}</p>
                <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                  <MapPin size={11} /> {stayDetails.address}
                </p>
                <p className="text-xs text-subtle mt-1">{stayDetails.unit}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
              <div>
                <p className="text-subtle uppercase tracking-wider text-[10px] mb-0.5">Check-in</p>
                <p className="text-foreground font-medium">{stayDetails.checkIn}</p>
              </div>
              <div>
                <p className="text-subtle uppercase tracking-wider text-[10px] mb-0.5">Check-out</p>
                <p className="text-foreground font-medium">{stayDetails.checkOut}</p>
              </div>
            </div>

            <p className="text-xs text-muted flex items-center gap-1.5 mt-2">
              <Wifi size={12} /> {stayDetails.wifiSsid} · {stayDetails.wifiPassword}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <a href={`tel:${hostContact.phone}`} className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary-hover transition-colors">
                Call Host
              </a>
              <a href={directionsUrl(stayDetails.propertyName)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors">
                Directions
              </a>
              <Link href="/traveller/wishlist" className="px-3 py-1.5 border border-primary text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors">
                View Stay
              </Link>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Current Food Order">
          <div className="p-4">
            {foodOrders.map((order) => {
              const stepIdx = foodSteps.indexOf(order.status);
              return (
                <div key={order.id}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{order.meal}</p>
                    <span className="text-[11px] text-subtle">#{order.orderNumber}</span>
                  </div>
                  <p className="text-xs text-muted mb-2.5">{order.items}</p>
                  <div className="flex items-center gap-1.5">
                    {foodSteps.map((step, i) => (
                      <div key={step} className="flex-1 flex items-center gap-1.5">
                        <div className={`h-1.5 flex-1 rounded-full ${i <= stepIdx ? "bg-primary" : "bg-surface-hover"}`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs font-medium text-primary">{order.status}</p>
                    <p className="text-[11px] text-subtle">Expected: {order.expectedTime}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Trip Budget" icon={Wallet}>
          <div className="p-4">
            <div className="flex items-end justify-between mb-1">
              <p className="text-xl font-bold text-foreground tabular-nums">₹{tripExpense.budget.toLocaleString("en-IN")}</p>
            </div>
            <div className="h-2 rounded-full bg-surface-hover overflow-hidden mb-2.5">
              <div
                className="h-full rounded-full bg-terracotta"
                style={{ width: `${Math.min(100, Math.round((tripExpense.spent / tripExpense.budget) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mb-3">
              <span className="text-muted">Spent <span className="text-foreground font-medium">₹{tripExpense.spent.toLocaleString("en-IN")}</span></span>
              <span className="text-muted">Left <span className="text-sage font-medium">₹{(tripExpense.budget - tripExpense.spent).toLocaleString("en-IN")}</span></span>
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {tripExpense.breakdown.map((b) => (
                <div key={b.category} className="flex items-center justify-between text-xs">
                  <span className="text-muted">{b.category}</span>
                  <span className="text-foreground">₹{b.amount.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Trip Activity History">
        <button
          onClick={() => setHistoryOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 text-left"
        >
          <span className="text-xs text-muted flex items-center gap-1.5">
            <History size={13} /> {tripActivityHistory.length} logged events
          </span>
          {historyOpen ? <ChevronUp size={15} className="text-subtle" /> : <ChevronDown size={15} className="text-subtle" />}
        </button>
        {historyOpen && (
          <div className="divide-y divide-surface-hover border-t border-surface-hover">
            {tripActivityHistory.map((h) => (
              <div key={h.time + h.label} className="flex items-center gap-4 px-5 py-2.5">
                <span className="text-xs text-subtle w-16 shrink-0">{h.time}</span>
                <span className="text-xs text-foreground">{h.label}</span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      <TicketModal ticket={activeTicket} open={ticketOpen} onClose={() => setTicketOpen(false)} />
      {sosOpen && <SOSModal onClose={() => setSosOpen(false)} />}
      <SupportDrawer open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
}
