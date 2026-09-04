import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  Building2,
  ShieldCheck,
  FileCheck2,
  CalendarCheck,
  Clock,
  Users,
  Briefcase,
  Globe2,
  Hotel,
  ArrowRight,
  Sparkles,
  Luggage,
  MessagesSquare,
  Landmark,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

import Hero from "@/components/home/hero";
import Faq from "@/components/home/faq";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import EarlierAppointmentForm from "@/components/earlier-appointment-form";
import { splitLines, waLink, site } from "@/lib/site";
import {
  getActiveDestinations,
  getActivePackages,
  getActiveVisaServices,
} from "@/lib/site-data";

// ISR: re-render content pages periodically so admin edits appear without a redeploy.
export const revalidate = 300;

export const metadata = {
  title: "NADEEM TOUR & TRAVELS — Visa Assistance, Flights, Hotels & Holiday Packages",
};

export default async function HomePage() {
  const [services, destinations, packages] = await Promise.all([
    getActiveVisaServices(),
    getActiveDestinations(8),
    getActivePackages({ popularOnly: true, take: 4 }),
  ]);

  const usa = services.find((s) => s.slug === "usa");
  const schengen = services.find((s) => s.slug === "schengen");
  const quickVisa = services
    .filter((s) => ["usa", "schengen", "dubai", "saudi-arabia"].includes(s.slug))
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Hero />

      {/* ------------------------------------------------------------- */}
      {/* Quick service cards                                           */}
      {/* ------------------------------------------------------------- */}
      <section className="container-x relative -mt-2 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <SectionHeading
          eyebrow="Our Travel Services"
          title="What We Do Best"
          sub="From visas to holidays — complete assistance under one roof."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quickVisa.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link
                href={`/visa-services/${s.slug}`}
                className="card-glass-hover group block h-full p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300/25 to-gold-600/10 text-gold-300 ring-1 ring-gold-400/25 transition-transform group-hover:scale-105">
                  <Landmark className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {s.shortName}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {splitLines(s.features)
                    .slice(0, 3)
                    .map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-slate-400">
                        <span className="h-1 w-1 rounded-full bg-gold-400" /> {f}
                      </li>
                    ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold-300 transition-all group-hover:gap-2.5">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
          {[
            {
              icon: Plane,
              title: "Flight Booking",
              sub: "Domestic & international — quote request or booking.",
              href: "/flights",
            },
            {
              icon: Hotel,
              title: "Holiday Packages",
              sub: "Dubai • Europe • Turkey • Thailand • Maldives & more.",
              href: "/holiday-packages",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={(quickVisa.length + i) * 0.05}>
              <Link href={c.href} className="card-glass-hover group block h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 text-white ring-1 ring-white/15 transition-transform group-hover:scale-105">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{c.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{c.sub}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold-300 transition-all group-hover:gap-2.5">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Why choose Nadeem + trust strip                                */}
      {/* ------------------------------------------------------------- */}
      <section className="relative border-y border-white/5 bg-navy-900/50 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow justify-center">Your Trusted Travel Partner</span>
              <h2 className="h-display mt-3">Why Choose Nadeem?</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                t: "Professional Assistance",
                d: "Experienced guidance for visas and international travel — accurate, careful, current.",
              },
              {
                icon: FileCheck2,
                t: "Transparent Process",
                d: "Clear steps, honest timelines and no misleading guarantees. Ever.",
              },
              {
                icon: Sparkles,
                t: "Personalized Service",
                d: "Every traveller is different. Your itinerary and documents, tailored to you.",
              },
              {
                icon: MessagesSquare,
                t: "Travel Support",
                d: "Questions answered on WhatsApp, phone and email — before, during and after booking.",
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06}>
                <div className="card-glass-hover h-full p-6 text-center">
                  <f.icon className="mx-auto h-7 w-7 text-gold-300" />
                  <h3 className="mt-4 text-[15px] font-bold text-white">{f.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-14 text-center font-display text-lg italic text-gold-200/90 sm:text-xl">
              Visa Assistance • International Flights • Holiday Packages • Travel Support
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* USA B1/B2 feature                                              */}
      {/* ------------------------------------------------------------- */}
      {usa && (
        <section className="container-x py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src={usa.image || ""}
                  alt="United States — USA visa assistance"
                  width={1200}
                  height={900}
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-xl border border-white/15 bg-navy-950/70 px-4 py-2.5 backdrop-blur-md">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                    United States of America
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="eyebrow">Flagship Service</span>
              <h2 className="h-display mt-3">USA B1/B2 Visitor Visa Assistance</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                Business (B-1), tourism (B-2) and the combined B1/B2 visitor visa — handled with
                care from first call to interview day.
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {splitLines(usa.features)
                  .slice(0, 8)
                  .map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-400" /> {f}
                    </li>
                  ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/visa-services/usa" className="btn-gold">
                  Explore USA Visa <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={waLink("Hello Nadeem Tour & Travels, I want to enquire about USA B1/B2 Visa assistance.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Earlier appointment                                            */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-y border-white/5 bg-navy-900/50 py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(700px 380px at 15% 0%, rgba(217,186,104,0.09), transparent 60%)",
          }}
        />
        <div className="container-x relative">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
            <Reveal>
              <span className="eyebrow">Earlier Appointment Assistance</span>
              <h2 className="h-display mt-3">
                Need an Earlier <span className="gold-text italic">USA Visa</span> Appointment?
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-400">
                Get professional assistance with the appointment process and guidance on available
                expedited appointment procedures.
              </p>
              <ul className="mt-7 space-y-4">
                {[
                  {
                    icon: CalendarCheck,
                    t: "Appointment process guidance",
                    d: "We explain the options available through official channels.",
                  },
                  {
                    icon: Clock,
                    t: "Eligibility check",
                    d: "We review whether an expedited request may apply to your case.",
                  },
                  {
                    icon: ShieldCheck,
                    t: "Honest by design",
                    d: "Appointments depend on official availability — we never promise slots.",
                  },
                ].map((x) => (
                  <li key={x.t} className="flex gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/25">
                      <x.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-bold text-white">{x.t}</p>
                      <p className="text-[13px] text-slate-400">{x.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-500">
                Note: U.S. appointment wait times change frequently and are set by the U.S.
                Department of State. We assist with the applicable process — we do not control or
                guarantee appointment availability.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-form">
                <h3 className="font-display text-2xl font-semibold text-white">
                  Check Eligibility
                </h3>
                <p className="mt-1.5 text-[13px] text-slate-400">
                  Share your details — we&apos;ll respond on WhatsApp/phone.
                </p>
                <div className="mt-6">
                  <EarlierAppointmentForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Schengen band                                                 */}
      {/* ------------------------------------------------------------- */}
      {schengen && (
        <section className="container-x py-20 sm:py-28">
          <SectionHeading
            eyebrow="Schengen Area"
            title="One Visa. 27 Countries."
            sub="France, Switzerland, Italy, Germany, Netherlands, Greece, Spain, Austria, Belgium and more."
          />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-wrap gap-2.5">
                {splitLines(schengen.options)
                  .slice(0, 9)
                  .map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-gold-400/25 bg-gold-400/[0.07] px-4 py-2 text-[13px] font-semibold text-gold-100"
                    >
                      {d}
                    </span>
                  ))}
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[13px] font-semibold text-slate-300">
                  + More
                </span>
              </div>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-slate-400">
                Tourist visas, business visas, family visits and multiple-entry guidance — with
                documentation and application assistance for your main Schengen destination.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/visa-services/schengen" className="btn-ghost">
                  Schengen Visa Details <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/destinations/switzerland" className="btn-ghost">
                  Explore Switzerland
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-2">
                {splitLines(schengen.features)
                  .slice(0, 6)
                  .map((f, i) => (
                    <div
                      key={f}
                      className="card-glass-hover flex items-center gap-3 p-4 text-sm font-semibold text-white"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-400/10 font-display text-sm text-gold-300 ring-1 ring-gold-400/25">
                        {i + 1}
                      </span>
                      {f}
                    </div>
                  ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Popular destinations                                           */}
      {/* ------------------------------------------------------------- */}
      <section className="border-y border-white/5 bg-navy-900/50 py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Explore"
              title="Popular Destinations"
              sub="Every destination has its own page with guidance and package ideas."
            />
            <Reveal delay={0.1}>
              <Link href="/destinations" className="btn-ghost shrink-0">
                All Destinations <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {destinations.map((d, i) => (
              <Reveal key={d.id} delay={(i % 4) * 0.05}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10"
                >
                  <Image
                    src={d.image || ""}
                    alt={d.name}
                    width={800}
                    height={600}
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:aspect-[3/4]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                      {d.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-slate-300">
                      {d.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-gold-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      View destination <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Flights + Hotels                                              */}
      {/* ------------------------------------------------------------- */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeading
          eyebrow="Book With Us"
          title="Flights & Hotels"
          sub="Tell us your plans — we handle the arrangements."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <Link href="/flights" className="card-glass-hover group relative block overflow-hidden">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop"
                  alt="Airplane wing above clouds"
                  width={1200}
                  height={500}
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <Plane className="h-6 w-6 text-gold-300" />
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                      Flight Booking
                    </h3>
                    <p className="mt-1 text-[13px] text-slate-300">
                      Domestic & international — request a quote and we&apos;ll find your best fare.
                    </p>
                  </div>
                  <span className="mb-1 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold-300 transition-all group-hover:gap-3">
                    Book <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/hotels" className="card-glass-hover group relative block overflow-hidden">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
                  alt="Luxury hotel resort"
                  width={1200}
                  height={500}
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <Building2 className="h-6 w-6 text-gold-300" />
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                      Hotel Booking
                    </h3>
                    <p className="mt-1 text-[13px] text-slate-300">
                      City hotels to resorts — stays that match your budget and style.
                    </p>
                  </div>
                  <span className="mb-1 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold-300 transition-all group-hover:gap-3">
                    Book <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Holiday packages                                              */}
      {/* ------------------------------------------------------------- */}
      <section className="border-y border-white/5 bg-navy-900/50 py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Holiday Packages"
              title="Ready-Made, Fully Customizable"
              sub="Hotel, transfers, sightseeing — plus a WhatsApp quote in minutes."
            />
            <Reveal delay={0.1}>
              <Link href="/holiday-packages" className="btn-ghost shrink-0">
                View All Packages <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <div className="card-glass-hover flex h-full flex-col overflow-hidden p-0">
                  <Link href={`/holiday-packages/${p.slug}`} className="group relative block overflow-hidden">
                    <Image
                      src={p.image || ""}
                      alt={p.name}
                      width={800}
                      height={500}
                      sizes="(max-width:640px) 100vw, 25vw"
                      className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-gold-400/95 px-3 py-1 text-[11px] font-extrabold text-navy-950">
                      {p.durationLabel}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                    <ul className="mt-3 space-y-1">
                      {splitLines(p.includes)
                        .slice(0, 3)
                        .map((inc) => (
                          <li key={inc} className="flex items-center gap-2 text-[12px] text-slate-400">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold-400" /> {inc}
                          </li>
                        ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500">From</p>
                        <p className="text-sm font-extrabold text-gold-300">{p.priceFrom}</p>
                      </div>
                      <Link href={`/holiday-packages/${p.slug}`} className="btn-ghost !px-4 !py-2 !text-[12px]">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* How it works                                                 */}
      {/* ------------------------------------------------------------- */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeading
          eyebrow="How It Works"
          title="Four Simple Steps"
          sub="From your first message to boarding the flight."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              icon: MessagesSquare,
              t: "Submit Enquiry",
              d: "Send your travel requirement via the form or WhatsApp.",
            },
            {
              n: "02",
              icon: Users,
              t: "Consultation",
              d: "We understand your needs and recommend the right service.",
            },
            {
              n: "03",
              icon: Briefcase,
              t: "Documentation",
              d: "Assistance with required documents and application preparation.",
            },
            {
              n: "04",
              icon: Luggage,
              t: "Travel",
              d: "After your visa/application process — flights, hotels & arrangements.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <div className="card-glass-hover relative h-full p-6">
                <span className="font-display text-5xl font-bold text-white/8">{s.n}</span>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300/25 to-gold-600/10 text-gold-300 ring-1 ring-gold-400/25">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FAQ                                                          */}
      {/* ------------------------------------------------------------- */}
      <Faq />

      {/* ------------------------------------------------------------- */}
      {/* Contact CTA                                                  */}
      {/* ------------------------------------------------------------- */}
      <section className="container-x pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(600px 300px at 50% 0%, rgba(217,186,104,0.14), transparent 65%)",
              }}
            />
            <div className="relative">
              <Globe2 className="mx-auto h-10 w-10 text-gold-300" />
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
                Ready to plan your international journey?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Talk to us on WhatsApp or send an enquiry — we usually respond within working
                hours.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={waLink("Hello Nadeem Tour & Travels, I would like to plan a trip. Please assist.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <Link href="/contact" className="btn-gold">
                  Send Enquiry <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-6 text-xs text-slate-500">
                {site.phoneDisplay} • {site.email}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
