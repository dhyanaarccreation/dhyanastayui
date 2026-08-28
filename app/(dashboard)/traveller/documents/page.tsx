"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket as TicketIcon, FileText, ArrowUpRight } from "lucide-react";

import { PageHeader, SectionCard } from "@/app/components/DashboardUI";
import TicketModal from "@/app/components/trip/TicketModal";
import { tripBookings, mockTicket, type TicketDetails } from "@/lib/trip-dashboard-data";

export default function TravellerDocumentsPage() {
  const [ticketOpen, setTicketOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketDetails>(mockTicket);

  const ticketedBookings = tripBookings.filter((b) => b.hasTicket);

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

  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="Tickets & Documents"
        subtitle="Every ticket for this trip, one tap away — plus your saved travel documents."
      />

      <SectionCard title="This Trip's Tickets" icon={TicketIcon}>
        <div className="divide-y divide-surface-hover">
          {ticketedBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{b.title}</p>
                <p className="text-xs text-muted mt-0.5">{b.category} · {b.date}, {b.time}</p>
              </div>
              <button
                onClick={() => openBookingTicket(b)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
              >
                <TicketIcon size={12} /> Open Ticket
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Travel Documents" icon={FileText}>
        <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted max-w-md">
            Your KYC, passport and travel insurance documents are managed on your profile.
          </p>
          <Link
            href="/traveller/profile"
            className="flex items-center gap-1.5 px-4 py-2 border border-primary text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors whitespace-nowrap"
          >
            View Documents <ArrowUpRight size={12} />
          </Link>
        </div>
      </SectionCard>

      <TicketModal ticket={activeTicket} open={ticketOpen} onClose={() => setTicketOpen(false)} />
    </div>
  );
}
