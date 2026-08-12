"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Camera, Pause, Play, Sparkles, Star, Volume2, VolumeX } from "lucide-react";
import type { Property, Review } from "@/lib/mock-data";
import { getStayReel, type EnrichedProperty, type StayReelItem, type StayReelTab } from "@/lib/content-generator";
import StayRoomSelector from "@/app/components/StayRoomSelector";

interface StayMediaExperienceProps {
  property: Property;
  enriched: EnrichedProperty;
  propertyReviews: Review[];
  reserveCard: React.ReactNode;
  onOpenStory: () => void;
  onOpenGallery: () => void;
  onOpenExperiences: () => void;
}

// The video-first hero for a Stay Details page: one large looping video
// beside the Reserve card, a horizontal story banner below it, then a
// tabbed horizontal reel. Only one real video asset exists per stay
// category today (`enriched.heroVideo`) — every "video" card below reuses
// that same real file across varied real property photos rather than
// inventing external URLs. Swapping in real per-clip videos later just
// means setting `videoSrc` per reel item.
export default function StayMediaExperience({
  property,
  enriched,
  propertyReviews,
  reserveCard,
  onOpenStory,
  onOpenGallery,
  onOpenExperiences,
}: StayMediaExperienceProps) {
  const tabs = useMemo<StayReelTab[]>(() => {
    const base = getStayReel(property, enriched);
    const guestStoryItems: StayReelItem[] = propertyReviews.slice(0, 6).map((r, i) => ({
      id: r.id,
      title: r.userName,
      caption: r.comment,
      thumbnail: r.images?.[0] ?? property.galleryImages[i % property.galleryImages.length] ?? property.images[0],
    }));
    return guestStoryItems.length ? [...base, { key: "guest-stories", label: "Guest Stories", items: guestStoryItems }] : base;
  }, [property, enriched, propertyReviews]);

  const [trackedPropertyId, setTrackedPropertyId] = useState(property.id);
  const [activeTabKey, setActiveTabKey] = useState(tabs[0].key);
  const [nowPlaying, setNowPlaying] = useState<StayReelItem>(tabs[0].items[0]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Navigating client-side between two different stay pages reuses this
  // component instance rather than remounting it — reset derived state
  // during render (React's documented pattern) when the property changes.
  if (trackedPropertyId !== property.id) {
    setTrackedPropertyId(property.id);
    setActiveTabKey(tabs[0].key);
    setNowPlaying(tabs[0].items[0]);
    setVideoFailed(false);
  }

  const activeTab = tabs.find((t) => t.key === activeTabKey) ?? tabs[0];
  const hasVideo = Boolean(nowPlaying.videoSrc) && !videoFailed;

  // Some browsers never fire a <video> "error" event for a bad source, so
  // also fall back to the poster image if playback never actually starts.
  // Cancelled the instant real playback is confirmed (`playing` flips true
  // via onPlay) so a short, successfully-looping clip is never mistaken for
  // a failed one just because it's still going after 8s.
  useEffect(() => {
    if (!nowPlaying.videoSrc || videoFailed || playing) return;
    const watchdog = setTimeout(() => {
      if (videoRef.current?.paused) setVideoFailed(true);
    }, 8000);
    return () => clearTimeout(watchdog);
  }, [nowPlaying.videoSrc, videoFailed, playing]);

  // Autoplay (muted) whenever the selected clip changes, including on mount.
  useEffect(() => {
    if (!hasVideo) return;
    videoRef.current?.play().catch(() => {});
  }, [nowPlaying.id, hasVideo]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const handleReelItemClick = (tab: StayReelTab, item: StayReelItem) => {
    if (tab.key === "experiences") {
      onOpenExperiences();
      return;
    }
    if (tab.key === "guest-stories") {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (item.videoSrc) {
      setVideoFailed(false);
      setNowPlaying(item);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-10 md:mb-14">
      {/* Hero media row — main video + story panel */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] lg:grid-cols-[2fr_1fr] gap-3 md:gap-4">
        {/* Main video */}
        <div className="relative aspect-video rounded-2xl sm:rounded-[28px] overflow-hidden bg-surface-hover group">
          {hasVideo ? (
            <video
              ref={videoRef}
              key={nowPlaying.id}
              autoPlay
              muted={muted}
              loop
              playsInline
              preload="metadata"
              poster={nowPlaying.thumbnail}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={nowPlaying.videoSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              src={nowPlaying.thumbnail}
              alt={property.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Now-playing label */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
            <span className="px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider bg-black/35 backdrop-blur-sm text-white rounded-full">
              {nowPlaying.title}
            </span>
          </div>

          {/* Photos — preserves access to the existing gallery modal */}
          <button
            type="button"
            onClick={onOpenGallery}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black/35 hover:bg-black/50 backdrop-blur-sm text-white rounded-full transition-colors"
          >
            <Camera size={13} /> Photos
          </button>

          {/* Playback controls */}
          {hasVideo && (
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause video" : "Play video"}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          )}
        </div>

        {/* Right column — stretched to the video's row height via CSS Grid's
            default `align-items: stretch` (`md:h-full`). Reserve sizes to
            its own natural (now host-free, trimmed) content height via
            `shrink-0`; Story fills whatever height is left over via
            `flex-1`, so the two always sum to exactly the video's height at
            any viewport width, without hardcoding a pixel guess for Story.
            `min-h` on Story is only a safety floor for extreme narrow cases
            where the video would otherwise be too short to leave it room. */}
        <div className="w-full md:h-full flex flex-col gap-2.5">
          {/* Story card — reuses the existing story modal/data */}
          <button
            type="button"
            onClick={onOpenStory}
            aria-label={`Discover the story behind ${property.name}`}
            className="relative rounded-2xl sm:rounded-[24px] overflow-hidden bg-surface-hover text-left group flex-1 min-h-[150px]"
          >
            <img
              src={property.images[0]}
              alt={property.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 group-hover:from-black/85 group-hover:via-black/35 transition-colors duration-300" />
            <div className="absolute inset-x-0 top-0 p-3.5 sm:p-4">
              <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-white/90">
                <Sparkles size={11} /> Our Story
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
              <p className="text-sm font-semibold text-white mb-1 line-clamp-1">
                {property.name}
              </p>
              <p className="text-[11px] text-white/75 leading-relaxed line-clamp-2 mb-1.5">
                {enriched.generatedStory}
              </p>
              <span className="group/link inline-flex items-center gap-1 text-xs font-medium text-white underline underline-offset-2 group-hover:text-primary transition-colors">
                Read Story
                <ArrowRight size={11} className="transition-transform group-hover/link:translate-x-0.5" />
              </span>
            </div>
          </button>

          {/* Reserve card — existing booking widget, sized to its own content */}
          <div className="w-full shrink-0">
            {reserveCard}
          </div>
        </div>
      </div>

      {/* Choose Your Space — room selector (no price, no Reserve CTA; both
          live solely in the single Reserve card above) */}
      <StayRoomSelector property={property} />

      {/* Media tabs + horizontal reel */}
      <div className="mt-6 md:mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          Stay Stories
        </p>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTabKey(tab.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all whitespace-nowrap ${
                activeTab.key === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-surface border-border/60 text-subtle hover:text-foreground hover:border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 mt-4 scrollbar-hide">
          {activeTab.items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleReelItemClick(activeTab, item)}
              className="group/card shrink-0 w-[160px] sm:w-[200px] text-left"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-surface-hover">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                {activeTab.key === "experiences" ? (
                  <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-foreground">
                    <ArrowRight size={14} />
                  </span>
                ) : item.videoSrc ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 flex items-center justify-center text-foreground shadow-lg transition-transform duration-300 group-hover/card:scale-110">
                      <Play size={15} className="ml-0.5" />
                    </span>
                  </span>
                ) : null}

                {activeTab.key === "guest-stories" && (
                  <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-sm text-[10px] font-medium text-white">
                    <Star size={10} className="fill-white" /> Guest
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
              {item.caption && (
                <p className="text-xs text-subtle line-clamp-1 mt-0.5">{item.caption}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
