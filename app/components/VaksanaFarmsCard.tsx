import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { vaksanaFarms } from "@/lib/vaksana-farms";

// Large partner-property spotlight card shown in place of individual listings
// under the Farm Stays category on /stays — links to the dedicated
// /vaksana-farms page rather than a single stay's detail page.
export default function VaksanaFarmsCard() {
  return (
    <Link
      href="/vaksana-farms"
      className="group col-span-full flex flex-col md:flex-row rounded-card-lg border-[5px] border-surface overflow-hidden bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
    >
      {/* Hero image */}
      <div className="relative h-56 md:h-auto md:w-[42%] shrink-0 overflow-hidden bg-surface-hover">
        <img
          loading="lazy"
          src={vaksanaFarms.heroImage}
          alt={vaksanaFarms.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-sage rounded-full">
            Partner Property
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-8 flex flex-col justify-center">
        <div className="flex items-center flex-wrap gap-2 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {vaksanaFarms.tagline}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-medium text-sage bg-sage/10 rounded-full border border-sage/20">
            {vaksanaFarms.unitsLabel}
          </span>
        </div>

        <h3 className="heading-display text-2xl sm:text-3xl text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {vaksanaFarms.name}
        </h3>

        <p className="text-sm text-muted mb-3">
          Near {vaksanaFarms.location.city}, {vaksanaFarms.location.state}
        </p>

        <p className="text-sm text-subtle leading-relaxed mb-5 max-w-xl">
          {vaksanaFarms.cardDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {vaksanaFarms.experiences.map((exp) => (
            <span
              key={exp.name}
              className="px-3 py-1 text-xs font-medium text-foreground bg-surface-hover rounded-full border border-border"
            >
              {exp.name}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 group-hover:gap-3 group-hover:scale-105">
          Explore Property <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
