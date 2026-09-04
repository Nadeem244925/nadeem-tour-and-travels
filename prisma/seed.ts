import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@nadeemtours.in";
const ADMIN_PASSWORD = "Admin@12345"; // ⚠️ change after first login

// ---------- helpers ----------
const lines = (s: string) => s.trim();

async function upsertService(data: {
  slug: string;
  category: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  features: string;
  options?: string;
  image?: string;
  order: number;
}) {
  await prisma.visaService.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  });
}

async function upsertDestination(data: {
  slug: string;
  name: string;
  country?: string;
  description?: string;
  image?: string | null;
  order: number;
}) {
  await prisma.destination.upsert({ where: { slug: data.slug }, update: data, create: data });
}

async function upsertPackage(data: {
  slug: string;
  name: string;
  destinationId?: string;
  durationLabel?: string;
  priceFrom?: string;
  includes?: string;
  image?: string | null;
  order: number;
  popular?: boolean;
}) {
  await prisma.holidayPackage.upsert({ where: { slug: data.slug }, update: data, create: data });
}

// ---------- admin user ----------
async function seedAdmin() {
  const email = ADMIN_EMAIL;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: {
        name: "Nadeem Fahad",
        email,
        passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
        role: "ADMIN",
      },
    });
    console.log(`✔ Admin created → ${email} / ${ADMIN_PASSWORD}`);
  } else {
    console.log(`✔ Admin already exists → ${email}`);
  }
}

// ---------- visa services ----------
async function seedVisaServices() {
  const usaImage =
    "https://images.unsplash.com/photo-1538488881038-e252a119ace7?q=80&w=1800&auto=format&fit=crop";
  const euImage =
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1800&auto=format&fit=crop";
  const dubaiImage =
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1800&auto=format&fit=crop";
  const saudiImage =
    "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1800&auto=format&fit=crop";

  await upsertService({
    slug: "usa",
    category: "USA",
    name: "USA B1/B2 Visitor Visa Assistance",
    shortName: "USA Visa",
    tagline:
      "Business (B-1), tourism (B-2) and combined B1/B2 visitor visa — application, documentation and appointment assistance.",
    description: lines(`
USA B1/B2 Visitor Visa Assistance

The B-1 visa is for business purposes and the B-2 visa is for tourism, visiting family or friends, and similar visitor purposes. Many applicants apply for the combined B1/B2 visa covering both business and tourism travel to the United States.

We assist you end to end — from profile assessment and the DS-160 form through document preparation, appointment-related assistance and interview preparation — so your application is complete and accurate before it reaches the consular authorities.

Important Disclaimer
Nadeem Tour & Travels does not guarantee visa approval or appointment availability. Visa decisions and appointment scheduling are made solely by the U.S. government and its consular authorities.
`),
    features: lines(`
Visa application guidance
DS-160 assistance
Document checklist
Profile assessment
Appointment scheduling assistance
Interview preparation
Application review
Earlier appointment request guidance
Status guidance
`),
    image: usaImage,
    order: 1,
  });

  await upsertService({
    slug: "schengen",
    category: "SCHENGEN",
    name: "Schengen Visa Assistance",
    shortName: "Schengen Visa",
    tagline:
      "Tourist, business and family visit visas for 27 Schengen countries — with full documentation and application assistance.",
    description: lines(`
Schengen Visa Assistance

A Schengen visa allows travel within the 27 Schengen Area countries for up to 90 days in any 180-day period. Applications must be submitted according to the rules of the Schengen country that is your main destination.

Typical requirements include a completed application form, valid travel document, photograph, biometrics where applicable, visa fee and supporting documents such as travel itinerary, accommodation proof, travel insurance and financial evidence.

Important Disclaimer
Visa applications must be submitted according to the applicable rules of the competent Schengen country. Nadeem Tour & Travels provides travel and application assistance and does not influence visa decisions.
`),
    features: lines(`
Tourist Visa
Business Visa
Family Visit
Multiple Entry Guidance
Documentation Assistance
Application Assistance
`),
    options: lines(`
France
Switzerland
Italy
Germany
Netherlands
Greece
Spain
Austria
Belgium
Other Schengen destinations
`),
    image: euImage,
    order: 2,
  });

  await upsertService({
    slug: "dubai",
    category: "DUBAI",
    name: "Dubai / UAE Visa Assistance",
    shortName: "Dubai Visa",
    tagline:
      "Tourist and visit visas for Dubai & the UAE — durations and eligibility change, so we keep current details in our system.",
    description: lines(`
Dubai / UAE Visa Assistance

We assist with tourist and visit visas for Dubai and the UAE. Popular visa durations include 14 days, 30 days and 60 days, and visas are available for tourism as well as visiting family or friends in the UAE.

Visa durations, fees and rules are set by the UAE authorities and change from time to time. Our team keeps the current options in our system so you always receive up-to-date information and guidance.
`),
    features: lines(`
14 Days Tourist Visa
30 Days Tourist Visa
60 Days Tourist Visa
Visit Visa
Family Travel Assistance
Documentation Assistance
`),
    options: lines(`
14 Days — Tourist
30 Days — Tourist
60 Days — Tourist
Visit Visa
Family Visit Assistance
`),
    image: dubaiImage,
    order: 3,
  });

  await upsertService({
    slug: "saudi-arabia",
    category: "SAUDI",
    name: "Saudi Arabia Visa Services",
    shortName: "Saudi Visa",
    tagline:
      "Tourist, visit and business travel assistance for Saudi Arabia — documentation, flights and hotels.",
    description: lines(`
Saudi Arabia Visa Services

Saudi Arabia welcomes international visitors with tourist, visit and business travel options. We assist with the right visa category for your purpose of travel, plus flight and hotel arrangements.

Umrah travel is handled separately — see our Umrah Packages section for economy, premium, family and group options.
`),
    features: lines(`
Tourist Visa
Visit Visa
Business Travel Assistance
Family Visit Assistance
Travel Documentation
Flight + Hotel Assistance
`),
    image: saudiImage,
    order: 4,
  });

  const generic = `
Application and documentation guidance
Eligibility assessment
Appointment-related assistance where applicable
Travel documentation support
Flight + Hotel assistance`;

  await upsertService({
    slug: "uk",
    category: "UK",
    name: "UK Visa Assistance",
    shortName: "UK Visa",
    tagline: "Visit, business and family visit visa application assistance for the United Kingdom.",
    description: lines(`
UK Visa Assistance

We provide application and documentation assistance for UK visitor, business and family visit visas, including online application guidance and supporting document preparation. Decisions are made solely by UK Visas and Immigration.
`),
    features: lines(generic),
    order: 5,
  });

  await upsertService({
    slug: "canada",
    category: "CANADA",
    name: "Canada Visa Assistance",
    shortName: "Canada Visa",
    tagline: "Visitor visa and documentation assistance for Canada.",
    description: lines(`
Canada Visa Assistance

We assist with Canada visitor visa applications — profile review, document preparation and application guidance. Decisions are made solely by Immigration, Refugees and Citizenship Canada (IRCC).
`),
    features: lines(generic),
    order: 6,
  });

  await upsertService({
    slug: "turkey",
    category: "TURKEY",
    name: "Turkey Visa Assistance",
    shortName: "Turkey Visa",
    tagline: "Tourist visa and travel assistance for Turkey.",
    description: lines(`
Turkey Visa Assistance

We help with Turkey tourist e-visa and sticker visa applications — eligibility checking, documentation and submission guidance — plus flight and hotel arrangements for your Turkey trip.
`),
    features: lines(generic),
    order: 7,
  });

  await upsertService({
    slug: "other-countries",
    category: "OTHER",
    name: "Other Countries Visa Assistance",
    shortName: "Other Visas",
    tagline: "Australia, Singapore, Malaysia, Thailand, Maldives and more — we assist globally.",
    description: lines(`
Other Countries Visa Assistance

Planning to travel beyond the destinations above? We provide application and documentation assistance for visas to Australia, Singapore, Malaysia, Thailand, the Maldives and many other countries.
`),
    features: lines(`
Australia
Singapore
Malaysia
Thailand
Maldives
Other destinations on request
`),
    order: 8,
  });
}

