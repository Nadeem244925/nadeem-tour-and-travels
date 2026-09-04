export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const VISA_CATEGORIES = [
  "USA",
  "SCHENGEN",
  "DUBAI",
  "SAUDI",
  "UK",
  "CANADA",
  "TURKEY",
  "OTHER",
] as const;
