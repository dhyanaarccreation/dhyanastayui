"use client";

import { useState } from "react";
import {
  ShieldAlert,
  HeartPulse,
  Car,
  Shield,
  MapPin,
  Bus,
  Home,
  HelpCircle,
  BellRing,
  Check,
  Phone,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/app/components/DashboardUI";
import { hostContact, supportContact } from "@/lib/trip-dashboard-data";

type EmergencyType = "Medical emergency" | "Accident" | "Safety issue" | "Lost" | "Transport emergency" | "Property emergency" | "Other";

const emergencyTypes: { label: EmergencyType; icon: LucideIcon }[] = [
  { label: "Medical emergency", icon: HeartPulse },
  { label: "Accident", icon: Car },
  { label: "Safety issue", icon: Shield },
  { label: "Lost", icon: MapPin },
  { label: "Transport emergency", icon: Bus },
  { label: "Property emergency", icon: Home },
  { label: "Other", icon: HelpCircle },
];

type Step = "select" | "confirm" | "contacting" | "notified";

export default function TravellerSosPage() {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<EmergencyType | null>(null);

  function selectType(type: EmergencyType) {
    setSelected(type);
    setStep("confirm");
  }

  function confirmSos() {
    setStep("contacting");
    window.setTimeout(() => setStep("notified"), 1400);
  }

  function reset() {
    setStep("select");
    setSelected(null);
  }

  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="SOS / Emergency"
        subtitle="Immediate help — this notifies your host and Dhyana's 24×7 response team with your live trip details."
      />

      {step === "select" && (
        <div className="bg-surface border border-terracotta/30 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-20 h-20 mb-3">
              <span className="absolute inset-0 rounded-full bg-terracotta/20 animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-terracotta flex items-center justify-center">
                <ShieldAlert size={32} className="text-white" />
              </div>
            </div>
            <p className="text-base font-semibold text-foreground">Are you in an emergency?</p>
            <p className="text-xs text-muted mt-1 max-w-sm">
              Choose what&apos;s happening — we&apos;ll confirm, then alert the right people immediately.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {emergencyTypes.map((t) => (
              <button
                key={t.label}
                onClick={() => selectType(t.label)}
                className="flex flex-col items-center gap-2 py-4 bg-surface-hover border border-border rounded-xl hover:border-terracotta/50 hover:bg-terracotta/5 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
                  <t.icon size={17} />
                </span>
                <span className="text-xs font-medium text-foreground text-center px-1">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "confirm" && selected && (
        <div className="bg-surface border border-terracotta/30 rounded-2xl p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
            <ShieldAlert size={28} className="text-terracotta" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">Confirm: {selected}</p>
          <p className="text-xs text-muted mb-6">
            This will alert {hostContact.name} and {supportContact.name} with your live trip location and details.
          </p>
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 py-2.5 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmSos}
              className="flex-1 py-2.5 bg-terracotta text-white text-sm font-semibold rounded-xl hover:bg-terracotta/90 transition-colors"
            >
              Confirm SOS
            </button>
          </div>
        </div>
      )}

      {step === "contacting" && (
        <div className="bg-surface border border-terracotta/30 rounded-2xl p-8 text-center max-w-md mx-auto">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <span className="absolute inset-0 rounded-full bg-terracotta/30 animate-ping" />
            <div className="relative w-16 h-16 rounded-full bg-terracotta flex items-center justify-center">
              <BellRing size={26} className="text-white" />
            </div>
          </div>
          <p className="text-sm font-semibold text-foreground">Contacting support…</p>
          <p className="text-xs text-muted mt-1">Sharing your trip and location details.</p>
        </div>
      )}

      {step === "notified" && (
        <div className="bg-surface border border-sage/30 rounded-2xl p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-sage/15 flex items-center justify-center mb-4">
            <Check size={28} className="text-sage" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">Help is on the way</p>
          <p className="text-xs text-muted mb-6">
            {hostContact.name} and {supportContact.name} have been notified for &ldquo;{selected}&rdquo; with your live trip details. Someone will reach out shortly.
          </p>
          <div className="flex gap-3">
            <a
              href={`tel:${supportContact.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-terracotta text-white text-sm font-semibold rounded-xl hover:bg-terracotta/90 transition-colors"
            >
              <Phone size={14} /> Call Support Now
            </a>
            <button
              onClick={reset}
              className="flex-1 py-2.5 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
