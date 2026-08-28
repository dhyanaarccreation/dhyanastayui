"use client";

import { useState } from "react";
import { Phone, MessageCircle, UserRound, Bike, Car, Headphones } from "lucide-react";

import { PageHeader, SectionCard } from "@/app/components/DashboardUI";
import SupportDrawer from "@/app/components/trip/SupportDrawer";
import { hostContact, guideContact, transportContacts, supportContact } from "@/lib/trip-dashboard-data";

export default function TravellerContactsPage() {
  const [supportOpen, setSupportOpen] = useState(false);

  const bike = transportContacts.find((t) => t.type === "Bike");
  const cab = transportContacts.find((t) => t.type === "Cab");

  const contacts = [
    { name: hostContact.name, role: "Property Host", phone: hostContact.phone, icon: UserRound },
    { name: guideContact.name, role: `Local Guide · ${guideContact.currentActivity}`, phone: guideContact.phone, icon: UserRound },
    ...(bike ? [{ name: bike.provider, role: `Bike Rental · ${bike.vehicle}`, phone: bike.phone, icon: Bike }] : []),
    ...(cab ? [{ name: cab.provider, role: `Cab · ${cab.vehicle}`, phone: cab.phone, icon: Car }] : []),
    { name: supportContact.name, role: "24/7 Trip Support", phone: supportContact.phone, icon: Headphones },
  ];

  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="Trip Contacts"
        subtitle="Everyone helping with this trip, one tap away — no digging through messages."
      />

      <SectionCard title="Contacts">
        <div className="divide-y divide-surface-hover">
          {contacts.map((c) => (
            <div key={c.name} className="flex items-center justify-between gap-4 px-5 py-4 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <c.icon size={17} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted truncate">{c.role}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                >
                  <Phone size={12} /> Call
                </a>
                <button
                  onClick={() => setSupportOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
                >
                  <MessageCircle size={12} /> Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SupportDrawer open={supportOpen} onClose={() => setSupportOpen(false)} />
    </div>
  );
}
