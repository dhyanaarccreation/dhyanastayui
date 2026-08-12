"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Star,
  Share,
  Heart,
  ChevronRight,
  Users,
  BedDouble,
  BookOpen,
  ArrowRight,
  Sparkles,
  X,
  Leaf,
  HeartHandshake,
  Sprout,
  CookingPot,
  Bird,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { getBlogRecommendations, getHeroVideo } from "@/lib/content-generator";
import { vaksanaFarms, vaksanaUnitDetails, getVaksanaAccommodations, getVaksanaReviews } from "@/lib/vaksana-farms";

const experienceIcons: Record<string, LucideIcon> = { Sprout, CookingPot, Bird, Flame };

// Vaksana Farms overview page — a farm-level information page (hero, story,
// experiences, gallery, reviews, location) with an "Available Stays"
// carousel that links out to each unit's own, completely unmodified stay
// detail page. Content here never changes based on which card a visitor
// looks at — every stay has its own dedicated page, exactly like every
// other property on the site.
export default function VaksanaFarmsPage() {
  const accommodations = getVaksanaAccommodations();
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Hero background video — same verified Farm Stay asset already playing on
  // each unit's own detail page. Falls back to the static hero photo if the
  // video errors out or never actually starts playing.
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoSrc = getHeroVideo("Farm Stay");

  useEffect(() => {
    if (heroVideoFailed) return;
    const watchdog = setTimeout(() => {
      const video = heroVideoRef.current;
      if (video && video.currentTime === 0) setHeroVideoFailed(true);
    }, 8000);
    return () => clearTimeout(watchdog);
  }, [heroVideoFailed]);

  const blogGuides = getBlogRecommendations(vaksanaFarms.location.city);
  const farmReviews = getVaksanaReviews();

  // Gallery modal — ESC to close, lock body scroll while open.
  useEffect(() => {
    if (!galleryOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage((current) => {
          if (current) return null;
          setGalleryOpen(false);
          return current;
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [galleryOpen]);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumb & Actions */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-subtle">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/#explore-stays" className="hover:text-foreground transition-colors">
              Stays
            </Link>
            <ChevronRight size={12} />
            <span className="text-muted">Vaksana Farms</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-surface-hover transition-colors">
              <Share size={14} /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-surface-hover hover:text-red-400 transition-colors">
              <Heart size={14} /> Save
            </button>
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-6">
        <h1 className="heading-display text-3xl md:text-5xl text-foreground mb-3">Vaksana Farms</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-primary fill-primary" />
            <span className="font-semibold text-foreground">{vaksanaFarms.rating}</span>
            <a href="#reviews" className="underline hover:text-foreground">
              {vaksanaFarms.reviewCount} reviews
            </a>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <a href="#location" className="underline hover:text-foreground">
              Near {vaksanaFarms.location.city}, {vaksanaFarms.location.state}, India
            </a>
          </div>
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded-full">
            Organic Farm Stay
          </span>
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-sage/10 text-sage border border-sage/20 rounded-full">
            {vaksanaFarms.unitsLabel}
          </span>
        </div>
      </div>

      {/* Gallery Grid (hero) — farm-level, unchanged regardless of which stay a visitor picks below */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-6">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-4 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
          <div className="col-span-4 md:col-span-2 row-span-2 bg-surface-hover relative overflow-hidden">
            {heroVideoFailed ? (
              <img src={vaksanaFarms.heroImage} alt={vaksanaFarms.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <video
                ref={heroVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={vaksanaFarms.heroImage}
                onError={() => setHeroVideoFailed(true)}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={heroVideoSrc} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          </div>

          {/* Top middle — farm gallery preview, opens the full gallery modal */}
          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            aria-label="View more photos of Vaksana Farms"
            className="hidden md:block col-span-1 row-span-1 bg-surface-hover overflow-hidden cursor-pointer relative group"
          >
            <img
              src={vaksanaFarms.gallery[1]}
              alt={vaksanaFarms.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-foreground text-sm font-semibold shadow-lg">
                View More <ArrowRight size={14} />
              </span>
            </div>
          </button>

          {/* Top right — "Our Story" */}
          <button
            type="button"
            onClick={() => setStoryOpen(true)}
            aria-label="Discover the story behind Vaksana Farms"
            className="hidden md:block col-span-1 row-span-1 bg-surface-hover overflow-hidden cursor-pointer relative group text-left"
          >
            <img
              src={vaksanaFarms.heroImage}
              alt={vaksanaFarms.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-colors duration-300" />
            <div className="absolute inset-x-0 top-0 p-4">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/90">
                <Sparkles size={12} /> Our Story
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 group-hover:-translate-y-1">
              <p className="text-sm font-semibold text-white mb-1 line-clamp-1">Vaksana Farms</p>
              <p className="text-[11px] text-white/75 leading-relaxed line-clamp-2 mb-2">{vaksanaFarms.story}</p>
              <span className="group/link inline-flex items-center gap-1 text-xs font-medium text-white underline underline-offset-2 group-hover:text-primary transition-colors">
                Read Story
                <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
              </span>
            </div>
          </button>

          {/* Bottom middle — featured farm experience */}
          <button
            type="button"
            onClick={() => setExperiencesOpen(true)}
            aria-label="View all curated experiences at Vaksana Farms"
            className="hidden md:block col-span-1 row-span-1 bg-surface-hover overflow-hidden cursor-pointer relative group text-left"
          >
            <img
              src={vaksanaFarms.experiences[0].image}
              alt={vaksanaFarms.experiences[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-colors duration-300" />
            <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/90">
                <Sparkles size={12} /> Curated Experiences
              </span>
              <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-white/90 text-foreground rounded-full">
                Featured
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-sm font-semibold text-white mb-2 line-clamp-1">{vaksanaFarms.experiences[0].name}</p>
              <span className="group/link inline-flex items-center gap-1 text-xs font-medium text-white underline underline-offset-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                View All Experiences
                <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
              </span>
            </div>
          </button>

          {/* Bottom right — travel guides */}
          <div className="hidden md:flex col-span-1 row-span-1 bg-surface flex-col p-3 gap-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary px-1 mb-1.5">
              Travel Guides
            </p>
            {blogGuides.slice(0, 3).map((guide) => (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                className="group/link flex items-center justify-between gap-2 px-1 py-1.5 rounded-lg hover:bg-surface-hover transition-colors"
              >
                <span className="flex items-center gap-1.5 text-xs text-foreground min-w-0">
                  <BookOpen size={11} className="text-sage shrink-0" />
                  <span className="truncate">{guide.title}</span>
                </span>
                <ArrowRight
                  size={11}
                  className="text-subtle group-hover/link:text-primary transition-transform group-hover/link:translate-x-0.5 shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Curated Experiences Modal */}
      {experiencesOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-white/40 backdrop-blur-md animate-fade-in"
          onClick={() => setExperiencesOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-background rounded-3xl shadow-2xl p-5 md:p-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="heading-display text-xl md:text-2xl text-foreground">Curated Experiences</h3>
                <p className="text-sm text-muted">{vaksanaFarms.experiences.length} experiences at Vaksana Farms</p>
              </div>
              <button
                type="button"
                onClick={() => setExperiencesOpen(false)}
                aria-label="Close curated experiences"
                className="w-10 h-10 rounded-full bg-surface-hover hover:bg-surface border border-border flex items-center justify-center text-foreground transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {vaksanaFarms.experiences.map((experience, i) => {
                const Icon = experienceIcons[experience.icon] ?? Sparkles;
                return (
                  <div key={experience.name} className="rounded-2xl border border-border bg-surface overflow-hidden">
                    <div className="relative h-36 overflow-hidden bg-surface-hover">
                      <img
                        src={experience.image}
                        alt={experience.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {i === 0 && (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Icon size={13} />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mb-1.5">{experience.name}</h4>
                      <p className="text-xs text-muted leading-relaxed">{experience.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Story Modal */}
      {storyOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-white/40 backdrop-blur-md animate-fade-in"
          onClick={() => setStoryOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-background rounded-3xl shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl bg-surface-hover">
              <img
                src={vaksanaFarms.heroImage}
                alt={vaksanaFarms.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <button
                type="button"
                onClick={() => setStoryOpen(false)}
                aria-label="Close story"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                  <Sparkles size={12} /> Our Story
                </span>
                <h3 className="heading-display text-2xl md:text-3xl text-white mt-1">Vaksana Farms</h3>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-muted leading-relaxed mb-8">{vaksanaFarms.story}</p>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Mission &amp; Vision</h4>
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <span className="w-20 shrink-0 text-xs font-semibold text-foreground">Mission</span>
                  <p className="text-sm text-muted leading-relaxed">{vaksanaFarms.mission}</p>
                </div>
                <div className="flex gap-4">
                  <span className="w-20 shrink-0 text-xs font-semibold text-foreground">Vision</span>
                  <p className="text-sm text-muted leading-relaxed">{vaksanaFarms.vision}</p>
                </div>
              </div>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">Gallery</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {vaksanaFarms.gallery.map((src, i) => (
                  <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-hover">
                    <img
                      src={src}
                      alt={`Vaksana Farms photo ${i + 1}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-white/40 backdrop-blur-md"
            onClick={() => {
              setGalleryOpen(false);
              setSelectedImage(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-background rounded-3xl shadow-2xl p-5 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="heading-display text-xl md:text-2xl text-foreground">Gallery</h3>
                  <p className="text-sm text-muted">{vaksanaFarms.gallery.length} photos of Vaksana Farms</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setGalleryOpen(false);
                    setSelectedImage(null);
                  }}
                  aria-label="Close gallery"
                  className="w-11 h-11 rounded-full bg-surface-hover hover:bg-surface border border-border flex items-center justify-center text-foreground transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="columns-2 md:columns-3 gap-3 md:gap-4">
                {vaksanaFarms.gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    aria-label={`Open photo ${i + 1} larger`}
                    className="group/img block w-full mb-3 md:mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-surface-hover"
                  >
                    <motion.img
                      layoutId={`gallery-${src}`}
                      src={src}
                      alt={`Vaksana Farms photo ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-3xl flex items-center justify-center p-6"
                    onClick={() => setSelectedImage(null)}
                  >
                    <motion.img
                      layoutId={`gallery-${selectedImage}`}
                      src={selectedImage}
                      alt={vaksanaFarms.name}
                      className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                      aria-label="Close enlarged photo"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-hover hover:bg-surface border border-border flex items-center justify-center text-foreground transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Available Stays at Vaksana Farms — new carousel, each card is a real,
            independently bookable stay with its own dedicated page. Placed
            immediately below the hero so it's visible with minimal scrolling. */}
        <div className="pt-2 pb-8 border-b border-surface-hover">
          <h2 className="heading-display text-2xl text-foreground mb-2">Available Stays at Vaksana Farms</h2>
          <p className="text-sm text-muted mb-6">
            Four individually designed stays, one working organic farm — each with its own page.
          </p>

          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6 lg:-mx-8 lg:px-8">
            {accommodations.map((unit) => {
              const unitLabel = unit.name.split("—").pop()?.trim() ?? unit.name;
              const details = vaksanaUnitDetails[unit.slug];
              return (
                <Link
                  key={unit.id}
                  href={`/stays/${unit.slug}`}
                  className="group snap-start shrink-0 w-[85%] sm:w-[47%] lg:w-[31%] rounded-2xl sm:rounded-[28px] overflow-hidden bg-surface border border-border card-hover"
                >
                  <div className="relative h-48 overflow-hidden bg-surface-hover">
                    <img
                      src={unit.images[0]}
                      alt={unit.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
                    <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-white/90 text-sage rounded-full">
                      {unitLabel}
                    </span>
                    {details && (
                      <span
                        className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full text-white ${
                          details.status === "Available" ? "bg-sage/90" : "bg-primary/90"
                        }`}
                      >
                        {details.status}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {unit.name}
                      </h3>
                    </div>
                    {details && <p className="text-xs text-subtle mb-3">{details.type}</p>}
                    <div className="flex items-center gap-4 text-xs text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Users size={13} /> {unit.maxGuests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble size={13} /> {unit.bedrooms} bed{unit.bedrooms > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">
                        ₹{unit.price.toLocaleString()}
                        <span className="text-xs font-normal text-muted"> /night</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-1.5 transition-all">
                        View Stay <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* About Vaksana Farms — farm introduction */}
        <div className="py-8 border-b border-surface-hover">
          <h2 className="heading-display text-2xl text-foreground mb-4">About Vaksana Farms</h2>
          <p className="text-muted leading-relaxed mb-6">{vaksanaFarms.description}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Leaf size={24} className="text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">100% Organic Farming</h4>
                <p className="text-sm text-muted mt-1">
                  Every meal and ingredient is grown chemical-free, right on the property.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <HeartHandshake size={24} className="text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Family Owned &amp; Run</h4>
                <p className="text-sm text-muted mt-1">
                  The same family that started this farm still runs it today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Curated experiences (farm-level) */}
        <div className="py-8 border-b border-surface-hover">
          <h2 className="heading-display text-2xl text-foreground mb-6">Curated experiences at the farm</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {vaksanaFarms.experiences.map((exp) => {
              const Icon = experienceIcons[exp.icon] ?? Sparkles;
              return (
                <div key={exp.name} className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{exp.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gallery (farm-level) */}
        <div className="py-8 border-b border-surface-hover">
          <h2 className="heading-display text-2xl text-foreground mb-6">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {vaksanaFarms.gallery.slice(0, 7).map((src, i) => (
              <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-hover group">
                <img
                  src={src}
                  alt={`Vaksana Farms photo ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              aria-label="View all photos"
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-hover"
            >
              <img
                src={vaksanaFarms.gallery[7] ?? vaksanaFarms.gallery[0]}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 hover:bg-black/70 transition-colors flex items-center justify-center">
                <span className="text-white text-sm font-semibold">View All Photos</span>
              </div>
            </button>
          </div>
        </div>

        {/* Reviews (farm-level, pooled across all four stays) */}
        <div className="py-8 border-b border-surface-hover" id="reviews">
          <div className="flex items-center gap-2 mb-6">
            <Star size={20} className="text-primary fill-primary" />
            <h2 className="heading-display text-2xl text-foreground">
              {vaksanaFarms.rating} · {vaksanaFarms.reviewCount} reviews
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {farmReviews.map((review) => (
              <div key={review.id} className="bg-surface p-5 rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{review.userName}</h4>
                    <p className="text-xs text-subtle">{review.date}</p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed line-clamp-3">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Recommendations (farm-level, reused from content-generator) */}
        <div className="py-8 border-b border-surface-hover">
          <h2 className="heading-display text-2xl text-foreground mb-2">Explore {vaksanaFarms.location.city}</h2>
          <p className="text-sm text-muted mb-6">
            Guides picked for guests staying near {vaksanaFarms.location.city}.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {blogGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                className="group flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <span className="text-sm font-medium text-foreground leading-snug flex-1">{guide.title}</span>
                <ArrowRight
                  size={14}
                  className="text-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Location (farm-level) */}
        <div className="py-8" id="location">
          <h2 className="heading-display text-2xl text-foreground mb-2">Where you&apos;ll be</h2>
          <p className="text-sm text-muted mb-6">
            Near {vaksanaFarms.location.city}, {vaksanaFarms.location.state}, India
          </p>
          <div className="w-full h-[400px] bg-surface border border-border rounded-2xl flex items-center justify-center mb-6">
            <div className="text-center">
              <MapPin size={32} className="mx-auto text-subtle mb-2" />
              <p className="text-sm text-subtle">Interactive Map Integration</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {vaksanaFarms.nearbyPlaces.map((place) => (
              <span
                key={place.name}
                className="px-3 py-1.5 text-xs font-medium text-muted bg-surface border border-border rounded-full"
              >
                {place.name} · {place.distance}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
