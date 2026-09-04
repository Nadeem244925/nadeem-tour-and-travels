"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify, VISA_CATEGORIES } from "@/lib/content";

// ---------------------------------------------------------------------------
// Helpers (module-private — "use server" files may only export async fns)
// ---------------------------------------------------------------------------

const clean = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const cleanOpt = (v: FormDataEntryValue | null) => {
  const s = clean(v);
  return s === "" ? null : s;
};

async function uniqueSlug(
  base: string,
  table: "visaService" | "destination" | "holidayPackage",
  excludeId?: string
): Promise<string> {
  const probe = async (slug: string) => {
    if (table === "visaService")
      return prisma.visaService.findFirst({ where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) } });
    if (table === "destination")
      return prisma.destination.findFirst({ where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) } });
    return prisma.holidayPackage.findFirst({ where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) } });
  };
  if (!(await probe(base))) return base;
  for (let i = 2; i < 100; i++) {
    const candidate = `${base}-${i}`;
    if (!(await probe(candidate))) return candidate;
  }
  return `${base}-${Date.now()}`;
}

function requireName(name: string, slugBase: string) {
  if (name.length < 2) throw new Error("Name is required.");
  const base = slugBase || slugify(name);
  if (!base) throw new Error("Could not create a slug from the name.");
  return base;
}

function requireImage(image: string) {
  if (!/^https?:\/\/\S+$/.test(image)) {
    throw new Error("A valid image URL (https://…) is required — use an Unsplash or CDN link.");
  }
}

// ---------------------------------------------------------------------------
// Visa services
// ---------------------------------------------------------------------------

export async function upsertVisaServiceAction(fd: FormData) {
  const id = clean(fd.get("id"));
  const name = clean(fd.get("name"));
  const slugField = clean(fd.get("slug"));
  const shortName = clean(fd.get("shortName"));
  const category = clean(fd.get("category"));
  const tagline = cleanOpt(fd.get("tagline"));
  const description = cleanOpt(fd.get("description"));
  const features = cleanOpt(fd.get("features"));
  const options = cleanOpt(fd.get("options"));
  const image = clean(fd.get("image"));
  const order = Number(clean(fd.get("order")) || 0);
  const isActive = clean(fd.get("isActive")) === "on";

  if (!(VISA_CATEGORIES as readonly string[]).includes(category)) {
    throw new Error("Please pick a valid category.");
  }
  requireImage(image);
  if (shortName.length < 2) throw new Error("Short name (menu label) is required.");

  const data = {
    name,
    shortName,
    category,
    tagline,
    description,
    features,
    options,
    image,
    order: Number.isFinite(order) ? order : 0,
    isActive,
  };

  if (id) {
    const existing = await prisma.visaService.findUnique({ where: { id } });
    if (!existing) throw new Error("Service not found.");
    const slug = slugField ? await uniqueSlug(slugify(slugField), "visaService", id) : existing.slug;
    await prisma.visaService.update({ where: { id }, data: { ...data, slug } });
    revalidatePath("/visa-services");
    revalidatePath(`/visa-services/${slug}`);
  } else {
    const base = requireName(name, slugField);
    const slug = await uniqueSlug(base, "visaService");
    await prisma.visaService.create({ data: { ...data, slug } });
    revalidatePath("/visa-services");
    revalidatePath(`/visa-services/${slug}`);
  }
  revalidatePath("/admin/visa-services");
  redirect("/admin/visa-services");
}

export async function toggleVisaServiceAction(fd: FormData) {
  const id = clean(fd.get("id"));
  const active = clean(fd.get("isActive")) === "true";
  const row = await prisma.visaService.findUnique({ where: { id } });
  if (!row) throw new Error("Service not found.");
  await prisma.visaService.update({ where: { id }, data: { isActive: active } });
  revalidatePath("/visa-services");
  revalidatePath(`/visa-services/${row.slug}`);
  revalidatePath("/admin/visa-services");
}

// ---------------------------------------------------------------------------
// Destinations
// ---------------------------------------------------------------------------

