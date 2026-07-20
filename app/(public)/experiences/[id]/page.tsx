"use client";

import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Star, Users, CheckCircle2, ShieldCheck, User } from "lucide-react";
import { useState } from "react";

export default function ExperienceDetailsPage() {
  const [guests, setGuests] = useState(2);
  const price = 2500;

  return (
    <div className="bg-background pb-24">
      {/* Hero Image */}
      <div className="h-[50vh] md:h-[60vh] relative">
        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000&auto=format&fit=crop" alt="Experience" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-24 left-6 lg:left-12">
          <Link href="/experiences" className="inline-flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-md rounded-full text-xs font-medium text-foreground hover:bg-background transition-colors border border-border">
            <ArrowLeft size={14} /> Back to Experiences
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <span className="px-3 py-1 bg-surface text-foreground text-[10px] uppercase tracking-wider rounded-full border border-border font-semibold mb-4 inline-block">
                Nature & Wildlife
              </span>
              <h1 className="heading-display text-4xl md:text-5xl text-foreground mb-4">
                Himalayan Pine Forest Foraging
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-1 font-medium text-foreground">
                  <Star size={16} className="text-primary fill-primary" /> 4.9 <span className="text-subtle font-normal underline cursor-pointer">(124 reviews)</span>
                </div>
                <div className="flex items-center gap-1"><MapPin size={16} className="text-primary" /> Mashobra, Himachal</div>
                <div className="flex items-center gap-1"><Clock size={16} /> 4 Hours</div>
                <div className="flex items-center gap-1"><Users size={16} /> Up to 6 people</div>
              </div>
            </div>

            <div className="flex items-center gap-4 py-6 border-y border-border">
              <div className="w-14 h-14 rounded-full bg-surface-hover overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="Host" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-foreground font-medium">Hosted by Meera</h3>
                <p className="text-sm text-muted">Botanist & Local Guide • 5 years hosting</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">What you'll do</h2>
              <div className="text-muted leading-relaxed space-y-4">
                <p>Join me for an immersive walk through the ancient pine and deodar forests of Mashobra. We will learn to identify local edible flora, medicinal herbs, and rare seasonal mushrooms used in traditional Himalayan cooking.</p>
                <p>After our 2-hour forage, we'll return to a scenic clearing where we'll brew fresh pine-needle tea and prepare a small rustic meal using the ingredients we've collected.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">What's included</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Expert botanical guidance",
                  "Foraging basket and tools",
                  "Pine-needle tea & rustic lunch",
                  "Digital guide to Himalayan herbs"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-primary shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 sticky top-24 shadow-2xl">
              <div className="flex items-baseline gap-2 mb-6 text-foreground">
                <span className="text-3xl font-bold">₹{price}</span>
                <span className="text-sm text-muted">/ person</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border border-border rounded-xl overflow-hidden">
                  <div className="p-3 border-b border-border bg-background">
                    <label className="block text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Date</label>
                    <input type="date" className="w-full bg-transparent text-foreground text-sm focus:outline-none cursor-pointer" defaultValue="2026-10-16" />
                  </div>
                  <div className="p-3 bg-background flex justify-between items-center">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-subtle font-bold mb-1">Guests</label>
                      <div className="text-sm text-foreground">{guests} {guests === 1 ? 'Guest' : 'Guests'}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors">-</button>
                      <button onClick={() => setGuests(Math.min(6, guests + 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary transition-colors">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm border-b border-border pb-6 mb-6">
                <div className="flex justify-between text-muted">
                  <span>₹{price} x {guests} guests</span>
                  <span>₹{price * guests}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Service fee</span>
                  <span>₹{(price * guests * 0.1).toFixed(0)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold text-foreground mb-6">
                <span>Total</span>
                <span>₹{(price * guests * 1.1).toFixed(0)}</span>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all mb-4">
                Reserve Experience
              </button>
              <p className="text-center text-xs text-subtle">You won't be charged yet</p>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
              <ShieldCheck size={16} className="text-sage" /> Dhyana Verified Experience
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
