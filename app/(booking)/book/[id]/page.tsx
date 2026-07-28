"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Users,
  CreditCard,
  ChevronRight,
  Info,
  Star,
  MapPin,
  Wifi,
  Coffee,
  ShieldCheck,
  Minus,
  Plus,
  Clock,
  Check,
  X,
} from "lucide-react";
import { properties, experiences } from "@/lib/mock-data";

// Curated experiences offered in the "Curate Your Stay" booking step.
const curationExperiences = experiences.slice(0, 6);

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.id as string;
  const property = properties.find((p) => p.id === slug || p.slug === slug) || properties[0];

  const [step, setStep] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  const toggleExperience = (id: string) =>
    setSelectedExperiences((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const pricePerNight = property.price;
  const nights = 3;
  const basePrice = pricePerNight * nights;
  const platformFee = 1500;
  const taxes = 1200;
  const experiencesTotal = curationExperiences
    .filter((exp) => selectedExperiences.includes(exp.id))
    .reduce((sum, exp) => sum + exp.price, 0);
  const totalPrice = basePrice + platformFee + taxes + experiencesTotal;

  const totalSteps = 4;
  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else router.push("/payment");
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else router.push(`/stays/${property.slug}`);
  };

  return (
    <div className="bg-background min-h-screen pb-24 pt-[72px]">
      {/* Progress Bar Header */}
      <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-xl border-b border-surface-hover py-4">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              className="p-2 -ml-2 rounded-full text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex-1 max-w-xl mx-auto flex items-center justify-between relative">
              <div className="absolute top-3 left-0 right-0 h-[3px] rounded-full bg-surface-hover -z-10" />
              <div
                className="absolute top-3 left-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-primary-hover -z-10 transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              />

              {[
                { num: 1, label: "Dates & Guests" },
                { num: 2, label: "Add-ons" },
                { num: 3, label: "Details" },
                { num: 4, label: "Curate Stay" },
              ].map((s) => {
                const isCompleted = step > s.num;
                const isActive = step === s.num;
                return (
                  <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
                    <div className="relative flex items-center justify-center w-7 h-7">
                      {isActive && (
                        <span className="absolute w-7 h-7 rounded-full bg-primary/25 animate-pulse" />
                      )}
                      <div
                        className={`relative flex items-center justify-center rounded-full font-bold transition-all duration-300 ease-out ${
                          isActive
                            ? "w-7 h-7 bg-primary text-primary-foreground shadow-[0_0_0_4px_rgba(228,138,74,0.18)] scale-100"
                            : isCompleted
                            ? "w-6 h-6 bg-primary text-primary-foreground scale-100"
                            : "w-6 h-6 bg-surface-hover border border-border text-subtle scale-90"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={13} className="animate-fade-in" />
                        ) : (
                          <span className="text-[10px]">{s.num}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-wider hidden sm:block transition-colors duration-300 ${
                        isActive
                          ? "text-foreground font-semibold"
                          : isCompleted
                          ? "text-foreground font-medium"
                          : "text-subtle font-medium"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Step 1: Dates & Guests */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h1 className="heading-display text-3xl text-foreground mb-6">
                  Review dates and guests
                </h1>

                <div className="space-y-4">
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-foreground">Dates</h2>
                      <button className="text-sm text-primary font-medium hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-muted bg-surface-hover p-4 rounded-xl">
                      <Calendar size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Oct 15 - Oct 18, 2026</div>
                        <div className="text-xs">3 nights</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Guests</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-foreground">Adults</div>
                          <div className="text-xs text-subtle mt-0.5">Age 13+</div>
                        </div>
                        <div className="flex items-center rounded-full border border-border hover:border-primary/40 transition-colors overflow-hidden">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            aria-label="Decrease adults"
                            className={`w-9 h-9 flex items-center justify-center transition-all duration-150 active:scale-90 ${
                              adults <= 1
                                ? "text-subtle/40 cursor-not-allowed"
                                : "text-foreground hover:bg-surface-hover hover:text-primary"
                            }`}
                          >
                            <Minus size={15} />
                          </button>
                          <span className="w-9 text-center text-foreground font-semibold tabular-nums select-none border-x border-border py-2">
                            {adults}
                          </span>
                          <button
                            onClick={() => setAdults(Math.min(property.maxGuests, adults + 1))}
                            aria-label="Increase adults"
                            className={`w-9 h-9 flex items-center justify-center transition-all duration-150 active:scale-90 ${
                              adults >= property.maxGuests
                                ? "text-subtle/40 cursor-not-allowed"
                                : "text-foreground hover:bg-surface-hover hover:text-primary"
                            }`}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-surface-hover">
                        <div>
                          <div className="text-sm font-semibold text-foreground">Children</div>
                          <div className="text-xs text-subtle mt-0.5">Ages 2-12</div>
                        </div>
                        <div className="flex items-center rounded-full border border-border hover:border-primary/40 transition-colors overflow-hidden">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            aria-label="Decrease children"
                            className={`w-9 h-9 flex items-center justify-center transition-all duration-150 active:scale-90 ${
                              children <= 0
                                ? "text-subtle/40 cursor-not-allowed"
                                : "text-foreground hover:bg-surface-hover hover:text-primary"
                            }`}
                          >
                            <Minus size={15} />
                          </button>
                          <span className="w-9 text-center text-foreground font-semibold tabular-nums select-none border-x border-border py-2">
                            {children}
                          </span>
                          <button
                            onClick={() => setChildren(Math.min(property.maxGuests - adults, children + 1))}
                            aria-label="Increase children"
                            className={`w-9 h-9 flex items-center justify-center transition-all duration-150 active:scale-90 ${
                              children >= property.maxGuests - adults
                                ? "text-subtle/40 cursor-not-allowed"
                                : "text-foreground hover:bg-surface-hover hover:text-primary"
                            }`}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h1 className="heading-display text-3xl text-foreground mb-2">
                  Enhance your stay
                </h1>
                <p className="text-muted mb-6">
                  Curated experiences and services available at {property.name}.
                </p>

                <div className="space-y-4">
                  {[
                    { title: "Farm-to-Table Breakfast", desc: "Fresh organic breakfast served daily", price: 600, tag: "Food" },
                    { title: "Mountain Bikes (x2)", desc: "Explore the surrounding trails", price: 800, tag: "Rental" },
                    { title: "Guided Nature Walk", desc: "2-hour guided tour with a local naturalist", price: 1200, tag: "Experience" },
                  ].map((addon, i) => (
                    <div key={i} className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-4 hover:border-primary/50 transition-colors cursor-pointer group">
                      <div className="mt-1">
                        <div className="w-5 h-5 rounded border border-border group-hover:border-primary transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-primary mb-1 block">
                              {addon.tag}
                            </span>
                            <h3 className="font-medium text-foreground">{addon.title}</h3>
                          </div>
                          <span className="font-semibold text-foreground">₹{addon.price}</span>
                        </div>
                        <p className="text-xs text-muted">{addon.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Details & Payment */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h1 className="heading-display text-3xl text-foreground mb-6">
                  Almost there
                </h1>

                <div className="space-y-4">
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Guest Details</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Navin"
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Kumar"
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+91 98765 43210"
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-2">Message the Host</h2>
                    <p className="text-sm text-muted mb-4">
                      Let {property.host.name} know the purpose of your trip and when you expect to arrive.
                    </p>
                    <textarea
                      rows={4}
                      placeholder="Hello! We are excited to stay..."
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Curate Your Stay */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h1 className="heading-display text-3xl text-foreground mb-2">
                  Curate your stay
                </h1>
                <p className="text-muted mb-6">
                  Optional experiences to make your time at {property.name} unforgettable — add as many as you like.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {curationExperiences.map((exp) => {
                    const isAdded = selectedExperiences.includes(exp.id);
                    return (
                      <div
                        key={exp.id}
                        className={`bg-surface border rounded-2xl overflow-hidden transition-colors ${
                          isAdded ? "border-sage/50" : "border-border"
                        }`}
                      >
                        <div className="relative h-36 overflow-hidden bg-surface-hover">
                          <img
                            src={exp.image}
                            alt={exp.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider bg-white/85 backdrop-blur-sm text-sage rounded-full">
                            {exp.category}
                          </span>
                          {isAdded && (
                            <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-sage text-white flex items-center justify-center animate-fade-in">
                              <Check size={13} />
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-foreground mb-1">{exp.name}</h3>
                          <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">
                            {exp.description}
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="flex items-center gap-1 text-xs text-subtle">
                              <Clock size={12} /> {exp.duration}
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              ₹{exp.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleExperience(exp.id)}
                            className={`group w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                              isAdded
                                ? "bg-sage/10 text-sage border border-sage/40 hover:bg-terracotta/10 hover:text-terracotta hover:border-terracotta/40"
                                : "bg-primary text-primary-foreground hover:bg-primary-hover"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check size={15} className="group-hover:hidden" />
                                <span className="group-hover:hidden">Added</span>
                                <X size={15} className="hidden group-hover:inline" />
                                <span className="hidden group-hover:inline">Remove</span>
                              </>
                            ) : (
                              <>
                                <Plus size={15} /> Add
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedExperiences.length > 0 && (
                  <div className="mt-6 flex items-center justify-between px-4 py-3 rounded-xl bg-sage/10 border border-sage/30 text-sm animate-fade-in">
                    <span className="text-foreground font-medium">
                      {selectedExperiences.length} experience{selectedExperiences.length > 1 ? "s" : ""} added
                    </span>
                    <span className="text-sage font-semibold">
                      +₹{experiencesTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Button */}
            <div className="mt-6 pt-6 border-t border-surface-hover">
              <button
                onClick={nextStep}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
              >
                {step === totalSteps ? "Proceed to Payment" : "Continue"} <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:w-[400px]">
            <div className="sticky top-[160px] bg-surface border border-border rounded-2xl overflow-hidden shadow-organic">
              {/* Property image */}
              <div className="relative h-40 w-full bg-surface-hover">
                <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {property.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-foreground text-base leading-snug mb-4">
                  {property.name}
                </h3>

                {/* Highlights */}
                <div className="space-y-2.5 pb-5 mb-5 border-b border-border">
                  <div className="flex items-center gap-2.5 text-sm text-muted">
                    <Star size={15} className="text-primary fill-primary shrink-0" />
                    <span>
                      <span className="text-foreground font-medium">{property.rating}</span> · {property.reviewCount} reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted">
                    <MapPin size={15} className="text-sage shrink-0" />
                    <span>{property.location.city}, {property.location.state}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted">
                    <Wifi size={15} className="text-sage shrink-0" />
                    <span>Free Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted">
                    <Coffee size={15} className="text-sage shrink-0" />
                    <span>Breakfast included</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted">
                    <ShieldCheck size={15} className="text-sage shrink-0" />
                    <span>Free cancellation</span>
                  </div>
                </div>

                {/* Price details */}
                <div className="pb-5 mb-5 border-b border-border">
                  <h3 className="text-xs font-semibold text-subtle uppercase tracking-wider mb-3">Price details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted">
                      <span>₹{pricePerNight.toLocaleString()} x {nights} nights</span>
                      <span>₹{basePrice.toLocaleString()}</span>
                    </div>
                    {selectedExperiences.length > 0 && (
                      <div className="flex justify-between text-muted animate-fade-in">
                        <span>Curated experiences ({selectedExperiences.length})</span>
                        <span>₹{experiencesTotal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted">
                      <span className="flex items-center gap-1">Platform fee <Info size={12} className="text-subtle" /></span>
                      <span>₹{platformFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span className="flex items-center gap-1">Taxes <Info size={12} className="text-subtle" /></span>
                      <span>₹{taxes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Total — prominent */}
                <div className="rounded-xl bg-primary/5 border border-primary/25 p-4">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-sm font-medium text-foreground">Total (INR)</span>
                    <span className="text-2xl font-bold text-primary tabular-nums">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted mt-1.5">
                    Includes all taxes and fees
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
