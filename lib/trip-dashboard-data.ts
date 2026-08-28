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
  guests?: number;
  paymentStatus?: string;
  cancellationPolicy?: string;
}

export const tripBookings: TripBooking[] = [
  { id: "DHY-773412", category: "Stay", title: stayProperty.name, date: "Aug 23", time: "2:00 PM", location: "Auroville, Tamil Nadu", status: "Confirmed", hasTicket: true, contactPhone: "+91 98765 43210", directionsHref: directionsUrl("The Canopy Tiny House, Auroville"), guests: 2, paymentStatus: "Paid in full", cancellationPolicy: "Free cancellation until 48 hours before check-in" },
  { id: "DHY-118820", category: "Experience", title: "Matrimandir Visitor Centre Pass", date: "Aug 25", time: "3:30 PM", location: "Matrimandir, Auroville", status: "Confirmed", hasTicket: true, directionsHref: directionsUrl("Matrimandir, Auroville"), guests: 2, paymentStatus: "Paid in full", cancellationPolicy: "Non-refundable within 24 hours of the slot" },
  { id: "DHY-556291", category: "Experience", title: "Photography Experience", date: "Aug 25", time: "5:00 PM", location: "Auroville", status: "Confirmed", hasTicket: true, guests: 2, paymentStatus: "Paid in full", cancellationPolicy: "Free cancellation until 24 hours before" },
  { id: "DHY-902341", category: "Bike Rental", title: "Scooter Rental — 2 days", date: "Aug 24", time: "9:00 AM", location: "Auroville Visitor Centre", status: "In Progress", contactPhone: "+91 90000 11122", guests: 1, paymentStatus: "Paid in full", cancellationPolicy: "Non-refundable once picked up" },
  { id: "DHY-347710", category: "Food Order", title: "Auroville Breakfast Basket", date: "Aug 25", time: "8:00 AM", location: "Delivered to stay", status: "Completed", guests: 2, paymentStatus: "Paid in full", cancellationPolicy: "Non-refundable after preparation begins" },
  { id: "DHY-229981", category: "Cab", title: "Airport Pickup Cab", date: "Aug 23", time: "11:00 AM", location: "Chennai Airport → Auroville", status: "Completed", contactPhone: "+91 90000 33344", guests: 2, paymentStatus: "Paid in full", cancellationPolicy: "Free cancellation until 1 hour before pickup" },
  { id: "DHY-664501", category: "Event", title: "Sunset Beach Bonfire Night", date: "Aug 26", time: "6:30 PM", location: "Auroville Beach", status: "Pending", directionsHref: directionsUrl("Auroville Beach"), guests: 2, paymentStatus: "Pay at venue", cancellationPolicy: "Free cancellation until 6 hours before" },
  { id: "DHY-810023", category: "Workshop", title: "Pottery Workshop with Murugan K.", date: "Aug 27", time: "10:00 AM", location: "Auroville Studio", status: "Confirmed", hasTicket: true, guests: 2, paymentStatus: "Paid in full", cancellationPolicy: "Free cancellation until 24 hours before" },
];

export interface TripExperience {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  meetingPoint: string;
  responsiblePerson: string;
  contactPhone: string;
  description: string;
  whatToBring: string[];
  included: string[];
  notIncluded: string[];
  hasTicket: boolean;
  status: BookingStatus;
}

export const tripExperiences: TripExperience[] = [
  {
    id: "DHY-118820",
    title: "Matrimandir Visitor Centre Pass",
    date: "Aug 25",
    time: "3:30 PM",
    duration: "1.5 hours",
    location: "Matrimandir, Auroville",
    meetingPoint: "Matrimandir Visitor Centre reception",
    responsiblePerson: "Arun (Local Guide)",
    contactPhone: "+91 91234 56780",
    description: "A guided visit to the Matrimandir viewpoint and the surrounding Auroville township, with context on its history and design.",
    whatToBring: ["Valid photo ID", "Comfortable walking shoes"],
    included: ["Guided walkthrough", "Viewpoint access pass"],
    notIncluded: ["Transport to the centre", "Inner chamber access"],
    hasTicket: true,
    status: "Confirmed",
  },
  {
    id: "DHY-556291",
    title: "Photography Experience",
    date: "Aug 25",
    time: "5:00 PM",
    duration: "2 hours",
    location: "Auroville",
    meetingPoint: "The Canopy Tiny House, main gate",
    responsiblePerson: "Karthik Iyer (Experience Host)",
    contactPhone: "+91 90000 55678",
    description: "A golden-hour photo walk through Auroville's forest trails and township landmarks with a local photographer.",
    whatToBring: ["Your own camera or phone", "Water bottle"],
    included: ["Photographer-guide", "Edited digital shots (10)"],
    notIncluded: ["Prints", "Drone shots"],
    hasTicket: true,
    status: "Confirmed",
  },
  {
    id: "DHY-810023",
    title: "Pottery Workshop with Murugan K.",
    date: "Aug 27",
    time: "10:00 AM",
    duration: "2 hours",
    location: "Auroville Studio",
    meetingPoint: "Auroville Studio, Kuilapalayam",
    responsiblePerson: "Murugan K. (Workshop Host)",
    contactPhone: "+91 90000 77812",
    description: "Hands-on terracotta pottery session on the wheel, finishing with a piece you take home.",
    whatToBring: ["Clothes you don't mind getting clay on"],
    included: ["Materials", "Firing & take-home piece", "Refreshments"],
    notIncluded: ["Shipping for fragile pieces"],
    hasTicket: true,
    status: "Confirmed",
  },
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
  pickupTime?: string;
  driverName?: string;
  status?: "Confirmed" | "In Progress" | "Completed";
}

