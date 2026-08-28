"use client";

import { Bike, LifeBuoy, ShieldAlert, UserRound } from "lucide-react";
import { hostContact, guideContact, transportContacts } from "@/lib/trip-dashboard-data";

export default function QuickContactBar({
  onOpenSupport,
  onOpenSOS,
}: {
  onOpenSupport: () => void;
  onOpenSOS: () => void;
}) {
  const transport = transportContacts[0];

  const items = [
    { label: "Host", icon: UserRound, href: `tel:${hostContact.phone}` },
    { label: "Guide", icon: UserRound, href: `tel:${guideContact.phone}` },
    { label: "Transport", icon: Bike, href: transport ? `tel:${transport.phone}` : undefined },
    { label: "Support", icon: LifeBuoy, onClick: onOpenSupport },
    { label: "SOS", icon: ShieldAlert, onClick: onOpenSOS, danger: true },
  ] as const;

  return (
    <div className="grid grid-cols-5 gap-1.5">
      {items.map((item) => {
        const content = (
          <>
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                "danger" in item && item.danger ? "bg-terracotta/10 text-terracotta" : "bg-primary/10 text-primary"
              }`}
            >
              <item.icon size={13} />
            </span>
            <span className="text-[10px] font-medium text-foreground">{item.label}</span>
          </>
        );
        const className =
          "flex flex-col items-center gap-1 py-2 bg-surface border border-border rounded-lg hover:border-primary/50 transition-colors";

        if ("href" in item && item.href) {
          return (
            <a key={item.label} href={item.href} className={className}>
              {content}
            </a>
          );
        }
        return (
          <button key={item.label} onClick={"onClick" in item ? item.onClick : undefined} className={className}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
