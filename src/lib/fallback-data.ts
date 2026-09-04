// ---------------------------------------------------------------------------
// Embedded content snapshot — used ONLY when the database is unreachable, so
// the public website still renders without a database (see src/lib/site-data.ts).
//
// ⚠️ Keep this in sync with prisma/seed.ts — it mirrors the same content.
// ids are set to the slug so links/keys stay stable across both modes.
// ---------------------------------------------------------------------------

import type { Destination, HolidayPackage, VisaService } from "@prisma/client";

const D = new Date("2025-01-01T00:00:00.000Z");

// The generated client types require nullable fields to be present on the
// row shape, so model them as optional here and cast at the boundary.
type FallbackVisaService = Omit<VisaService, "options" | "faq" | "image"> & {
  options?: string | null;
  faq?: string | null;
  image?: string | null;
};

// ---------- visa services ----------
const fallbackServicesBase: FallbackVisaService[] = [
  {
    id: "usa",
    slug: "usa",
    category: "USA",
    name: "USA B1/B2 Visitor Visa Assistance",
    shortName: "USA Visa",
    tagline:
      "Business (B-1), tourism (B-2) and combined B1/B2 visitor visa — application, documentation and appointment assistance.",
    description: `USA B1/B2 Visitor Visa Assistance

The B-1 visa is for business purposes and the B-2 visa is for tourism, visiting family or friends, and similar visitor purposes. Many applicants apply for the combined B1/B2 visa covering both business and tourism travel to the United States.

We assist you end to end — from profile assessment and the DS-160 form through document preparation, appointment-related assistance and interview preparation — so your application is complete and accurate before it reaches the consular authorities.

Important Disclaimer
Nadeem Tour & Travels does not guarantee visa approval or appointment availability. Visa decisions and appointment scheduling are made solely by the U.S. government and its consular authorities.`,
    features: `Visa application guidance
DS-160 assistance
Document checklist
Profile assessment
Appointment scheduling assistance
Interview preparation
Application review
Earlier appointment request guidance
Status guidance`,
    image:
      "https://images.unsplash.com/photo-1538488881038-e252a119ace7?q=80&w=1800&auto=format&fit=crop",
    order: 1,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
  {
    id: "schengen",
    slug: "schengen",
    category: "SCHENGEN",
    name: "Schengen Visa Assistance",
    shortName: "Schengen Visa",
    tagline:
      "Tourist, business and family visit visas for 27 Schengen countries — with full documentation and application assistance.",
    description: `Schengen Visa Assistance

A Schengen visa allows travel within the 27 Schengen Area countries for up to 90 days in any 180-day period. Applications must be submitted according to the rules of the Schengen country that is your main destination.

Typical requirements include a completed application form, valid travel document, photograph, biometrics where applicable, visa fee and supporting documents such as travel itinerary, accommodation proof, travel insurance and financial evidence.

Important Disclaimer
Visa applications must be submitted according to the applicable rules of the competent Schengen country. Nadeem Tour & Travels provides travel and application assistance and does not influence visa decisions.`,
    features: `Tourist Visa
Business Visa
Family Visit
Multiple Entry Guidance
Documentation Assistance
Application Assistance`,
    options: `France
Switzerland
Italy
Germany
Netherlands
Greece
Spain
Austria
Belgium
Other Schengen destinations`,
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1800&auto=format&fit=crop",
    order: 2,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
  {
    id: "dubai",
    slug: "dubai",
    category: "DUBAI",
    name: "Dubai / UAE Visa Assistance",
    shortName: "Dubai Visa",
    tagline:
      "Tourist and visit visas for Dubai & the UAE — durations and eligibility change, so we keep current details in our system.",
    description: `Dubai / UAE Visa Assistance

We assist with tourist and visit visas for Dubai and the UAE. Popular visa durations include 14 days, 30 days and 60 days, and visas are available for tourism as well as visiting family or friends in the UAE.

Visa durations, fees and rules are set by the UAE authorities and change from time to time. Our team keeps the current options in our system so you always receive up-to-date information and guidance.`,
    features: `14 Days Tourist Visa
30 Days Tourist Visa
60 Days Tourist Visa
Visit Visa
Family Travel Assistance
Documentation Assistance`,
    options: `14 Days — Tourist
30 Days — Tourist
60 Days — Tourist
Visit Visa
Family Visit Assistance`,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1800&auto=format&fit=crop",
    order: 3,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
  {
    id: "saudi-arabia",
    slug: "saudi-arabia",
    category: "SAUDI",
    name: "Saudi Arabia Visa Services",
    shortName: "Saudi Visa",
    tagline:
      "Tourist, visit and business travel assistance for Saudi Arabia — documentation, flights and hotels.",
    description: `Saudi Arabia Visa Services

Saudi Arabia welcomes international visitors with tourist, visit and business travel options. We assist with the right visa category for your purpose of travel, plus flight and hotel arrangements.

Umrah travel is handled separately — see our Umrah Packages section for economy, premium, family and group options.`,
    features: `Tourist Visa
Visit Visa
Business Travel Assistance
Family Visit Assistance
Travel Documentation
Flight + Hotel Assistance`,
    image:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1800&auto=format&fit=crop",
    order: 4,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
  {
    id: "uk",
    slug: "uk",
    category: "UK",
    name: "UK Visa Assistance",
    shortName: "UK Visa",
    tagline: "Visit, business and family visit visa application assistance for the United Kingdom.",
    description: `UK Visa Assistance

We provide application and documentation assistance for UK visitor, business and family visit visas, including online application guidance and supporting document preparation. Decisions are made solely by UK Visas and Immigration.`,
    features: `Application and documentation guidance
Eligibility assessment
Appointment-related assistance where applicable
Travel documentation support
Flight + Hotel assistance`,
    order: 5,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
  {
    id: "canada",
    slug: "canada",
    category: "CANADA",
    name: "Canada Visa Assistance",
    shortName: "Canada Visa",
    tagline: "Visitor visa and documentation assistance for Canada.",
    description: `Canada Visa Assistance

We assist with Canada visitor visa applications — profile review, document preparation and application guidance. Decisions are made solely by Immigration, Refugees and Citizenship Canada (IRCC).`,
    features: `Application and documentation guidance
Eligibility assessment
Appointment-related assistance where applicable
Travel documentation support
Flight + Hotel assistance`,
    order: 6,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
  {
    id: "turkey",
    slug: "turkey",
    category: "TURKEY",
    name: "Turkey Visa Assistance",
    shortName: "Turkey Visa",
    tagline: "Tourist visa and travel assistance for Turkey.",
    description: `Turkey Visa Assistance

We help with Turkey tourist e-visa and sticker visa applications — eligibility checking, documentation and submission guidance — plus flight and hotel arrangements for your Turkey trip.`,
    features: `Application and documentation guidance
Eligibility assessment
Appointment-related assistance where applicable
Travel documentation support
Flight + Hotel assistance`,
    order: 7,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
  {
    id: "other-countries",
    slug: "other-countries",
    category: "OTHER",
    name: "Other Countries Visa Assistance",
    shortName: "Other Visas",
    tagline: "Australia, Singapore, Malaysia, Thailand, Maldives and more — we assist globally.",
    description: `Other Countries Visa Assistance

Planning to travel beyond the destinations above? We provide application and documentation assistance for visas to Australia, Singapore, Malaysia, Thailand, the Maldives and many other countries.`,
    features: `Australia
Singapore
Malaysia
Thailand
Maldives
Other destinations on request`,
    order: 8,
    isActive: true,
    createdAt: D,
    updatedAt: D,
  },
];

export const fallbackServices: VisaService[] = fallbackServicesBase as VisaService[];

// ---------- destinations ----------
const baseDestinations: Destination[] = [
  { id: "dubai", slug: "dubai", name: "Dubai", country: "Dubai", description: "Glittering skyline, desert safaris and world-class shopping.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop", order: 1, isActive: true, createdAt: D },
  { id: "abu-dhabi", slug: "abu-dhabi", name: "Abu Dhabi", country: "Abu Dhabi", description: "Grand mosques, cultural landmarks and luxury stays.", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600&auto=format&fit=crop", order: 2, isActive: true, createdAt: D },
  { id: "saudi-arabia", slug: "saudi-arabia", name: "Saudi Arabia", country: "Saudi Arabia", description: "Historic sites, modern cities and spiritual journeys.", image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1600&auto=format&fit=crop", order: 3, isActive: true, createdAt: D },
  { id: "turkey", slug: "turkey", name: "Turkey", country: "Turkey", description: "Istanbul's bazaars, Cappadocia's balloons and Aegean coasts.", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1600&auto=format&fit=crop", order: 4, isActive: true, createdAt: D },
  { id: "france", slug: "france", name: "France", country: "France", description: "Parisian elegance, Riviera glamour and wine country.", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop", order: 5, isActive: true, createdAt: D },
  { id: "switzerland", slug: "switzerland", name: "Switzerland", country: "Switzerland", description: "Alpine trains, lakeside towns and year-round beauty.", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1600&auto=format&fit=crop", order: 6, isActive: true, createdAt: D },
  { id: "italy", slug: "italy", name: "Italy", country: "Italy", description: "Rome, Florence and Venice — art, history and cuisine.", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1600&auto=format&fit=crop", order: 7, isActive: true, createdAt: D },
  { id: "uk", slug: "uk", name: "United Kingdom", country: "United Kingdom", description: "London landmarks, countrysides and royal heritage.", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop", order: 8, isActive: true, createdAt: D },
  { id: "usa", slug: "usa", name: "United States of America", country: "United States of America", description: "New York, California and iconic American road trips.", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop", order: 9, isActive: true, createdAt: D },
  { id: "canada", slug: "canada", name: "Canada", country: "Canada", description: "Toronto, Vancouver, Niagara and the Rockies.", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1600&auto=format&fit=crop", order: 10, isActive: true, createdAt: D },
  { id: "maldives", slug: "maldives", name: "Maldives", country: "Maldives", description: "Overwater villas and coral-blue lagoons.", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600&auto=format&fit=crop", order: 11, isActive: true, createdAt: D },
  { id: "thailand", slug: "thailand", name: "Thailand", country: "Thailand", description: "Bangkok's energy and Phuket's beaches.", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1600&auto=format&fit=crop", order: 12, isActive: true, createdAt: D },
  { id: "malaysia", slug: "malaysia", name: "Malaysia", country: "Malaysia", description: "Kuala Lumpur, Penang and island escapes.", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600&auto=format&fit=crop", order: 13, isActive: true, createdAt: D },
  { id: "singapore", slug: "singapore", name: "Singapore", country: "Singapore", description: "A futuristic city-state with gardens and hawker food.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop", order: 14, isActive: true, createdAt: D },
  { id: "australia", slug: "australia", name: "Australia", country: "Australia", description: "Sydney, the Great Barrier Reef and outback adventures.", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop", order: 15, isActive: true, createdAt: D },
];

export type FallbackDestination = Destination & { packages: HolidayPackage[] };
export type FallbackPackage = HolidayPackage & { destination: Destination | null };

// ---------- holiday packages ----------
const basePackages: (HolidayPackage & { destinationSlug: string | null })[] = [
  { id: "dubai-classic", slug: "dubai-classic", name: "Dubai Classic", destinationId: "dubai", destinationSlug: "dubai", durationLabel: "3N / 4D", priceFrom: "₹32,999", includes: "Hotel stay\nTransfers\nCity tour & sightseeing\nDesert safari options\nVisa assistance", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop", order: 1, popular: true, isActive: true, createdAt: D },
  { id: "turkey-delight", slug: "turkey-delight", name: "Turkey Delight", destinationId: "turkey", destinationSlug: "turkey", durationLabel: "6N / 7D", priceFrom: "₹1,19,999", includes: "Istanbul + Cappadocia\nHotels with breakfast\nDomestic flights within Turkey\nGuided tours\nTransfers\nVisa assistance", image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1600&auto=format&fit=crop", order: 2, popular: true, isActive: true, createdAt: D },
  { id: "maldives-resort", slug: "maldives-resort", name: "Maldives Resort Escape", destinationId: "maldives", destinationSlug: "maldives", durationLabel: "3N / 4D", priceFrom: "₹84,999", includes: "Resort stay\nSeaplane / speedboat transfers\nDaily breakfast\nVisa on arrival assistance", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600&auto=format&fit=crop", order: 3, popular: true, isActive: true, createdAt: D },
  { id: "thailand-bangkok-phuket", slug: "thailand-bangkok-phuket", name: "Thailand — Bangkok & Phuket", destinationId: "thailand", destinationSlug: "thailand", durationLabel: "5N / 6D", priceFrom: "₹54,999", includes: "Bangkok + Phuket\nHotels with breakfast\nIsland tour\nTransfers\nVisa assistance", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1600&auto=format&fit=crop", order: 4, popular: true, isActive: true, createdAt: D },
  { id: "europe-customized", slug: "europe-customized", name: "Customized Europe Tours", destinationId: "switzerland", destinationSlug: "switzerland", durationLabel: "Tailor-made", priceFrom: "On request", includes: "France, Switzerland, Italy & more\nCustom itinerary\nHotels, transfers & tours\nSchengen visa assistance", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1600&auto=format&fit=crop", order: 5, popular: false, isActive: true, createdAt: D },
];

export const fallbackPackages: FallbackPackage[] = basePackages.map((p) => ({
  ...p,
  destination: baseDestinations.find((d) => d.slug === p.destinationSlug) ?? null,
}));

export const fallbackDestinations: FallbackDestination[] = baseDestinations.map((d) => ({
  ...d,
  packages: fallbackPackages.filter((p) => p.destinationId === d.id),
}));