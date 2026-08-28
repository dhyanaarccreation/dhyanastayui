"use client";

import { X, User, Calendar, Users, MapPin, CreditCard, ShieldCheck, Download } from "lucide-react";
import type { TripBooking } from "@/lib/trip-dashboard-data";
import { hostContact, mockTicket } from "@/lib/trip-dashboard-data";

export default function BookingDetailModal({
  booking,
  open,
  onClose,
}: {
  booking: TripBooking | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !booking) return null;

  return (
    <div
      className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{booking.title}</h3>
            <p className="text-xs text-subtle mt-0.5">Booking ID: {booking.id}</p>
          </div>
          <button onClick={onClose} className="text-subtle hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <User size={11} /> Guest name
              </p>
              <p className="text-sm font-medium text-foreground">{mockTicket.travellerName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <Users size={11} /> Guests
              </p>
              <p className="text-sm font-medium text-foreground">{booking.guests ?? 1}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <Calendar size={11} /> Date & time
              </p>
              <p className="text-sm font-medium text-foreground">{booking.date}, {booking.time}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1">Category</p>
              <p className="text-sm font-medium text-foreground">{booking.category}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <MapPin size={11} /> Property / Address
              </p>
              <p className="text-sm font-medium text-foreground">{booking.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-surface border border-border p-3">
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <CreditCard size={11} /> Payment status
              </p>
              <p className="text-xs font-medium text-foreground">{booking.paymentStatus ?? "—"}</p>
            </div>
            <div className="rounded-xl bg-surface border border-border p-3">
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <ShieldCheck size={11} /> Cancellation policy
              </p>
              <p className="text-xs text-muted">{booking.cancellationPolicy ?? "—"}</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hostContact.avatar} alt={hostContact.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{hostContact.name}</p>
                <p className="text-[11px] text-muted">Host contact</p>
              </div>
            </div>
            <a
              href={`tel:${booking.contactPhone ?? hostContact.phone}`}
              className="shrink-0 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
            >
              Call
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors">
              <Download size={12} /> Invoice / Receipt
            </button>
            {booking.directionsHref && (
              <a
                href={booking.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-primary text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors"
              >
                Directions
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
