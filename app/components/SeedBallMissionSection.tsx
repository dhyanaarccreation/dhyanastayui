"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sprout,
  TreePine,
  Wind,
  Users,
  HandCoins,
  Target,
  MapPin,
  Heart,
} from "lucide-react";
import { seedBallMission } from "@/lib/seed-ball-mission";

// ============================================
// Homepage — 100 Million Seed Ball Mission section
// UI-only campaign showcase: animated live counter,
// campaign stats, a simplified "states covered" map
// visual, volunteer stories, recent photos and two CTAs.
// ============================================

/** Counts up from 0 to `target` once `active` becomes true — used for the live counter. */
function useCountUp(target: number, active: boolean, durationMs = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);
  return value;
}

export default function SeedBallMissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Trigger the counter/progress-bar animation once, when the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const distributed = useCountUp(seedBallMission.distributed, inView);
  const progressPct = Math.min(100, (seedBallMission.distributed / seedBallMission.goal) * 100);

  const stats = [
    { label: "Seed Balls Created", value: seedBallMission.created.toLocaleString("en-IN"), icon: Sprout },
    { label: "Seed Balls Distributed", value: seedBallMission.distributed.toLocaleString("en-IN"), icon: MapPin },
    { label: "Trees Estimated", value: seedBallMission.treesEstimated.toLocaleString("en-IN"), icon: TreePine },
    { label: "CO₂ Offset (tons)", value: seedBallMission.co2OffsetTons.toLocaleString("en-IN"), icon: Wind },
    { label: "Campaign Volunteers", value: seedBallMission.volunteers.toLocaleString("en-IN"), icon: Users },
    { label: "Donations Collected", value: `₹${(seedBallMission.donationsCollected / 100000).toFixed(1)}L`, icon: HandCoins },
    { label: "Monthly Target", value: seedBallMission.monthlyTarget.toLocaleString("en-IN"), icon: Target },
    { label: "Yearly Target", value: seedBallMission.yearlyTarget.toLocaleString("en-IN"), icon: Target },
  ];

  return (
    <section ref={sectionRef} className="py-8 md:py-14 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="text-xs font-semibold text-sage uppercase tracking-widest">
            Our Mission
          </span>
          <h2 className="heading-organic text-lg sm:text-2xl lg:text-4xl text-foreground mt-2">
            🌱 100 Million Seed Ball Mission
          </h2>
          <p className="text-muted text-sm sm:text-base mt-3 leading-relaxed">
            Every stay you book helps restore India&apos;s green cover. We&apos;re dispersing 100 million
            seed balls across the country — every traveller, host and partner is part of the journey.
          </p>
        </div>

        {/* Live progress counter */}
        <div className="rounded-2xl sm:rounded-[32px] bg-sage overflow-hidden shadow-organic p-6 sm:p-10 lg:p-14 mb-6 md:mb-8">
          <div className="text-center">
            <p className="text-xs font-semibold text-white/80 uppercase tracking-widest">Live Progress</p>
            <p className="heading-organic text-4xl sm:text-6xl lg:text-7xl text-white mt-2 tabular-nums">
              {distributed.toLocaleString("en-IN")}
            </p>
            <p className="text-white/80 text-sm sm:text-base mt-1">
              of {seedBallMission.goal.toLocaleString("en-IN")} Seed Balls Dispersed
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-6">
            <div className="h-3 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-1000 ease-out"
                style={{ width: `${inView ? progressPct : 0}%` }}
              />
            </div>
            <p className="text-center text-white/70 text-xs mt-2">
              {progressPct.toFixed(1)}% toward the 100 Million goal
            </p>
          </div>
        </div>

        {/* Campaign statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-12">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface border border-border rounded-2xl p-4">
              <s.icon size={16} className="text-sage" />
              <p className="text-lg font-bold text-foreground mt-2 tabular-nums">{s.value}</p>
              <p className="text-[11px] text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/traveller/rewards"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-full shadow-organic hover:bg-primary-hover hover:-translate-y-0.5 transition-all"
          >
            <Sprout size={16} /> Join the Mission
          </Link>
          <Link
            href="/traveller/rewards#buy-seed-balls"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-surface border border-sage text-sage rounded-full hover:bg-sage hover:text-white transition-all"
          >
            <Heart size={16} /> Donate
          </Link>
        </div>
      </div>
    </section>
  );
}
