"use client";

import { ArrowRight, Heart, MapPin, Sparkles, Plane } from "lucide-react";
import { PageHeader, SectionCard } from "@/app/components/DashboardUI";
import PropertyCard from "@/app/components/PropertyCard";
import ImageCard from "@/app/components/cards/ImageCard";
import WishlistButton from "@/app/components/WishlistButton";
import { properties, experiences } from "@/lib/mock-data";
import { useWishlist } from "@/lib/useWishlist";

const bucketList = [
  { place: "Spiti Valley", note: "Cold desert homestay, next summer", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70" },
  { place: "Majuli Island", note: "River island monastery stay", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=70" },
  { place: "Gokarna", note: "Beach cottage, long weekend", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70" },
];

const dreams = [
  "Sleep in a treehouse",
  "Vipassana retreat",
  "Harvest my own dinner",
  "Himalayan workation month",
  "Houseboat new year",
];

export default function TravellerWishlistPage() {
  const { ids, hydrated } = useWishlist();

  // Ids are namespaced by WishlistButton as `stay-<id>` / `experience-<id>` /
  // `destination-<slug>` — split back out to look each one up for real.
  const savedStays = properties.filter((p) => ids.includes(`stay-${p.id}`));
  const savedExperiences = experiences.filter((e) => ids.includes(`experience-${e.id}`));

  return (
    <div className="space-y-4 pb-12">
      <PageHeader
        title="Wishlist & Bucket List"
        subtitle="Stays you've saved, places you dream about, and plans for the future."
      />

      {/* Saved stays — the heart button on any stay/destination page, or the
          heart overlay on a stay card, all write here via useWishlist. */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Heart size={15} className="text-terracotta" /> Favourite Properties
            {hydrated && <span className="text-xs text-subtle font-normal">({savedStays.length})</span>}
          </h2>
        </div>
        {!hydrated ? null : savedStays.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {savedStays.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-2xl p-8 text-center">
            <Heart size={22} className="text-subtle mx-auto mb-2" />
            <p className="text-sm text-subtle">
              No stays saved yet — tap the heart on any stay to add it here.
            </p>
          </div>
        )}
      </div>

      {/* Saved experiences */}
      {hydrated && savedExperiences.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-primary" /> Favourite Experiences
            <span className="text-xs text-subtle font-normal">({savedExperiences.length})</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {savedExperiences.map((exp) => (
              <ImageCard
                key={exp.id}
                href={`/experiences/${exp.id}`}
                image={exp.image}
                alt={exp.name}
                badge={exp.category}
                title={exp.name.split(" ").slice(0, 3).join(" ")}
                actionLabel={`₹${exp.price.toLocaleString("en-IN")}`}
                actionIcon={ArrowRight}
                titleLayout="row"
                topRight={<WishlistButton id={`experience-${exp.id}`} label={exp.name} variant="icon" />}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Bucket List Destinations" icon={MapPin} action={{ label: "Add place", href: "/#explore-stays" }}>
          <ul className="divide-y divide-surface-hover">
            {bucketList.map((b) => (
              <li key={b.place} className="flex items-center gap-4 px-5 py-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.img} alt={b.place} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{b.place}</p>
                  <p className="text-xs text-muted truncate">{b.note}</p>
                </div>
                <Plane size={15} className="text-subtle shrink-0" />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Dream Experiences" icon={Sparkles} action={{ label: "Explore", href: "/experiences" }}>
          <div className="px-5 py-5 flex flex-wrap gap-2">
            {dreams.map((d) => (
              <span
                key={d}
                className="text-sm px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {d}
              </span>
            ))}
          </div>
          <p className="px-5 pb-5 text-[11px] text-subtle">
            The AI Trip Planner uses these to surface matching stays and local events.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
