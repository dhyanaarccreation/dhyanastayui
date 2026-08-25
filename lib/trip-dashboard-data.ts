// ============================================
// Traveller Live Trip Dashboard — mock data
// UI-only: typed so a real backend (active trip,
// live GPS, booking/ticket APIs) can slot in later.
// ============================================

import { properties, destinations } from "@/lib/mock-data";

const stayProperty = properties[0]; // "The Canopy Tiny House" — Auroville, Tamil Nadu
const auroville = destinations.find((d) => d.name === "Auroville") ?? destinations[0];

export function directionsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export interface ActiveTrip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  currentDay: number;
  totalDays: number;
  travellers: number;
  heroImage: string;
}

export const activeTrip: ActiveTrip = {
  id: "trip-pondicherry-01",
  name: "Pondicherry Trip",
  destination: "Pondicherry, Tamil Nadu",
  startDate: "2026-08-24",
  endDate: "2026-08-28",
  currentDay: 2,
  totalDays: 5,
  travellers: 2,
  heroImage: auroville.image,
};

export type ActivityStatus = "completed" | "current" | "upcoming" | "delayed" | "skipped";

export interface TimelineActivity {
  id: string;
  time: string;
  title: string;
  status: ActivityStatus;
  durationMin?: number;
  location?: string;
  note?: string;
}

export const todayTimeline: TimelineActivity[] = [
  { id: "act-1", time: "8:00 AM", title: "Breakfast", status: "completed", location: "The Canopy Tiny House" },
  { id: "act-2", time: "10:00 AM", title: "Stay Check-out", status: "completed", location: "The Canopy Tiny House" },
  { id: "act-3", time: "11:00 AM", title: "Auroville Visit", status: "current", durationMin: 120, location: "Auroville" },
  { id: "act-4", time: "1:30 PM", title: "Lunch", status: "upcoming", location: "Auroville" },
  { id: "act-5", time: "3:30 PM", title: "Matrimandir Visitor Centre", status: "upcoming", location: "Matrimandir, Auroville" },
  { id: "act-6", time: "5:00 PM", title: "Photography Experience", status: "delayed", note: "Running 15 min late", location: "Auroville" },
  { id: "act-7", time: "6:30 PM", title: "Beach Visit", status: "upcoming", location: "Auroville Beach" },
  { id: "act-8", time: "8:00 PM", title: "Dinner", status: "upcoming", location: "The Canopy Tiny House" },
];

export interface UpcomingActivity {
  id: string;
  day: "Today" | "Tomorrow";
  time: string;
  title: string;
}

export const tomorrowPreview: UpcomingActivity[] = [
  { id: "tmw-1", day: "Tomorrow", time: "9:00 AM", title: "Yoga" },
  { id: "tmw-2", day: "Tomorrow", time: "11:00 AM", title: "Local Tour" },
];

export interface LiveLocation {
  currentLabel: string;
  nextLabel: string;
  distanceKm: number;
  etaMin: number;
  recommendedDeparture: string;
  permission: "granted" | "unavailable";
}

export const liveLocation: LiveLocation = {
  currentLabel: "Auroville Visit",
  nextLabel: "Matrimandir Visitor Centre",
  distanceKm: 4.2,
  etaMin: 18,
  recommendedDeparture: "3:30 PM",
  permission: "granted",
};

export type BookingCategory =
  | "Stay"
  | "Experience"
  | "Event"
  | "Workshop"
  | "Bike Rental"
  | "Car Rental"
  | "Cab"
  | "Food Order"
  | "Other";

export type BookingStatus = "Confirmed" | "Pending" | "In Progress" | "Completed" | "Cancelled";

export interface TripBooking {
  id: string;
  category: BookingCategory;
  title: string;
  date: string;
  time: string;
  location: string;
  status: BookingStatus;
  hasTicket?: boolean;
  contactPhone?: string;
  directionsHref?: string;
}

