"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  Ticket as TicketIcon,
  Wifi,
  Phone,
  History,
  MapPin,
  CheckCircle2,
  Navigation,
  Clock,
} from "lucide-react";

import { SectionCard, StatusPill } from "@/app/components/DashboardUI";
import LiveMapCard from "@/app/components/trip/LiveMapCard";
import ItineraryPanel from "@/app/components/trip/ItineraryPanel";
import RescheduleBanner from "@/app/components/trip/RescheduleBanner";
import TicketModal from "@/app/components/trip/TicketModal";
import BookingDetailModal from "@/app/components/trip/BookingDetailModal";
import SOSModal from "@/app/components/trip/SOSModal";
import SupportDrawer from "@/app/components/trip/SupportDrawer";
import QuickContactBar from "@/app/components/trip/QuickContactBar";

import {
  activeTrip,
  todayTimeline,
  liveLocation,
  tripBookings,
  mockTicket,
  stayDetails,
  foodOrders,
  tripNotifications,
  tripActivityHistory,
  hostContact,
  directionsUrl,
  type TimelineActivity,
  type TicketDetails,
  type TripBooking,
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
  const [detailBooking, setDetailBooking] = useState<TripBooking | null>(null);

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

  function openBookingTicket(booking: (typeof tripBookings)[number]) {
    openTicket({
      bookingId: booking.id,
      title: booking.title,
      date: booking.date,
      time: booking.time,
      location: booking.location,
      travellerName: mockTicket.travellerName,
      instructions: mockTicket.instructions,
    });
  }

  const current = activities.find((a) => a.status === "current");
  const completedCount = activities.filter((a) => a.status === "completed").length;
  const remainingCount = activities.filter((a) => a.status !== "completed" && a.status !== "skipped").length;

  // ---- Staged trip progress: Arrival → Stay → Experience → Food → Activity → Departure ----
  const tripStages = ["Arrival", "Stay", "Experience", "Food", "Activity", "Departure"] as const;
  function stageForTitle(title?: string): (typeof tripStages)[number] {
    const t = (title ?? "").toLowerCase();
    if (/breakfast|lunch|dinner|food/.test(t)) return "Food";
    if (/check-?in|check-?out|stay/.test(t)) return "Stay";
    if (/airport|departure/.test(t)) return "Departure";
    return "Experience";
  }
  const tripComplete = activeTrip.currentDay >= activeTrip.totalDays && remainingCount === 0;
  const activeStage = tripComplete ? "Departure" : stageForTitle(current?.title);
  const activeStageIdx = tripStages.indexOf(activeStage);

  // ---- Now / Next / Later ----
  const currentIdx = activities.findIndex((a) => a.status === "current");
  const upcomingAfterCurrent = activities.slice(currentIdx + 1).filter((a) => a.status === "upcoming" || a.status === "delayed");
  const nextActivity = upcomingAfterCurrent[0];
  const laterActivity = upcomingAfterCurrent[1];

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

      {/* Live status line */}
      <div className="bg-surface border border-border rounded-2xl px-5 py-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <StatusPill tone="sage">🟢 Currently at {current?.title ?? liveLocation.currentLabel}</StatusPill>
        <span className="text-muted">Next: <span className="text-foreground font-medium">{liveLocation.nextLabel}</span></span>
        <span className="text-muted ml-auto">Leave at <span className="text-primary font-semibold">{liveLocation.recommendedDeparture}</span></span>
      </div>

      {/* Staged trip progress */}
      <div className="bg-surface border border-border rounded-2xl px-5 py-4">
        <div className="flex items-center">
          {tripStages.map((stage, i) => (
            <div key={stage} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                    i < activeStageIdx
                      ? "bg-sage text-white border-sage"
                      : i === activeStageIdx
                      ? "bg-primary text-white border-primary"
                      : "bg-surface-hover text-subtle border-border"
                  }`}
                >
                  {i < activeStageIdx ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                </span>
                <span className={`text-[10px] font-medium whitespace-nowrap ${i === activeStageIdx ? "text-primary" : "text-subtle"}`}>
                  {stage}
                </span>
              </div>
              {i < tripStages.length - 1 && (
                <span className={`flex-1 h-px mx-1.5 ${i < activeStageIdx ? "bg-sage" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-subtle mt-3">
          Day {activeTrip.currentDay} of {activeTrip.totalDays} · {completedCount} activities done · {remainingCount} left today
        </p>
      </div>

      {/* Now / Next / Later */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-primary/5 border border-primary/30 rounded-2xl p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1.5">Now</p>
          {current ? (
            <>
              <p className="text-sm font-semibold text-foreground">{current.title}</p>
              <p className="text-xs text-muted mt-1 flex items-center gap-1">
                <Clock size={11} /> {current.time}
              </p>
              {current.location && (
                <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                  <MapPin size={11} /> {current.location}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">Nothing in progress right now.</p>
          )}
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-subtle mb-1.5">Next</p>
          {nextActivity ? (
            <>
              <p className="text-sm font-semibold text-foreground">{nextActivity.title}</p>
              <p className="text-xs text-muted mt-1 flex items-center gap-1">
                <Clock size={11} /> {nextActivity.time}
                {nextActivity.title === liveLocation.nextLabel && ` · ${liveLocation.distanceKm} km away`}
              </p>
              <a
                href={directionsUrl(nextActivity.location ?? nextActivity.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary hover:underline"
              >
                <Navigation size={11} /> Navigate
              </a>
            </>
          ) : (
            <p className="text-sm text-muted">Nothing else planned today.</p>
          )}
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-subtle mb-1.5">Later</p>
          {laterActivity ? (
            <>
              <p className="text-sm font-semibold text-foreground">{laterActivity.title}</p>
              <p className="text-xs text-muted mt-1 flex items-center gap-1">
                <Clock size={11} /> {laterActivity.time}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">That&apos;s it for today.</p>
          )}
        </div>
      </div>

      {/* Map (top left, wider) + detailed itinerary with actions (right, proportion-driven) */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <LiveMapCard location={liveLocation} />
        </div>
        <ItineraryPanel
          activities={activities}
          onSkip={handleSkip}
          onReschedule={() => setShowReschedule(true)}
        />
      </div>

      {showReschedule && (
        <RescheduleBanner onAccept={() => setShowReschedule(false)} onKeep={() => setShowReschedule(false)} />
      )}

      {/* My Bookings */}
      <SectionCard title="My Bookings" action={{ label: "View all", href: "/traveller/bookings" }}>
        <div className="max-h-64 overflow-y-auto divide-y divide-surface-hover">
          {tripBookings.slice(0, 4).map((b) => (
            <div key={b.id} className="px-4 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-foreground truncate">{b.title}</p>
                {b.hasTicket ? (
                  <button
                    onClick={() => openBookingTicket(b)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-primary text-primary-foreground text-[11px] font-semibold rounded-lg hover:bg-primary-hover transition-colors shrink-0"
                  >
                    <TicketIcon size={11} /> Ticket
                  </button>
                ) : (
                  <StatusPill tone={bookingStatusTone[b.status]}>{b.status}</StatusPill>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-[11px] text-subtle">{b.category} · {b.date}, {b.time}</p>
                <button
                  onClick={() => setDetailBooking(b)}
                  className="text-[11px] text-primary hover:underline shrink-0"
                >
                  View Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Stay / Food */}
      <div className="grid lg:grid-cols-2 gap-5">
        <SectionCard title="Your Stay" action={{ label: "View full details", href: "/traveller/stay" }}>
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
      </div>

      {/* Quick contacts — kept small, tucked near the bottom */}
      <SectionCard title="Quick Contacts" icon={Phone}>
        <div className="p-4">
          <QuickContactBar onOpenSupport={() => setSupportOpen(true)} onOpenSOS={() => setSosOpen(true)} />
        </div>
      </SectionCard>

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
      <BookingDetailModal booking={detailBooking} open={detailBooking !== null} onClose={() => setDetailBooking(null)} />
      {sosOpen && <SOSModal onClose={() => setSosOpen(false)} />}
      <SupportDrawer open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
}
