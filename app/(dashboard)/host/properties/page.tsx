"use client";

import { useState } from "react";
import {
  Plus,
  MessageSquare,
  MapPin,
  Eye,
  Pencil,
  Pause,
  Home,
  X,
  Save,
  Check,
  Tag,
  ListChecks,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Video,
  RotateCw,
} from "lucide-react";
import { PageHeader, StatGrid, StatusPill } from "@/app/components/DashboardUI";
import { properties } from "@/lib/mock-data";
import Link from "next/link";

const listing = [
  { p: properties[0], status: "Live", tone: "sage" as const, occupancy: "82%" },
  { p: properties[1], status: "Live", tone: "sage" as const, occupancy: "74%" },
  { p: properties[2], status: "Paused · seasonal closure", tone: "muted" as const, occupancy: "—" },
];

// Videos and 360 tours aren't modeled in the shared mock-data yet — kept local
// to this page so the Gallery manager below has something to edit per property.
const extraGallery: Record<string, { videos: string[]; tour360: string[] }> = {
  [properties[0].id]: {
    videos: ["Sunrise walkthrough.mp4", "Guest welcome tour.mp4"],
    tour360: ["Living deck — 360°", "Bedroom — 360°"],
  },
  [properties[1].id]: {
    videos: ["Property overview.mp4"],
    tour360: ["Common area — 360°"],
  },
  [properties[2].id]: {
    videos: [],
    tour360: ["Exterior grounds — 360°"],
  },
};

const stockImagePool = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
];

type PropertyEdits = {
  description: string;
  story: string;
  amenities: string[];
  houseRules: string[];
  images: string[];
  videos: string[];
  tour360: string[];
};

const initialEdits: Record<string, PropertyEdits> = Object.fromEntries(
  listing.map(({ p }) => [
    p.id,
    {
      description: p.description,
      story: p.story,
      amenities: [...p.amenities],
      houseRules: [...p.houseRules],
      images: [...p.galleryImages],
      videos: [...(extraGallery[p.id]?.videos ?? [])],
      tour360: [...(extraGallery[p.id]?.tour360 ?? [])],
    },
  ])
);

type GalleryTab = "images" | "videos" | "360";

