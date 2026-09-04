"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isDbUnavailable } from "@/lib/db-unavailable";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth";

export type LeadInput = {
  name: string;
  mobile: string;
  email?: string;
  service: string;
  destination?: string;
  travelDate?: string; // ISO date or ""
  message?: string;
  source?: string;
};

const clean = (v: FormDataEntryValue | null) =>
  typeof v === "string" ? v.trim() : "";


/** Generate the next lead number, e.g. NT-10001. */
async function nextLeadNo(): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { _max } = await prisma.lead.aggregate({ _max: { leadNo: true } });
    const current = _max.leadNo ?? "NT-10000";
    const num = parseInt(current.replace(/\D/g, ""), 10) || 10000;
    const candidate = `NT-${num + 1}`;
    try {
      // unique violation would throw; retry picks up the new max
      await prisma.lead.create({
        data: { leadNo: candidate, name: "__probe__", service: "__probe__" },
      });
      await prisma.lead.deleteMany({ where: { leadNo: candidate, name: "__probe__" } });
      return candidate;
    } catch {
      /* collision — retry */
    }
  }
  throw new Error("Could not allocate lead number");
}

export type CreateLeadResult =
  | { ok: true; leadNo: string; dbOffline?: boolean }
  | { ok: false; error: string };

export async function createLead(fd: FormData): Promise<CreateLeadResult> {
  const name = clean(fd.get("name"));
  const mobile = clean(fd.get("mobile"));
  const email = clean(fd.get("email"));
  const service = clean(fd.get("service"));
  const destination = clean(fd.get("destination"));
  const travelDateRaw = clean(fd.get("travelDate"));
  const message = clean(fd.get("message"));
  const source = clean(fd.get("source")) || "Website";

  // Honeypot — bots fill this hidden field.
  if (clean(fd.get("company"))) return { ok: true, leadNo: "" };

  if (name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (mobile.length < 10)
    return { ok: false, error: "Please enter a valid mobile number." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (service.length < 2) return { ok: false, error: "Please select a service." };
  if (message && message.length > 2000)
    return { ok: false, error: "Message is too long." };

  let travelDate: Date | null = null;
  if (travelDateRaw) {
    const d = new Date(travelDateRaw);
    if (!Number.isNaN(d.getTime())) travelDate = d;
  }

  try {
    const leadNo = await nextLeadNo();

    await prisma.lead.create({
      data: {
        leadNo,
        name: name.slice(0, 120),
        mobile: mobile.slice(0, 20),
        email: email.slice(0, 160) || null,
        service: service.slice(0, 80),
        destination: destination.slice(0, 120) || null,
        travelDate,
        message: message.slice(0, 2000) || null,
        status: "New",
        source: source.slice(0, 40),
      },
    });

    return { ok: true, leadNo };
  } catch (e) {
    if (isDbUnavailable(e)) {
      // Database is not connected — don't lose the customer: the form still
      // routes them straight to WhatsApp.
      return { ok: true, leadNo: "", dbOffline: true };
    }
    throw e;
  }
}

// ---------------------------------------------------------------------------
// Admin auth
// ---------------------------------------------------------------------------

export type AuthState = { error?: string } | null;

export async function loginAction(
  _prev: AuthState,
  fd: FormData
): Promise<AuthState> {
  const email = clean(fd.get("email")).toLowerCase();
  const password = fd.get("password");
  let user;
  try {
    user = await prisma.user.findUnique({ where: { email } });
  } catch (e) {
    if (isDbUnavailable(e)) {
      return {
        error:
          "Database is not connected. Add DATABASE_URL (e.g. a free Neon Postgres) and redeploy to use the admin panel.",
      };
    }
    throw e;
  }
  if (!user || typeof password !== "string") return { error: "Invalid email or password." };
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return { error: "Invalid email or password." };
  if (!user.isActive) return { error: "This account is disabled." };
  await setSessionCookie(user.id);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
}

export async function updateLeadStatusAction(leadId: string, status: string) {
  const allowed = [
    "New",
    "Contacted",
    "Documents Pending",
    "Processing",
    "Submitted",
    "Completed",
    "Closed",
  ];
  if (!allowed.includes(status)) throw new Error("Invalid status");
  await prisma.lead.update({ where: { id: leadId }, data: { status } });
}
