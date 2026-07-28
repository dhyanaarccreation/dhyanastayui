"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Users,
  CreditCard,
  ChevronRight,
  ChevronLeft,
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

// ------------------------------------------------
// Dates section — small dependency-free date helpers
// ------------------------------------------------
const MIN_NIGHTS = 2;
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}
function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function isBeforeDay(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}
function diffNights(a: Date, b: Date) {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / 86400000);
}
function formatWithYear(d: Date) {
  return `${MONTH_LABELS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}
function buildMonthGrid(viewMonth: Date): (Date | null)[] {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  return cells;
}

// Single counter row reused by the Adults / Children / Infants fields in the
// Guests selector — factored out to avoid tripling the same markup.
function GuestCounter({
  label,
  sublabel,
  value,
  min,
  max,
  onDecrease,
  onIncrease,
}: {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-subtle mt-0.5">{sublabel}</div>
      </div>
      <div className="flex items-center rounded-full border border-border hover:border-primary/40 transition-colors overflow-hidden">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          aria-label={`Decrease ${label.toLowerCase()}`}
          className={`w-9 h-9 flex items-center justify-center transition-all duration-150 active:scale-90 ${
            value <= min
              ? "text-subtle/40 cursor-not-allowed"
              : "text-foreground hover:bg-surface-hover hover:text-primary"
          }`}
        >
          <Minus size={15} />
        </button>
        <span
          key={value}
          className="w-9 text-center text-foreground font-semibold tabular-nums select-none border-x border-border py-2 animate-fade-in"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={value >= max}
          aria-label={`Increase ${label.toLowerCase()}`}
          className={`w-9 h-9 flex items-center justify-center transition-all duration-150 active:scale-90 ${
            value >= max
              ? "text-subtle/40 cursor-not-allowed"
              : "text-foreground hover:bg-surface-hover hover:text-primary"
          }`}
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}

// Small calendar grid reused by both the check-in and check-out popovers.
function DateCalendar({
  viewMonth,
  onPrevMonth,
  onNextMonth,
  checkIn,
  checkOut,
  disableBefore,
  onSelect,
}: {
  viewMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  checkIn: Date;
  checkOut: Date;
  disableBefore: Date;
  onSelect: (date: Date) => void;
}) {
  const today = startOfDay(new Date());
  const cells = buildMonthGrid(viewMonth);

  return (
    <div className="p-4 w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onPrevMonth}
          aria-label="Previous month"
          className="w-7 h-7 flex items-center justify-center rounded-full text-muted hover:bg-surface-hover hover:text-foreground transition-colors duration-150"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="text-sm font-semibold text-foreground">
          {MONTH_LABELS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          aria-label="Next month"
          className="w-7 h-7 flex items-center justify-center rounded-full text-muted hover:bg-surface-hover hover:text-foreground transition-colors duration-150"
        >
          <ChevronRight size={15} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-1 mb-1">
        {DAY_LABELS.map((d) => (
          <span key={d} className="text-[10px] text-subtle text-center font-medium">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const disabled = isBeforeDay(date, disableBefore);
          const isCheckIn = isSameDay(date, checkIn);
          const isCheckOut = isSameDay(date, checkOut);
          const inRange = date > checkIn && date < checkOut;
          const isToday = isSameDay(date, today);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`relative mx-auto h-8 w-8 text-xs rounded-full flex items-center justify-center transition-colors duration-150 ${
                disabled
                  ? "text-subtle/30 cursor-not-allowed"
                  : isCheckIn || isCheckOut
                  ? "bg-primary text-primary-foreground font-semibold"
                  : inRange
                  ? "bg-primary/15 text-foreground"
                  : "text-foreground hover:bg-surface-hover"
              } ${isToday && !isCheckIn && !isCheckOut ? "ring-1 ring-primary/40" : ""}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BookingPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params?.id as string;
  const property = properties.find((p) => p.id === slug || p.slug === slug) || properties[0];

  const [step, setStep] = useState(1);
  // Preload the guest count selected on the property page's Reserve card
  // (passed via ?guests=) instead of asking the user to re-enter it.
  const [adults, setAdults] = useState(() => {
    const raw = Number(searchParams.get("guests"));
    if (!raw || Number.isNaN(raw)) return 2;
    return Math.min(Math.max(1, raw), property.maxGuests);
  });
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  // Guests section — compact selector, closed by default, opened by clicking
  // the card. Mirrors the Dates popover's open/close + outside-click pattern.
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Dates section — self-contained check-in/check-out picker state. Defaults
  // match the previous static display exactly, so nothing changes on load.
  const [checkIn, setCheckIn] = useState(new Date(2026, 9, 15));
  const [checkOut, setCheckOut] = useState(new Date(2026, 9, 18));
  const [activeDateField, setActiveDateField] = useState<"checkin" | "checkout" | null>(null);
  const [viewMonth, setViewMonth] = useState(new Date(2026, 9, 1));
  const datesRef = useRef<HTMLDivElement>(null);
  const today = startOfDay(new Date());

  useEffect(() => {
    if (!activeDateField) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (datesRef.current && !datesRef.current.contains(e.target as Node)) {
        setActiveDateField(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDateField(null);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDateField]);

  useEffect(() => {
    if (!guestsOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setGuestsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGuestsOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guestsOpen]);

  const openDateField = (field: "checkin" | "checkout") => {
    setActiveDateField((current) => (current === field ? null : field));
    setViewMonth(new Date((field === "checkin" ? checkIn : checkOut).getFullYear(), (field === "checkin" ? checkIn : checkOut).getMonth(), 1));
  };

  const handlePickDate = (date: Date) => {
    if (activeDateField === "checkout") {
      if (diffNights(checkIn, date) < MIN_NIGHTS) return;
      setCheckOut(date);
      setActiveDateField(null);
      return;
    }
    setCheckIn(date);
    const validCheckout = diffNights(date, checkOut) < MIN_NIGHTS ? addDays(date, MIN_NIGHTS) : checkOut;
    setCheckOut(validCheckout);
    setActiveDateField("checkout");
    setViewMonth(new Date(validCheckout.getFullYear(), validCheckout.getMonth(), 1));
  };

  const toggleExperience = (id: string) =>
    setSelectedExperiences((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const totalGuests = adults + children + infants;

  const pricePerNight = property.price;
  const nights = Math.max(MIN_NIGHTS, diffNights(checkIn, checkOut));
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
                { num: 2, label: "Curated Experiences" },
                { num: 3, label: "Guest Details" },
                { num: 4, label: "Review & Payment" },
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
                  <div ref={datesRef} className="bg-surface border border-border rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-foreground">Dates</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Check-in */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => openDateField("checkin")}
                          className={`w-full flex items-center gap-3 text-left bg-surface-hover p-4 rounded-xl border transition-colors duration-200 ${
                            activeDateField === "checkin" ? "border-primary" : "border-transparent hover:border-border"
                          }`}
                        >
                          <Calendar size={20} className="text-primary shrink-0" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-subtle">Check-in</div>
                            <div className="font-medium text-foreground text-sm">{formatWithYear(checkIn)}</div>
                          </div>
                        </button>

                        <div
                          className={`absolute z-30 top-full left-0 mt-2 origin-top-left bg-surface border border-border rounded-2xl shadow-organic transition-all duration-200 ease-out ${
                            activeDateField === "checkin"
                              ? "opacity-100 scale-100 pointer-events-auto"
                              : "opacity-0 scale-95 pointer-events-none"
                          }`}
                        >
                          <DateCalendar
                            viewMonth={viewMonth}
                            onPrevMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                            onNextMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            disableBefore={today}
                            onSelect={handlePickDate}
                          />
                        </div>
                      </div>

                      {/* Check-out */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => openDateField("checkout")}
                          className={`w-full flex items-center gap-3 text-left bg-surface-hover p-4 rounded-xl border transition-colors duration-200 ${
                            activeDateField === "checkout" ? "border-primary" : "border-transparent hover:border-border"
                          }`}
                        >
                          <Calendar size={20} className="text-primary shrink-0" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-subtle">Check-out</div>
                            <div className="font-medium text-foreground text-sm">{formatWithYear(checkOut)}</div>
                          </div>
                        </button>

                        <div
                          className={`absolute z-30 top-full right-0 mt-2 origin-top-right bg-surface border border-border rounded-2xl shadow-organic transition-all duration-200 ease-out ${
                            activeDateField === "checkout"
                              ? "opacity-100 scale-100 pointer-events-auto"
                              : "opacity-0 scale-95 pointer-events-none"
                          }`}
                        >
                          <DateCalendar
                            viewMonth={viewMonth}
                            onPrevMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                            onNextMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            disableBefore={addDays(checkIn, MIN_NIGHTS)}
                            onSelect={handlePickDate}
                          />
                          <p className="px-4 pb-3 text-[11px] text-subtle">
                            Minimum stay: {MIN_NIGHTS} nights
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 px-1 text-xs text-muted">
                      {nights} night{nights > 1 ? "s" : ""}
                    </div>
                  </div>

                  <div ref={guestsRef} className="bg-surface border border-border rounded-2xl p-6">
                    <button
                      type="button"
                      onClick={() => setGuestsOpen((v) => !v)}
                      aria-expanded={guestsOpen}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Guests</h2>
                        <p className="text-sm text-muted mt-0.5">
                          {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                          {infants > 0 ? ` · ${infants} infant${infants > 1 ? "s" : ""}` : ""}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        className={`text-subtle shrink-0 transition-transform duration-200 ${
                          guestsOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-200 ease-out ${
                        guestsOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-1">
                          <GuestCounter
                            label="Adults"
                            sublabel="Age 13+"
                            value={adults}
                            min={1}
                            max={property.maxGuests}
                            onDecrease={() => setAdults(Math.max(1, adults - 1))}
                            onIncrease={() => setAdults(Math.min(property.maxGuests, adults + 1))}
                          />

                          <div className="pt-4 border-t border-surface-hover">
                            <GuestCounter
                              label="Children"
                              sublabel="Ages 2-12"
                              value={children}
                              min={0}
                              max={Math.max(0, property.maxGuests - adults)}
                              onDecrease={() => setChildren(Math.max(0, children - 1))}
                              onIncrease={() =>
                                setChildren(Math.min(Math.max(0, property.maxGuests - adults), children + 1))
                              }
                            />
                          </div>

                          <div className="pt-4 border-t border-surface-hover">
                            <GuestCounter
                              label="Infants"
                              sublabel="Under 2"
                              value={infants}
                              min={0}
                              max={adults}
                              onDecrease={() => setInfants(Math.max(0, infants - 1))}
                              onIncrease={() => setInfants(Math.min(adults, infants + 1))}
                            />
                          </div>

                          {adults + children >= property.maxGuests && (
                            <p className="text-[11px] text-subtle">
                              Maximum {property.maxGuests} guests for this stay
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-surface-hover text-sm">
                            <span className="text-muted">Total guests</span>
                            <span
                              key={totalGuests}
                              className="font-semibold text-foreground tabular-nums animate-fade-in"
                            >
                              {totalGuests}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Curated Experiences */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h1 className="heading-display text-3xl text-foreground mb-2">
                  Curated Experiences
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
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="navin.kumar@example.com"
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
                        />
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
                      <div>
                        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                          Arrival Time <span className="normal-case text-subtle">(Optional)</span>
                        </label>
                        <input
                          type="time"
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

            {/* Step 4: Review & Payment */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h1 className="heading-display text-3xl text-foreground mb-2">
                  Review & Payment
                </h1>
                <p className="text-muted mb-6">
                  Please review your booking details before proceeding to payment.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-hover">
                      <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{property.name}</h3>
                      <p className="text-xs text-muted mt-0.5">
                        {property.location.city}, {property.location.state}
                      </p>
                    </div>
                  </div>

                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Dates & Guests</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Check-in</div>
                        <div className="text-foreground font-medium">{formatWithYear(checkIn)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-subtle mb-1">Check-out</div>
                        <div className="text-foreground font-medium">{formatWithYear(checkOut)}</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm mt-4 pt-4 border-t border-surface-hover">
                      <span className="text-muted">{nights} night{nights > 1 ? "s" : ""}</span>
                      <span className="text-foreground font-medium">
                        {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Curated Experiences</h2>
                    {selectedExperiences.length === 0 ? (
                      <p className="text-sm text-muted">No experiences added yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {curationExperiences
                          .filter((exp) => selectedExperiences.includes(exp.id))
                          .map((exp) => (
                            <div key={exp.id} className="flex items-center justify-between text-sm">
                              <span className="text-foreground">{exp.name}</span>
                              <span className="text-muted">₹{exp.price.toLocaleString("en-IN")}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Price Summary</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted">
                        <span>₹{pricePerNight.toLocaleString()} x {nights} nights</span>
                        <span>₹{basePrice.toLocaleString()}</span>
                      </div>
                      {selectedExperiences.length > 0 && (
                        <div className="flex justify-between text-muted">
                          <span>Curated experiences</span>
                          <span>₹{experiencesTotal.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted">
                        <span>Platform fee</span>
                        <span>₹{platformFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>Taxes</span>
                        <span>₹{taxes.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-xl font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
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

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingPageContent />
    </Suspense>
  );
}
