import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark, ShieldCheck } from "lucide-react";
import Reveal from "@/components/reveal";
import { splitLines } from "@/lib/site";
import { getActiveVisaServices } from "@/lib/site-data";

export const revalidate = 300;

export const metadata = {
  title: "Visa Services — USA, Schengen, Dubai, Saudi & More",
};

export default async function VisaServicesPage() {
  const services = await getActiveVisaServices();

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden pt-36 pb-16 sm:pb-20">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 400px at 80% 0%, rgba(217,186,104,0.12), transparent 60%), radial-gradient(700px 400px at 0% 100%, rgba(25,48,79,0.6), transparent 60%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">Visa Services</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              Visa Assistance for{" "}
              <span className="gold-text italic">Every Destination</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
              Application guidance, documentation, appointment-related assistance and interview
              preparation — for the USA, Schengen Europe, Dubai, Saudi Arabia and more.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="container-x pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.06}>
              <Link
                href={`/visa-services/${s.slug}`}
                className="card-glass-hover group flex h-full flex-col overflow-hidden sm:flex-row"
              >
                {s.image ? (
                  <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
                    <Image
                      src={s.image}
                      alt={s.shortName}
                      width={600}
                      height={500}
                      sizes="(max-width:640px) 100vw, 240px"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-navy-950/70" />
                  </div>
                ) : (
                  <div className="flex w-full shrink-0 items-center justify-center bg-navy-800/50 sm:w-56">
                    <Landmark className="h-10 w-10 text-gold-400/50" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-gold-400">
                    {s.category}
                  </span>
                  <h2 className="mt-2 font-display text-xl font-semibold text-white">
                    {s.shortName}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-400">
                    {s.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {splitLines(s.features)
                      .slice(0, 3)
                      .map((f) => (
                        <span key={f} className="chip">
                          {f}
                        </span>
                      ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-bold text-gold-300 transition-all group-hover:gap-3">
                    View details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Disclaimer */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
            <p className="text-sm leading-relaxed text-slate-400">
              <strong className="text-slate-200">Important:</strong> Nadeem Tour &amp; Travels is a
              travel and visa assistance service provider. We do not represent any embassy,
              consulate, government authority or visa-issuing agency unless expressly stated. Visa
              approval, appointment availability and processing timelines are determined solely by
              the relevant authorities. Service fees are separate from government visa fees and
              other third-party charges.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
