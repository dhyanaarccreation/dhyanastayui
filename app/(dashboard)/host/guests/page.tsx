"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Clock, MessageCircle, Phone, Send, Star, Users } from "lucide-react";
import { PageHeader } from "@/app/components/DashboardUI";

const threads = [
  { name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=5", property: "Canopy Tiny House", preview: "Is early check-in possible on the 24th?", time: "2m", unread: true, active: true },
  { name: "Aditya Menon", avatar: "https://i.pravatar.cc/150?img=15", property: "Stone Valley Farm", preview: "The farm tour was amazing, thank you!", time: "1h", unread: true, active: false },
  { name: "Meera Krishnan", avatar: "https://i.pravatar.cc/150?img=41", property: "Canopy Tiny House", preview: "Left a review — loved the deck!", time: "1d", unread: false, active: false },
  { name: "Rahul Nair", avatar: "https://i.pravatar.cc/150?img=53", property: "Stone Valley Farm", preview: "Could you share the UPI for the balance?", time: "2d", unread: false, active: false },
];

const conversation = [
  { from: "guest", text: "Hi Vikram! We land in Chennai at 9 AM on the 24th. Is early check-in possible?", time: "10:42 AM" },
  { from: "host", text: "Hi Priya! Standard check-in is 2 PM, but the house is free the previous night — you can check in from 11 AM at no charge.", time: "10:47 AM" },
  { from: "guest", text: "That's perfect. Also — is the outdoor bathtub usable in monsoon?", time: "10:49 AM" },
  { from: "host", text: "Absolutely, it's under the canopy. Rain makes it better, honestly 🌧️", time: "10:52 AM" },
];

// Guest information, emergency contact and arrival time — keyed by guest name.
const guestDetails: Record<
  string,
  {
    partySize: number;
    stayDates: string;
    checkInDate: string;
    arrivalTime: string;
    emergencyContact: { name: string; phone: string };
  }
> = {
  "Priya Sharma": {
    partySize: 2,
    stayDates: "Jul 24 – 28",
    checkInDate: "Jul 24",
    arrivalTime: "11:00 AM",
    emergencyContact: { name: "Anand Sharma (spouse)", phone: "+91 98765 43210" },
  },
  "Aditya Menon": {
    partySize: 4,
    stayDates: "Jul 18 – 21",
    checkInDate: "Jul 18",
    arrivalTime: "2:00 PM",
    emergencyContact: { name: "Kavya Menon (sister)", phone: "+91 90000 11223" },
  },
  "Meera Krishnan": {
    partySize: 2,
    stayDates: "Jul 10 – 13",
    checkInDate: "Jul 10",
    arrivalTime: "1:30 PM",
    emergencyContact: { name: "Suresh Krishnan (father)", phone: "+91 98111 22334" },
  },
  "Rahul Nair": {
    partySize: 3,
    stayDates: "Aug 2 – 5",
    checkInDate: "Aug 2",
    arrivalTime: "4:00 PM",
    emergencyContact: { name: "Divya Nair (spouse)", phone: "+91 99887 66554" },
  },
};

const activeGuestName = "Priya Sharma";
const activeGuest = { name: activeGuestName, ...guestDetails[activeGuestName] };

export default function HostGuestsPage() {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyContact = () => {
    navigator.clipboard.writeText(activeGuest.emergencyContact.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pb-12">
      <PageHeader
        title="Guest Messages"
        subtitle="Conversations with current and upcoming guests across your properties."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Threads */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-surface-hover flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageCircle size={15} className="text-primary" /> Inbox
            </h2>
            <span className="text-[10px] font-semibold bg-primary/15 text-primary px-2 py-0.5 rounded-full">2 new</span>
          </div>
          <ul className="divide-y divide-surface-hover">
            {threads.map((t) => (
              <li key={t.name}>
                <button
                  className={`w-full flex items-start gap-3 px-5 py-4 text-left transition-colors ${
                    t.active ? "bg-primary/10" : "hover:bg-surface-hover"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{t.name}</p>
                      <span className="text-[10px] text-subtle shrink-0">{t.time}</span>
                    </div>
                    <p className="text-[11px] text-subtle">{t.property}</p>
                    <p className={`text-xs mt-0.5 truncate ${t.unread ? "text-foreground font-medium" : "text-muted"}`}>
                      {t.preview}
                    </p>
                  </div>
                  {t.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Conversation */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl flex flex-col overflow-hidden min-h-[480px]">
          <div className="px-5 py-4 border-b border-surface-hover flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.pravatar.cc/150?img=5" alt="Priya Sharma" className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Priya Sharma</p>
              <p className="text-[11px] text-muted">Canopy Tiny House · Jul 24 – 28 · 2 guests</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-muted">
              <Star size={11} className="text-primary fill-primary" /> 5.0 guest rating
            </span>
          </div>

          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {conversation.map((m, i) => (
              <div key={i} className={`flex ${m.from === "host" ? "justify-end" : ""}`}>
                <div className="max-w-[75%]">
                  <p
                    className={`text-sm px-4 py-2.5 rounded-2xl ${
                      m.from === "host"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-surface-hover text-foreground rounded-tl-sm"
                    }`}
                  >
                    {m.text}
                  </p>
                  <p className={`text-[10px] text-subtle mt-1 ${m.from === "host" ? "text-right" : ""}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-surface-hover flex items-center gap-2">
            <input
              placeholder="Reply to Priya…"
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-full text-sm text-foreground placeholder-subtle focus:outline-none focus:border-primary"
            />
            <button
              aria-label="Send"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover transition-colors shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Guest Details */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => setDetailsOpen((v) => !v)}
          className="w-full px-5 py-4 border-b border-surface-hover flex items-center justify-between text-left"
        >
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users size={15} className="text-primary" /> Guest Details — {activeGuest.name}
          </h2>
          <ChevronDown
            size={16}
            className={`text-subtle transition-transform ${detailsOpen ? "rotate-180" : ""}`}
          />
        </button>

        {detailsOpen && (
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-surface-hover">
            <div className="p-5 space-y-2">
              <p className="text-[11px] font-semibold text-subtle uppercase tracking-wide">Guest Information</p>
              <p className="text-sm font-medium text-foreground">{activeGuest.name}</p>
              <p className="text-xs text-muted flex items-center gap-1.5">
                <Users size={12} /> {activeGuest.partySize} guests
              </p>
              <p className="text-xs text-muted flex items-center gap-1.5">
                <Calendar size={12} /> {activeGuest.stayDates}
              </p>
            </div>

            <div className="p-5 space-y-2">
              <p className="text-[11px] font-semibold text-subtle uppercase tracking-wide">Emergency Contact</p>
              <p className="text-sm font-medium text-foreground">{activeGuest.emergencyContact.name}</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted flex items-center gap-1.5">
                  <Phone size={12} /> {activeGuest.emergencyContact.phone}
                </p>
                <button
                  onClick={handleCopyContact}
                  className="text-[10px] font-semibold text-primary hover:underline shrink-0"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="p-5 space-y-2">
              <p className="text-[11px] font-semibold text-subtle uppercase tracking-wide">Arrival Time</p>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Clock size={13} className="text-primary" /> {activeGuest.arrivalTime}
              </p>
              <p className="text-xs text-muted">Expected check-in on {activeGuest.checkInDate}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