export async function upsertDestinationAction(fd: FormData) {
  const id = clean(fd.get("id"));
  const name = clean(fd.get("name"));
  const slugField = clean(fd.get("slug"));
  const country = cleanOpt(fd.get("country"));
  const description = cleanOpt(fd.get("description"));
  const image = clean(fd.get("image"));
  const order = Number(clean(fd.get("order")) || 0);
  const isActive = clean(fd.get("isActive")) === "on";
  requireImage(image);

  const data = { name, country, description, image, order: Number.isFinite(order) ? order : 0, isActive };

  if (id) {
    const existing = await prisma.destination.findUnique({ where: { id } });
    if (!existing) throw new Error("Destination not found.");
    const slug = slugField ? await uniqueSlug(slugify(slugField), "destination", id) : existing.slug;
    await prisma.destination.update({ where: { id }, data: { ...data, slug } });
    revalidatePath("/destinations");
    revalidatePath(`/destinations/${slug}`);
  } else {
    const base = requireName(name, slugField);
    const slug = await uniqueSlug(base, "destination");
    await prisma.destination.create({ data: { ...data, slug } });
    revalidatePath("/destinations");
    revalidatePath(`/destinations/${slug}`);
  }
  revalidatePath("/admin/destinations");
  redirect("/admin/destinations");
}

export async function toggleDestinationAction(fd: FormData) {
  const id = clean(fd.get("id"));
  const active = clean(fd.get("isActive")) === "true";
  const row = await prisma.destination.findUnique({ where: { id } });
  if (!row) throw new Error("Destination not found.");
  await prisma.destination.update({ where: { id }, data: { isActive: active } });
  revalidatePath("/destinations");
  revalidatePath(`/destinations/${row.slug}`);
  revalidatePath("/admin/destinations");
}

// ---------------------------------------------------------------------------
// Holiday packages
// ---------------------------------------------------------------------------

export async function upsertPackageAction(fd: FormData) {
  const id = clean(fd.get("id"));
  const name = clean(fd.get("name"));
  const slugField = clean(fd.get("slug"));
  const destinationId = cleanOpt(fd.get("destinationId"));
  const durationLabel = cleanOpt(fd.get("durationLabel"));
  const priceFrom = cleanOpt(fd.get("priceFrom"));
  const includes = cleanOpt(fd.get("includes"));
  const image = clean(fd.get("image"));
  const order = Number(clean(fd.get("order")) || 0);
  const popular = clean(fd.get("popular")) === "on";
  const isActive = clean(fd.get("isActive")) === "on";
  requireImage(image);

  const data = {
    name,
    destinationId,
    durationLabel,
    priceFrom,
    includes,
    image,
    order: Number.isFinite(order) ? order : 0,
    popular,
    isActive,
  };

  if (id) {
    const existing = await prisma.holidayPackage.findUnique({ where: { id } });
    if (!existing) throw new Error("Package not found.");
    const slug = slugField ? await uniqueSlug(slugify(slugField), "holidayPackage", id) : existing.slug;
    await prisma.holidayPackage.update({ where: { id }, data: { ...data, slug } });
    revalidatePath("/holiday-packages");
    revalidatePath(`/holiday-packages/${slug}`);
  } else {
    const base = requireName(name, slugField);
    const slug = await uniqueSlug(base, "holidayPackage");
    await prisma.holidayPackage.create({ data: { ...data, slug } });
    revalidatePath("/holiday-packages");
    revalidatePath(`/holiday-packages/${slug}`);
  }
  revalidatePath("/admin/holiday-packages");
  redirect("/admin/holiday-packages");
}

export async function togglePackageAction(fd: FormData) {
  const id = clean(fd.get("id"));
  const active = clean(fd.get("isActive")) === "true";
  const row = await prisma.holidayPackage.findUnique({ where: { id } });
  if (!row) throw new Error("Package not found.");
  await prisma.holidayPackage.update({ where: { id }, data: { isActive: active } });
  revalidatePath("/holiday-packages");
  revalidatePath(`/holiday-packages/${row.slug}`);
  revalidatePath("/admin/holiday-packages");
}
