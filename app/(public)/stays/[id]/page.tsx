"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Star,
  Share,
  Heart,
  ChevronRight,
  Users,
  BedDouble,
  Bath,
  Maximize,
  Wifi,
  Coffee,
  Car,
  Flame,
  CheckCircle2,
  Calendar as CalendarIcon,
} from "lucide-react";
import { properties, reviews } from "@/lib/mock-data";

export default function PropertyDetailsPage() {
  const params = useParams();
  // Ensure params is fully resolved in a real app; for mock, we just grab the slug
  const slug = params?.id as string;
  const property = properties.find((p) => p.slug === slug) || properties[0]; // fallback
  const propertyReviews = reviews.filter((r) => r.propertyId === property.id);

  const [guests, setGuests] = useState(2);

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
              href="/stays"
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
            <h1 className="heading-display text-3xl md:text-5xl text-foreground mb-3">
              {property.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-primary fill-primary" />
                <span className="font-semibold text-foreground">
                  {property.rating}
                </span>
                <a href="#reviews" className="underline hover:text-foreground">
                  {property.reviewCount} reviews
                </a>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <a href="#location" className="underline hover:text-foreground">
                  {property.location.city}, {property.location.state},{" "}
                  {property.location.country}
                </a>
              </div>
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded-full">
                {property.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-4 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
          <div className="col-span-4 md:col-span-2 row-span-2 bg-surface-hover hover:opacity-90 transition-opacity cursor-pointer relative group">
            <img
              src={property.images[0]}
              alt={property.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="hidden md:block col-span-1 row-span-1 bg-surface-hover hover:opacity-90 transition-opacity cursor-pointer relative"
            >
              <img
                src={property.images[i % property.images.length]}
                alt={`${property.name} photo ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {i === 4 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground bg-background/80 px-4 py-2 rounded-full backdrop-blur-md">
                    <Maximize size={14} /> Show all photos
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content (Left) */}
          <div className="lg:w-2/3">
            {/* Quick Details */}
            <div className="flex items-center gap-6 pb-8 border-b border-surface-hover">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-foreground">
                  <Users size={18} className="text-primary" />
                  <span className="font-medium">{property.maxGuests} Guests</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-foreground">
                  <BedDouble size={18} className="text-primary" />
                  <span className="font-medium">{property.bedrooms} Bedrooms</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-foreground">
                  <Bath size={18} className="text-primary" />
                  <span className="font-medium">
                    {property.bathrooms} Bathrooms
                  </span>
                </div>
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

            {/* Badges / Highlights */}
            <div className="py-8 border-b border-surface-hover">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <Star size={24} className="text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Highly Rated
                    </h4>
                    <p className="text-sm text-muted mt-1">
                      Recent guests rated this {property.rating} out of 5 stars.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin size={24} className="text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Great Location
                    </h4>
                    <p className="text-sm text-muted mt-1">
                      95% of recent guests gave the location a 5-star rating.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Story */}
            <div className="py-8 border-b border-surface-hover">
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
                  "{property.story}"
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
                <Star size={20} className="text-primary fill-primary" />
                <h2 className="heading-display text-2xl text-foreground">
                  {property.rating} · {property.reviewCount} reviews
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

            {/* Map (Placeholder) */}
            <div className="py-8" id="location">
              <h2 className="heading-display text-2xl text-foreground mb-2">
                Where you'll be
              </h2>
              <p className="text-sm text-muted mb-6">
                {property.location.city}, {property.location.state}, {property.location.country}
              </p>
              <div className="w-full h-[400px] bg-surface border border-border rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto text-subtle mb-2" />
                  <p className="text-sm text-subtle">Interactive Map Integration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) - Booking Widget */}
          <div className="lg:w-1/3 relative">
            <div className="sticky top-[100px] bg-surface border border-border rounded-2xl p-6 shadow-xl">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-foreground">
                    ₹{property.price.toLocaleString()}
                  </span>
                  <span className="text-muted text-sm"> /night</span>
                </div>
                {property.originalPrice && (
                  <span className="text-sm text-subtle line-through">
                    ₹{property.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Date & Guest Pickers */}
              <div className="border border-border rounded-xl overflow-hidden mb-4">
                <div className="flex border-b border-border">
                  <div className="flex-1 p-3 border-r border-border hover:bg-surface-hover cursor-pointer transition-colors">
                    <div className="text-[10px] uppercase font-bold text-muted mb-1">
                      Check-in
                    </div>
                    <div className="text-sm text-foreground">Add date</div>
                  </div>
                  <div className="flex-1 p-3 hover:bg-surface-hover cursor-pointer transition-colors">
                    <div className="text-[10px] uppercase font-bold text-muted mb-1">
                      Check-out
                    </div>
                    <div className="text-sm text-foreground">Add date</div>
                  </div>
                </div>
                <div className="p-3 hover:bg-surface-hover cursor-pointer transition-colors">
                  <div className="text-[10px] uppercase font-bold text-muted mb-1">
                    Guests
                  </div>
                  <div className="flex items-center justify-between text-sm text-foreground">
                    {guests} {guests > 1 ? "guests" : "guest"}
                    <ChevronRight size={14} className="text-subtle" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/book/${property.id}`}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center mb-4"
              >
                Reserve
              </Link>
              <p className="text-center text-xs text-muted mb-6">
                You won't be charged yet
              </p>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-muted">
                  <span className="underline">₹{property.price.toLocaleString()} x 3 nights</span>
                  <span>₹{(property.price * 3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span className="underline">Platform fee</span>
                  <span>₹1,500</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span className="underline">Taxes</span>
                  <span>₹1,200</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span>₹{(property.price * 3 + 2700).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
