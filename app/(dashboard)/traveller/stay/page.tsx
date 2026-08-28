"use client";

import { MapPin, Wifi, CheckCircle2, Info, Car } from "lucide-react";

import { PageHeader, SectionCard } from "@/app/components/DashboardUI";
import { stayDetails, hostContact, directionsUrl } from "@/lib/trip-dashboard-data";

export default function TravellerStayPage() {
  return (
    <div className="space-y-6 pb-16">
      <PageHeader title="My Stay" subtitle={`${stayDetails.propertyName} · ${stayDetails.unit}`} />

      <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-2/5 h-56 md:h-auto bg-surface-hover relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stayDetails.image} alt={stayDetails.propertyName} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-foreground">{stayDetails.propertyName}</h2>
          <p className="text-sm text-muted flex items-center gap-1.5 mt-1">
            <MapPin size={14} /> {stayDetails.address}
          </p>
          <p className="text-xs text-subtle mt-1">{stayDetails.unit}</p>

          <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-surface-hover">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Check-in</div>
              <div className="text-sm font-medium text-foreground">{stayDetails.checkIn}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Check-out</div>
              <div className="text-sm font-medium text-foreground">{stayDetails.checkOut}</div>
            </div>
          </div>

          <p className="text-xs text-muted flex items-center gap-1.5 mt-4">
            <Wifi size={12} /> {stayDetails.wifiSsid} · {stayDetails.wifiPassword}
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <a
              href={`tel:${hostContact.phone}`}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary-hover transition-colors"
            >
              Call Host
            </a>
            <a
              href={directionsUrl(stayDetails.propertyName)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface transition-colors"
            >
              <Car size={14} /> Navigate to Stay
            </a>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <SectionCard title="Amenities & Facilities" icon={CheckCircle2}>
          <div className="p-5 grid grid-cols-2 gap-y-2.5 gap-x-3">
            {stayDetails.facilities.map((f) => (
              <span key={f} className="text-sm text-foreground flex items-center gap-2">
                <CheckCircle2 size={13} className="text-sage shrink-0" /> {f}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="House Rules & Instructions" icon={Info}>
          <ul className="p-5 space-y-2.5">
            {stayDetails.houseRules.map((r) => (
              <li key={r} className="text-sm text-muted flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-subtle mt-1.5 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Host">
        <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hostContact.avatar} alt={hostContact.name} className="w-11 h-11 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{hostContact.name}</p>
              <p className="text-xs text-muted">Property Host</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:${hostContact.phone}`}
              className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
            >
              Call
            </a>
            <a
              href={`sms:${hostContact.phone}`}
              className="px-4 py-2 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
            >
              Chat
            </a>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