export const transportContacts: TransportContact[] = [
  { type: "Bike", provider: "GreenWheels Auroville", vehicle: "Honda Activa · TN 33 AB 1234", bookingId: "DHY-902341", phone: "+91 90000 11122", pickupLocation: "Auroville Visitor Centre", pickupTime: "9:00 AM", driverName: "Selvam R.", status: "In Progress" },
  { type: "Cab", provider: "Dhyana Cabs", vehicle: "Toyota Etios · TN 07 CD 5678", bookingId: "DHY-229981", phone: "+91 90000 33344", pickupLocation: "Stay entrance", pickupTime: "11:00 AM", driverName: "Kumar S.", status: "Completed" },
];

export interface SupportContact {
  name: string;
  phone: string;
  avatar?: string;
}

export const supportContact: SupportContact = {
  name: "Dhyana Trip Support",
  phone: "+91 1800 202 4040",
};

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

export interface PlannedMeal {
  id: string;
  meal: "Breakfast" | "Lunch" | "Dinner";
  time: string;
  restaurant: string;
  items: string;
  status: "Delivered" | "Reserved" | "Preparing";
  location: string;
}

export const dailyMeals: PlannedMeal[] = [
  { id: "meal-1", meal: "Breakfast", time: "8:00 AM", restaurant: "The Canopy Tiny House", items: "2 × Breakfast basket", status: "Delivered", location: "Delivered to stay" },
  { id: "meal-2", meal: "Lunch", time: "1:30 PM", restaurant: "Solar Kitchen", items: "Curated thali for 2", status: "Reserved", location: "Auroville" },
  { id: "meal-3", meal: "Dinner", time: "7:30 PM", restaurant: "Naturellement, Auroville", items: "Traditional Pondicherry Dinner for 2", status: "Reserved", location: "Naturellement, Auroville" },
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
  status?: ActivityStatus;
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
      { time: "9:00 AM", title: "Scooter Pickup & Orientation", location: "Auroville Visitor Centre", status: "completed" },
      { time: "11:00 AM", title: "Explore Auroville Township", location: "Auroville", status: "completed" },
      { time: "1:00 PM", title: "Lunch at Solar Kitchen", location: "Auroville", status: "completed" },
      { time: "4:00 PM", title: "Matrimandir Sunset Viewing", location: "Matrimandir, Auroville", status: "completed" },
      { time: "8:00 PM", title: "Dinner at Stay", location: "The Canopy Tiny House", status: "completed" },
    ],
  },
  {
    day: 2,
    date: "Aug 25",
    items: todayTimeline.map((a) => ({ time: a.time, title: a.title, location: a.location, status: a.status })),
  },
  {
    day: 3,
    date: "Aug 26",
    items: [
      { time: "9:00 AM", title: "Yoga", location: "The Canopy Tiny House", status: "upcoming" },
      { time: "11:00 AM", title: "Local Tour", location: "Auroville", status: "upcoming" },
      { time: "1:00 PM", title: "Lunch", location: "Auroville", status: "upcoming" },
      { time: "6:30 PM", title: "Sunset Beach Bonfire Night", location: "Auroville Beach", status: "upcoming" },
    ],
  },
  {
    day: 4,
    date: "Aug 27",
    items: [
      { time: "10:00 AM", title: "Pottery Workshop with Murugan K.", location: "Auroville Studio", status: "upcoming" },
      { time: "1:00 PM", title: "Lunch", location: "Auroville", status: "upcoming" },
      { time: "4:00 PM", title: "Free Time — Auroville Market", location: "Auroville", status: "upcoming" },
      { time: "8:00 PM", title: "Dinner", location: "The Canopy Tiny House", status: "upcoming" },
    ],
  },
  {
    day: 5,
    date: "Aug 28",
    items: [
      { time: "8:00 AM", title: "Breakfast", location: "The Canopy Tiny House", status: "upcoming" },
      { time: "10:00 AM", title: "Pack & Check-out", location: "The Canopy Tiny House", status: "upcoming" },
      { time: "11:00 AM", title: "Airport Drop", location: "Auroville → Chennai Airport", status: "upcoming" },
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
