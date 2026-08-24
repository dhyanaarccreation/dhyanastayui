"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  MapPin,
  Star,
  Share,
  Heart,
  ChevronRight,
  Wifi,
  Coffee,
  Car,
  Flame,
  CheckCircle2,
  Calendar as CalendarIcon,
  BookOpen,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { properties, reviews } from "@/lib/mock-data";
import { enrichProperty } from "@/lib/content-generator";
import StayMediaExperience from "@/app/components/StayMediaExperience";

// Resolves a curated-experience icon name (stored as a plain string in the
// generator, same convention as `categories[].icon` in mock-data.ts) to its
// lucide-react component, falling back gracefully for any unmapped name.
function resolveIcon(name: string): LucideIcons.LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
  return icons[name] ?? LucideIcons.Sparkles;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  // Ensure params is fully resolved in a real app; for mock, we just grab the slug
  const slug = params?.id as string;
  const property = properties.find((p) => p.slug === slug) || properties[0]; // fallback
  const propertyReviews = reviews.filter((r) => r.propertyId === property.id);
  const enriched = enrichProperty(property);

  const [guests, setGuests] = useState(2);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Gallery modal — ESC to close, lock body scroll while open.
  useEffect(() => {
    if (!galleryOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage((current) => {
          if (current) return null; // first ESC closes the enlarged image only
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
            <Link
              href="/#explore-stays"
              className="hover:text-foreground transition-colors"
            >
              Stays
            </Link>
            <ChevronRight size={12} />
            <span className="text-muted">{property.name}</span>
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
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="heading-display text-2xl md:text-4xl text-foreground mb-3">
              {property.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <div className="flex items-center gap-1">
                <a href="#reviews" className="underline hover:text-foreground">
                  {property.reviewCount} reviews
                </a>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>
                  {property.location.city}, {property.location.state},{" "}
                  {property.location.country}
                </span>
              </div>
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded-full">
                {property.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Media Experience — looping video + Reserve card, story banner, Stay Stories tabbed reel */}
      <StayMediaExperience
        property={property}
        enriched={enriched}
        propertyReviews={propertyReviews}
        reserveCard={(selectedRoom) => (
          <div className="bg-surface border border-border rounded-2xl p-3.5 sm:p-4 shadow-xl w-full">
            <div className="flex items-end justify-between mb-1.5">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-foreground">
                  ₹{selectedRoom.price.toLocaleString()}
                </span>
                <span className="text-muted text-sm"> /night</span>
              </div>
              {property.originalPrice && property.originalPrice > selectedRoom.price && (
                <span className="text-sm text-subtle line-through">
                  ₹{property.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-muted mb-1.5">{selectedRoom.name}</p>

            <div className="flex items-center gap-1.5 text-sm text-muted mb-2">
              <span>{property.reviewCount} reviews</span>
            </div>

            <div className="border-t border-border pt-2.5 pb-3">
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {property.badges.slice(0, 3).map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs text-muted">
                    <CheckCircle2 size={13} className="text-sage shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/book/${property.id}?guests=${guests}`}
              className="group/reserve w-full py-3 px-5 bg-primary text-primary-foreground font-semibold text-[15px] tracking-wide rounded-2xl shadow-md hover:shadow-lg hover:bg-primary-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              Reserve
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover/reserve:translate-x-1"
              />
            </Link>
            <p className="mt-2 text-center text-[11px] text-subtle">
              Free to explore · Secure booking
            </p>
          </div>
        )}
        onOpenStory={() => setStoryOpen(true)}
        onOpenGallery={() => setGalleryOpen(true)}
        onOpenExperiences={() => setExperiencesOpen(true)}
      />

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
                <h3 className="heading-display text-xl md:text-2xl text-foreground">
                  Curated Experiences
                </h3>
                <p className="text-sm text-muted">
                  {enriched.curatedExperiences.length} experiences near {property.name}
                </p>
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
              {enriched.curatedExperiences.map((experience, i) => (
                <div
                  key={experience.name}
                  className="rounded-2xl border border-border bg-surface overflow-hidden"
                >
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
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">
                      {experience.name}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                </div>
              ))}
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
                src={property.images[0]}
                alt={property.name}
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
                <h3 className="heading-display text-2xl md:text-3xl text-white mt-1">
                  {property.name}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="text-muted leading-relaxed mb-8">{enriched.generatedStory}</p>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                Timeline
              </h4>
              <div className="space-y-4 mb-8">
                {enriched.storyTimeline.map((entry) => (
                  <div key={entry.label} className="flex gap-4">
                    <span className="w-20 shrink-0 text-xs font-semibold text-foreground">
                      {entry.label}
                    </span>
                    <p className="text-sm text-muted leading-relaxed">{entry.text}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                Gallery
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {property.images.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-hover"
                  >
                    <img
                      src={src}
                      alt={`${property.name} photo ${i + 1}`}
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

      {/* Gallery Modal — masonry grid of this stay's galleryImages, with a shared-element lightbox on click */}
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
                  <p className="text-sm text-muted">
                    {property.galleryImages.length} photos of {property.name}
                  </p>
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
                {property.galleryImages.map((src, i) => (
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
                      alt={`${property.name} photo ${i + 1}`}
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
                      alt={property.name}
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
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content (Left) */}
          <div className="lg:w-2/3">
            {/* Curated Experiences — auto-assigned by stay category. Clicking
                one opens the same Curated Experiences modal used by the Stay
                Stories reel, showing what the experience actually involves. */}
            <div className="py-8 border-b border-surface-hover">
              <h2 className="heading-display text-2xl text-foreground mb-6">
                Curated Experiences Near You
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {enriched.curatedExperiences.map((exp) => {
                  const Icon = resolveIcon(exp.icon);
                  return (
                    <button
                      key={exp.name}
                      type="button"
                      onClick={() => setExperiencesOpen(true)}
                      className="flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 text-left hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {exp.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Host Section */}
            <div className="py-8 border-b border-surface-hover">
              <div className="flex items-center gap-4">
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-14 h-14 rounded-full object-cover border border-border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Hosted by {property.host.name}
                  </h3>
                  <p className="text-sm text-muted">
                    Superhost · Hosting since {property.host.since}
                  </p>
                </div>
              </div>
            </div>


            {/* Description & Story */}
            <div className="py-8 border-b border-surface-hover" id="story">
              <h2 className="heading-display text-2xl text-foreground mb-4">
                About this space
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {property.description}
              </p>
              
              <div className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Star size={100} />
                </div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                  The Story
                </h3>
                <p className="text-foreground leading-relaxed italic">
                  "{enriched.generatedStory}"
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="py-8 border-b border-surface-hover">
              <h2 className="heading-display text-2xl text-foreground mb-6">
                What this place offers
              </h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-muted">
                    <CheckCircle2 size={18} className="text-sage" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-surface-hover transition-colors">
                Show all amenities
              </button>
            </div>

            {/* Reviews (Preview) */}
            <div className="py-8 border-b border-surface-hover" id="reviews">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="heading-display text-2xl text-foreground">
                  {property.reviewCount} reviews
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {propertyReviews.slice(0, 4).map((review) => (
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
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-surface-hover transition-colors">
                Show all {property.reviewCount} reviews
              </button>
            </div>

            {/* Blog Recommendations — auto-assigned by stay location */}
            <div className="py-8 border-b border-surface-hover">
              <h2 className="heading-display text-2xl text-foreground mb-2">
                Explore {property.location.city}
              </h2>
              <p className="text-sm text-muted mb-6">
                Guides picked for guests staying near {property.location.city}.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {enriched.blogRecommendations.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/blog/${guide.slug}`}
                    className="group flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <span className="text-sm font-medium text-foreground leading-snug flex-1">
                      {guide.title}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
