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
} from "lucide-react";
import { properties } from "@/lib/mock-data";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.id as string;
  const property = properties.find((p) => p.id === slug || p.slug === slug) || properties[0];

  const [step, setStep] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const pricePerNight = property.price;
  const nights = 3;
  const basePrice = pricePerNight * nights;
  const platformFee = 1500;
  const taxes = 1200;
  const totalPrice = basePrice + platformFee + taxes;

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
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
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-surface-hover -z-10" />
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 bg-primary -z-10 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
              
              {[
                { num: 1, label: "Dates & Guests" },
                { num: 2, label: "Add-ons" },
                { num: 3, label: "Details" },
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-hover border border-border text-subtle"
                    }`}
                  >
                    {step > s.num ? <CheckCircle2 size={12} /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wider hidden sm:block ${
                      step >= s.num ? "text-foreground" : "text-subtle"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Step 1: Dates & Guests */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h1 className="heading-display text-3xl text-foreground mb-8">
                  Review dates and guests
                </h1>

                <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
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

                <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Guests</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">Adults</div>
                        <div className="text-xs text-subtle">Age 13+</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                        >
                          -
                        </button>
                        <span className="w-4 text-center text-foreground font-medium">{adults}</span>
                        <button
                          onClick={() => setAdults(Math.min(property.maxGuests, adults + 1))}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-surface-hover">
                      <div>
                        <div className="font-medium text-foreground">Children</div>
                        <div className="text-xs text-subtle">Ages 2-12</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                        >
                          -
                        </button>
                        <span className="w-4 text-center text-foreground font-medium">{children}</span>
                        <button
                          onClick={() => setChildren(Math.min(property.maxGuests - adults, children + 1))}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors"
                        >
                          +
                        </button>
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
                <p className="text-muted mb-8">
                  Curated experiences and services available at {property.name}.
                </p>

                <div className="space-y-4">
                  {[
                    { title: "Farm-to-Table Breakfast", desc: "Fresh organic breakfast served daily", price: 600, tag: "Food" },
                    { title: "Mountain Bikes (x2)", desc: "Explore the surrounding trails", price: 800, tag: "Rental" },
                    { title: "Guided Nature Walk", desc: "2-hour guided tour with a local naturalist", price: 1200, tag: "Experience" },
                  ].map((addon, i) => (
                    <div key={i} className="flex items-start gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-primary/50 transition-colors cursor-pointer group">
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
                <h1 className="heading-display text-3xl text-foreground mb-8">
                  Almost there
                </h1>

                <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Guest Details</h2>
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

                <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
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
            )}

            {/* Navigation Button */}
            <div className="mt-8 pt-8 border-t border-surface-hover">
              <button
                onClick={nextStep}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
              >
                {step === 3 ? "Proceed to Payment" : "Continue"} <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:w-[400px]">
            <div className="sticky top-[160px] bg-surface border border-border rounded-2xl p-6">
              <div className="flex gap-4 pb-6 border-b border-border">
                <div className="w-24 h-24 rounded-xl bg-surface-hover overflow-hidden shrink-0 relative">
                  <img src={property.images[0]} alt="" className="w-full h-full object-cover opacity-50" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-primary mb-1 font-semibold">
                    {property.category}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1 leading-snug">
                    {property.name}
                  </h3>
                  <div className="text-xs text-muted flex items-center gap-1">
                    <Star size={10} className="text-primary fill-primary" />
                    <span className="font-medium text-foreground">{property.rating}</span>
                    <span>({property.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="py-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Price details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>₹{pricePerNight.toLocaleString()} x {nights} nights</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                  </div>
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

              <div className="pt-6">
                <div className="flex justify-between items-center text-lg font-bold text-foreground">
                  <span>Total (INR)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="text-right text-xs text-muted mt-1">
                  Includes all taxes and fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
