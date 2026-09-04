import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { splitLines, waLink } from "@/lib/site";
import { getActivePackages } from "@/lib/site-data";

export const revalidate = 300;

export const metadata = {
  title: "Holiday Packages — Dubai, Europe, Turkey, Maldives & More",
};

export default async function HolidayPackagesPage() {
  const packages = await getActivePackages();

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 420px at 30% -5%, rgba(217,186,104,0.13), transparent 60%), radial-gradient(800px 420px at 95% 45%, rgba(25,48,79,0.65), transparent 65%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">Holiday Packages</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              Holidays, <span className="gold-text italic">Perfectly Packaged</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              Dubai, Europe, Turkey, Thailand, Maldives and beyond — hotel, transfers,
              sightseeing and visa assistance in every package.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <div className="card-glass-hover flex h-full flex-col overflow-hidden p-0">
                <Link href={`/holiday-packages/${p.slug}`} className="group relative block overflow-hidden">
                  <Image
                    src={p.image || ""}
                    alt={p.name}
                    width={900}
                    height={560}
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-gold-400/95 px-3 py-1 text-[11px] font-extrabold text-navy-950">
                    {p.durationLabel}
                  </span>
                  {p.popular && (
                    <span className="absolute right-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-gold-300 backdrop-blur">
                      Popular
                    </span>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  {p.destination?.name && (
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-gold-400">
                      {p.destination.name}
                    </p>
                  )}
                  <h2 className="mt-1.5 font-display text-xl font-semibold text-white">{p.name}</h2>
                  <ul className="mt-3 space-y-1.5">
                    {splitLines(p.includes)
                      .slice(0, 3)
                      .map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-[12.5px] text-slate-400">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-gold-400" /> {inc}
                        </li>
                      ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500">From</p>
                      <p className="text-base font-extrabold text-gold-300">{p.priceFrom}</p>
                    </div>
                    <Link href={`/holiday-packages/${p.slug}`} className="btn-ghost !px-4 !py-2 !text-[12px]">
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <a
                    href={waLink(`Hello Nadeem Tour & Travels, I want a quote for the ${p.name} holiday package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-3 w-full !py-2.5 !text-[13px]"
                  >
                    <MessageCircle className="h-4 w-4" /> Get Quote on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl border border-gold-400/25 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 text-center sm:p-12">
            <SectionHeading
              eyebrow="Custom Holidays"
              title="Can't find your dream trip above?"
              sub="Tell us your dates, budget and style — we'll craft a completely personalised itinerary."
            />
            <Link href="/contact" className="btn-gold mt-8">
              Design My Trip <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
