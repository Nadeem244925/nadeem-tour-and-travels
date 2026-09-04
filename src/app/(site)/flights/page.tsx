import { Plane, PlaneTakeoff, PlaneLanding, ArrowRightLeft, Users, Briefcase, Clock } from "lucide-react";
import Reveal from "@/components/reveal";
import EnquiryForm from "@/components/enquiry-form";

export const metadata = {
  title: "Flight Booking — Domestic & International",
};

const tabs = [
  { icon: ArrowRightLeft, label: "One Way" },
  { icon: ArrowRightLeft, label: "Round Trip" },
  { icon: ArrowRightLeft, label: "Multi City" },
];

const popular = [
  "Dubai", "USA", "UK", "Turkey", "Thailand", "Maldives", "Saudi Arabia", "Singapore", "Malaysia", "Australia",
];

export default function FlightsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 420px at 20% -5%, rgba(217,186,104,0.12), transparent 60%), radial-gradient(700px 420px at 100% 30%, rgba(25,48,79,0.7), transparent 65%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">Flights</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              Book Your <span className="gold-text italic">Next Flight</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              Domestic &amp; international tickets. Tell us your route and dates — we&apos;ll
              confirm the best fares for you.
            </p>
          </Reveal>

          {/* Trip type visual */}
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap gap-3">
              {tabs.map((t, i) => (
                <span
                  key={t.label}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ${
                    i === 1
                      ? "bg-gradient-to-r from-gold-300 to-gold-500 text-navy-950 shadow-lg shadow-gold-500/25"
                      : "border border-white/15 bg-white/[0.05] text-slate-200"
                  }`}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <div className="glass-form">
              <h2 className="font-display text-2xl font-semibold text-white">Request a Flight Quote</h2>
              <p className="mt-1.5 mb-6 text-[13px] text-slate-400">
                No payment needed to enquire — we confirm availability and best fares with you.
              </p>
              <EnquiryForm
                service="Flight Booking"
                destinationOptions={popular}
                submitLabel="Request Quote"
              />
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div className="card-glass p-6">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
                  Popular Routes
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {popular.map((d) => (
                    <span key={d} className="chip">
                      <Plane className="h-3 w-3 text-gold-400" /> India → {d}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-glass p-6">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
                  What we need from you
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  <li className="flex gap-3"><PlaneTakeoff className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> From &amp; To cities</li>
                  <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> Departure &amp; return dates</li>
                  <li className="flex gap-3"><Users className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> Adults / Children / Infants</li>
                  <li className="flex gap-3"><Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> Cabin class preference</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex items-start gap-3 rounded-2xl border border-gold-400/25 bg-gold-400/[0.07] p-5">
                <PlaneLanding className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                <p className="text-[13px] leading-relaxed text-slate-300">
                  We currently operate on a personalised quote model for the best fares. A live
                  self-booking engine with real-time availability will be added soon.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
