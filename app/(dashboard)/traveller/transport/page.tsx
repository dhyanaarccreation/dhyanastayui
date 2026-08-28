"use client";

import { Bike, Car, Phone, MapPin, Clock } from "lucide-react";

import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { transportContacts, directionsUrl } from "@/lib/trip-dashboard-data";

const typeIcon = { Bike, Car, Cab: Car } as const;

const statusTone = {
  Confirmed: "sage",
  "In Progress": "primary",
  Completed: "muted",
} as const;

export default function TravellerTransportPage() {
  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="My Transport"
        subtitle="Every ride booked for this trip — driver, vehicle and pickup details in one place."
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {transportContacts.map((t) => {
          const Icon = typeIcon[t.type];
          return (
            <SectionCard key={t.bookingId} title={`${t.type} · ${t.provider}`} icon={Icon}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.vehicle}</p>
                    {t.driverName && <p className="text-xs text-muted mt-0.5">Driver: {t.driverName}</p>}
                  </div>
                  {t.status && <StatusPill tone={statusTone[t.status]}>{t.status}</StatusPill>}
                </div>

                <div className="space-y-1.5 text-xs text-muted">
                  {t.pickupTime && (
                    <p className="flex items-center gap-1.5">
                      <Clock size={12} /> Pickup at {t.pickupTime}
                    </p>
                  )}
                  {t.pickupLocation && (
                    <p className="flex items-center gap-1.5">
                      <MapPin size={12} /> {t.pickupLocation}
                    </p>
                  )}
                  <p className="text-subtle">Booking ID: {t.bookingId}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <a
                    href={`tel:${t.phone}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    <Phone size={12} /> Call Driver
                  </a>
                  {t.pickupLocation && (
                    <a
                      href={directionsUrl(t.pickupLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
                    >
                      Navigate
                    </a>
                  )}
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>
    </div>
  );
}
