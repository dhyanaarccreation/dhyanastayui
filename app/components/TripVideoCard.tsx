"use client";

import { useState } from "react";
import { Play, Camera, PlayCircle, ExternalLink } from "lucide-react";

// ============================================
// TripVideoCard — the "watch the trip" unit used
// on a Travel Guide Experience Page. Plays inline
// (no forced navigation away from Dhyana) and links
// out to the curator's real channel/profile instead
// of embedding a fabricated video URL — see the
// "video platform UI" note in AGENTS.md.
// ============================================

export type VideoPlatform = "youtube" | "instagram";

interface TripVideoCardProps {
  label: string; // e.g. "Day 1 — White Town & the Coast"
  thumbnail: string;
  platform: VideoPlatform;
  curatorName: string;
  profileUrl?: string;
  className?: string;
}

const platformMeta: Record<VideoPlatform, { icon: typeof Play; name: string }> = {
  youtube: { icon: PlayCircle, name: "YouTube" },
  instagram: { icon: Camera, name: "Instagram" },
};

export default function TripVideoCard({
  label,
  thumbnail,
  platform,
  curatorName,
  profileUrl,
  className = "",
}: TripVideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const PlatformIcon = platformMeta[platform].icon;

  return (
    <div className={className}>
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-foreground group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={label}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            playing ? "scale-105 brightness-[0.35]" : "group-hover:scale-105"
          }`}
        />
        {!playing && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />}

        <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider">
          <PlatformIcon size={11} /> {platformMeta[platform].name}
        </span>

        {playing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
            <span className="w-14 h-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center animate-pulse">
              <Play size={20} className="text-white fill-white ml-0.5" />
            </span>
            <p className="text-white text-sm font-medium">{label}</p>
            <p className="text-white/60 text-[11px] max-w-xs">
              Demo preview — {curatorName}&rsquo;s real trip video connects here.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${label}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-organic transition-colors">
              <Play size={20} className="text-foreground fill-foreground ml-0.5" />
            </span>
          </button>
        )}

        {!playing && (
          <p className="absolute bottom-3 left-3.5 right-3.5 text-white text-sm font-medium truncate">{label}</p>
        )}
      </div>

      {profileUrl && (
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
        >
          <PlatformIcon size={12} /> Watch on {platformMeta[platform].name} <ExternalLink size={10} />
        </a>
      )}
    </div>
  );
}
