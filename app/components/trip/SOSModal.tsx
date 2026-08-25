"use client";

import { useState } from "react";
import { X, ShieldAlert, BellRing } from "lucide-react";
import { hostContact } from "@/lib/trip-dashboard-data";

export default function SOSModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"confirm" | "activated">("confirm");

  return (
    <div className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ShieldAlert size={16} className="text-terracotta" /> Emergency Assistance
          </h3>
          <button onClick={onClose} className="text-subtle hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 text-center">
          {step === "confirm" ? (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-terracotta/10 flex items-center justify-center mb-4">
                <ShieldAlert size={28} className="text-terracotta" />
              </div>
              <p className="text-sm text-foreground font-medium mb-1">Are you sure you need emergency help?</p>
              <p className="text-xs text-muted mb-6">
                This will alert your host and Dhyana&apos;s 24×7 response team with your trip details.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep("activated")}
                  className="flex-1 py-2.5 bg-terracotta text-white text-sm font-semibold rounded-xl hover:bg-terracotta/90 transition-colors"
                >
                  Confirm SOS
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <span className="absolute inset-0 rounded-full bg-terracotta/30 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-terracotta flex items-center justify-center">
                  <BellRing size={26} className="text-white" />
                </div>
              </div>
              <p className="text-sm text-foreground font-semibold mb-1">Emergency alert sent</p>
              <p className="text-xs text-muted mb-6">
                {hostContact.name} and Dhyana&apos;s support team have been notified with your live trip details. Someone will reach out shortly.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface transition-colors"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
