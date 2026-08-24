"use client";

import { useState } from "react";
import { Check, Heart } from "lucide-react";
import type { StayRoom } from "@/lib/content-generator";

const CATEGORIES = ["All", "Rooms", "Suites", "Private Spaces"] as const;

// "Choose Your Space" room selector. Selection is controlled by the parent
// (StayMediaExperience) so the same pick also drives the Reserve card's
// price — see the reserveCard render-prop wiring there.
export default function StayRoomSelector({
  rooms,
  selectedRoomId,
  onSelectRoom,
}: {
  rooms: StayRoom[];
  selectedRoomId: string;
  onSelectRoom: (roomId: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const visibleRooms = activeCategory === "All" ? rooms : rooms.filter((r) => r.category === activeCategory);

  return (
    <div className="mt-6 md:mt-7 bg-surface-hover/50 border border-border rounded-2xl sm:rounded-[24px] p-3.5 sm:p-4">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <p className="text-base sm:text-lg font-semibold text-foreground">
          Pick a room that feels right for you
        </p>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scroll-smooth scrollbar-hide">
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
      </div>

      {/* Room cards — horizontally scrollable carousel. Selecting one here
          also updates the price shown in the Reserve card above. */}
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-proximity scroll-smooth scrollbar-hide">
        {visibleRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={room.id === selectedRoomId}
            onSelect={() => onSelectRoom(room.id)}
          />
        ))}
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
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`shrink-0 snap-start w-[170px] sm:w-[190px] bg-surface border rounded-xl overflow-hidden text-left cursor-pointer transition-colors ${
        isSelected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40"
      }`}
    >
      <div className="relative h-20 sm:h-24 overflow-hidden bg-surface-hover">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Save ${room.name}`}
          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-red-400 transition-colors"
        >
          <Heart size={12} />
        </button>
        {isSelected && (
          <span className="absolute top-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-semibold uppercase tracking-wider">
            <Check size={10} /> Selected
          </span>
        )}
      </div>
      <div className="p-2.5">
        <p className="text-[13px] font-semibold text-foreground mb-0.5 line-clamp-1">{room.name}</p>
        <p className="text-[11px] text-muted mb-1">
          {room.guests} Guests · {room.bedType}
        </p>
        <p className="text-sm font-semibold text-foreground">
          ₹{room.price.toLocaleString()}
          <span className="text-[11px] font-normal text-subtle"> /night</span>
        </p>
      </div>
    </div>
  );
}
