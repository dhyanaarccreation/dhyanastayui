"use client";

import { useState } from "react";
import {
  Plus,
  X,
  Home,
  Sparkles,
  UtensilsCrossed,
  Ticket,
  Car,
  GripVertical,
  Save,
  Send,
  Eye,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { curatedStays, type StopType } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Itinerary Builder
// Assemble a day-by-day trip from typed stops:
// Stay → Experience → Food → Activity → Transport.
// UI-only — "Save Draft"/"Publish" simulate a
// successful write, no backend persistence.
// ============================================

const stopTypes: StopType[] = ["Stay", "Experience", "Food", "Activity", "Transport"];
const stopIcon: Record<StopType, typeof Home> = {
  Stay: Home,
  Experience: Sparkles,
  Food: UtensilsCrossed,
  Activity: Ticket,
  Transport: Car,
};

interface BuilderStop {
  id: string;
  type: StopType;
  label: string;
  notes: string;
}
interface BuilderDay {
  id: string;
  title: string;
  stops: BuilderStop[];
}

const coverImageOptions = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=75",
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=75",
  "https://images.unsplash.com/photo-1595274459742-4dee436c0e0a?w=800&q=75",
  "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=75",
];

export default function ItineraryBuilderPage() {
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [coverImage, setCoverImage] = useState(coverImageOptions[0]);
  const [days, setDays] = useState<BuilderDay[]>([
    { id: "d1", title: "", stops: [] },
  ]);
  const [saveState, setSaveState] = useState<"idle" | "draft" | "published">("idle");

  const addDay = () => setDays((prev) => [...prev, { id: `d${Date.now()}`, title: "", stops: [] }]);
  const removeDay = (dayId: string) => setDays((prev) => prev.filter((d) => d.id !== dayId));
  const updateDayTitle = (dayId: string, value: string) =>
    setDays((prev) => prev.map((d) => (d.id === dayId ? { ...d, title: value } : d)));

  const addStop = (dayId: string, type: StopType) =>
    setDays((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, stops: [...d.stops, { id: `s${Date.now()}`, type, label: "", notes: "" }] } : d))
    );
  const removeStop = (dayId: string, stopId: string) =>
    setDays((prev) => prev.map((d) => (d.id === dayId ? { ...d, stops: d.stops.filter((s) => s.id !== stopId) } : d)));
  const updateStop = (dayId: string, stopId: string, field: "label" | "notes", value: string) =>
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId ? { ...d, stops: d.stops.map((s) => (s.id === stopId ? { ...s, [field]: value } : s)) } : d
      )
    );
  const moveStop = (dayId: string, stopId: string, direction: -1 | 1) =>
    setDays((prev) =>
      prev.map((d) => {
        if (d.id !== dayId) return d;
        const idx = d.stops.findIndex((s) => s.id === stopId);
        const swapIdx = idx + direction;
        if (idx === -1 || swapIdx < 0 || swapIdx >= d.stops.length) return d;
        const stops = [...d.stops];
        [stops[idx], stops[swapIdx]] = [stops[swapIdx], stops[idx]];
        return { ...d, stops };
      })
    );

  const totalActivities = days.reduce((sum, d) => sum + d.stops.length, 0);
  const canSave = title.trim().length > 0 && days.some((d) => d.stops.length > 0);

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Itinerary Builder"
        subtitle="Arrange stays, experiences, food and activities into a day-by-day trip travellers can copy."
      />

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          {/* Trip basics */}
          <SectionCard title="Trip Details" icon={Sparkles}>
            <div className="p-5 space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Itinerary title — e.g. “3-Day Pondicherry Couple Trip”"
                className="w-full text-sm bg-background border border-border rounded-xl px-3.5 py-2.5 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Region — e.g. Pondicherry & Auroville"
                  className="text-sm bg-background border border-border rounded-xl px-3.5 py-2.5 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  placeholder="Estimated cost — e.g. ₹9,500 for two"
                  className="text-sm bg-background border border-border rounded-xl px-3.5 py-2.5 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </SectionCard>

          {/* Day-by-day builder */}
          <SectionCard title={`Day-by-Day (${days.length} days · ${totalActivities} stops)`} icon={Home}>
            <div className="p-5 space-y-4">
              {days.map((day, dayIndex) => (
                <div key={day.id} className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {dayIndex + 1}
                    </span>
                    <input
                      value={day.title}
                      onChange={(e) => updateDayTitle(day.id, e.target.value)}
                      placeholder={`Day ${dayIndex + 1} title — e.g. "Arrival & French Quarter"`}
                      className="flex-1 text-sm bg-transparent border-b border-dashed border-border focus:outline-none focus:border-primary py-1 text-foreground placeholder-subtle"
                    />
                    {days.length > 1 && (
                      <button
                        onClick={() => removeDay(day.id)}
                        aria-label={`Remove day ${dayIndex + 1}`}
                        className="text-subtle hover:text-terracotta transition-colors shrink-0"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  <div className="mt-3 space-y-2 pl-9">
                    {day.stops.map((stop, stopIndex) => {
                      const Icon = stopIcon[stop.type];
                      return (
                        <div key={stop.id} className="flex items-start gap-2 rounded-xl bg-surface border border-border p-2.5">
                          <GripVertical size={13} className="text-subtle mt-2 shrink-0" />
                          <span className="w-7 h-7 rounded-lg bg-sage/10 text-sage flex items-center justify-center shrink-0">
                            <Icon size={13} />
                          </span>
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-semibold uppercase tracking-wider text-subtle shrink-0">{stop.type}</span>
                              <input
                                value={stop.label}
                                onChange={(e) => updateStop(day.id, stop.id, "label", e.target.value)}
                                placeholder="What happens here…"
                                className="flex-1 text-xs bg-transparent focus:outline-none text-foreground placeholder-subtle"
                                list={stop.type === "Stay" ? "curated-stay-suggestions" : undefined}
                              />
                            </div>
                            <input
                              value={stop.notes}
                              onChange={(e) => updateStop(day.id, stop.id, "notes", e.target.value)}
                              placeholder="Optional note for travellers…"
                              className="w-full text-[11px] bg-transparent focus:outline-none text-subtle placeholder-subtle italic"
                            />
                          </div>
                          <div className="flex flex-col gap-1 shrink-0 mt-1">
                            <button
                              onClick={() => moveStop(day.id, stop.id, -1)}
                              disabled={stopIndex === 0}
                              aria-label="Move stop up"
                              className="text-subtle hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <ChevronUp size={13} />
                            </button>
                            <button
                              onClick={() => moveStop(day.id, stop.id, 1)}
                              disabled={stopIndex === day.stops.length - 1}
                              aria-label="Move stop down"
                              className="text-subtle hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <ChevronDown size={13} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeStop(day.id, stop.id)}
                            aria-label="Remove stop"
                            className="text-subtle hover:text-terracotta transition-colors shrink-0 mt-1"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      );
                    })}
                    {day.stops.length === 0 && (
                      <p className="text-[11px] text-subtle italic py-1">No stops yet — add one below.</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pl-9">
                    {stopTypes.map((t) => {
                      const Icon = stopIcon[t];
                      return (
                        <button
                          key={t}
                          onClick={() => addStop(day.id, t)}
                          className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium border border-border rounded-full text-muted hover:text-sage hover:border-sage/40 transition-colors"
                        >
                          <Plus size={10} /> <Icon size={11} /> {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                onClick={addDay}
                className="w-full flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border border-dashed border-border rounded-2xl text-muted hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Plus size={13} /> Add another day
              </button>

              <datalist id="curated-stay-suggestions">
                {curatedStays.map((s) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar: cover image + save actions */}
        <div className="space-y-4">
          <SectionCard title="Cover Image" icon={ImageIcon}>
            <div className="p-5">
              <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt="Itinerary cover" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {coverImageOptions.map((img) => (
                  <button
                    key={img}
                    onClick={() => setCoverImage(img)}
                    className={`relative h-12 rounded-lg overflow-hidden border-2 transition-colors ${coverImage === img ? "border-primary" : "border-transparent"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Save & Publish" icon={Send}>
            <div className="p-5 space-y-2.5">
              <button
                onClick={() => setSaveState("draft")}
                disabled={!title.trim()}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold border border-border text-foreground rounded-xl hover:bg-surface-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={13} /> Save Draft
              </button>
              <button
                onClick={() => setSaveState("published")}
                disabled={!canSave}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={13} /> Publish Itinerary
              </button>
              <button
                disabled={!title.trim()}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium border border-border text-muted rounded-xl hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Eye size={13} /> Preview
              </button>
              {saveState !== "idle" && (
                <div className="pt-2">
                  <StatusPill tone="sage">
                    {saveState === "draft" ? "Saved as draft" : "Published — now live on your curator page"}
                  </StatusPill>
                </div>
              )}
              {!canSave && (
                <p className="text-[11px] text-subtle pt-1">Add a title and at least one stop to publish.</p>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