export const tripBookings: TripBooking[] = [
  { id: "DHY-773412", category: "Stay", title: stayProperty.name, date: "Aug 23", time: "2:00 PM", location: "Auroville, Tamil Nadu", status: "Confirmed", hasTicket: true, contactPhone: "+91 98765 43210", directionsHref: directionsUrl("The Canopy Tiny House, Auroville") },
  { id: "DHY-118820", category: "Experience", title: "Matrimandir Visitor Centre Pass", date: "Aug 25", time: "3:30 PM", location: "Matrimandir, Auroville", status: "Confirmed", hasTicket: true, directionsHref: directionsUrl("Matrimandir, Auroville") },
  { id: "DHY-556291", category: "Experience", title: "Photography Experience", date: "Aug 25", time: "5:00 PM", location: "Auroville", status: "Confirmed", hasTicket: true },
  { id: "DHY-902341", category: "Bike Rental", title: "Scooter Rental — 2 days", date: "Aug 24", time: "9:00 AM", location: "Auroville Visitor Centre", status: "In Progress", contactPhone: "+91 90000 11122" },
  { id: "DHY-347710", category: "Food Order", title: "Auroville Breakfast Basket", date: "Aug 25", time: "8:00 AM", location: "Delivered to stay", status: "Completed" },
  { id: "DHY-229981", category: "Cab", title: "Airport Pickup Cab", date: "Aug 23", time: "11:00 AM", location: "Chennai Airport → Auroville", status: "Completed", contactPhone: "+91 90000 33344" },
  { id: "DHY-664501", category: "Event", title: "Sunset Beach Bonfire Night", date: "Aug 26", time: "6:30 PM", location: "Auroville Beach", status: "Pending", directionsHref: directionsUrl("Auroville Beach") },
  { id: "DHY-810023", category: "Workshop", title: "Pottery Workshop with Murugan K.", date: "Aug 27", time: "10:00 AM", location: "Auroville Studio", status: "Confirmed", hasTicket: true },
];

export interface TicketDetails {
  bookingId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  travellerName: string;
  instructions: string[];
}

export const mockTicket: TicketDetails = {
  bookingId: "DHY-118820",
  title: "Auroville Experience",
  date: "Today",
  time: "4:00 PM",
  location: "Matrimandir Visitor Centre, Auroville",
  travellerName: "Ananya Rao",
  instructions: [
    "Carry a valid photo ID",
    "Arrive 15 minutes early for the security check",
    "Photography is restricted inside the inner chamber",
    "Comfortable footwear recommended",
  ],
};

export interface StayDetails {
  propertyName: string;
  image: string;
  checkIn: string;
  checkOut: string;
  unit: string;
  hostName: string;
  address: string;
  wifiSsid: string;
  wifiPassword: string;
  facilities: string[];
  houseRules: string[];
}

export const stayDetails: StayDetails = {
  propertyName: stayProperty.name,
  image: stayProperty.images[0],
  checkIn: "Aug 23, 2:00 PM",
  checkOut: "Aug 28, 11:00 AM",
  unit: "Tiny House #1",
  hostName: stayProperty.host.name,
  address: `${stayProperty.location.city}, ${stayProperty.location.state}`,
  wifiSsid: "Canopy_Guest",
  wifiPassword: "canopy2026",
  facilities: stayProperty.amenities,
  houseRules: stayProperty.houseRules,
};

export interface HostContact {
  name: string;
  avatar: string;
  phone: string;
}

export const hostContact: HostContact = {
  name: stayProperty.host.name,
  avatar: stayProperty.host.avatar,
  phone: "+91 98765 43210",
};

export interface GuideContact {
  name: string;
  avatar: string;
  phone: string;
  currentActivity: string;
}

export const guideContact: GuideContact = {
  name: "Meera Iyer",
  avatar: "https://i.pravatar.cc/150?img=45",
  phone: "+91 91234 56780",
  currentActivity: "Auroville Local Tour",
};

export interface TransportContact {
  type: "Bike" | "Car" | "Cab";
  provider: string;
  vehicle: string;
  bookingId: string;
  phone: string;
  pickupLocation?: string;
}

export const transportContacts: TransportContact[] = [
  { type: "Bike", provider: "GreenWheels Auroville", vehicle: "Honda Activa · TN 33 AB 1234", bookingId: "DHY-902341", phone: "+91 90000 11122", pickupLocation: "Auroville Visitor Centre" },
  { type: "Cab", provider: "Dhyana Cabs", vehicle: "Toyota Etios · TN 07 CD 5678", bookingId: "DHY-229981", phone: "+91 90000 33344", pickupLocation: "Stay entrance" },
];

