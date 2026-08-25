"use client";

import { X, User, Calendar, Clock, MapPin } from "lucide-react";
import type { TicketDetails } from "@/lib/trip-dashboard-data";

function hashSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

function seededValue(seed: number, index: number) {
  const x = Math.sin(seed + index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function QRPlaceholder({ seed, size = 96 }: { seed: string; size?: number }) {
  const cells = 9;
  const baseSeed = hashSeed(seed);
  const isFinder = (r: number, c: number) =>
    (r < 3 && c < 3) || (r < 3 && c >= cells - 3) || (r >= cells - 3 && c < 3);

  const modules: boolean[][] = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => (isFinder(r, c) ? true : seededValue(baseSeed, r * cells + c) > 0.55))
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${cells} ${cells}`} className="shrink-0" role="img" aria-label="Ticket QR code placeholder">
      <rect width={cells} height={cells} fill="var(--color-background)" />
      {modules.map((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="var(--color-foreground)" /> : null
        )
      )}
      {[[0, 0], [0, cells - 3], [cells - 3, 0]].map(([fr, fc]) => (
        <rect key={`${fr}-${fc}`} x={fc + 0.75} y={fr + 0.75} width={1.5} height={1.5} fill="var(--color-background)" />
      ))}
    </svg>
  );
}

export default function TicketModal({
  ticket,
  open,
  onClose,
}: {
  ticket: TicketDetails;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

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
          <h3 className="text-sm font-semibold text-foreground">Your Ticket</h3>
          <button onClick={onClose} className="text-subtle hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-dashed border-border">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">Dhyana Pass</p>
              <h4 className="text-lg font-semibold text-foreground leading-tight">{ticket.title}</h4>
              <p className="text-xs text-subtle mt-1">ID: {ticket.bookingId}</p>
            </div>
            <QRPlaceholder seed={ticket.bookingId} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <Calendar size={11} /> Date
              </p>
              <p className="text-sm font-medium text-foreground">{ticket.date}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <Clock size={11} /> Time
              </p>
              <p className="text-sm font-medium text-foreground">{ticket.time}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <MapPin size={11} /> Location
              </p>
              <p className="text-sm font-medium text-foreground">{ticket.location}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-subtle mb-1 flex items-center gap-1">
                <User size={11} /> Traveller
              </p>
              <p className="text-sm font-medium text-foreground">{ticket.travellerName}</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-xs font-semibold text-foreground mb-2">Important instructions</p>
            <ul className="space-y-1.5">
              {ticket.instructions.map((line) => (
                <li key={line} className="text-xs text-muted flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-subtle mt-1.5 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
