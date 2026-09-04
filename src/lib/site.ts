export const site = {
  name: "NADEEM TOUR & TRAVELS",
  tagline: "Your Journey. Our Expertise.",
  phoneDisplay: "+91 83848 41986",
  phoneRaw: "+918384841986",
  whatsappNumber: "918384841986", // digits only for wa.me
  email: "info.nadeemtourandtravels@gmail.com",
};

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const waGeneral = waLink(
  `Hello ${site.name}, I would like assistance with travel planning.`
);

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/visa-services", label: "Visa Services" },
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/holiday-packages", label: "Holiday Packages" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const leadStatuses = [
  "New",
  "Contacted",
  "Documents Pending",
  "Processing",
  "Submitted",
  "Completed",
  "Closed",
] as const;

export const visaServiceChips = [
  "USA",
  "Schengen",
  "Dubai",
  "Saudi Arabia",
  "UK",
  "Canada",
  "Turkey",
  "Other Countries",
] as const;

/** Split a newline-separated DB string into an array. */
export function splitLines(s?: string | null): string[] {
  if (!s) return [];
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Split description paragraphs (blank-line separated). */
export function splitParagraphs(s?: string | null): string[] {
  if (!s) return [];
  return s
    .split(/\n\s*\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}
