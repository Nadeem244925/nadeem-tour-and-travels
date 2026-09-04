import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import Reveal from "@/components/reveal";
import { getActiveDestinations } from "@/lib/site-data";

export const revalidate = 300;

export const metadata = {
  title: "Explore Destinations — Dubai, Europe, USA, Maldives & More",
};

export default async function DestinationsPage() {
  const destinations = await getActiveDestinations();

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(900px 460px at 70% -5%, rgba(217,186,104,0.13), transparent 60%), radial-gradient(800px 460px at 0% 60%, rgba(25,48,79,0.7), transparent 65%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">Destinations</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              Explore <span className="gold-text italic">Destinations</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              Every destination has its own page — with visa guidance, package ideas and travel
              tips. Pick a place to begin.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.05}>
              <Link
                href={`/destinations/${d.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={d.image || ""}
                  alt={d.name}
                  width={900}
                  height={700}
                  sizes="(max-width:640px) 50vw, 33vw"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:aspect-[5/6]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">
                    {d.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-slate-300">
                    {d.description}
                  </p>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-gold-300 transition-all group-hover:gap-3">
                    <Compass className="h-3.5 w-3.5" /> Explore {d.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 text-center">
            <p className="text-sm text-slate-400">
              Travelling somewhere else?{" "}
              <Link href="/contact" className="font-bold text-gold-300 hover:text-gold-200">
                We assist globally — ask us →
              </Link>
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
