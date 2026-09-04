"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CalendarClock, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { createLead } from "@/lib/actions";
import { waLink } from "@/lib/site";

export default function EarlierAppointmentForm() {
  const [waHref, setWaHref] = useState<string>("");
  const [dbOffline, setDbOffline] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(async (_prev: unknown, fd: FormData) => {
    // Compose the specific appointment fields into the message summary.
    const get = (n: string) => (fd.get(n) as string) ?? "";
    const parts = [
      `Visa Category: ${get("visaCategory")}`,
      get("currentAppointmentDate") ? `Current Appointment Date: ${get("currentAppointmentDate")}` : "",
      get("preferredLocation") ? `Preferred Location: ${get("preferredLocation")}` : "",
      get("reason") ? `Reason for Earlier Appointment: ${get("reason")}` : "",
    ];
    fd.set("message", parts.filter(Boolean).join("\n"));

    const res = await createLead(fd);
    if (res.ok) {
      const name = get("name");
      const msg =
        `Hello Nadeem Tour & Travels, I am ${name}. ` +
        `I would like assistance with an earlier USA visa appointment.` +
        (res.leadNo ? ` (Enquiry No: ${res.leadNo})` : "");
      setWaHref(waLink(msg));
      setDbOffline(res.dbOffline === true);
    }
    return res;
  }, null);

  const ok = state?.ok === true;
  const leadNo = state && state.ok ? state.leadNo : "";

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <div>
      {ok ? (
        <div className="rounded-2xl border border-gold-400/30 bg-gold-400/10 p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-gold-300" />
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">
            {dbOffline ? "Almost there!" : "Request received"}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {dbOffline ? (
              <>
                Our enquiry system is briefly unavailable — no problem. Continue on WhatsApp and
                we&apos;ll review your request right away.
              </>
            ) : (
              <>
                Enquiry <span className="font-bold text-gold-300">{leadNo}</span> — our team will
                review your request and guide you on the applicable expedited-appointment
                process.
              </>
            )}
          </p>
          {waHref && (
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5">
              <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
            </a>
          )}
        </div>
      ) : (
        <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2">
          {state && "error" in state && state.error && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 sm:col-span-2">
              {state.error}
            </p>
          )}

          <input type="hidden" name="company" value="" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <input type="hidden" name="source" value="Website — Earlier USA Appointment" />
          <input type="hidden" name="service" value="USA Visa" />
          <input type="hidden" name="destination" value="USA" />

          <div className="sm:col-span-2">
            <label htmlFor="ea-name" className="field-label">Full Name *</label>
            <input id="ea-name" name="name" required minLength={2} className="input-base" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="ea-mobile" className="field-label">Mobile / WhatsApp *</label>
            <input id="ea-mobile" name="mobile" required type="tel" pattern="[+]?[0-9\s-]{10,15}" className="input-base" placeholder="98XXXXXXXX" />
          </div>
          <div>
            <label htmlFor="ea-email" className="field-label">Email</label>
            <input id="ea-email" name="email" type="email" className="input-base" placeholder="you@email.com" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ea-category" className="field-label">Visa Category *</label>
            <select id="ea-category" name="visaCategory" required className="input-base" defaultValue="">
              <option value="" disabled className="bg-navy-900">Select category…</option>
              <option className="bg-navy-900">B1 Business Visa</option>
              <option className="bg-navy-900">B2 Tourist Visa</option>
              <option className="bg-navy-900">B1/B2 Combined Visa</option>
              <option className="bg-navy-900">Not sure yet</option>
            </select>
          </div>

          <div>
            <label htmlFor="ea-current" className="field-label">Current Appointment Date</label>
            <input id="ea-current" name="currentAppointmentDate" type="date" className="input-base [color-scheme:dark]" />
          </div>
          <div>
            <label htmlFor="ea-travel" className="field-label">Travel Date *</label>
            <input id="ea-travel" name="travelDate" type="date" required className="input-base [color-scheme:dark]" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ea-location" className="field-label">Preferred Location / Embassy</label>
            <input id="ea-location" name="preferredLocation" className="input-base" placeholder="e.g. New Delhi, Mumbai, Hyderabad…" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ea-reason" className="field-label">Reason for Earlier Appointment *</label>
            <textarea
              id="ea-reason"
              name="reason"
              required
              rows={3}
              maxLength={1200}
              className="input-base resize-none"
              placeholder="Please briefly explain your situation (travel need, dates, urgency)…"
            />
          </div>

          <input
            type="hidden"
            name="message"
            // composed on submit below
            value=""
          />

          <div className="sm:col-span-2">
            <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  <CalendarClock className="h-4 w-4" /> Submit Request
                </>
              )}
            </button>
          </div>
          <p className="text-center text-[11px] leading-relaxed text-slate-500 sm:col-span-2">
            We provide assistance with the applicable appointment / expedited-request process,
            subject to official availability and eligibility. No appointment is ever guaranteed.
          </p>
        </form>
      )}
    </div>
  );
}
