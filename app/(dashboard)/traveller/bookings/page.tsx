"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Download, Filter, Phone } from "lucide-react";
import { properties } from "@/lib/mock-data";
import { tripBookings, mockTicket, type TicketDetails, type BookingStatus, type TripBooking } from "@/lib/trip-dashboard-data";
import TicketModal from "@/app/components/trip/TicketModal";
import BookingDetailModal from "@/app/components/trip/BookingDetailModal";
import { StatusPill } from "@/app/components/DashboardUI";

const tripBookingStatusTone: Record<BookingStatus, "sage" | "primary" | "terracotta" | "muted"> = {
  Confirmed: "sage",
  "In Progress": "primary",
  Pending: "muted",
  Completed: "muted",
  Cancelled: "terracotta",
};

// ============================================
// Local mock booking data — cycles through a
// handful of real properties from mock-data.ts
// ============================================

interface UpcomingBooking {
  id: string;
  propertyIndex: number;
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface PastBooking {
  id: string;
  propertyIndex: number;
  checkIn: string;
  checkOut: string;
  guests: string;
}

interface CancelledBooking {
  id: string;
  propertyIndex: number;
  checkIn: string;
  checkOut: string;
  guests: string;
  reason: string;
  refundStatus: string;
}

const upcomingBookings: UpcomingBooking[] = [
  { id: "DHY-847291", propertyIndex: 0, checkIn: "2026-10-15", checkOut: "2026-10-18", guests: "2 Adults" },
  { id: "DHY-552013", propertyIndex: 3, checkIn: "2026-11-02", checkOut: "2026-11-05", guests: "2 Adults, 1 Child" },
  { id: "DHY-390847", propertyIndex: 6, checkIn: "2026-09-20", checkOut: "2026-09-23", guests: "4 Adults" },
  { id: "DHY-716420", propertyIndex: 2, checkIn: "2026-12-24", checkOut: "2026-12-28", guests: "2 Adults" },
  { id: "DHY-208835", propertyIndex: 4, checkIn: "2026-08-30", checkOut: "2026-09-02", guests: "3 Adults" },
];

const pastBookings: PastBooking[] = [
  { id: "DHY-102938", propertyIndex: 1, checkIn: "2026-05-10", checkOut: "2026-05-14", guests: "2 Adults" },
  { id: "DHY-664521", propertyIndex: 5, checkIn: "2026-03-02", checkOut: "2026-03-05", guests: "2 Adults" },
  { id: "DHY-478390", propertyIndex: 7, checkIn: "2026-01-18", checkOut: "2026-01-21", guests: "4 Adults" },
  { id: "DHY-931207", propertyIndex: 0, checkIn: "2025-12-05", checkOut: "2025-12-08", guests: "2 Adults" },
  { id: "DHY-155062", propertyIndex: 3, checkIn: "2025-10-22", checkOut: "2025-10-25", guests: "2 Adults, 2 Children" },
];

const cancelledBookings: CancelledBooking[] = [
  {
    id: "DHY-283047",
    propertyIndex: 4,
    checkIn: "2026-07-12",
    checkOut: "2026-07-15",
    guests: "2 Adults",
    reason: "Change of travel plans",
    refundStatus: "Fully refunded",
  },
  {
    id: "DHY-609174",
    propertyIndex: 6,
    checkIn: "2026-06-01",
    checkOut: "2026-06-04",
    guests: "3 Adults",
    reason: "Host cancelled due to property maintenance",
    refundStatus: "Fully refunded",
  },
];

function getProperty(index: number) {
  return properties[index % properties.length];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatRange(checkIn: string, checkOut: string) {
  const start = new Date(checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const end = new Date(checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${start} - ${end}`;
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketDetails>(mockTicket);
  const [detailBooking, setDetailBooking] = useState<TripBooking | null>(null);

  function openBookingTicket(booking: (typeof tripBookings)[number]) {
    setActiveTicket({
      bookingId: booking.id,
      title: booking.title,
      date: booking.date,
      time: booking.time,
      location: booking.location,
      travellerName: mockTicket.travellerName,
      instructions: mockTicket.instructions,
    });
    setTicketOpen(true);
  }

  const query = search.trim().toLowerCase();

  function matchesQuery<T extends { id: string; propertyIndex: number }>(list: T[]): T[] {
    if (!query) return list;
    return list.filter((booking) => {
      const property = getProperty(booking.propertyIndex);
      return property.name.toLowerCase().includes(query) || booking.id.toLowerCase().includes(query);
    });
  }

  function sortByDate<T extends { checkIn: string }>(list: T[]): T[] {
    return [...list].sort((a, b) => {
      const diff = new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
      return sortAsc ? diff : -diff;
    });
  }

  const filteredUpcoming = sortByDate(matchesQuery(upcomingBookings));
  const filteredPast = sortByDate(matchesQuery(pastBookings));
  const filteredCancelled = sortByDate(matchesQuery(cancelledBookings));

  return (
    <div className="pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="heading-display text-3xl text-foreground mb-2">My Bookings</h1>
          <p className="text-sm text-muted">Manage your upcoming stays and review past trips.</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by property or booking ID..."
              className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={() => setSortAsc((s) => !s)}
            title={sortAsc ? "Sorted: earliest date first" : "Sorted: latest date first"}
            className={`p-2 border rounded-xl transition-colors ${
              sortAsc
                ? "bg-surface border-border text-muted hover:text-foreground"
                : "bg-primary/10 border-primary/30 text-primary"
            }`}
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-6 border-b border-border mb-4">
        {["upcoming", "past", "cancelled", "trip"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
              activeTab === tab ? "text-foreground" : "text-subtle hover:text-muted"
            }`}
          >
            {tab === "trip" ? "This Trip" : tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === "upcoming" && (
          filteredUpcoming.length > 0 ? (
            filteredUpcoming.map((booking) => {
              const property = getProperty(booking.propertyIndex);
              return (
                <div
                  key={booking.id}
                  className="bg-surface border border-primary/30 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                >
                  <div className="md:w-64 h-48 md:h-auto bg-surface-hover relative">
                    <img src={property.images[0]} alt="" className="w-full h-full object-cover opacity-90" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 text-[10px] uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20 font-semibold">
                        Confirmed
                      </span>
                      <span className="text-xs text-subtle">ID: {booking.id}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">{property.name}</h3>
                    <p className="text-sm text-muted flex items-center gap-1 mb-6">
                      <MapPin size={14} /> {property.location.city}, {property.location.state}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Check-in</div>
                        <div className="text-sm font-medium text-foreground">{formatDate(booking.checkIn)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Check-out</div>
                        <div className="text-sm font-medium text-foreground">{formatDate(booking.checkOut)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Guests</div>
                        <div className="text-sm font-medium text-foreground">{booking.guests}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      <button className="px-5 py-2 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface-hover transition-colors">
                        Contact Host
                      </button>
                      <button className="px-5 py-2 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-primary/10 transition-colors">
                        Manage Booking
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-border border-dashed rounded-2xl">
              <p className="text-muted">No upcoming bookings match your search.</p>
            </div>
          )
        )}

        {activeTab === "past" && (
          filteredPast.length > 0 ? (
            filteredPast.map((booking) => {
              const property = getProperty(booking.propertyIndex);
              return (
                <div
                  key={booking.id}
                  className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="md:w-64 h-48 md:h-auto bg-surface-hover relative">
                    <img
                      src={property.images[0]}
                      alt=""
                      className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 text-[10px] uppercase tracking-wider bg-border text-muted rounded-full font-semibold">
                        Completed
                      </span>
                      <span className="text-xs text-subtle">ID: {booking.id}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">{property.name}</h3>
                    <p className="text-sm text-muted flex items-center gap-1 mb-6">
                      <MapPin size={14} /> {property.location.city}, {property.location.state}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Dates</div>
                        <div className="text-sm font-medium text-foreground">{formatRange(booking.checkIn, booking.checkOut)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Guests</div>
                        <div className="text-sm font-medium text-foreground">{booking.guests}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      <Link
                        href={`/stays/${property.slug}`}
                        className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary-hover transition-colors"
                      >
                        Book Again
                      </Link>
                      <button className="px-5 py-2 flex items-center gap-2 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface-hover transition-colors">
                        <Download size={14} /> Invoice
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-border border-dashed rounded-2xl">
              <p className="text-muted">No past bookings match your search.</p>
            </div>
          )
        )}

        {activeTab === "cancelled" && (
          filteredCancelled.length > 0 ? (
            filteredCancelled.map((booking) => {
              const property = getProperty(booking.propertyIndex);
              return (
                <div
                  key={booking.id}
                  className="bg-surface border border-terracotta/30 rounded-2xl overflow-hidden flex flex-col md:flex-row opacity-90 hover:opacity-100 transition-opacity"
                >
                  <div className="md:w-64 h-48 md:h-auto bg-surface-hover relative">
                    <img src={property.images[0]} alt="" className="w-full h-full object-cover opacity-50 grayscale" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 text-[10px] uppercase tracking-wider bg-terracotta/10 text-terracotta rounded-full border border-terracotta/20 font-semibold">
                        Cancelled
                      </span>
                      <span className="text-xs text-subtle">ID: {booking.id}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">{property.name}</h3>
                    <p className="text-sm text-muted flex items-center gap-1 mb-6">
                      <MapPin size={14} /> {property.location.city}, {property.location.state}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Dates</div>
                        <div className="text-sm font-medium text-foreground">{formatRange(booking.checkIn, booking.checkOut)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Refund Status</div>
                        <div className="text-sm font-medium text-sage">{booking.refundStatus}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Cancellation Reason</div>
                        <div className="text-sm text-muted">{booking.reason}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      <Link
                        href={`/stays/${property.slug}`}
                        className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary-hover transition-colors"
                      >
                        Book Again
                      </Link>
                      <button className="px-5 py-2 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface-hover transition-colors">
                        Contact Host
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-border border-dashed rounded-2xl">
              <p className="text-muted">
                {query ? "No cancelled bookings match your search." : "You have no cancelled bookings."}
              </p>
            </div>
          )
        )}

        {activeTab === "trip" && (
          <div className="grid md:grid-cols-2 gap-4">
            {tripBookings.map((booking) => (
              <div key={booking.id} className="bg-surface border border-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">{booking.category}</p>
                    <h3 className="text-sm font-semibold text-foreground">{booking.title}</h3>
                  </div>
                  <StatusPill tone={tripBookingStatusTone[booking.status]}>{booking.status}</StatusPill>
                </div>
                <p className="text-xs text-muted flex items-center gap-1 mb-1">
                  {booking.date}, {booking.time}
                </p>
                <p className="text-xs text-muted flex items-center gap-1 mb-4">
                  <MapPin size={12} /> {booking.location}
                </p>
                <p className="text-[11px] text-subtle mb-3">ID: {booking.id}</p>
                <div className="flex flex-wrap gap-2">
                  {booking.hasTicket && (
                    <button
                      onClick={() => openBookingTicket(booking)}
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      Ticket
                    </button>
                  )}
                  <button
                    onClick={() => setDetailBooking(booking)}
                    className="px-3 py-1.5 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
                  >
                    View Booking
                  </button>
                  {booking.contactPhone && (
                    <a
                      href={`tel:${booking.contactPhone}`}
                      className="px-3 py-1.5 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors flex items-center gap-1"
                    >
                      <Phone size={11} /> Contact
                    </a>
                  )}
                  {booking.directionsHref && (
                    <a
                      href={booking.directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border border-primary text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      Directions
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TicketModal ticket={activeTicket} open={ticketOpen} onClose={() => setTicketOpen(false)} />
      <BookingDetailModal booking={detailBooking} open={detailBooking !== null} onClose={() => setDetailBooking(null)} />
    </div>
  );
}
