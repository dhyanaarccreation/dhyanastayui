import Link from "next/link";
import { Search, MapPin, ChefHat, Leaf, Star, Filter } from "lucide-react";

export default function CuratedFoodPage() {
  const restaurants = [
    {
      id: 1,
      name: "The Forager's Table",
      location: "Mashobra, Himachal",
      type: "Farm-to-Table",
      price: "₹₹₹",
      rating: 4.9,
      tags: ["Organic", "Himalayan", "Vegan Options"],
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Udaipur Royal Spice",
      location: "Udaipur, Rajasthan",
      type: "Fine Dining",
      price: "₹₹₹₹",
      rating: 4.8,
      tags: ["Heritage Recipes", "Courtyard Seating"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Coastal Catch",
      location: "Goa",
      type: "Seafood & Grill",
      price: "₹₹",
      rating: 4.7,
      tags: ["Fresh Catch", "Beachfront", "Cocktails"],
      image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Ayur Kitchen",
      location: "Wayanad, Kerala",
      type: "Wellness Cafe",
      price: "₹₹",
      rating: 4.9,
      tags: ["Ayurvedic", "Plant-based", "Sattvic"],
      image: "https://images.unsplash.com/photo-1490818387583-1b5ba4597b8c?q=80&w=800&auto=format&fit=crop",
    }
  ];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop" alt="Curated Dining" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 w-full mt-20">
          <span className="text-xs uppercase tracking-wider text-primary font-bold mb-4 flex items-center gap-2">
            <ChefHat size={16} /> Dhyana Dining
          </span>
          <h1 className="heading-display text-4xl md:text-6xl text-foreground mb-6">
            Taste the destination.
          </h1>
          <p className="text-lg text-muted max-w-xl mb-10">
            Pre-book tables, curated meal plans, and private chef experiences at our vetted local culinary partners.
          </p>
          
          <div className="max-w-2xl bg-surface/80 backdrop-blur-md p-2 rounded-2xl border border-border flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
              <input type="text" placeholder="Search restaurants or cuisines..." className="w-full pl-12 pr-4 py-3 bg-transparent text-foreground focus:outline-none placeholder-subtle" />
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
              Find Food
            </button>
          </div>
        </div>
      </section>

      {/* Featured Service */}
      <section className="py-16 max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-r from-surface to-surface-hover border border-primary/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Leaf size={18} />
              <span className="text-xs font-semibold uppercase tracking-wider">Private Chef Experience</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Dine in the comfort of your stay</h2>
            <p className="text-muted leading-relaxed mb-8">
              Why go out when the best local chefs can come to you? Book a private chef to prepare a multi-course regional tasting menu right in your villa's kitchen.
            </p>
            <button className="px-8 py-3 bg-surface-hover border border-border text-foreground font-semibold rounded-xl hover:bg-surface-hover transition-colors">
              Explore Menus
            </button>
          </div>
          <div className="w-full md:w-[40%] aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1556910110-a5a63dfd393c?q=80&w=800&auto=format&fit=crop" alt="Private Chef" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex gap-4 overflow-x-auto scrollbar-hide">
          {["All", "Farm-to-Table", "Fine Dining", "Cafes", "Local Street Food Vetted", "Vegan / Plant-based"].map((cat, i) => (
            <button key={i} className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0 ? "bg-primary text-primary-foreground" : "bg-surface border border-border text-muted hover:border-subtle"
            }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="py-16 max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Curated Dining Partners</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {restaurants.map((res) => (
            <div key={res.id} className="group flex flex-col sm:flex-row gap-6 bg-surface border border-border p-4 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-full sm:w-48 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shrink-0">
                <img src={res.image} alt={res.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
              </div>
              
              <div className="flex flex-col flex-1 justify-center py-2">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    {res.type}
                  </span>
                  <span className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Star size={12} className="text-primary fill-primary" /> {res.rating}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{res.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted mb-4">
                  <MapPin size={14} /> {res.location} <span className="mx-1">•</span> {res.price}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {res.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-surface-hover border border-border rounded text-[10px] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
