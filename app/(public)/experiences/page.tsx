import Link from "next/link";
import { Search, MapPin, Clock, Star, Filter } from "lucide-react";

export default function ExperiencesPage() {
  const experiences = [
    {
      id: 1,
      title: "Himalayan Pine Forest Foraging",
      location: "Mashobra, Himachal",
      duration: "4 Hours",
      price: 2500,
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
      category: "Nature"
    },
    {
      id: 2,
      title: "Traditional Rajasthani Cooking Masterclass",
      location: "Udaipur, Rajasthan",
      duration: "3 Hours",
      price: 3200,
      rating: 5.0,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      category: "Culinary"
    },
    {
      id: 3,
      title: "Ayurvedic Wellness Workshop",
      location: "Wayanad, Kerala",
      duration: "6 Hours",
      price: 5500,
      rating: 4.8,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      category: "Wellness"
    },
    {
      id: 4,
      title: "Heritage Architecture Walk",
      location: "Goa",
      duration: "2.5 Hours",
      price: 1800,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=800&auto=format&fit=crop",
      category: "Culture"
    }
  ];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2000&auto=format&fit=crop" alt="Travel Experiences" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 w-full mt-20">
          <h1 className="heading-display text-4xl md:text-6xl text-foreground mb-6">
            Curated Local Experiences.
          </h1>
          <p className="text-lg text-muted max-w-xl mb-10">
            Immerse yourself in the culture, flavors, and landscapes of your destination with our vetted local experts.
          </p>
          
          <div className="max-w-2xl bg-surface/80 backdrop-blur-md p-2 rounded-2xl border border-border flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
              <input type="text" placeholder="Search experiences or destinations..." className="w-full pl-12 pr-4 py-3 bg-transparent text-foreground focus:outline-none placeholder-subtle" />
            </div>
            <div className="w-px bg-border hidden md:block" />
            <div className="flex-1 relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
              <select className="w-full pl-12 pr-4 py-3 bg-transparent text-foreground focus:outline-none appearance-none">
                <option value="" className="bg-surface">Anywhere</option>
                <option value="himachal" className="bg-surface">Himachal Pradesh</option>
                <option value="kerala" className="bg-surface">Kerala</option>
                <option value="rajasthan" className="bg-surface">Rajasthan</option>
              </select>
            </div>
            <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-hover transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {["All", "Nature & Wildlife", "Culinary", "Wellness & Spa", "Culture & Heritage", "Adventure"].map((cat, i) => (
              <button key={i} className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-surface border border-border text-muted hover:border-subtle"
              }`}>
                {cat}
              </button>
            ))}
            <button className="px-4 py-2.5 rounded-full bg-surface border border-border text-foreground hover:border-subtle flex items-center gap-2 transition-colors ml-auto">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>
      </section>

      {/* Experience Grid */}
      <section className="py-16 max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Trending Experiences</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <Link href={`/experiences/${exp.id}`} key={exp.id} className="group flex flex-col">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur-md text-foreground text-[10px] uppercase tracking-wider rounded-full border border-border font-semibold">
                    {exp.category}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1 text-sm text-muted">
                  <MapPin size={14} className="text-primary" /> {exp.location}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <Star size={14} className="text-primary fill-primary" /> {exp.rating} <span className="text-subtle font-normal">({exp.reviews})</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{exp.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted mt-auto">
                <div className="flex items-center gap-1"><Clock size={14} /> {exp.duration}</div>
                <div className="font-semibold text-foreground">From ₹{exp.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
