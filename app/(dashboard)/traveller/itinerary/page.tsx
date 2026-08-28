"use client";

import { useState } from "react";
import { MapPin, Users, Calendar, ChevronDown, ArrowUpRight, CheckCircle2, Circle, AlertTriangle, XCircle } from "lucide-react";

import { PageHeader, SectionCard, StatGrid } from "@/app/components/DashboardUI";
import TicketModal from "@/app/components/trip/TicketModal";

import {
  activeTrip,
  fullItinerary,
  tripBookings,
  mockTicket,
  directionsUrl,
  type TicketDetails,
  type ActivityStatus,
} from "@/lib/trip-dashboard-data";

type TabId = "today" | "tomorrow" | "all";

const stopStatusStyle: Record<ActivityStatus, { icon: typeof Circle; className: string }> = {
  completed: { icon: CheckCircle2, className: "text-sage" },
  current: { icon: Circle, className: "text-primary fill-primary" },
  upcoming: { icon: Circle, className: "text-subtle" },
  delayed: { icon: AlertTriangle, className: "text-terracotta" },
  skipped: { icon: XCircle, className: "text-subtle" },
};

export default function TravellerItineraryPage() {
  const [tab, setTab] = useState<TabId>("today");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketDetails>(mockTicket);

  const todayDay = fullItinerary.find((d) => d.day === activeTrip.currentDay);
  const tomorrowDay = fullItinerary.find((d) => d.day === activeTrip.currentDay + 1);

  const daysToShow = tab === "today" ? (todayDay ? [todayDay] : []) : tab === "tomorrow" ? (tomorrowDay ? [tomorrowDay] : []) : fullItinerary;

  const countByCategory = (categories: string[]) =>
    tripBookings.filter((b) => categories.includes(b.category)).length;

  const stats = [
    { label: "Stay", value: String(countByCategory(["Stay"])) },
    { label: "Transport", value: String(countByCategory(["Bike Rental", "Car Rental", "Cab"])) },
    { label: "Experiences", value: String(countByCategory(["Experience", "Workshop"])) },
    { label: "Food & Events", value: String(countByCategory(["Food Order", "Event"])) },
  ];

  function openStopTicket(dayLabel: string, stop: { time: string; title: string; location?: string }) {
    setActiveTicket({
      bookingId: mockTicket.bookingId,
      title: stop.title,
      date: dayLabel,
      time: stop.time,
      location: stop.location ?? activeTrip.destination,
      travellerName: mockTicket.travellerName,
      instructions: mockTicket.instructions,
    });
    setTicketOpen(true);
  }

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Complete Travel Plan"
        subtitle={`${activeTrip.name} · ${activeTrip.startDate.slice(5)} – ${activeTrip.endDate.slice(5)}`}
      />

      <div className="bg-surface border border-border rounded-2xl p-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-1.5 text-foreground font-medium">
          <MapPin size={14} className="text-primary" /> {activeTrip.destination}
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <Calendar size={14} /> {activeTrip.startDate.slice(5)} – {activeTrip.endDate.slice(5)}
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <Users size={14} /> {activeTrip.travellers} Travellers
        </span>
      </div>

      <StatGrid stats={stats} />

      <div className="flex gap-6 border-b border-border">
        {(["today", "tomorrow", "all"] as TabId[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
              tab === t ? "text-foreground" : "text-subtle hover:text-muted"
            }`}
          >
            {t === "all" ? "All Days" : t}
            {tab === t && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {daysToShow.map((day) => (
          <SectionCard key={day.day} title={`Day ${day.day} · ${day.date}`}>
            <div className="divide-y divide-surface-hover">
              {day.items.map((stop) => {
                const key = `${day.day}-${stop.time}-${stop.title}`;
                const isOpen = expanded === key;
                const { icon: StatusIcon, className: statusClassName } = stopStatusStyle[stop.status ?? "upcoming"];
                return (
                  <div key={key}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : key)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-surface-hover transition-colors"
                    >
                      <span className="flex items-center gap-2.5 text-sm text-foreground min-w-0">
                        <StatusIcon size={14} className={`shrink-0 ${statusClassName}`} />
                        <span className={stop.status === "skipped" ? "line-through text-subtle" : ""}>
                          <span className="text-muted">{stop.time}</span> — {stop.title}
                        </span>
                      </span>
                      <ChevronDown size={14} className={`text-subtle shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 -mt-1 flex flex-wrap items-center gap-3">
                        {stop.location && (
                          <span className="text-xs text-muted flex items-center gap-1">
                            <MapPin size={12} /> {stop.location}
                          </span>
                        )}
                        {stop.location && (
                          <a
                            href={directionsUrl(stop.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            Directions <ArrowUpRight size={11} />
                          </a>
                        )}
                        <button
                          onClick={() => openStopTicket(`Day ${day.day}`, stop)}
                          className="text-xs text-primary hover:underline"
                        >
                          View Ticket
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionCard>
        ))}
      </div>

      <TicketModal ticket={activeTicket} open={ticketOpen} onClose={() => setTicketOpen(false)} />
    </div>
  );
}