// ---------- destinations ----------
async function seedDestinations() {
  const list: Array<[string, string, string, string, number]> = [
    ["dubai", "Dubai", "Glittering skyline, desert safaris and world-class shopping.", "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop", 1],
    ["abu-dhabi", "Abu Dhabi", "Grand mosques, cultural landmarks and luxury stays.", "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600&auto=format&fit=crop", 2],
    ["saudi-arabia", "Saudi Arabia", "Historic sites, modern cities and spiritual journeys.", "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1600&auto=format&fit=crop", 3],
    ["turkey", "Turkey", "Istanbul's bazaars, Cappadocia's balloons and Aegean coasts.", "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1600&auto=format&fit=crop", 4],
    ["france", "France", "Parisian elegance, Riviera glamour and wine country.", "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop", 5],
    ["switzerland", "Switzerland", "Alpine trains, lakeside towns and year-round beauty.", "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1600&auto=format&fit=crop", 6],
    ["italy", "Italy", "Rome, Florence and Venice — art, history and cuisine.", "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1600&auto=format&fit=crop", 7],
    ["uk", "United Kingdom", "London landmarks, countrysides and royal heritage.", "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop", 8],
    ["usa", "United States of America", "New York, California and iconic American road trips.", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop", 9],
    ["canada", "Canada", "Toronto, Vancouver, Niagara and the Rockies.", "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1600&auto=format&fit=crop", 10],
    ["maldives", "Maldives", "Overwater villas and coral-blue lagoons.", "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1600&auto=format&fit=crop", 11],
    ["thailand", "Thailand", "Bangkok's energy and Phuket's beaches.", "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1600&auto=format&fit=crop", 12],
    ["malaysia", "Malaysia", "Kuala Lumpur, Penang and island escapes.", "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600&auto=format&fit=crop", 13],
    ["singapore", "Singapore", "A futuristic city-state with gardens and hawker food.", "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop", 14],
    ["australia", "Australia", "Sydney, the Great Barrier Reef and outback adventures.", "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop", 15],
  ];
  for (const [slug, name, description, image, order] of list) {
    await upsertDestination({ slug, name, country: name, description, image, order });
  }
}

// ---------- holiday packages ----------
async function seedPackages() {
  const dubai = await prisma.destination.findUnique({ where: { slug: "dubai" } });
  const turkey = await prisma.destination.findUnique({ where: { slug: "turkey" } });
  const maldives = await prisma.destination.findUnique({ where: { slug: "maldives" } });
  const thailand = await prisma.destination.findUnique({ where: { slug: "thailand" } });
  const europe = await prisma.destination.findUnique({ where: { slug: "switzerland" } });

  await upsertPackage({
    slug: "dubai-classic",
    name: "Dubai Classic",
    destinationId: dubai?.id,
    durationLabel: "3N / 4D",
    priceFrom: "₹32,999",
    includes: lines(`Hotel stay
Transfers
City tour & sightseeing
Desert safari options
Visa assistance`),
    popular: true,
    image: dubai?.image,
    order: 1,
  });
  await upsertPackage({
    slug: "turkey-delight",
    name: "Turkey Delight",
    destinationId: turkey?.id,
    durationLabel: "6N / 7D",
    priceFrom: "₹1,19,999",
    includes: lines(`Istanbul + Cappadocia
Hotels with breakfast
Domestic flights within Turkey
Guided tours
Transfers
Visa assistance`),
    popular: true,
    image: turkey?.image,
    order: 2,
  });
  await upsertPackage({
    slug: "maldives-resort",
    name: "Maldives Resort Escape",
    destinationId: maldives?.id,
    durationLabel: "3N / 4D",
    priceFrom: "₹84,999",
    includes: lines(`Resort stay
Seaplane / speedboat transfers
Daily breakfast
Visa on arrival assistance`),
    popular: true,
    image: maldives?.image,
    order: 3,
  });
  await upsertPackage({
    slug: "thailand-bangkok-phuket",
    name: "Thailand — Bangkok & Phuket",
    destinationId: thailand?.id,
    durationLabel: "5N / 6D",
    priceFrom: "₹54,999",
    includes: lines(`Bangkok + Phuket
Hotels with breakfast
Island tour
Transfers
Visa assistance`),
    popular: true,
    image: thailand?.image,
    order: 4,
  });
  await upsertPackage({
    slug: "europe-customized",
    name: "Customized Europe Tours",
    destinationId: europe?.id,
    durationLabel: "Tailor-made",
    priceFrom: "On request",
    includes: lines(`France, Switzerland, Italy & more
Custom itinerary
Hotels, transfers & tours
Schengen visa assistance`),
    image: europe?.image,
    order: 5,
  });
}

// ---------- sample leads (so the admin dashboard demos nicely) ----------
async function seedSampleLeads() {
  const count = await prisma.lead.count();
  if (count > 0) return;
  const base = 10000;
  const samples = [
    { name: "Rahul Sharma", mobile: "9812345678", email: "rahul.sharma@example.com", service: "USA Visa", destination: "USA", daysAgo: 0 },
    { name: "Priya Patel", mobile: "9876543210", email: "priya.p@example.com", service: "Schengen Visa", destination: "Switzerland", daysAgo: 0 },
    { name: "Amit Verma", mobile: "9123456789", email: "amit.verma@example.com", service: "Dubai Visa", destination: "Dubai", daysAgo: 0 },
    { name: "Sneha Iyer", mobile: "9988776655", email: "sneha.iyer@example.com", service: "Holiday Package", destination: "Turkey", daysAgo: 1 },
    { name: "Mohd Arif", mobile: "9765432109", email: "arif.m@example.com", service: "Flight Booking", destination: "Maldives", daysAgo: 2 },
  ];
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    await prisma.lead.create({
      data: {
        leadNo: `NT-${base + i + 1}`,
        name: s.name,
        mobile: s.mobile,
        email: s.email,
        service: s.service,
        destination: s.destination,
        travelDate: new Date(Date.now() - s.daysAgo * 86400000),
        status: s.daysAgo === 0 ? "New" : "Contacted",
        source: "Website",
      },
    });
  }
  console.log("✔ Seeded 5 sample leads");
}

// ---------- run ----------
async function main() {
  await seedAdmin();
  await seedVisaServices();
  await seedDestinations();
  await seedPackages();
  await seedSampleLeads();
  console.log("✔ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
