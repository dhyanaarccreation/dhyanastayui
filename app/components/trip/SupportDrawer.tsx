"use client";

import Link from "next/link";
import { X, Phone, MessageCircle, Luggage, Home, Car, UtensilsCrossed, ChevronRight } from "lucide-react";
import { activeTrip } from "@/lib/trip-dashboard-data";

const problemTypes = [
  { id: "booking", label: "Booking Problem", icon: Luggage },
  { id: "stay", label: "Stay Problem", icon: Home },
  { id: "transport", label: "Transport Problem", icon: Car },
  { id: "food", label: "Food Problem", icon: UtensilsCrossed },
];

export default function SupportDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Need Help?</h3>
          <button onClick={onClose} className="text-subtle hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+911800123456"
              className="flex flex-col items-center gap-2 p-4 bg-surface border border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <Phone size={18} className="text-primary" />
              <span className="text-xs font-medium text-foreground">Call Support</span>
            </a>
            <Link
              href="/traveller/support"
              className="flex flex-col items-center gap-2 p-4 bg-surface border border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <MessageCircle size={18} className="text-primary" />
              <span className="text-xs font-medium text-foreground">Chat Support</span>
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted mb-2">Report a problem</p>
            <div className="divide-y divide-surface-hover border border-border rounded-xl overflow-hidden">
              {problemTypes.map((p) => (
                <Link
                  key={p.id}
                  href={`/traveller/support?issue=${p.id}&tripId=${activeTrip.id}`}
                  className="flex items-center gap-3 px-4 py-3 bg-surface hover:bg-surface-hover transition-colors"
                >
                  <p.icon size={16} className="text-muted shrink-0" />
                  <span className="text-sm text-foreground flex-1">{p.label}</span>
                  <ChevronRight size={14} className="text-subtle" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