export type FoodOrderStatus = "Ordered" | "Preparing" | "Ready" | "Delivered";

export interface FoodOrder {
  id: string;
  meal: string;
  orderNumber: string;
  items: string;
  status: FoodOrderStatus;
  expectedTime: string;
}

export const foodOrders: FoodOrder[] = [
  { id: "fo-1", meal: "Breakfast", orderNumber: "DS10284", items: "2 × Breakfast", status: "Preparing", expectedTime: "8:30 AM" },
];

export interface TripExpense {
  budget: number;
  spent: number;
  breakdown: { category: string; amount: number }[];
}

export const tripExpense: TripExpense = {
  budget: 40000,
  spent: 28500,
  breakdown: [
    { category: "Stay", amount: 14000 },
    { category: "Food", amount: 5200 },
    { category: "Transport", amount: 4300 },
    { category: "Experiences", amount: 3800 },
    { category: "Shopping", amount: 900 },
    { category: "Other", amount: 300 },
  ],
};

export interface TripNotification {
  id: string;
  message: string;
  time: string;
}

export const tripNotifications: TripNotification[] = [
  { id: "n-1", message: "Your next destination is 12 minutes away.", time: "Just now" },
  { id: "n-2", message: "Your experience starts in 30 minutes.", time: "3:00 PM" },
  { id: "n-3", message: "Your food order is being delivered.", time: "8:05 AM" },
  { id: "n-4", message: "Your cab arrives in 10 minutes.", time: "Yesterday, 11:50 AM" },
];

export interface TripActivityHistoryEntry {
  time: string;
  label: string;
}

export const tripActivityHistory: TripActivityHistoryEntry[] = [
  { time: "8:00 AM", label: "Breakfast completed" },
  { time: "10:00 AM", label: "Checked out of stay" },
  { time: "11:00 AM", label: "Arrived at Auroville Visit" },
];

export interface ItineraryStop {
  time: string;
  title: string;
  location?: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  items: ItineraryStop[];
}

export const fullItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "Aug 24",
    items: [
      { time: "9:00 AM", title: "Scooter Pickup & Orientation", location: "Auroville Visitor Centre" },
      { time: "11:00 AM", title: "Explore Auroville Township", location: "Auroville" },
      { time: "1:00 PM", title: "Lunch at Solar Kitchen", location: "Auroville" },
      { time: "4:00 PM", title: "Matrimandir Sunset Viewing", location: "Matrimandir, Auroville" },
      { time: "8:00 PM", title: "Dinner at Stay", location: "The Canopy Tiny House" },
    ],
  },
  {
    day: 2,
    date: "Aug 25",
    items: todayTimeline.map((a) => ({ time: a.time, title: a.title, location: a.location })),
  },
  {
    day: 3,
    date: "Aug 26",
    items: [
      { time: "9:00 AM", title: "Yoga", location: "The Canopy Tiny House" },
      { time: "11:00 AM", title: "Local Tour", location: "Auroville" },
      { time: "1:00 PM", title: "Lunch", location: "Auroville" },
      { time: "6:30 PM", title: "Sunset Beach Bonfire Night", location: "Auroville Beach" },
    ],
  },
  {
    day: 4,
    date: "Aug 27",
    items: [
      { time: "10:00 AM", title: "Pottery Workshop with Murugan K.", location: "Auroville Studio" },
      { time: "1:00 PM", title: "Lunch", location: "Auroville" },
      { time: "4:00 PM", title: "Free Time — Auroville Market", location: "Auroville" },
      { time: "8:00 PM", title: "Dinner", location: "The Canopy Tiny House" },
    ],
  },
  {
    day: 5,
    date: "Aug 28",
    items: [
      { time: "8:00 AM", title: "Breakfast", location: "The Canopy Tiny House" },
      { time: "10:00 AM", title: "Pack & Check-out", location: "The Canopy Tiny House" },
      { time: "11:00 AM", title: "Airport Drop", location: "Auroville → Chennai Airport" },
    ],
  },
];

export const aiPromptSuggestions: string[] = [
  "What is next?",
  "Where should I eat nearby?",
  "I'm 30 minutes late. Change my plan.",
  "Show my ticket.",
  "How do I reach my next location?",
  "What time should I leave?",
  "What is my remaining budget?",
];
