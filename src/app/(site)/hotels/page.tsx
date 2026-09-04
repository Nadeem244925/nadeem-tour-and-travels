import { Building2, BedDouble, CalendarDays, Wallet, Search } from "lucide-react";
import Reveal from "@/components/reveal";
import EnquiryForm from "@/components/enquiry-form";
import { getDestinationNames } from "@/lib/site-data";

export const revalidate = 300;

export const metadata = {
  title: "Hotel Booking — Stays Worldwide",
};

export default async function HotelsPage() {
  const names = await getDestinationNames();

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 420px at 85% -5%, rgba(217,186,104,0.12), transparent 60%), radial-gradient(700px 420px at 0% 40%, rgba(25,48,79,0.7), transparent 65%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">Hotels</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              Hotels That Fit <span className="gold-text italic">Your Trip</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              From business stays to beach resorts — tell us where and when, and we&apos;ll find
              the right hotel in your budget.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div className="glass-form">
              <h2 className="font-display text-2xl font-semibold text-white">Search Hotels</h2>
              <p className="mt-1.5 mb-6 text-[13px] text-slate-400">
                Share your stay details — we&apos;ll send you curated options and rates.
              </p>
              <EnquiryForm
                service="Hotel Booking"
                destinationOptions={names}
                submitLabel="Search Hotels"
              />
            </div>
          </Reveal>

          <div className="space-y-5">
            {[
              { icon: BedDouble, t: "Category", d: "Budget, 3★, 4★, 5★, resorts, serviced apartments" },
              { icon: Wallet, t: "Budget", d: "Tell us your per-night range — we match hotels to it" },
              { icon: CalendarDays, t: "Check-in / Check-out", d: "Include your dates in the message for best options" },
              { icon: Building2, t: "Location", d: "City centre, airport area, beachfront — your pick" },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.05}>
                <div className="card-glass flex items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/25">
                    <x.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{x.t}</p>
                    <p className="mt-0.5 text-[13px] text-slate-400">{x.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Search className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                <p className="text-[13px] leading-relaxed text-slate-400">
                  Live hotel availability and instant rates will be added with a booking API soon.
                  For now every request is handled personally for the best price.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
