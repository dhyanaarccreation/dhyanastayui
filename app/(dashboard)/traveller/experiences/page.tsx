"use client";

import { useState } from "react";
import { Clock, MapPin, Phone, Backpack, Check, X } from "lucide-react";

import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import TicketModal from "@/app/components/trip/TicketModal";
import { tripExperiences, mockTicket, type TicketDetails, type BookingStatus } from "@/lib/trip-dashboard-data";

const statusTone: Record<BookingStatus, "sage" | "primary" | "terracotta" | "muted"> = {
  Confirmed: "sage",
  "In Progress": "primary",
  Pending: "muted",
  Completed: "muted",
  Cancelled: "terracotta",
};

export default function TravellerExperiencesPage() {
  const [ticketOpen, setTicketOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<TicketDetails>(mockTicket);

  function openExperienceTicket(exp: (typeof tripExperiences)[number]) {
    setActiveTicket({
      bookingId: exp.id,
      title: exp.title,
      date: exp.date,
      time: exp.time,
      location: exp.location,
      travellerName: mockTicket.travellerName,
      instructions: exp.whatToBring,
    });
    setTicketOpen(true);
  }

  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="My Experiences"
        subtitle="Every guided experience and workshop booked for this trip, with meeting point and contact details."
      />

      <div className="space-y-5">
        {tripExperiences.map((exp) => (
          <SectionCard key={exp.id} title={exp.title}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {exp.date} · {exp.time} · {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {exp.location}
                  </span>
                </div>
                <StatusPill tone={statusTone[exp.status]}>{exp.status}</StatusPill>
              </div>

              <p className="text-sm text-muted leading-relaxed">{exp.description}</p>

              <div className="grid sm:grid-cols-2 gap-3 mt-4 text-xs">
                <div className="rounded-xl bg-surface-hover p-3">
                  <p className="text-subtle uppercase tracking-wider text-[10px] mb-1">Meeting point</p>
                  <p className="text-foreground">{exp.meetingPoint}</p>
                </div>
                <div className="rounded-xl bg-surface-hover p-3">
                  <p className="text-subtle uppercase tracking-wider text-[10px] mb-1">Responsible person</p>
                  <p className="text-foreground">{exp.responsiblePerson}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-subtle mb-1.5 flex items-center gap-1">
                    <Backpack size={11} /> What to bring
                  </p>
                  <ul className="space-y-1">
                    {exp.whatToBring.map((item) => (
                      <li key={item} className="text-xs text-muted">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle mb-1.5">Included</p>
                    <ul className="space-y-1">
                      {exp.included.map((item) => (
                        <li key={item} className="text-xs text-sage flex items-start gap-1">
                          <Check size={11} className="mt-0.5 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle mb-1.5">Not included</p>
                    <ul className="space-y-1">
                      {exp.notIncluded.map((item) => (
                        <li key={item} className="text-xs text-subtle flex items-start gap-1">
                          <X size={11} className="mt-0.5 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <a
                  href={`tel:${exp.contactPhone}`}
                  className="flex items-center gap-1.5 px-4 py-2 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
                >
                  <Phone size={12} /> Contact
                </a>
                {exp.hasTicket && (
                  <button
                    onClick={() => openExperienceTicket(exp)}
                    className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    View Ticket
                  </button>
                )}
              </div>
            </div>
          </SectionCard>
        ))}
      </div>

      <TicketModal ticket={activeTicket} open={ticketOpen} onClose={() => setTicketOpen(false)} />
    </div>
  );
}
