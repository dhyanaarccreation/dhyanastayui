"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, BookOpen, ChevronRight, MapPin } from "lucide-react";
import { destinations, properties, experiences } from "@/lib/mock-data";
import { getBlogRecommendations } from "@/lib/content-generator";
import { travelCurators } from "@/lib/travel-guides-data";
import ImageCard from "@/app/components/cards/ImageCard";
import HorizontalScrollRow from "@/app/components/HorizontalScrollRow";
import PropertyCard from "@/app/components/PropertyCard";
import WishlistButton from "@/app/components/WishlistButton";
import CuratorAvatar from "@/app/components/CuratorAvatar";

// A curator whose `region` is this broad still has genuinely relevant
// nationwide/global travel know-how for any single destination.
const UNIVERSAL_CURATOR_REGIONS = ["India", "Global"];

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const destination = destinations.find((d) => d.slug === slug) ?? destinations[0];

  const stays = properties.filter((p) => p.location.city === destination.name);
  const localExperiences = experiences.filter((e) => e.location === destination.name);
  const blogGuides = getBlogRecommendations(destination.name);
  const curators = travelCurators
    .filter((c) => c.region === destination.state || c.region === destination.name || UNIVERSAL_CURATOR_REGIONS.includes(c.region))
    .slice(0, 3);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={destination.image} alt={destination.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full pb-8">
            <div className="flex items-center gap-2 text-xs text-white/70 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white">{destination.name}</span>
            </div>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h1 className="heading-display text-3xl md:text-5xl text-white mb-2">{destination.name}</h1>
                <p className="text-white/80 text-sm flex items-center gap-1.5">
                  <MapPin size={14} /> {destination.state} · {stays.length} curated stay{stays.length === 1 ? "" : "s"}
                </p>
              </div>
              <WishlistButton id={`destination-${destination.slug}`} label={destination.name} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 mt-10 space-y-14">
        {/* Travel Guides — blog guides + relevant travel curators, the same
            two sources the Stay detail page's "Explore [City]" section and
            the homepage Travel Guides section already draw from. */}
        <section>
          <h2 className="heading-display text-2xl text-foreground mb-1.5">
            Travel Guides for {destination.name}
          </h2>
          <p className="text-sm text-muted mb-6">
            Local know-how from Dhyana's editorial guides and travel curators.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {blogGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                className="group flex items-center gap-3 bg-surface border border-border rounded-2xl p-4 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <span className="text-sm font-medium text-foreground leading-snug flex-1">{guide.title}</span>
                <ArrowRight
                  size={14}
                  className="text-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </Link>
            ))}
          </div>

          {curators.length > 0 && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Curated by travel guides
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {curators.map((c) => (
                  <Link
                    key={c.handle}
                    href={`/travel-with/${c.handle}`}
                    className="group flex items-center gap-3 bg-surface border border-border rounded-2xl p-3.5 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-white shadow-md">
                      <CuratorAvatar name={c.name} avatar={c.avatar} className="w-full h-full object-cover text-xs" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                      <p className="text-xs text-subtle truncate">{c.creatorName}</p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="ml-auto text-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Places to Visit & Experiences */}
        <section>
          <h2 className="heading-display text-2xl text-foreground mb-1.5">
            Places to Visit in {destination.name}
          </h2>
          <p className="text-sm text-muted mb-6">
            Curated local experiences you can book on their own, or add to a stay.
          </p>
          {localExperiences.length > 0 ? (
            <HorizontalScrollRow label="experiences">
              {localExperiences.map((exp) => (
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
                  className="shrink-0 w-[62vw] sm:w-75 lg:w-85 snap-start"
                />
              ))}
            </HorizontalScrollRow>
          ) : (
            <p className="text-sm text-subtle">More experiences here are coming soon.</p>
          )}
        </section>

        {/* Featured Stays */}
        <section>
          <h2 className="heading-display text-2xl text-foreground mb-1.5">
            Featured Stays in {destination.name}
          </h2>
          <p className="text-sm text-muted mb-6">
            Curated, inspected properties in and around {destination.name}.
          </p>
          {stays.length > 0 ? (
            <HorizontalScrollRow label="stays">
              {stays.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  className="shrink-0 w-[62vw] sm:w-75 lg:w-85 snap-start"
                />
              ))}
            </HorizontalScrollRow>
          ) : (
            <p className="text-sm text-subtle">No curated stays here yet — more are added every month.</p>
          )}
        </section>
      </div>
    </div>
  );
}
