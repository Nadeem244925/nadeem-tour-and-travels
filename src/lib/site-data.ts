// ---------------------------------------------------------------------------
// Public-site data access layer.
//
// Tries the database first; if it is unreachable (e.g. a fresh deployment with
// no DATABASE_URL yet), every call falls back to the embedded snapshot in
// src/lib/fallback-data.ts so the whole public website still renders.
// ---------------------------------------------------------------------------

import { prisma } from "@/lib/prisma";
import type { Destination, HolidayPackage, VisaService } from "@prisma/client";
import {
  fallbackDestinations,
  fallbackPackages,
  fallbackServices,
} from "@/lib/fallback-data";

export type DestinationWithPackages = Destination & { packages: HolidayPackage[] };
export type PackageWithDestination = HolidayPackage & { destination: Destination | null };

function isDbUnavailable(e: unknown): boolean {
  if (!(e instanceof Error)) return false;
  const msg = e.message;
  // Treat every DB-unavailable shape as fallback-worthy:
  //  - Missing/invalid DATABASE_URL (PrismaClientInitializationError, P1012)
  //  - Connection/query-engine failures (P1000–P1017, P2024)
  //  - Low-level socket/network errors
  // Anything else (validation etc.) should keep failing loudly.
  return /PrismaClientInitializationError|environment variable not found|did not initialize yet|query engine library|P10\d\d|P2024|can'?t reach|unable to open|failed to open|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|connection closed|socket hang up/i.test(
    msg
  );
}

// ---------- visa services ----------

export async function getActiveVisaServices(): Promise<VisaService[]> {
  try {
    return await prisma.visaService.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackServices;
  }
}

export async function getVisaService(slug: string): Promise<VisaService | null> {
  try {
    return await prisma.visaService.findUnique({ where: { slug } });
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackServices.find((s) => s.slug === slug) ?? null;
  }
}

export async function getVisaServiceSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.visaService.findMany({ select: { slug: true } });
    return rows.map((r) => r.slug);
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackServices.map((s) => s.slug);
  }
}

export async function getActiveVisaServiceNames(): Promise<string[]> {
  try {
    const rows = await prisma.visaService.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: { name: true },
    });
    return rows.map((r) => r.name);
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackServices.map((s) => s.name);
  }
}

// ---------- destinations ----------

export async function getActiveDestinations(take?: number): Promise<Destination[]> {
  try {
    return await prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take,
    });
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackDestinations.slice(0, take);
  }
}

export async function getDestination(slug: string): Promise<DestinationWithPackages | null> {
  try {
    return await prisma.destination.findUnique({
      where: { slug },
      include: { packages: { where: { isActive: true }, orderBy: { order: "asc" } } },
    });
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    const d = fallbackDestinations.find((x) => x.slug === slug);
    return d ? { ...d, packages: d.packages.filter((p) => p.isActive) } : null;
  }
}

export async function getDestinationSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.destination.findMany({ select: { slug: true } });
    return rows.map((r) => r.slug);
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackDestinations.map((d) => d.slug);
  }
}

export async function getDestinationNames(): Promise<string[]> {
  try {
    const rows = await prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: { name: true },
    });
    return rows.map((r) => r.name);
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackDestinations.map((d) => d.name);
  }
}

// ---------- holiday packages ----------

export async function getActivePackages(
  opts: { popularOnly?: boolean; take?: number } = {}
): Promise<PackageWithDestination[]> {
  const { popularOnly = false, take } = opts;
  try {
    return await prisma.holidayPackage.findMany({
      where: { isActive: true, ...(popularOnly ? { popular: true } : {}) },
      orderBy: { order: "asc" },
      take,
      include: { destination: true },
    });
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackPackages
      .filter((p) => p.isActive && (!popularOnly || p.popular))
      .slice(0, take);
  }
}

export async function getPackage(slug: string): Promise<PackageWithDestination | null> {
  try {
    return await prisma.holidayPackage.findUnique({
      where: { slug },
      include: { destination: true },
    });
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackPackages.find((p) => p.slug === slug) ?? null;
  }
}

export async function getPackageSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.holidayPackage.findMany({ select: { slug: true } });
    return rows.map((r) => r.slug);
  } catch (e) {
    if (!isDbUnavailable(e)) throw e;
    return fallbackPackages.map((p) => p.slug);
  }
}