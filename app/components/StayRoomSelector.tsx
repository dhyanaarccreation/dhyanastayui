"use client";

import { useState } from "react";
import { Check, Heart, Users } from "lucide-react";
import type { Property } from "@/lib/mock-data";
import { getStayRooms, type StayRoom } from "@/lib/content-generator";

const CATEGORIES = ["All", "Rooms", "Suites", "Private Spaces"] as const;

// "Choose Your Space" room selector. Selecting a room only changes which
// room is highlighted/summarized here — it never changes the property price
// or the Reserve action, both of which live solely in the right-side
// Reserve card (passed down separately, untouched by this component).
export default function StayRoomSelector({ property }: { property: Property }) {
  const rooms = getStayRooms(property);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[1]?.id ?? rooms[0].id);

  const visibleRooms = activeCategory === "All" ? rooms : rooms.filter((r) => r.category === activeCategory);
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) ?? rooms[0];

  return (
    <div className="mt-6 md:mt-7 bg-surface-hover/50 border border-border rounded-2xl sm:rounded-[24px] p-3.5 sm:p-4">
      <div className="mb-2.5">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">
          <Users size={12} /> Choose Your Space
        </span>
        <p className="text-base sm:text-lg font-semibold text-foreground">
          Pick a room that feels right for you
        </p>
        <p className="text-xs text-muted mt-0.5">
          Each space is thoughtfully designed for comfort and calm.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3 scroll-smooth scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-medium border transition-all whitespace-nowrap ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-surface border-border/60 text-subtle hover:text-foreground hover:border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Room cards — horizontally scrollable carousel. Each shows its own
          informational per-room price; this never feeds the property-level
          Reserve price, which is passed down separately and unaffected by
          selection here. */}
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-proximity scroll-smooth scrollbar-hide">
        {visibleRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={room.id === selectedRoomId}
            onSelect={() => setSelectedRoomId(room.id)}
          />
        ))}
      </div>

      {/* Selected-room summary — no price, no Reserve CTA here; the single
          Reserve button lives in the right-side price card. */}
      <div className="mt-2.5 flex items-center gap-3 bg-surface border border-border rounded-xl p-2">
        <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-hover">
          <img
            src={selectedRoom.image}
            alt={selectedRoom.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-subtle leading-tight">1 Room Selected</p>
          <p className="text-sm font-medium text-foreground truncate">
            {selectedRoom.name} · {selectedRoom.guests} Guests · {selectedRoom.bedType}
          </p>
        </div>
      </div>
    </div>
  );
}

function RoomCard({
  room,
  isSelected,
  onSelect,
}: {
  room: StayRoom;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="shrink-0 snap-start w-[170px] sm:w-[190px] bg-surface border border-border rounded-xl overflow-hidden">
      <div className="relative h-20 sm:h-24 overflow-hidden bg-surface-hover">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          type="button"
          aria-label={`Save ${room.name}`}
          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-red-400 transition-colors"
        >
          <Heart size={12} />
        </button>
        {isSelected && (
          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-semibold uppercase tracking-wider">
            Selected
          </span>
        )}
      </div>
      <div className="p-2.5">
        <p className="text-[13px] font-semibold text-foreground mb-0.5 line-clamp-1">{room.name}</p>
        <p className="text-[11px] text-muted mb-1">
          {room.guests} Guests · {room.bedType}
        </p>
        <p className="text-sm font-semibold text-foreground mb-2">
          ₹{room.price.toLocaleString()}
          <span className="text-[11px] font-normal text-subtle"> /night</span>
        </p>
        <button
          type="button"
          onClick={onSelect}
          className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
            isSelected
              ? "bg-primary/10 border-primary text-primary"
              : "bg-surface border-border text-foreground hover:border-primary/50"
          }`}
        >
          {isSelected ? (
            <>
              <Check size={11} /> Selected
            </>
          ) : (
            "Select"
          )}
        </button>
      </div>
    </div>
  );
}
