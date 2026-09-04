"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { createLead } from "@/lib/actions";
import { waLink } from "@/lib/site";

export default function EnquiryForm({
  service,
  serviceOptions,
  destination,
  destinationOptions,
  showTravelDate = true,
  showMessage = true,
  source = "Website",
  submitLabel = "Submit Request",
  intro,
}: {
  service: string;
  /** When provided, shows a select of services instead of a fixed value. */
  serviceOptions?: string[];
  destination?: string;
  destinationOptions?: string[];
  showTravelDate?: boolean;
  showMessage?: boolean;
  source?: string;
  submitLabel?: string;
  intro?: string;
}) {
  const [waHref, setWaHref] = useState<string>("");
  const [again, setAgain] = useState(false);
  const [dbOffline, setDbOffline] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(async (_prev: unknown, fd: FormData) => {
    const res = await createLead(fd);
    if (res.ok) {
      const name = (fd.get("name") as string) ?? "";
      const svc = (fd.get("service") as string) ?? service;
      const dest = (fd.get("destination") as string) ?? "";
      const msg =
        `Hello Nadeem Tour & Travels, I am ${name}. ` +
        `I would like assistance with ${svc}${dest ? ` for ${dest}` : ""}.` +
        (res.leadNo ? ` (Enquiry No: ${res.leadNo})` : "");
      setWaHref(waLink(msg));
      setDbOffline(res.dbOffline === true);
    }
    return res;
  }, null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  const ok = state?.ok === true && !again;
  const leadNo = state && state.ok ? state.leadNo : "";

  return (
    <div>
      {intro && <p className="mb-5 text-sm leading-relaxed text-slate-400">{intro}</p>}

      {ok ? (
        <div className="rounded-2xl border border-gold-400/30 bg-gold-400/10 p-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-gold-300" />
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">
            {dbOffline ? "Almost there!" : "Thank you! Request received"}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {dbOffline ? (
              <>
                Our enquiry system is briefly unavailable — no problem. Continue on WhatsApp
                and we&apos;ll help you right away.
              </>
            ) : (
              <>
                Your enquiry number is{" "}
                <span className="font-bold text-gold-300">{leadNo}</span>. Our team will get back
                to you shortly.
              </>
            )}
          </p>
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-5"
            >
              <MessageCircle className="h-4 w-4" />
              Fast-track on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setWaHref("");
              setDbOffline(false);
              setAgain(true);
              formRef.current?.reset();
            }}
            className="mt-3 block w-full text-xs font-semibold text-slate-400 underline-offset-4 hover:text-gold-200 hover:underline"
          >
            Submit another enquiry
          </button>
        </div>
      ) : (
        <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2">
          {state && "error" in state && state.error && (
            <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 sm:col-span-2">
              {state.error}
            </p>
          )}

          <div className="sm:col-span-2">
            <label htmlFor="name" className="field-label">
              Full Name *
            </label>
            <input id="name" name="name" required minLength={2} className="input-base" placeholder="Your name" />
          </div>

          <div>
            <label htmlFor="mobile" className="field-label">
              Mobile / WhatsApp *
            </label>
            <input
              id="mobile"
              name="mobile"
              required
              type="tel"
              pattern="[+]?[0-9\s-]{10,15}"
              className="input-base"
              placeholder="98XXXXXXXX"
            />
          </div>

          <div>
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input id="email" name="email" type="email" className="input-base" placeholder="you@email.com" />
          </div>

          <input type="hidden" name="company" value="" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <input type="hidden" name="source" value={source} />

          {serviceOptions ? (
            <div className="sm:col-span-2">
              <label htmlFor="service" className="field-label">
                Service *
              </label>
              <select id="service" name="service" required defaultValue={service} className="input-base">
                <option value="" disabled className="bg-navy-900">
                  Select service…
                </option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s} className="bg-navy-900">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input type="hidden" name="service" value={service} />
          )}

          {destinationOptions ? (
            <div className="sm:col-span-2">
              <label htmlFor="destination" className="field-label">
                Destination
              </label>
              <select id="destination" name="destination" className="input-base">
                <option value="">Select destination…</option>
                {destinationOptions.map((d) => (
                  <option key={d} value={d} className="bg-navy-900">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          ) : destination ? (
            <input type="hidden" name="destination" value={destination} />
          ) : null}

          {showTravelDate && (
            <div className="sm:col-span-2">
              <label htmlFor="travelDate" className="field-label">
                Tentative Travel Date
              </label>
              <input id="travelDate" name="travelDate" type="date" className="input-base [color-scheme:dark]" />
            </div>
          )}

          {showMessage && (
            <div className="sm:col-span-2">
              <label htmlFor="message" className="field-label">
                Message <span className="normal-case text-slate-500">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                maxLength={2000}
                className="input-base resize-none"
                placeholder="Tell us about your travel plans…"
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> {submitLabel}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