export default function HostPropertiesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, PropertyEdits>>(initialEdits);
  const [galleryTab, setGalleryTab] = useState<GalleryTab>("images");
  const [amenityInput, setAmenityInput] = useState("");
  const [ruleInput, setRuleInput] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setGalleryTab("images");
    setAmenityInput("");
    setRuleInput("");
  };

  const updateField = (id: string, field: "description" | "story", value: string) =>
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));

  const addAmenity = (id: string) => {
    const value = amenityInput.trim();
    if (!value) return;
    setEdits((prev) =>
      prev[id].amenities.includes(value)
        ? prev
        : { ...prev, [id]: { ...prev[id], amenities: [...prev[id].amenities, value] } }
    );
    setAmenityInput("");
  };

  const removeAmenity = (id: string, value: string) =>
    setEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], amenities: prev[id].amenities.filter((a) => a !== value) },
    }));

  const addRule = (id: string) => {
    const value = ruleInput.trim();
    if (!value) return;
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], houseRules: [...prev[id].houseRules, value] } }));
    setRuleInput("");
  };

  const removeRule = (id: string, idx: number) =>
    setEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], houseRules: prev[id].houseRules.filter((_, i) => i !== idx) },
    }));

  const addGalleryItem = (id: string, tab: GalleryTab) =>
    setEdits((prev) => {
      const current = prev[id];
      if (tab === "images") {
        const next = stockImagePool[current.images.length % stockImagePool.length];
        return { ...prev, [id]: { ...current, images: [...current.images, next] } };
      }
      if (tab === "videos") {
        return {
          ...prev,
          [id]: { ...current, videos: [...current.videos, `New walkthrough clip ${current.videos.length + 1}.mp4`] },
        };
      }
      return {
        ...prev,
        [id]: { ...current, tour360: [...current.tour360, `New 360° scan ${current.tour360.length + 1}`] },
      };
    });

  const removeGalleryItem = (id: string, tab: GalleryTab, idx: number) =>
    setEdits((prev) => {
      const current = prev[id];
      if (tab === "images") return { ...prev, [id]: { ...current, images: current.images.filter((_, i) => i !== idx) } };
      if (tab === "videos") return { ...prev, [id]: { ...current, videos: current.videos.filter((_, i) => i !== idx) } };
      return { ...prev, [id]: { ...current, tour360: current.tour360.filter((_, i) => i !== idx) } };
    });

  const handleSave = (id: string) => {
    setSavedId(id);
    window.setTimeout(() => setSavedId((prev) => (prev === id ? null : prev)), 2000);
  };

  return (
    <div className="space-y-4 pb-12">
      <PageHeader
        title="My Properties"
        subtitle="Listing control, availability and status for every property you host."
        action={{ label: "Add Property", href: "/host/onboarding", icon: Plus }}
      />

      <StatGrid
        stats={[
          { label: "Total Properties", value: "3", icon: Home },
          { label: "Live Listings", value: "2", delta: "1 paused" },
          { label: "Avg Occupancy", value: "78%", delta: "+5% MoM" },
          { label: "Total Reviews", value: "264", delta: "across all listings", icon: MessageSquare },
        ]}
      />

      <div className="space-y-4">
        {listing.map(({ p, status, tone, occupancy }) => {
          const edit = edits[p.id];
          const isExpanded = expandedId === p.id;
          return (
            <div key={p.id}>
              <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-5 md:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full md:w-44 h-32 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-semibold text-foreground">{p.name}</h2>
                    <StatusPill tone={tone}>{status}</StatusPill>
                  </div>
                  <p className="text-xs text-muted mt-1 flex items-center gap-1">
                    <MapPin size={11} /> {p.location.city}, {p.location.state} · {p.category}
                  </p>
                  <div className="flex items-center gap-5 mt-3 text-xs text-muted">
                    <span>
                      <span className="text-foreground font-semibold">₹{p.price.toLocaleString("en-IN")}</span>/night
                    </span>
                    <span>
                      Occupancy <span className="text-foreground font-semibold">{occupancy}</span>
                    </span>
                    <span>{p.reviewCount} reviews</span>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 shrink-0">
                  <Link
                    href={`/stays/${p.slug}`}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground hover:border-border-light transition-colors"
                  >
                    <Eye size={13} /> Preview
                  </Link>
                  <button
                    onClick={() => toggleExpand(p.id)}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium border rounded-full transition-colors ${
                      isExpanded
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted hover:text-foreground hover:border-border-light"
                    }`}
                  >
                    {isExpanded ? <X size={13} /> : <Pencil size={13} />}
                    {isExpanded ? "Close" : "Edit"}
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-terracotta hover:border-terracotta/50 transition-colors">
                    <Pause size={13} /> Pause
                  </button>
                </div>
              </div>

              {isExpanded && edit && (
                <div className="mt-3 bg-surface border border-border rounded-2xl overflow-hidden animate-fade-in">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-surface-hover flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Pencil size={15} />
                      </span>
                      <p className="text-sm font-semibold text-foreground">Editing {p.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {savedId === p.id && (
                        <StatusPill tone="sage">
                          <Check size={10} /> Saved
                        </StatusPill>
                      )}
                      <button
                        onClick={() => handleSave(p.id)}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                      >
                        <Save size={13} /> Save changes
                      </button>
                    </div>
                  </div>

                  {/* Property Information: description + story */}
                  <div className="p-5 grid md:grid-cols-2 gap-5 border-b border-surface-hover">
                    <div>
                      <label className="text-xs font-semibold text-subtle uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <FileText size={12} /> Description
                      </label>
                      <textarea
                        value={edit.description}
                        onChange={(e) => updateField(p.id, "description", e.target.value)}
                        rows={4}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground leading-relaxed focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-subtle uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <BookOpen size={12} /> Story
                      </label>
                      <textarea
                        value={edit.story}
                        onChange={(e) => updateField(p.id, "story", e.target.value)}
                        rows={4}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground leading-relaxed focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="p-5 border-b border-surface-hover">
                    <p className="text-xs font-semibold text-subtle uppercase tracking-wider flex items-center gap-1.5 mb-3">
                      <Tag size={12} /> Amenities
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {edit.amenities.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 text-xs bg-background border border-border rounded-full text-foreground"
                        >
                          {a}
                          <button
                            onClick={() => removeAmenity(p.id, a)}
                            aria-label={`Remove ${a}`}
                            className="w-4 h-4 rounded-full flex items-center justify-center text-subtle hover:text-terracotta hover:bg-terracotta/10 transition-colors"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                      {edit.amenities.length === 0 && <p className="text-xs text-subtle">No amenities added yet.</p>}
                    </div>
                    <div className="flex items-center gap-2 max-w-sm">
                      <input
                        value={amenityInput}
                        onChange={(e) => setAmenityInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addAmenity(p.id);
                          }
                        }}
                        placeholder="Add amenity…"
                        className="flex-1 px-3.5 py-2 rounded-full bg-background border border-border text-xs text-foreground placeholder-subtle focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => addAmenity(p.id)}
                        aria-label="Add amenity"
                        className="w-8 h-8 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* House Rules */}
                  <div className="p-5 border-b border-surface-hover">
                    <p className="text-xs font-semibold text-subtle uppercase tracking-wider flex items-center gap-1.5 mb-3">
                      <ListChecks size={12} /> House Rules
                    </p>
                    <ul className="space-y-2 mb-3">
                      {edit.houseRules.map((rule, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg bg-background border border-border"
                        >
                          <span className="text-xs text-foreground">{rule}</span>
                          <button
                            onClick={() => removeRule(p.id, idx)}
                            aria-label="Remove rule"
                            className="text-subtle hover:text-terracotta transition-colors shrink-0"
                          >
                            <X size={13} />
                          </button>
                        </li>
                      ))}
                      {edit.houseRules.length === 0 && <p className="text-xs text-subtle">No house rules added yet.</p>}
                    </ul>
                    <div className="flex items-center gap-2 max-w-sm">
                      <input
                        value={ruleInput}
                        onChange={(e) => setRuleInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addRule(p.id);
                          }
                        }}
                        placeholder="Add house rule…"
                        className="flex-1 px-3.5 py-2 rounded-full bg-background border border-border text-xs text-foreground placeholder-subtle focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => addRule(p.id)}
                        aria-label="Add house rule"
                        className="w-8 h-8 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Gallery: Images / Videos / 360 Tour */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-subtle uppercase tracking-wider flex items-center gap-1.5 mb-3">
                      <ImageIcon size={12} /> Gallery
                    </p>
                    <div className="flex items-center gap-1.5 mb-4">
                      {([
                        { key: "images" as const, label: `Images (${edit.images.length})` },
                        { key: "videos" as const, label: `Videos (${edit.videos.length})` },
                        { key: "360" as const, label: `360° Tour (${edit.tour360.length})` },
                      ]).map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setGalleryTab(tab.key)}
                          className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                            galleryTab === tab.key
                              ? "bg-primary text-primary-foreground"
                              : "border border-border text-muted hover:text-foreground"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {galleryTab === "images" && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {edit.images.map((src, idx) => (
                          <div key={idx} className="relative group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt="" className="w-full h-20 rounded-lg object-cover" />
                            <button
                              onClick={() => removeGalleryItem(p.id, "images", idx)}
                              aria-label="Remove image"
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addGalleryItem(p.id, "images")}
                          aria-label="Add image"
                          className="w-full h-20 rounded-lg border border-dashed border-border text-subtle hover:text-primary hover:border-primary flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}

                    {galleryTab === "videos" && (
                      <div className="space-y-2">
                        {edit.videos.length === 0 && <p className="text-xs text-subtle">No videos yet.</p>}
                        {edit.videos.map((v, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-background border border-border"
                          >
                            <span className="flex items-center gap-2 text-xs text-foreground">
                              <Video size={13} className="text-primary" /> {v}
                            </span>
                            <button
                              onClick={() => removeGalleryItem(p.id, "videos", idx)}
                              aria-label="Remove video"
                              className="text-subtle hover:text-terracotta transition-colors shrink-0"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addGalleryItem(p.id, "videos")}
                          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <Plus size={12} /> Add video
                        </button>
                      </div>
                    )}

                    {galleryTab === "360" && (
                      <div className="space-y-2">
                        {edit.tour360.length === 0 && <p className="text-xs text-subtle">No 360° scans yet.</p>}
                        {edit.tour360.map((t, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-background border border-border"
                          >
                            <span className="flex items-center gap-2 text-xs text-foreground">
                              <RotateCw size={13} className="text-primary" /> {t}
                            </span>
                            <button
                              onClick={() => removeGalleryItem(p.id, "360", idx)}
                              aria-label="Remove 360 scan"
                              className="text-subtle hover:text-terracotta transition-colors shrink-0"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addGalleryItem(p.id, "360")}
                          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <Plus size={12} /> Add 360° scan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-subtle">
        Pausing a property hides it from search instantly. Seasonal closures can be scheduled from Calendar &amp; Pricing.
      </p>
    </div>
  );
}
